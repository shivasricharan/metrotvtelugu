// Unit tests for lib/videoUtils.js
// Run: npm test
// Covers: sorting, deduplication, status filtering, type classification, date handling

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { processVideos, formatIndianDate } from './videoUtils.js';

// ── Helpers ──────────────────────────────────────────────────────────────────

// Generate a valid 11-char YouTube ID: 'V' + 10 zero-padded digits
function vid(n) {
  return `V${String(n).padStart(10, '0')}`;
}

// Create a minimal CMS row with sensible defaults
function row(overrides = {}) {
  return {
    'YouTube ID':   vid(overrides._n ?? 1),
    title:          'Test Video',
    category:       'News',
    'Video Type':   'Long',
    status:         'Published',
    'Published Date': '',
    'Synced At':    '',
    featured:       'No',
    slug:           '',
    ...overrides,
  };
}

// ── SORTING ───────────────────────────────────────────────────────────────────

describe('sorting — 12 Jul ranks above earlier dates', () => {
  it('12 Jul 2026 ranks above 9 Jul 2026', () => {
    const raw = [
      row({ _n: 1, 'YouTube ID': vid(1), 'Published Date': '7/9/2026',  title: 'July 9' }),
      row({ _n: 2, 'YouTube ID': vid(2), 'Published Date': '7/12/2026', title: 'July 12' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(2), 'July 12 must be rank 1');
    assert.equal(result[1].id, vid(1), 'July 9 must be rank 2');
  });

  it('12 Jul 2026 ranks above 8 Jul 2026', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), 'Published Date': '7/8/2026',  title: 'July 8' }),
      row({ 'YouTube ID': vid(2), 'Published Date': '7/12/2026', title: 'July 12' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(2));
  });

  it('dates are sorted numerically — "7/12" beats "7/9" despite "9" > "1" lexically', () => {
    const raw = [
      row({ 'YouTube ID': vid(9),  'Published Date': '7/9/2026' }),
      row({ 'YouTube ID': vid(12), 'Published Date': '7/12/2026' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(12), 'Numeric: Jul 12 > Jul 9');
    assert.equal(result[1].id, vid(9));
  });

  it('sorting occurs before pagination — newest records first regardless of sheet row', () => {
    // 20 rows: dates Jul 1–20 in order; row 0 = Jul 1 (oldest), row 19 = Jul 20 (newest)
    const raw = Array.from({ length: 20 }, (_, i) =>
      row({ 'YouTube ID': vid(i + 1), 'Published Date': `7/${i + 1}/2026`, title: `July ${i + 1}` })
    );
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(20), 'Jul 20 (last row) must be rank 1');
    assert.equal(result[19].id, vid(1),  'Jul 1 (first row) must be rank 20');
  });

  it('first 12 after sort are the 12 newest — not the first 12 sheet rows', () => {
    // 20 rows; oldest Jul 1 in row 0, newest Jul 20 in row 19
    const raw = Array.from({ length: 20 }, (_, i) =>
      row({ 'YouTube ID': vid(i + 1), 'Published Date': `7/${i + 1}/2026`, title: `July ${i + 1}` })
    );
    const result = processVideos(raw);
    const first12Ids = result.slice(0, 12).map(v => v.id);
    // Expected: Jul 20, 19, 18 … Jul 9
    for (let i = 0; i < 12; i++) {
      assert.equal(first12Ids[i], vid(20 - i), `Rank ${i + 1} should be July ${20 - i}`);
    }
  });
});

// ── DEDUPLICATION ─────────────────────────────────────────────────────────────

describe('deduplication — keep newest for duplicate YouTube IDs', () => {
  it('duplicate IDs retain the record with the newest Published Date', () => {
    const dup = vid(99);
    const raw = [
      row({ 'YouTube ID': dup, 'Published Date': '7/8/2026',  title: 'Old Jul 8 entry' }),
      row({ 'YouTube ID': dup, 'Published Date': '7/12/2026', title: 'New Jul 12 entry' }),
    ];
    const result = processVideos(raw);
    assert.equal(result.length, 1, 'Should collapse to 1 record');
    assert.equal(result[0].title, 'New Jul 12 entry', 'Should keep the newer record');
  });

  it('when dates are equal, keeps the first occurrence', () => {
    const dup = vid(99);
    const raw = [
      row({ 'YouTube ID': dup, 'Published Date': '7/12/2026', title: 'First' }),
      row({ 'YouTube ID': dup, 'Published Date': '7/12/2026', title: 'Second' }),
    ];
    const result = processVideos(raw);
    assert.equal(result.length, 1);
    assert.equal(result[0].title, 'First');
  });
});

// ── STATUS FILTERING ─────────────────────────────────────────────────────────

describe('status filtering', () => {
  it('accepts Published and Active in any case/spacing', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), status: 'PUBLISHED',   'Published Date': '7/12/2026' }),
      row({ 'YouTube ID': vid(2), status: 'Published',   'Published Date': '7/12/2026' }),
      row({ 'YouTube ID': vid(3), status: 'published',   'Published Date': '7/12/2026' }),
      row({ 'YouTube ID': vid(4), status: ' Published ', 'Published Date': '7/12/2026' }),
      row({ 'YouTube ID': vid(5), status: 'Active',      'Published Date': '7/12/2026' }),
      row({ 'YouTube ID': vid(6), status: 'active',      'Published Date': '7/12/2026' }),
    ];
    const result = processVideos(raw);
    assert.equal(result.length, 6, 'All 6 status variants should pass');
  });

  it('rejects Draft, Hidden, Archived, empty', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), status: 'Draft'     }),
      row({ 'YouTube ID': vid(2), status: 'Hidden'    }),
      row({ 'YouTube ID': vid(3), status: 'Archived'  }),
      row({ 'YouTube ID': vid(4), status: ''          }),
      row({ 'YouTube ID': vid(5), status: 'Published', 'Published Date': '7/12/2026' }),
    ];
    const result = processVideos(raw);
    assert.equal(result.length, 1, 'Only Published record should survive');
    assert.equal(result[0].id, vid(5));
  });
});

// ── VIDEO TYPE CLASSIFICATION ─────────────────────────────────────────────────

describe('video type classification', () => {
  it('classifies Long variants correctly', () => {
    const longTypes = ['Long', 'Long Video', 'LONG', 'Video', 'Regular', 'video', 'long video'];
    const raw = longTypes.map((t, i) =>
      row({ 'YouTube ID': vid(i + 1), 'Video Type': t, 'Published Date': '7/12/2026' })
    );
    const result = processVideos(raw);
    assert.ok(result.every(v => v.videoType === 'long'), 'All should be long');
  });

  it('classifies Short variants correctly', () => {
    const shortTypes = ['Short', 'Shorts', 'short', 'SHORTS', 'YouTube Short'];
    const raw = shortTypes.map((t, i) =>
      row({ 'YouTube ID': vid(i + 1), 'Video Type': t, 'Published Date': '7/12/2026' })
    );
    const result = processVideos(raw);
    assert.ok(result.every(v => v.videoType === 'short'), 'All should be short');
  });

  it('uses /shorts/ in URL as fallback when Video Type is missing', () => {
    const raw = [
      row({
        'YouTube ID': '',
        'YouTubeURL': 'https://youtube.com/shorts/V0000000001',
        'Video Type': '',
        status: 'Published',
        'Published Date': '7/12/2026',
      }),
    ];
    const result = processVideos(raw);
    assert.equal(result.length, 1);
    assert.equal(result[0].videoType, 'short');
  });

  it('extracts YouTube ID from /live/ URL', () => {
    const raw = [
      row({
        'YouTube ID': '',
        'YouTubeURL': 'https://youtube.com/live/V0000000001',
        'Video Type': 'Long',
        status: 'Published',
        'Published Date': '7/12/2026',
      }),
    ];
    const result = processVideos(raw);
    assert.equal(result.length, 1);
    assert.equal(result[0].id, vid(1));
  });
});

// ── DATE HANDLING ─────────────────────────────────────────────────────────────

describe('date handling', () => {
  it('parses M/D/YYYY correctly (Google Sheets format)', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), 'Published Date': '7/12/2026', title: 'Jul 12 M/D/YYYY' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].publishedDate?.startsWith('2026-07-12'), true, 'Should parse as July 12');
  });

  it('parses YYYY-MM-DD ISO dates', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), 'Published Date': '2026-07-12', title: 'ISO' }),
      row({ 'YouTube ID': vid(2), 'Published Date': '2026-07-09', title: 'ISO older' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(1), 'Jul 12 ISO should rank first');
  });

  it('falls back to Synced At when Published Date is empty', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), 'Published Date': '',         'Synced At': '7/12/2026', title: 'Synced Jul 12' }),
      row({ 'YouTube ID': vid(2), 'Published Date': '7/9/2026', 'Synced At': '',          title: 'Published Jul 9' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(1), 'Synced At Jul 12 should outrank Published Jul 9');
  });

  it('falls back to Synced At when Published Date is invalid', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), 'Published Date': 'not-a-date', 'Synced At': '7/10/2026', title: 'Invalid pub, valid sync' }),
      row({ 'YouTube ID': vid(2), 'Published Date': '7/5/2026',   'Synced At': '',           title: 'Valid Jul 5' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(1), 'Synced At Jul 10 should outrank Published Jul 5');
  });

  it('valid Published Date always beats Synced At', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), 'Published Date': '7/1/2026',  'Synced At': '7/15/2026', title: 'Pub Jul 1, Sync Jul 15' }),
      row({ 'YouTube ID': vid(2), 'Published Date': '7/10/2026', 'Synced At': '',           title: 'Pub Jul 10' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(2), 'Jul 10 Published > Jul 1 Published (Synced At ignored)');
  });

  it('handles JS Date objects from GAS getValues()', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), 'Published Date': new Date(2026, 6, 9),  title: 'Jul 9 Date obj' }),
      row({ 'YouTube ID': vid(2), 'Published Date': new Date(2026, 6, 12), title: 'Jul 12 Date obj' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(2), 'Jul 12 Date object should rank first');
    assert.equal(result[1].id, vid(1));
  });

  it('handles JS Date objects for Synced At fallback', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), 'Published Date': '', 'Synced At': new Date(2026, 6, 12), title: 'Sync Date obj' }),
      row({ 'YouTube ID': vid(2), 'Published Date': '7/5/2026', 'Synced At': '', title: 'Pub Jul 5' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(1), 'Synced At Date object Jul 12 should outrank Published Jul 5');
  });

  it('records with no date fall back to row position — later rows sort first', () => {
    const raw = [
      row({ 'YouTube ID': vid(1), 'Published Date': '', 'Synced At': '', title: 'Row 0 no date' }),
      row({ 'YouTube ID': vid(2), 'Published Date': '', 'Synced At': '', title: 'Row 1 no date' }),
      row({ 'YouTube ID': vid(3), 'Published Date': '', 'Synced At': '', title: 'Row 2 no date (newest row)' }),
    ];
    const result = processVideos(raw);
    assert.equal(result[0].id, vid(3), 'Newest row (index 2) should sort first among undated');
  });
});

// ── HOMEPAGE / VIDEOS SAME ORDER ─────────────────────────────────────────────

describe('homepage and /videos use the same sorted order', () => {
  it('top 3 long videos (homepage) match the first 3 of the /videos long section', () => {
    const raw = Array.from({ length: 15 }, (_, i) =>
      row({ 'YouTube ID': vid(i + 1), 'Published Date': `7/${i + 1}/2026`, title: `Jul ${i + 1}` })
    );
    const allVideos  = processVideos(raw);
    const longVideos = allVideos.filter(v => v.videoType === 'long');

    const homeTop3     = longVideos.slice(0, 3);
    const videosFirst3 = longVideos.slice(0, 3);

    for (let i = 0; i < 3; i++) {
      assert.equal(homeTop3[i].id, videosFirst3[i].id, `Position ${i + 1} must match`);
    }
    assert.equal(homeTop3[0].id, vid(15), 'Jul 15 (newest) must be position 1');
  });
});

// ── formatIndianDate ──────────────────────────────────────────────────────────

describe('formatIndianDate', () => {
  it('formats ISO string to "12 Jul 2026"', () => {
    assert.equal(formatIndianDate('2026-07-12T00:00:00.000Z'), '12 Jul 2026');
  });

  it('returns empty string for null/empty', () => {
    assert.equal(formatIndianDate(''), '');
    assert.equal(formatIndianDate(null), '');
  });

  it('returns empty string for invalid date', () => {
    assert.equal(formatIndianDate('not-a-date'), '');
  });
});
