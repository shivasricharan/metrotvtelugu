#!/usr/bin/env node
// Diagnose video ordering pipeline against the live CMS endpoint.
// Usage:  GOOGLE_SCRIPT_METRO_CMS_URL=<url> node scripts/diagnose-videos.mjs
// Output: A full trace from raw GAS response → processVideos → sorted output.

import { processVideos } from '../lib/videoUtils.js';

const cmsUrl = process.env.GOOGLE_SCRIPT_METRO_CMS_URL;
if (!cmsUrl) {
  console.error('ERROR: GOOGLE_SCRIPT_METRO_CMS_URL is not set.');
  process.exit(1);
}

console.log('Fetching from CMS (cache: no-store) …\n');

let body;
try {
  const res = await fetch(`${cmsUrl}?type=all`, {
    headers: { 'Cache-Control': 'no-cache' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  body = await res.json();
} catch (err) {
  console.error('Fetch failed:', err.message);
  process.exit(1);
}

const rawVideos = body?.data?.videos ?? [];
console.log(`STEP 1 — Raw records from GAS: ${rawVideos.length}`);

if (rawVideos.length === 0) {
  console.error('GAS returned 0 videos. Check the endpoint and sheet access.');
  process.exit(1);
}

// ── Field names ────────────────────────────────────────────────────────────
console.log('\nSample field names (first record):');
console.log(' ', Object.keys(rawVideos[0]).join(' | '));

// ── Status breakdown ───────────────────────────────────────────────────────
const statusMap = {};
rawVideos.forEach(v => {
  const s = String(v.status ?? v.Status ?? '').trim() || '(empty)';
  statusMap[s] = (statusMap[s] ?? 0) + 1;
});
console.log('\nSTEP 2 — Status distribution:');
Object.entries(statusMap).forEach(([k, n]) => console.log(`  "${k}": ${n}`));

// ── Video type breakdown ───────────────────────────────────────────────────
const typeMap = {};
rawVideos.forEach(v => {
  const t = String(v['Video Type'] ?? v.videoType ?? v.type ?? '').trim() || '(empty)';
  typeMap[t] = (typeMap[t] ?? 0) + 1;
});
console.log('\nSTEP 3 — Video Type distribution:');
Object.entries(typeMap).forEach(([k, n]) => console.log(`  "${k}": ${n}`));

// ── Published Date breakdown ───────────────────────────────────────────────
const dateMap = {};
rawVideos.forEach(v => {
  const d = String(v['Published Date'] ?? v.publishedDate ?? '').trim() || '(empty)';
  dateMap[d] = (dateMap[d] ?? 0) + 1;
});
const sortedDates = Object.entries(dateMap).sort(([a], [b]) => a.localeCompare(b));
const recent20    = sortedDates.slice(-20);
console.log('\nSTEP 4 — Published Date distribution (most recent 20 unique values):');
recent20.forEach(([d, n]) => console.log(`  "${d}": ${n}`));

// ── Search for 12 July records ────────────────────────────────────────────
const jul12 = rawVideos.filter(v => {
  const d = String(v['Published Date'] ?? v.publishedDate ?? '').trim();
  return d.includes('7/12') || d.includes('12/7') || d.includes('2026-07-12');
});
console.log(`\nSTEP 5 — Records with 12 July 2026 date in raw data: ${jul12.length}`);
if (jul12.length > 0) {
  jul12.slice(0, 10).forEach(v => {
    const rowIdx = rawVideos.indexOf(v);
    console.log(`  [row ${rowIdx}] ID=${v['YouTube ID'] ?? v.youTubeID} | status=${v.status ?? v.Status} | type=${v['Video Type'] ?? v.videoType} | date="${v['Published Date'] ?? v.publishedDate}" | title="${String(v.title ?? '').slice(0, 60)}"`);
  });
} else {
  console.log('  *** NONE FOUND — the GAS endpoint is not returning 12 July records ***');
  console.log('  This is the most likely root cause. Check:');
  console.log('    1. Google Apps Script CacheService (cache may be stale)');
  console.log('    2. Row limit in GAS (e.g. getRange("A2:H100") truncates new rows)');
  console.log('    3. Sheet column structure (did column positions shift?)');
}

// ── First 5 and last 5 rows ────────────────────────────────────────────────
console.log('\nSTEP 6 — First 5 raw rows:');
rawVideos.slice(0, 5).forEach((v, i) => {
  console.log(`  [${i}] ID=${v['YouTube ID'] ?? v.youTubeID} status="${v.status ?? v.Status}" date="${v['Published Date'] ?? v.publishedDate}" type="${v['Video Type'] ?? v.videoType}" title="${String(v.title ?? '').slice(0, 50)}"`);
});
console.log('\nSTEP 7 — Last 5 raw rows:');
rawVideos.slice(-5).forEach((v, i) => {
  const idx = rawVideos.length - 5 + i;
  console.log(`  [${idx}] ID=${v['YouTube ID'] ?? v.youTubeID} status="${v.status ?? v.Status}" date="${v['Published Date'] ?? v.publishedDate}" type="${v['Video Type'] ?? v.videoType}" title="${String(v.title ?? '').slice(0, 50)}"`);
});

// ── Run through processVideos ──────────────────────────────────────────────
const processed = processVideos(rawVideos);
const longs     = processed.filter(v => v.videoType === 'long');
const shorts    = processed.filter(v => v.videoType === 'short');
console.log(`\nSTEP 8 — After processVideos:`);
console.log(`  Total processed: ${processed.length}`);
console.log(`  Long videos:     ${longs.length}`);
console.log(`  Shorts:          ${shorts.length}`);
console.log(`  Dropped:         ${rawVideos.length - processed.length}`);

// ── First 20 long videos in sort order ────────────────────────────────────
console.log('\nSTEP 9 — First 20 Long Videos (sorted newest-first):');
longs.slice(0, 20).forEach((v, i) => {
  console.log(`  [${i + 1}] ${v.publishedDate?.slice(0, 10) ?? '(no date)'.padEnd(10)} | ${v.id} | ${v.title.slice(0, 60)}`);
});

// ── First 12 Shorts in sort order ─────────────────────────────────────────
console.log('\nSTEP 10 — First 12 Shorts (sorted newest-first):');
shorts.slice(0, 12).forEach((v, i) => {
  console.log(`  [${i + 1}] ${v.publishedDate?.slice(0, 10) ?? '(no date)'.padEnd(10)} | ${v.id} | ${v.title.slice(0, 60)}`);
});

// ── Jul 12 records in processed output ────────────────────────────────────
const jul12Processed = processed.filter(v => v.publishedDate?.startsWith('2026-07-12'));
console.log(`\nSTEP 11 — 12 July 2026 records in processed output: ${jul12Processed.length}`);
if (jul12Processed.length > 0) {
  jul12Processed.forEach(v => {
    const pos = processed.indexOf(v) + 1;
    const longPos  = v.videoType === 'long'  ? longs.indexOf(v) + 1  : '-';
    const shortPos = v.videoType === 'short' ? shorts.indexOf(v) + 1 : '-';
    console.log(`  pos=${pos} (long #${longPos}, short #${shortPos}) | ${v.id} | ${v.videoType} | ${v.title.slice(0, 60)}`);
  });
} else {
  console.log('  *** NONE in processed output ***');
}

console.log('\n── SUMMARY ──────────────────────────────────────────────────────────');
console.log(`GAS returned: ${rawVideos.length} raw records`);
console.log(`Jul 12 in raw: ${jul12.length} | Jul 12 in processed: ${jul12Processed.length}`);
console.log(`First long date: ${longs[0]?.publishedDate?.slice(0, 10) ?? 'none'}`);
console.log(`First short date: ${shorts[0]?.publishedDate?.slice(0, 10) ?? 'none'}`);
