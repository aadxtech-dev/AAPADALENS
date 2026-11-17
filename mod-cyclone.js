/* AapadaLens module 2: cyclone tracking and weather intelligence. All storm tracks and district warnings are SAMPLE data. */
const CY_CATS = [
  { min: 120, name: "Super Cyclonic Storm", color: "#7f1d1d" }, { min: 90, name: "Extremely Severe Cyclonic Storm", color: "#b91c1c" },
  { min: 64, name: "Very Severe Cyclonic Storm", color: "#ef4444" }, { min: 48, name: "Severe Cyclonic Storm", color: "#f97316" },
  { min: 34, name: "Cyclonic Storm", color: "#f59e0b" }, { min: 28, name: "Deep Depression", color: "#eab308" },
  { min: 17, name: "Depression", color: "#22c55e" }, { min: 0, name: "Low pressure / below depression", color: "#06b6d4" }
];
function cyCat(kt) { return CY_CATS.find((cat) => kt >= cat.min); }
const CY_BASE = (() => { const d = new Date(); d.setMinutes(0, 0, 0); return d.getTime(); })();
const CY_STORMS = [
  { id: "smp-active", name: "SAMPLE Cyclone ALPHA", kind: "active", note: "Illustrative active storm — not a real cyclone.", pts: [[-24, 12.0, 90.0, 30], [-12, 13.4, 89.0, 40], [0, 15.0, 88.0, 55], [12, 16.8, 87.1, 70], [24, 18.4, 86.4, 85], [36, 19.8, 85.9, 75], [48, 21.0, 85.4, 45]] },
  { id: "smp-arch1", name: "SAMPLE Archive Storm 1", kind: "archive", note: "Illustrative past track (not a real storm).", pts: [[-96, 11.0, 92.0, 25], [-84, 13.0, 91.0, 45], [-72, 15.5, 89.5, 75], [-60, 17.8, 88.0, 100], [-48, 19.4, 86.8, 90], [-36, 20.8, 85.8, 55]] },
  { id: "smp-arch2", name: "SAMPLE Archive Storm 2", kind: "archive", note: "Illustrative past track (not a real storm).", pts: [[-200, 10.0, 86.0, 20], [-188, 12.0, 85.5, 35], [-176, 14.2, 84.8, 52], [-164, 16.4, 84.6, 62], [-152, 18.3, 84.9, 40]] }
];
const CY_DISTRICTS = [["Balasore", 21.49, 86.93, "orange"], ["Bhadrak", 21.06, 86.5, "orange"], ["Kendrapara", 20.5, 86.42, "red"], ["Jagatsinghpur", 20.26, 86.17, "red"], ["Puri", 19.81, 85.83, "red"], ["Khordha", 20.3, 85.82, "orange"], ["Ganjam", 19.31, 84.79, "yellow"], ["Cuttack", 20.46, 85.88, "yellow"]];
const CY_WX_POINTS = [["Balasore", 21.49, 86.93], ["Paradip", 20.32, 86.61], ["Bhubaneswar", 20.3, 85.82], ["Puri", 19.81, 85.83], ["Berhampur", 19.31, 84.79], ["Cuttack", 20.46, 85.88]];
MOD.st.cy = { storm: "smp-active", idx: 2, playing: false, speed: 1, layers: { track: true, forecast: true, districts: true, wind: false, rain: false }, wx: { status: "idle", items: [], at: null }, advQ: "", map: null, group: null, wxGroup: null };

function cyStorm() { return CY_STORMS.find((s) => s.id === MOD.st.cy.storm) || CY_STORMS[0]; }
function cyNowIdx(storm) { return Math.max(0, storm.pts.findIndex((p) => p[0] >= 0)); }
function cyLabel(h) { return modTime(CY_BASE + h * 3600000); }

function cyStormList() {
  const cy = MOD.st.cy;
  return CY_STORMS.map((s) => `<button class="cy-storm" data-mod="cyPick" data-id="${s.id}" aria-pressed="${cy.storm === s.id}"><strong>${mEsc(s.name)}</strong><span>${s.kind === "active" ? "Active (sample)" : "Archive (sample)"}</span><span class="mod-muted">${mEsc(s.note)}</span></button>`).join("");
}
function cyInfoHtml() {
  const cy = MOD.st.cy, s = cyStorm(), p = s.pts[Math.min(cy.idx, s.pts.length - 1)];
  const cat = cyCat(p[3]);
  const nowIdx = s.kind === "active" ? cyNowIdx(s) : -1;
  const kind = s.kind === "archive" ? "Historical position" : cy.idx === nowIdx ? "Current position" : cy.idx < nowIdx ? "Past position" : "Forecast position";
  return `<div class="cy-adv"><strong>${mEsc(s.name)} — ${mEsc(kind)}</strong><span>${mEsc(cyLabel(p[0]))} (sample time)</span><span>${p[1].toFixed(1)}°N, ${p[2].toFixed(1)}°E</span><span>Wind ${p[3]} kt (${Math.round(p[3] * 1.852)} km/h) · <i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${cat.color}"></i> ${mEsc(cat.name)}</span><span class="mod-muted">Uncertainty cone: not shown — no official forecast data connected.</span></div>`;
}
function cyTimelineHtml() {
  const cy = MOD.st.cy, s = cyStorm();
  return `<div class="cy-ctl"><button class="mod-btn" data-mod="cyStep" data-d="-1" aria-label="Previous position">⏮</button><button class="mod-btn primary" data-mod="cyPlay" aria-pressed="${cy.playing}">${cy.playing ? "⏸ Pause" : "▶ Play"}</button><button class="mod-btn" data-mod="cyStep" data-d="1" aria-label="Next position">⏭</button><button class="mod-btn" data-mod="cyReset">↺ Reset</button>
    <label class="mod-muted">Speed <select class="mod-input" style="min-height:30px;background:#0b1f33;color:#e2e8f0;border-color:#1d4f7a" data-mod-change="cySpeed"><option value="1" ${cy.speed === 1 ? "selected" : ""}>1×</option><option value="2" ${cy.speed === 2 ? "selected" : ""}>2×</option><option value="4" ${cy.speed === 4 ? "selected" : ""}>4×</option></select></label></div>
    <input type="range" min="0" max="${s.pts.length - 1}" value="${cy.idx}" aria-label="Forecast timeline" data-mod-input="cySlide">
    <div class="cy-ticks">${s.pts.map((p) => `<span>${p[0] > 0 ? "+" : ""}${p[0]}h</span>`).join("")}</div>`;
}
function cyLegendHtml() {
  return `<div class="cy-legend" aria-label="Storm intensity legend">${[...CY_CATS].reverse().map((c) => `<span><i style="background:${c.color}"></i>${mEsc(c.name)}</span>`).join("")}</div>`;
}
function cyDistrictsHtml() {
  return `<table class="cy-table"><thead><tr><th>District</th><th>Warning level</th></tr></thead><tbody>${CY_DISTRICTS.map(([n, , , l]) => `<tr><td>${mEsc(n)}</td><td><span class="lvl ${l}">${l.toUpperCase()}</span> <span class="mod-muted">SAMPLE</span></td></tr>`).join("")}</tbody></table>`;
}
function cyOfficialHtml() {
  const cy = MOD.st.cy;
  if (alertState.status === "loading" || alertState.status === "idle") return modState("loading", "Loading official alerts…");
  if (alertState.status === "error") return modState("error", "Official alerts could not be loaded", "The local server may not be running, or the NDMA feed is unreachable.", `<p><button class="mod-btn small" data-mod="cyAlerts">Retry</button></p>`);
  const q = cy.advQ.trim().toLowerCase();
  const items = alertState.items.filter((i) => !q || `${i.title} ${i.category}`.toLowerCase().includes(q));
  if (!alertState.items.length) return modState("empty", "No official alerts for Odisha", "NDMA Sachet currently lists none.");
  if (!items.length) return modState("empty", "No advisories match your search");
  return items.slice(0, 15).map((i) => `<div class="cy-adv"><div>${modBadge("official", "Official · NDMA Sachet")}</div><strong>${mEsc(i.title)}</strong><span>Issued: ${mEsc(i.published ? modTime(i.published) : "not provided")} · Validity: not provided in feed</span><span>Source: ${mEsc(i.author || "NDMA Sachet")}${i.link ? ` · <a href="${mEsc(i.link)}" target="_blank" rel="noopener noreferrer">Open source ↗</a>` : ""}</span></div>`).join("");
}
function cyAdvisoriesHtml() {
  const cy = MOD.st.cy;
  const sample = `<div class="cy-adv"><div>${modBadge("sample", "SAMPLE")}</div><strong>Cyclone ALPHA advisory (sample)</strong><span>Issued: ${mEsc(cyLabel(0))} · Valid: next 48 h (sample)</span><span>Source: AapadaLens sample data — NOT an official IMD advisory.</span></div>`;
  return `<input class="mod-input" type="search" placeholder="Search advisories" aria-label="Search advisories" value="${mEsc(cy.advQ)}" data-mod-input="cyAdvQ"><h3>Official alerts (NDMA Sachet, Odisha)</h3><div id="cyOfficial" style="display:grid;gap:8px">${cyOfficialHtml()}</div><h3>Sample advisory</h3>${sample}`;
}
function cyRender() {
  const cy = MOD.st.cy;
  const layer = (key, label) => `<label class="mod-muted" style="display:flex;gap:6px;align-items:center"><input type="checkbox" data-mod-change="cyLayer" data-k="${key}" ${cy.layers[key] ? "checked" : ""}> ${mEsc(label)}</label>`;
  return `${heading("navCyclone", "cySub")}${modOfflineBanner()}
    ${modSampleBanner("Storm tracks, forecast positions, archive and district warnings below are illustrative samples. They are NOT real-time official alerts. Official IMD data is not integrated yet. Official alerts shown in the right panel come from the NDMA Sachet feed.")}
    <div class="cy-wrap"><div class="cy-top"><h2>Bay of Bengal &amp; Indian Ocean — Weather intelligence</h2>${modBadge("sample", "SAMPLE DATA")}</div>
    <div class="cy-grid">
      <div class="cy-panel"><h3>Storms</h3>${cyStormList()}<h3>Layers</h3>${layer("track", "Observed track")}${layer("forecast", "Forecast positions")}${layer("districts", "District warnings (sample)")}${layer("wind", "Wind (model)")}${layer("rain", "Rainfall (model)")}
        <label class="mod-muted" style="opacity:.6"><input type="checkbox" disabled> Uncertainty cone (needs official data)</label>
        <div id="cyWxCtl"></div><h3>Legend</h3>${cyLegendHtml()}</div>
      <div class="cy-mapcol"><div class="cy-map" id="cyMap" role="application" aria-label="Cyclone map"></div><div id="cyInfo">${cyInfoHtml()}</div><div class="cy-timeline" id="cyTimeline">${cyTimelineHtml()}</div></div>
      <div class="cy-panel cy-right"><h3>Advisories</h3><div id="cyAdv">${cyAdvisoriesHtml()}</div><h3>District warnings — Odisha</h3>${cyDistrictsHtml()}<p class="mod-muted">District levels are SAMPLE values. Use official IMD / SDMA warnings for decisions.</p></div>
    </div></div>`;
}
function cyWxCtlHtml() {
  const wx = MOD.st.cy.wx;
  if (wx.status === "loading") return modState("loading", "Loading model data…");
  if (wx.status === "error") return modState("error", "Model data unavailable", "Start the local server (node server.js) and check your connection.", `<p><button class="mod-btn small" data-mod="cyWx">Retry</button></p>`);
  if (wx.status === "ready") return `<p class="mod-muted">Open-Meteo model forecast loaded ${mEsc(modTime(wx.at))}. Not an IMD warning.</p><button class="mod-btn small" data-mod="cyWx">Refresh</button>`;
  return `<button class="mod-btn small" data-mod="cyWx">Load wind &amp; rain (model)</button><p class="mod-muted">Fetches real Open-Meteo model values for 6 Odisha places via the local server.</p>`;
}
function cyDraw() {
  const cy = MOD.st.cy;
  if (!cy.map) return;
  if (cy.group) cy.group.clearLayers(); else cy.group = L.layerGroup().addTo(cy.map);
  const s = cyStorm(), now = s.kind === "active" ? cyNowIdx(s) : s.pts.length - 1;
  const ll = (p) => [p[1], p[2]];
  const past = s.pts.slice(0, now + 1), fc = s.pts.slice(now);
  if (cy.layers.track && past.length > 1) L.polyline(past.map(ll), { color: "#e2e8f0", weight: 3 }).addTo(cy.group);
  if (cy.layers.forecast && s.kind === "active" && fc.length > 1) L.polyline(fc.map(ll), { color: "#06b6d4", weight: 3, dashArray: "8 8" }).addTo(cy.group);
  s.pts.forEach((p, i) => {
    const isFc = s.kind === "active" && i > now;
    if ((isFc && !cy.layers.forecast) || (!isFc && !cy.layers.track)) return;
    const cls = `cy-dot${i === now && s.kind === "active" ? " now" : ""}${i === cy.idx ? " sel" : ""}`;
    const m = L.marker(ll(p), { icon: L.divIcon({ className: "", html: `<div class="${cls}" style="background:${cyCat(p[3]).color}"></div>`, iconSize: [18, 18], iconAnchor: [9, 9] }), title: `${cyLabel(p[0])} — ${p[3]} kt` });
    m.bindTooltip(`${cyLabel(p[0])} · ${p[3]} kt · ${cyCat(p[3]).name} (SAMPLE)`);
    m.on("click", () => { cy.idx = i; cyUpdate(); });
    m.addTo(cy.group);
  });
  if (cy.layers.districts) for (const [n, lat, lon, lvl] of CY_DISTRICTS) {
    L.circleMarker([lat, lon], { radius: 9, color: "#fff", weight: 1, fillColor: { yellow: "#fde047", orange: "#fb923c", red: "#ef4444" }[lvl], fillOpacity: 0.85 }).bindTooltip(`${n}: ${lvl.toUpperCase()} (SAMPLE)`).addTo(cy.group);
  }
  if (cy.wxGroup) cy.wxGroup.clearLayers(); else cy.wxGroup = L.layerGroup().addTo(cy.map);
  if (cy.wx.status === "ready") for (const w of cy.wx.items) {
    if (cy.layers.wind) L.circleMarker([w.lat, w.lon], { radius: 6 + Math.min(18, w.gust / 4), color: "#7dd3fc", weight: 2, fillColor: "#0ea5e9", fillOpacity: 0.25 }).bindTooltip(`${w.name}: wind ${w.wind} km/h, gusts ${w.gust} km/h (model)`).addTo(cy.wxGroup);
    if (cy.layers.rain) L.circleMarker([w.lat + 0.12, w.lon + 0.12], { radius: 5 + Math.min(16, w.rain), color: "#a78bfa", weight: 2, fillColor: "#7c3aed", fillOpacity: 0.3 }).bindTooltip(`${w.name}: rain ${w.rain} mm/day (model)`).addTo(cy.wxGroup);
  }
}
function cyUpdate() { modSet("cyInfo", cyInfoHtml()); modSet("cyTimeline", cyTimelineHtml()); cyDraw(); }
async function cyInit() {
  const cy = MOD.st.cy;
  cy.map = null; cy.group = null; cy.wxGroup = null;
  modSet("cyWxCtl", cyWxCtlHtml());
  const map = await modMapCreate("cyMap", [17.5, 88], 5);
  if (map) { cy.map = map; cyDraw(); }
  if (alertState.status !== "ready") loadAlerts().then(() => modSet("cyAdv", cyAdvisoriesHtml()));
  else modSet("cyAdv", cyAdvisoriesHtml());
  if (cy.playing) cyStartTimer();
}
function cyStartTimer() {
  MOD.timers.forEach(clearInterval); MOD.timers = [];
  const cy = MOD.st.cy;
  MOD.timers.push(setInterval(() => {
    const s = cyStorm();
    if (cy.idx >= s.pts.length - 1) { cy.playing = false; MOD.timers.forEach(clearInterval); MOD.timers = []; }
    else cy.idx += 1;
    cyUpdate();
  }, 1400 / cy.speed));
}

MOD.act.cyPick = (el) => { const cy = MOD.st.cy; cy.storm = el.dataset.id; cy.idx = cyStorm().kind === "active" ? cyNowIdx(cyStorm()) : 0; cy.playing = false; renderPage(); };
MOD.act.cyStep = (el) => { const cy = MOD.st.cy; cy.idx = Math.max(0, Math.min(cyStorm().pts.length - 1, cy.idx + Number(el.dataset.d))); cyUpdate(); };
MOD.act.cyPlay = () => {
  const cy = MOD.st.cy;
  cy.playing = !cy.playing;
  if (cy.playing) { if (cy.idx >= cyStorm().pts.length - 1) cy.idx = 0; cyStartTimer(); } else { MOD.timers.forEach(clearInterval); MOD.timers = []; }
  cyUpdate();
};
MOD.act.cyReset = () => { const cy = MOD.st.cy; cy.playing = false; MOD.timers.forEach(clearInterval); MOD.timers = []; cy.idx = cyStorm().kind === "active" ? cyNowIdx(cyStorm()) : 0; cyUpdate(); };
MOD.input.cySlide = (el) => { MOD.st.cy.idx = Number(el.value); modSet("cyInfo", cyInfoHtml()); cyDraw(); };
MOD.input.cySpeed = (el) => { const cy = MOD.st.cy; cy.speed = Number(el.value); if (cy.playing) cyStartTimer(); };
MOD.input.cyLayer = (el) => { MOD.st.cy.layers[el.dataset.k] = el.checked; if ((el.dataset.k === "wind" || el.dataset.k === "rain") && el.checked && MOD.st.cy.wx.status === "idle") MOD.act.cyWx(); cyDraw(); };
MOD.input.cyAdvQ = (el) => { MOD.st.cy.advQ = el.value; modSet("cyOfficial", cyOfficialHtml()); };
MOD.act.cyAlerts = () => loadAlerts(true).then(() => modSet("cyAdv", cyAdvisoriesHtml()));
MOD.act.cyWx = async () => {
  const cy = MOD.st.cy;
  cy.wx = { status: "loading", items: [], at: null };
  modSet("cyWxCtl", cyWxCtlHtml());
  try {
    const items = await Promise.all(CY_WX_POINTS.map(async ([name, lat, lon]) => {
      const data = await apiGet(`/api/weather?lat=${lat}&lon=${lon}`);
      return { name, lat, lon, wind: Math.round(data.current.wind_speed_10m), gust: Math.round(data.current.wind_gusts_10m), rain: Math.round((data.daily.precipitation_sum[0] || 0) * 10) / 10 };
    }));
    cy.wx = { status: "ready", items, at: new Date().toISOString() };
    cy.layers.wind = true; cy.layers.rain = true;
    document.querySelectorAll('[data-mod-change="cyLayer"][data-k="wind"],[data-mod-change="cyLayer"][data-k="rain"]').forEach((box) => { box.checked = true; });
  } catch { cy.wx = { status: "error", items: [], at: null }; }
  if (currentPage === "cyclone") { modSet("cyWxCtl", cyWxCtlHtml()); cyDraw(); }
};

modRegister("cyclone", cyRender, cyInit);
