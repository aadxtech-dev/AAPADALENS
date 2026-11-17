/* Phase 3c/3d: community, volunteers, help, impact, preferences, offline/PWA, network status (features 50-55, 56-65, 90-97, 101-102, 121-135) */
function isDataImage(value) { return typeof value === "string" && /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(value); }

/* ---------- list stores ---------- */
const CAMPAIGN_KINDS = [["drill", "ckDrill"], ["awareness", "ckAwareness"], ["cleanup", "ckCleanup"], ["training", "ckTraining"], ["other", "kOther"]];
const DIR_KINDS = [["hospital", "dkHospital"], ["pharmacy", "dkPharmacy"], ["food", "dkFood"], ["water", "dkWater"], ["transport", "dkTransport"], ["other", "kOther"]];
LISTS.vol = {
  title: "volAdd", addLabel: "volAdd", icon: "☺", empty: "volEmpty",
  fields: [
    { name: "name", label: "fName", required: true, max: 80 },
    { name: "phone", label: "fPhone", type: "tel", max: 20 },
    { name: "district", label: "fDistrict", max: 60 },
    { name: "skills", label: "fSkills", max: 160, full: true },
    { name: "avail", label: "fAvail", max: 80 }
  ],
  card: (item) => `<h3>${esc(item.name)}</h3><p>${[item.district, item.skills, item.avail].filter(Boolean).map(esc).join(" · ")}</p>${item.phone ? `<a class="button small" href="${telLink(item.phone)}">☎ ${esc(item.phone)}</a>` : ""}`
};
LISTS.vtask = {
  title: "taskAdd", addLabel: "taskAdd", icon: "☑", empty: "taskEmpty",
  fields: [
    { name: "title", label: "fTitle", required: true, max: 120, full: true },
    { name: "shelter", label: "fShelter", type: "shelter" },
    { name: "assignee", label: "fAssignee", type: "volunteer" },
    { name: "due", label: "fDue", type: "date" },
    { name: "status", label: "fStatus", type: "select", options: [["open", "ts_open"], ["doing", "ts_doing"], ["done", "ts_done"]] }
  ],
  card: (item) => {
    const who = getList("vol").find((v) => v.id === item.assignee)?.name;
    return `<h3>${esc(item.title)}</h3><p>${[t(`ts_${item.status || "open"}`), item.shelter ? shelterName(item.shelter) : "", who || "", item.due || ""].filter(Boolean).map(esc).join(" · ")}</p>`;
  }
};
LISTS.campaign = {
  title: "campAdd", addLabel: "campAdd", icon: "✺", empty: "campEmpty",
  fields: [
    { name: "title", label: "fTitle", required: true, max: 120, full: true },
    { name: "kind", label: "fType", type: "select", options: CAMPAIGN_KINDS },
    { name: "date", label: "fDate", type: "date" },
    { name: "place", label: "fPlace", max: 120 },
    { name: "note", label: "fNote", type: "textarea", max: 300, full: true }
  ],
  card: (item) => `<h3>${esc(item.title)}</h3><p>${[t(CAMPAIGN_KINDS.find((k) => k[0] === item.kind)?.[1] || "kOther"), item.date, item.place].filter(Boolean).map(esc).join(" · ")}</p>${item.note ? `<p>${esc(item.note)}</p>` : ""}`
};
LISTS.localinfo = {
  title: "infoAdd", addLabel: "infoAdd", icon: "ⓘ", empty: "infoEmpty",
  fields: [
    { name: "title", label: "fTitle", required: true, max: 120, full: true },
    { name: "note", label: "fNote", type: "textarea", max: 300, full: true },
    { name: "phone", label: "fPhone", type: "tel", max: 20 },
    { name: "source", label: "fSource", max: 120 }
  ],
  card: (item) => `<h3>${esc(item.title)}</h3>${item.note ? `<p>${esc(item.note)}</p>` : ""}<p><small>${esc(t("source"))}: ${esc(item.source || "—")}</small></p>${item.phone ? `<a class="button small" href="${telLink(item.phone)}">☎ ${esc(item.phone)}</a>` : ""}`
};
LISTS.resdir = {
  title: "dirAdd", addLabel: "dirAdd", icon: "▦", empty: "dirEmpty",
  fields: [
    { name: "name", label: "fName", required: true, max: 100 },
    { name: "kind", label: "fType", type: "select", options: DIR_KINDS },
    { name: "phone", label: "fPhone", type: "tel", max: 20 },
    { name: "place", label: "fPlace", max: 120 },
    { name: "note", label: "fNote", max: 160, full: true }
  ],
  card: (item) => `<h3>${esc(item.name)}</h3><p>${[t(DIR_KINDS.find((k) => k[0] === item.kind)?.[1] || "kOther"), item.place, item.note].filter(Boolean).map(esc).join(" · ")}</p>${item.phone ? `<a class="button small" href="${telLink(item.phone)}">☎ ${esc(item.phone)}</a>` : ""}`
};
LISTS.announce = {
  title: "annAdd", addLabel: "annAdd", icon: "✉", empty: "annEmpty",
  fields: [
    { name: "title", label: "fTitle", required: true, max: 120, full: true },
    { name: "note", label: "fNote", type: "textarea", max: 400, full: true },
    { name: "source", label: "fSource", max: 120 },
    { name: "date", label: "fDate", type: "date" }
  ],
  card: (item) => `<h3>${esc(item.title)}</h3>${item.note ? `<p>${esc(item.note)}</p>` : ""}<p><small>${esc(t("source"))}: ${esc(item.source || "—")}${item.date ? ` · ${esc(item.date)}` : ""}</small></p>`
};
LISTS.feedback = {
  title: "fbAdd", addLabel: "fbAdd", icon: "✎", empty: "fbEmpty",
  fields: [
    { name: "kind", label: "fType", type: "select", options: [["idea", "fbIdea"], ["bug", "fbBug"], ["data", "fbData"], ["other", "kOther"]] },
    { name: "note", label: "fbMessage", type: "textarea", required: true, max: 600, full: true }
  ],
  card: (item) => `<h3>${esc(t({ idea: "fbIdea", bug: "fbBug", data: "fbData" }[item.kind] || "kOther"))}</h3><p>${esc(item.note)}</p>`
};

/* ---------- messages ---------- */
addMsgs({
  fSkills: ["Skills (first aid, boat, driving…)", "कौशल (प्राथमिक उपचार, नाव, ड्राइविंग…)", "କୌଶଳ (ପ୍ରାଥମିକ ଚିକିତ୍ସା, ଡଙ୍ଗା, ଗାଡ଼ି ଚଳାଇବା…)"], fAvail: ["Availability", "उपलब्धता", "ଉପଲବ୍ଧତା"], fDistrict: ["District", "जिला", "ଜିଲ୍ଲା"],
  fTitle: ["Title", "शीर्षक", "ଶୀର୍ଷକ"], fAssignee: ["Assigned to", "किसे सौंपा", "କାହାକୁ ଦିଆଗଲା"], fDue: ["Due date", "नियत तिथि", "ନିର୍ଦ୍ଧାରିତ ତାରିଖ"], fStatus: ["Status", "स्थिति", "ସ୍ଥିତି"], fDate: ["Date", "तिथि", "ତାରିଖ"], fPlace: ["Place", "स्थान", "ସ୍ଥାନ"], fSource: ["Source", "स्रोत", "ସୂତ୍ର"],
  ts_open: ["Open", "खुला", "ଖୋଲା"], ts_doing: ["In progress", "प्रगति पर", "ଚାଲୁଛି"], ts_done: ["Done", "पूर्ण", "ସମ୍ପୂର୍ଣ୍ଣ"],
  volAdd: ["Register volunteer", "स्वयंसेवक पंजीकृत करें", "ସ୍ବେଚ୍ଛାସେବୀ ପଞ୍ଜୀକରଣ"], volEmpty: ["No volunteers registered on this device.", "इस डिवाइस पर कोई स्वयंसेवक पंजीकृत नहीं।", "ଏହି ଡିଭାଇସ୍‌ରେ କୌଣସି ସ୍ବେଚ୍ଛାସେବୀ ପଞ୍ଜୀକୃତ ନାହିଁ।"],
  taskAdd: ["Add task", "कार्य जोड़ें", "କାମ ଯୋଗ କରନ୍ତୁ"], taskEmpty: ["No volunteer tasks yet.", "अभी कोई स्वयंसेवक कार्य नहीं।", "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ସ୍ବେଚ୍ଛାସେବୀ କାମ ନାହିଁ।"],
  campAdd: ["Add campaign", "अभियान जोड़ें", "ଅଭିଯାନ ଯୋଗ କରନ୍ତୁ"], campEmpty: ["No campaigns added yet.", "अभी कोई अभियान नहीं जोड़ा गया।", "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଅଭିଯାନ ଯୋଗ ହୋଇନାହିଁ।"],
  ckDrill: ["Mock drill", "मॉक ड्रिल", "ମକ୍ ଡ୍ରିଲ୍"], ckAwareness: ["Awareness", "जागरूकता", "ସଚେତନତା"], ckCleanup: ["Clean-up", "सफाई", "ସଫେଇ"], ckTraining: ["Training", "प्रशिक्षण", "ପ୍ରଶିକ୍ଷଣ"],
  infoAdd: ["Add local information", "स्थानीय जानकारी जोड़ें", "ସ୍ଥାନୀୟ ସୂଚନା ଯୋଗ କରନ୍ତୁ"], infoEmpty: ["No local information added yet. Add notices from your panchayat or district office.", "अभी कोई स्थानीय जानकारी नहीं। पंचायत या जिला कार्यालय की सूचना जोड़ें।", "ଏପର୍ଯ୍ୟନ୍ତ ସ୍ଥାନୀୟ ସୂଚନା ନାହିଁ। ଆପଣଙ୍କ ପଞ୍ଚାୟତ ବା ଜିଲ୍ଲା କାର୍ଯ୍ୟାଳୟର ସୂଚନା ଯୋଗ କରନ୍ତୁ।"],
  dirAdd: ["Add resource", "संसाधन जोड़ें", "ସମ୍ବଳ ଯୋଗ କରନ୍ତୁ"], dirEmpty: ["No community resources listed yet.", "अभी कोई सामुदायिक संसाधन सूचीबद्ध नहीं।", "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ସାମୁଦାୟିକ ସମ୍ବଳ ତାଲିକାଭୁକ୍ତ ନାହିଁ।"],
  dkHospital: ["Hospital / clinic", "अस्पताल / क्लिनिक", "ଡାକ୍ତରଖାନା / କ୍ଲିନିକ୍"], dkPharmacy: ["Pharmacy", "दवा की दुकान", "ଔଷଧ ଦୋକାନ"], dkFood: ["Food / kitchen", "भोजन / रसोई", "ଖାଦ୍ୟ / ରୋଷେଇ"], dkWater: ["Water source", "पानी का स्रोत", "ଜଳ ଉତ୍ସ"], dkTransport: ["Transport", "परिवहन", "ପରିବହନ"],
  annAdd: ["Add announcement", "घोषणा जोड़ें", "ଘୋଷଣା ଯୋଗ କରନ୍ତୁ"], annEmpty: ["No announcements saved. Copy official notices here with their source.", "कोई घोषणा सहेजी नहीं। आधिकारिक सूचनाएँ स्रोत सहित यहाँ जोड़ें।", "କୌଣସି ଘୋଷଣା ସେଭ୍ ହୋଇନାହିଁ। ସରକାରୀ ସୂଚନା ସୂତ୍ର ସହ ଏଠାରେ ଯୋଗ କରନ୍ତୁ।"],
  fbAdd: ["Write feedback", "प्रतिक्रिया लिखें", "ମତାମତ ଲେଖନ୍ତୁ"], fbEmpty: ["No feedback saved.", "कोई प्रतिक्रिया सहेजी नहीं।", "କୌଣସି ମତାମତ ସେଭ୍ ହୋଇନାହିଁ।"], fbIdea: ["Idea", "सुझाव", "ପରାମର୍ଶ"], fbBug: ["Problem", "समस्या", "ସମସ୍ୟା"], fbData: ["Data correction", "डेटा सुधार", "ତଥ୍ୟ ସଂଶୋଧନ"], fbMessage: ["Your message", "आपका संदेश", "ଆପଣଙ୍କ ବାର୍ତ୍ତା"],
  navCommunity: ["Community", "समुदाय", "ସମୁଦାୟ"], navVolunteers: ["Volunteers", "स्वयंसेवक", "ସ୍ବେଚ୍ଛାସେବୀ"], navHelp: ["Help & about", "सहायता और परिचय", "ସହାୟତା ଓ ପରିଚୟ"], navImpact: ["My local summary", "मेरा स्थानीय सार", "ମୋ ସ୍ଥାନୀୟ ସାରାଂଶ"],
  communityTitle: ["Community", "समुदाय", "ସମୁଦାୟ"], communitySubtitle: ["Campaigns, local information, resources and announcements kept on this device.", "इस डिवाइस पर रखे अभियान, स्थानीय जानकारी, संसाधन और घोषणाएँ।", "ଏହି ଡିଭାଇସ୍‌ରେ ରଖାଯାଇଥିବା ଅଭିଯାନ, ସ୍ଥାନୀୟ ସୂଚନା, ସମ୍ବଳ ଓ ଘୋଷଣା।"],
  tabCampaigns: ["Campaigns", "अभियान", "ଅଭିଯାନ"], tabInfo: ["Local info", "स्थानीय जानकारी", "ସ୍ଥାନୀୟ ସୂଚନା"], tabDirectory: ["Resource directory", "संसाधन निर्देशिका", "ସମ୍ବଳ ନିର୍ଦ୍ଦେଶିକା"], tabAnnounce: ["Announcements", "घोषणाएँ", "ଘୋଷଣା"],
  announceNote: ["Only add notices from official sources and write the source. The app does not verify them. See the Alerts page for the live NDMA Sachet feed.", "केवल आधिकारिक स्रोतों की सूचनाएँ जोड़ें और स्रोत लिखें। ऐप इन्हें सत्यापित नहीं करता। NDMA Sachet की लाइव फ़ीड के लिए अलर्ट पेज देखें।", "କେବଳ ସରକାରୀ ସୂତ୍ରର ସୂଚନା ଯୋଗ କରନ୍ତୁ ଓ ସୂତ୍ର ଲେଖନ୍ତୁ। ଆପ୍ ଏହାକୁ ଯାଞ୍ଚ କରେ ନାହିଁ। NDMA Sachet ଲାଇଭ୍ ଫିଡ୍ ପାଇଁ ଆଲର୍ଟ ପୃଷ୍ଠା ଦେଖନ୍ତୁ।"],
  volTitle: ["Volunteers", "स्वयंसेवक", "ସ୍ବେଚ୍ଛାସେବୀ"], volSubtitle: ["Register volunteers and manage their tasks.", "स्वयंसेवक पंजीकृत करें और उनके कार्य प्रबंधित करें।", "ସ୍ବେଚ୍ଛାସେବୀ ପଞ୍ଜୀକରଣ କରନ୍ତୁ ଓ ସେମାନଙ୍କ କାମ ପରିଚାଳନା କରନ୍ତୁ।"],
  volMulti: ["These lists live on this device only. Sharing tasks between several phones needs a backend server, which is not connected yet.", "ये सूचियाँ केवल इसी डिवाइस पर हैं। कई फ़ोनों के बीच कार्य साझा करने के लिए बैकएंड सर्वर चाहिए, जो अभी जुड़ा नहीं है।", "ଏହି ତାଲିକା କେବଳ ଏହି ଡିଭାଇସ୍‌ରେ ଅଛି। ଅନେକ ଫୋନ୍ ମଧ୍ୟରେ କାମ ସେୟାର୍ କରିବାକୁ ବ୍ୟାକ୍‌ଏଣ୍ଡ ସର୍ଭର ଦରକାର, ଯାହା ଏପର୍ଯ୍ୟନ୍ତ ଯୋଡ଼ାଯାଇନାହିଁ।"],
  tabVolunteers: ["Volunteers", "स्वयंसेवक", "ସ୍ବେଚ୍ଛାସେବୀ"], tabTasks: ["Tasks", "कार्य", "କାମ"],
  reviewStatus: ["Review status", "समीक्षा स्थिति", "ସମୀକ୍ଷା ସ୍ଥିତି"], rs_new: ["New", "नई", "ନୂଆ"], rs_reviewed: ["Reviewed by me", "मेरे द्वारा देखी गई", "ମୋ ଦ୍ବାରା ଦେଖାଗଲା"], rs_resolved: ["Resolved", "हल हुई", "ସମାଧାନ ହେଲା"],
  photoOptional: ["Photo (optional)", "फ़ोटो (वैकल्पिक)", "ଫଟୋ (ବିକଳ୍ପ)"], photoNote: ["The photo is shrunk and kept only on this device. Review status here is your own note, not official verification.", "फ़ोटो छोटी करके केवल इसी डिवाइस पर रखी जाती है। यहाँ की समीक्षा स्थिति आपका अपना नोट है, आधिकारिक सत्यापन नहीं।", "ଫଟୋ ଛୋଟ କରି କେବଳ ଏହି ଡିଭାଇସ୍‌ରେ ରଖାଯାଏ। ଏଠାରେ ସମୀକ୍ଷା ସ୍ଥିତି ଆପଣଙ୍କ ନିଜ ନୋଟ୍, ସରକାରୀ ଯାଞ୍ଚ ନୁହେଁ।"], photoAlt: ["Attached photo", "संलग्न फ़ोटो", "ସଂଲଗ୍ନ ଫଟୋ"], photoBad: ["This file is not a readable image.", "यह फ़ाइल पढ़ने योग्य चित्र नहीं है।", "ଏହି ଫାଇଲ୍ ପଢ଼ିହେଉଥିବା ଚିତ୍ର ନୁହେଁ।"],
  /* help */
  helpTitle: ["Help, about and feedback", "सहायता, परिचय और प्रतिक्रिया", "ସହାୟତା, ପରିଚୟ ଓ ମତାମତ"], helpSubtitle: ["Learn what AapadaLens does, how to use it and what it cannot do.", "जानें कि AapadaLens क्या करता है, कैसे इस्तेमाल करें और क्या नहीं कर सकता।", "AapadaLens କ'ଣ କରେ, କିପରି ବ୍ୟବହାର କରିବେ ଓ କ'ଣ କରିପାରେ ନାହିଁ ଜାଣନ୍ତୁ।"],
  helpSearch: ["Search help…", "सहायता खोजें…", "ସହାୟତା ଖୋଜନ୍ତୁ…"], helpNoMatch: ["Nothing matches your search.", "आपकी खोज से कुछ नहीं मिला।", "ଆପଣଙ୍କ ସନ୍ଧାନ ସହ କିଛି ମେଳ ଖାଉନାହିଁ।"], tourStart: ["Take a quick tour", "छोटा टूर लें", "ଛୋଟ ଭ୍ରମଣ ନିଅନ୍ତୁ"],
  aboutTitle: ["About AapadaLens", "AapadaLens के बारे में", "AapadaLens ବିଷୟରେ"], aboutBody: ["AapadaLens is a student project for the Odisha School Innovation Challenge. It helps people prepare for cyclones and helps volunteers keep shelter records. It is an Odisha pilot under testing. It is not an official government service and not a live emergency service.", "AapadaLens ओडिशा स्कूल इनोवेशन चैलेंज के लिए एक छात्र परियोजना है। यह लोगों को चक्रवात की तैयारी में और स्वयंसेवकों को आश्रय रिकॉर्ड रखने में मदद करता है। यह परीक्षण के अधीन ओडिशा पायलट है। यह सरकारी सेवा या लाइव आपातकालीन सेवा नहीं है।", "AapadaLens ଓଡ଼ିଶା ସ୍କୁଲ୍ ଇନୋଭେସନ୍ ଚ୍ୟାଲେଞ୍ଜ ପାଇଁ ଏକ ଛାତ୍ର ପ୍ରକଳ୍ପ। ଏହା ଲୋକଙ୍କୁ ବାତ୍ୟା ପ୍ରସ୍ତୁତିରେ ଓ ସ୍ବେଚ୍ଛାସେବୀଙ୍କୁ ଆଶ୍ରୟସ୍ଥଳ ରେକର୍ଡ ରଖିବାରେ ସାହାଯ୍ୟ କରେ। ଏହା ପରୀକ୍ଷଣ ଅଧୀନରେ ଥିବା ଓଡ଼ିଶା ପାଇଲଟ୍। ଏହା ସରକାରୀ ସେବା ବା ଲାଇଭ୍ ଜରୁରୀକାଳୀନ ସେବା ନୁହେଁ।"],
  howTitle: ["How it works", "यह कैसे काम करता है", "ଏହା କିପରି କାମ କରେ"], how1: ["Add or review shelter records on the Shelters page.", "आश्रय पृष्ठ पर आश्रय रिकॉर्ड जोड़ें या जाँचें।", "ଆଶ୍ରୟସ୍ଥଳ ପୃଷ୍ଠାରେ ରେକର୍ଡ ଯୋଗ କରନ୍ତୁ ବା ଯାଞ୍ଚ କରନ୍ତୁ।"], how2: ["Fill resources and readiness checks for each shelter.", "हर आश्रय के लिए संसाधन और तैयारी जाँच भरें।", "ପ୍ରତ୍ୟେକ ଆଶ୍ରୟସ୍ଥଳ ପାଇଁ ସମ୍ବଳ ଓ ପ୍ରସ୍ତୁତି ଯାଞ୍ଚ ଭରନ୍ତୁ।"], how3: ["Check alerts and weather from the official feeds.", "आधिकारिक फ़ीड से अलर्ट और मौसम देखें।", "ସରକାରୀ ଫିଡ୍‌ରୁ ଆଲର୍ଟ ଓ ପାଣିପାଗ ଦେଖନ୍ତୁ।"], how4: ["Use the planner, analytics and reports to find gaps.", "कमियाँ खोजने के लिए योजनाकार, विश्लेषण और रिपोर्ट का उपयोग करें।", "ଅଭାବ ଖୋଜିବାକୁ ଯୋଜନାକାର, ବିଶ୍ଳେଷଣ ଓ ରିପୋର୍ଟ ବ୍ୟବହାର କରନ୍ତୁ।"], how5: ["Share confirmed information with your district authorities.", "पुष्ट जानकारी अपने जिला अधिकारियों से साझा करें।", "ନିଶ୍ଚିତ ସୂଚନା ଆପଣଙ୍କ ଜିଲ୍ଲା କର୍ତ୍ତୃପକ୍ଷଙ୍କ ସହ ସେୟାର୍ କରନ୍ତୁ।"],
  faqTitle: ["Frequently asked questions", "अक्सर पूछे जाने वाले प्रश्न", "ବାରମ୍ବାର ପଚରାଯାଉଥିବା ପ୍ରଶ୍ନ"],
  faq1q: ["Is this an official government app?", "क्या यह सरकारी ऐप है?", "ଏହା କ'ଣ ସରକାରୀ ଆପ୍?"], faq1a: ["No. It is an independent student project. For official warnings follow OSDMA, NDMA and your district administration, or call 1077.", "नहीं। यह एक स्वतंत्र छात्र परियोजना है। आधिकारिक चेतावनी के लिए OSDMA, NDMA और जिला प्रशासन का पालन करें या 1077 पर कॉल करें।", "ନା। ଏହା ଏକ ସ୍ବାଧୀନ ଛାତ୍ର ପ୍ରକଳ୍ପ। ସରକାରୀ ଚେତାବନୀ ପାଇଁ OSDMA, NDMA ଓ ଜିଲ୍ଲା ପ୍ରଶାସନ ଅନୁସରଣ କରନ୍ତୁ ବା 1077 ରେ ଫୋନ୍ କରନ୍ତୁ।"],
  faq2q: ["Where is my data stored?", "मेरा डेटा कहाँ रखा जाता है?", "ମୋ ତଥ୍ୟ କେଉଁଠି ରଖାଯାଏ?"], faq2a: ["Only in this browser on this device. Nothing is uploaded by the app. Settings has a button to delete it all.", "केवल इसी डिवाइस के इस ब्राउज़र में। ऐप कुछ भी अपलोड नहीं करता। सेटिंग्स में सब कुछ मिटाने का बटन है।", "କେବଳ ଏହି ଡିଭାଇସ୍‌ର ଏହି ବ୍ରାଉଜରରେ। ଆପ୍ କିଛି ଅପଲୋଡ୍ କରେ ନାହିଁ। ସେଟିଂସରେ ସବୁ ଲିଭାଇବା ବଟନ୍ ଅଛି।"],
  faq3q: ["Does it work without internet?", "क्या यह इंटरनेट के बिना चलता है?", "ଇଣ୍ଟରନେଟ୍ ବିନା ଏହା ଚାଲେ କି?"], faq3a: ["After the first visit the app and your saved data open offline. Live alerts, weather and map tiles need internet and may be old when offline.", "पहली बार खोलने के बाद ऐप और आपका सहेजा डेटा ऑफ़लाइन खुलता है। लाइव अलर्ट, मौसम और मैप टाइल्स के लिए इंटरनेट चाहिए और ऑफ़लाइन में पुराने हो सकते हैं।", "ପ୍ରଥମଥର ଖୋଲିବା ପରେ ଆପ୍ ଓ ଆପଣଙ୍କ ସେଭ୍ ହୋଇଥିବା ତଥ୍ୟ ଅଫଲାଇନ୍‌ରେ ଖୋଲେ। ଲାଇଭ୍ ଆଲର୍ଟ, ପାଣିପାଗ ଓ ମାନଚିତ୍ର ଟାଇଲ୍‌ସ ପାଇଁ ଇଣ୍ଟରନେଟ୍ ଦରକାର ଓ ଅଫଲାଇନ୍‌ରେ ପୁରୁଣା ହୋଇପାରେ।"],
  faq4q: ["Are the shelters verified?", "क्या आश्रय सत्यापित हैं?", "ଆଶ୍ରୟସ୍ଥଳ ଯାଞ୍ଚ ହୋଇଛି କି?"], faq4a: ["No. Records are entered by users and marked 'needs review'. Confirm with the district office before relying on them.", "नहीं। रिकॉर्ड उपयोगकर्ता दर्ज करते हैं और 'समीक्षा आवश्यक' चिह्नित हैं। भरोसा करने से पहले जिला कार्यालय से पुष्टि करें।", "ନା। ରେକର୍ଡ ବ୍ୟବହାରକାରୀ ଭରନ୍ତି ଓ 'ସମୀକ୍ଷା ଆବଶ୍ୟକ' ଚିହ୍ନିତ। ଭରସା କରିବା ପୂର୍ବରୁ ଜିଲ୍ଲା କାର୍ଯ୍ୟାଳୟରୁ ନିଶ୍ଚିତ କରନ୍ତୁ।"],
  faq5q: ["Does the SOS button send my location?", "क्या SOS बटन मेरा स्थान भेजता है?", "SOS ବଟନ୍ ମୋ ସ୍ଥାନ ପଠାଏ କି?"], faq5a: ["No. It only opens your phone dialler with 112. You must press call yourself.", "नहीं। यह केवल आपके फ़ोन का डायलर 112 के साथ खोलता है। कॉल आपको स्वयं दबानी होगी।", "ନା। ଏହା କେବଳ ଆପଣଙ୍କ ଫୋନ୍ ଡାଏଲର୍ 112 ସହ ଖୋଲେ। କଲ୍ ଆପଣ ନିଜେ ଦବାଇବେ।"],
  faq6q: ["What does the AI do?", "AI क्या करता है?", "AI କ'ଣ କରେ?"], faq6a: ["AI is optional and needs a server key. Its output is labelled and must be checked by a person. It never replaces official advice.", "AI वैकल्पिक है और इसके लिए सर्वर कुंजी चाहिए। इसका आउटपुट चिह्नित होता है और किसी व्यक्ति को जाँचना होगा। यह आधिकारिक सलाह की जगह नहीं लेता।", "AI ବିକଳ୍ପ ଓ ଏଥିପାଇଁ ସର୍ଭର କି ଦରକାର। ଏହାର ଫଳାଫଳ ଚିହ୍ନିତ ଓ ବ୍ୟକ୍ତିଙ୍କ ଦ୍ବାରା ଯାଞ୍ଚ ହେବା ଉଚିତ। ଏହା ସରକାରୀ ପରାମର୍ଶର ସ୍ଥାନ ନିଏ ନାହିଁ।"],
  faq7q: ["Can I use it outside Odisha?", "क्या मैं ओडिशा के बाहर इसे इस्तेमाल कर सकता हूँ?", "ମୁଁ ଓଡ଼ିଶା ବାହାରେ ଏହା ବ୍ୟବହାର କରିପାରିବି କି?"], faq7a: ["Right now it is an Odisha pilot. Other states will be considered only after testing and feedback.", "अभी यह ओडिशा पायलट है। अन्य राज्यों पर परीक्षण और प्रतिक्रिया के बाद ही विचार होगा।", "ବର୍ତ୍ତମାନ ଏହା ଓଡ଼ିଶା ପାଇଲଟ୍। ଅନ୍ୟ ରାଜ୍ୟ ବିଷୟରେ ପରୀକ୍ଷଣ ଓ ମତାମତ ପରେ ହିଁ ବିଚାର ହେବ।"],
  featTitle: ["Feature overview", "सुविधाओं का अवलोकन", "ସୁବିଧାର ସମୀକ୍ଷା"], featOpen: ["Open", "खोलें", "ଖୋଲନ୍ତୁ"],
  privTitle: ["Privacy and terms (draft)", "गोपनीयता और शर्तें (मसौदा)", "ଗୋପନୀୟତା ଓ ସର୍ତ୍ତାବଳୀ (ଖସଡ଼ା)"], privBody: ["Draft for the pilot, not reviewed by a lawyer. The app stores what you enter only in this browser. Location is used only after you agree and is not saved. There are no accounts, ads or trackers. Use it as a planning aid, not as a replacement for official instructions. Information may be incomplete or out of date.", "पायलट के लिए मसौदा, किसी वकील द्वारा समीक्षित नहीं। ऐप आपकी दर्ज जानकारी केवल इसी ब्राउज़र में रखता है। स्थान केवल आपकी सहमति के बाद उपयोग होता है और सहेजा नहीं जाता। कोई खाता, विज्ञापन या ट्रैकर नहीं है। इसे योजना में सहायक की तरह उपयोग करें, आधिकारिक निर्देशों के विकल्प की तरह नहीं। जानकारी अधूरी या पुरानी हो सकती है।", "ପାଇଲଟ୍ ପାଇଁ ଖସଡ଼ା, ଓକିଲଙ୍କ ଦ୍ବାରା ସମୀକ୍ଷିତ ନୁହେଁ। ଆପ୍ ଆପଣ ଭରିଥିବା ତଥ୍ୟ କେବଳ ଏହି ବ୍ରାଉଜରରେ ରଖେ। ସ୍ଥାନ କେବଳ ଆପଣଙ୍କ ସମ୍ମତି ପରେ ବ୍ୟବହୃତ ହୁଏ ଓ ସେଭ୍ ହୁଏ ନାହିଁ। କୌଣସି ଖାତା, ବିଜ୍ଞାପନ ବା ଟ୍ରାକର୍ ନାହିଁ। ଏହାକୁ ଯୋଜନା ସହାୟକ ଭାବେ ବ୍ୟବହାର କରନ୍ତୁ, ସରକାରୀ ନିର୍ଦ୍ଦେଶର ବିକଳ୍ପ ଭାବେ ନୁହେଁ। ସୂଚନା ଅସମ୍ପୂର୍ଣ୍ଣ ବା ପୁରୁଣା ହୋଇପାରେ।"],
  fbTitle: ["Contact and feedback", "संपर्क और प्रतिक्रिया", "ଯୋଗାଯୋଗ ଓ ମତାମତ"], fbNote: ["Feedback is saved only on this device for now. Sending it to the team needs a backend, which is not connected yet.", "प्रतिक्रिया अभी केवल इसी डिवाइस पर सहेजी जाती है। टीम को भेजने के लिए बैकएंड चाहिए, जो अभी जुड़ा नहीं है।", "ମତାମତ ବର୍ତ୍ତମାନ କେବଳ ଏହି ଡିଭାଇସ୍‌ରେ ସେଭ୍ ହୁଏ। ଦଳକୁ ପଠାଇବାକୁ ବ୍ୟାକ୍‌ଏଣ୍ଡ ଦରକାର, ଯାହା ଏପର୍ଯ୍ୟନ୍ତ ଯୋଡ଼ାଯାଇନାହିଁ।"],
  tourTitle: ["Quick tour", "छोटा टूर", "ଛୋଟ ଭ୍ରମଣ"], tourNext: ["Next", "आगे", "ଆଗକୁ"], tourPrev: ["Back", "पीछे", "ପଛକୁ"], tourDone: ["Finish", "समाप्त", "ସମାପ୍ତ"],
  tour1: ["Shelters: add records and see which ones need review.", "आश्रय: रिकॉर्ड जोड़ें और देखें कि किनकी समीक्षा बाकी है।", "ଆଶ୍ରୟସ୍ଥଳ: ରେକର୍ଡ ଯୋଗ କରନ୍ତୁ ଓ ଦେଖନ୍ତୁ କେଉଁଗୁଡ଼ିକ ସମୀକ୍ଷା ଦରକାର।"], tour2: ["Map and Alerts: see shelters on a map and the official NDMA Sachet feed.", "नक्शा और अलर्ट: नक्शे पर आश्रय और आधिकारिक NDMA Sachet फ़ीड देखें।", "ମାନଚିତ୍ର ଓ ଆଲର୍ଟ: ମାନଚିତ୍ରରେ ଆଶ୍ରୟସ୍ଥଳ ଓ ସରକାରୀ NDMA Sachet ଫିଡ୍ ଦେଖନ୍ତୁ।"], tour3: ["Resources and Readiness: track stock and check what is missing.", "संसाधन और तैयारी: भंडार दर्ज करें और देखें क्या कमी है।", "ସମ୍ବଳ ଓ ପ୍ରସ୍ତୁତି: ଭଣ୍ଡାର ଟ୍ରାକ୍ କରନ୍ତୁ ଓ କ'ଣ ଅଭାବ ଦେଖନ୍ତୁ।"], tour4: ["Family, kit and contacts: plan before a cyclone arrives.", "परिवार, किट और संपर्क: चक्रवात आने से पहले योजना बनाएँ।", "ପରିବାର, କିଟ୍ ଓ ଯୋଗାଯୋଗ: ବାତ୍ୟା ଆସିବା ପୂର୍ବରୁ ଯୋଜନା କରନ୍ତୁ।"], tour5: ["Emergency help: the red button opens the dialler for 112. It never sends anything by itself.", "आपातकालीन सहायता: लाल बटन 112 के लिए डायलर खोलता है। यह अपने आप कुछ नहीं भेजता।", "ଜରୁରୀ ସହାୟତା: ନାଲି ବଟନ୍ 112 ପାଇଁ ଡାଏଲର୍ ଖୋଲେ। ଏହା ନିଜେ କିଛି ପଠାଏ ନାହିଁ।"],
  /* impact */
  impactTitle: ["My local summary", "मेरा स्थानीय सार", "ମୋ ସ୍ଥାନୀୟ ସାରାଂଶ"], impactSubtitle: ["Counts of what you have recorded on this device.", "इस डिवाइस पर आपने जो दर्ज किया उसकी गिनती।", "ଏହି ଡିଭାଇସ୍‌ରେ ଆପଣ ଯାହା ରେକର୍ଡ କରିଛନ୍ତି ତାହାର ଗଣନା।"],
  impactNote: ["These are only your own local counts. They are not national or verified impact figures.", "ये केवल आपकी अपनी स्थानीय गिनतियाँ हैं। ये राष्ट्रीय या सत्यापित प्रभाव के आँकड़े नहीं हैं।", "ଏଗୁଡ଼ିକ କେବଳ ଆପଣଙ୍କ ନିଜ ସ୍ଥାନୀୟ ଗଣନା। ଏଗୁଡ଼ିକ ଜାତୀୟ ବା ଯାଞ୍ଚିତ ପ୍ରଭାବ ଅଙ୍କ ନୁହେଁ।"],
  mReports: ["Incident reports", "घटना रिपोर्ट", "ଘଟଣା ରିପୋର୍ଟ"], mResolved: ["Reports resolved", "हल की गई रिपोर्ट", "ସମାଧାନ ହୋଇଥିବା ରିପୋର୍ଟ"], mVolunteers: ["Volunteers", "स्वयंसेवक", "ସ୍ବେଚ୍ଛାସେବୀ"], mTasksDone: ["Tasks done", "पूर्ण कार्य", "ସମ୍ପୂର୍ଣ୍ଣ କାମ"], mContacts: ["Personal contacts", "निजी संपर्क", "ବ୍ୟକ୍ତିଗତ ଯୋଗାଯୋଗ"], mCampaigns: ["Campaigns", "अभियान", "ଅଭିଯାନ"], localCount: ["On this device", "इस डिवाइस पर", "ଏହି ଡିଭାଇସ୍‌ରେ"],
  /* settings extras */
  prefTitle: ["Display and accessibility", "डिस्प्ले और सुगम्यता", "ଡିସ୍‌ପ୍ଲେ ଓ ସୁଗମ୍ୟତା"], textSize: ["Text size", "टेक्स्ट आकार", "ଅକ୍ଷର ଆକାର"], sizeM: ["Normal", "सामान्य", "ସାଧାରଣ"], sizeL: ["Large", "बड़ा", "ବଡ଼"], sizeXl: ["Extra large", "बहुत बड़ा", "ଅତି ବଡ଼"],
  themeMusicTitle: ["AapadaLens theme", "आपदालेंस थीम संगीत", "ଆପଦାଲେନ୍ସ ଥିମ୍ ସଙ୍ଗୀତ"],
  themeMusicNote: ["An original instrumental tune. Play or pause when you choose; it never starts automatically.", "एक मौलिक वाद्य धुन। अपनी इच्छा से चलाएँ या रोकें; यह अपने आप शुरू नहीं होती।", "ଏକ ମୌଳିକ ବାଦ୍ୟ ସ୍ୱର। ଆପଣ ଚାହିଁଲେ ଚଲାନ୍ତୁ କିମ୍ବା ବନ୍ଦ କରନ୍ତୁ; ଏହା ନିଜେ ଆରମ୍ଭ ହୁଏ ନାହିଁ।"],
  themeMusicError: ["The theme could not be played on this device.", "इस डिवाइस पर थीम संगीत नहीं चल सका।", "ଏହି ଡିଭାଇସ୍‌ରେ ଥିମ୍ ସଙ୍ଗୀତ ଚାଲିପାରିଲା ନାହିଁ।"],
  highContrast: ["High contrast", "उच्च कंट्रास्ट", "ଉଚ୍ଚ କଣ୍ଟ୍ରାଷ୍ଟ"], lowData: ["Low-data mode", "कम-डेटा मोड", "ଅଳ୍ପ-ଡାଟା ମୋଡ୍"], lowDataNote: ["Removes animations and decorative images. It does not stop live data you ask for.", "एनिमेशन और सजावटी चित्र हटाता है। आपके माँगे लाइव डेटा को नहीं रोकता।", "ଆନିମେସନ୍ ଓ ସଜାଵଟୀ ଚିତ୍ର ହଟାଏ। ଆପଣ ମାଗିଥିବା ଲାଇଭ୍ ଡାଟାକୁ ରୋକେ ନାହିଁ।"],
  notifyTitle: ["Alert notifications", "अलर्ट सूचनाएँ", "ଆଲର୍ଟ ବିଜ୍ଞପ୍ତି"], notifyNote: ["Shows a notification when a new NDMA Sachet alert appears while the app is open. It is not a guaranteed warning system.", "ऐप खुला होने पर नया NDMA Sachet अलर्ट आने पर सूचना दिखाता है। यह गारंटीशुदा चेतावनी प्रणाली नहीं है।", "ଆପ୍ ଖୋଲା ଥିବା ବେଳେ ନୂଆ NDMA Sachet ଆଲର୍ଟ ଆସିଲେ ବିଜ୍ଞପ୍ତି ଦେଖାଏ। ଏହା ନିଶ୍ଚିତ ଚେତାବନୀ ବ୍ୟବସ୍ଥା ନୁହେଁ।"], notifyDenied: ["Notifications are blocked in your browser settings.", "सूचनाएँ आपके ब्राउज़र सेटिंग्स में अवरुद्ध हैं।", "ବିଜ୍ଞପ୍ତି ଆପଣଙ୍କ ବ୍ରାଉଜର୍ ସେଟିଂସରେ ବ୍ଲକ୍ ଅଛି।"], notifyUnsupported: ["This browser does not support notifications.", "यह ब्राउज़र सूचनाएँ समर्थित नहीं करता।", "ଏହି ବ୍ରାଉଜର୍ ବିଜ୍ଞପ୍ତି ସମର୍ଥନ କରେ ନାହିଁ।"], newAlertNote: ["New NDMA Sachet alert", "नया NDMA Sachet अलर्ट", "ନୂଆ NDMA Sachet ଆଲର୍ଟ"],
  pinTitle: ["My shortcuts on Overview", "ओवरव्यू पर मेरे शॉर्टकट", "ଓଭରଭ୍ୟୁରେ ମୋ ଶର୍ଟକଟ୍"], pinNote: ["Choose pages to show as quick buttons on the Overview page.", "ओवरव्यू पृष्ठ पर त्वरित बटन के रूप में दिखाने के लिए पृष्ठ चुनें।", "ଓଭରଭ୍ୟୁ ପୃଷ୍ଠାରେ ଦ୍ରୁତ ବଟନ୍ ଭାବେ ଦେଖାଇବାକୁ ପୃଷ୍ଠା ବାଛନ୍ତୁ।"], myShortcuts: ["My shortcuts", "मेरे शॉर्टकट", "ମୋ ଶର୍ଟକଟ୍"],
  permTitle: ["Permissions and storage", "अनुमतियाँ और भंडारण", "ଅନୁମତି ଓ ସଂରକ୍ଷଣ"], permLocation: ["Location permission", "स्थान की अनुमति", "ସ୍ଥାନ ଅନୁମତି"], permNotify: ["Notification permission", "सूचना की अनुमति", "ବିଜ୍ଞପ୍ତି ଅନୁମତି"], permStored: ["Saved data groups on this device", "इस डिवाइस पर सहेजे डेटा समूह", "ଏହି ଡିଭାଇସ୍‌ରେ ସେଭ୍ ଡାଟା ଗୋଷ୍ଠୀ"], permManage: ["Change permissions in your browser's site settings.", "अनुमतियाँ अपने ब्राउज़र की साइट सेटिंग्स में बदलें।", "ଅନୁମତି ଆପଣଙ୍କ ବ୍ରାଉଜରର ସାଇଟ୍ ସେଟିଂସରେ ବଦଳାନ୍ତୁ।"],
  permGranted: ["Allowed", "अनुमत", "ଅନୁମତି ଦିଆଗଲା"], permDenied: ["Blocked", "अवरुद्ध", "ବ୍ଲକ୍"], permPrompt: ["Will ask", "पूछेगा", "ପଚାରିବ"], permUnknown: ["Unknown", "अज्ञात", "ଅଜଣା"],
  installTitle: ["Install on this device", "इस डिवाइस पर इंस्टॉल करें", "ଏହି ଡିଭାଇସ୍‌ରେ ଇନଷ୍ଟଲ୍ କରନ୍ତୁ"], installBtn: ["Install app", "ऐप इंस्टॉल करें", "ଆପ୍ ଇନଷ୍ଟଲ୍ କରନ୍ତୁ"], installNote: ["Installing adds an app icon and opens AapadaLens without browser bars. If the button is missing, use your browser menu: Add to Home screen.", "इंस्टॉल करने से ऐप आइकन जुड़ता है और AapadaLens ब्राउज़र बार के बिना खुलता है। बटन न दिखे तो ब्राउज़र मेनू में 'होम स्क्रीन पर जोड़ें' चुनें।", "ଇନଷ୍ଟଲ୍ କଲେ ଆପ୍ ଆଇକନ୍ ଯୋଡ଼ାଯାଏ ଓ AapadaLens ବ୍ରାଉଜର୍ ବାର୍ ବିନା ଖୋଲେ। ବଟନ୍ ନଥିଲେ ବ୍ରାଉଜର୍ ମେନୁରେ 'ହୋମ୍ ସ୍କ୍ରିନ୍‌ରେ ଯୋଡ଼ନ୍ତୁ' ବାଛନ୍ତୁ।"],
  offlineReady: ["Offline copy ready", "ऑफ़लाइन प्रति तैयार", "ଅଫଲାଇନ୍ କପି ପ୍ରସ୍ତୁତ"], offlineNot: ["Offline copy not active (needs localhost or https)", "ऑफ़लाइन प्रति सक्रिय नहीं (localhost या https चाहिए)", "ଅଫଲାଇନ୍ କପି ସକ୍ରିୟ ନୁହେଁ (localhost ବା https ଦରକାର)"],
  netOnline: ["Online", "ऑनलाइन", "ଅନଲାଇନ୍"], netOffline: ["Offline · showing saved data", "ऑफ़लाइन · सहेजा डेटा दिख रहा है", "ଅଫଲାଇନ୍ · ସେଭ୍ ଡାଟା ଦେଖାଉଛି"], errGeneric: ["Something went wrong. Your saved data is safe. Please try again.", "कुछ गलत हो गया। आपका सहेजा डेटा सुरक्षित है। कृपया फिर कोशिश करें।", "କିଛି ଭୁଲ ହେଲା। ଆପଣଙ୍କ ସେଭ୍ ଡାଟା ସୁରକ୍ଷିତ। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।"],
  staleBanner: ["Some shelter records have not been updated for a long time. Check them before use.", "कुछ आश्रय रिकॉर्ड लंबे समय से अपडेट नहीं हुए। उपयोग से पहले जाँचें।", "କେତେକ ଆଶ୍ରୟସ୍ଥଳ ରେକର୍ଡ ଦୀର୍ଘ ସମୟ ଧରି ଅପଡେଟ୍ ହୋଇନାହିଁ। ବ୍ୟବହାର ପୂର୍ବରୁ ଯାଞ୍ଚ କରନ୍ତୁ।"], staleOpen: ["Open data quality", "डेटा गुणवत्ता खोलें", "ତଥ୍ୟ ଗୁଣବତ୍ତା ଖୋଲନ୍ତୁ"], contactsLink: ["All contacts and national helplines", "सभी संपर्क और राष्ट्रीय हेल्पलाइन", "ସମସ୍ତ ଯୋଗାଯୋଗ ଓ ଜାତୀୟ ହେଲ୍ପଲାଇନ୍"]
});

/* ---------- community & volunteers ---------- */
const COMMUNITY_TABS = [["campaigns", "tabCampaigns"], ["info", "tabInfo"], ["directory", "tabDirectory"], ["announce", "tabAnnounce"]];
const COMMUNITY_LIST = { campaigns: "campaign", info: "localinfo", directory: "resdir", announce: "announce" };
PHASE3_PAGES.community = () => {
  const tab = currentTab("community", COMMUNITY_TABS), name = COMMUNITY_LIST[tab];
  return `${heading("communityTitle", "communitySubtitle")}${notice("localOnlyNote")}${tab === "announce" ? notice("announceNote") : ""}${tabsHtml("community", COMMUNITY_TABS)}
    <div class="page-heading"><span></span><div class="heading-actions">${listAddButton(name)}</div></div>${listCards(name)}`;
};
addNav("more", "community", "✺", "navCommunity");
const VOL_TABS = [["people", "tabVolunteers"], ["tasks", "tabTasks"]];
PHASE3_PAGES.volunteers = () => {
  const tab = currentTab("volunteers", VOL_TABS), name = tab === "tasks" ? "vtask" : "vol";
  return `${heading("volTitle", "volSubtitle")}${notice("volMulti")}${tabsHtml("volunteers", VOL_TABS)}
    <div class="page-heading"><span></span><div class="heading-actions">${listAddButton(name)}</div></div>${listCards(name)}`;
};
addNav("more", "volunteers", "☺", "navVolunteers");

/* report review status */
P3CHANGE["report-status"] = (el) => {
  const status = ["new", "reviewed", "resolved"].includes(el.value) ? el.value : "new";
  const reports = getReports().map((report) => report.id === el.dataset.id ? { ...report, status } : report);
  writeStorage("triage", reports);
};

/* ---------- help centre ---------- */
const FAQ_COUNT = 7;
const FEATURE_LINKS = [
  ["shelters", "shelters"], ["map", "disasterMap"], ["nearby", "navNearby"], ["alerts", "alerts"], ["weather", "navWeather"], ["hazards", "navHazards"],
  ["kit", "emergencyKit"], ["family", "familySafety"], ["emergency", "emergencyHelp"], ["assistant", "assistant"], ["triage", "navTriage"], ["translate", "navTranslate"],
  ["compare", "navCompare"], ["plan", "navPlan"]
];
function featureLinks() {
  const extra = NAV_EXTRA.map((item) => [item.page, item.key]);
  return [...FEATURE_LINKS, ...extra].filter(([page], index, list) => list.findIndex((x) => x[0] === page) === index);
}
const TOUR = [["shelters", "tour1"], ["map", "tour2"], ["inventory", "tour3"], ["family", "tour4"], ["emergency", "tour5"]];
function tourModal(step) {
  const [page, key] = TOUR[step];
  openModal(t("tourTitle"), `<p class="page-subtitle">${step + 1} / ${TOUR.length}</p><p>${esc(t(key))}</p>
    <div class="modal-actions">${step > 0 ? `<button class="button" data-p3="tour" data-step="${step - 1}">${esc(t("tourPrev"))}</button>` : ""}
    <button class="button" data-p3="go" data-page="${page}">${esc(t("featOpen"))}</button>
    ${step < TOUR.length - 1 ? `<button class="button primary" data-p3="tour" data-step="${step + 1}">${esc(t("tourNext"))}</button>` : `<button class="button primary" data-action="close-modal">${esc(t("tourDone"))}</button>`}</div>`);
}
P3ACT.tour = (el) => tourModal(Math.min(TOUR.length - 1, Math.max(0, Number(el.dataset.step) || 0)));
P3ACT.go = (el) => { closeModal(); navigate(el.dataset.page); };
P3CHANGE["help-filter"] = () => {};
document.addEventListener("input", (event) => {
  if (event.target.id !== "helpSearch") return;
  const q = event.target.value.trim().toLocaleLowerCase();
  let shown = 0;
  document.querySelectorAll(".help-item").forEach((node) => {
    const match = !q || node.textContent.toLocaleLowerCase().includes(q);
    node.hidden = !match;
    if (match) shown += 1;
  });
  const empty = document.getElementById("helpNoMatch");
  if (empty) empty.hidden = shown > 0;
});
PHASE3_PAGES.help = () => `${heading("helpTitle", "helpSubtitle", `<button class="button primary" data-p3="tour" data-step="0">${esc(t("tourStart"))}</button>`)}
  <input class="form-control" id="helpSearch" type="search" placeholder="${esc(t("helpSearch"))}" aria-label="${esc(t("helpSearch"))}">
  <p class="page-subtitle" id="helpNoMatch" hidden>${esc(t("helpNoMatch"))}</p>
  <section class="card page-card help-item"><h2>${esc(t("aboutTitle"))}</h2><p>${esc(t("aboutBody"))}</p></section>
  <section class="card page-card help-item"><h2>${esc(t("howTitle"))}</h2><ol class="plan-list">${[1, 2, 3, 4, 5].map((n) => `<li>${esc(t(`how${n}`))}</li>`).join("")}</ol></section>
  <h2 class="section-title">${esc(t("faqTitle"))}</h2>
  ${Array.from({ length: FAQ_COUNT }, (_, i) => `<details class="card page-card help-item faq"><summary>${esc(t(`faq${i + 1}q`))}</summary><p>${esc(t(`faq${i + 1}a`))}</p></details>`).join("")}
  <section class="card page-card help-item"><h2>${esc(t("featTitle"))}</h2><div class="feature-links">${featureLinks().map(([page, key]) => `<button class="button small" data-p3="go" data-page="${page}">${esc(t(key))}</button>`).join("")}</div></section>
  <section class="card page-card help-item"><h2>${esc(t("privTitle"))}</h2><p>${esc(t("privBody"))}</p></section>
  <section class="card page-card help-item"><div class="card-heading"><div><h2>${esc(t("fbTitle"))}</h2><p>${esc(t("fbNote"))}</p></div><div class="heading-actions">${listAddButton("feedback")}</div></div>${listCards("feedback")}</section>`;
addNav("more", "help", "?", "navHelp");

/* ---------- local impact summary ---------- */
PHASE3_PAGES.impact = () => {
  const shelters = getShelters(), reports = getReports(), tasks = getList("vtask");
  const capacity = shelters.reduce((sum, record) => sum + Number(record.capacity || 0), 0);
  return `${heading("impactTitle", "impactSubtitle")}${notice("impactNote")}
    <div class="grid metrics-grid">${metric("totalShelters", shelters.length, "localCount", "⌂")}${metric("totalCapacity", formatCapacity(capacity), "localCount", "▣")}${metric("mReports", reports.length, "localCount", "⚑")}${metric("mResolved", reports.filter((r) => r.status === "resolved").length, "localCount", "✔")}
    ${metric("mVolunteers", getList("vol").length, "localCount", "☺")}${metric("mTasksDone", tasks.filter((x) => x.status === "done").length, "localCount", "☑")}${metric("mContacts", getList("contacts").length, "localCount", "☎")}${metric("mCampaigns", getList("campaign").length, "localCount", "✺")}</div>`;
};
addNav("more", "impact", "◔", "navImpact");

/* ---------- preferences (text size, contrast, low data, notifications, pins) ---------- */
function getPrefs() { return { size: "m", contrast: false, lowData: false, notify: false, pins: [], ...getObject("prefs") }; }
function savePrefs(prefs) { writeStorage("prefs", prefs); applyPrefs(); }
function applyPrefs() {
  const prefs = getPrefs();
  document.body.classList.toggle("text-l", prefs.size === "l");
  document.body.classList.toggle("text-xl", prefs.size === "xl");
  document.body.classList.toggle("high-contrast", !!prefs.contrast);
  document.body.classList.toggle("low-data", !!prefs.lowData);
}
P3CHANGE["pref-size"] = (el) => { savePrefs({ ...getPrefs(), size: ["m", "l", "xl"].includes(el.value) ? el.value : "m" }); };
P3CHANGE["pref-contrast"] = (el) => { savePrefs({ ...getPrefs(), contrast: el.checked }); };
P3CHANGE["pref-lowdata"] = (el) => { savePrefs({ ...getPrefs(), lowData: el.checked }); };
P3CHANGE["pref-pin"] = (el) => {
  const prefs = getPrefs(), set = new Set(prefs.pins);
  if (el.checked) set.add(el.value); else set.delete(el.value);
  savePrefs({ ...prefs, pins: [...set] });
};
P3CHANGE["pref-notify"] = async (el) => {
  if (!el.checked) { savePrefs({ ...getPrefs(), notify: false }); renderPage(); return; }
  if (!("Notification" in window)) { showToast(t("notifyUnsupported")); renderPage(); return; }
  const result = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
  if (result !== "granted") showToast(t("notifyDenied"));
  savePrefs({ ...getPrefs(), notify: result === "granted" });
  p3.perm = null;
  renderPage();
};
const pinOptions = () => {
  const core = [["map", "disasterMap"], ["shelters", "shelters"], ["nearby", "navNearby"], ["weather", "navWeather"], ["hazards", "navHazards"], ["kit", "emergencyKit"], ["family", "familySafety"], ["alerts", "alerts"]];
  return [...core, ...NAV_EXTRA.map((item) => [item.page, item.key])];
};
async function loadPerms() {
  const out = { location: "unknown", notify: "Notification" in window ? Notification.permission : "unknown" };
  try { out.location = (await navigator.permissions.query({ name: "geolocation" })).state; } catch { /* unsupported */ }
  p3.perm = out;
  if (currentPage === "settings") renderPage();
}
function permLabel(state) { return t({ granted: "permGranted", denied: "permDenied", prompt: "permPrompt", default: "permPrompt" }[state] || "permUnknown"); }
let installPrompt = null;
window.addEventListener("beforeinstallprompt", (event) => { event.preventDefault(); installPrompt = event; if (currentPage === "settings") renderPage(); });
P3ACT.install = async () => { if (!installPrompt) return; installPrompt.prompt(); await installPrompt.userChoice.catch(() => {}); installPrompt = null; renderPage(); };
function storedGroups() {
  let count = 0;
  try { for (let i = 0; i < localStorage.length; i += 1) if (localStorage.key(i)?.startsWith(STORAGE_PREFIX)) count += 1; } catch { /* storage blocked */ }
  return count;
}
PHASE3_PAGES.settings = () => {
  if (!p3.perm) loadPerms();
  const prefs = getPrefs(), perm = p3.perm || {};
  const sizes = [["m", "sizeM"], ["l", "sizeL"], ["xl", "sizeXl"]];
  const swActive = !!navigator.serviceWorker?.controller;
  return `${renderSettings()}
    <section class="card page-card"><h2>${esc(t("themeMusicTitle"))}</h2><p class="page-subtitle">${esc(t("themeMusicNote"))}</p>
      <audio class="theme-audio" controls preload="none" aria-label="${esc(t("themeMusicTitle"))}" src="assets/theme/aapadalens-theme.wav">${esc(t("themeMusicError"))}</audio>
      <p class="page-subtitle" id="themeMusicError" role="alert" hidden></p></section>
    <section class="card page-card"><h2>${esc(t("prefTitle"))}</h2>
      <div class="settings-row"><span><strong>${esc(t("textSize"))}</strong></span><select class="form-control" data-p3change="pref-size" aria-label="${esc(t("textSize"))}">${sizes.map(([id, key]) => `<option value="${id}" ${prefs.size === id ? "selected" : ""}>${esc(t(key))}</option>`).join("")}</select></div>
      <div class="settings-row"><span><strong>${esc(t("highContrast"))}</strong></span><input type="checkbox" data-p3change="pref-contrast" ${prefs.contrast ? "checked" : ""} aria-label="${esc(t("highContrast"))}"></div>
      <div class="settings-row"><span><strong>${esc(t("lowData"))}</strong><small>${esc(t("lowDataNote"))}</small></span><input type="checkbox" data-p3change="pref-lowdata" ${prefs.lowData ? "checked" : ""} aria-label="${esc(t("lowData"))}"></div>
      <div class="settings-row"><span><strong>${esc(t("notifyTitle"))}</strong><small>${esc(t(perm.notify === "denied" ? "notifyDenied" : "notifyNote"))}</small></span><input type="checkbox" data-p3change="pref-notify" ${prefs.notify ? "checked" : ""} ${perm.notify === "denied" ? "disabled" : ""} aria-label="${esc(t("notifyTitle"))}"></div>
    </section>
    <section class="card page-card"><h2>${esc(t("installTitle"))}</h2><p class="page-subtitle">${esc(t("installNote"))}</p>
      <p><small>${esc(t(swActive ? "offlineReady" : "offlineNot"))}</small></p>${installPrompt ? `<button class="button primary" data-p3="install">${esc(t("installBtn"))}</button>` : ""}</section>
    <section class="card page-card"><h2>${esc(t("pinTitle"))}</h2><p class="page-subtitle">${esc(t("pinNote"))}</p><div class="checklist">${pinOptions().map(([page, key]) => `<label class="check-row"><input type="checkbox" data-p3change="pref-pin" value="${page}" ${prefs.pins.includes(page) ? "checked" : ""}><span>${esc(t(key))}</span></label>`).join("")}</div></section>
    <section class="card page-card"><h2>${esc(t("permTitle"))}</h2>
      <div class="settings-row"><span><strong>${esc(t("permLocation"))}</strong></span><span>${esc(permLabel(perm.location))}</span></div>
      <div class="settings-row"><span><strong>${esc(t("permNotify"))}</strong></span><span>${esc(permLabel(perm.notify))}</span></div>
      <div class="settings-row"><span><strong>${esc(t("permStored"))}</strong></span><span>${storedGroups()}</span></div><p class="page-subtitle">${esc(t("permManage"))}</p></section>`;
};
document.addEventListener("error", (event) => {
  if (!event.target.matches?.(".theme-audio")) return;
  const message = document.getElementById("themeMusicError");
  if (message) { message.textContent = t("themeMusicError"); message.hidden = false; }
}, true);

/* ---------- overview, family, emergency add-ons ---------- */
PHASE3_PAGES.overview = () => {
  const pins = getPrefs().pins, labels = new Map(pinOptions());
  const shortcuts = pins.filter((page) => labels.has(page)).map((page) => `<button class="button small" data-p3="go" data-page="${esc(page)}">${esc(t(labels.get(page)))}</button>`).join("");
  const stale = typeof staleShelters === "function" ? staleShelters().length : 0;
  return `${stale ? `<div class="notice-banner warn"><span>⚠</span><span>${esc(t("staleBanner"))} <button class="button small" data-p3="go" data-page="quality">${esc(t("staleOpen"))}</button></span></div>` : ""}${renderOverview()}
    ${shortcuts ? `<section class="card page-card"><h2>${esc(t("myShortcuts"))}</h2><div class="feature-links">${shortcuts}</div></section>` : ""}`;
};
PHASE3_PAGES.family = () => `${renderFamily()}${familyMembersHtml()}`;
PHASE3_PAGES.emergency = () => `${renderEmergency()}<p><button class="button" data-p3="go" data-page="contacts">☎ ${esc(t("contactsLink"))}</button></p>`;

/* ---------- navigation entries ---------- */
(function buildNav() {
  const nav = document.querySelector(".primary-nav");
  if (!nav) return;
  const groups = [["safety", "navGroupSafety"], ["manage", "navGroupManage"], ["more", "navGroupMore"]];
  for (const [group, captionKey] of groups) {
    const items = NAV_EXTRA.filter((item) => item.group === group);
    if (!items.length) continue;
    const caption = document.createElement("div");
    caption.className = "nav-caption secondary-caption";
    caption.dataset.i18n = captionKey;
    nav.appendChild(caption);
    for (const item of items) {
      const button = document.createElement("button");
      button.className = "nav-link";
      button.dataset.nav = item.page;
      const icon = document.createElement("span"); icon.textContent = item.icon;
      const label = document.createElement("span"); label.dataset.i18n = item.key;
      button.append(icon, label);
      nav.appendChild(button);
    }
  }
})();

/* ---------- network indicator, errors, accessibility, notifications, offline ---------- */
function updateNetwork() {
  const pill = document.getElementById("netPill");
  if (!pill) return;
  const online = navigator.onLine;
  pill.textContent = t(online ? "netOnline" : "netOffline");
  pill.classList.toggle("offline", !online);
}
(function buildNetPill() {
  const actions = document.querySelector(".topbar-actions");
  if (!actions) return;
  const pill = document.createElement("span");
  pill.id = "netPill"; pill.className = "net-pill"; pill.setAttribute("role", "status");
  actions.prepend(pill);
  window.addEventListener("online", updateNetwork);
  window.addEventListener("offline", updateNetwork);
})();

let lastErrorToast = 0;
function reportFailure() {
  if (Date.now() - lastErrorToast < 5000) return;
  lastErrorToast = Date.now();
  showToast(t("errGeneric"));
}
window.addEventListener("error", reportFailure);
window.addEventListener("unhandledrejection", reportFailure);

const baseAfterPageRender = afterPageRender;
let lastRenderedPage = "";
afterPageRender = function (page) {
  baseAfterPageRender(page);
  updateNetwork();
  if (page !== lastRenderedPage) {
    lastRenderedPage = page;
    const heading1 = document.querySelector("#appContent h1");
    if (heading1) { heading1.setAttribute("tabindex", "-1"); heading1.focus({ preventScroll: true }); document.title = `${heading1.textContent} — AapadaLens`; }
  }
};

async function checkAlertNotifications() {
  const prefs = getPrefs();
  if (!prefs.notify || !("Notification" in window) || Notification.permission !== "granted") return;
  await loadAlerts();
  if (alertState.status !== "ready") return;
  const seen = new Set(readStorage("seenAlerts", []));
  const fresh = alertState.items.filter((item) => item.id && !seen.has(item.id));
  if (seen.size && fresh.length) {
    for (const item of fresh.slice(0, 3)) new Notification(t("newAlertNote"), { body: String(item.title || item.headline || "").slice(0, 160), icon: "aapadalens-logo.png" });
  }
  writeStorage("seenAlerts", alertState.items.map((item) => item.id).filter(Boolean).slice(0, 200));
}
setInterval(checkAlertNotifications, 5 * 60 * 1000);
setTimeout(checkAlertNotifications, 4000);

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").then(() => { if (currentPage === "settings") renderPage(); }).catch(() => {}));
}
window.addEventListener("DOMContentLoaded", applyPrefs);