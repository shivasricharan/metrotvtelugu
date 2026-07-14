// Shared video normalisation utilities — safe for server and client imports.

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function isValidYouTubeId(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]{11}$/.test(id.trim());
}

export function extractYouTubeId(url) {
  if (!url) return null;
  const s = String(url).trim();
  if (isValidYouTubeId(s)) return s;
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /\/shorts\/([a-zA-Z0-9_-]{11})/,
    /\/embed\/([a-zA-Z0-9_-]{11})/,
    /\/v\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = s.match(re);
    if (m && isValidYouTubeId(m[1])) return m[1];
  }
  return null;
}

export function isPublished(status) {
  const s = String(status ?? '').toLowerCase().trim();
  return s === 'published' || s === 'active';
}

export function normalizeVideoType(type, url) {
  const t = String(type ?? '').toLowerCase().trim();
  if (['long', 'long video', 'video', 'regular'].includes(t)) return 'long';
  if (['short', 'shorts', 'youtube short'].includes(t)) return 'short';
  if (url && String(url).includes('/shorts/')) return 'short';
  return 'long';
}

export function normalizeFeatured(val) {
  const v = String(val ?? '').toLowerCase().trim();
  return ['yes', 'true', '1', 'featured'].includes(v);
}

// Explicit M/D/YYYY parser for Google Sheets dates like "7/12/2026" (July 12)
function parseMDY(dateStr) {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(String(dateStr ?? '').trim());
  if (!m) return null;
  const month = parseInt(m[1], 10) - 1;
  const day   = parseInt(m[2], 10);
  const year  = parseInt(m[3], 10);
  const d = new Date(year, month, day);
  return isNaN(d.getTime()) ? null : d;
}

function parseDate(dateStr, syncedAt) {
  if (dateStr) {
    const mdy = parseMDY(dateStr);
    if (mdy) return mdy;
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d;
  }
  if (syncedAt) { const d = new Date(syncedAt); if (!isNaN(d.getTime())) return d; }
  return null;
}

// Consistent Indian-locale date string: "14 Jul 2026"
export function formatIndianDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return '';
  const day   = d.getUTCDate();
  const month = MONTHS[d.getUTCMonth()];
  const year  = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * Process raw CMS video rows into a clean, sorted, deduplicated array.
 * For duplicate YouTube IDs, keeps the record with the newest Published Date.
 * Returns videos sorted newest-first.
 */
export function processVideos(rawVideos) {
  const items = Array.isArray(rawVideos) ? rawVideos : [];

  // Map from YouTube ID → { video, sortKey } — keeps only the NEWEST duplicate
  const byId = new Map();

  items.forEach((item, rowIndex) => {
    try {
      const rawId  = item.youTubeID ?? item.youtubeId ?? item['YouTube ID'] ?? item.videoId ?? '';
      const rawUrl = item.YouTubeURL ?? item.youtubeURL ?? item.youtubeUrl ?? item['YouTubeURL'] ?? item.url ?? '';

      const youtubeId = isValidYouTubeId(String(rawId).trim())
        ? String(rawId).trim()
        : extractYouTubeId(rawUrl);

      if (!youtubeId) return;
      if (!isPublished(item.status ?? item.Status)) return;

      const videoType   = normalizeVideoType(item.videoType ?? item['Video Type'] ?? item.type, rawUrl);
      const featured    = normalizeFeatured(item.featured ?? item.Featured);
      const publishedAt = parseDate(
        item.publishedDate ?? item['Published Date'],
        item.syncedAt ?? item['Synced At'],
      );
      // Undated: use rowIndex (larger = later row = more recently added = higher priority)
      const sortKey = publishedAt ? publishedAt.getTime() : rowIndex;

      const existing = byId.get(youtubeId);
      if (!existing || sortKey > existing.sortKey) {
        byId.set(youtubeId, {
          sortKey,
          video: {
            id:            youtubeId,
            title:         String(item.title ?? item.Title ?? '').trim() || 'Watch on Metro TV Telugu',
            category:      String(item.category ?? item.Category ?? '').trim() || 'Latest',
            videoType,
            featured,
            publishedDate: publishedAt ? publishedAt.toISOString() : null,
            thumbnailUrl:  `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
            slug:          String(item.slug ?? item.Slug ?? '').trim(),
          },
        });
      }
    } catch {
      // Skip malformed rows silently
    }
  });

  // Newest first
  return Array.from(byId.values())
    .sort((a, b) => b.sortKey - a.sortKey)
    .map(entry => entry.video);
}
