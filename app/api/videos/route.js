import { getMetroCmsData } from '../../../lib/metroCms';
import { processVideos } from '../../../lib/videoUtils';

// Module-level cache — survives within a single serverless instance (up to 60 s).
// The underlying fetch in getMetroCmsData also carries next: { revalidate: 60 },
// so the platform-level cache provides a second layer.
let _cache = null;
let _cacheAt = 0;
const CACHE_TTL = 60_000;

async function getProcessedVideos() {
  const now = Date.now();
  if (_cache && now - _cacheAt < CACHE_TTL) return _cache;

  try {
    const cmsData  = await getMetroCmsData('all');
    const rawVideos = cmsData?.videos ?? [];
    const processed = processVideos(rawVideos);

    // Only replace cache when we got real data (stale fallback on empty)
    if (processed.length > 0) {
      _cache  = processed;
      _cacheAt = now;
    }

    return processed.length > 0 ? processed : (_cache ?? []);
  } catch (err) {
    console.error('[api/videos] fetch error:', err);
    return _cache ?? [];
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type   = searchParams.get('type') === 'short' ? 'short' : 'long';
    const cursor = Math.max(0, parseInt(searchParams.get('cursor') ?? '0', 10));
    const LIMIT  = 12;

    const all      = await getProcessedVideos();
    const filtered = all.filter(v => v.videoType === type);
    const batch    = filtered.slice(cursor, cursor + LIMIT);
    const next     = cursor + batch.length;

    return Response.json({
      items:      batch,
      nextCursor: String(next),
      hasMore:    next < filtered.length,
      total:      filtered.length,
    });
  } catch (err) {
    console.error('[api/videos] GET error:', err);
    return Response.json(
      { items: [], nextCursor: '0', hasMore: false, total: 0, error: 'Failed to load videos' },
      { status: 500 },
    );
  }
}
