/* AapadaLens modules: shared helpers, navigation and hooks (loaded after phase5.js, before the module scripts) */
const MOD = { act: {}, input: {}, submit: {}, after: {}, maps: [], timers: [], st: {} };
const mEsc = (value) => escapeHtml(value);

addMsgs({
  navGroupModules: ["TOOLKIT", "टूलकिट", "ଟୁଲକିଟ୍"],
  navToolkit: ["Toolkit", "टूलकिट", "ଟୁଲକିଟ୍"],
  tkSub: ["All features of AapadaLens, A to Z.", "AapadaLens की सभी सुविधाएँ, A से Z।", "AapadaLens ର ସମସ୍ତ ସୁବିଧା, A ରୁ Z।"],
  navShelterHub: ["Shelter finder", "आश्रय खोजें", "ଆଶ୍ରୟସ୍ଥଳ ଖୋଜନ୍ତୁ"],
  navCyclone: ["Cyclone tracker", "चक्रवात ट्रैकर", "ବାତ୍ୟା ଟ୍ରାକର୍"],
  navServices: ["Emergency services", "आपातकालीन सेवाएँ", "ଜରୁରୀକାଳୀନ ସେବା"],
  navEvacList: ["Evacuation checklist", "निकासी चेकलिस्ट", "ଉଦ୍ଧାର ଚେକ୍‌ଲିଷ୍ଟ"],
  navGuides: ["Safety guides", "सुरक्षा गाइड", "ସୁରକ୍ଷା ଗାଇଡ୍"],
  shSub: ["Find nearby emergency shelters, check status and capacity, and preview the way there.", "पास के आश्रय खोजें, स्थिति और क्षमता देखें।", "ନିକଟସ୍ଥ ଆଶ୍ରୟସ୍ଥଳ ଖୋଜନ୍ତୁ, ସ୍ଥିତି ଓ କ୍ଷମତା ଦେଖନ୍ତୁ।"],
  cySub: ["Storm tracks, forecast positions, warnings and weather layers for the Bay of Bengal and Odisha.", "बंगाल की खाड़ी और ओडिशा के लिए तूफ़ान ट्रैक और चेतावनियाँ।", "ବଙ୍ଗୋପସାଗର ଓ ଓଡ଼ିଶା ପାଇଁ ବାତ୍ୟା ଟ୍ରାକ୍ ଓ ସତର୍କତା।"],
  svSub: ["Emergency numbers, your evacuation checklist and offline safety guides.", "आपातकालीन नंबर, निकासी चेकलिस्ट और ऑफ़लाइन सुरक्षा गाइड।", "ଜରୁରୀ ନମ୍ବର, ଉଦ୍ଧାର ଚେକ୍‌ଲିଷ୍ଟ ଓ ଅଫଲାଇନ୍ ସୁରକ୍ଷା ଗାଇଡ୍।"]
});

function modSampleBanner(text) {
  return `<div class="mod-sample" role="note"><span aria-hidden="true">⚠</span><span><strong>SAMPLE DATA</strong> — ${mEsc(text)}</span></div>`;
}
function modState(kind, title, text = "", action = "") {
  const spinner = kind === "loading" ? `<div class="mod-spinner" role="status" aria-label="Loading"></div>` : "";
  return `<div class="mod-state ${kind}">${spinner}<strong>${mEsc(title)}</strong>${text ? `<span>${mEsc(text)}</span>` : ""}${action}</div>`;
}
function modOfflineBanner() {
  return navigator.onLine ? "" : modState("offline", "You are offline", "Showing data saved on this device. Maps and live data may be unavailable until you reconnect.");
}
function modTime(iso) {
  const date = new Date(iso);
  if (!iso || Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(date);
}
function modBadge(cls, text) { return `<span class="mod-badge ${cls}">${mEsc(text)}</span>`; }
function modSet(id, html) { const node = document.getElementById(id); if (node) node.innerHTML = html; }

async function modMapCreate(id, center, zoom) {
  const node = document.getElementById(id);
  if (!node) return null;
  try { await loadLeaflet(); } catch { /* handled below */ }
  if (document.getElementById(id) !== node) return null;
  if (typeof L === "undefined") { node.innerHTML = modState("error", "Map library unavailable", "Leaflet could not be loaded."); return null; }
  const map = L.map(node, { zoomControl: true }).setView(center, zoom);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, crossOrigin: true, attribution: "© OpenStreetMap contributors" }).addTo(map);
  MOD.maps.push(map);
  setTimeout(() => map.invalidateSize(), 150);
  return map;
}
function modPin(cls, label) { return L.divIcon({ className: "", html: `<div class="mod-pin ${cls}"><i>${mEsc(label)}</i></div>`, iconSize: [26, 26], iconAnchor: [13, 26], popupAnchor: [0, -24] }); }

function modRegister(page, render, after) {
  PHASE3_PAGES[page] = render;
  if (after) MOD.after[page] = after;
}

const modBaseAfter = afterPageRender;
afterPageRender = function (page) {
  MOD.maps.forEach((map) => { try { map.remove(); } catch { /* already removed */ } });
  MOD.maps = [];
  MOD.timers.forEach(clearInterval);
  MOD.timers = [];
  modBaseAfter(page);
  if (MOD.after[page]) {
    try { MOD.after[page](); } catch (error) { console.error(error); modSet("appContent", modState("error", "This page could not be displayed", String(error.message || error))); }
  }
};

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-mod]");
  if (!control || control.disabled || control.getAttribute("aria-disabled") === "true") return;
  const handler = MOD.act[control.dataset.mod];
  if (handler) handler(control, event);
});
for (const type of ["input", "change"]) {
  document.addEventListener(type, (event) => {
    const control = event.target.closest(`[data-mod-${type}]`);
    if (!control) return;
    const handler = MOD.input[control.dataset[type === "input" ? "modInput" : "modChange"]];
    if (handler) handler(control, event);
  });
}
document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-mod-submit]");
  if (!form) return;
  event.preventDefault();
  const handler = MOD.submit[form.dataset.modSubmit];
  if (handler) handler(form);
});

const MOD_TOOLKIT_EXTRA = [["shelterhub", "⌖", "navShelterHub"], ["cyclone", "🌀", "navCyclone"], ["services", "☎", "navServices"], ["evacchecklist", "☑", "navEvacList"], ["safetyguides", "✚", "navGuides"]];
(function addToolkitEntry() {
  const bar = document.querySelector(".mobile-bottom-nav");
  const more = document.getElementById("moreToggle");
  if (!bar || !more) return;
  const button = document.createElement("button");
  button.className = "mobile-nav-link";
  button.dataset.nav = "toolkit";
  const icon = document.createElement("span"); icon.textContent = "▦";
  const label = document.createElement("small"); label.dataset.i18n = "navToolkit";
  button.append(icon, label);
  bar.insertBefore(button, more);
})();

function modToolkitItems() {
  const seen = new Map();
  document.querySelectorAll(".primary-nav .nav-link[data-nav], .settings-link[data-nav]").forEach((btn) => {
    const spans = btn.querySelectorAll("span");
    const icon = spans[0]?.textContent || "•", label = (spans[1]?.textContent || "").trim();
    if (label && !seen.has(btn.dataset.nav)) seen.set(btn.dataset.nav, { page: btn.dataset.nav, icon, label });
  });
  for (const [page, icon, key] of MOD_TOOLKIT_EXTRA) if (!seen.has(page)) seen.set(page, { page, icon, label: t(key) });
  seen.delete("toolkit");
  return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label, language === "en" ? "en" : undefined, { sensitivity: "base" }));
}
function modToolkitList(query) {
  const q = query.trim().toLowerCase();
  const items = modToolkitItems().filter((item) => !q || item.label.toLowerCase().includes(q));
  if (!items.length) return modState("empty", "Nothing matches", "Try a different word.");
  const groups = new Map();
  for (const item of items) {
    const letter = (item.label[0] || "#").toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter).push(item);
  }
  return [...groups].map(([letter, list]) => `<section class="tk-group"><h2 class="tk-letter" aria-label="${mEsc(letter)}">${mEsc(letter)}</h2><div class="tk-grid">${list.map((item) => `<button class="tk-item" data-nav="${mEsc(item.page)}"><span class="tk-icon" aria-hidden="true">${mEsc(item.icon)}</span><span>${mEsc(item.label)}</span></button>`).join("")}</div></section>`).join("");
}
MOD.st.tk = { q: "" };
MOD.input.tkSearch = (el) => { MOD.st.tk.q = el.value; modSet("tkList", modToolkitList(el.value)); };
modRegister("toolkit", () => `${heading("navToolkit", "tkSub")}
  <div class="mod-toolbar"><input class="mod-input" type="search" placeholder="Search all features" aria-label="Search all features" value="${mEsc(MOD.st.tk.q)}" data-mod-input="tkSearch"></div>
  <div id="tkList">${modToolkitList(MOD.st.tk.q)}</div>`);

const modBaseOverview = PHASE3_PAGES.overview || renderOverview;
PHASE3_PAGES.overview = () => `${modBaseOverview()}
  <section class="mod-card" style="margin-top:14px"><h2>${mEsc(t("navToolkit"))}</h2>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      <button class="mod-btn primary" data-nav="shelterhub">⌖ ${mEsc(t("navShelterHub"))}</button>
      <button class="mod-btn" data-nav="cyclone">🌀 ${mEsc(t("navCyclone"))}</button>
      <button class="mod-btn" data-nav="services">☎ ${mEsc(t("navServices"))}</button>
      <button class="mod-btn" data-nav="evacchecklist">☑ ${mEsc(t("navEvacList"))}</button>
      <button class="mod-btn" data-nav="safetyguides">✚ ${mEsc(t("navGuides"))}</button>
      <button class="mod-btn" data-nav="toolkit">▦ ${mEsc(t("tkSub").split(".")[0])}</button>
    </div></section>`;
