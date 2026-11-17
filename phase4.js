/* Phase 3b: resources, data quality, planning, analytics and reports (features 22-24, 38-46, 61, 71, 73-85, 105, 110, 117, 120) */
const RES_NUM = ["water", "meals", "firstAidKits", "powerHours", "toilets", "toiletsWorking", "hygieneKits"];
const POWER_STATUS = [["", "psUnknown"], ["grid", "psGrid"], ["generator", "psGenerator"], ["solar", "psSolar"], ["none", "psNone"]];
const DAY = 86400000;
function ageDays(iso) { const time = new Date(iso).getTime(); return Number.isFinite(time) ? (Date.now() - time) / DAY : null; }
function getResources() { return getObject("resources"); }
function getAssume() { const a = getObject("assume"); return { water: Number(a.water) > 0 ? Number(a.water) : 15, meals: Number(a.meals) > 0 ? Number(a.meals) : 3 }; }
function peopleBasis(record) { return hasOccupancy(record) ? { n: record.occupancy, basis: "basisOcc" } : { n: Number(record.capacity || 0), basis: "basisCap" }; }
function daysOf(stock, people, perPerson) { return people > 0 && stock !== "" && stock != null ? Number(stock) / (people * perPerson) : null; }
function fmtDays(value) { return value === null ? "—" : `${value.toFixed(1)} ${t("daysWord")}`; }
function level(value, low, watch) { return value === null ? "" : value < low ? "level-low" : value < watch ? "level-watch" : "level-ok"; }

addMsgs({
  navInventory: ["Resources & stock", "संसाधन और भंडार", "ସମ୍ବଳ ଓ ଭଣ୍ଡାର"], navAiPlan: ["AI planner", "AI योजनाकार", "AI ଯୋଜନାକାର"], navQuality: ["Data quality", "डेटा गुणवत्ता", "ତଥ୍ୟ ଗୁଣବତ୍ତା"], navAnalytics: ["Analytics", "विश्लेषण", "ବିଶ୍ଳେଷଣ"], navReportCenter: ["Report centre", "रिपोर्ट केंद्र", "ରିପୋର୍ଟ କେନ୍ଦ୍ର"],
  daysWord: ["days", "दिन", "ଦିନ"], basisOcc: ["based on entered occupancy", "दर्ज अधिभोग के आधार पर", "ଲେଖା ଅଧିଭୋଗ ଆଧାରରେ"], basisCap: ["based on recorded capacity (occupancy not entered)", "दर्ज क्षमता के आधार पर (अधिभोग दर्ज नहीं)", "ଲେଖା କ୍ଷମତା ଆଧାରରେ (ଅଧିଭୋଗ ଲେଖା ନାହିଁ)"],
  invTitle: ["Resources and stock", "संसाधन और भंडार", "ସମ୍ବଳ ଓ ଭଣ୍ଡାର"], invSubtitle: ["Record water, food, first aid, power and sanitation by hand for each shelter.", "हर आश्रय के लिए पानी, भोजन, प्राथमिक उपचार, बिजली और स्वच्छता हाथ से दर्ज करें।", "ପ୍ରତି ଆଶ୍ରୟସ୍ଥଳ ପାଇଁ ପାଣି, ଖାଦ୍ୟ, ପ୍ରାଥମିକ ଚିକିତ୍ସା, ବିଦ୍ୟୁତ୍ ଓ ସ୍ବଚ୍ଛତା ହାତରେ ଲେଖନ୍ତୁ।"],
  invNote: ["Figures are entered by you and not verified. Days of supply are planning estimates using the assumptions below, not forecasts.", "आँकड़े आपके द्वारा दर्ज हैं और सत्यापित नहीं हैं। आपूर्ति के दिन नीचे की मान्यताओं पर आधारित योजना अनुमान हैं, पूर्वानुमान नहीं।", "ଅଙ୍କ ଆପଣ ଲେଖିଛନ୍ତି ଏବଂ ଯାଞ୍ଚ ହୋଇନାହିଁ। ଯୋଗାଣ ଦିନ ତଳେ ଥିବା ଧାରଣା ଆଧାରିତ ଯୋଜନା ଅନୁମାନ, ପୂର୍ବାନୁମାନ ନୁହେଁ।"],
  tabStock: ["Water & food", "पानी और भोजन", "ପାଣି ଓ ଖାଦ୍ୟ"], tabFirstAid: ["First aid", "प्राथमिक उपचार", "ପ୍ରାଥମିକ ଚିକିତ୍ସା"], tabPower: ["Backup power", "बैकअप बिजली", "ବ୍ୟାକଅପ୍ ବିଦ୍ୟୁତ୍"], tabSanitation: ["Sanitation", "स्वच्छता", "ସ୍ବଚ୍ଛତା"], tabMaint: ["Maintenance", "रखरखाव", "ରକ୍ଷଣାବେକ୍ଷଣ"], tabDist: ["Distribution", "वितरण", "ବିତରଣ"], tabCompare: ["Compare", "तुलना", "ତୁଳନା"],
  assumeTitle: ["Planning assumption (per person per day)", "योजना मान्यता (प्रति व्यक्ति प्रति दिन)", "ଯୋଜନା ଧାରଣା (ପ୍ରତି ବ୍ୟକ୍ତି ପ୍ରତି ଦିନ)"], assumeWater: ["Water (litres)", "पानी (लीटर)", "ପାଣି (ଲିଟର)"], assumeMeals: ["Meals", "भोजन", "ଭୋଜନ"], assumeHint: ["Default 15 litres and 3 meals are common humanitarian planning values. Change them to match your guidance.", "डिफ़ॉल्ट 15 लीटर और 3 भोजन सामान्य मानवीय योजना मान हैं। अपने निर्देशों के अनुसार बदलें।", "ଡିଫଲ୍ଟ 15 ଲିଟର ଓ 3 ଭୋଜନ ସାଧାରଣ ମାନବିକ ଯୋଜନା ମୂଲ୍ୟ। ଆପଣଙ୍କ ନିର୍ଦ୍ଦେଶ ଅନୁସାରେ ବଦଳାନ୍ତୁ।"],
  resUpdate: ["Update resources", "संसाधन अपडेट करें", "ସମ୍ବଳ ଅପଡେଟ୍"], resNone: ["Not recorded yet", "अभी दर्ज नहीं", "ଏପର୍ଯ୍ୟନ୍ତ ଲେଖା ନାହିଁ"], resSaved: ["Resources saved.", "संसाधन सहेजे गए।", "ସମ୍ବଳ ସେଭ୍ ହେଲା।"],
  rWater: ["Drinking water (litres)", "पीने का पानी (लीटर)", "ପିଇବା ପାଣି (ଲିଟର)"], rMeals: ["Meals available", "उपलब्ध भोजन", "ଉପଲବ୍ଧ ଭୋଜନ"], rKits: ["First-aid kits", "प्राथमिक उपचार किट", "ପ୍ରାଥମିକ ଚିକିତ୍ସା କିଟ୍"], rKitsChecked: ["First-aid last checked", "प्राथमिक उपचार अंतिम जाँच", "ପ୍ରାଥମିକ ଚିକିତ୍ସା ଶେଷ ଯାଞ୍ଚ"], rPowerStatus: ["Backup power type", "बैकअप बिजली का प्रकार", "ବ୍ୟାକଅପ୍ ବିଦ୍ୟୁତ୍ ପ୍ରକାର"], rPowerHours: ["Backup hours available", "उपलब्ध बैकअप घंटे", "ଉପଲବ୍ଧ ବ୍ୟାକଅପ୍ ଘଣ୍ଟା"],
  rToilets: ["Toilets", "शौचालय", "ଶୌଚାଳୟ"], rToiletsOk: ["Toilets working", "चालू शौचालय", "ଚାଲୁ ଶୌଚାଳୟ"], rHygiene: ["Hygiene kits / soap", "स्वच्छता किट / साबुन", "ସ୍ବଚ୍ଛତା କିଟ୍ / ସାବୁନ୍"], rCleaned: ["Last cleaned", "अंतिम सफ़ाई", "ଶେଷ ସଫେଇ"],
  psUnknown: ["Not recorded", "दर्ज नहीं", "ଲେଖା ନାହିଁ"], psGrid: ["Grid only", "केवल ग्रिड", "କେବଳ ଗ୍ରିଡ୍"], psGenerator: ["Generator", "जनरेटर", "ଜେନେରେଟର୍"], psSolar: ["Solar", "सोलर", "ସୋଲାର୍"], psNone: ["None", "कोई नहीं", "କିଛି ନାହିଁ"],
  lowSupply: ["Low supply (planning flag)", "कम आपूर्ति (योजना संकेत)", "କମ୍ ଯୋଗାଣ (ଯୋଜନା ସଂକେତ)"], watchSupply: ["Watch", "ध्यान दें", "ଧ୍ୟାନ ଦିଅନ୍ତୁ"], okSupply: ["Entered figure looks sufficient", "दर्ज आँकड़ा पर्याप्त दिखता है", "ଲେଖା ଅଙ୍କ ଯଥେଷ୍ଟ ଦିଶୁଛି"],
  waterSupply: ["Water supply", "पानी की आपूर्ति", "ପାଣି ଯୋଗାଣ"], foodSupply: ["Food supply", "भोजन की आपूर्ति", "ଖାଦ୍ୟ ଯୋଗାଣ"], peopleBasis: ["People counted", "गिने गए लोग", "ଗଣାଯାଇଥିବା ଲୋକ"], kitsWord: ["kits", "किट", "କିଟ୍"], checkedOn: ["checked", "जाँचा गया", "ଯାଞ୍ଚ ହେଲା"],
  firstAidStale: ["Last check is more than 30 days old.", "अंतिम जाँच 30 दिन से पुरानी है।", "ଶେଷ ଯାଞ୍ଚ 30 ଦିନରୁ ପୁରୁଣା।"], powerLow: ["Under 12 hours recorded (planning flag).", "12 घंटे से कम दर्ज (योजना संकेत)।", "12 ଘଣ୍ଟାରୁ କମ୍ ଲେଖା (ଯୋଜନା ସଂକେତ)।"],
  perToilet: ["people per working toilet", "प्रति चालू शौचालय लोग", "ପ୍ରତି ଚାଲୁ ଶୌଚାଳୟ ଲୋକ"], toiletGuide: ["A common humanitarian guideline (Sphere) is about 20 people per toilet.", "एक सामान्य मानवीय दिशानिर्देश (स्फीयर) लगभग 20 लोग प्रति शौचालय है।", "ଏକ ସାଧାରଣ ମାନବିକ ନିର୍ଦ୍ଦେଶିକା (ସ୍ଫିୟର୍) ପ୍ରାୟ 20 ଲୋକ ପ୍ରତି ଶୌଚାଳୟ।"], noWorkingToilet: ["No working toilet recorded.", "कोई चालू शौचालय दर्ज नहीं।", "କୌଣସି ଚାଲୁ ଶୌଚାଳୟ ଲେଖା ନାହିଁ।"],
  maintAdd: ["Log maintenance issue", "रखरखाव समस्या दर्ज करें", "ରକ୍ଷଣାବେକ୍ଷଣ ସମସ୍ୟା ଲେଖନ୍ତୁ"], maintEmpty: ["No maintenance issues logged.", "कोई रखरखाव समस्या दर्ज नहीं।", "କୌଣସି ରକ୍ଷଣାବେକ୍ଷଣ ସମସ୍ୟା ଲେଖା ନାହିଁ।"], fIssue: ["Issue", "समस्या", "ସମସ୍ୟା"], fSeverity: ["Severity", "गंभीरता", "ଗୁରୁତ୍ବ"], sevLow: ["Low", "कम", "କମ୍"], sevMedium: ["Medium", "मध्यम", "ମଧ୍ୟମ"], sevHigh: ["High", "उच्च", "ଉଚ୍ଚ"],
  stOpen: ["Open", "खुला", "ଖୋଲା"], stProgress: ["In progress", "प्रगति में", "ଚାଲିଛି"], stFixed: ["Fixed", "ठीक हुआ", "ସଂଶୋଧିତ"],
  distAdd: ["Log distribution", "वितरण दर्ज करें", "ବିତରଣ ଲେଖନ୍ତୁ"], distEmpty: ["No distribution logged.", "कोई वितरण दर्ज नहीं।", "କୌଣସି ବିତରଣ ଲେଖା ନାହିଁ।"], fItem: ["Item", "वस्तु", "ଜିନିଷ"], fQty: ["Quantity", "मात्रा", "ପରିମାଣ"], diWater: ["Water (litres)", "पानी (लीटर)", "ପାଣି (ଲିଟର)"], diFood: ["Meals / food packets", "भोजन / पैकेट", "ଭୋଜନ / ପ୍ୟାକେଟ୍"], diBlanket: ["Blankets", "कंबल", "କମ୍ବଳ"], diMedicine: ["Medicines", "दवाइयाँ", "ଔଷଧ"], diHygiene: ["Hygiene kits", "स्वच्छता किट", "ସ୍ବଚ୍ଛତା କିଟ୍"], diOther: ["Other", "अन्य", "ଅନ୍ୟ"], distTotals: ["Totals logged", "कुल दर्ज", "ମୋଟ ଲେଖା"],
  cmpResTitle: ["Resource comparison", "संसाधन तुलना", "ସମ୍ବଳ ତୁଳନା"], colShelter: ["Shelter", "आश्रय", "ଆଶ୍ରୟସ୍ଥଳ"], colPeople: ["People", "लोग", "ଲୋକ"], colWater: ["Water days", "पानी के दिन", "ପାଣି ଦିନ"], colFood: ["Food days", "भोजन के दिन", "ଖାଦ୍ୟ ଦିନ"], colKits: ["Kits", "किट", "କିଟ୍"], colPower: ["Power h", "बिजली घं.", "ବିଦ୍ୟୁତ୍ ଘଂ"], colToilets: ["Working toilets", "चालू शौचालय", "ଚାଲୁ ଶୌଚାଳୟ"], colScore: ["Score", "स्कोर", "ସ୍କୋର"]
});

function resourceFilled(res) { if (!res) return 0; return [...RES_NUM, "powerStatus", "firstAidChecked", "lastCleaned"].filter((key) => res[key] !== undefined && res[key] !== "").length / (RES_NUM.length + 3); }
P3ACT["res-edit"] = (el) => {
  const record = getShelters().find((item) => item.id === el.dataset.id);
  if (!record) return;
  const res = getResources()[record.id] || {};
  const num = (key, label) => `<label class="field-group"><span>${esc(t(label))}</span><input class="form-control" type="number" min="0" step="1" name="${key}" inputmode="numeric" value="${esc(res[key] ?? "")}"></label>`;
  openModal(t("resUpdate"), `<form data-p3form="resform"><input type="hidden" name="id" value="${esc(record.id)}"><p class="page-subtitle"><strong>${esc(record.name)}</strong></p>
    <div class="form-grid">${num("water", "rWater")}${num("meals", "rMeals")}${num("firstAidKits", "rKits")}
    <label class="field-group"><span>${esc(t("rKitsChecked"))}</span><input class="form-control" type="date" name="firstAidChecked" value="${esc(res.firstAidChecked || "")}"></label>
    <label class="field-group"><span>${esc(t("rPowerStatus"))}</span><select class="form-control" name="powerStatus">${POWER_STATUS.map(([id, key]) => `<option value="${id}" ${res.powerStatus === id ? "selected" : ""}>${esc(t(key))}</option>`).join("")}</select></label>
    ${num("powerHours", "rPowerHours")}${num("toilets", "rToilets")}${num("toiletsWorking", "rToiletsOk")}${num("hygieneKits", "rHygiene")}
    <label class="field-group"><span>${esc(t("rCleaned"))}</span><input class="form-control" type="date" name="lastCleaned" value="${esc(res.lastCleaned || "")}"></label></div>
    <div class="form-error" id="formError" role="alert"></div><div class="modal-actions"><button type="button" class="button" data-action="close-modal">${esc(t("cancel"))}</button><button class="button primary" type="submit">${esc(t("saveRecord"))}</button></div></form>`);
};
P3FORM.resform = (form) => {
  const data = new FormData(form), id = String(data.get("id")), entry = { at: new Date().toISOString() };
  for (const key of RES_NUM) {
    const text = String(data.get(key) || "").trim();
    if (text === "") continue;
    if (!/^\d+$/.test(text) || Number(text) > 10000000) return listError(t("numberInvalid"));
    entry[key] = Number(text);
  }
  if (entry.toilets !== undefined && entry.toiletsWorking !== undefined && entry.toiletsWorking > entry.toilets) return listError(t("numberInvalid"));
  for (const key of ["firstAidChecked", "lastCleaned", "powerStatus"]) entry[key] = String(data.get(key) || "");
  const all = getResources(); all[id] = entry;
  if (writeStorage("resources", all)) { closeModal(); renderPage(); showToast(t("resSaved")); }
};
P3FORM.assume = (form) => {
  const data = new FormData(form), water = Number(data.get("water")), meals = Number(data.get("meals"));
  if (!(water > 0 && water <= 100 && meals > 0 && meals <= 10)) { showToast(t("numberInvalid")); return; }
  if (writeStorage("assume", { water, meals })) renderPage();
};
LISTS.maint = {
  title: "maintAdd", addLabel: "maintAdd", icon: "🔧", empty: "maintEmpty",
  fields: [{ name: "shelterId", label: "fShelter", type: "shelter" }, { name: "issue", label: "fIssue", required: true, max: 160, full: true },
    { name: "severity", label: "fSeverity", type: "select", options: [["low", "sevLow"], ["medium", "sevMedium"], ["high", "sevHigh"]] },
    { name: "status", label: "fStatus", type: "select", options: [["open", "stOpen"], ["progress", "stProgress"], ["fixed", "stFixed"]] }, { name: "date", label: "fDate", type: "date" }],
  card: (i) => `<h3>${esc(i.issue)}</h3><p>${esc(shelterName(i.shelterId))} · ${esc(t(`sev${i.severity[0].toUpperCase()}${i.severity.slice(1)}`))} · ${esc(t({ open: "stOpen", progress: "stProgress", fixed: "stFixed" }[i.status]))}${i.date ? " · " + esc(i.date) : ""}</p>`
};
LISTS.dist = {
  title: "distAdd", addLabel: "distAdd", icon: "⇆", empty: "distEmpty",
  fields: [{ name: "shelterId", label: "fShelter", type: "shelter" }, { name: "item", label: "fItem", type: "select", options: [["water", "diWater"], ["food", "diFood"], ["blanket", "diBlanket"], ["medicine", "diMedicine"], ["hygiene", "diHygiene"], ["other", "diOther"]] },
    { name: "qty", label: "fQty", type: "number", required: true, max: 10000000 }, { name: "date", label: "fDate", type: "date" }, { name: "note", label: "fNote", max: 160, full: true }],
  card: (i) => `<h3>${esc(i.qty)} · ${esc(t({ water: "diWater", food: "diFood", blanket: "diBlanket", medicine: "diMedicine", hygiene: "diHygiene", other: "diOther" }[i.item]))}</h3><p>${esc(shelterName(i.shelterId))}${i.date ? " · " + esc(i.date) : ""}${i.note ? " · " + esc(i.note) : ""}</p>`
};
function resShelterCard(record, tab) {
  const res = getResources()[record.id], { n, basis } = peopleBasis(record), a = getAssume();
  const head = `<div class="alert-top"><h3>${esc(record.name)}</h3><button class="button small" data-p3="res-edit" data-id="${esc(record.id)}">${esc(t("resUpdate"))}</button></div><p>${esc(record.district)}</p>`;
  if (!res) return `<article class="card page-card">${head}<p class="page-subtitle">${esc(t("resNone"))}</p></article>`;
  let body = "";
  if (tab === "stock") {
    const w = daysOf(res.water, n, a.water), m = daysOf(res.meals, n, a.meals);
    const lv = (v) => ({ "level-low": t("lowSupply"), "level-watch": t("watchSupply"), "level-ok": t("okSupply"), "": "" }[level(v, 1, 3)]);
    body = `<div class="result-box"><div class="result-row"><span>${esc(t("waterSupply"))}</span><strong class="${level(w, 1, 3)}">${res.water !== undefined ? `${formatCapacity(res.water)} L · ${esc(fmtDays(w))}` : "—"}</strong></div>
      <div class="result-row"><span>${esc(t("foodSupply"))}</span><strong class="${level(m, 1, 3)}">${res.meals !== undefined ? `${formatCapacity(res.meals)} · ${esc(fmtDays(m))}` : "—"}</strong></div></div>
      <small>${esc(t("peopleBasis"))}: ${formatCapacity(n)} (${esc(t(basis))})${lv(w) || lv(m) ? ` · ${esc([lv(w), lv(m)].filter((x) => x).join(" / "))}` : ""}</small>`;
  } else if (tab === "firstaid") {
    const stale = res.firstAidChecked && ageDays(res.firstAidChecked) > 30;
    body = `<div class="result-row"><span>${esc(t("rKits"))}</span><strong>${res.firstAidKits !== undefined ? formatCapacity(res.firstAidKits) : "—"}</strong></div>${res.firstAidChecked ? `<small>${esc(t("checkedOn"))}: ${esc(res.firstAidChecked)}</small>` : ""}${stale ? `<p class="form-error">${esc(t("firstAidStale"))}</p>` : ""}`;
  } else if (tab === "power") {
    const low = res.powerHours !== undefined && res.powerHours < 12;
    body = `<div class="result-row"><span>${esc(t("rPowerStatus"))}</span><strong>${esc(t(POWER_STATUS.find(([id]) => id === (res.powerStatus || ""))[1]))}</strong></div><div class="result-row"><span>${esc(t("rPowerHours"))}</span><strong class="${low ? "level-low" : ""}">${res.powerHours !== undefined ? res.powerHours : "—"}</strong></div>${low ? `<p class="form-error">${esc(t("powerLow"))}</p>` : ""}`;
  } else if (tab === "sanitation") {
    const ratio = res.toiletsWorking > 0 ? n / res.toiletsWorking : null;
    body = `<div class="result-row"><span>${esc(t("rToilets"))} / ${esc(t("rToiletsOk"))}</span><strong>${res.toilets ?? "—"} / ${res.toiletsWorking ?? "—"}</strong></div><div class="result-row"><span>${esc(t("rHygiene"))}</span><strong>${res.hygieneKits ?? "—"}</strong></div>
      ${ratio !== null ? `<small>${Math.round(ratio)} ${esc(t("perToilet"))} (${esc(t(basis))}). ${esc(t("toiletGuide"))}</small>` : res.toiletsWorking === 0 ? `<p class="form-error">${esc(t("noWorkingToilet"))}</p>` : ""}${res.lastCleaned ? `<small> ${esc(t("rCleaned"))}: ${esc(res.lastCleaned)}</small>` : ""}`;
  }
  return `<article class="card page-card">${head}${body}<small class="record-source">${esc(t("updated"))} ${esc(safeDate(res.at))}</small></article>`;
}
const INV_TABS = [["stock", "tabStock"], ["firstaid", "tabFirstAid"], ["power", "tabPower"], ["sanitation", "tabSanitation"], ["maint", "tabMaint"], ["dist", "tabDist"], ["compare", "tabCompare"]];
PHASE3_PAGES.inventory = () => {
  const tab = currentTab("inventory", INV_TABS), records = getShelters(), a = getAssume();
  let body;
  if (tab === "maint" || tab === "dist") {
    let totals = "";
    if (tab === "dist") {
      const sums = {};
      for (const item of getList("dist")) sums[item.item] = (sums[item.item] || 0) + Number(item.qty);
      const keys = { water: "diWater", food: "diFood", blanket: "diBlanket", medicine: "diMedicine", hygiene: "diHygiene", other: "diOther" };
      totals = Object.keys(sums).length ? `<div class="facility-pills"><strong>${esc(t("distTotals"))}:</strong> ${Object.entries(sums).map(([k, v]) => `<span>${esc(t(keys[k]))}: ${formatCapacity(v)}</span>`).join("")}</div>` : "";
    }
    body = `<div class="heading-actions" style="margin-bottom:10px">${listAddButton(tab)}</div>${totals}${listCards(tab)}`;
  } else if (!records.length) body = emptyState("noRecords", "noRecordsHelp", `<button class="button primary" data-action="add-shelter">＋ ${esc(t("addShelter"))}</button>`);
  else if (tab === "compare") {
    const rows = records.map((record) => {
      const res = getResources()[record.id] || {}, { n } = peopleBasis(record);
      return `<tr><th>${esc(record.name)}</th><td>${formatCapacity(n)}</td><td>${esc(fmtDays(daysOf(res.water, n, a.water)))}</td><td>${esc(fmtDays(daysOf(res.meals, n, a.meals)))}</td><td>${res.firstAidKits ?? "—"}</td><td>${res.powerHours ?? "—"}</td><td>${res.toiletsWorking ?? "—"}</td><td>${readinessScore(record)}%</td></tr>`;
    }).join("");
    body = `<section class="card page-card"><h2>${esc(t("cmpResTitle"))}</h2><div class="table-scroll"><table class="cmp-table"><thead><tr><th>${esc(t("colShelter"))}</th><th>${esc(t("colPeople"))}</th><th>${esc(t("colWater"))}</th><th>${esc(t("colFood"))}</th><th>${esc(t("colKits"))}</th><th>${esc(t("colPower"))}</th><th>${esc(t("colToilets"))}</th><th>${esc(t("colScore"))}</th></tr></thead><tbody>${rows}</tbody></table></div></section>`;
  } else body = `<div class="list-grid">${records.map((record) => resShelterCard(record, tab)).join("")}</div>`;
  const assume = tab === "stock" ? `<section class="card page-card" style="margin-bottom:14px"><h2>${esc(t("assumeTitle"))}</h2><form data-p3form="assume" class="inline-form"><label>${esc(t("assumeWater"))} <input class="form-control" type="number" name="water" min="1" max="100" step="any" value="${a.water}"></label><label>${esc(t("assumeMeals"))} <input class="form-control" type="number" name="meals" min="1" max="10" step="any" value="${a.meals}"></label><button class="button" type="submit">${esc(t("saveRecord"))}</button></form><small>${esc(t("assumeHint"))}</small></section>` : "";
  return `${heading("invTitle", "invSubtitle")}${notice("invNote")}${tabsHtml("inventory", INV_TABS)}${assume}${body}`;
};
addNav("manage", "inventory", "▥", "navInventory");

/* ---------- 24 / 61 Data quality checks (rule-based) ---------- */
const ODISHA_BOX = { latMin: 17.8, latMax: 22.6, lonMin: 81.3, lonMax: 87.5 };
function shelterIssues(record, all) {
  const issues = [];
  const add = (key, severity) => issues.push({ key, severity });
  if (!hasCoordinates(record)) add("qNoCoords", "medium");
  else {
    const lat = Number(record.latitude), lon = Number(record.longitude);
    if (lat < ODISHA_BOX.latMin || lat > ODISHA_BOX.latMax || lon < ODISHA_BOX.lonMin || lon > ODISHA_BOX.lonMax) add("qOutside", "high");
    if (all.some((other) => other.id !== record.id && hasCoordinates(other) && Number(other.latitude) === lat && Number(other.longitude) === lon)) add("qDupCoords", "medium");
  }
  const capacity = Number(record.capacity);
  if (!(capacity > 0)) add("qCapZero", "high");
  else if (capacity > 20000) add("qCapHuge", "medium");
  if (hasOccupancy(record) && record.occupancy > capacity) add("qOverCap", "high");
  if (!record.facilities?.length) add("qNoFacilities", "low");
  if (!String(record.source || "").trim()) add("qNoSource", "medium");
  if (!String(record.contact || "").trim()) add("qNoContact", "low");
  const age = ageDays(record.updatedAt);
  if (age !== null && age > 90) add("qStale", "medium");
  if (hasOccupancy(record) && record.occupancyUpdatedAt && ageDays(record.occupancyUpdatedAt) > 3) add("qOccStale", "low");
  const name = record.name.trim().toLocaleLowerCase();
  if (all.some((other) => other.id !== record.id && other.name.trim().toLocaleLowerCase() === name && other.district.trim().toLocaleLowerCase() === record.district.trim().toLocaleLowerCase())) add("qDupName", "medium");
  return issues;
}
function staleShelters() { return getShelters().filter((record) => { const age = ageDays(record.updatedAt); return age !== null && age > 90; }); }
addMsgs({
  qualityTitle: ["Data quality checks", "डेटा गुणवत्ता जाँच", "ତଥ୍ୟ ଗୁଣବତ୍ତା ଯାଞ୍ଚ"], qualitySubtitle: ["Automatic rule checks on your saved shelter records, including stale data.", "आपके सहेजे आश्रय रिकॉर्ड पर स्वचालित नियम-जाँच, पुराने डेटा सहित।", "ଆପଣଙ୍କ ସେଭ୍ ଆଶ୍ରୟସ୍ଥଳ ରେକର୍ଡରେ ସ୍ବୟଂଚାଳିତ ନିୟମ ଯାଞ୍ଚ, ପୁରୁଣା ତଥ୍ୟ ସହ।"],
  qualityNote: ["These are simple rule checks, not AI and not verification. Fix records from their original source.", "ये सरल नियम-जाँच हैं, AI या सत्यापन नहीं। रिकॉर्ड मूल स्रोत से सुधारें।", "ଏଗୁଡ଼ିକ ସରଳ ନିୟମ ଯାଞ୍ଚ, AI ବା ଯାଞ୍ଚ ନୁହେଁ। ମୂଳ ଉତ୍ସରୁ ରେକର୍ଡ ସଂଶୋଧନ କରନ୍ତୁ।"],
  qualityAllGood: ["No problems found by these checks.", "इन जाँचों में कोई समस्या नहीं मिली।", "ଏହି ଯାଞ୍ଚରେ କୌଣସି ସମସ୍ୟା ମିଳିଲା ନାହିଁ।"], qualityCount: ["issues found", "समस्याएँ मिलीं", "ସମସ୍ୟା ମିଳିଲା"], staleBanner: ["shelter record(s) not updated for over 90 days.", "आश्रय रिकॉर्ड 90 दिनों से अधिक समय से अपडेट नहीं हुए।", "ଆଶ୍ରୟସ୍ଥଳ ରେକର୍ଡ 90 ଦିନରୁ ଅଧିକ ଅପଡେଟ୍ ହୋଇନାହିଁ।"],
  qNoCoords: ["Coordinates missing", "निर्देशांक नहीं हैं", "ସ୍ଥାନାଙ୍କ ନାହିଁ"], qOutside: ["Coordinates are outside Odisha", "निर्देशांक ओडिशा के बाहर हैं", "ସ୍ଥାନାଙ୍କ ଓଡ଼ିଶା ବାହାରେ"], qDupCoords: ["Same coordinates as another shelter", "दूसरे आश्रय के समान निर्देशांक", "ଅନ୍ୟ ଆଶ୍ରୟସ୍ଥଳ ସହ ସମାନ ସ୍ଥାନାଙ୍କ"],
  qCapZero: ["Capacity is zero", "क्षमता शून्य है", "କ୍ଷମତା ଶୂନ୍ୟ"], qCapHuge: ["Capacity is unusually large (over 20,000)", "क्षमता असामान्य रूप से अधिक (20,000 से अधिक)", "କ୍ଷମତା ଅସାଧାରଣ ଭାବେ ବେଶି (20,000 ରୁ ଅଧିକ)"], qOverCap: ["Occupancy is above capacity", "अधिभोग क्षमता से अधिक है", "ଅଧିଭୋଗ କ୍ଷମତାଠାରୁ ଅଧିକ"],
  qNoFacilities: ["No facilities recorded", "कोई सुविधा दर्ज नहीं", "କୌଣସି ସୁବିଧା ଲେଖା ନାହିଁ"], qNoSource: ["Source missing", "स्रोत नहीं है", "ଉତ୍ସ ନାହିଁ"], qNoContact: ["No public contact", "कोई सार्वजनिक संपर्क नहीं", "କୌଣସି ସାର୍ବଜନୀନ ଯୋଗାଯୋଗ ନାହିଁ"], qStale: ["Record not updated for over 90 days", "रिकॉर्ड 90 दिनों से अपडेट नहीं हुआ", "ରେକର୍ଡ 90 ଦିନରୁ ଅଧିକ ଅପଡେଟ୍ ହୋଇନାହିଁ"],
  qOccStale: ["Occupancy figure older than 3 days", "अधिभोग आँकड़ा 3 दिन से पुराना", "ଅଧିଭୋଗ ଅଙ୍କ 3 ଦିନରୁ ପୁରୁଣା"], qDupName: ["Same name and district as another record", "दूसरे रिकॉर्ड के समान नाम और जिला", "ଅନ୍ୟ ରେକର୍ଡ ସହ ସମାନ ନାମ ଓ ଜିଲ୍ଲା"]
});
PHASE3_PAGES.quality = () => {
  const records = getShelters();
  const rows = records.map((record) => ({ record, issues: shelterIssues(record, records) })).filter((item) => item.issues.length);
  const total = rows.reduce((sum, item) => sum + item.issues.length, 0);
  const body = !records.length ? emptyState("noRecords", "noRecordsHelp", `<button class="button primary" data-action="add-shelter">＋ ${esc(t("addShelter"))}</button>`)
    : rows.length ? rows.map(({ record, issues }) => `<article class="card page-card"><div class="alert-top"><h3>${esc(record.name)}</h3><button class="button small" data-edit="${esc(record.id)}">${esc(t("edit"))}</button></div><p class="page-subtitle">${esc(record.district)}</p>
      <ul class="facility-status">${issues.map((issue) => `<li class="missing"><span aria-hidden="true">${issue.severity === "high" ? "‼" : "!"}</span> ${esc(t(issue.key))} <small>(${esc(t(`sev${issue.severity[0].toUpperCase()}${issue.severity.slice(1)}`))})</small></li>`).join("")}</ul></article>`).join("")
    : `<div class="notice-banner"><span aria-hidden="true">✓</span><span>${esc(t("qualityAllGood"))}</span></div>`;
  return `${heading("qualityTitle", "qualitySubtitle")}${notice("qualityNote")}${records.length ? `<p class="page-subtitle"><strong>${total}</strong> ${esc(t("qualityCount"))} · ${records.length} ${esc(t("sheltersWord"))}</p>` : ""}<div class="list-grid">${body}</div>`;
};
addNav("manage", "quality", "✔", "navQuality");

/* ---------- Readiness score (80) ---------- */
function readinessScore(record) {
  const facilities = recordedFacilityPercent(record);
  const age = ageDays(record.updatedAt);
  const fresh = age === null ? 0 : age <= 30 ? 100 : age <= 90 ? 50 : 0;
  const occ = hasOccupancy(record) ? 100 : 0;
  const res = Math.round(resourceFilled(getResources()[record.id]) * 100);
  return Math.round(facilities * 0.5 + fresh * 0.2 + occ * 0.1 + res * 0.2);
}

/* ---------- 22 / 23 / 82 / 110 Planner: household plan + capacity scenario ---------- */
const PLAN_TABS = [["plan", "tabHouse"], ["scenario", "tabScenario"]];
p3.plan = { adults: 2, children: 0, elderly: 0, pets: false, medical: false, disability: false, hazard: "cyclone", district: "", ai: { status: "idle", text: "" } };
p3.scn = { demand: "", closed: [], ran: false, ai: { status: "idle", text: "" } };
addMsgs({
  aiplanTitle: ["Preparedness and scenario planner", "तैयारी और परिदृश्य योजनाकार", "ପ୍ରସ୍ତୁତି ଓ ପରିସ୍ଥିତି ଯୋଜନାକାର"], aiplanSubtitle: ["Build a household plan, and test how shelter capacity copes with extra people.", "घर की योजना बनाएँ और परखें कि अतिरिक्त लोगों पर आश्रय क्षमता कैसे चलेगी।", "ଘର ଯୋଜନା ତିଆରି କରନ୍ତୁ ଏବଂ ଅତିରିକ୍ତ ଲୋକଙ୍କ ପାଇଁ ଆଶ୍ରୟସ୍ଥଳ କ୍ଷମତା ପରୀକ୍ଷା କରନ୍ତୁ।"],
  aiplanNote: ["The checklist and the numbers are calculated on this device. The optional AI note only rewords them and is not official advice.", "सूची और संख्याएँ इसी डिवाइस पर गणना होती हैं। वैकल्पिक AI नोट केवल इन्हें दोहराता है और आधिकारिक सलाह नहीं है।", "ତାଲିକା ଓ ସଂଖ୍ୟା ଏହି ଡିଭାଇସ୍‌ରେ ଗଣନା ହୁଏ। ବୈକଳ୍ପିକ AI ନୋଟ୍ କେବଳ ଏହାକୁ ପୁନଃଲେଖେ ଏବଂ ସରକାରୀ ପରାମର୍ଶ ନୁହେଁ।"],
  tabHouse: ["Household plan", "घर की योजना", "ଘର ଯୋଜନା"], tabScenario: ["Capacity scenario", "क्षमता परिदृश्य", "କ୍ଷମତା ପରିସ୍ଥିତି"],
  hhAdults: ["Adults", "वयस्क", "ବୟସ୍କ"], hhChildren: ["Children", "बच्चे", "ପିଲା"], hhElderly: ["Older people", "बुजुर्ग", "ବୟସ୍କ ବ୍ୟକ୍ତି"], hhPets: ["Pets / animals", "पालतू जानवर", "ପୋଷା ପ୍ରାଣୀ"], hhMedical: ["Ongoing medical need", "निरंतर चिकित्सा आवश्यकता", "ନିରନ୍ତର ଚିକିତ୍ସା ଆବଶ୍ୟକତା"], hhDisability: ["Person with disability", "दिव्यांग सदस्य", "ଦିବ୍ୟାଙ୍ଗ ସଦସ୍ୟ"], hhHazard: ["Hazard", "आपदा", "ବିପର୍ଯ୍ୟୟ"], buildPlan: ["Build my plan", "मेरी योजना बनाएँ", "ମୋ ଯୋଜନା ତିଆରି କରନ୍ତୁ"],
  planSupplies: ["Supplies for 3 days (planning figure: about 3 litres of water per person per day)", "3 दिन की सामग्री (योजना आँकड़ा: प्रति व्यक्ति प्रति दिन लगभग 3 लीटर पानी)", "3 ଦିନର ସାମଗ୍ରୀ (ଯୋଜନା ଅଙ୍କ: ପ୍ରତି ବ୍ୟକ୍ତି ପ୍ରତିଦିନ ପ୍ରାୟ 3 ଲିଟର ପାଣି)"], planWater: ["Drinking water", "पीने का पानी", "ପିଇବା ପାଣି"], planFood: ["Dry food meals", "सूखे भोजन", "ଶୁଖିଲା ଖାଦ୍ୟ ଭୋଜନ"], planPlusChild: ["Children: snacks, spare clothes, school documents and a familiar toy.", "बच्चे: नाश्ता, अतिरिक्त कपड़े, स्कूल के दस्तावेज़ और परिचित खिलौना।", "ପିଲା: ଜଳଖିଆ, ଅତିରିକ୍ତ ପୋଷାକ, ବିଦ୍ୟାଳୟ କାଗଜ ଓ ପରିଚିତ ଖେଳନା।"],
  planPlusElder: ["Older people: medicines for several days, glasses, walking aids and an early start.", "बुजुर्ग: कई दिनों की दवाइयाँ, चश्मा, चलने के सहारे और जल्दी निकलना।", "ବୟସ୍କ: ଅନେକ ଦିନର ଔଷଧ, ଚଷମା, ଚଳିବା ସହାୟକ ଓ ଶୀଘ୍ର ବାହାରିବା।"], planPlusPets: ["Pets: food, water, a leash or carrier, and a plan since many shelters may not admit animals.", "पालतू: भोजन, पानी, पट्टा या पिंजरा, और योजना क्योंकि कई आश्रय जानवर नहीं लेते।", "ପୋଷା ପ୍ରାଣୀ: ଖାଦ୍ୟ, ପାଣି, ଦଉଡ଼ି ବା ପିଞ୍ଜରା ଓ ଯୋଜନା, କାରଣ ଅନେକ ଆଶ୍ରୟସ୍ଥଳ ପଶୁ ନେଇ ନଥାଏ।"],
  planPlusMedical: ["Medical need: prescriptions, cold-pack or power needs, and tell shelter staff on arrival.", "चिकित्सा आवश्यकता: पर्चे, ठंडा रखने या बिजली की ज़रूरत, और पहुँचते ही आश्रय कर्मियों को बताएँ।", "ଚିକିତ୍ସା ଆବଶ୍ୟକତା: ପ୍ରେସ୍କ୍ରିପସନ୍, ଥଣ୍ଡା ବା ବିଦ୍ୟୁତ୍ ଆବଶ୍ୟକତା ଓ ପହଞ୍ଚିଲେ ଆଶ୍ରୟସ୍ଥଳ କର୍ମୀଙ୍କୁ କୁହନ୍ତୁ।"], planPlusDisability: ["Disability: agree a helper and route early; see the Accessibility page.", "दिव्यांगता: पहले से सहायक और मार्ग तय करें; सुगम्यता पेज देखें।", "ଦିବ୍ୟାଙ୍ଗ: ଆଗରୁ ସହାୟକ ଓ ରାସ୍ତା ଠିକ୍ କରନ୍ତୁ; ସୁଗମ୍ୟତା ପୃଷ୍ଠା ଦେଖନ୍ତୁ।"],
  planAiBtn: ["Reword with AI", "AI से दोहराएँ", "AI ଦ୍ବାରା ପୁନଃଲେଖନ୍ତୁ"], scnDemand: ["Extra people needing shelter", "आश्रय चाहने वाले अतिरिक्त लोग", "ଆଶ୍ରୟ ଚାହୁଁଥିବା ଅତିରିକ୍ତ ଲୋକ"], scnClosed: ["Treat these shelters as closed", "इन आश्रयों को बंद मानें", "ଏହି ଆଶ୍ରୟସ୍ଥଳକୁ ବନ୍ଦ ଧରନ୍ତୁ"], scnRun: ["Run scenario", "परिदृश्य चलाएँ", "ପରିସ୍ଥିତି ଚଲାନ୍ତୁ"],
  scnNote: ["A what-if exercise using your own numbers. It does not predict how many people will actually need shelter.", "आपके अपने आँकड़ों से 'क्या होगा' अभ्यास। यह अनुमान नहीं लगाता कि वास्तव में कितने लोगों को आश्रय चाहिए होगा।", "ଆପଣଙ୍କ ନିଜ ଅଙ୍କରେ 'କଣ ହେବ' ଅଭ୍ୟାସ। ବାସ୍ତବରେ କେତେ ଲୋକ ଆଶ୍ରୟ ଚାହିଁବେ ତାହା ଏହା ଅନୁମାନ କରେ ନାହିଁ।"],
  scnFree: ["Free space (open shelters)", "खाली जगह (खुले आश्रय)", "ଖାଲି ସ୍ଥାନ (ଖୋଲା ଆଶ୍ରୟସ୍ଥଳ)"], scnShort: ["Shortfall", "कमी", "ଅଭାବ"], scnSurplus: ["Spare space", "अतिरिक्त जगह", "ଅତିରିକ୍ତ ସ୍ଥାନ"], scnAlloc: ["Suggested split (planning aid)", "सुझाया वितरण (योजना सहायक)", "ପରାମର୍ଶିତ ବଣ୍ଟନ (ଯୋଜନା ସହାୟକ)"], scnAllocBasis: ["Order: nearest first if your location is known, otherwise most free space first.", "क्रम: स्थान ज्ञात हो तो निकटतम पहले, अन्यथा सबसे अधिक खाली जगह पहले।", "କ୍ରମ: ସ୍ଥାନ ଜଣା ଥିଲେ ନିକଟତମ ପ୍ରଥମେ, ନଚେତ୍ ସର୍ବାଧିକ ଖାଲି ସ୍ଥାନ ପ୍ରଥମେ।"],
  scnUnplaced: ["Not placed", "स्थान नहीं मिला", "ସ୍ଥାନ ମିଳିଲା ନାହିଁ"], scnSave: ["Save this scenario", "यह परिदृश्य सहेजें", "ଏହି ପରିସ୍ଥିତି ସେଭ୍ କରନ୍ତୁ"], scnSaved: ["Saved scenarios (compare)", "सहेजे परिदृश्य (तुलना)", "ସେଭ୍ ପରିସ୍ଥିତି (ତୁଳନା)"], scnClosedCount: ["Closed", "बंद", "ବନ୍ଦ"], scnNone: ["Enter shelters first.", "पहले आश्रय जोड़ें।", "ପ୍ରଥମେ ଆଶ୍ରୟସ୍ଥଳ ଯୋଗ କରନ୍ତୁ।"], scnAssumedCap: ["Where occupancy is not entered, full recorded capacity is counted as free.", "जहाँ अधिभोग दर्ज नहीं, पूरी दर्ज क्षमता को खाली गिना गया है।", "ଯେଉଁଠି ଅଧିଭୋଗ ଲେଖା ନାହିଁ, ସମ୍ପୂର୍ଣ୍ଣ ଲେଖା କ୍ଷମତାକୁ ଖାଲି ଗଣାଯାଇଛି।"], scnDelete: ["Clear saved scenarios", "सहेजे परिदृश्य हटाएँ", "ସେଭ୍ ପରିସ୍ଥିତି ହଟାନ୍ତୁ"]
});
function shelterFree(record) { return Math.max(0, hasOccupancy(record) ? Number(record.capacity) - record.occupancy : Number(record.capacity || 0)); }
function runScenario() {
  const demand = Number(p3.scn.demand) || 0, pos = currentPos();
  const open = getShelters().filter((record) => !p3.scn.closed.includes(record.id));
  const free = open.reduce((sum, record) => sum + shelterFree(record), 0);
  const ordered = [...open].sort((a, b) => pos && hasCoordinates(a) && hasCoordinates(b) ? distanceKm(pos.lat, pos.lon, a.latitude, a.longitude) - distanceKm(pos.lat, pos.lon, b.latitude, b.longitude) : shelterFree(b) - shelterFree(a));
  let left = demand;
  const alloc = ordered.map((record) => { const take = Math.min(left, shelterFree(record)); left -= take; return { record, take }; }).filter((row) => row.take > 0);
  return { demand, free, alloc, unplaced: left, closed: p3.scn.closed.length };
}
P3FORM.household = (form) => {
  const data = new FormData(form), n = (k) => Math.max(0, Math.min(50, Math.floor(Number(data.get(k)) || 0)));
  p3.plan = { adults: n("adults"), children: n("children"), elderly: n("elderly"), pets: data.has("pets"), medical: data.has("medical"), disability: data.has("disability"), hazard: HAZARDS.includes(data.get("hazard")) ? data.get("hazard") : "cyclone", ai: { status: "idle", text: "" } };
  renderPage();
};
P3FORM.scenario = (form) => {
  const data = new FormData(form), demand = String(data.get("demand") || "").trim();
  if (!/^\d+$/.test(demand) || Number(demand) > 10000000) { showToast(t("numberInvalid")); return; }
  p3.scn = { demand, closed: data.getAll("closed").map(String), ran: true, ai: { status: "idle", text: "" } };
  renderPage();
};
P3ACT["scn-save"] = () => {
  const r = runScenario(), list = getList("scenarios");
  list.push({ id: uid(), at: new Date().toISOString(), demand: r.demand, closed: r.closed, free: r.free, gap: r.demand - r.free });
  if (writeStorage("scenarios", list.slice(-20))) { renderPage(); showToast(t("recordSaved")); }
};
P3ACT["scn-clear"] = () => { if (window.confirm(t("confirmDelete")) && writeStorage("scenarios", [])) renderPage(); };
async function planAiRun(kind) {
  const target = kind === "plan" ? p3.plan.ai : p3.scn.ai;
  target.status = "loading"; renderPage();
  const payload = kind === "plan" ? { household: { ...p3.plan, ai: undefined }, steps: [1, 2, 3, 4, 5].map((n) => t(`${p3.plan.hazard}${n}`)) } : { ...runScenario(), alloc: runScenario().alloc.map((row) => ({ shelter: row.record.name, people: row.take })) };
  try { target.text = (await aiRequest({ task: kind === "plan" ? "preplan" : "scenario", text: JSON.stringify(payload), language })).text; target.status = "ready"; }
  catch { target.status = "error"; }
  renderPage();
}
P3ACT["plan-ai"] = () => planAiRun("plan");
P3ACT["scn-ai"] = () => planAiRun("scenario");
function aiNoteHtml(state, action) {
  const box = state.status === "ready" ? `<div class="ai-answer"><span class="review-badge ai-badge on">${esc(t("aiReady"))}</span>${formatAi(state.text)}</div>` : state.status === "error" ? `<p class="form-error">${esc(t("aiError"))}</p>` : "";
  return `<div style="margin-top:12px"><button class="button" data-p3="${action}" ${aiDisabled()}>${state.status === "loading" ? esc(t("thinking")) : `✦ ${esc(t("planAiBtn"))}`}</button> ${aiBadge()}</div>${aiOffCard()}${box}`;
}
PHASE3_PAGES.aiplan = () => {
  const tab = currentTab("aiplan", PLAN_TABS);
  let body;
  if (tab === "plan") {
    const h = p3.plan, people = h.adults + h.children + h.elderly;
    const num = (k, label) => `<label class="field-group"><span>${esc(t(label))}</span><input class="form-control" type="number" name="${k}" min="0" max="50" value="${h[k]}"></label>`;
    const chk = (k, label) => `<label class="check-row"><input type="checkbox" name="${k}" ${h[k] ? "checked" : ""}><span>${esc(t(label))}</span></label>`;
    const steps = [1, 2, 3, 4, 5].map((n) => t(`${h.hazard}${n}`));
    const extras = [h.children ? "planPlusChild" : "", h.elderly ? "planPlusElder" : "", h.pets ? "planPlusPets" : "", h.medical ? "planPlusMedical" : "", h.disability ? "planPlusDisability" : ""].filter(Boolean);
    body = `<section class="card page-card"><form data-p3form="household"><div class="form-grid">${num("adults", "hhAdults")}${num("children", "hhChildren")}${num("elderly", "hhElderly")}
      <label class="field-group"><span>${esc(t("hhHazard"))}</span><select class="form-control" name="hazard">${HAZARDS.map((id) => `<option value="${id}" ${h.hazard === id ? "selected" : ""}>${esc(t(id))}</option>`).join("")}</select></label></div>
      <div class="checklist">${chk("pets", "hhPets")}${chk("medical", "hhMedical")}${chk("disability", "hhDisability")}</div><button class="button primary" type="submit">${esc(t("buildPlan"))}</button></form></section>
      <section class="card page-card" style="margin-top:14px"><h2>${esc(t(h.hazard))}</h2><ul class="plan-list">${steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      <h3>${esc(t("planSupplies"))}</h3><div class="result-box"><div class="result-row"><span>${esc(t("planWater"))}</span><strong>${people * 9} L</strong></div><div class="result-row"><span>${esc(t("planFood"))}</span><strong>${people * 9}</strong></div></div>
      ${extras.length ? `<ul class="plan-list">${extras.map((key) => `<li>${esc(t(key))}</li>`).join("")}</ul>` : ""}${aiNoteHtml(h.ai, "plan-ai")}</section>`;
  } else {
    const records = getShelters();
    if (!records.length) body = emptyState("noRecords", "scnNone");
    else {
      const r = p3.scn.ran ? runScenario() : null;
      const saved = getList("scenarios");
      const result = r ? `<section class="card page-card" style="margin-top:14px"><div class="result-box"><div class="result-row"><span>${esc(t("scnFree"))}</span><strong>${formatCapacity(r.free)}</strong></div><div class="result-row"><span>${esc(t("projectedDemand"))}</span><strong>${formatCapacity(r.demand)}</strong></div>
        <div class="result-row"><span>${esc(r.demand > r.free ? t("scnShort") : t("scnSurplus"))}</span><strong class="${r.demand > r.free ? "level-low" : "level-ok"}">${formatCapacity(Math.abs(r.free - r.demand))}</strong></div></div><small>${esc(t("scnAssumedCap"))}</small>
        <h3>${esc(t("scnAlloc"))}</h3><small>${esc(t("scnAllocBasis"))}</small>${r.alloc.map((row) => `<div class="district-row"><strong>${esc(row.record.name)}</strong><span>${formatCapacity(row.take)}</span></div>`).join("")}${r.unplaced ? `<p class="form-error">${esc(t("scnUnplaced"))}: ${formatCapacity(r.unplaced)}</p>` : ""}
        <div style="margin-top:10px"><button class="button" data-p3="scn-save">${esc(t("scnSave"))}</button></div>${aiNoteHtml(p3.scn.ai, "scn-ai")}</section>` : "";
      const savedTable = saved.length ? `<section class="card page-card" style="margin-top:14px"><div class="card-heading"><h2>${esc(t("scnSaved"))}</h2><button class="button small danger" data-p3="scn-clear">${esc(t("scnDelete"))}</button></div><div class="table-scroll"><table class="cmp-table"><thead><tr><th>${esc(t("fDate"))}</th><th>${esc(t("projectedDemand"))}</th><th>${esc(t("scnClosedCount"))}</th><th>${esc(t("scnFree"))}</th><th>${esc(t("scnShort"))}</th></tr></thead><tbody>${saved.map((s) => `<tr><td>${esc(formatDateTime(s.at))}</td><td>${formatCapacity(s.demand)}</td><td>${s.closed}</td><td>${formatCapacity(s.free)}</td><td>${s.gap > 0 ? formatCapacity(s.gap) : "—"}</td></tr>`).join("")}</tbody></table></div></section>` : "";
      body = `<section class="card page-card"><form data-p3form="scenario"><label class="field-group"><span>${esc(t("scnDemand"))}</span><input class="form-control" type="number" name="demand" min="0" step="1" required value="${esc(p3.scn.demand)}"></label>
        <fieldset class="field-group"><legend>${esc(t("scnClosed"))}</legend><div class="checklist">${records.map((record) => `<label class="check-row"><input type="checkbox" name="closed" value="${esc(record.id)}" ${p3.scn.closed.includes(record.id) ? "checked" : ""}><span>${esc(record.name)}</span><small>${formatCapacity(shelterFree(record))}</small></label>`).join("")}</div></fieldset>
        <button class="button primary" type="submit">${esc(t("scnRun"))}</button></form></section>${result}${savedTable}`;
    }
  }
  return `${heading("aiplanTitle", "aiplanSubtitle", aiBadge())}${notice(tab === "plan" ? "aiplanNote" : "scnNote")}${tabsHtml("aiplan", PLAN_TABS)}${body}`;
};
addNav("manage", "aiplan", "✦", "navAiPlan");

/* ---------- Analytics (74-81, 85, 120) ---------- */
function snapshotNow() {
  const records = getShelters(), tracked = records.filter(hasOccupancy);
  return { id: uid(), at: new Date().toISOString(), shelters: records.length, capacity: records.reduce((s, r) => s + Number(r.capacity || 0), 0), occupied: tracked.reduce((s, r) => s + r.occupancy, 0), tracked: tracked.length, score: records.length ? Math.round(records.reduce((s, r) => s + readinessScore(r), 0) / records.length) : 0, reports: getList("triage").length };
}
P3ACT["snap-save"] = () => { const list = getList("snapshots"); list.push(snapshotNow()); if (writeStorage("snapshots", list.slice(-30))) { renderPage(); showToast(t("recordSaved")); } };
P3ACT["snap-clear"] = () => { if (window.confirm(t("confirmDelete")) && writeStorage("snapshots", [])) renderPage(); };
addMsgs({
  anTitle: ["Analytics and scorecards", "विश्लेषण और स्कोरकार्ड", "ବିଶ୍ଳେଷଣ ଓ ସ୍କୋରକାର୍ଡ"], anSubtitle: ["District overview, readiness scores, capacity, shortages, incident trends and history, from your local records.", "आपके स्थानीय रिकॉर्ड से जिला अवलोकन, तैयारी स्कोर, क्षमता, कमी, घटना रुझान और इतिहास।", "ଆପଣଙ୍କ ସ୍ଥାନୀୟ ରେକର୍ଡରୁ ଜିଲ୍ଲା ସମୀକ୍ଷା, ପ୍ରସ୍ତୁତି ସ୍କୋର, କ୍ଷମତା, ଅଭାବ, ଘଟଣା ଧାରା ଓ ଇତିହାସ।"],
  anNote: ["Everything here is computed only from records saved on this device. It is not an official statistic.", "यहाँ सब कुछ केवल इस डिवाइस पर सहेजे रिकॉर्ड से गणना होता है। यह आधिकारिक आँकड़ा नहीं है।", "ଏଠାରେ ସବୁକିଛି କେବଳ ଏହି ଡିଭାଇସ୍‌ରେ ସେଭ୍ ରେକର୍ଡରୁ ଗଣନା ହୁଏ। ଏହା ସରକାରୀ ପରିସଂଖ୍ୟାନ ନୁହେଁ।"],
  anScoreHow: ["Readiness score = recorded facilities 50% + data freshness 20% + occupancy entered 10% + resources entered 20%. It measures how complete and fresh the records are, not whether a shelter is safe.", "तैयारी स्कोर = दर्ज सुविधाएँ 50% + डेटा की ताज़गी 20% + अधिभोग दर्ज 10% + संसाधन दर्ज 20%। यह रिकॉर्ड की पूर्णता और ताज़गी मापता है, आश्रय की सुरक्षा नहीं।", "ପ୍ରସ୍ତୁତି ସ୍କୋର = ଲେଖା ସୁବିଧା 50% + ତଥ୍ୟ ତାଜାତା 20% + ଅଧିଭୋଗ ଲେଖା 10% + ସମ୍ବଳ ଲେଖା 20%। ଏହା ରେକର୍ଡ କେତେ ସମ୍ପୂର୍ଣ୍ଣ ଓ ତାଜା ତାହା ମାପେ, ଆଶ୍ରୟସ୍ଥଳ ସୁରକ୍ଷିତ କି ନାହିଁ ତାହା ନୁହେଁ।"],
  anDistricts: ["District overview and scorecards", "जिला अवलोकन और स्कोरकार्ड", "ଜିଲ୍ଲା ସମୀକ୍ଷା ଓ ସ୍କୋରକାର୍ଡ"], anColDistrict: ["District", "जिला", "ଜିଲ୍ଲା"], anColCap: ["Capacity", "क्षमता", "କ୍ଷମତା"], anColFree: ["Free (tracked)", "खाली (दर्ज)", "ଖାଲି (ଲେଖା)"], anColIssues: ["Open issues", "खुली समस्याएँ", "ଖୋଲା ସମସ୍ୟା"],
  anCapacity: ["Capacity and occupancy", "क्षमता और अधिभोग", "କ୍ଷମତା ଓ ଅଧିଭୋଗ"], anShortage: ["Resource shortage flags", "संसाधन कमी संकेत", "ସମ୍ବଳ ଅଭାବ ସଂକେତ"], anNoShortage: ["No shortage flags from the figures entered.", "दर्ज आँकड़ों से कोई कमी संकेत नहीं।", "ଲେଖା ଅଙ୍କରୁ କୌଣସି ଅଭାବ ସଂକେତ ନାହିଁ।"], anTrend: ["Reports in the last 14 days", "पिछले 14 दिनों की रिपोर्ट", "ଗତ 14 ଦିନର ରିପୋର୍ଟ"], anNoReports: ["No reports saved yet.", "अभी कोई रिपोर्ट सहेजी नहीं गई।", "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ରିପୋର୍ଟ ସେଭ୍ ହୋଇନାହିଁ।"],
  anHistory: ["Snapshots and history", "स्नैपशॉट और इतिहास", "ସ୍ନାପସଟ୍ ଓ ଇତିହାସ"], anSnap: ["Save snapshot now", "अभी स्नैपशॉट सहेजें", "ବର୍ତ୍ତମାନ ସ୍ନାପସଟ୍ ସେଭ୍ କରନ୍ତୁ"], anSnapHelp: ["Save a snapshot regularly to compare how your records change over time.", "समय के साथ रिकॉर्ड कैसे बदलते हैं, यह देखने के लिए नियमित स्नैपशॉट सहेजें।", "ସମୟ ସହ ରେକର୍ଡ କିପରି ବଦଳୁଛି ଦେଖିବାକୁ ନିୟମିତ ସ୍ନାପସଟ୍ ସେଭ୍ କରନ୍ତୁ।"],
  anOccupied: ["Occupied", "अधिभोग", "ଅଧିଭୋଗ"], anSources: ["Data sources and last update", "डेटा स्रोत और अंतिम अपडेट", "ତଥ୍ୟ ଉତ୍ସ ଓ ଶେଷ ଅପଡେଟ୍"], anChange: ["change", "बदलाव", "ପରିବର୍ତ୍ତନ"]
});
PHASE3_PAGES.analytics = () => {
  const records = getShelters();
  if (!records.length) return `${heading("anTitle", "anSubtitle")}${notice("anNote")}${emptyState("noRecords", "noRecordsHelp", `<button class="button primary" data-action="add-shelter">＋ ${esc(t("addShelter"))}</button>`)}`;
  const maint = getList("maint").filter((item) => item.status !== "fixed");
  const byDistrict = {};
  for (const record of records) (byDistrict[record.district.trim()] ||= []).push(record);
  const districtRows = Object.entries(byDistrict).sort((a, b) => a[0].localeCompare(b[0])).map(([district, group]) => {
    const score = Math.round(group.reduce((s, r) => s + readinessScore(r), 0) / group.length);
    const tracked = group.filter(hasOccupancy), free = tracked.length ? formatCapacity(tracked.reduce((s, r) => s + shelterFree(r), 0)) : "—";
    return `<tr><th>${esc(district)}</th><td>${group.length}</td><td>${formatCapacity(group.reduce((s, r) => s + Number(r.capacity || 0), 0))}</td><td>${free}</td><td>${score}%</td><td>${maint.filter((m) => group.some((r) => r.id === m.shelterId)).length}</td></tr>`;
  }).join("");
  const bars = records.map((record) => { const pct = hasOccupancy(record) && record.capacity > 0 ? Math.min(100, Math.round(record.occupancy / record.capacity * 100)) : null;
    return `<div class="sim-bar"><span>${esc(record.name)}</span><div class="progress-track"><div class="progress-fill occupancy-${pct === null ? "low" : pct >= 90 ? "high" : pct >= 70 ? "medium" : "low"}" style="width:${pct ?? 0}%"></div></div><strong>${pct === null ? "—" : pct + "%"}</strong></div>`; }).join("");
  const a = getAssume(), flags = [];
  for (const record of records) {
    const res = getResources()[record.id]; if (!res) continue;
    const { n } = peopleBasis(record), w = daysOf(res.water, n, a.water), m = daysOf(res.meals, n, a.meals);
    if (w !== null && w < 1) flags.push([record, "waterSupply"]); if (m !== null && m < 1) flags.push([record, "foodSupply"]);
    if (res.powerHours !== undefined && res.powerHours < 12) flags.push([record, "tabPower"]);
    if (res.toiletsWorking === 0) flags.push([record, "noWorkingToilet"]);
  }
  const reports = getList("triage"), days = [];
  for (let i = 13; i >= 0; i--) { const d = new Date(Date.now() - i * DAY), key = d.toISOString().slice(0, 10); days.push([key, reports.filter((r) => String(r.createdAt).slice(0, 10) === key).length]); }
  const peak = Math.max(1, ...days.map(([, c]) => c));
  const snaps = getList("snapshots"), prev = snaps.length > 1 ? snaps[snaps.length - 2] : null, last = snaps[snaps.length - 1];
  const delta = (cur, old) => old === undefined || old === null ? "" : ` (${cur - old >= 0 ? "+" : ""}${cur - old})`;
  const scoreAvg = Math.round(records.reduce((s, r) => s + readinessScore(r), 0) / records.length);
  return `${heading("anTitle", "anSubtitle")}${notice("anNote")}
    <div class="grid metrics-grid">${metric("totalShelters", records.length, "pendingReview", "⌂")}${metric("totalCapacity", formatCapacity(records.reduce((s, r) => s + Number(r.capacity || 0), 0)), "sourceProvided", "▣")}${metric("shelterReadinessAvg", `${scoreAvg}%`, "anScoreShort", "✓")}${metric("anColIssues", maint.length, "tabMaint", "!")}</div>
    <section class="card page-card"><h2>${esc(t("anDistricts"))}</h2><div class="table-scroll"><table class="cmp-table"><thead><tr><th>${esc(t("anColDistrict"))}</th><th>${esc(t("shelters"))}</th><th>${esc(t("anColCap"))}</th><th>${esc(t("anColFree"))}</th><th>${esc(t("colScore"))}</th><th>${esc(t("anColIssues"))}</th></tr></thead><tbody>${districtRows}</tbody></table></div><small>${esc(t("anScoreHow"))}</small></section>
    <section class="card page-card" style="margin-top:14px"><h2>${esc(t("anCapacity"))}</h2><div class="sim-bars">${bars}</div></section>
    <section class="card page-card" style="margin-top:14px"><h2>${esc(t("anShortage"))}</h2>${flags.length ? flags.map(([record, key]) => `<div class="district-row"><strong>${esc(record.name)}</strong><span class="level-low">${esc(t(key))}</span></div>`).join("") : p3Empty("anNoShortage")}</section>
    <section class="card page-card" style="margin-top:14px"><h2>${esc(t("anTrend"))}</h2>${reports.length ? `<div class="trend-chart" role="img" aria-label="${esc(t("anTrend"))}">${days.map(([key, count]) => `<div class="trend-col" title="${key}: ${count}"><span class="trend-bar" style="height:${Math.round(count / peak * 100)}%"></span><small>${key.slice(8)}</small></div>`).join("")}</div>` : p3Empty("anNoReports")}</section>
    <section class="card page-card" style="margin-top:14px"><div class="card-heading"><div><h2>${esc(t("anHistory"))}</h2><p>${esc(t("anSnapHelp"))}</p></div><div class="heading-actions"><button class="button primary" data-p3="snap-save">${esc(t("anSnap"))}</button>${snaps.length ? `<button class="button small danger" data-p3="snap-clear">${esc(t("scnDelete"))}</button>` : ""}</div></div>
      ${snaps.length ? `<div class="table-scroll"><table class="cmp-table"><thead><tr><th>${esc(t("fDate"))}</th><th>${esc(t("shelters"))}</th><th>${esc(t("anColCap"))}</th><th>${esc(t("anOccupied"))}</th><th>${esc(t("colScore"))}</th></tr></thead><tbody>${[...snaps].reverse().map((s, i, arr) => { const older = arr[i + 1]; return `<tr><td>${esc(formatDateTime(s.at))}</td><td>${s.shelters}${delta(s.shelters, older?.shelters)}</td><td>${formatCapacity(s.capacity)}${delta(s.capacity, older?.capacity)}</td><td>${formatCapacity(s.occupied)} (${s.tracked})</td><td>${s.score}%${delta(s.score, older?.score)}</td></tr>`; }).join("")}</tbody></table></div>` : ""}</section>
    <section class="card page-card" style="margin-top:14px"><h2>${esc(t("anSources"))}</h2>${records.map((record) => `<div class="district-row"><div><strong>${esc(record.name)}</strong><small>${esc(t("source"))}: ${esc(record.source)}</small></div><small>${esc(formatDateTime(record.updatedAt))}</small></div>`).join("")}</section>`;
};
addMsgs({ anScoreShort: ["completeness score", "पूर्णता स्कोर", "ସମ୍ପୂର୍ଣ୍ଣତା ସ୍କୋର"] });
addNav("manage", "analytics", "▥", "navAnalytics");

/* ---------- Report centre (46, 73, 83, 84, 105, 117) ---------- */
function csvCell(value) {
  let text = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}
function downloadFile(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url; link.download = name;
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function csvFrom(header, rows) { return "\ufeff" + [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n"); }
P3ACT["csv-resources"] = () => {
  const res = getResources();
  downloadFile("aapadalens-resources.csv", csvFrom(["shelter", "district", "water_litres", "meals", "first_aid_kits", "first_aid_checked", "power_type", "power_hours", "toilets", "toilets_working", "hygiene_kits", "last_cleaned", "updated"],
    getShelters().map((r) => { const x = res[r.id] || {}; return [r.name, r.district, x.water, x.meals, x.firstAidKits, x.firstAidChecked, x.powerStatus, x.powerHours, x.toilets, x.toiletsWorking, x.hygieneKits, x.lastCleaned, x.at]; })), "text/csv;charset=utf-8");
};
P3ACT["csv-reports"] = () => downloadFile("aapadalens-reports.csv", csvFrom(["created", "category", "urgency", "method", "status", "text"], getList("triage").map((r) => [r.createdAt, r.category, r.urgency, r.method, r.review || "new", r.text])), "text/csv;charset=utf-8");
P3ACT["backup-json"] = () => {
  const data = {};
  Object.keys(localStorage).filter((key) => key.startsWith(STORAGE_PREFIX)).forEach((key) => { data[key] = localStorage.getItem(key); });
  downloadFile(`aapadalens-backup-${new Date().toISOString().slice(0, 10)}.json`, JSON.stringify({ app: "aapadalens", version: 1, exportedAt: new Date().toISOString(), data }, null, 1), "application/json");
};
P3CHANGE["backup-import"] = async (input) => {
  const file = input.files?.[0]; input.value = "";
  if (!file) return;
  try {
    if (file.size > 4 * 1024 * 1024) throw new Error("size");
    const parsed = JSON.parse(await file.text());
    if (parsed?.app !== "aapadalens" || typeof parsed.data !== "object") throw new Error("shape");
    const entries = Object.entries(parsed.data);
    for (const [key, value] of entries) { if (!key.startsWith(STORAGE_PREFIX) || typeof value !== "string") throw new Error("key"); JSON.parse(value); }
    if (!window.confirm(t("importConfirm"))) return;
    entries.forEach(([key, value]) => localStorage.setItem(key, value));
    showToast(t("importDone"));
    setTimeout(() => location.reload(), 600);
  } catch { showToast(t("importBad")); }
};
function situationDraft() {
  const records = getShelters(), tracked = records.filter(hasOccupancy), reports = getList("triage"), open = getList("maint").filter((m) => m.status !== "fixed");
  const lines = [`${t("sitHeader")} — ${formatDateTime(new Date().toISOString())}`, "",
    `${t("totalShelters")}: ${records.length}; ${t("totalCapacity")}: ${formatCapacity(records.reduce((s, r) => s + Number(r.capacity || 0), 0))}`,
    `${t("anOccupied")}: ${formatCapacity(tracked.reduce((s, r) => s + r.occupancy, 0))} (${tracked.length}/${records.length} ${t("sitTracked")})`,
    `${t("tabMaint")}: ${open.length} ${t("stOpen")}`, `${t("sitReports")}: ${reports.length}, ${t("urg_high")}: ${reports.filter((r) => r.urgency === "high").length}`, ""];
  for (const record of records) lines.push(`- ${record.name} (${record.district}): ${t("recordedCapacity")} ${formatCapacity(record.capacity)}${hasOccupancy(record) ? `, ${t("anOccupied")} ${record.occupancy}` : ""}; ${t("colScore")} ${readinessScore(record)}%`);
  lines.push("", t("sitFooter"));
  return lines.join("\n");
}
P3ACT["sit-copy"] = () => navigator.clipboard?.writeText(document.getElementById("sitText")?.value || "").then(() => showToast(t("copied")), () => showToast(t("saveError")));
addMsgs({
  rcTitle: ["Report centre", "रिपोर्ट केंद्र", "ରିପୋର୍ଟ କେନ୍ଦ୍ର"], rcSubtitle: ["Print or save readiness reports, draft a situation summary, export data and keep a backup.", "तैयारी रिपोर्ट प्रिंट या सहेजें, स्थिति सारांश बनाएँ, डेटा निर्यात करें और बैकअप रखें।", "ପ୍ରସ୍ତୁତି ରିପୋର୍ଟ ପ୍ରିଣ୍ଟ ବା ସେଭ୍ କରନ୍ତୁ, ପରିସ୍ଥିତି ସାରାଂଶ ଲେଖନ୍ତୁ, ଡାଟା ରପ୍ତାନି କରନ୍ତୁ ଓ ବ୍ୟାକଅପ୍ ରଖନ୍ତୁ।"],
  rcPrint: ["Print / save as PDF", "प्रिंट / PDF के रूप में सहेजें", "ପ୍ରିଣ୍ଟ / PDF ଭାବେ ସେଭ୍"], rcPrintHelp: ["In the print window choose “Save as PDF” to make a PDF.", "PDF बनाने के लिए प्रिंट विंडो में “Save as PDF” चुनें।", "PDF ପାଇଁ ପ୍ରିଣ୍ଟ ୱିଣ୍ଡୋରେ “Save as PDF” ବାଛନ୍ତୁ।"], rcReport: ["Shelter readiness report", "आश्रय तैयारी रिपोर्ट", "ଆଶ୍ରୟସ୍ଥଳ ପ୍ରସ୍ତୁତି ରିପୋର୍ଟ"],
  rcSituation: ["Situation summary (draft)", "स्थिति सारांश (मसौदा)", "ପରିସ୍ଥିତି ସାରାଂଶ (ଖସଡ଼ା)"], rcSituationNote: ["Built from your local records only. Review and edit before sharing. Not an official report.", "केवल आपके स्थानीय रिकॉर्ड से बना। साझा करने से पहले जाँचें और संपादित करें। आधिकारिक रिपोर्ट नहीं।", "କେବଳ ଆପଣଙ୍କ ସ୍ଥାନୀୟ ରେକର୍ଡରୁ ତିଆରି। ସେୟାର୍ ପୂର୍ବରୁ ଯାଞ୍ଚ ଓ ସମ୍ପାଦନ କରନ୍ତୁ। ସରକାରୀ ରିପୋର୍ଟ ନୁହେଁ।"],
  rcExport: ["Export data", "डेटा निर्यात", "ଡାଟା ରପ୍ତାନି"], rcBackup: ["Backup and restore", "बैकअप और रिस्टोर", "ବ୍ୟାକଅପ୍ ଓ ରିଷ୍ଟୋର୍"], rcBackupHelp: ["A backup file holds everything saved in this app, including health and contact details. Keep it private.", "बैकअप फ़ाइल में इस ऐप में सहेजा सब कुछ रहता है, स्वास्थ्य और संपर्क जानकारी सहित। इसे निजी रखें।", "ବ୍ୟାକଅପ୍ ଫାଇଲ୍‌ରେ ଏହି ଆପ୍‌ରେ ସେଭ୍ ସବୁକିଛି ଥାଏ, ସ୍ବାସ୍ଥ୍ୟ ଓ ଯୋଗାଯୋଗ ସୂଚନା ସହ। ଏହାକୁ ଗୋପନ ରଖନ୍ତୁ।"],
  rcCsvShelters: ["Shelters (CSV)", "आश्रय (CSV)", "ଆଶ୍ରୟସ୍ଥଳ (CSV)"], rcCsvResources: ["Resources (CSV)", "संसाधन (CSV)", "ସମ୍ବଳ (CSV)"], rcCsvReports: ["Reports (CSV)", "रिपोर्ट (CSV)", "ରିପୋର୍ଟ (CSV)"], rcBackupBtn: ["Download backup (JSON)", "बैकअप डाउनलोड (JSON)", "ବ୍ୟାକଅପ୍ ଡାଉନଲୋଡ୍ (JSON)"], rcRestore: ["Restore from backup file", "बैकअप फ़ाइल से रिस्टोर करें", "ବ୍ୟାକଅପ୍ ଫାଇଲରୁ ରିଷ୍ଟୋର୍"],
  importConfirm: ["This replaces matching data on this device with the backup. Continue?", "यह इस डिवाइस के मिलते-जुलते डेटा को बैकअप से बदल देगा। जारी रखें?", "ଏହା ଏହି ଡିଭାଇସ୍‌ର ମେଳ ଖାଉଥିବା ଡାଟାକୁ ବ୍ୟାକଅପ୍ ଦ୍ବାରା ବଦଳାଇବ। ଜାରି ରଖିବେ?"], importDone: ["Backup restored.", "बैकअप रिस्टोर हुआ।", "ବ୍ୟାକଅପ୍ ରିଷ୍ଟୋର୍ ହେଲା।"], importBad: ["This is not a valid AapadaLens backup.", "यह मान्य AapadaLens बैकअप नहीं है।", "ଏହା ବୈଧ AapadaLens ବ୍ୟାକଅପ୍ ନୁହେଁ।"],
  sitHeader: ["Situation summary (local draft)", "स्थिति सारांश (स्थानीय मसौदा)", "ପରିସ୍ଥିତି ସାରାଂଶ (ସ୍ଥାନୀୟ ଖସଡ଼ା)"], sitTracked: ["shelters tracked", "आश्रय दर्ज", "ଆଶ୍ରୟସ୍ଥଳ ଲେଖା"], sitReports: ["Reports saved", "सहेजी रिपोर्ट", "ସେଭ୍ ରିପୋର୍ଟ"], sitFooter: ["Based on unverified local records. Confirm with official sources.", "असत्यापित स्थानीय रिकॉर्ड पर आधारित। आधिकारिक स्रोतों से पुष्टि करें।", "ଯାଞ୍ଚ ହୋଇନଥିବା ସ୍ଥାନୀୟ ରେକର୍ଡ ଆଧାରିତ। ସରକାରୀ ଉତ୍ସରୁ ନିଶ୍ଚିତ କରନ୍ତୁ।"]
});
PHASE3_PAGES.reportc = () => {
  const records = getShelters(), res = getResources(), a = getAssume();
  const rows = records.map((r) => { const x = res[r.id] || {}, { n } = peopleBasis(r);
    return `<tr><th>${esc(r.name)}<br><small>${esc(r.district)}</small></th><td>${formatCapacity(r.capacity)}</td><td>${hasOccupancy(r) ? formatCapacity(r.occupancy) : "—"}</td><td>${SHELTER_FACILITIES.filter(([f]) => r.facilities?.includes(f)).map(([, k]) => esc(t(k))).join(", ") || "—"}</td><td>${esc(fmtDays(daysOf(x.water, n, a.water)))} / ${esc(fmtDays(daysOf(x.meals, n, a.meals)))}</td><td>${readinessScore(r)}%</td><td>${esc(r.source)}<br><small>${esc(safeDate(r.updatedAt))}</small></td></tr>`; }).join("");
  return `${heading("rcTitle", "rcSubtitle", `<button class="button primary" data-action="print">${esc(t("rcPrint"))}</button>`)}${notice("rcPrintHelp")}
    <section class="card page-card print-card"><h2>${esc(t("rcReport"))}</h2><p class="page-subtitle">${esc(formatDateTime(new Date().toISOString()))} · ${esc(t("needsReview"))}</p>
      ${records.length ? `<div class="table-scroll"><table class="cmp-table"><thead><tr><th>${esc(t("colShelter"))}</th><th>${esc(t("anColCap"))}</th><th>${esc(t("anOccupied"))}</th><th>${esc(t("facilities"))}</th><th>${esc(t("colWater"))} / ${esc(t("colFood"))}</th><th>${esc(t("colScore"))}</th><th>${esc(t("source"))}</th></tr></thead><tbody>${rows}</tbody></table></div><small>${esc(t("anScoreHow"))}</small>` : p3Empty("noRecords")}</section>
    <section class="card page-card" style="margin-top:14px"><h2>${esc(t("rcSituation"))}</h2><p class="page-subtitle">${esc(t("rcSituationNote"))}</p><textarea class="form-control" id="sitText" rows="9">${esc(situationDraft())}</textarea><div style="margin-top:8px"><button class="button" data-p3="sit-copy">${esc(t("shareCopy"))}</button></div></section>
    <section class="card page-card" style="margin-top:14px"><h2>${esc(t("rcExport"))}</h2><div class="record-actions" style="flex-wrap:wrap"><button class="button" data-action="export-csv">${esc(t("rcCsvShelters"))}</button><button class="button" data-p3="csv-resources">${esc(t("rcCsvResources"))}</button><button class="button" data-p3="csv-reports">${esc(t("rcCsvReports"))}</button></div></section>
    <section class="card page-card" style="margin-top:14px"><h2>${esc(t("rcBackup"))}</h2><p class="page-subtitle">${esc(t("rcBackupHelp"))}</p><div class="record-actions" style="flex-wrap:wrap"><button class="button primary" data-p3="backup-json">${esc(t("rcBackupBtn"))}</button><label class="button">${esc(t("rcRestore"))}<input type="file" accept="application/json,.json" data-p3change="backup-import" hidden></label></div></section>`;
};
addNav("manage", "reportc", "⎙", "navReportCenter");
