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
//   5. Close and re-open the Google Sheet — the "Metro TV CMS" menu will appear.
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

// Undated records get a far-future sort base so they surface before old
// dated records. Mirrors the website's processVideos behaviour.
var UNDATED_BASE = 4102444800000; // ~2099-12-31 in ms

// ── Custom menu (appears in Google Sheets toolbar) ─────────────────────────

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Metro TV CMS')
    .addItem('Process YouTube URLs', 'processYouTubeUrls')
    .addSeparator()
    .addItem('Flush website cache', 'flushCache')
    .addToUi();
}

// Flush the 5-minute script cache so the next website request gets fresh data.
function flushCache() {
  try {
    CacheService.getScriptCache().remove(CACHE_KEY);
    SpreadsheetApp.getUi().alert('Cache flushed. The website will show fresh data within 60 seconds.');
  } catch (err) {
    SpreadsheetApp.getUi().alert('Error flushing cache: ' + err.message);
  }
}

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
    var serialised = JSON.stringify(data);
    // CacheService max value is 100 KB; skip silently if too large.
    if (serialised.length < 100000) {
      cache.put(CACHE_KEY, serialised, CACHE_TTL);
    }
  } catch (_) {}

  return data;
}

// ── Videos ─────────────────────────────────────────────────────────────────
// Returns published videos sorted newest-first.
// Undated records (no Published Date) surface before old dated records,
// with later rows (= more recently added) ranking first among undated ones.

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

  published.sort(function(a, b) {
    var da = parseSheetDate(a['Published Date']);
    var db = parseSheetDate(b['Published Date']);
    var sa = da ? da.getTime() : UNDATED_BASE + (a._rowIndex || 0);
    var sb = db ? db.getTime() : UNDATED_BASE + (b._rowIndex || 0);
    return sb - sa; // descending — largest (newest) first
  });

  // Strip internal _rowIndex before returning.
  return published.map(function(r) {
    var out  = {};
    var keys = Object.keys(r);
    for (var k = 0; k < keys.length; k++) {
      if (keys[k] !== '_rowIndex') out[keys[k]] = r[keys[k]];
    }
    return out;
  });
}

// ── Settings ───────────────────────────────────────────────────────────────

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
      var out  = {};
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
        obj[headers[ci]] = formatDateCell(cell);
      } else {
        obj[headers[ci]] = (cell !== null && cell !== undefined) ? cell : '';
      }
    }

    rows.push(obj);
  }

  return rows;
}

// Format a Date object as M/D/YYYY using Apps Script local timezone.
function formatDateCell(d) {
  if (!(d instanceof Date) || isNaN(d.getTime())) return '';
  return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
}

// Parse a Published Date that may be a M/D/YYYY string, ISO string, or Date object.
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

  // ISO or any other format.
  var d2 = new Date(s);
  return isNaN(d2.getTime()) ? null : d2;
}

// ── processYouTubeUrls (called from Metro TV CMS menu) ────────────────────
//
// Workflow:
//   1. Team member adds a new row: fills in Title, Category, YouTubeURL.
//   2. Team member opens Metro TV CMS → Process YouTube URLs.
//   3. This function scans every row with a YouTube URL and fills in any
//      missing fields automatically:
//        • YouTube ID   — extracted from the URL
//        • Video Type   — "Short" if URL contains /shorts/, else "Long"
//        • Published Date — today's date (M/D/YYYY) if empty
//        • Status        — "Published" if empty
//        • Synced At     — today's date if empty
//        • Slug          — generated from Title if empty
//
// Existing values are NEVER overwritten — only empty cells are filled.

function processYouTubeUrls() {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_VIDEOS);
  if (!sheet) {
    SpreadsheetApp.getUi().alert('Error: "' + SHEET_VIDEOS + '" sheet not found.');
    return;
  }

  var data    = sheet.getDataRange().getValues();
  var headers = [];
  for (var h = 0; h < data[0].length; h++) {
    headers.push(String(data[0][h]).trim());
  }

  // Column indices (−1 if column not found).
  var idx = {
    title:  headers.indexOf('Title'),
    cat:    headers.indexOf('Category'),
    url:    headers.indexOf('YouTubeURL'),
    id:     headers.indexOf('YouTube ID'),
    type:   headers.indexOf('Video Type'),
    date:   headers.indexOf('Published Date'),
    status: headers.indexOf('Status'),
    slug:   headers.indexOf('Slug'),
    sync:   headers.indexOf('Synced At'),
  };

  if (idx.url < 0 || idx.id < 0) {
    SpreadsheetApp.getUi().alert('Error: "YouTubeURL" or "YouTube ID" column not found.');
    return;
  }

  var YT_RE   = /(?:[?&]v=|youtu\.be\/|\/shorts\/|\/embed\/|\/v\/|\/live\/)([a-zA-Z0-9_-]{11})/;
  var today   = formatDateCell(new Date());
  var updated = 0;

  for (var r = 1; r < data.length; r++) {
    var row = data[r];
    var url = String(row[idx.url] || '').trim();
    if (!url) continue; // Skip rows with no URL

    var isShort = url.indexOf('/shorts/') !== -1;
    var match   = url.match(YT_RE);

    // ── YouTube ID ──────────────────────────────────────────────────────
    var rawId = String(row[idx.id] || '').trim();
    if ((!rawId || rawId.length !== 11) && match) {
      sheet.getRange(r + 1, idx.id + 1).setValue(match[1]);
      updated++;
    }

    // ── Video Type ──────────────────────────────────────────────────────
    if (idx.type >= 0) {
      var rawType = String(row[idx.type] || '').trim();
      if (!rawType) {
        sheet.getRange(r + 1, idx.type + 1).setValue(isShort ? 'Short' : 'Long');
        updated++;
      }
    }

    // ── Published Date — set to today only if empty ─────────────────────
    if (idx.date >= 0) {
      var rawDate  = row[idx.date];
      var dateEmpty = (rawDate === '' || rawDate === null || rawDate === undefined);
      if (dateEmpty) {
        sheet.getRange(r + 1, idx.date + 1).setValue(today);
        updated++;
      }
    }

    // ── Status — default to Published ───────────────────────────────────
    if (idx.status >= 0) {
      var rawStatus = String(row[idx.status] || '').trim();
      if (!rawStatus) {
        sheet.getRange(r + 1, idx.status + 1).setValue('Published');
        updated++;
      }
    }

    // ── Synced At — timestamp of last processing ─────────────────────────
    if (idx.sync >= 0) {
      var rawSync  = row[idx.sync];
      var syncEmpty = (rawSync === '' || rawSync === null || rawSync === undefined);
      if (syncEmpty) {
        sheet.getRange(r + 1, idx.sync + 1).setValue(today);
        updated++;
      }
    }

    // ── Slug — auto-generate from title ─────────────────────────────────
    if (idx.slug >= 0 && idx.title >= 0) {
      var rawSlug = String(row[idx.slug] || '').trim();
      if (!rawSlug) {
        var title = String(row[idx.title] || '').trim();
        if (title) {
          var slug = title.toLowerCase()
            .replace(/[^a-z0-9ఀ-౿\s-]/g, '') // keep Telugu chars too
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 80);
          if (slug) {
            sheet.getRange(r + 1, idx.slug + 1).setValue(slug);
            updated++;
          }
        }
      }
    }
  }

  // Flush script cache so next website request gets fresh data.
  try { CacheService.getScriptCache().remove(CACHE_KEY); } catch (_) {}

  var msg = updated > 0
    ? 'Done! ' + updated + ' cells updated.\n\nThe website will show the new videos within 60 seconds.'
    : 'Nothing to update — all rows already have complete data.';
  SpreadsheetApp.getUi().alert('Metro TV CMS', msg, SpreadsheetApp.getUi().ButtonSet.OK);
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
