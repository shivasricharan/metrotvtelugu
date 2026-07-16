// Metro TV Telugu — Google Apps Script CMS Backend
// =============================================================================
// DEPLOYMENT (manual — clasp is not connected):
//   1. Open the Apps Script project linked to your Google Sheet.
//   2. Replace ALL content of Code.gs with this file.
//   3. Extensions → Apps Script → Deploy → New deployment
//      Type: Web app
//      Execute as: Me
//      Who has access: Anyone
//   4. Copy the new deployment URL and update GOOGLE_SCRIPT_METRO_CMS_URL in
//      Netlify (Site → Environment variables) and your local .env.local.
//   5. Trigger the existing caches to flush: visit /api/debug/cms?k=metro-diag-2026
//      on the live site or wait 5 minutes for script cache to expire.
// =============================================================================

// ── Sheet names ────────────────────────────────────────────────────────────
var SHEET_VIDEOS    = 'Videos';
var SHEET_SETTINGS  = 'Settings';
var SHEET_TICKER    = 'Ticker';
var SHEET_SHOWS     = 'Shows';
var SHEET_CONTACTS  = 'Contacts';
var SHEET_ENQUIRIES = 'Enquiries';

// Script-level cache TTL in seconds (5 minutes).
var CACHE_KEY = 'metro_cms_all';
var CACHE_TTL = 300;

// ── Entry points ───────────────────────────────────────────────────────────

function doGet(e) {
  var type = (e && e.parameter && e.parameter.type) ? e.parameter.type : 'all';
  try {
    var data;
    if (type === 'videos') {
      data = { videos: getVideos() };
    } else if (type === 'settings') {
      data = { settings: getSettings() };
    } else if (type === 'ticker') {
      data = { ticker: getTicker() };
    } else if (type === 'shows') {
      data = { shows: getShows() };
    } else {
      // 'all' (default) — return everything in one call
      data = getAllData();
    }
    return jsonOk(data);
  } catch (err) {
    return jsonError(err.message);
  }
}

function doPost(e) {
  try {
    var body   = JSON.parse(e.postData.contents);
    var action = body.action || '';

    if (action === 'processUrls') {
      processYouTubeUrls();
      return jsonOk({ processed: true });
    }
    if (action === 'saveContact') {
      saveContact(body);
      return jsonOk({ saved: true });
    }
    if (action === 'saveEnquiry') {
      saveEnquiry(body);
      return jsonOk({ saved: true });
    }
    return jsonError('Unknown action: ' + action);
  } catch (err) {
    return jsonError(err.message);
  }
}

// ── getAllData (with script-level cache) ───────────────────────────────────

function getAllData() {
  var cache  = CacheService.getScriptCache();
  var cached = cache.get(CACHE_KEY);
  if (cached) {
    try { return JSON.parse(cached); } catch (_) {}
  }

  var data = {
    videos:   getVideos(),
    settings: getSettings(),
    ticker:   getTicker(),
    shows:    getShows(),
  };

  try {
    // CacheService max value size is 100 KB; skip silently if too large.
    var serialised = JSON.stringify(data);
    if (serialised.length < 100000) {
      cache.put(CACHE_KEY, serialised, CACHE_TTL);
    }
  } catch (_) {}

  return data;
}

// ── Videos ─────────────────────────────────────────────────────────────────
// Returns published videos sorted newest-first by Published Date.
// Records without a date are placed at the end, ordered by their original
// row position (later rows first, since new records are appended at the bottom).

function getVideos() {
  var rows      = getAllRows(SHEET_VIDEOS);
  var published = [];

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var s = String(r['Status'] || r['status'] || '').trim().toLowerCase();
    if (s === 'published' || s === 'active') {
      published.push(r);
    }
  }

  // Sort newest-first by Published Date.
  published.sort(function(a, b) {
    var da = parseSheetDate(a['Published Date']);
    var db = parseSheetDate(b['Published Date']);

    if (!da && !db) {
      // Both undated — later row index sorts first (new rows are at the bottom).
      return (b._rowIndex || 0) - (a._rowIndex || 0);
    }
    if (!da) return 1;   // a has no date → sink to end
    if (!db) return -1;  // b has no date → sink to end
    return db.getTime() - da.getTime(); // descending
  });

  // Strip internal _rowIndex before returning.
  return published.map(function(r) {
    var out = {};
    var keys = Object.keys(r);
    for (var k = 0; k < keys.length; k++) {
      if (keys[k] !== '_rowIndex') out[keys[k]] = r[keys[k]];
    }
    return out;
  });
}

// ── Settings ───────────────────────────────────────────────────────────────
// Reads key/value pairs from column A (key) and column B (value).
// Returns a flat object with lowercased, whitespace-stripped keys.

function getSettings() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_SETTINGS);
  if (!sheet) return {};

  var values   = sheet.getDataRange().getValues();
  var settings = {};

  for (var i = 0; i < values.length; i++) {
    var key = String(values[i][0] || '').trim().toLowerCase().replace(/\s+/g, '');
    var val = String(values[i][1] || '').trim();
    if (key) settings[key] = val;
  }
  return settings;
}

// ── Ticker ─────────────────────────────────────────────────────────────────

function getTicker() {
  var rows   = getAllRows(SHEET_TICKER);
  var result = [];

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var s = String(r['Status'] || r['status'] || '').trim().toLowerCase();
    if (s === 'published' || s === 'active' || s === 'enabled' || s === 'yes') {
      var text = String(r['Text'] || r['text'] || r['Title'] || r['title'] || '').trim();
      if (text) result.push({ text: text });
    }
  }
  return result;
}

// ── Shows ──────────────────────────────────────────────────────────────────

function getShows() {
  var rows   = getAllRows(SHEET_SHOWS);
  var result = [];

  for (var i = 0; i < rows.length; i++) {
    var r = rows[i];
    var s = String(r['Status'] || r['status'] || '').trim().toLowerCase();
    if (s === 'published' || s === 'active') {
      var out = {};
      var keys = Object.keys(r);
      for (var k = 0; k < keys.length; k++) {
        if (keys[k] !== '_rowIndex') out[keys[k]] = r[keys[k]];
      }
      result.push(out);
    }
  }
  return result;
}

// ── Sheet row reader ───────────────────────────────────────────────────────
// Reads every non-blank row from a sheet and returns an array of plain objects
// keyed by the header row. Date cells are serialised to M/D/YYYY strings
// (matching what the user sees in the sheet) to avoid UTC-drift issues.
// The internal _rowIndex property (0-based data row index) is added for
// stable sort tie-breaking and stripped before the data leaves this file.

function getAllRows(sheetName) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  var headers = [];
  for (var h = 0; h < values[0].length; h++) {
    headers.push(String(values[0][h]).trim());
  }

  var rows = [];

  for (var i = 1; i < values.length; i++) {
    var row     = values[i];
    var isBlank = true;

    for (var c = 0; c < row.length; c++) {
      if (row[c] !== '' && row[c] !== null && row[c] !== undefined) {
        isBlank = false;
        break;
      }
    }
    if (isBlank) continue;

    var obj = { _rowIndex: i - 1 };

    for (var ci = 0; ci < headers.length; ci++) {
      var cell = row[ci];
      if (cell instanceof Date) {
        // Convert GAS Date object → M/D/YYYY string using script-local timezone.
        // This is exactly what the user sees in the sheet cell.
        obj[headers[ci]] = formatDateCell(cell);
      } else {
        obj[headers[ci]] = (cell !== null && cell !== undefined) ? cell : '';
      }
    }

    rows.push(obj);
  }

  return rows;
}

// Format a Date object as M/D/YYYY using the Apps Script local timezone
// (which matches the Google Sheets display timezone).
function formatDateCell(d) {
  if (!(d instanceof Date) || isNaN(d.getTime())) return '';
  return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
}

// Parse a Published Date value from the sheet. Handles:
//   "7/12/2026"              → M/D/YYYY (Google Sheets text/date display)
//   "2026-07-12"             → ISO date string
//   "2026-07-12T18:30:00Z"   → ISO datetime
//   Date object              → already a Date (rare after formatDateCell above)
// Returns a Date or null.
function parseSheetDate(val) {
  if (!val) return null;
  if (val instanceof Date) return isNaN(val.getTime()) ? null : val;

  var s = String(val).trim();
  if (!s) return null;

  // M/D/YYYY
  var mdy = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(s);
  if (mdy) {
    var d = new Date(parseInt(mdy[3], 10), parseInt(mdy[1], 10) - 1, parseInt(mdy[2], 10));
    return isNaN(d.getTime()) ? null : d;
  }

  // ISO or any other format the JS Date constructor understands.
  var d2 = new Date(s);
  return isNaN(d2.getTime()) ? null : d2;
}

// ── processYouTubeUrls ─────────────────────────────────────────────────────
// Utility: scan the Videos sheet and, for rows missing a YouTube ID, extract
// one from the YouTubeURL column. Also copies Synced At → Published Date when
// Published Date is blank.
// Run this from the Apps Script editor as a one-off, or wire it to a trigger.

function processYouTubeUrls() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_VIDEOS);
  if (!sheet) return;

  var data    = sheet.getDataRange().getValues();
  var headers = [];
  for (var h = 0; h < data[0].length; h++) {
    headers.push(String(data[0][h]).trim());
  }

  var idxId   = headers.indexOf('YouTube ID');
  var idxUrl  = headers.indexOf('YouTubeURL');
  var idxDate = headers.indexOf('Published Date');
  var idxSync = headers.indexOf('Synced At');

  if (idxId < 0 || idxUrl < 0) return;

  var YT_RE   = /(?:[?&]v=|youtu\.be\/|\/shorts\/|\/embed\/|\/v\/|\/live\/)([a-zA-Z0-9_-]{11})/;
  var changed = false;

  for (var r = 1; r < data.length; r++) {
    var row   = data[r];
    var rawId = String(row[idxId] || '').trim();

    // Extract YouTube ID from URL if missing or invalid.
    if (!rawId || rawId.length !== 11) {
      var url   = String(row[idxUrl] || '').trim();
      var match = url.match(YT_RE);
      if (match) {
        sheet.getRange(r + 1, idxId + 1).setValue(match[1]);
        changed = true;
      }
    }

    // Fill Published Date from Synced At if Published Date is blank.
    if (idxDate >= 0 && idxSync >= 0) {
      var pub  = row[idxDate];
      var sync = row[idxSync];
      var pubEmpty = (pub === '' || pub === null || pub === undefined);
      if (pubEmpty && sync && sync !== '') {
        sheet.getRange(r + 1, idxDate + 1).setValue(sync);
        changed = true;
      }
    }
  }

  if (changed) {
    // Flush cache so the next web-app request picks up the updated data.
    try { CacheService.getScriptCache().remove(CACHE_KEY); } catch (_) {}
  }
}

// ── Save helpers ───────────────────────────────────────────────────────────

function saveContact(body) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_CONTACTS);
  if (!sheet) sheet = ss.insertSheet(SHEET_CONTACTS);
  sheet.appendRow([
    new Date(),
    String(body.name    || '').trim(),
    String(body.email   || '').trim(),
    String(body.phone   || '').trim(),
    String(body.subject || '').trim(),
    String(body.message || '').trim(),
  ]);
}

function saveEnquiry(body) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_ENQUIRIES);
  if (!sheet) sheet = ss.insertSheet(SHEET_ENQUIRIES);
  sheet.appendRow([
    new Date(),
    String(body.name    || '').trim(),
    String(body.email   || '').trim(),
    String(body.phone   || '').trim(),
    String(body.company || '').trim(),
    String(body.message || '').trim(),
  ]);
}

// ── Response helpers ───────────────────────────────────────────────────────

function jsonOk(data) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, data: data }))
    .setMimeType(ContentService.MimeType.JSON);
}

function jsonError(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: false, error: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}
