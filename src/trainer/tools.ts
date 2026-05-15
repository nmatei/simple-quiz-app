import { getEl, getEls, getStoredUserName, setUserName, sleep, download } from "../common/common";
import { printPage, submitTest, setParam, zipGradeCSV } from "../common/utilities";
import { simplePrompt, simpleAlert, simpleConfirm } from "../common/simplePrompt/simplePrompt";

export type AutoTestSetState = {
  domain: string;
  type: string;
  expire: number;
  groups: { [level: string]: number[] };
  generatedAt: string;
  validUntilISO: string;
};

type TestSetFileNames = {
  keyLetter: string;
  blankTitle: string;
  answersTitle: string;
  csvFileName: string;
  instructionsFileName: string;
};

function buildInstructionsHtml(params: {
  type: string;
  day: string;
  keyLetter: string;
  expire: number;
  domain: string;
  groups: { [level: string]: number[] };
  generatedAt: string;
  validUntilISO: string;
  testLink: string;
}): string {
  const { type, day, keyLetter, expire, domain, groups, generatedAt, validUntilISO, testLink } = params;
  const groupsJson = JSON.stringify(groups);
  const generatedAtStr = new Date(generatedAt).toLocaleString();
  const validUntilStr = new Date(validUntilISO).toLocaleString();
  const blankTitle = `${type}-test-${day}-${keyLetter}`;
  const answersTitle = `${type}-test-${day}-${keyLetter}-answers`;
  const csvFileName = `${type}-test-${day}-${keyLetter}-answers-zipgrade`;
  const instructionsFileName = `${type}-test-${day}-${keyLetter}-instructions`;

  // Strip allowUnload from the test link (it's an internal trainer param)
  const cleanTestLink = (() => {
    try {
      const u = new URL(testLink);
      u.searchParams.delete("allowUnload");
      return u.toString();
    } catch {
      return testLink;
    }
  })();

  const favicon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect x='4' y='2' width='24' height='28' rx='3' fill='%231a5276'/><rect x='8' y='8' width='16' height='2' rx='1' fill='white' opacity='.6'/><rect x='8' y='13' width='16' height='2' rx='1' fill='white' opacity='.6'/><rect x='8' y='18' width='10' height='2' rx='1' fill='white' opacity='.6'/><circle cx='23' cy='23' r='7' fill='%23e8a020'/><circle cx='23' cy='19' r='1.3' fill='white'/><rect x='21.7' y='21.5' width='2.6' height='4.5' rx='1.3' fill='white'/></svg>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Instructions — ${blankTitle}</title>
  <link rel="icon" type="image/svg+xml" href="${favicon}">
  <style>
    body{font-family:Arial,sans-serif;max-width:860px;margin:40px auto;padding:0 24px;color:#333;background:#f5f6fa}
    h1{color:#1a5276;border-bottom:3px solid #1a5276;padding-bottom:10px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between}
    h2{color:#1a5276;margin:0 0 14px;display:flex;align-items:center;justify-content:space-between}
    h3{color:#2c3e50;margin:16px 0 8px}
    .section{background:#fff;border-radius:8px;padding:20px 24px;margin-bottom:20px;box-shadow:0 1px 4px rgba(0,0,0,.1)}
    table{border-collapse:collapse;width:100%}
    td{padding:7px 12px;border-bottom:1px solid #e8e8e8}
    td:first-child{font-weight:bold;color:#555;width:160px;white-space:nowrap}
    pre{background:#f4f4f4;border:1px solid #ddd;border-radius:4px;padding:14px;overflow-x:auto;white-space:pre-wrap;word-break:break-all;font-size:13px;margin:8px 0 0}
    code{font-family:'Courier New',monospace}
    a{color:#1a5276;word-break:break-all;text-decoration:none}
    a:hover{text-decoration:underline}
    ol,ul{padding-left:22px;line-height:1.9;margin:8px 0}
    .badge{display:inline-block;background:#1a5276;color:#fff;border-radius:4px;padding:2px 12px;font-size:15px;font-weight:bold;vertical-align:middle}
    .note{background:#fff3cd;border-left:4px solid #f0ad4e;padding:10px 16px;border-radius:0 4px 4px 0;margin:0 0 12px;font-size: 0.8em;}
    .fn{font-family:'Courier New',monospace;background:#eef;padding:1px 7px;border-radius:3px;font-size:13px}
    .copy-btn{cursor:pointer;background:#1a5276;color:#fff;border:none;border-radius:4px;padding:4px 12px;font-size:13px;margin-left:10px;vertical-align:middle}
    .copy-btn:hover{background:#2471a3}
    .copy-btn.copied{background:#28a745}
  </style>
</head>
<body>
  <h1><span>&#x1F4CB; Test Instructions</span><span class="badge">${keyLetter}</span></h1>

  <div class="section">
    <h2>&#x1F4C5; General information</h2>
    <table>
      <tr><td>Generated</td><td>${generatedAtStr}</td></tr>
      <tr><td>Valid Until</td><td>${validUntilStr} (${expire} min)</td></tr>
      <tr><td>Domain</td><td>${domain}</td></tr>
      <tr><td>Type</td><td>${type}</td></tr>
      <tr><td>Key Letter</td><td><strong>${keyLetter}</strong></td></tr>
    </table>
  </div>

  <div class="section">
    <h2>&#x1F517; Test Link <button class="copy-btn" data-copy="${cleanTestLink}">Copy</button></h2>
    <pre><code><a href="${cleanTestLink}" target="_blank">${cleanTestLink}</a></code></pre>
  </div>

  <div class="section">
    <h2>&#x1F4DD; Selected Questions <button class="copy-btn" data-copy="${groupsJson.replace(/"/g, "&quot;")}">Copy</button></h2>
    <div class="note">
      To restore this question set: go to <strong>Trainer Tools / Prepare Test</strong> &rarr; then <strong>Trainer Tools / Select by ID's</strong> &rarr; paste the JSON below.
    </div>
    <pre><code>${groupsJson}</code></pre>
  </div>

  <div class="section">
    <h2>&#x1F4C1; Generated Files</h2>
    <ol>
      <li><span class="fn">${blankTitle}.pdf</span> &mdash; Blank test (print and give to students)</li>
      <li><span class="fn">${answersTitle}.pdf</span> &mdash; Answer key (use for grading)</li>
      <li><span class="fn">${csvFileName}.csv</span> &mdash; ZipGrade answer key</li>
      <li><span class="fn">${instructionsFileName}.html</span> &mdash; This file</li>
    </ol>
  </div>

  <div class="section">
    <h2>&#x2705; Grading Instructions</h2>
    <h3>Manual Grading</h3>
    <ol>
      <li>Print the answer key: <span class="fn">${answersTitle}.pdf</span></li>
      <li>Compare student answers with the highlighted correct answers</li>
    </ol>
    <h3>ZipGrade Grading</h3>
    <ol>
      <li>Upload <span class="fn">${csvFileName}.csv</span> to <a href="https://www.zipgrade.com" target="_blank">zipgrade.com</a> or the ZipGrade app</li>
      <li>Scan student answer sheets</li>
    </ol>
  </div>

<script>
  document.querySelectorAll('.copy-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(function() {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function() { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      });
    });
  });
</script>
</body>
</html>`;
}

function buildTestSetConfirmHtml(params: TestSetFileNames & { printHint: string }): string {
  const { keyLetter, blankTitle, answersTitle, csvFileName, instructionsFileName, printHint } = params;
  return `<strong>&#x1F4E6; Generate Complete Test Set &mdash; Key: ${keyLetter}</strong>
    <div style="margin-top:10px">Steps that <strong>will happen automatically:</strong></div>
    <ul style="margin:8px 0;padding-left:0;list-style:none;line-height:2">
      <li><span style="margin-right:6px">⬜</span><code>${blankTitle}.pdf</code> &mdash; Print Blank Test (dialog 1)</li>
      <li><span style="margin-right:6px">⬜</span><code>${answersTitle}.pdf</code> &mdash; Print Answer Key (dialog 2)</li>
      <li><span style="margin-right:6px">⬜</span><code>${csvFileName}.csv</code> &mdash; Download ZipGrade CSV</li>
      <li><span style="margin-right:6px">⬜</span><code>${instructionsFileName}.html</code> &mdash; Download Instructions</li>
    </ul>
    <div style="background:#fff3cd;border-left:3px solid #f0ad4e;padding:7px 12px;border-radius:0 4px 4px 0;margin-top:6px">
      &#x26A0;&#xFE0F; Two print dialogs will open.<br>
      ${printHint}.<br>
      Uncheck <strong>Print headers and footers</strong>.
    </div>`;
}

function buildTestSetCompleteHtml(): string {
  return `<div style="margin-top:12px">&#x1F4DD; <strong>Grading:</strong></div>
    <ul style="margin:8px 0;padding-left:22px;line-height:1.9">
      <li>&#x1F4C4; Manual: Use the answer key PDF to grade student papers</li>
      <li>&#x1F4F1; ZipGrade: Upload CSV to <a href="https://www.zipgrade.com" target="_blank">zipgrade.com</a> and scan student sheets</li>
    </ul>
    <div style="margin-top:10px;background:#d4edda;border-left:3px solid #28a745;padding:7px 12px;border-radius:0 4px 4px 0">
      &#x1F3E0; You will be redirected to the main page.
    </div>`;
}

function buildTestSetProgressHtml(params: TestSetFileNames): string {
  const { keyLetter, blankTitle, answersTitle, csvFileName, instructionsFileName } = params;
  return `<div id="progress-title"><strong>&#x1F4E6; Generating Test Set &mdash; Key: ${keyLetter}</strong></div>
    <div style="margin-top:10px">&#x1F4E5; <strong>Files saved to your Downloads:</strong></div>
    <ul style="margin:8px 0;padding-left:0;list-style:none;line-height:2">
      <li><span id="progress-step-0" style="margin-right:6px">⬜</span><code>${blankTitle}.pdf</code> &mdash; Blank Test (print dialog 1)</li>
      <li><span id="progress-step-1" style="margin-right:6px">⬜</span><code>${answersTitle}.pdf</code> &mdash; Answer Key (print dialog 2)</li>
      <li><span id="progress-step-2" style="margin-right:6px">⬜</span><code>${csvFileName}.csv</code> &mdash; ZipGrade CSV</li>
      <li><span id="progress-step-3" style="margin-right:6px">⬜</span><code>${instructionsFileName}.html</code> &mdash; Instructions</li>
    </ul>
    <div id="progress-complete" style="display:none">${buildTestSetCompleteHtml()}</div>`;
}

function updateProgressStep(stepIndex: number) {
  const el = getEl(`#progress-step-${stepIndex}`);
  if (el) el.textContent = "✅";
}

function finalizeProgress(keyLetter: string) {
  const titleEl = getEl("#progress-title");
  if (titleEl) titleEl.innerHTML = `<strong>&#x2705; Test Set Complete! (Key: ${keyLetter})</strong>`;
  const completeEl = getEl("#progress-complete");
  if (completeEl) completeEl.style.display = "";
}

export async function runGenerateTestSet(
  state: AutoTestSetState,
  generator: QuizGenerator,
  type: string,
  day: string,
  applyUserName: (type: string, day: string, ask: boolean) => Promise<string>,
  setAllowUnload: () => void
) {
  // Store original name so we can restore it after
  const originalName = getStoredUserName();

  // Set name to &nbsp; so the student name field appears blank on the printed test
  setUserName("&nbsp;");
  await applyUserName(type, day, false);
  // Title is now: ${type}-test-${day}  (the "-&nbsp;" suffix is stripped by applyUserName)

  // Prompt for key letter before printing so trainer can generate multiple versions (A, B, C...)
  const keyLetter = (await simplePrompt("Key Letter (A, B, C...)", "A", "", { outsideClickClose: false })) || "A";

  // Append key letter to title: ${type}-test-${day}-A
  document.title = `${type}-test-${day}-${keyLetter}`;
  const blankTitle = document.title;
  const answersTitle = `${type}-test-${day}-${keyLetter}-answers`;
  const csvFileName = `${type}-test-${day}-${keyLetter}-answers-zipgrade`;
  const instructionsFileName = `${type}-test-${day}-${keyLetter}-instructions`;
  const fileNames: TestSetFileNames = { keyLetter, blankTitle, answersTitle, csvFileName, instructionsFileName };

  // Show initial confirmation with all steps and actual filenames
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const printHint = isSafari
    ? `In the print dialog click <strong>PDF &rarr; Save as PDF</strong>`
    : `In the print dialog set <strong>Destination: Save as PDF</strong>`;
  const confirmed = await simpleConfirm(buildTestSetConfirmHtml({ ...fileNames, printHint }), {
    ok: "Start",
    cancel: "Cancel",
    focus: "yes",
    outsideClickClose: false
  });

  if (!confirmed) {
    // Restore on cancel
    setUserName(originalName);
    document.title = `${type}-test-${day}-${originalName}`.replace("-&nbsp;", "");
    getEls<HTMLElement>(".student-name").forEach(el => (el.innerHTML = originalName || "&nbsp;"));
    return;
  }

  // Show progress dialog (non-awaited — hidden on print, auto-updates after each step)
  const progressPromise = simpleAlert(buildTestSetProgressHtml(fileNames), { esc: false, outsideClickClose: false });
  document.getElementById("custom-prompt-container")?.classList.add("hide-on-print");
  // Disable OK until all steps complete
  const progressOkBtn = getEl<HTMLButtonElement>("#custom-prompt-container button[type='submit']");
  if (progressOkBtn) progressOkBtn.disabled = true;

  // 1. Print blank test (window.print() blocks until dialog is closed)
  await printPage();
  updateProgressStep(0);
  await sleep(2000);

  // Submit test — skip auto-print and statistics dialog
  await submitTest(generator, { skipPrint: true, skipStatistics: true });

  // 2. Update title for answer key PDF and print (hide points — they add noise to the PDF)
  document.title = answersTitle;
  const body = getEl("body");
  const hadHidePoints = body.classList.contains("hide-points");
  body.classList.add("hide-points");
  await printPage();
  if (!hadHidePoints) {
    body.classList.remove("hide-points");
  }
  updateProgressStep(1);
  await sleep(2000);

  // 3. Download ZipGrade CSV
  const csvContent = zipGradeCSV.join(`\n${keyLetter},`);
  download(csvContent, `${csvFileName}.csv`, "text/csv");
  updateProgressStep(2);
  await sleep(2000);

  // 4. Download instructions HTML
  const instructionsHtml = buildInstructionsHtml({
    type,
    day,
    keyLetter,
    expire: state.expire,
    domain: state.domain,
    groups: state.groups,
    generatedAt: state.generatedAt,
    validUntilISO: state.validUntilISO,
    testLink: window.location.href
  });
  download(instructionsHtml, `${instructionsFileName}.html`, "text/html");
  updateProgressStep(3);
  await sleep(2000);

  // Finalize progress dialog → complete state
  finalizeProgress(keyLetter);
  // Re-enable OK button — all steps complete
  const okBtn = getEl<HTMLButtonElement>("#custom-prompt-container button[type='submit']");
  if (okBtn) okBtn.disabled = false;

  // Restore name and title
  setUserName(originalName);
  document.title = `${type}-test-${day}-${originalName}`.replace("-&nbsp;", "");
  getEls<HTMLElement>(".student-name").forEach(el => (el.innerHTML = originalName || "&nbsp;"));

  // Await progress dialog (user clicks OK to proceed)
  await progressPromise;

  // Remove test param and return to main page
  setAllowUnload();
  setParam("test");
  window.location.reload();
}
