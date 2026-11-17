/* AapadaLens module 3: emergency services, evacuation checklist and safety resources (works offline, data saved on this device) */
const SF_NUMBERS = [
  ["112", "Emergency (all services)", "red"], ["100", "Police", "blue"], ["101", "Fire service", "amber"], ["108", "Ambulance", "green"],
  ["1077", "Disaster management control room", "amber"], ["1098", "Child helpline", "blue"], ["181", "Women helpline", "blue"]
];
const SF_CHECK = [
  ["contacts", "Emergency contacts", "ଜରୁରୀ ଯୋଗାଯୋଗ", [["c1", "Family and neighbour phone numbers written on paper", "ପରିବାର ଓ ପଡ଼ୋଶୀଙ୍କ ଫୋନ୍ ନମ୍ବର କାଗଜରେ ଲେଖିଛି"], ["c2", "District control-room number saved", "ଜିଲ୍ଲା କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍ ନମ୍ବର ସେଭ୍ କରିଛି"]]],
  ["docs", "Documents & records", "ଦଲିଲ ଓ ରେକର୍ଡ", [["d1", "ID documents (Aadhaar, voter ID, etc.)", "ପରିଚୟ ପତ୍ର (ଆଧାର, ଭୋଟର ଆଇଡି ଇତ୍ୟାଦି)"], ["d2", "Land, house, bank and insurance papers", "ଜମି, ଘର, ବ୍ୟାଙ୍କ ଓ ବୀମା କାଗଜ"], ["d3", "Medical records and prescriptions", "ଚିକିତ୍ସା ରେକର୍ଡ ଓ ପ୍ରେସ୍କ୍ରିପସନ୍"], ["d4", "Documents in a waterproof bag", "ଜଳରୋଧୀ ବ୍ୟାଗ୍‌ରେ ଦଲିଲ"]]],
  ["aid", "First aid & medicines", "ପ୍ରାଥମିକ ଚିକିତ୍ସା ଓ ଔଷଧ", [["a1", "First-aid kit", "ପ୍ରାଥମିକ ଚିକିତ୍ସା କିଟ୍"], ["a2", "Regular medicines (at least 7 days)", "ନିୟମିତ ଔଷଧ (ଅତି କମ୍ 7 ଦିନ)"], ["a3", "ORS packets", "ଓଆରଏସ୍ ପ୍ୟାକେଟ୍"]]],
  ["supplies", "Water, food & light", "ପାଣି, ଖାଦ୍ୟ ଓ ଆଲୋକ", [["s1", "Drinking water (3 days)", "ପିଇବା ପାଣି (3 ଦିନ)"], ["s2", "Dry food (3 days)", "ଶୁଖିଲା ଖାଦ୍ୟ (3 ଦିନ)"], ["s3", "Flashlight / torch", "ଟର୍ଚ୍ଚ"], ["s4", "Spare batteries", "ଅତିରିକ୍ତ ବ୍ୟାଟେରୀ"]]],
  ["power", "Power & essentials", "ବିଦ୍ୟୁତ୍ ଓ ଆବଶ୍ୟକ ସାମଗ୍ରୀ", [["p1", "Power bank charged", "ପାୱାର ବ୍ୟାଙ୍କ ଚାର୍ଜ ହୋଇଛି"], ["p2", "Wallet, cash and essential supplies", "ୱାଲେଟ୍, ନଗଦ ଓ ଜରୁରୀ ସାମଗ୍ରୀ"]]]
];
const SF_GUIDES = [
  { id: "cyclone", cat: "Cyclone", catOr: "ବାତ୍ୟା", title: "Cyclone safety", titleOr: "ବାତ୍ୟା ସୁରକ୍ଷା", en: ["Follow official warnings from IMD and your district administration.", "Close doors and windows, stay away from glass, and stay indoors.", "Move to the nearest shelter early if told to evacuate or if your home is not safe.", "Keep your emergency kit, documents, torch and a charged phone together.", "Do not go out during the calm “eye” of the storm — strong winds return suddenly.", "After the storm, keep away from fallen power lines and flood water."], or: ["IMD ଓ ଜିଲ୍ଲା ପ୍ରଶାସନଙ୍କ ସରକାରୀ ସତର୍କତା ଅନୁସରଣ କରନ୍ତୁ।", "ଦ୍ୱାର ଓ ଝରକା ବନ୍ଦ କରନ୍ତୁ, କାଚ ପାଖରୁ ଦୂରେଇ ରୁହନ୍ତୁ ଏବଂ ଘର ଭିତରେ ରୁହନ୍ତୁ।", "ଘର ନିରାପଦ ନହେଲେ କିମ୍ବା ଖାଲି କରିବାକୁ କୁହାଗଲେ ଶୀଘ୍ର ନିକଟସ୍ଥ ଆଶ୍ରୟସ୍ଥଳକୁ ଯାଆନ୍ତୁ।", "ଜରୁରୀ କିଟ୍, ଦଲିଲ, ଟର୍ଚ୍ଚ ଓ ଚାର୍ଜ ହୋଇଥିବା ଫୋନ୍ ଏକାଠି ରଖନ୍ତୁ।", "ବାତ୍ୟାର ଚକ୍ଷୁ (ଶାନ୍ତ ସମୟ)ରେ ବାହାରକୁ ଯାଆନ୍ତୁ ନାହିଁ; ପ୍ରବଳ ପବନ ହଠାତ୍ ଫେରିଆସେ।", "ବାତ୍ୟା ପରେ ଛିଣ୍ଡା ବିଦ୍ୟୁତ୍ ତାର ଓ ବନ୍ୟାଜଳରୁ ଦୂରେଇ ରୁହନ୍ତୁ।"] },
  { id: "flood", cat: "Flood", catOr: "ବନ୍ୟା", title: "Flood preparedness", titleOr: "ବନ୍ୟା ପ୍ରସ୍ତୁତି", en: ["Move to higher ground early; do not wait for the water to rise.", "Never walk, swim or drive through flood water.", "Switch off electricity at the mains if it is safe to do so; keep away from wet electrical equipment.", "Drink only boiled or treated water and throw away food touched by flood water.", "Keep documents and medicines in waterproof bags."], or: ["ଉଚ୍ଚ ସ୍ଥାନକୁ ଶୀଘ୍ର ଯାଆନ୍ତୁ; ପାଣି ବଢ଼ିବା ପର୍ଯ୍ୟନ୍ତ ଅପେକ୍ଷା କରନ୍ତୁ ନାହିଁ।", "ବନ୍ୟାଜଳରେ କେବେ ଚାଲନ୍ତୁ, ପହଁରନ୍ତୁ କିମ୍ବା ଗାଡ଼ି ଚଲାନ୍ତୁ ନାହିଁ।", "ନିରାପଦ ହେଲେ ମେନ୍ ସ୍ୱିଚ୍‌ରୁ ବିଦ୍ୟୁତ୍ ବନ୍ଦ କରନ୍ତୁ; ଓଦା ବିଦ୍ୟୁତ୍ ଉପକରଣରୁ ଦୂରେଇ ରୁହନ୍ତୁ।", "କେବଳ ଫୁଟାଇଥିବା କିମ୍ବା ଶୋଧିତ ପାଣି ପିଅନ୍ତୁ; ବନ୍ୟାଜଳ ଛୁଇଁଥିବା ଖାଦ୍ୟ ଫିଙ୍ଗିଦିଅନ୍ତୁ।", "ଦଲିଲ ଓ ଔଷଧ ଜଳରୋଧୀ ବ୍ୟାଗ୍‌ରେ ରଖନ୍ତୁ।"] },
  { id: "evac", cat: "Evacuation", catOr: "ଉଦ୍ଧାର", title: "Emergency evacuation", titleOr: "ଜରୁରୀ ଉଦ୍ଧାର", en: ["Leave when authorities tell you to, and go early, in daylight if possible.", "Carry your checklist items: ID, medicines, water, food, torch, power bank and cash.", "Switch off gas and electricity and lock your home.", "Tell a family member or neighbour where you are going.", "Help children, older people and people with disabilities first.", "Use known routes and avoid flooded roads and fallen trees."], or: ["କର୍ତ୍ତୃପକ୍ଷ କହିଲେ ଶୀଘ୍ର ବାହାରନ୍ତୁ, ସମ୍ଭବ ହେଲେ ଦିନବେଳା।", "ଚେକ୍‌ଲିଷ୍ଟ ସାମଗ୍ରୀ ନିଅନ୍ତୁ: ପରିଚୟ ପତ୍ର, ଔଷଧ, ପାଣି, ଖାଦ୍ୟ, ଟର୍ଚ୍ଚ, ପାୱାର ବ୍ୟାଙ୍କ ଓ ନଗଦ।", "ଗ୍ୟାସ୍ ଓ ବିଦ୍ୟୁତ୍ ବନ୍ଦ କରି ଘରେ ତାଲା ପକାନ୍ତୁ।", "କେଉଁଠାକୁ ଯାଉଛନ୍ତି ତାହା ପରିବାର ସଦସ୍ୟ କିମ୍ବା ପଡ଼ୋଶୀଙ୍କୁ କୁହନ୍ତୁ।", "ପିଲା, ବୟସ୍କ ଓ ଦିବ୍ୟାଙ୍ଗଙ୍କୁ ପ୍ରଥମେ ସାହାଯ୍ୟ କରନ୍ତୁ।", "ଜଣାଶୁଣା ରାସ୍ତା ବ୍ୟବହାର କରନ୍ତୁ; ବନ୍ୟାଗ୍ରସ୍ତ ରାସ୍ତା ଓ ପଡ଼ିଥିବା ଗଛରୁ ଦୂରେଇ ରୁହନ୍ତୁ।"] },
  { id: "firstaid", cat: "First aid", catOr: "ପ୍ରାଥମିକ ଚିକିତ୍ସା", title: "First-aid basics", titleOr: "ପ୍ରାଥମିକ ଚିକିତ୍ସା ମୌଳିକ", en: ["For serious injury call 112 or 108 and stay with the person.", "Heavy bleeding: press firmly on the wound with a clean cloth. If it soaks through, add more cloth on top.", "Burns: cool with clean running water for 20 minutes; do not use ice or ointments; cover loosely.", "Sprain or suspected fracture: keep the limb still and supported; do not try to straighten it.", "If someone is not breathing and you are trained, start CPR with firm, fast chest compressions until help arrives.", "Prepare a kit: bandages, gauze, antiseptic, gloves, ORS and personal medicines."], or: ["ଗୁରୁତର ଆଘାତରେ 112 କିମ୍ବା 108 କୁ ଡାକନ୍ତୁ ଓ ବ୍ୟକ୍ତିଙ୍କ ପାଖରେ ରୁହନ୍ତୁ।", "ଅଧିକ ରକ୍ତସ୍ରାବ: ସଫା କପଡ଼ାରେ କ୍ଷତ ଦୃଢ଼ ଭାବେ ଦବାନ୍ତୁ। ଭିଜିଗଲେ ଉପରେ ଆହୁରି କପଡ଼ା ଦିଅନ୍ତୁ।", "ପୋଡ଼ା: ସଫା ବହୁଥିବା ପାଣିରେ 20 ମିନିଟ୍ ଥଣ୍ଡା କରନ୍ତୁ; ବରଫ କିମ୍ବା ମଲମ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ; ହାଲୁକା ଭାବେ ଘୋଡ଼ାନ୍ତୁ।", "ମଚକା କିମ୍ବା ହାଡ଼ ଭାଙ୍ଗିବାର ସନ୍ଦେହ: ଅଙ୍ଗକୁ ସ୍ଥିର ଓ ସହାୟତା ଦିଅନ୍ତୁ; ସିଧା କରିବାକୁ ଚେଷ୍ଟା କରନ୍ତୁ ନାହିଁ।", "କେହି ଶ୍ୱାସ ନେଉନଥିଲେ ଏବଂ ଆପଣ ପ୍ରଶିକ୍ଷିତ ହୋଇଥିଲେ, ସହାୟତା ଆସିବା ପର୍ଯ୍ୟନ୍ତ ଛାତିରେ ଦୃଢ଼ ଓ ଦ୍ରୁତ ଚାପ ଦିଅନ୍ତୁ (CPR)।", "କିଟ୍ ପ୍ରସ୍ତୁତ ରଖନ୍ତୁ: ବ୍ୟାଣ୍ଡେଜ୍, ଗଜ୍, ଆଣ୍ଟିସେପ୍ଟିକ୍, ଗ୍ଲୋଭ୍ସ୍, ଓଆରଏସ୍ ଓ ନିଜ ଔଷଧ।"] },
  { id: "hazards", cat: "Air quality & other hazards", catOr: "ବାୟୁ ଗୁଣବତ୍ତା ଓ ଅନ୍ୟ ବିପଦ", title: "Air quality, heat and lightning", titleOr: "ବାୟୁ ଗୁଣବତ୍ତା, ଗ୍ରୀଷ୍ମ ଓ ବଜ୍ରପାତ", en: ["Poor air quality or smoke: stay indoors, keep windows closed, and wear a well-fitting N95/FFP2 mask if you must go out.", "Heatwave: drink water often, rest in shade, avoid outdoor work at midday. For heatstroke (confusion, very hot dry skin) call 108.", "Lightning: shelter inside a building; avoid open fields, tall trees and water.", "Check official sources for air-quality and weather warnings before travelling."], or: ["ଖରାପ ବାୟୁ ବା ଧୂଆଁ: ଘର ଭିତରେ ରୁହନ୍ତୁ, ଝରକା ବନ୍ଦ ରଖନ୍ତୁ; ବାହାରକୁ ଯିବାକୁ ପଡ଼ିଲେ ଠିକ୍ ଭାବେ ଲାଗୁଥିବା N95/FFP2 ମାସ୍କ ପିନ୍ଧନ୍ତୁ।", "ଗ୍ରୀଷ୍ମ ପ୍ରବାହ: ବାରମ୍ବାର ପାଣି ପିଅନ୍ତୁ, ଛାଇରେ ବିଶ୍ରାମ ନିଅନ୍ତୁ, ମଧ୍ୟାହ୍ନରେ ବାହାର କାମ ଏଡ଼ାନ୍ତୁ। ଲୁ ଲାଗିଲେ (ଦ୍ୱନ୍ଦ୍ୱ, ଅତି ଗରମ ଶୁଖିଲା ଚର୍ମ) 108 କୁ ଡାକନ୍ତୁ।", "ବଜ୍ରପାତ: ଘର ଭିତରେ ଆଶ୍ରୟ ନିଅନ୍ତୁ; ଖୋଲା ପଡ଼ିଆ, ଉଚ୍ଚ ଗଛ ଓ ପାଣିରୁ ଦୂରେଇ ରୁହନ୍ତୁ।", "ଯାତ୍ରା ପୂର୍ବରୁ ବାୟୁ ଗୁଣବତ୍ତା ଓ ପାଣିପାଗ ସତର୍କତା ପାଇଁ ସରକାରୀ ସୂଚନା ଦେଖନ୍ତୁ।"] }
];
MOD.st.sf = { lang: null, q: "", cat: "all", err: "", open: [] };
function sfLang() { return MOD.st.sf.lang || (language === "or" ? "or" : "en"); }
function sfChecks() { const v = readStorage("modChecklist", null); return { done: Array.isArray(v?.done) ? v.done : [], custom: Array.isArray(v?.custom) ? v.custom : [] }; }
function sfContacts() { const v = readStorage("modContacts", []); return Array.isArray(v) ? v : []; }

function sfTabs(page) {
  const tabs = [["services", "☎ Emergency services"], ["evacchecklist", "☑ Evacuation checklist"], ["safetyguides", "✚ Safety guides"]];
  return `<div class="sf-tabs" role="tablist">${tabs.map(([p, l]) => `<button class="mod-tab" role="tab" data-nav="${p}" aria-selected="${p === page}">${mEsc(l)}</button>`).join("")}</div>`;
}
function sfServices() {
  const contacts = sfContacts();
  const list = contacts.length ? contacts.map((c) => `<div class="sf-contact"><div><strong>${mEsc(c.name)}</strong><br><span class="mod-muted">${mEsc(c.relation || "Personal contact")} · ${mEsc(c.phone)}</span></div><div><a class="mod-btn success small" href="${telLink(c.phone)}" aria-label="Call ${mEsc(c.name)}">📞 Call</a> <button class="mod-btn small" data-mod="sfDelContact" data-id="${mEsc(c.id)}" aria-label="Delete ${mEsc(c.name)}">✕</button></div></div>`).join("") : modState("empty", "No personal contacts yet", "Add family, neighbours and your district control-room number below.");
  return `<a class="sf-sos" href="tel:112" aria-label="Call emergency number 112"><strong>SOS · 112</strong><span>Tap to open your phone dialer. This app does not send SOS messages or share your location.</span></a>
    <div class="sf-numbers">${SF_NUMBERS.map(([n, label, color]) => `<a class="sf-num ${color}" href="tel:${n}" aria-label="Call ${mEsc(label)} ${n}"><strong>${n}</strong><small>${mEsc(label)}</small><small>${modBadge("model", "National number")}</small></a>`).join("")}</div>
    <p class="mod-muted">These are national numbers. Numbers and availability can differ by district — confirm with your district administration and add your local control-room number as a personal contact below. A call needs mobile network coverage.</p>
    <div class="sf-two"><section class="mod-card"><h2>Personal emergency contacts</h2>${list}</section>
    <section class="mod-card"><h2>Add a contact</h2><form class="sf-form" data-mod-submit="sfAddContact" novalidate><label>Name<input class="mod-input" name="name" maxlength="60" autocomplete="off" required></label><label>Phone number<input class="mod-input" name="phone" inputmode="tel" maxlength="20" placeholder="e.g. 9437012345" required></label><label>Relation / label (optional)<input class="mod-input" name="relation" maxlength="40"></label><div class="sf-err" role="alert" id="sfErr">${mEsc(MOD.st.sf.err)}</div><button class="mod-btn primary" type="submit">Save contact</button></form></section></div>`;
}
function sfChecklist() {
  const { done, custom } = sfChecks();
  const or = sfLang() === "or";
  const all = [...SF_CHECK.flatMap(([, , , items]) => items.map((i) => i[0])), ...custom.map((c) => c.id)];
  const count = all.filter((id) => done.includes(id)).length;
  const pct = all.length ? Math.round(count / all.length * 100) : 0;
  const row = (id, text, removable) => `<div class="sf-check ${done.includes(id) ? "done" : ""}"><input type="checkbox" id="chk-${mEsc(id)}" data-mod-change="sfToggle" data-id="${mEsc(id)}" ${done.includes(id) ? "checked" : ""}><label for="chk-${mEsc(id)}" style="flex:1"><span>${mEsc(text)}</span></label>${removable ? `<button data-mod="sfDelItem" data-id="${mEsc(id)}" aria-label="Remove ${mEsc(text)}">✕</button>` : ""}</div>`;
  const groups = SF_CHECK.map(([, en, od, items]) => `<div class="sf-group"><h3>${mEsc(or ? od : en)}</h3>${items.map(([id, e, o]) => row(id, or ? o : e, false)).join("")}</div>`).join("");
  return `<div class="sf-progress"><div class="score-ring" style="--pct:${pct}"><span>${pct}%</span></div><div><strong>${count} of ${all.length} items ready</strong><div class="mod-muted">Progress is saved on this device and works offline.</div></div></div>
    <div class="mod-toolbar"><button class="mod-chip" data-mod="sfLang" data-v="en" aria-pressed="${!or}">English</button><button class="mod-chip" data-mod="sfLang" data-v="or" aria-pressed="${or}">ଓଡ଼ିଆ</button><button class="mod-btn small" data-mod="sfPrint">🖨 Print / save as PDF</button><button class="mod-btn small" data-mod="sfReset">↺ Reset progress</button></div>
    <div class="sf-two"><div>${groups}</div><div><section class="mod-card"><h2>Your own items</h2>${custom.length ? custom.map((c) => row(c.id, c.text, true)).join("") : `<p class="mod-muted">No custom items yet.</p>`}
    <form class="sf-form" data-mod-submit="sfAddItem" novalidate style="margin-top:10px"><label>Add an item<input class="mod-input" name="text" maxlength="80" placeholder="e.g. Baby food" required></label><div class="sf-err" role="alert" id="sfErr">${mEsc(MOD.st.sf.err)}</div><button class="mod-btn primary" type="submit">＋ Add item</button></form></section></div></div>`;
}
function sfGuideList() {
  const st = MOD.st.sf, or = sfLang() === "or", q = st.q.trim().toLowerCase();
  const items = SF_GUIDES.filter((g) => (st.cat === "all" || g.id === st.cat) && (!q || `${g.title} ${g.titleOr} ${g.en.join(" ")} ${g.or.join(" ")}`.toLowerCase().includes(q)));
  if (!items.length) return modState("empty", "No guides match", "Try a different search or category.");
  return items.map((g) => `<details class="sf-guide" data-gid="${g.id}" ${st.open.includes(g.id) ? "open" : ""}><summary>${mEsc(or ? g.titleOr : g.title)}<span class="cat">${mEsc(or ? g.catOr : g.cat)}</span></summary><ol>${(or ? g.or : g.en).map((s) => `<li>${mEsc(s)}</li>`).join("")}</ol></details>`).join("");
}
function sfGuides() {
  const st = MOD.st.sf, or = sfLang() === "or";
  return `${modSampleBanner("These guides are general preparedness advice, not medical or official instructions. Always follow orders from local authorities and emergency services. Odia text needs native-speaker review.").replace("SAMPLE DATA", "NOTE")}
    <div class="mod-toolbar"><input class="mod-input" type="search" placeholder="Search guides" aria-label="Search guides" value="${mEsc(st.q)}" data-mod-input="sfSearch"><button class="mod-chip" data-mod="sfLang" data-v="en" aria-pressed="${!or}">English</button><button class="mod-chip" data-mod="sfLang" data-v="or" aria-pressed="${or}">ଓଡ଼ିଆ</button><button class="mod-btn small" data-mod="sfDownload">⇩ Download offline guides</button></div>
    <div class="mod-toolbar" role="group" aria-label="Guide category"><button class="mod-chip" data-mod="sfCat" data-v="all" aria-pressed="${st.cat === "all"}">All</button>${SF_GUIDES.map((g) => `<button class="mod-chip" data-mod="sfCat" data-v="${g.id}" aria-pressed="${st.cat === g.id}">${mEsc(or ? g.catOr : g.cat)}</button>`).join("")}</div>
    <div id="sfGuides">${sfGuideList()}</div><p class="mod-muted">Guides are built into the app, so they stay available offline once the app has loaded.</p>`;
}
function sfRender(page) {
  const titles = { services: "navServices", evacchecklist: "navEvacList", safetyguides: "navGuides" };
  MOD.st.sf.err = "";
  const body = page === "services" ? sfServices() : page === "evacchecklist" ? sfChecklist() : sfGuides();
  return `${heading(titles[page], "svSub")}${modOfflineBanner()}${sfTabs(page)}${body}`;
}

MOD.act.sfLang = (el) => { MOD.st.sf.lang = el.dataset.v; renderPage(); };
MOD.act.sfCat = (el) => { MOD.st.sf.cat = el.dataset.v; renderPage(); };
MOD.input.sfSearch = (el) => { MOD.st.sf.q = el.value; modSet("sfGuides", sfGuideList()); };
document.addEventListener("toggle", (event) => {
  const d = event.target;
  if (!(d instanceof HTMLDetailsElement) || !d.dataset.gid) return;
  const open = new Set(MOD.st.sf.open);
  if (d.open) open.add(d.dataset.gid); else open.delete(d.dataset.gid);
  MOD.st.sf.open = [...open];
}, true);
MOD.act.sfDownload = () => {
  const or = sfLang() === "or";
  const text = [`AapadaLens — ${or ? "ଅଫଲାଇନ୍ ସୁରକ୍ଷା ଗାଇଡ୍" : "Offline safety guides"}`, "General preparedness advice. Follow local authorities and emergency services. Emergency: 112", ""]
    .concat(SF_GUIDES.flatMap((g) => [(or ? g.titleOr : g.title).toUpperCase(), ...(or ? g.or : g.en).map((s, i) => `${i + 1}. ${s}`), ""])).join("\r\n");
  const url = URL.createObjectURL(new Blob(["\ufeff" + text], { type: "text/plain;charset=utf-8" }));
  const a = document.createElement("a");
  a.href = url; a.download = `aapadalens-safety-guides-${or ? "odia" : "english"}.txt`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  showToast("Guide file downloaded.");
};
MOD.act.sfPrint = () => window.print();
MOD.act.sfReset = () => { const c = sfChecks(); c.done = []; if (writeStorage("modChecklist", c)) { renderPage(); showToast("Checklist progress reset."); } };
MOD.input.sfToggle = (el) => {
  const c = sfChecks(), set = new Set(c.done);
  if (el.checked) set.add(el.dataset.id); else set.delete(el.dataset.id);
  c.done = [...set];
  if (writeStorage("modChecklist", c)) renderPage();
};
MOD.act.sfDelItem = (el) => { const c = sfChecks(); c.custom = c.custom.filter((i) => i.id !== el.dataset.id); c.done = c.done.filter((id) => id !== el.dataset.id); if (writeStorage("modChecklist", c)) renderPage(); };
MOD.submit.sfAddItem = (form) => {
  const text = String(new FormData(form).get("text") || "").trim().replace(/\s+/g, " ");
  const c = sfChecks();
  const fail = (m) => { MOD.st.sf.err = m; modSet("sfErr", mEsc(m)); };
  if (text.length < 2) return fail("Enter at least 2 characters.");
  if (text.length > 80) return fail("Keep it under 80 characters.");
  if (c.custom.some((i) => i.text.toLowerCase() === text.toLowerCase())) return fail("That item is already on your list.");
  c.custom.push({ id: `u-${Date.now().toString(36)}`, text });
  if (writeStorage("modChecklist", c)) { renderPage(); showToast("Item added."); }
};
MOD.submit.sfAddContact = (form) => {
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim().replace(/\s+/g, " "), phone = String(data.get("phone") || "").trim(), relation = String(data.get("relation") || "").trim();
  const fail = (m) => { MOD.st.sf.err = m; modSet("sfErr", mEsc(m)); };
  const digits = phone.replace(/\D/g, "");
  if (name.length < 2) return fail("Enter the contact’s name (at least 2 characters).");
  if (!/^\+?[0-9][0-9\s-]*$/.test(phone) || digits.length < 3 || digits.length > 15) return fail("Enter a valid phone number (digits, spaces or dashes; 3–15 digits).");
  const list = sfContacts();
  if (list.some((c) => c.phone.replace(/\D/g, "") === digits)) return fail("That number is already saved.");
  if (list.length >= 30) return fail("You can save up to 30 contacts.");
  list.push({ id: `k-${Date.now().toString(36)}`, name, phone, relation });
  if (writeStorage("modContacts", list)) { renderPage(); showToast("Contact saved on this device."); }
};
MOD.act.sfDelContact = (el) => { if (!window.confirm("Delete this contact?")) return; if (writeStorage("modContacts", sfContacts().filter((c) => c.id !== el.dataset.id))) renderPage(); };

for (const page of ["services", "evacchecklist", "safetyguides"]) modRegister(page, () => sfRender(page));
