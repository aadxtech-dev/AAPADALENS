/* Phase 3a: core helpers, safety and personal-planning pages (features 20-21, 26-29, 31-34) */
const PHASE3_MESSAGES = { en: {}, hi: {}, or: {} };
function addMsgs(table) {
  for (const [key, value] of Object.entries(table)) {
    PHASE3_MESSAGES.en[key] = value[0];
    PHASE3_MESSAGES.hi[key] = value[1] ?? value[0];
    PHASE3_MESSAGES.or[key] = value[2] ?? value[0];
  }
}
const PHASE3_PAGES = {};
const P3ACT = {}, P3FORM = {}, P3CHANGE = {}, LISTS = {};
const p3 = { tab: {}, loc: null, locStatus: "idle", share: { consent: false, text: "" }, search: { q: "" }, auditShelter: "" };

const NAV_EXTRA = [];
function addNav(group, page, icon, key) { NAV_EXTRA.push({ group, page, icon, key }); }

/* ---------- generic helpers ---------- */
function uid() { return globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function getList(name) { const list = readStorage(name, []); return Array.isArray(list) ? list.filter((item) => item && typeof item === "object" && item.id) : []; }
function getObject(name) { const value = readStorage(name, {}); return value && typeof value === "object" && !Array.isArray(value) ? value : {}; }
function esc(value) { return escapeHtml(value); }
function tabsHtml(page, list) {
  const current = p3.tab[page] || list[0][0];
  return `<div class="hazard-tabs" role="group">${list.map(([id, key]) => `<button class="hazard-tab ${id === current ? "active" : ""}" data-p3="tab" data-page="${page}" data-tab="${id}" aria-pressed="${id === current}">${esc(t(key))}</button>`).join("")}</div>`;
}
function currentTab(page, list) { return p3.tab[page] || list[0][0]; }
function currentPos() {
  if (p3.loc) return p3.loc;
  return typeof nearby !== "undefined" && nearby.status === "ready" ? nearby.position : null;
}
function askLocation() {
  if (!navigator.geolocation) { p3.locStatus = "unsupported"; showToast(t("locationUnsupported")); renderPage(); return; }
  p3.locStatus = "locating";
  renderPage();
  navigator.geolocation.getCurrentPosition(
    (position) => { p3.loc = { lat: position.coords.latitude, lon: position.coords.longitude, accuracy: position.coords.accuracy }; p3.locStatus = "ready"; renderPage(); },
    (error) => { p3.locStatus = error.code === 1 ? "denied" : "unavailable"; renderPage(); },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
  );
}
function osmPoint(lat, lon) {
  return `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=17/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}`;
}
function telLink(number) {
  const value = String(number || "").trim();
  const digits = value.replace(/\D/g, "");
  return `tel:${value.startsWith("+") ? "+" : ""}${digits}`;
}
function shelterOptions(selected, blank = true) {
  return `${blank ? `<option value="">—</option>` : ""}${getShelters().map((record) => `<option value="${esc(record.id)}" ${record.id === selected ? "selected" : ""}>${esc(record.name)} · ${esc(record.district)}</option>`).join("")}`;
}
function shelterName(id) { return getShelters().find((record) => record.id === id)?.name || "—"; }
function p3Empty(key) { return `<p class="page-subtitle">${esc(t(key))}</p>`; }

/* ---------- generic list CRUD ---------- */
function listFieldHtml(field, value) {
  const label = `${esc(t(field.label))}${field.required ? " *" : ""}`;
  const attrs = `name="${field.name}" ${field.required ? "required" : ""} maxlength="${field.max || 160}"`;
  let control;
  if (field.type === "textarea") control = `<textarea class="form-control" ${attrs} rows="2">${esc(value ?? "")}</textarea>`;
  else if (field.type === "select") control = `<select class="form-control" name="${field.name}">${field.options.map(([id, key]) => `<option value="${id}" ${id === (value ?? field.options[0][0]) ? "selected" : ""}>${esc(t(key))}</option>`).join("")}</select>`;
  else if (field.type === "shelter") control = `<select class="form-control" name="${field.name}">${shelterOptions(value ?? "")}</select>`;
  else if (field.type === "volunteer") control = `<select class="form-control" name="${field.name}"><option value="">—</option>${getList("vol").map((v) => `<option value="${esc(v.id)}" ${v.id === value ? "selected" : ""}>${esc(v.name)}</option>`).join("")}</select>`;
  else if (field.type === "number") control = `<input class="form-control" type="number" name="${field.name}" step="${field.step || 1}" min="${field.min ?? 0}" ${field.max ? `max="${field.max}"` : ""} ${field.required ? "required" : ""} inputmode="decimal" value="${esc(value ?? "")}">`;
  else if (field.type === "date") control = `<input class="form-control" type="date" name="${field.name}" value="${esc(value ?? "")}">`;
  else control = `<input class="form-control" type="${field.type === "tel" ? "tel" : "text"}" ${attrs} value="${esc(value ?? "")}">`;
  return `<label class="field-group ${field.full ? "full-field" : ""}"><span>${label}</span>${control}</label>`;
}
function openListForm(name, id = "") {
  const config = LISTS[name];
  const item = getList(name).find((entry) => entry.id === id) || {};
  openModal(t(config.title), `<form data-p3form="listform" data-list="${name}" novalidate><input type="hidden" name="id" value="${esc(item.id || "")}">
    <div class="form-grid">${config.fields.map((field) => listFieldHtml(field, item[field.name] ?? field.default)).join("")}</div>
    <div class="form-error" id="formError" role="alert"></div>
    <div class="modal-actions"><button type="button" class="button" data-action="close-modal">${esc(t("cancel"))}</button><button class="button primary" type="submit">${esc(t("saveRecord"))}</button></div></form>`);
}
function saveListForm(form) {
  const name = form.dataset.list, config = LISTS[name];
  const data = new FormData(form);
  const entry = { id: String(data.get("id") || uid()) };
  for (const field of config.fields) {
    let value = String(data.get(field.name) ?? "").trim();
    if (field.required && !value) return listError(t("nameRequired"));
    if (field.type === "tel" && value && !/^\+?[\d\s\-()]{3,20}$/.test(value)) return listError(t("phoneInvalid"));
    if (field.type === "number" && value !== "") {
      const number = Number(value);
      if (!Number.isFinite(number) || number < (field.min ?? 0) || (field.max && number > field.max)) return listError(t("numberInvalid"));
      value = String(number);
    }
    entry[field.name] = value;
  }
  const problem = config.validate?.(entry);
  if (problem) return listError(t(problem));
  entry.updatedAt = new Date().toISOString();
  const list = getList(name), index = list.findIndex((item) => item.id === entry.id);
  if (index >= 0) list[index] = { ...list[index], ...entry }; else list.push(entry);
  if (!writeStorage(name, list)) return;
  closeModal(); renderPage(); showToast(t("recordSaved"));
}
function listError(message) { const box = document.getElementById("formError"); if (box) box.textContent = message; }
function listCards(name) {
  const config = LISTS[name];
  const items = getList(name);
  if (!items.length) return p3Empty(config.empty || "listEmpty");
  return `<div class="list-grid">${items.map((item) => `<article class="card shelter-card"><span class="shelter-symbol" aria-hidden="true">${config.icon || "•"}</span><div class="shelter-detail">${config.card(item)}</div>
    <div class="record-actions"><button class="button small" data-p3="list-edit" data-list="${name}" data-id="${esc(item.id)}">${esc(t("edit"))}</button><button class="button small danger" data-p3="list-del" data-list="${name}" data-id="${esc(item.id)}">${esc(t("delete"))}</button></div></article>`).join("")}</div>`;
}
function listAddButton(name) { return `<button class="button primary" data-p3="list-add" data-list="${name}">＋ ${esc(t(LISTS[name].addLabel || "addItem"))}</button>`; }
P3ACT["list-add"] = (el) => openListForm(el.dataset.list);
P3ACT["list-edit"] = (el) => openListForm(el.dataset.list, el.dataset.id);
P3ACT["list-del"] = (el) => {
  if (!window.confirm(t("confirmDelete"))) return;
  if (writeStorage(el.dataset.list, getList(el.dataset.list).filter((item) => item.id !== el.dataset.id))) { renderPage(); showToast(t("recordDeleted")); }
};
P3FORM.listform = saveListForm;
P3ACT.tab = (el) => { p3.tab[el.dataset.page] = el.dataset.tab; renderPage(); };

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-p3]");
  if (control) P3ACT[control.dataset.p3]?.(control, event);
});
document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-p3form]");
  if (!form) return;
  event.preventDefault();
  P3FORM[form.dataset.p3form]?.(form);
});
document.addEventListener("change", (event) => {
  const control = event.target.closest("[data-p3change]");
  if (control) P3CHANGE[control.dataset.p3change]?.(control);
});

/* ---------- messages (shared) ---------- */
addMsgs({
  addItem: ["Add", "जोड़ें", "ଯୋଗ କରନ୍ତୁ"], listEmpty: ["Nothing saved yet.", "अभी कुछ सहेजा नहीं गया है।", "ଏପର୍ଯ୍ୟନ୍ତ କିଛି ସେଭ୍ ହୋଇନାହିଁ।"],
  phoneInvalid: ["Enter a valid phone number.", "मान्य फ़ोन नंबर दर्ज करें।", "ବୈଧ ଫୋନ୍ ନମ୍ବର ଦିଅନ୍ତୁ।"], numberInvalid: ["Enter a valid number.", "मान्य संख्या दर्ज करें।", "ବୈଧ ସଂଖ୍ୟା ଦିଅନ୍ତୁ।"],
  localOnlyNote: ["Saved only on this device. Nothing is sent to any server.", "केवल इसी डिवाइस पर सहेजा जाता है। कुछ भी सर्वर को नहीं भेजा जाता।", "କେବଳ ଏହି ଡିଭାଇସ୍‌ରେ ସେଭ୍ ହୁଏ। କିଛି ସର୍ଭରକୁ ପଠାଯାଏ ନାହିଁ।"],
  fName: ["Name", "नाम", "ନାମ"], fPhone: ["Phone", "फ़ोन", "ଫୋନ୍"], fNote: ["Note", "टिप्पणी", "ଟିପ୍ପଣୀ"], fType: ["Type", "प्रकार", "ପ୍ରକାର"], fLandmark: ["Landmark", "पहचान स्थल", "ଚିହ୍ନ ସ୍ଥାନ"],
  fDate: ["Date", "तारीख", "ତାରିଖ"], fShelter: ["Shelter", "आश्रय", "ଆଶ୍ରୟସ୍ଥଳ"], fStatus: ["Status", "स्थिति", "ସ୍ଥିତି"],
  navGroupSafety: ["SAFETY & PLANNING", "सुरक्षा और योजना", "ସୁରକ୍ଷା ଓ ଯୋଜନା"], navGroupManage: ["MANAGE & ANALYSE", "प्रबंधन और विश्लेषण", "ପରିଚାଳନା ଓ ବିଶ୍ଳେଷଣ"], navGroupMore: ["COMMUNITY & HELP", "समुदाय और सहायता", "ସମୁଦାୟ ଓ ସହାୟତା"],
  navSearch: ["Smart search", "स्मार्ट खोज", "ସ୍ମାର୍ଟ ସନ୍ଧାନ"], navContacts: ["Emergency contacts", "आपातकालीन संपर्क", "ଜରୁରୀ ଯୋଗାଯୋଗ"], navShare: ["Share my location", "मेरा स्थान साझा करें", "ମୋ ସ୍ଥାନ ସେୟାର୍ କରନ୍ତୁ"],
  navEvac: ["Evacuation plan", "निकासी योजना", "ସ୍ଥାନାନ୍ତର ଯୋଜନା"], navMedical: ["Medical card", "चिकित्सा कार्ड", "ଚିକିତ୍ସା କାର୍ଡ"], navMeeting: ["Meeting points", "मिलन स्थल", "ମିଳନ ସ୍ଥାନ"], navAccess: ["Accessibility", "सुगम्यता", "ସୁଗମ୍ୟତା"]
});

/* ---------- 26 Emergency contact directory ---------- */
const NATIONAL_NUMBERS = [["112", "emergencyNumber"], ["100", "c100"], ["101", "fireService"], ["108", "ambulance"], ["102", "c102"], ["1077", "disasterHelpline"], ["1098", "c1098"], ["181", "c181"]];
LISTS.contacts = {
  title: "contactAdd", addLabel: "contactAdd", icon: "☎", empty: "contactsEmpty",
  fields: [
    { name: "name", label: "fName", required: true, max: 80 },
    { name: "phone", label: "fPhone", type: "tel", required: true, max: 20 },
    { name: "kind", label: "fType", type: "select", options: [["family", "kFamily"], ["neighbour", "kNeighbour"], ["doctor", "kDoctor"], ["volunteer", "kVolunteer"], ["authority", "kAuthority"], ["other", "kOther"]] },
    { name: "note", label: "fNote", max: 160, full: true }
  ],
  card: (item) => `<h3>${esc(item.name)}</h3><p>${esc(t(`k${item.kind[0].toUpperCase()}${item.kind.slice(1)}`))}${item.note ? ` · ${esc(item.note)}` : ""}</p><a class="button small primary" href="${telLink(item.phone)}">☎ ${esc(item.phone)}</a>`
};
addMsgs({
  contactAdd: ["Add contact", "संपर्क जोड़ें", "ଯୋଗାଯୋଗ ଯୋଗ କରନ୍ତୁ"], contactsEmpty: ["No personal contacts yet. Add family, neighbours and your doctor.", "अभी कोई निजी संपर्क नहीं। परिवार, पड़ोसी और डॉक्टर जोड़ें।", "ଏପର୍ଯ୍ୟନ୍ତ ବ୍ୟକ୍ତିଗତ ଯୋଗାଯୋଗ ନାହିଁ। ପରିବାର, ପଡ଼ୋଶୀ ଓ ଡାକ୍ତର ଯୋଗ କରନ୍ତୁ।"],
  contactsTitle: ["Emergency contact directory", "आपातकालीन संपर्क निर्देशिका", "ଜରୁରୀ ଯୋଗାଯୋଗ ନିର୍ଦ୍ଦେଶିକା"], contactsSubtitle: ["National helplines and your own contacts, available offline.", "राष्ट्रीय हेल्पलाइन और आपके अपने संपर्क, ऑफ़लाइन भी उपलब्ध।", "ଜାତୀୟ ହେଲ୍ପଲାଇନ୍ ଓ ଆପଣଙ୍କ ନିଜ ଯୋଗାଯୋଗ, ଅଫଲାଇନ୍‌ରେ ମଧ୍ୟ ଉପଲବ୍ଧ।"],
  nationalNumbers: ["National helplines", "राष्ट्रीय हेल्पलाइन", "ଜାତୀୟ ହେଲ୍ପଲାଇନ୍"], myContacts: ["My contacts", "मेरे संपर्क", "ମୋ ଯୋଗାଯୋଗ"],
  c100: ["Police", "पुलिस", "ପୋଲିସ୍"], c102: ["Ambulance (102)", "एम्बुलेंस (102)", "ଆମ୍ବୁଲାନ୍ସ (102)"], c1098: ["Child helpline", "बाल हेल्पलाइन", "ଶିଶୁ ହେଲ୍ପଲାଇନ୍"], c181: ["Women helpline", "महिला हेल्पलाइन", "ମହିଳା ହେଲ୍ପଲାଇନ୍"],
  kFamily: ["Family", "परिवार", "ପରିବାର"], kNeighbour: ["Neighbour", "पड़ोसी", "ପଡ଼ୋଶୀ"], kDoctor: ["Doctor", "डॉक्टर", "ଡାକ୍ତର"], kVolunteer: ["Volunteer", "स्वयंसेवक", "ସ୍ବେଚ୍ଛାସେବୀ"], kAuthority: ["Local authority", "स्थानीय प्राधिकरण", "ସ୍ଥାନୀୟ କର୍ତ୍ତୃପକ୍ଷ"], kOther: ["Other", "अन्य", "ଅନ୍ୟ"],
  helplineConfirm: ["Confirm numbers with local authorities. Add your district control-room number below.", "नंबर स्थानीय अधिकारियों से सत्यापित करें। अपने जिले का नियंत्रण-कक्ष नंबर नीचे जोड़ें।", "ନମ୍ବର ସ୍ଥାନୀୟ କର୍ତ୍ତୃପକ୍ଷଙ୍କଠାରୁ ନିଶ୍ଚିତ କରନ୍ତୁ। ଆପଣଙ୍କ ଜିଲ୍ଲା କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍ ନମ୍ବର ତଳେ ଯୋଗ କରନ୍ତୁ।"]
});
PHASE3_PAGES.contacts = () => `${heading("contactsTitle", "contactsSubtitle")}${notice("helplineConfirm")}
  <h2 class="section-title">${esc(t("nationalNumbers"))}</h2>
  <div class="emergency-numbers">${NATIONAL_NUMBERS.map(([number, label]) => `<a class="number-card" href="tel:${number}"><span class="number-icon" aria-hidden="true">☎</span><strong>${number}</strong><small>${esc(t(label))}</small></a>`).join("")}</div>
  <div class="page-heading" style="margin-top:18px"><h2 class="section-title">${esc(t("myContacts"))}</h2><div class="heading-actions">${listAddButton("contacts")}</div></div>
  <p class="page-subtitle">${esc(t("localOnlyNote"))}</p>${listCards("contacts")}`;
addNav("safety", "contacts", "☎", "navContacts");

/* ---------- 27 Location sharing with consent ---------- */
function shareMessage() {
  const pos = p3.loc;
  return pos ? `${t("shareMsg")} ${osmPoint(pos.lat.toFixed(5), pos.lon.toFixed(5))}` : "";
}
P3CHANGE["share-consent"] = (el) => {
  p3.share.consent = el.checked;
  if (!el.checked) { p3.loc = null; p3.locStatus = "idle"; p3.share.text = ""; }
  renderPage();
};
P3ACT["share-locate"] = () => { p3.share.text = ""; askLocation(); };
P3ACT["share-clear"] = () => { p3.loc = null; p3.locStatus = "idle"; p3.share = { consent: false, text: "" }; renderPage(); };
function shareText() { return document.getElementById("shareText")?.value || shareMessage(); }
P3ACT["share-copy"] = () => navigator.clipboard?.writeText(shareText()).then(() => showToast(t("copied")), () => showToast(t("saveError")));
P3ACT["share-native"] = () => { navigator.share?.({ text: shareText() }).catch(() => {}); };
addMsgs({
  shareTitle: ["Share my location (with consent)", "अपना स्थान साझा करें (सहमति से)", "ମୋ ସ୍ଥାନ ସେୟାର୍ କରନ୍ତୁ (ସମ୍ମତି ସହ)"],
  shareSubtitle: ["Create a message with your location and send it yourself to people you trust.", "अपने स्थान के साथ संदेश बनाएँ और भरोसेमंद लोगों को स्वयं भेजें।", "ଆପଣଙ୍କ ସ୍ଥାନ ସହ ବାର୍ତ୍ତା ତିଆରି କରନ୍ତୁ ଏବଂ ବିଶ୍ବାସୀ ଲୋକଙ୍କୁ ନିଜେ ପଠାନ୍ତୁ।"],
  shareConsent: ["I agree to let this app read my location once to create a message. It is kept only in this page's memory and is not sent to any server by the app.", "मैं सहमत हूँ कि यह ऐप संदेश बनाने के लिए एक बार मेरा स्थान पढ़े। यह केवल इस पेज की मेमोरी में रहता है और ऐप इसे किसी सर्वर को नहीं भेजता।", "ମୁଁ ସମ୍ମତ ଯେ ବାର୍ତ୍ତା ତିଆରି ପାଇଁ ଏହି ଆପ୍ ଥରେ ମୋ ସ୍ଥାନ ପଢ଼ିବ। ଏହା କେବଳ ଏହି ପୃଷ୍ଠାର ମେମୋରୀରେ ରହେ ଏବଂ ଆପ୍ ଏହାକୁ କୌଣସି ସର୍ଭରକୁ ପଠାଏ ନାହିଁ।"],
  shareGet: ["Get my location", "मेरा स्थान लें", "ମୋ ସ୍ଥାନ ନିଅନ୍ତୁ"], shareMsg: ["I need to share my location with you. My position on the map:", "मैं आपके साथ अपना स्थान साझा कर रहा/रही हूँ। नक्शे पर मेरी स्थिति:", "ମୁଁ ମୋ ସ୍ଥାନ ଆପଣଙ୍କ ସହ ସେୟାର୍ କରୁଛି। ମାନଚିତ୍ରରେ ମୋ ସ୍ଥିତି:"],
  shareMessageLabel: ["Message (you can edit it)", "संदेश (आप बदल सकते हैं)", "ବାର୍ତ୍ତା (ଆପଣ ବଦଳାଇ ପାରିବେ)"], shareSms: ["Send by SMS", "SMS से भेजें", "SMS ଦ୍ବାରା ପଠାନ୍ତୁ"], shareWa: ["WhatsApp", "WhatsApp", "WhatsApp"],
  shareNative: ["Share…", "साझा करें…", "ସେୟାର୍…"], shareCopy: ["Copy", "कॉपी", "କପି"], shareClear: ["Clear location", "स्थान हटाएँ", "ସ୍ଥାନ ହଟାନ୍ତୁ"], shareTo: ["Send SMS to a saved contact", "सहेजे संपर्क को SMS भेजें", "ସେଭ୍ ଯୋଗାଯୋଗକୁ SMS ପଠାନ୍ତୁ"],
  shareAccuracy: ["Accuracy about", "सटीकता लगभग", "ସଠିକତା ପ୍ରାୟ"], shareManual: ["The app never sends this for you. You choose who receives it.", "ऐप इसे आपके लिए नहीं भेजता। कौन पाएगा, यह आप तय करते हैं।", "ଆପ୍ ଏହାକୁ ଆପଣଙ୍କ ପାଇଁ ପଠାଏ ନାହିଁ। କିଏ ପାଇବ ତାହା ଆପଣ ଠିକ୍ କରନ୍ତି।"]
});
PHASE3_PAGES.share = () => {
  const consent = p3.share.consent, pos = p3.loc;
  const statusKey = { locating: "locating", denied: "locationDenied", unavailable: "locationUnavailable", unsupported: "locationUnsupported" }[p3.locStatus];
  const text = p3.share.text || shareMessage();
  const contacts = getList("contacts");
  const body = pos ? `<label class="field-group"><span>${esc(t("shareMessageLabel"))}</span><textarea class="form-control" id="shareText" rows="4" maxlength="500">${esc(text)}</textarea></label>
    <small>${esc(t("shareAccuracy"))} ${Math.round(pos.accuracy || 0)} m · ${esc(t("shareManual"))}</small>
    <div class="record-actions" style="flex-wrap:wrap;margin-top:10px"><button class="button" data-p3="share-copy">${esc(t("shareCopy"))}</button>
      ${navigator.share ? `<button class="button" data-p3="share-native">${esc(t("shareNative"))}</button>` : ""}
      <a class="button" id="shareSms" href="sms:?body=${encodeURIComponent(text)}">${esc(t("shareSms"))}</a>
      <a class="button" id="shareWa" href="https://wa.me/?text=${encodeURIComponent(text)}" target="_blank" rel="noopener noreferrer">${esc(t("shareWa"))}</a>
      <button class="button danger" data-p3="share-clear">${esc(t("shareClear"))}</button></div>
    ${contacts.length ? `<h3 style="margin-top:14px">${esc(t("shareTo"))}</h3><div class="record-actions" style="flex-wrap:wrap">${contacts.map((c) => `<a class="button small" href="sms:${esc(String(c.phone).replace(/[^\d+]/g, ""))}?body=${encodeURIComponent(text)}">${esc(c.name)}</a>`).join("")}</div>` : ""}` : "";
  return `${heading("shareTitle", "shareSubtitle")}${notice("locationPrivacy")}
    <section class="card page-card"><label class="check-row"><input type="checkbox" data-p3change="share-consent" ${consent ? "checked" : ""}><span>${esc(t("shareConsent"))}</span></label>
      <div style="margin:12px 0"><button class="button primary" data-p3="share-locate" ${consent ? "" : "disabled"}>⌖ ${esc(t("shareGet"))}</button></div>
      ${statusKey ? `<div class="notice-banner"><span aria-hidden="true">ⓘ</span><span>${esc(t(statusKey))}</span></div>` : ""}${body}</section>`;
};
addNav("safety", "share", "⌖", "navShare");

/* ---------- 29 Evacuation planning ---------- */
const EVAC_ITEMS = ["ev1", "ev2", "ev3", "ev4", "ev5", "ev6"];
const TRANSPORT = [["walk", "trWalk"], ["bike", "trBike"], ["car", "trCar"], ["public", "trPublic"], ["help", "trHelp"]];
P3FORM.evac = (form) => {
  const data = new FormData(form);
  const people = Number(data.get("people"));
  if (!Number.isInteger(people) || people < 1 || people > 200) { showToast(t("numberInvalid")); return; }
  if (writeStorage("evac", { people, transport: String(data.get("transport")), shelterId: String(data.get("shelterId")), notes: String(data.get("notes")).slice(0, 300), updatedAt: new Date().toISOString() })) { renderPage(); showToast(t("recordSaved")); }
};
addMsgs({
  evacTitle: ["Evacuation planning", "निकासी की योजना", "ସ୍ଥାନାନ୍ତର ଯୋଜନା"], evacSubtitle: ["Decide in advance who goes, how, and to which shelter.", "पहले से तय करें कि कौन, कैसे और किस आश्रय में जाएगा।", "ଆଗରୁ ଠିକ୍ କରନ୍ତୁ କିଏ, କିପରି ଏବଂ କେଉଁ ଆଶ୍ରୟସ୍ଥଳକୁ ଯିବ।"],
  evacOfficial: ["This is your own plan. Always follow official evacuation orders and routes.", "यह आपकी अपनी योजना है। हमेशा आधिकारिक निकासी आदेश और मार्ग का पालन करें।", "ଏହା ଆପଣଙ୍କ ନିଜ ଯୋଜନା। ସର୍ବଦା ସରକାରୀ ସ୍ଥାନାନ୍ତର ନିର୍ଦ୍ଦେଶ ଓ ରାସ୍ତା ଅନୁସରଣ କରନ୍ତୁ।"],
  evacPeople: ["People travelling", "यात्रा करने वाले लोग", "ଯାତ୍ରା କରୁଥିବା ଲୋକ"], evacTransport: ["Transport", "परिवहन", "ପରିବହନ"], evacShelter: ["Chosen shelter", "चुना हुआ आश्रय", "ବାଛିଥିବା ଆଶ୍ରୟସ୍ଥଳ"],
  trWalk: ["On foot", "पैदल", "ପାଦରେ"], trBike: ["Bicycle / two-wheeler", "साइकिल / दोपहिया", "ସାଇକେଲ୍ / ଦୁଇଚକିଆ"], trCar: ["Car / vehicle", "कार / वाहन", "ଗାଡ଼ି"], trPublic: ["Public transport", "सार्वजनिक परिवहन", "ସାର୍ବଜନୀନ ପରିବହନ"], trHelp: ["I need transport help", "मुझे परिवहन सहायता चाहिए", "ମୋତେ ପରିବହନ ସହାୟତା ଦରକାର"],
  evacChecklist: ["Before leaving", "निकलने से पहले", "ବାହାରିବା ପୂର୍ବରୁ"], evacDirections: ["Open directions", "दिशा-निर्देश खोलें", "ଦିଗ ଦେଖନ୍ତୁ"], evacNoShelter: ["Add shelters first, then choose one here.", "पहले आश्रय जोड़ें, फिर यहाँ चुनें।", "ପ୍ରଥମେ ଆଶ୍ରୟସ୍ଥଳ ଯୋଗ କରନ୍ତୁ, ତା'ପରେ ଏଠାରେ ବାଛନ୍ତୁ।"],
  evacDistance: ["Straight-line distance", "सीधी दूरी", "ସିଧା ଦୂରତା"], evacNeedLoc: ["Use your location to see distance and route.", "दूरी और मार्ग देखने के लिए अपना स्थान उपयोग करें।", "ଦୂରତା ଓ ରାସ୍ତା ଦେଖିବାକୁ ଆପଣଙ୍କ ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ।"],
  evacHelpNote: ["Tell your contacts and local volunteers early if you need help moving.", "यदि आपको जाने में सहायता चाहिए तो अपने संपर्कों और स्थानीय स्वयंसेवकों को पहले बताएँ।", "ଯଦି ଯିବାକୁ ସହାୟତା ଦରକାର, ଆପଣଙ୍କ ଯୋଗାଯୋଗ ଓ ସ୍ଥାନୀୟ ସ୍ବେଚ୍ଛାସେବୀଙ୍କୁ ଆଗରୁ କୁହନ୍ତୁ।"],
  ev1: ["Carry drinking water, dry food and medicines.", "पीने का पानी, सूखा भोजन और दवाइयाँ साथ रखें।", "ପିଇବା ପାଣି, ଶୁଖିଲା ଖାଦ୍ୟ ଓ ଔଷଧ ସାଙ୍ଗରେ ନିଅନ୍ତୁ।"],
  ev2: ["Take ID, important documents and cash in a waterproof cover.", "पहचान पत्र, ज़रूरी दस्तावेज़ और नकद जलरोधी कवर में रखें।", "ପରିଚୟ ପତ୍ର, ଜରୁରୀ କାଗଜ ଓ ନଗଦ ଜଳରୋଧୀ ଖୋଲରେ ରଖନ୍ତୁ।"],
  ev3: ["Charge phones and a power bank; carry a torch.", "फ़ोन और पावर बैंक चार्ज करें; टॉर्च रखें।", "ଫୋନ୍ ଓ ପାୱାର୍ ବ୍ୟାଙ୍କ୍ ଚାର୍ଜ କରନ୍ତୁ; ଟର୍ଚ୍ଚ ରଖନ୍ତୁ।"],
  ev4: ["Switch off electricity and gas if it is safe to do so, and lock the house.", "यदि सुरक्षित हो तो बिजली और गैस बंद करें और घर में ताला लगाएँ।", "ସୁରକ୍ଷିତ ହେଲେ ବିଦ୍ୟୁତ୍ ଓ ଗ୍ୟାସ୍ ବନ୍ଦ କରନ୍ତୁ ଏବଂ ଘରକୁ ତାଲା ଦିଅନ୍ତୁ।"],
  ev5: ["Tell a contact outside the area where you are going.", "क्षेत्र के बाहर किसी संपर्क को बताएँ कि आप कहाँ जा रहे हैं।", "ଅଞ୍ଚଳ ବାହାରେ ଥିବା ଯୋଗାଯୋଗକୁ କୁହନ୍ତୁ ଆପଣ କେଉଁଠି ଯାଉଛନ୍ତି।"],
  ev6: ["Take older people, children and pets with you; plan help for those who need it.", "बुजुर्गों, बच्चों और पालतू जानवरों को साथ लें; ज़रूरतमंदों के लिए सहायता की योजना बनाएँ।", "ବୟସ୍କ, ଶିଶୁ ଓ ପୋଷା ପ୍ରାଣୀଙ୍କୁ ସାଙ୍ଗରେ ନିଅନ୍ତୁ; ଆବଶ୍ୟକ ଲୋକଙ୍କ ପାଇଁ ସହାୟତା ଯୋଜନା କରନ୍ତୁ।"]
});
PHASE3_PAGES.evac = () => {
  const plan = readStorage("evac", null) || {};
  const record = getShelters().find((item) => item.id === plan.shelterId);
  const pos = currentPos();
  let route = "";
  if (record && hasCoordinates(record)) {
    const engine = plan.transport === "walk" ? "fossgis_osrm_foot" : plan.transport === "bike" ? "fossgis_osrm_bike" : "fossgis_osrm_car";
    route = pos
      ? `<p>${esc(t("evacDistance"))}: <strong>${distanceKm(pos.lat, pos.lon, Number(record.latitude), Number(record.longitude)).toFixed(1)} km</strong></p><a class="button primary" target="_blank" rel="noopener noreferrer" href="https://www.openstreetmap.org/directions?engine=${engine}&route=${pos.lat.toFixed(5)}%2C${pos.lon.toFixed(5)}%3B${Number(record.latitude)}%2C${Number(record.longitude)}">${esc(t("evacDirections"))}</a>`
      : `<p>${esc(t("evacNeedLoc"))}</p><button class="button" data-p1="locate">⌖ ${esc(t("useLocation"))}</button> <a class="button" target="_blank" rel="noopener noreferrer" href="${esc(mapLink(record))}">${esc(t("openMap"))}</a>`;
  }
  const summary = record ? `<section class="card page-card" style="margin-top:14px"><h2>${esc(record.name)}</h2><p class="page-subtitle">${esc(record.district)} ${record.address ? "· " + esc(record.address) : ""}</p><span class="review-badge">${esc(t("needsReview"))}</span><div style="margin-top:10px">${route}</div>${plan.transport === "help" ? `<p class="page-subtitle">${esc(t("evacHelpNote"))}</p>` : ""}</section>` : "";
  return `${heading("evacTitle", "evacSubtitle")}${notice("evacOfficial")}
    <section class="card page-card"><form data-p3form="evac"><div class="form-grid">
      <label class="field-group"><span>${esc(t("evacPeople"))} *</span><input class="form-control" type="number" name="people" min="1" max="200" required value="${esc(plan.people ?? 1)}"></label>
      <label class="field-group"><span>${esc(t("evacTransport"))}</span><select class="form-control" name="transport">${TRANSPORT.map(([id, key]) => `<option value="${id}" ${plan.transport === id ? "selected" : ""}>${esc(t(key))}</option>`).join("")}</select></label>
      <label class="field-group full-field"><span>${esc(t("evacShelter"))}</span><select class="form-control" name="shelterId">${shelterOptions(plan.shelterId)}</select>${getShelters().length ? "" : `<small>${esc(t("evacNoShelter"))}</small>`}</label>
      <label class="field-group full-field"><span>${esc(t("fNote"))}</span><textarea class="form-control" name="notes" rows="2" maxlength="300">${esc(plan.notes || "")}</textarea></label></div>
      <button class="button primary" type="submit">${esc(t("saveRecord"))}</button></form></section>${summary}
    <div style="margin-top:14px">${checklistCard("evacChecklist", "privacyNote", EVAC_ITEMS, "evac-check")}</div>`;
};
addNav("safety", "evac", "⇢", "navEvac");

/* ---------- 31 Medical information card ---------- */
const BLOOD_GROUPS = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
P3FORM.medical = (form) => {
  const data = new FormData(form), out = { updatedAt: new Date().toISOString() };
  for (const key of ["fullName", "age", "bloodGroup", "allergies", "conditions", "medicines", "ecName", "ecPhone", "notes"]) out[key] = String(data.get(key) || "").trim().slice(0, 300);
  if (out.ecPhone && !/^\+?[\d\s\-()]{3,20}$/.test(out.ecPhone)) { showToast(t("phoneInvalid")); return; }
  if (out.age && !(Number(out.age) >= 0 && Number(out.age) <= 120)) { showToast(t("numberInvalid")); return; }
  if (writeStorage("medical", out)) { renderPage(); showToast(t("recordSaved")); }
};
addMsgs({
  medTitle: ["Emergency medical information card", "आपातकालीन चिकित्सा सूचना कार्ड", "ଜରୁରୀ ଚିକିତ୍ସା ସୂଚନା କାର୍ଡ"], medSubtitle: ["Key health details for responders. Stays on this device only.", "सहायकों के लिए ज़रूरी स्वास्थ्य जानकारी। केवल इसी डिवाइस पर रहती है।", "ସହାୟକଙ୍କ ପାଇଁ ଜରୁରୀ ସ୍ବାସ୍ଥ୍ୟ ସୂଚନା। କେବଳ ଏହି ଡିଭାଇସ୍‌ରେ ରହେ।"],
  medPrivacy: ["Sensitive health data. It is not uploaded. Anyone who can open this device can see it; print a copy for your emergency bag.", "संवेदनशील स्वास्थ्य डेटा। यह अपलोड नहीं होता। जो भी यह डिवाइस खोल सकता है वह इसे देख सकता है; अपने आपातकालीन बैग के लिए प्रिंट रखें।", "ସମ୍ବେଦନଶୀଳ ସ୍ବାସ୍ଥ୍ୟ ତଥ୍ୟ। ଏହା ଅପଲୋଡ୍ ହୁଏ ନାହିଁ। ଏହି ଡିଭାଇସ୍ ଖୋଲିପାରୁଥିବା ଯେ କେହି ଏହା ଦେଖିପାରିବେ; ଜରୁରୀ ବ୍ୟାଗ୍ ପାଇଁ ପ୍ରିଣ୍ଟ କରନ୍ତୁ।"],
  medName: ["Full name", "पूरा नाम", "ପୂରା ନାମ"], medAge: ["Age", "आयु", "ବୟସ"], medBlood: ["Blood group", "रक्त समूह", "ରକ୍ତ ଗ୍ରୁପ୍"], medAllergies: ["Allergies", "एलर्जी", "ଆଲର୍ଜି"], medConditions: ["Medical conditions", "चिकित्सीय स्थितियाँ", "ଚିକିତ୍ସା ଅବସ୍ଥା"], medMedicines: ["Regular medicines", "नियमित दवाइयाँ", "ନିୟମିତ ଔଷଧ"],
  medEcName: ["Emergency contact name", "आपातकालीन संपर्क का नाम", "ଜରୁରୀ ଯୋଗାଯୋଗଙ୍କ ନାମ"], medEcPhone: ["Emergency contact phone", "आपातकालीन संपर्क का फ़ोन", "ଜରୁରୀ ଯୋଗାଯୋଗଙ୍କ ଫୋନ୍"], medCard: ["Medical card", "चिकित्सा कार्ड", "ଚିକିତ୍ସା କାର୍ଡ"], medEmpty: ["Not filled", "भरा नहीं गया", "ଭରାଯାଇନାହିଁ"]
});
PHASE3_PAGES.medical = () => {
  const m = readStorage("medical", null) || {};
  const input = (name, key, extra = "") => `<label class="field-group"><span>${esc(t(key))}</span><input class="form-control" name="${name}" maxlength="300" value="${esc(m[name] || "")}" ${extra}></label>`;
  const rows = [["medName", "fullName"], ["medAge", "age"], ["medBlood", "bloodGroup"], ["medAllergies", "allergies"], ["medConditions", "conditions"], ["medMedicines", "medicines"], ["medEcName", "ecName"], ["medEcPhone", "ecPhone"], ["fNote", "notes"]]
    .map(([key, field]) => `<div class="result-row"><span>${esc(t(key))}</span><strong>${esc(m[field] || t("medEmpty"))}</strong></div>`).join("");
  return `${heading("medTitle", "medSubtitle", `<button class="button" data-action="print">${esc(t("print"))}</button>`)}${notice("medPrivacy")}
    <section class="card page-card"><form data-p3form="medical"><div class="form-grid">${input("fullName", "medName")}${input("age", "medAge", 'type="number" min="0" max="120"')}
      <label class="field-group"><span>${esc(t("medBlood"))}</span><select class="form-control" name="bloodGroup">${BLOOD_GROUPS.map((g) => `<option value="${g}" ${m.bloodGroup === g ? "selected" : ""}>${g || "—"}</option>`).join("")}</select></label>
      ${input("allergies", "medAllergies")}${input("conditions", "medConditions")}${input("medicines", "medMedicines")}${input("ecName", "medEcName")}${input("ecPhone", "medEcPhone", 'type="tel"')}
      <label class="field-group full-field"><span>${esc(t("fNote"))}</span><textarea class="form-control" name="notes" rows="2" maxlength="300">${esc(m.notes || "")}</textarea></label></div>
      <button class="button primary" type="submit">${esc(t("saveRecord"))}</button></form></section>
    <section class="card page-card print-card" style="margin-top:14px"><h2>${esc(t("medCard"))}</h2><div class="result-box">${rows}</div></section>`;
};
addNav("safety", "medical", "✚", "navMedical");

/* ---------- 32 Safe meeting point planner ---------- */
LISTS.meeting = {
  title: "meetAdd", addLabel: "meetAdd", icon: "⚑", empty: "meetEmpty",
  fields: [
    { name: "name", label: "fName", required: true, max: 80 },
    { name: "type", label: "fType", type: "select", options: [["near", "mtNear"], ["community", "mtCommunity"], ["shelter", "mtShelter"], ["outside", "mtOutside"]] },
    { name: "landmark", label: "fLandmark", max: 160, full: true },
    { name: "latitude", label: "latitude", type: "number", step: "any", min: -90, max: 90 },
    { name: "longitude", label: "longitude", type: "number", step: "any", min: -180, max: 180 },
    { name: "note", label: "fNote", max: 200, full: true }
  ],
  validate: (e) => ((e.latitude === "") !== (e.longitude === "") ? "coordsInvalid" : ""),
  card: (i) => `<h3>${esc(i.name)}</h3><p>${esc(t({ near: "mtNear", community: "mtCommunity", shelter: "mtShelter", outside: "mtOutside" }[i.type]))}${i.landmark ? " · " + esc(i.landmark) : ""}</p>${i.note ? `<small>${esc(i.note)}</small>` : ""}${i.latitude !== "" && i.latitude != null ? `<div><a class="button small" href="${esc(osmPoint(Number(i.latitude), Number(i.longitude)))}" target="_blank" rel="noopener noreferrer">${esc(t("openMap"))}</a></div>` : ""}`
};
addMsgs({
  meetTitle: ["Safe meeting point planner", "सुरक्षित मिलन स्थल योजना", "ସୁରକ୍ଷିତ ମିଳନ ସ୍ଥାନ ଯୋଜନା"], meetSubtitle: ["If family gets separated, everyone knows where to meet.", "परिवार बिछड़ जाए तो सबको पता हो कि कहाँ मिलना है।", "ପରିବାର ଅଲଗା ହେଲେ ସମସ୍ତେ ଜାଣିବେ କେଉଁଠି ମିଳିବେ।"],
  meetTip: ["Choose one point near home, one in your community, and one outside your area. Use only places that official advice says are safe to reach.", "एक स्थान घर के पास, एक समुदाय में और एक क्षेत्र के बाहर चुनें। केवल वही स्थान चुनें जहाँ पहुँचना आधिकारिक सलाह के अनुसार सुरक्षित हो।", "ଗୋଟିଏ ଘର ପାଖରେ, ଗୋଟିଏ ସମୁଦାୟରେ ଓ ଗୋଟିଏ ଅଞ୍ଚଳ ବାହାରେ ବାଛନ୍ତୁ। ସରକାରୀ ପରାମର୍ଶ ଅନୁସାରେ ପହଞ୍ଚିବା ସୁରକ୍ଷିତ ସ୍ଥାନ ହିଁ ବାଛନ୍ତୁ।"],
  meetAdd: ["Add meeting point", "मिलन स्थल जोड़ें", "ମିଳନ ସ୍ଥାନ ଯୋଗ କରନ୍ତୁ"], meetEmpty: ["No meeting points yet.", "अभी कोई मिलन स्थल नहीं।", "ଏପର୍ଯ୍ୟନ୍ତ ମିଳନ ସ୍ଥାନ ନାହିଁ।"],
  mtNear: ["Near home", "घर के पास", "ଘର ପାଖରେ"], mtCommunity: ["In community", "समुदाय में", "ସମୁଦାୟରେ"], mtShelter: ["Shelter", "आश्रय", "ଆଶ୍ରୟସ୍ଥଳ"], mtOutside: ["Outside the area", "क्षेत्र के बाहर", "ଅଞ୍ଚଳ ବାହାରେ"]
});
PHASE3_PAGES.meeting = () => `${heading("meetTitle", "meetSubtitle", listAddButton("meeting"))}${notice("meetTip")}<p class="page-subtitle">${esc(t("localOnlyNote"))}</p>${listCards("meeting")}`;
addNav("safety", "meeting", "⚑", "navMeeting");

/* ---------- 33 Accessibility planning + 42 audit ---------- */
const ACCESS_NEEDS = ["mobility", "vision", "hearing", "cognitive", "elderly", "infant", "medicalNeed", "languageNeed"];
const AUDIT_ITEMS = ["auRamp", "auDoor", "auToilet", "auPath", "auSeating", "auSign", "auLight", "auStaff"];
P3CHANGE.audit = (el) => {
  const audit = getObject("audit"), id = p3.auditShelter;
  if (!id) return;
  const set = new Set(audit[id]?.items || []);
  if (el.checked) set.add(el.value); else set.delete(el.value);
  audit[id] = { items: [...set], at: new Date().toISOString() };
  if (writeStorage("audit", audit)) renderPage();
};
P3CHANGE["audit-shelter"] = (el) => { p3.auditShelter = el.value; renderPage(); };
addMsgs({
  accessTitle: ["Accessibility assistance planning", "सुगम्यता सहायता योजना", "ସୁଗମ୍ୟତା ସହାୟତା ଯୋଜନା"], accessSubtitle: ["Plan help for people with extra needs, and record shelter accessibility.", "अतिरिक्त ज़रूरत वाले लोगों के लिए सहायता की योजना बनाएँ और आश्रय की सुगम्यता दर्ज करें।", "ଅତିରିକ୍ତ ଆବଶ୍ୟକତା ଥିବା ଲୋକଙ୍କ ପାଇଁ ସହାୟତା ଯୋଜନା କରନ୍ତୁ ଏବଂ ଆଶ୍ରୟସ୍ଥଳର ସୁଗମ୍ୟତା ଲେଖନ୍ତୁ।"],
  accessPlanTab: ["Needs plan", "ज़रूरत योजना", "ଆବଶ୍ୟକତା ଯୋଜନା"], accessAuditTab: ["Shelter audit", "आश्रय ऑडिट", "ଆଶ୍ରୟସ୍ଥଳ ଅଡିଟ୍"],
  accessNote: ["General planning guidance only. Tell local authorities or volunteers about your needs early.", "केवल सामान्य योजना मार्गदर्शन। अपनी ज़रूरतों के बारे में स्थानीय अधिकारियों या स्वयंसेवकों को पहले बताएँ।", "କେବଳ ସାଧାରଣ ଯୋଜନା ମାର୍ଗଦର୍ଶନ। ଆପଣଙ୍କ ଆବଶ୍ୟକତା ବିଷୟରେ ସ୍ଥାନୀୟ କର୍ତ୍ତୃପକ୍ଷ ବା ସ୍ବେଚ୍ଛାସେବୀଙ୍କୁ ଆଗରୁ କୁହନ୍ତୁ।"],
  mobility: ["Mobility / wheelchair", "चलने में कठिनाई / व्हीलचेयर", "ଚଳପ୍ରଚଳ / ହ୍ବିଲ୍‌ଚେୟାର୍"], vision: ["Vision impairment", "दृष्टि बाधा", "ଦୃଷ୍ଟି ଅସୁବିଧା"], hearing: ["Hearing impairment", "श्रवण बाधा", "ଶ୍ରବଣ ଅସୁବିଧା"], cognitive: ["Cognitive / mental health", "संज्ञानात्मक / मानसिक स्वास्थ्य", "ଜ୍ଞାନଗତ / ମାନସିକ ସ୍ବାସ୍ଥ୍ୟ"],
  elderly: ["Older person", "बुजुर्ग", "ବୟସ୍କ"], infant: ["Infant / small child", "शिशु / छोटा बच्चा", "ଶିଶୁ / ଛୋଟ ପିଲା"], medicalNeed: ["Ongoing medical need", "निरंतर चिकित्सा आवश्यकता", "ନିରନ୍ତର ଚିକିତ୍ସା ଆବଶ୍ୟକତା"], languageNeed: ["Language / literacy support", "भाषा / साक्षरता सहायता", "ଭାଷା / ସାକ୍ଷରତା ସହାୟତା"],
  tip_mobility: ["Agree a helper and a route in advance. Ask for a ground-floor, ramp-access spot at the shelter.", "पहले से सहायक और मार्ग तय करें। आश्रय में भूतल और रैंप वाली जगह माँगें।", "ଆଗରୁ ସହାୟକ ଓ ରାସ୍ତା ଠିକ୍ କରନ୍ତୁ। ଆଶ୍ରୟସ୍ଥଳରେ ତଳମହଲା ଓ ରାମ୍ପ ଥିବା ସ୍ଥାନ ମାଗନ୍ତୁ।"],
  tip_vision: ["Keep a familiar guide or cane, and ask a volunteer to describe the route and layout.", "परिचित सहायक या छड़ी रखें और स्वयंसेवक से मार्ग और ढाँचा बताने को कहें।", "ପରିଚିତ ସହାୟକ ବା ବାଡ଼ି ରଖନ୍ତୁ ଏବଂ ସ୍ବେଚ୍ଛାସେବୀଙ୍କୁ ରାସ୍ତା ଓ ଢାଞ୍ଚା ବୁଝାଇବାକୁ କୁହନ୍ତୁ।"],
  tip_hearing: ["Carry spare hearing-aid batteries. Ask for written or visual announcements.", "हियरिंग-एड की अतिरिक्त बैटरी रखें। लिखित या दृश्य घोषणाएँ माँगें।", "ଶ୍ରବଣ ଯନ୍ତ୍ରର ଅତିରିକ୍ତ ବ୍ୟାଟେରୀ ରଖନ୍ତୁ। ଲିଖିତ ବା ଦୃଶ୍ୟ ଘୋଷଣା ମାଗନ୍ତୁ।"],
  tip_cognitive: ["Keep a trusted person close, a calm routine, and familiar items. Write down key information.", "विश्वसनीय व्यक्ति पास रखें, शांत दिनचर्या और परिचित वस्तुएँ रखें। ज़रूरी जानकारी लिख लें।", "ବିଶ୍ବସ୍ତ ବ୍ୟକ୍ତିଙ୍କୁ ପାଖରେ ରଖନ୍ତୁ, ଶାନ୍ତ ଦିନଚର୍ଯ୍ୟା ଓ ପରିଚିତ ଜିନିଷ ରଖନ୍ତୁ। ଜରୁରୀ ସୂଚନା ଲେଖି ରଖନ୍ତୁ।"],
  tip_elderly: ["Pack medicines for several days, glasses and walking aids. Leave early and avoid stairs.", "कई दिनों की दवाइयाँ, चश्मा और चलने के सहारे रखें। जल्दी निकलें और सीढ़ियों से बचें।", "ଅନେକ ଦିନର ଔଷଧ, ଚଷମା ଓ ଚଳିବା ସହାୟକ ରଖନ୍ତୁ। ଶୀଘ୍ର ବାହାରନ୍ତୁ ଏବଂ ସିଡ଼ି ଏଡ଼ାନ୍ତୁ।"],
  tip_infant: ["Pack food, clean water, diapers and a blanket. Keep the child close in crowds.", "भोजन, साफ़ पानी, डायपर और कंबल रखें। भीड़ में बच्चे को पास रखें।", "ଖାଦ୍ୟ, ସଫା ପାଣି, ଡାଇପର୍ ଓ କମ୍ବଳ ରଖନ୍ତୁ। ଭିଡ଼ରେ ଶିଶୁକୁ ପାଖରେ ରଖନ୍ତୁ।"],
  tip_medicalNeed: ["Carry prescriptions and medicines; note any power-dependent device and tell shelter staff early.", "पर्चे और दवाइयाँ रखें; बिजली पर निर्भर उपकरण हो तो आश्रय कर्मियों को पहले बताएँ।", "ପ୍ରେସ୍କ୍ରିପସନ୍ ଓ ଔଷଧ ରଖନ୍ତୁ; ବିଦ୍ୟୁତ୍ ନିର୍ଭର ଯନ୍ତ୍ର ଥିଲେ ଆଶ୍ରୟସ୍ଥଳ କର୍ମୀଙ୍କୁ ଆଗରୁ କୁହନ୍ତୁ।"],
  tip_languageNeed: ["Ask for information in Odia, Hindi or English. Use the Translate page and read-aloud.", "ओड़िया, हिंदी या अंग्रेज़ी में जानकारी माँगें। अनुवाद पेज और पढ़कर सुनाने की सुविधा का उपयोग करें।", "ଓଡ଼ିଆ, ହିନ୍ଦୀ ବା ଇଂରାଜୀରେ ସୂଚନା ମାଗନ୍ତୁ। ଅନୁବାଦ ପୃଷ୍ଠା ଓ ପଢ଼ି ଶୁଣାଇବା ବ୍ୟବହାର କରନ୍ତୁ।"],
  accessShelters: ["Shelters that record an accessibility feature", "जिन आश्रयों में सुगम्यता सुविधा दर्ज है", "ଯେଉଁ ଆଶ୍ରୟସ୍ଥଳରେ ସୁଗମ୍ୟତା ସୁବିଧା ଲେଖା ଅଛି"], accessNone: ["No shelter records an accessibility feature yet.", "अभी किसी आश्रय में सुगम्यता सुविधा दर्ज नहीं है।", "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଆଶ୍ରୟସ୍ଥଳରେ ସୁଗମ୍ୟତା ସୁବିଧା ଲେଖା ନାହିଁ।"],
  auditNote: ["Self-recorded observations, not a certified accessibility audit.", "स्वयं दर्ज अवलोकन, प्रमाणित सुगम्यता ऑडिट नहीं।", "ନିଜେ ଲେଖିଥିବା ପର୍ଯ୍ୟବେକ୍ଷଣ, ପ୍ରମାଣିତ ସୁଗମ୍ୟତା ଅଡିଟ୍ ନୁହେଁ।"], auditPick: ["Choose a shelter to audit", "ऑडिट के लिए आश्रय चुनें", "ଅଡିଟ୍ ପାଇଁ ଆଶ୍ରୟସ୍ଥଳ ବାଛନ୍ତୁ"], auditScore: ["items observed", "वस्तुएँ देखी गईं", "ବିଷୟ ଦେଖାଗଲା"],
  auRamp: ["Ramp or step-free entrance", "रैंप या बिना सीढ़ी का प्रवेश", "ରାମ୍ପ ବା ସିଡ଼ିବିହୀନ ପ୍ରବେଶ"], auDoor: ["Wide doors (wheelchair passes)", "चौड़े दरवाज़े (व्हीलचेयर निकले)", "ଚଉଡ଼ା ଦ୍ବାର (ହ୍ବିଲ୍‌ଚେୟାର୍ ଯାଏ)"], auToilet: ["Accessible toilet", "सुगम्य शौचालय", "ସୁଗମ୍ୟ ଶୌଚାଳୟ"], auPath: ["Clear, level path inside", "भीतर साफ़, समतल रास्ता", "ଭିତରେ ସଫା, ସମତଳ ରାସ୍ତା"],
  auSeating: ["Seating and resting area", "बैठने और आराम की जगह", "ବସିବା ଓ ବିଶ୍ରାମ ସ୍ଥାନ"], auSign: ["Clear signage / large print", "स्पष्ट संकेत / बड़े अक्षर", "ସ୍ପଷ୍ଟ ସଙ୍କେତ / ବଡ଼ ଅକ୍ଷର"], auLight: ["Good lighting", "अच्छी रोशनी", "ଭଲ ଆଲୋକ"], auStaff: ["Staff or volunteer to assist", "सहायता के लिए कर्मी या स्वयंसेवक", "ସହାୟତା ପାଇଁ କର୍ମୀ ବା ସ୍ବେଚ୍ଛାସେବୀ"]
});
PHASE3_PAGES.access = () => {
  const tabs = [["plan", "accessPlanTab"], ["audit", "accessAuditTab"]];
  const tab = currentTab("access", tabs);
  let body;
  if (tab === "plan") {
    const chosen = new Set(getChecks("accessneeds"));
    const accessible = getShelters().filter((record) => record.facilities?.includes("accessible"));
    body = `${checklistCard("accessTitle", "privacyNote", ACCESS_NEEDS, "accessneeds")}
      ${[...chosen].map((key) => `<div class="notice-banner"><span aria-hidden="true">✓</span><span><strong>${esc(t(key))}:</strong> ${esc(t(`tip_${key}`))}</span></div>`).join("")}
      <section class="card page-card"><h2>${esc(t("accessShelters"))}</h2>${accessible.length ? accessible.map((record) => `<div class="district-row"><div><strong>${esc(record.name)}</strong><small>${esc(record.district)}</small></div><span class="review-badge">${esc(t("needsReview"))}</span></div>`).join("") : p3Empty("accessNone")}</section>`;
  } else {
    const audit = getObject("audit"), id = p3.auditShelter, done = new Set(audit[id]?.items || []);
    body = `<section class="card page-card"><label class="field-group"><span>${esc(t("auditPick"))}</span><select class="form-control" data-p3change="audit-shelter">${shelterOptions(id)}</select></label>
      ${id ? `<p class="page-subtitle">${done.size}/${AUDIT_ITEMS.length} ${esc(t("auditScore"))}${audit[id]?.at ? ` · ${esc(formatDateTime(audit[id].at))}` : ""}</p><div class="progress-track"><div class="progress-fill" style="width:${Math.round(done.size / AUDIT_ITEMS.length * 100)}%"></div></div>
      <div class="checklist">${AUDIT_ITEMS.map((key) => `<label class="check-row"><input type="checkbox" data-p3change="audit" value="${key}" ${done.has(key) ? "checked" : ""}><span>${esc(t(key))}</span></label>`).join("")}</div>` : ""}</section>`;
  }
  return `${heading("accessTitle", "accessSubtitle")}${notice(tab === "plan" ? "accessNote" : "auditNote")}${tabsHtml("access", tabs)}${body}`;
};
addNav("safety", "access", "♿", "navAccess");

/* ---------- 28 Family safety planner (members) ---------- */
LISTS.family = {
  title: "famAdd", addLabel: "famAdd", icon: "♡", empty: "famEmpty",
  fields: [
    { name: "name", label: "fName", required: true, max: 80 },
    { name: "role", label: "fType", type: "select", options: [["member", "famMember"], ["outofarea", "famOut"]] },
    { name: "relation", label: "famRelation", max: 60 },
    { name: "phone", label: "fPhone", type: "tel", max: 20 },
    { name: "needs", label: "famNeeds", max: 200, full: true }
  ],
  card: (i) => `<h3>${esc(i.name)}</h3><p>${esc(t(i.role === "outofarea" ? "famOut" : "famMember"))}${i.relation ? " · " + esc(i.relation) : ""}</p>${i.needs ? `<small>${esc(t("famNeeds"))}: ${esc(i.needs)}</small>` : ""}${i.phone ? `<div><a class="button small" href="${telLink(i.phone)}">☎ ${esc(i.phone)}</a></div>` : ""}`
};
addMsgs({
  famAdd: ["Add family member", "परिवार का सदस्य जोड़ें", "ପରିବାର ସଦସ୍ୟ ଯୋଗ କରନ୍ତୁ"], famEmpty: ["No family members added yet.", "अभी कोई सदस्य नहीं जोड़ा गया।", "ଏପର୍ଯ୍ୟନ୍ତ ସଦସ୍ୟ ଯୋଗ ହୋଇନାହିଁ।"], famMembersTitle: ["Family members and out-of-area contact", "परिवार के सदस्य और क्षेत्र के बाहर का संपर्क", "ପରିବାର ସଦସ୍ୟ ଓ ଅଞ୍ଚଳ ବାହାରର ଯୋଗାଯୋଗ"],
  famMember: ["Family member", "परिवार का सदस्य", "ପରିବାର ସଦସ୍ୟ"], famOut: ["Out-of-area contact", "क्षेत्र के बाहर का संपर्क", "ଅଞ୍ଚଳ ବାହାରର ଯୋଗାଯୋଗ"], famRelation: ["Relation", "संबंध", "ସମ୍ପର୍କ"], famNeeds: ["Special needs / medicines", "विशेष ज़रूरतें / दवाइयाँ", "ବିଶେଷ ଆବଶ୍ୟକତା / ଔଷଧ"]
});
function familyMembersHtml() {
  return `<section class="card page-card" style="margin-top:14px"><div class="card-heading"><div><h2>${esc(t("famMembersTitle"))}</h2><p>${esc(t("localOnlyNote"))}</p></div><div class="heading-actions">${listAddButton("family")}</div></div>${listCards("family")}</section>`;
}

/* ---------- 34 Before / during / after stages ---------- */
const HAZARD_STAGES = {
  cyclone: { before: [1, 2], during: [3, 4], after: [5] }, flood: { before: [1, 4], during: [2, 3], after: [5] },
  heatwave: { before: [1, 3], during: [2, 4, 5], after: [] }, lightning: { before: [], during: [1, 2, 3, 4], after: [5] }
};
addMsgs({
  stageBefore: ["Before", "पहले", "ପୂର୍ବରୁ"], stageDuring: ["During", "दौरान", "ସମୟରେ"], stageAfter: ["After", "बाद में", "ପରେ"],
  stageNone: ["No specific step recorded here. Follow official advice.", "यहाँ कोई विशेष चरण दर्ज नहीं है। आधिकारिक सलाह का पालन करें।", "ଏଠାରେ କୌଣସି ନିର୍ଦ୍ଦିଷ୍ଟ ପଦକ୍ଷେପ ନାହିଁ। ସରକାରୀ ପରାମର୍ଶ ଅନୁସରଣ କରନ୍ତୁ।"]
});
function hazardStagesHtml(hazard, done) {
  return ["before", "during", "after"].map((stage) => {
    const steps = HAZARD_STAGES[hazard][stage];
    const rows = steps.length ? steps.map((n) => { const key = `${hazard}${n}`; return `<label class="check-row"><input type="checkbox" data-checklist="hazard-${hazard}" value="${key}" ${done.has(key) ? "checked" : ""}><span>${esc(t(key))}</span></label>`; }).join("") : `<p class="page-subtitle">${esc(t("stageNone"))}</p>`;
    return `<h3 class="stage-title stage-${stage}">${esc(t(`stage${stage[0].toUpperCase()}${stage.slice(1)}`))}</h3><div class="checklist">${rows}</div>`;
  }).join("");
}

/* ---------- 21 Natural-language smart search (keyword understanding, not AI) ---------- */
const ODISHA_DISTRICTS = ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Keonjhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"];
const FACILITY_WORDS = {
  water: ["water", "पानी", "जल", "ପାଣି", "ଜଳ"], sanitation: ["toilet", "sanitation", "washroom", "शौचालय", "ଶୌଚାଳୟ"], medical: ["medical", "doctor", "medicine", "clinic", "health", "चिकित्सा", "डॉक्टर", "दवा", "ଡାକ୍ତର", "ଚିକିତ୍ସା", "ଔଷଧ"],
  power: ["power", "electric", "generator", "backup", "बिजली", "ବିଦ୍ୟୁତ୍", "ବିଜୁଳି"], accessible: ["wheelchair", "accessible", "disabled", "ramp", "व्हीलचेयर", "विकलांग", "दिव्यांग", "ଦିବ୍ୟାଙ୍ଗ", "ହ୍ବିଲ"], food: ["food", "meal", "kitchen", "खाना", "भोजन", "ଖାଦ୍ୟ", "ଭୋଜନ"],
  lighting: ["light", "lamp", "रोशनी", "ଆଲୋକ"], comms: ["phone", "network", "communication", "संचार", "ଯୋଗାଯୋଗ"]
};
const NEAR_WORDS = ["nearest", "nearby", "closest", "near me", "पास", "नज़दीक", "ନିକଟ", "ପାଖ"];
const SPACE_WORDS = ["available", "vacant", "free", "space", "खाली", "ଖାଲି"];
function parseSearch(query) {
  const lower = query.toLocaleLowerCase();
  const knownDistricts = [...new Set([...ODISHA_DISTRICTS, ...getShelters().map((record) => record.district.trim())])];
  const districts = knownDistricts.filter((name) => name && lower.includes(name.toLocaleLowerCase()));
  const facilities = Object.entries(FACILITY_WORDS).filter(([, words]) => words.some((word) => lower.includes(word))).map(([field]) => field);
  const numberMatch = lower.match(/\d[\d,]*/);
  const people = numberMatch ? Number(numberMatch[0].replace(/,/g, "")) : null;
  return { districts, facilities, people: Number.isFinite(people) && people > 0 ? people : null, near: NEAR_WORDS.some((word) => lower.includes(word)), space: SPACE_WORDS.some((word) => lower.includes(word)) };
}
function runSearch(query) {
  const q = parseSearch(query), pos = currentPos();
  const understood = q.districts.length || q.facilities.length || q.people || q.near || q.space;
  let results = getShelters().filter((record) => {
    if (!understood) return `${record.name} ${record.district} ${record.address || ""} ${record.source}`.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    if (q.districts.length && !q.districts.some((name) => `${record.district} ${record.address || ""}`.toLocaleLowerCase().includes(name.toLocaleLowerCase()))) return false;
    if (q.facilities.some((field) => !record.facilities?.includes(field))) return false;
    const free = hasOccupancy(record) ? Number(record.capacity) - record.occupancy : Number(record.capacity);
    if (q.people && free < q.people) return false;
    if (q.space && hasOccupancy(record) && free <= 0) return false;
    return true;
  });
  if (q.near && pos) results = results.filter(hasCoordinates).sort((a, b) => distanceKm(pos.lat, pos.lon, a.latitude, a.longitude) - distanceKm(pos.lat, pos.lon, b.latitude, b.longitude));
  return { q, results, needLocation: q.near && !pos };
}
P3FORM.search = (form) => { p3.search.q = String(new FormData(form).get("q") || "").trim(); renderPage(); };
function searchFromGlobal(text) { p3.search.q = text; navigate("search"); }
addMsgs({
  searchTitle: ["Smart search", "स्मार्ट खोज", "ସ୍ମାର୍ଟ ସନ୍ଧାନ"], searchSubtitle: ["Type what you need, like “shelter with water in Puri for 200 people”.", "जो चाहिए लिखें, जैसे “पुरी में पानी वाला आश्रय 200 लोगों के लिए”।", "ଯାହା ଦରକାର ଲେଖନ୍ତୁ, ଯେପରି “ପୁରୀରେ ପାଣି ଥିବା ଆଶ୍ରୟସ୍ଥଳ 200 ଲୋକଙ୍କ ପାଇଁ”।"],
  searchNote: ["This understands keywords (district, facility, number of people, nearest). It is not AI and only searches shelters saved on this device.", "यह कीवर्ड (जिला, सुविधा, लोगों की संख्या, निकटतम) समझता है। यह AI नहीं है और केवल इस डिवाइस पर सहेजे आश्रयों में खोजता है।", "ଏହା କୀୱାର୍ଡ (ଜିଲ୍ଲା, ସୁବିଧା, ଲୋକ ସଂଖ୍ୟା, ନିକଟତମ) ବୁଝେ। ଏହା AI ନୁହେଁ ଏବଂ କେବଳ ଏହି ଡିଭାଇସ୍‌ରେ ସେଭ୍ ଆଶ୍ରୟସ୍ଥଳରେ ଖୋଜେ।"],
  searchPlaceholder: ["e.g. toilet and medical in Khordha", "जैसे खोर्धा में शौचालय और चिकित्सा", "ଯେପରି ଖୋର୍ଦ୍ଧାରେ ଶୌଚାଳୟ ଓ ଚିକିତ୍ସା"], searchBtn: ["Search", "खोजें", "ସନ୍ଧାନ"], searchUnderstood: ["Understood as", "समझा गया", "ବୁଝାଗଲା"], searchPeople: ["space for", "जगह", "ସ୍ଥାନ"], searchNear: ["nearest first", "निकटतम पहले", "ନିକଟତମ ପ୍ରଥମେ"], searchSpace: ["has free space", "खाली जगह", "ଖାଲି ସ୍ଥାନ"],
  searchNoResults: ["No saved shelter matches this search.", "कोई सहेजा आश्रय इस खोज से मेल नहीं खाता।", "କୌଣସି ସେଭ୍ ଆଶ୍ରୟସ୍ଥଳ ଏହି ସନ୍ଧାନ ସହ ମେଳ ଖାଉନାହିଁ।"], searchCapAssumed: ["Where occupancy is not entered, recorded capacity is used as free space.", "जहाँ अधिभोग दर्ज नहीं है, वहाँ दर्ज क्षमता को खाली जगह माना गया है।", "ଯେଉଁଠି ଅଧିଭୋଗ ଲେଖା ନାହିଁ, ସେଠି ଲେଖା କ୍ଷମତାକୁ ଖାଲି ସ୍ଥାନ ଭାବେ ଧରାଯାଇଛି।"], searchNeedLoc: ["Use your location (Nearby page) to sort by distance.", "दूरी से क्रम के लिए अपना स्थान उपयोग करें (आस-पास पेज)।", "ଦୂରତା ଅନୁସାରେ ସଜାଇବାକୁ ଆପଣଙ୍କ ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ (ନିକଟ ପୃଷ୍ଠା)।"]
});
PHASE3_PAGES.search = () => {
  const query = p3.search.q;
  let out = "";
  if (query) {
    const { q, results, needLocation } = runSearch(query);
    const chips = [...q.districts, ...q.facilities.map((field) => t(SHELTER_FACILITIES.find(([f]) => f === field)[1])), ...(q.people ? [`${t("searchPeople")} ${q.people}`] : []), ...(q.near ? [t("searchNear")] : []), ...(q.space ? [t("searchSpace")] : [])];
    out = `${chips.length ? `<p class="page-subtitle">${esc(t("searchUnderstood"))}: ${chips.map((chip) => `<span class="review-badge">${esc(chip)}</span>`).join(" ")}</p>` : ""}
      ${q.people ? `<small>${esc(t("searchCapAssumed"))}</small>` : ""}${needLocation ? `<div class="notice-banner"><span aria-hidden="true">ⓘ</span><span>${esc(t("searchNeedLoc"))}</span></div>` : ""}
      ${results.length ? `<div class="list-grid">${results.map(shelterCard).join("")}</div>` : emptyState("searchNoResults", "changeFilters")}`;
  }
  return `${heading("searchTitle", "searchSubtitle")}${notice("searchNote")}
    <section class="card page-card"><form data-p3form="search" class="inline-form"><input class="form-control" name="q" maxlength="200" placeholder="${esc(t("searchPlaceholder"))}" value="${esc(query)}" aria-label="${esc(t("searchTitle"))}"><button class="button primary" type="submit">${esc(t("searchBtn"))}</button></form></section>${out}`;
};
addNav("safety", "search", "⌕", "navSearch");

/* ---------- 20 Duplicate incident report detection ---------- */
function reportTokens(text) {
  return new Set(String(text).toLocaleLowerCase().split(/[^\p{L}\p{N}]+/u).filter((word) => word.length > 2));
}
function findDuplicate(text, reports) {
  const mine = reportTokens(text);
  if (mine.size < 2) return null;
  let best = null;
  for (const report of reports) {
    const other = reportTokens(report.text);
    const shared = [...mine].filter((word) => other.has(word)).length;
    const score = shared / (mine.size + other.size - shared || 1);
    if (score >= 0.5 && (!best || score > best.score)) best = { id: report.id, score };
  }
  return best;
}

/* ---------- image helper for photo reports (local only) ---------- */
function shrinkImage(file, maxSide = 640, quality = 0.7) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) { reject(new Error("not-image")); return; }
    const url = URL.createObjectURL(file), image = new Image();
    image.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale);
      canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error("bad-image")); };
    image.src = url;
  });
}

addMsgs({
  dupPossible: ["Possible duplicate of an earlier report", "पहले की रिपोर्ट की संभावित डुप्लिकेट", "ପୂର୍ବ ରିପୋର୍ଟର ସମ୍ଭାବ୍ୟ ଡୁପ୍ଲିକେଟ୍"], dupNote: ["Duplicate check compares wording only. Please review.", "डुप्लिकेट जाँच केवल शब्दों की तुलना करती है। कृपया जाँचें।", "ଡୁପ୍ଲିକେଟ୍ ଯାଞ୍ଚ କେବଳ ଶବ୍ଦ ତୁଳନା କରେ। ଦୟାକରି ଯାଞ୍ଚ କରନ୍ତୁ।"]
});
