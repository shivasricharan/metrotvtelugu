// TEMPORARY DIAGNOSTIC ENDPOINT — remove after root cause is confirmed
// Usage: GET /api/debug/cms?k=metro-diag-2026
// Returns raw CMS data counts, field names, date ranges, and processed ordering.
// No data is written. Bypasses all Next.js and module-level caches.

import { processVideos } from '../../../../lib/videoUtils';

export const dynamic = 'force-dynamic';

const KEY = 'metro-diag-2026';

function pick(item, ...keys) {
  for (const k of keys) if (item[k] !== undefined) return item[k];
  return undefined;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('k') !== KEY) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  const cmsUrl = process.env.GOOGLE_SCRIPT_METRO_CMS_URL;
  if (!cmsUrl) {
    return Response.json({ error: 'GOOGLE_SCRIPT_METRO_CMS_URL is not set' }, { status: 500 });
  }

  try {
    const t0  = Date.now();
    const res = await fetch(`${cmsUrl}?type=all`, { cache: 'no-store' });
    const fetchMs = Date.now() - t0;

    if (!res.ok) {
      return Response.json({ error: `GAS responded HTTP ${res.status}` }, { status: 502 });
    }

    const body      = await res.json();
    const rawVideos = body?.data?.videos ?? [];

    // ── Field names from first record ──────────────────────────────────────
    const fields = rawVideos.length > 0 ? Object.keys(rawVideos[0]) : [];

    // ── Status distribution ────────────────────────────────────────────────
    const statusCounts = {};
    rawVideos.forEach(v => {
      const s = String(pick(v, 'status', 'Status') ?? '').trim() || '(empty)';
      statusCounts[s] = (statusCounts[s] ?? 0) + 1;
    });

    // ── Video type distribution ────────────────────────────────────────────
    const typeCounts = {};
    rawVideos.forEach(v => {
      const t = String(pick(v, 'videoType', 'Video Type', 'type') ?? '').trim() || '(empty)';
      typeCounts[t] = (typeCounts[t] ?? 0) + 1;
    });

    // ── Published Date distribution (last 30 unique values) ───────────────
    const dateCounts = {};
    rawVideos.forEach(v => {
      const d = String(pick(v, 'publishedDate', 'Published Date') ?? '').trim() || '(empty)';
      dateCounts[d] = (dateCounts[d] ?? 0) + 1;
    });
    const allDates    = Object.entries(dateCounts).sort(([a], [b]) => String(a).localeCompare(String(b)));
    const recentDates = allDates.slice(-30);

    // ── Records with a date containing "7/12" or "12/7" (12 July) ─────────
    const jul12Raw = rawVideos.filter(v => {
      const d = String(pick(v, 'publishedDate', 'Published Date') ?? '').trim();
      return d.includes('7/12') || d.includes('12/7') || d.includes('2026-07-12');
    });

    function summarise(item, idx) {
      return {
        rowIndex: idx,
        youtubeId: pick(item, 'youTubeID', 'youtubeId', 'YouTube ID', 'videoId'),
        title:     String(pick(item, 'title', 'Title') ?? '').slice(0, 80),
        status:    pick(item, 'status', 'Status'),
        videoType: pick(item, 'videoType', 'Video Type', 'type'),
        publishedDate: pick(item, 'publishedDate', 'Published Date'),
        syncedAt:  pick(item, 'syncedAt', 'Synced At'),
      };
    }

    // ── Run through processVideos pipeline ────────────────────────────────
    const processed = processVideos(rawVideos);
    const longs     = processed.filter(v => v.videoType === 'long');
    const shorts    = processed.filter(v => v.videoType === 'short');

    // Find where Jul 12 records end up in sorted output
    const jul12Processed = processed.filter(v => {
      const d = v.publishedDate ?? '';
      return d.startsWith('2026-07-12');
    });

    return Response.json({
      timestamp:  new Date().toISOString(),
      fetchMs,
      gasUrl:     cmsUrl.replace(/[?&].*/, '').slice(-40), // show tail only, no query secrets

      raw: {
        total:        rawVideos.length,
        fields,
        statusCounts,
        typeCounts,
        recentDates,
        first5:       rawVideos.slice(0, 5).map((v, i) => summarise(v, i)),     // i used for row index
        last5:        rawVideos.slice(-5).map((v, i) => summarise(v, rawVideos.length - 5 + i)), // i used
        jul12Records: jul12Raw.map(v => summarise(v, rawVideos.indexOf(v))),
      },

      processed: {
        total:  processed.length,
        longs:  longs.length,
        shorts: shorts.length,
        top20Long: longs.slice(0, 20).map((v, i) => ({
          rank:          i + 1,
          id:            v.id,
          title:         v.title.slice(0, 70),
          publishedDate: v.publishedDate,
          videoType:     v.videoType,
        })),
        top12Short: shorts.slice(0, 12).map((v, i) => ({
          rank:          i + 1,
          id:            v.id,
          title:         v.title.slice(0, 70),
          publishedDate: v.publishedDate,
          videoType:     v.videoType,
        })),
        jul12InOutput: jul12Processed.map(v => ({
          sortPosition: processed.indexOf(v) + 1,
          id:           v.id,
          title:        v.title.slice(0, 70),
          publishedDate: v.publishedDate,
          videoType:    v.videoType,
        })),
      },
    });
  } catch (err) {
    return Response.json({ error: err.message, stack: err.stack?.split('\n').slice(0, 8) }, { status: 500 });
  }
}
