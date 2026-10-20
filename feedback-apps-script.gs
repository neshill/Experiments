// Fali Ti Jedan Papir — feedback inbox
// Paste this into a Google Sheet's Apps Script (Extensions → Apps Script), then
// Deploy → New deployment → Web app · Execute as: Me · Who has access: Anyone.
// Copy the web app URL (ends in /exec) into FEEDBACK_URL in index.html.
// Each message from the game becomes one row in a "Feedback" tab (created on first use).

const SHEET_NAME = 'Feedback';
const HEADERS = ['Received', 'Type', 'Message', 'Name', 'Version', 'Where', 'Patience', 'Screen', 'Device'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // two players sending at once still get two separate rows
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) {
      sh = ss.insertSheet(SHEET_NAME);
      sh.appendRow(HEADERS);
      sh.setFrozenRows(1);
    }
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    // Trim lengths, and stop text that starts with = + - @ from being run as a spreadsheet formula.
    const clean = (v, n) => {
      const s = String(v == null ? '' : v).slice(0, n);
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    };
    if (!String(d.message || '').trim()) return reply({ ok: false, error: 'empty' });
    sh.appendRow([
      new Date(),
      clean(d.type, 20), clean(d.message, 5000), clean(d.name, 80), clean(d.version, 20),
      clean(d.where, 120), clean(d.patience, 20), clean(d.screen, 40), clean(d.ua, 300),
    ]);
    return reply({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Opening the URL in a browser shows this, handy to check the deployment is live.
function doGet() {
  return reply({ ok: true, hint: 'FT1P feedback endpoint. The game sends POST requests here.' });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
