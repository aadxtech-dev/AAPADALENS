/* AapadaLens module 1: nearby shelter discovery and evacuation navigation */
const SH_FAC = [["water", "Drinking water"], ["sanitation", "Sanitation"], ["medical", "Medical support"], ["power", "Backup power"], ["accessible", "Accessible"], ["food", "Food supplies"], ["lighting", "Lighting"], ["comms", "Communication"]];
const SH_STATUS = { open: "Open", closed: "Closed", full: "Full", unavailable: "Temporarily unavailable", unknown: "Status not reported" };
const SH_SAMPLES = [
  { id: "smp-1", name: "SAMPLE Shelter A", district: "Puri", lat: 19.8135, lon: 85.8312, capacity: 400, occupancy: 120, status: "open", facilities: ["water", "sanitation", "medical", "power", "accessible", "food"] },
  { id: "smp-2", name: "SAMPLE Shelter B", district: "Khordha", lat: 20.2961, lon: 85.8245, capacity: 300, occupancy: 300, status: "full", facilities: ["water", "sanitation", "power", "lighting"] },
  { id: "smp-3", name: "SAMPLE Shelter C", district: "Cuttack", lat: 20.4625, lon: 85.883, capacity: 500, occupancy: 90, status: "open", facilities: ["water", "sanitation", "medical", "accessible", "comms", "lighting", "food", "power"] },
  { id: "smp-4", name: "SAMPLE Shelter D", district: "Kendrapara", lat: 20.5012, lon: 86.4223, capacity: 250, occupancy: 0, status: "closed", facilities: ["water", "sanitation"] },
  { id: "smp-5", name: "SAMPLE Shelter E", district: "Balasore", lat: 21.4934, lon: 86.9135, capacity: 350, occupancy: 140, status: "unavailable", facilities: ["water", "power", "medical", "lighting"] },
  { id: "smp-6", name: "SAMPLE Shelter F", district: "Ganjam", lat: 19.3149, lon: 84.7941, capacity: 280, occupancy: 60, status: "open", facilities: ["water", "sanitation", "accessible", "food", "comms"] }
];
MOD.st.sh = { q: "", status: "all", fac: [], sort: "nearest", sample: true, sel: null, view: "list", loc: null, locStatus: "idle", line: true, map: null, layer: null, me: null, route: null };

function shAll() {
  const st = MOD.st.sh;
  const overrides = readStorage("shelterStatus", {}) || {};
  const own = getShelters().map((record) => {
    const capacity = Number(record.capacity) || 0;
    const occupancy = hasOccupancy(record) ? record.occupancy : null;
    let status = overrides[record.id] || "unknown";
    if (!overrides[record.id] && occupancy !== null && capacity > 0 && occupancy >= capacity) status = "full";
    return { id: record.id, name: record.name, district: record.district || "", address: record.address || "", contact: record.contact || "", lat: hasCoordinates(record) ? Number(record.latitude) : null, lon: hasCoordinates(record) ? Number(record.longitude) : null, capacity, occupancy, status, facilities: Array.isArray(record.facilities) ? record.facilities : [], updated: record.occupancyUpdatedAt || record.updatedAt || null, sample: false, own: true };
  });
  const samples = st.sample ? SH_SAMPLES.map((item) => ({ ...item, address: "", updated: null, sample: true, own: false })) : [];
  return [...own, ...samples].map((item) => ({
    ...item,
    available: item.occupancy === null ? null : Math.max(0, item.capacity - item.occupancy),
    readiness: Math.round(item.facilities.filter((key) => SH_FAC.some(([k]) => k === key)).length / SH_FAC.length * 100),
    distance: st.loc && item.lat !== null ? distanceKm(st.loc.lat, st.loc.lon, item.lat, item.lon) : null
  }));
}
function shFiltered() {
  const st = MOD.st.sh;
  const q = st.q.trim().toLowerCase();
  const list = shAll().filter((item) => (st.status === "all" || item.status === st.status)
    && st.fac.every((key) => item.facilities.includes(key))
    && (!q || `${item.name} ${item.district} ${item.address}`.toLowerCase().includes(q)));
  const num = (value, fallback) => (value === null || value === undefined ? fallback : value);
  const sorters = {
    nearest: (a, b) => num(a.distance, 1e9) - num(b.distance, 1e9),
    capacity: (a, b) => num(b.available, -1) - num(a.available, -1),
    readiness: (a, b) => b.readiness - a.readiness
  };
  return list.sort(sorters[st.sort] || sorters.nearest);
}
function shItemHtml(item) {
  const st = MOD.st.sh;
  const pct = item.occupancy !== null && item.capacity > 0 ? Math.min(100, Math.round(item.occupancy / item.capacity * 100)) : null;
  const bar = pct === null ? `<span class="mod-muted">Occupancy not reported</span>` : `<div class="mod-bar ${pct >= 90 ? "bad" : pct >= 70 ? "warn" : ""}" role="img" aria-label="${pct}% occupied"><span style="width:${pct}%"></span></div>`;
  const dist = item.distance === null ? "" : `<span>${item.distance.toFixed(1)} km (straight line)</span>`;
  return `<button class="sh-item" data-mod="shSelect" data-id="${mEsc(item.id)}" aria-current="${st.sel === item.id}">
    <header><h3>${mEsc(item.name)}</h3>${modBadge(item.status, SH_STATUS[item.status])}</header>
    <div class="sh-meta"><span>${mEsc(item.district || "District not set")}</span>${dist}<span>Capacity ${item.capacity.toLocaleString("en-IN")}</span><span>${item.available === null ? "Available: not reported" : `Available ${item.available.toLocaleString("en-IN")}`}</span></div>
    ${bar}<div class="sh-meta"><span>Readiness ${item.readiness}% (recorded facilities)</span>${item.sample ? modBadge("sample", "SAMPLE") : modBadge("unknown", "Unverified local record")}</div></button>`;
}
function shListHtml() {
  const list = shFiltered();
  const all = shAll();
  if (!all.length) return modState("empty", "No shelters yet", "Add shelter records on the Shelters page, or turn on sample data to preview this screen.", `<p><button class="mod-btn primary" data-nav="shelters">Add a shelter record</button></p>`);
  if (!list.length) return modState("empty", "No shelters match", "Try clearing search or filters.", `<p><button class="mod-btn" data-mod="shClear">Clear filters</button></p>`);
  return list.map(shItemHtml).join("");
}
function shDetailHtml() {
  const st = MOD.st.sh;
  const item = shAll().find((entry) => entry.id === st.sel);
  if (!item) return `<div class="mod-card sh-detail"><h3>Shelter details</h3><p class="mod-muted">Select a shelter from the list or map to see details and a route preview.</p></div>`;
  const facs = SH_FAC.map(([key, label]) => `<span class="${item.facilities.includes(key) ? "" : "off"}">${mEsc(label)}</span>`).join("");
  const hasLoc = item.lat !== null;
  const dest = hasLoc ? `${item.lat},${item.lon}` : "";
  const osm = (engine) => `https://www.openstreetmap.org/directions?engine=${engine}&route=${st.loc ? `${st.loc.lat},${st.loc.lon}` : ""};${dest}`;
  const updated = item.sample ? "Sample data — no real update time" : item.updated ? modTime(item.updated) : "Not recorded";
  const statusEdit = item.own ? `<label class="mod-muted">Your status note (saved on this device, unverified)<br><select class="mod-input" data-mod-change="shSetStatus" data-id="${mEsc(item.id)}">${Object.entries(SH_STATUS).map(([key, label]) => `<option value="${key}" ${item.status === key ? "selected" : ""}>${mEsc(label)}</option>`).join("")}</select></label>` : "";
  let route;
  if (!hasLoc) route = `<p class="mod-muted">This shelter has no coordinates, so it cannot be shown on the map or routed to.</p>`;
  else if (!st.loc) route = `<p class="mod-muted">Share your location (optional) to see your straight-line distance. Route options below open OpenStreetMap, which does the routing.</p><div class="sh-route"><button class="mod-btn primary" data-mod="shAskLoc">⌖ Use my location</button><a class="mod-btn" href="${mEsc(osm("fossgis_osrm_car"))}" target="_blank" rel="noopener noreferrer">Driving directions ↗</a><a class="mod-btn" href="${mEsc(osm("fossgis_osrm_foot"))}" target="_blank" rel="noopener noreferrer">Walking directions ↗</a></div>`;
  else route = `<p class="mod-muted"><strong>${item.distance.toFixed(1)} km</strong> straight-line distance from your location. This is not a road route; travel time and route safety are not available because no routing service is connected to this app.</p><div class="sh-route"><button class="mod-btn" data-mod="shLine" aria-pressed="${st.line}">${st.line ? "Hide" : "Show"} straight-line preview</button><a class="mod-btn primary" href="${mEsc(osm("fossgis_osrm_car"))}" target="_blank" rel="noopener noreferrer">Driving directions ↗</a><a class="mod-btn" href="${mEsc(osm("fossgis_osrm_foot"))}" target="_blank" rel="noopener noreferrer">Walking directions ↗</a></div>`;
  return `<div class="mod-card sh-detail"><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><h3>${mEsc(item.name)}</h3>${modBadge(item.status, SH_STATUS[item.status])}</div>
    ${item.sample ? modBadge("sample", "SAMPLE — not a real shelter") : modBadge("unknown", "Unverified local record")}
    <dl><dt>District</dt><dd>${mEsc(item.district || "—")}</dd>${item.address ? `<dt>Address</dt><dd>${mEsc(item.address)}</dd>` : ""}${item.contact ? `<dt>Recorded contact (unverified)</dt><dd><a class="mod-btn success small" href="${mEsc(telLink(item.contact))}" aria-label="Call ${mEsc(item.name)} at ${mEsc(item.contact)}">☎ ${mEsc(item.contact)}</a></dd>` : ""}<dt>Capacity</dt><dd>${item.capacity.toLocaleString("en-IN")}</dd><dt>Occupancy</dt><dd>${item.occupancy === null ? "Not reported" : item.occupancy.toLocaleString("en-IN")}</dd><dt>Available</dt><dd>${item.available === null ? "Not reported" : item.available.toLocaleString("en-IN")}</dd><dt>Last updated</dt><dd>${mEsc(updated)}</dd></dl>
    <strong style="font-size:12px">Facilities &amp; accessibility</strong><div class="mod-pills">${facs}</div>
    <p class="mod-muted">Struck-through items are not recorded for this shelter. Confirm availability with local authorities before travelling.</p>${statusEdit}${route}</div>`;
}
function shRenderAll() {
  modSet("shList", shListHtml());
  modSet("shDetail", shDetailHtml());
  shDrawMap();
}
function shDrawMap() {
  const st = MOD.st.sh;
  if (!st.map) return;
  if (st.layer) st.layer.clearLayers(); else st.layer = L.layerGroup().addTo(st.map);
  const bounds = [];
  for (const item of shFiltered()) {
    if (item.lat === null) continue;
    const marker = L.marker([item.lat, item.lon], { icon: modPin(item.status, item.sample ? "S" : "⌂"), title: item.name, keyboard: true });
    marker.on("click", () => { st.sel = item.id; shRenderAll(); });
    marker.bindTooltip(`${item.name} — ${SH_STATUS[item.status]}${item.sample ? " (SAMPLE)" : ""}`);
    marker.addTo(st.layer);
    bounds.push([item.lat, item.lon]);
  }
  if (st.loc) {
    L.marker([st.loc.lat, st.loc.lon], { icon: L.divIcon({ className: "", html: `<div class="mod-me"></div>`, iconSize: [16, 16] }), title: "Your location" }).addTo(st.layer);
    bounds.push([st.loc.lat, st.loc.lon]);
  }
  const sel = shAll().find((item) => item.id === st.sel);
  if (sel && sel.lat !== null && st.loc && st.line) L.polyline([[st.loc.lat, st.loc.lon], [sel.lat, sel.lon]], { color: "#06b6d4", weight: 4, dashArray: "8 8" }).bindTooltip("Straight-line preview — not a road route").addTo(st.layer);
  if (sel && sel.lat !== null && st.fitSel !== sel.id) { st.map.setView([sel.lat, sel.lon], Math.max(st.map.getZoom(), 11)); st.fitSel = sel.id; }
  else if (!sel && bounds.length && !st.fitted) { st.map.fitBounds(bounds, { padding: [30, 30], maxZoom: 11 }); st.fitted = true; }
}
function shRender() {
  const st = MOD.st.sh;
  const cache = readStorage("modShelterCache", null);
  const chips = [["all", "All"], ...Object.entries(SH_STATUS).filter(([key]) => key !== "unknown")].map(([key, label]) => `<button class="mod-chip" data-mod="shStatus" data-v="${key}" aria-pressed="${st.status === key}">${mEsc(label)}</button>`).join("");
  const facChips = SH_FAC.filter(([key]) => ["water", "power", "medical", "accessible", "food"].includes(key)).map(([key, label]) => `<button class="mod-chip" data-mod="shFac" data-v="${key}" aria-pressed="${st.fac.includes(key)}">${mEsc(label)}</button>`).join("");
  return `${heading("navShelterHub", "shSub", `<button class="mod-btn primary" data-mod="shAskLoc">⌖ ${st.loc ? "Refresh my location" : "Use my location"}</button>`)}
    ${modOfflineBanner()}
    ${st.sample ? modSampleBanner("Sample shelters are illustrative only. Names, capacity, status and positions are not real and must not be used to make decisions.") : ""}
    <div class="notice-banner"><span aria-hidden="true">ⓘ</span><span>Location is requested only when you press “Use my location”. It stays in this browser and is never saved or sent. Shelter availability and route safety are not verified by this app${st.locStatus === "denied" ? ". <strong>Location permission was denied.</strong>" : st.locStatus === "error" ? ". <strong>Your location could not be determined.</strong>" : ""}.</span></div>
    <div class="mod-toolbar"><input class="mod-input" type="search" id="shQ" placeholder="Search shelter, district or address" aria-label="Search shelters" value="${mEsc(st.q)}" data-mod-input="shSearch">
      <select class="mod-input" aria-label="Sort shelters" data-mod-change="shSort"><option value="nearest" ${st.sort === "nearest" ? "selected" : ""}>Sort: nearest</option><option value="capacity" ${st.sort === "capacity" ? "selected" : ""}>Sort: available capacity</option><option value="readiness" ${st.sort === "readiness" ? "selected" : ""}>Sort: readiness</option></select></div>
    <div class="mod-toolbar" role="group" aria-label="Filter by status">${chips}</div>
    <div class="mod-toolbar" role="group" aria-label="Filter by facility">${facChips}
      <label class="mod-muted"><input type="checkbox" data-mod-change="shSample" ${st.sample ? "checked" : ""}> Show sample data</label>
      <button class="mod-btn small" data-mod="shSave">⇩ Save for offline</button></div>
    <p class="mod-muted" id="shCacheNote">${cache ? `Offline copy saved ${mEsc(modTime(cache.at))} (${cache.count} shelters, ${cache.tiles || 0} map tiles).` : "No offline copy saved yet."}${st.sort === "nearest" && !st.loc ? " Sorting by nearest needs your location." : ""}</p>
    <div class="sh-viewtoggle" role="group" aria-label="Switch list or map"><button class="mod-chip" data-mod="shView" data-v="list" aria-pressed="${st.view === "list"}">List</button><button class="mod-chip" data-mod="shView" data-v="map" aria-pressed="${st.view === "map"}">Map</button></div>
    <div class="sh-grid" id="shGrid" data-view="${st.view}">
      <div class="sh-listcol"><div class="sh-list" id="shList" aria-live="polite">${shListHtml()}</div></div>
      <div class="sh-side"><div class="sh-map" id="shMap" role="application" aria-label="Shelter map"></div><div id="shDetail">${shDetailHtml()}</div></div></div>`;
}
async function shInitMap() {
  const st = MOD.st.sh;
  st.map = null; st.layer = null; st.fitted = false; st.fitSel = null;
  const map = await modMapCreate("shMap", [20.6, 85.6], 7);
  if (!map) return;
  st.map = map;
  shDrawMap();
}
function shLocate() {
  const st = MOD.st.sh;
  if (!navigator.geolocation) { st.locStatus = "error"; showToast("This browser does not support location."); return; }
  showToast("Waiting for your browser’s location prompt…");
  navigator.geolocation.getCurrentPosition((pos) => {
    st.loc = { lat: pos.coords.latitude, lon: pos.coords.longitude, at: Date.now() };
    st.locStatus = "ready";
    if (currentPage === "shelterhub") { st.fitted = false; renderPage(); }
  }, (err) => {
    st.locStatus = err.code === 1 ? "denied" : "error";
    if (currentPage === "shelterhub") renderPage();
  }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 60000 });
}

MOD.act.shAskLoc = () => openModal("Use your location?", `<p>AapadaLens will ask your browser for your current position to show distances to shelters. Your location is used on this page only and is not saved or sent anywhere. You can say no and still browse every shelter.</p><div class="modal-actions"><button class="mod-btn" data-action="close-modal">Not now</button><button class="mod-btn primary" data-mod="shLocGo">Allow location</button></div>`);
MOD.act.shLocGo = () => { closeModal(); shLocate(); };
MOD.act.shSelect = (el) => {
  const st = MOD.st.sh;
  st.sel = el.dataset.id;
  if (window.matchMedia("(max-width:900px)").matches) { st.view = "map"; renderPage(); } else shRenderAll();
};
MOD.act.shStatus = (el) => { MOD.st.sh.status = el.dataset.v; renderPage(); };
MOD.act.shFac = (el) => { const st = MOD.st.sh; const key = el.dataset.v; st.fac = st.fac.includes(key) ? st.fac.filter((k) => k !== key) : [...st.fac, key]; renderPage(); };
MOD.act.shClear = () => { Object.assign(MOD.st.sh, { q: "", status: "all", fac: [] }); renderPage(); };
MOD.act.shView = (el) => { MOD.st.sh.view = el.dataset.v; renderPage(); };
MOD.act.shLine = () => { const st = MOD.st.sh; st.line = !st.line; shRenderAll(); };
MOD.input.shSearch = (el) => { MOD.st.sh.q = el.value; modSet("shList", shListHtml()); shDrawMap(); };
MOD.input.shSort = (el) => { MOD.st.sh.sort = el.value; shRenderAll(); };
MOD.input.shSample = (el) => { const st = MOD.st.sh; st.sample = el.checked; if (!st.sample && String(st.sel).startsWith("smp-")) st.sel = null; renderPage(); };
MOD.input.shSetStatus = (el) => {
  const overrides = readStorage("shelterStatus", {}) || {};
  overrides[el.dataset.id] = el.value;
  if (writeStorage("shelterStatus", overrides)) { shRenderAll(); showToast("Status note saved on this device."); }
};
MOD.act.shSave = async (el) => {
  const st = MOD.st.sh;
  const items = shAll().map(({ distance, ...rest }) => rest);
  el.disabled = true;
  let tiles = 0;
  if (st.map && navigator.onLine) {
    const bounds = st.map.getBounds(), zoom = Math.min(st.map.getZoom(), 12);
    const toTile = (lat, lon) => ({ x: Math.floor((lon + 180) / 360 * 2 ** zoom), y: Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * 2 ** zoom) });
    const a = toTile(bounds.getNorth(), bounds.getWest()), b = toTile(bounds.getSouth(), bounds.getEast());
    const urls = [];
    for (let x = a.x; x <= b.x && urls.length < 25; x += 1) for (let y = a.y; y <= b.y && urls.length < 25; y += 1) urls.push(`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`);
    const results = await Promise.allSettled(urls.map((url) => fetch(url, { mode: "cors" })));
    tiles = results.filter((r) => r.status === "fulfilled" && r.value.ok).length;
  }
  el.disabled = false;
  if (writeStorage("modShelterCache", { at: new Date().toISOString(), count: items.length, tiles, items })) {
    modSet("shCacheNote", `Offline copy saved just now (${items.length} shelters, ${tiles} map tiles of the current view). Only the area you were viewing is cached.`);
    showToast("Saved for offline use.");
  }
};

modRegister("shelterhub", shRender, shInitMap);
