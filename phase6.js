/* Phase 4: account, roles, shared shelters and report review via the local backend (features 60, 66, 68-70, 72, 98, 99, 115) */
const acct = { user: null, hasUsers: true, ready: false, backend: false, users: [], audit: [], reports: [], error: "", busy: false };
addMsgs({
  navAccount: ["Account & sync", "खाता और सिंक", "ଖାତା ଓ ସିଙ୍କ"],
  acctTitle: ["Account and shared data", "खाता और साझा डेटा", "ଖାତା ଓ ସେୟାର୍ ତଥ୍ୟ"], acctSubtitle: ["Sign in to share shelter records and review reports with your team through the server.", "सर्वर के ज़रिए टीम के साथ आश्रय रिकॉर्ड साझा करने और रिपोर्ट जाँचने के लिए साइन इन करें।", "ସର୍ଭର ମାଧ୍ୟମରେ ଦଳ ସହ ଆଶ୍ରୟସ୍ଥଳ ରେକର୍ଡ ସେୟାର୍ ଓ ରିପୋର୍ଟ ଯାଞ୍ଚ ପାଇଁ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ।"],
  acctNoServer: ["The server backend is not reachable. Local features still work.", "सर्वर बैकएंड उपलब्ध नहीं है। स्थानीय सुविधाएँ चलती रहेंगी।", "ସର୍ଭର ବ୍ୟାକ୍‌ଏଣ୍ଡ ମିଳୁନାହିଁ। ସ୍ଥାନୀୟ ସୁବିଧା ଚାଲିବ।"],
  acctFirst: ["No accounts exist yet. The first account created becomes the administrator.", "अभी कोई खाता नहीं है। बनाया गया पहला खाता प्रशासक होगा।", "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଖାତା ନାହିଁ। ପ୍ରଥମ ଖାତା ପ୍ରଶାସକ ହେବ।"],
  acctLocalNote: ["Account data is stored on the machine that runs this server. Without hosting, only people on this machine can use it.", "खाता डेटा उस मशीन पर रखा जाता है जो यह सर्वर चलाती है। होस्टिंग के बिना केवल इसी मशीन के लोग इसे इस्तेमाल कर सकते हैं।", "ଖାତା ତଥ୍ୟ ଏହି ସର୍ଭର ଚଳାଉଥିବା ମେସିନ୍‌ରେ ରଖାଯାଏ। ହୋଷ୍ଟିଂ ବିନା କେବଳ ଏହି ମେସିନ୍‌ର ଲୋକ ଏହାକୁ ବ୍ୟବହାର କରିପାରିବେ।"],
  fUsername: ["Username (3-40 letters, digits, . _ -)", "उपयोगकर्ता नाम (3-40 अक्षर, अंक, . _ -)", "ଉପଯୋଗକର୍ତ୍ତା ନାମ (3-40 ଅକ୍ଷର, ଅଙ୍କ, . _ -)"], fFullName: ["Full name", "पूरा नाम", "ପୂରା ନାମ"], fPassword: ["Password (at least 8 characters)", "पासवर्ड (कम से कम 8 अक्षर)", "ପାସୱାର୍ଡ (ଅତି କମ୍ 8 ଅକ୍ଷର)"],
  signIn: ["Sign in", "साइन इन", "ସାଇନ୍ ଇନ୍"], signUp: ["Create account", "खाता बनाएँ", "ଖାତା ତିଆରି କରନ୍ତୁ"], signOut: ["Sign out", "साइन आउट", "ସାଇନ୍ ଆଉଟ୍"],
  signedInAs: ["Signed in as", "इस रूप में साइन इन", "ଏହି ଭାବେ ସାଇନ୍ ଇନ୍"], role_citizen: ["Citizen", "नागरिक", "ନାଗରିକ"], role_volunteer: ["Volunteer", "स्वयंसेवक", "ସ୍ବେଚ୍ଛାସେବୀ"], role_admin: ["Administrator", "प्रशासक", "ପ୍ରଶାସକ"],
  errInvalid: ["Check the details. The username may be wrong or the password too short.", "विवरण जाँचें। उपयोगकर्ता नाम गलत या पासवर्ड बहुत छोटा हो सकता है।", "ବିବରଣୀ ଯାଞ୍ଚ କରନ୍ତୁ। ଉପଯୋଗକର୍ତ୍ତା ନାମ ଭୁଲ ବା ପାସୱାର୍ଡ ଛୋଟ ହୋଇପାରେ।"], errExists: ["This username is taken.", "यह उपयोगकर्ता नाम लिया जा चुका है।", "ଏହି ଉପଯୋଗକର୍ତ୍ତା ନାମ ନିଆଯାଇଛି।"], errCreds: ["Wrong username or password.", "उपयोगकर्ता नाम या पासवर्ड गलत है।", "ଉପଯୋଗକର୍ତ୍ତା ନାମ ବା ପାସୱାର୍ଡ ଭୁଲ।"], errLocked: ["Too many failed attempts. Try again in 5 minutes.", "बहुत अधिक असफल प्रयास। 5 मिनट बाद फिर कोशिश करें।", "ବହୁତ ବିଫଳ ଚେଷ୍ଟା। 5 ମିନିଟ୍ ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।"], errForbidden: ["Your role does not allow this.", "आपकी भूमिका इसकी अनुमति नहीं देती।", "ଆପଣଙ୍କ ଭୂମିକା ଏହାକୁ ଅନୁମତି ଦିଏ ନାହିଁ।"],
  syncTitle: ["Shared shelter records", "साझा आश्रय रिकॉर्ड", "ସେୟାର୍ ଆଶ୍ରୟସ୍ଥଳ ରେକର୍ଡ"], syncNote: ["Volunteers and administrators can upload local records. Everyone can download shared records. Shared records are still 'needs review'.", "स्वयंसेवक और प्रशासक स्थानीय रिकॉर्ड अपलोड कर सकते हैं। सभी साझा रिकॉर्ड डाउनलोड कर सकते हैं। साझा रिकॉर्ड भी 'समीक्षा आवश्यक' रहते हैं।", "ସ୍ବେଚ୍ଛାସେବୀ ଓ ପ୍ରଶାସକ ସ୍ଥାନୀୟ ରେକର୍ଡ ଅପଲୋଡ୍ କରିପାରିବେ। ସମସ୍ତେ ସେୟାର୍ ରେକର୍ଡ ଡାଉନଲୋଡ୍ କରିପାରିବେ। ସେୟାର୍ ରେକର୍ଡ ମଧ୍ୟ 'ସମୀକ୍ଷା ଆବଶ୍ୟକ' ରହେ।"],
  syncUp: ["Upload my shelters", "मेरे आश्रय अपलोड करें", "ମୋ ଆଶ୍ରୟସ୍ଥଳ ଅପଲୋଡ୍"], syncDown: ["Download shared shelters", "साझा आश्रय डाउनलोड करें", "ସେୟାର୍ ଆଶ୍ରୟସ୍ଥଳ ଡାଉନଲୋଡ୍"], syncUpDone: ["Uploaded records", "अपलोड किए रिकॉर्ड", "ଅପଲୋଡ୍ ରେକର୍ଡ"], syncDownDone: ["Downloaded records", "डाउनलोड किए रिकॉर्ड", "ଡାଉନଲୋଡ୍ ରେକର୍ଡ"], syncLast: ["Last sync", "अंतिम सिंक", "ଶେଷ ସିଙ୍କ"],
  sendReport: ["Send my last report to the team", "मेरी आखिरी रिपोर्ट टीम को भेजें", "ମୋ ଶେଷ ରିପୋର୍ଟ ଦଳକୁ ପଠାନ୍ତୁ"], reportSent: ["Report sent", "रिपोर्ट भेजी गई", "ରିପୋର୍ଟ ପଠାଗଲା"], noLocalReport: ["No local report to send. Write one on the Report triage page.", "भेजने के लिए कोई स्थानीय रिपोर्ट नहीं। रिपोर्ट ट्रायाज पृष्ठ पर लिखें।", "ପଠାଇବାକୁ କୌଣସି ସ୍ଥାନୀୟ ରିପୋର୍ଟ ନାହିଁ। ରିପୋର୍ଟ ଟ୍ରାୟାଜ୍ ପୃଷ୍ଠାରେ ଲେଖନ୍ତୁ।"],
  reviewQueue: ["Incident review queue (staff)", "घटना समीक्षा कतार (स्टाफ)", "ଘଟଣା ସମୀକ୍ଷା କତାର (କର୍ମୀ)"], rq_new: ["New", "नई", "ନୂଆ"], rq_verified: ["Verified by staff", "स्टाफ द्वारा सत्यापित", "କର୍ମୀ ଦ୍ବାରା ଯାଞ୍ଚିତ"], rq_rejected: ["Rejected", "अस्वीकृत", "ଅସ୍ବୀକୃତ"], rq_resolved: ["Resolved", "हल", "ସମାଧାନ"], reviewedBy: ["Reviewed by", "समीक्षक", "ସମୀକ୍ଷକ"], queueEmpty: ["No reports in the queue.", "कतार में कोई रिपोर्ट नहीं।", "କତାରରେ କୌଣସି ରିପୋର୍ଟ ନାହିଁ।"],
  usersTitle: ["Users and roles (admin)", "उपयोगकर्ता और भूमिकाएँ (प्रशासक)", "ଉପଯୋଗକର୍ତ୍ତା ଓ ଭୂମିକା (ପ୍ରଶାସକ)"], auditTitle: ["Audit log (admin)", "ऑडिट लॉग (प्रशासक)", "ଅଡିଟ୍ ଲଗ୍ (ପ୍ରଶାସକ)"],
  opsTitle: ["Operations overview (staff)", "संचालन अवलोकन (स्टाफ)", "କାର୍ଯ୍ୟ ସମୀକ୍ଷା (କର୍ମୀ)"], opsShared: ["Shared shelters", "साझा आश्रय", "ସେୟାର୍ ଆଶ୍ରୟସ୍ଥଳ"], opsOpen: ["Reports awaiting review", "समीक्षा की प्रतीक्षा में रिपोर्ट", "ସମୀକ୍ଷା ଅପେକ୍ଷାରେ ରିପୋର୍ଟ"], opsUsers: ["Accounts", "खाते", "ଖାତା"]
});
async function bk(path, options = {}) {
  const response = await fetch(path, { credentials: "same-origin", headers: { "Content-Type": "application/json" }, ...options, body: options.body ? JSON.stringify(options.body) : undefined });
  let data = {};
  try { data = await response.json(); } catch { /* empty */ }
  if (!response.ok) { const error = new Error(data.error || String(response.status)); error.status = response.status; throw error; }
  return data;
}
const isStaff = () => acct.user && ["volunteer", "admin"].includes(acct.user.role);
function acctMessage(error) {
  if (error.status === 429) return t("errLocked");
  if (error.status === 401) return t("errCreds");
  if (error.status === 403) return t("errForbidden");
  if (error.status === 409) return t("errExists");
  if (error.status === 400) return t("errInvalid");
  return t("acctNoServer");
}
async function acctRefresh() {
  try {
    const status = await bk("/api/auth/status");
    acct.user = status.user; acct.hasUsers = status.hasUsers; acct.backend = true;
    if (isStaff()) acct.reports = (await bk("/api/sync/reports")).items;
    if (acct.user?.role === "admin") { acct.users = (await bk("/api/admin/users")).items; acct.audit = (await bk("/api/admin/audit")).items; }
  } catch { acct.backend = false; }
  acct.ready = true;
  if (currentPage === "account") renderPage();
}
function acctForm() {
  return `<section class="card page-card"><form data-p3form="auth" class="form-grid">
    ${!acct.hasUsers ? `<div class="full-field">${notice("acctFirst")}</div>` : ""}
    <label class="field-group"><span>${esc(t("fUsername"))}</span><input class="form-control" name="username" autocomplete="username" maxlength="40" required></label>
    <label class="field-group"><span>${esc(t("fPassword"))}</span><input class="form-control" type="password" name="password" autocomplete="current-password" maxlength="200" required></label>
    <label class="field-group full-field"><span>${esc(t("fFullName"))}</span><input class="form-control" name="name" maxlength="80"></label>
    <div class="form-error full-field" id="authError" role="alert">${esc(acct.error)}</div>
    <div class="full-field record-actions"><button class="button primary" type="submit" data-mode="login">${esc(t("signIn"))}</button><button class="button" type="submit" data-mode="register">${esc(t("signUp"))}</button></div></form></section>`;
}
let authMode = "login";
document.addEventListener("click", (event) => { const b = event.target.closest("[data-p3form=auth] button[data-mode]"); if (b) authMode = b.dataset.mode; });
P3FORM.auth = async (form) => {
  const data = new FormData(form), username = String(data.get("username")), password = String(data.get("password")), name = String(data.get("name") || username);
  try {
    if (authMode === "register") await bk("/api/auth/register", { method: "POST", body: { username, password, name } });
    else await bk("/api/auth/login", { method: "POST", body: { username, password } });
    acct.error = "";
  } catch (error) { acct.error = acctMessage(error); renderPage(); return; }
  await acctRefresh(); renderPage();
};
P3ACT.logout = async () => { try { await bk("/api/auth/logout", { method: "POST" }); } catch { /* ignore */ } acct.user = null; acct.reports = []; acct.users = []; acct.audit = []; renderPage(); };
P3ACT["sync-up"] = async () => {
  try { const items = getShelters(); let saved = 0; for (let i = 0; i < items.length; i += 15) saved += (await bk("/api/sync/shelters", { method: "POST", body: { items: items.slice(i, i + 15) } })).saved; showToast(`${t("syncUpDone")}: ${saved}`); writeStorage("lastSync", new Date().toISOString()); renderPage(); }
  catch (error) { showToast(acctMessage(error)); }
};
P3ACT["sync-down"] = async () => {
  try {
    const { items } = await bk("/api/sync/shelters");
    const local = new Map(getShelters().map((s) => [s.id, s]));
    for (const item of items) local.set(item.id, { ...local.get(item.id), ...item, source: item.source || "shared server", verified: false });
    if (writeStorage("shelters", [...local.values()])) { showToast(`${t("syncDownDone")}: ${items.length}`); writeStorage("lastSync", new Date().toISOString()); renderPage(); }
  } catch (error) { showToast(acctMessage(error)); }
};
P3ACT["send-report"] = async () => {
  const last = getReports().slice(-1)[0];
  if (!last) { showToast(t("noLocalReport")); return; }
  try { await bk("/api/sync/reports", { method: "POST", body: { text: last.text, category: last.category, urgency: last.urgency } }); showToast(t("reportSent")); await acctRefresh(); } catch (error) { showToast(acctMessage(error)); }
};
P3CHANGE["rq-status"] = async (el) => { try { await bk(`/api/sync/reports/${encodeURIComponent(el.dataset.id)}`, { method: "PATCH", body: { status: el.value } }); await acctRefresh(); } catch (error) { showToast(acctMessage(error)); } };
P3CHANGE["user-role"] = async (el) => { try { await bk(`/api/admin/users/${encodeURIComponent(el.dataset.id)}`, { method: "PATCH", body: { role: el.value } }); await acctRefresh(); } catch (error) { showToast(acctMessage(error)); renderPage(); } };
PHASE3_PAGES.account = () => {
  if (!acct.ready) { acctRefresh(); return `${heading("acctTitle", "acctSubtitle")}<p class="page-subtitle">${esc(t("loading"))}</p>`; }
  if (!acct.backend) return `${heading("acctTitle", "acctSubtitle")}${notice("acctNoServer")}`;
  let body = `${notice("acctLocalNote")}`;
  if (!acct.user) return `${heading("acctTitle", "acctSubtitle")}${body}${acctForm()}`;
  const roleSel = (u) => `<select class="form-control small-select" data-p3change="user-role" data-id="${esc(u.id)}" ${u.id === acct.user.id ? "disabled" : ""}>${["citizen", "volunteer", "admin"].map((r) => `<option value="${r}" ${u.role === r ? "selected" : ""}>${esc(t(`role_${r}`))}</option>`).join("")}</select>`;
  body += `<section class="card page-card"><div class="settings-row"><span><strong>${esc(t("signedInAs"))} ${esc(acct.user.name)} (${esc(acct.user.username)})</strong><small>${esc(t(`role_${acct.user.role}`))}</small></span><button class="button" data-p3="logout">${esc(t("signOut"))}</button></div></section>
    <section class="card page-card"><h2>${esc(t("syncTitle"))}</h2><p class="page-subtitle">${esc(t("syncNote"))}</p><p><small>${esc(t("syncLast"))}: ${esc(formatDateTime(readStorage("lastSync", "")) || "—")}</small></p>
      <div class="record-actions">${isStaff() ? `<button class="button primary" data-p3="sync-up">${esc(t("syncUp"))}</button>` : ""}<button class="button" data-p3="sync-down">${esc(t("syncDown"))}</button><button class="button" data-p3="send-report">${esc(t("sendReport"))}</button></div></section>`;
  if (isStaff()) {
    body += `<section class="card page-card"><h2>${esc(t("opsTitle"))}</h2><div class="result-row"><span>${esc(t("opsOpen"))}</span><strong>${acct.reports.filter((r) => r.status === "new").length}</strong></div>${acct.user.role === "admin" ? `<div class="result-row"><span>${esc(t("opsUsers"))}</span><strong>${acct.users.length}</strong></div>` : ""}</section>
      <section class="card page-card"><h2>${esc(t("reviewQueue"))}</h2>${acct.reports.length ? acct.reports.map((r) => `<div class="district-row"><span><strong>${esc(r.text)}</strong><small>${esc(r.category || "")} · ${esc(r.urgency || "")} · ${esc(r.createdBy || "")}${r.reviewedBy ? ` · ${esc(t("reviewedBy"))} ${esc(r.reviewedBy)}` : ""}</small></span><select class="form-control small-select" data-p3change="rq-status" data-id="${esc(r.id)}" aria-label="${esc(t("reviewStatus"))}">${["new", "verified", "rejected", "resolved"].map((s) => `<option value="${s}" ${r.status === s ? "selected" : ""}>${esc(t(`rq_${s}`))}</option>`).join("")}</select></div>`).join("") : p3Empty("queueEmpty")}</section>`;
  }
  if (acct.user.role === "admin") {
    body += `<section class="card page-card"><h2>${esc(t("usersTitle"))}</h2>${acct.users.map((u) => `<div class="district-row"><span><strong>${esc(u.name)}</strong><small>${esc(u.username)}</small></span>${roleSel(u)}</div>`).join("")}</section>
      <section class="card page-card"><h2>${esc(t("auditTitle"))}</h2><div class="table-scroll"><table class="cmp-table"><tbody>${acct.audit.map((a) => `<tr><td>${esc(formatDateTime(a.at))}</td><td>${esc(a.username || "—")}</td><td>${esc(a.action)}</td><td>${esc(a.target || "")}</td></tr>`).join("")}</tbody></table></div></section>`;
  }
  return `${heading("acctTitle", "acctSubtitle")}${body}`;
};
addNav("more", "account", "⚿", "navAccount");
