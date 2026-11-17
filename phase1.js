// Phase 1 features: nearby shelters, occupancy tracking, hazard guides with audio,
// shelter readiness, resource gaps and the what-if chart. Loaded before app.js.
const HAZARDS = ["cyclone", "flood", "heatwave", "lightning"];
const SPEECH_LANGUAGES = { en: "en-IN", hi: "hi-IN", or: "or-IN" };
let nearby = { status: "idle", position: null };
let hazardChoice = "cyclone";

const PHASE1_MESSAGES = {
  en: {
    navNearby: "Nearby shelters", navHazards: "Hazard guides", navAssessment: "Shelter readiness", navGaps: "Resource gaps",
    qaNearby: "Nearby", qaHazards: "Hazards", toolsTitle: "Planning tools",
    nearbyTitle: "Nearby shelters", nearbySubtitle: "Find recorded shelters close to you. Distances are straight-line estimates, not travel routes.",
    useLocation: "Use my location", locating: "Finding your location…",
    locationPrivacy: "Your location is used only in this browser to sort the list. It is not saved or sent anywhere.",
    locationDenied: "Location permission was denied. You can still search the shelter directory by district.",
    locationUnavailable: "Your location could not be determined on this device.", locationUnsupported: "This browser does not support location.",
    distanceAway: "away", noCoordsShelters: "Shelters without coordinates (cannot be sorted by distance)",
    sortedByDistance: "Sorted by straight-line distance from your location", noLocatedShelters: "No shelter records have coordinates yet. Add latitude and longitude to a shelter to see distances.",
    occupancyLabel: "Current occupancy (optional)", occupancyHelp: "Enter only a count reported by the shelter manager. Do not estimate.",
    occupancyInvalid: "Occupancy must be a whole number from 0 up to the recorded capacity.",
    availableSpaces: "Available spaces", availableNote: "From manually entered occupancy", updateOccupancy: "Update occupancy",
    occupiedOf: "occupied of", noOccupancy: "Occupancy not entered", occupancyUpdated: "Occupancy updated", occupancyUpdatedOn: "Occupancy updated",
    emergencyLighting: "Emergency lighting", communication: "Communication facility",
    shelterReadinessAvg: "Facilities recorded (avg.)", recordedOnly: "Recorded facilities only · not an inspection",
    hazardTitle: "Hazard guides", hazardSubtitle: "General preparedness steps for hazards in Odisha. Always follow instructions from official authorities.",
    cyclone: "Cyclone", flood: "Flood", heatwave: "Heatwave", lightning: "Lightning",
    listen: "Listen", stopListening: "Stop audio", stepsDone: "steps done",
    speechNote: "Audio uses your device's text-to-speech voice. Odia voice availability varies by device.",
    noVoice: "This device has no voice installed for the selected language. Install a voice in device settings, or read the steps on screen.",
    speechUnsupported: "Text-to-speech is not supported in this browser.",
    hazardOfficial: "These are general steps, not an official warning. Follow the instructions of the disaster-management authority.",
    cyclone1: "Keep drinking water, dry food, medicines, a torch and a charged power bank ready.",
    cyclone2: "Follow official cyclone warnings and leave for a shelter when authorities advise.",
    cyclone3: "Move to the nearest cyclone shelter or a strong building and stay away from windows.",
    cyclone4: "Stay indoors until officials declare it safe, even if the wind drops suddenly.",
    cyclone5: "After the storm, avoid fallen power lines and floodwater, and use safe drinking water.",
    flood1: "Move to higher ground early and follow evacuation instructions.",
    flood2: "Never walk, swim or drive through floodwater.",
    flood3: "Switch off electricity and gas if it is safe to do so, and avoid fallen power lines.",
    flood4: "Keep documents and medicines in waterproof covers and store safe drinking water.",
    flood5: "After the flood, boil or treat water before drinking it.",
    heatwave1: "Drink water often, even if you do not feel thirsty.",
    heatwave2: "Avoid going out in the afternoon heat; wear light, loose clothes and cover your head.",
    heatwave3: "Check on older people, children and people who are ill.",
    heatwave4: "Move anyone with heat stroke signs to a cool place and seek medical help immediately.",
    heatwave5: "Never leave children or pets in a parked vehicle.",
    lightning1: "Go indoors into a sturdy building when thunder is heard.",
    lightning2: "Stay away from open fields, tall or lone trees, and water bodies.",
    lightning3: "Avoid metal objects and wired electrical appliances during the storm.",
    lightning4: "Do not shelter under an isolated tree or in a small open hut.",
    lightning5: "Wait about 30 minutes after the last thunder before going outside.",
    assessmentTitle: "Shelter readiness", assessmentSubtitle: "A completeness score based on the facilities recorded for each shelter.",
    assessmentNote: "This score counts only the facilities entered in this app. It is not an inspection, safety rating, or certification.",
    facilitiesRecorded: "facilities recorded", notRecorded: "Not recorded", scoreStrong: "Most facilities recorded", scoreSome: "Some facilities missing", scoreLow: "Many facilities missing",
    gapsTitle: "Resource gaps", gapsSubtitle: "See which facilities are not recorded across your shelters and districts.",
    gapsNote: "A gap means the information is missing from entered records. The facility may be absent or simply not recorded.",
    sheltersRecording: "shelters record this", noneRecord: "No shelter records this", byDistrict: "By district", priorityShelters: "Shelters with the most missing facilities",
    allRecorded: "All facilities are recorded.", sheltersWord: "shelters", missingWord: "Missing",
    simCurrent: "Current capacity", simAfter: "After scenario", simDemand: "Demand"
  },
  hi: {
    navNearby: "नज़दीकी आश्रय", navHazards: "आपदा मार्गदर्शिका", navAssessment: "आश्रय तैयारी", navGaps: "संसाधन कमियाँ",
    qaNearby: "नज़दीकी", qaHazards: "आपदाएँ", toolsTitle: "योजना उपकरण",
    nearbyTitle: "नज़दीकी आश्रय", nearbySubtitle: "अपने पास दर्ज आश्रय खोजें। दूरी सीधी रेखा का अनुमान है, यात्रा मार्ग नहीं।",
    useLocation: "मेरा स्थान उपयोग करें", locating: "आपका स्थान खोजा जा रहा है…",
    locationPrivacy: "आपका स्थान केवल इस ब्राउज़र में सूची क्रमबद्ध करने के लिए उपयोग होता है। इसे सहेजा या कहीं भेजा नहीं जाता।",
    locationDenied: "स्थान की अनुमति नहीं मिली। आप ज़िले के आधार पर आश्रय सूची खोज सकते हैं।",
    locationUnavailable: "इस डिवाइस पर आपका स्थान पता नहीं चल सका।", locationUnsupported: "यह ब्राउज़र स्थान सुविधा का समर्थन नहीं करता।",
    distanceAway: "दूर", noCoordsShelters: "बिना निर्देशांक वाले आश्रय (दूरी से क्रमबद्ध नहीं)",
    sortedByDistance: "आपके स्थान से सीधी दूरी के अनुसार क्रमबद्ध", noLocatedShelters: "अभी किसी आश्रय में निर्देशांक नहीं हैं। दूरी देखने के लिए अक्षांश और देशांतर जोड़ें।",
    occupancyLabel: "वर्तमान अधिभोग (वैकल्पिक)", occupancyHelp: "केवल आश्रय प्रबंधक द्वारा बताई गई संख्या दर्ज करें। अनुमान न लगाएँ।",
    occupancyInvalid: "अधिभोग 0 से दर्ज क्षमता तक की पूर्ण संख्या होनी चाहिए।",
    availableSpaces: "उपलब्ध स्थान", availableNote: "हाथ से दर्ज अधिभोग पर आधारित", updateOccupancy: "अधिभोग अपडेट करें",
    occupiedOf: "भरे, कुल", noOccupancy: "अधिभोग दर्ज नहीं", occupancyUpdated: "अधिभोग अपडेट हुआ", occupancyUpdatedOn: "अधिभोग अपडेट",
    emergencyLighting: "आपातकालीन रोशनी", communication: "संचार सुविधा",
    shelterReadinessAvg: "दर्ज सुविधाएँ (औसत)", recordedOnly: "केवल दर्ज सुविधाएँ · निरीक्षण नहीं",
    hazardTitle: "आपदा मार्गदर्शिका", hazardSubtitle: "ओडिशा की आपदाओं के लिए सामान्य तैयारी के कदम। हमेशा आधिकारिक प्राधिकरण के निर्देशों का पालन करें।",
    cyclone: "चक्रवात", flood: "बाढ़", heatwave: "लू", lightning: "बिजली गिरना",
    listen: "सुनें", stopListening: "ऑडियो रोकें", stepsDone: "कदम पूरे",
    speechNote: "ऑडियो आपके डिवाइस की टेक्स्ट-टू-स्पीच आवाज़ का उपयोग करता है। ओड़िया आवाज़ की उपलब्धता डिवाइस पर निर्भर है।",
    noVoice: "इस डिवाइस में चुनी गई भाषा की आवाज़ इंस्टॉल नहीं है। डिवाइस सेटिंग में आवाज़ इंस्टॉल करें या स्क्रीन पर कदम पढ़ें।",
    speechUnsupported: "इस ब्राउज़र में टेक्स्ट-टू-स्पीच समर्थित नहीं है।",
    hazardOfficial: "ये सामान्य कदम हैं, आधिकारिक चेतावनी नहीं। आपदा प्रबंधन प्राधिकरण के निर्देशों का पालन करें।",
    cyclone1: "पीने का पानी, सूखा भोजन, दवाइयाँ, टॉर्च और चार्ज किया हुआ पावर बैंक तैयार रखें।",
    cyclone2: "आधिकारिक चक्रवात चेतावनियों का पालन करें और प्रशासन के कहने पर आश्रय के लिए निकलें।",
    cyclone3: "नज़दीकी चक्रवात आश्रय या मज़बूत इमारत में जाएँ और खिड़कियों से दूर रहें।",
    cyclone4: "अधिकारियों के सुरक्षित घोषित करने तक घर के अंदर रहें, चाहे हवा अचानक थम जाए।",
    cyclone5: "तूफ़ान के बाद गिरे बिजली के तारों और बाढ़ के पानी से बचें और सुरक्षित पेयजल का उपयोग करें।",
    flood1: "जल्दी ऊँची जगह पर जाएँ और निकासी के निर्देशों का पालन करें।",
    flood2: "बाढ़ के पानी में कभी पैदल, तैरकर या वाहन से न जाएँ।",
    flood3: "सुरक्षित हो तो बिजली और गैस बंद करें और गिरे बिजली के तारों से दूर रहें।",
    flood4: "दस्तावेज़ और दवाइयाँ वॉटरप्रूफ़ कवर में रखें और सुरक्षित पेयजल जमा करें।",
    flood5: "बाढ़ के बाद पानी को उबालकर या उपचारित करके ही पिएँ।",
    heatwave1: "प्यास न लगे तब भी बार-बार पानी पिएँ।",
    heatwave2: "दोपहर की गर्मी में बाहर जाने से बचें; हल्के, ढीले कपड़े पहनें और सिर ढकें।",
    heatwave3: "बुज़ुर्गों, बच्चों और बीमार लोगों का हाल पूछते रहें।",
    heatwave4: "लू लगने के लक्षण दिखें तो व्यक्ति को ठंडी जगह ले जाएँ और तुरंत चिकित्सा सहायता लें।",
    heatwave5: "बच्चों या पालतू जानवरों को खड़ी गाड़ी में कभी न छोड़ें।",
    lightning1: "बादल गरजने पर किसी मज़बूत इमारत के अंदर चले जाएँ।",
    lightning2: "खुले मैदानों, ऊँचे या अकेले पेड़ों और जलाशयों से दूर रहें।",
    lightning3: "तूफ़ान के दौरान धातु की वस्तुओं और तार वाले बिजली उपकरणों से बचें।",
    lightning4: "अकेले पेड़ के नीचे या छोटी खुली झोपड़ी में शरण न लें।",
    lightning5: "बाहर निकलने से पहले आख़िरी गड़गड़ाहट के लगभग 30 मिनट बाद तक प्रतीक्षा करें।",
    assessmentTitle: "आश्रय तैयारी", assessmentSubtitle: "हर आश्रय के लिए दर्ज सुविधाओं पर आधारित पूर्णता स्कोर।",
    assessmentNote: "यह स्कोर केवल इस ऐप में दर्ज सुविधाएँ गिनता है। यह निरीक्षण, सुरक्षा रेटिंग या प्रमाणन नहीं है।",
    facilitiesRecorded: "सुविधाएँ दर्ज", notRecorded: "दर्ज नहीं", scoreStrong: "अधिकांश सुविधाएँ दर्ज", scoreSome: "कुछ सुविधाएँ अनुपस्थित", scoreLow: "कई सुविधाएँ अनुपस्थित",
    gapsTitle: "संसाधन कमियाँ", gapsSubtitle: "देखें कि आपके आश्रयों और ज़िलों में कौन-सी सुविधाएँ दर्ज नहीं हैं।",
    gapsNote: "कमी का मतलब है कि जानकारी दर्ज रिकॉर्ड में नहीं है। सुविधा मौजूद न हो सकती है या सिर्फ़ दर्ज न की गई हो।",
    sheltersRecording: "आश्रयों में दर्ज", noneRecord: "किसी आश्रय में दर्ज नहीं", byDistrict: "ज़िले के अनुसार", priorityShelters: "सबसे अधिक सुविधाएँ अनुपस्थित वाले आश्रय",
    allRecorded: "सभी सुविधाएँ दर्ज हैं।", sheltersWord: "आश्रय", missingWord: "अनुपस्थित",
    simCurrent: "वर्तमान क्षमता", simAfter: "परिदृश्य के बाद", simDemand: "माँग"
  },
  or: {
    navNearby: "ନିକଟସ୍ଥ ଆଶ୍ରୟସ୍ଥଳ", navHazards: "ବିପର୍ଯ୍ୟୟ ଗାଇଡ୍", navAssessment: "ଆଶ୍ରୟସ୍ଥଳ ପ୍ରସ୍ତୁତି", navGaps: "ସମ୍ବଳ ଅଭାବ",
    qaNearby: "ନିକଟସ୍ଥ", qaHazards: "ବିପର୍ଯ୍ୟୟ", toolsTitle: "ଯୋଜନା ଉପକରଣ",
    nearbyTitle: "ନିକଟସ୍ଥ ଆଶ୍ରୟସ୍ଥଳ", nearbySubtitle: "ଆପଣଙ୍କ ପାଖରେ ଥିବା ଲିପିବଦ୍ଧ ଆଶ୍ରୟସ୍ଥଳ ଖୋଜନ୍ତୁ। ଦୂରତା ସିଧା ରେଖାର ଅନୁମାନ, ଯାତ୍ରା ପଥ ନୁହେଁ।",
    useLocation: "ମୋ ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ", locating: "ଆପଣଙ୍କ ସ୍ଥାନ ଖୋଜା ଚାଲିଛି…",
    locationPrivacy: "ଆପଣଙ୍କ ସ୍ଥାନ କେବଳ ଏହି ବ୍ରାଉଜରରେ ତାଲିକା ସଜାଇବା ପାଇଁ ବ୍ୟବହୃତ ହୁଏ। ଏହାକୁ ସେଭ୍ କିମ୍ବା କେଉଁଠି ପଠାଯାଏ ନାହିଁ।",
    locationDenied: "ସ୍ଥାନ ଅନୁମତି ମିଳିଲା ନାହିଁ। ଆପଣ ଜିଲ୍ଲା ଅନୁସାରେ ଆଶ୍ରୟସ୍ଥଳ ତାଲିକା ଖୋଜିପାରିବେ।",
    locationUnavailable: "ଏହି ଡିଭାଇସରେ ଆପଣଙ୍କ ସ୍ଥାନ ଜଣାପଡ଼ିଲା ନାହିଁ।", locationUnsupported: "ଏହି ବ୍ରାଉଜର ସ୍ଥାନ ସୁବିଧା ସମର୍ଥନ କରେ ନାହିଁ।",
    distanceAway: "ଦୂରରେ", noCoordsShelters: "ସ୍ଥାନାଙ୍କ ନଥିବା ଆଶ୍ରୟସ୍ଥଳ (ଦୂରତା ଅନୁସାରେ ସଜାଯାଇପାରିବ ନାହିଁ)",
    sortedByDistance: "ଆପଣଙ୍କ ସ୍ଥାନରୁ ସିଧା ଦୂରତା ଅନୁସାରେ ସଜାଯାଇଛି", noLocatedShelters: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଆଶ୍ରୟସ୍ଥଳରେ ସ୍ଥାନାଙ୍କ ନାହିଁ। ଦୂରତା ଦେଖିବାକୁ ଅକ୍ଷାଂଶ ଓ ଦ୍ରାଘିମା ଯୋଡ଼ନ୍ତୁ।",
    occupancyLabel: "ବର୍ତ୍ତମାନର ବାସିନ୍ଦା ସଂଖ୍ୟା (ଐଚ୍ଛିକ)", occupancyHelp: "କେବଳ ଆଶ୍ରୟସ୍ଥଳ ପରିଚାଳକ ଜଣାଇଥିବା ସଂଖ୍ୟା ଦିଅନ୍ତୁ। ଅନୁମାନ କରନ୍ତୁ ନାହିଁ।",
    occupancyInvalid: "ବାସିନ୍ଦା ସଂଖ୍ୟା 0 ରୁ ଲିପିବଦ୍ଧ କ୍ଷମତା ପର୍ଯ୍ୟନ୍ତ ଏକ ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା ହେବା ଉଚିତ।",
    availableSpaces: "ଉପଲବ୍ଧ ସ୍ଥାନ", availableNote: "ହାତରେ ଦିଆଯାଇଥିବା ସଂଖ୍ୟା ଆଧାରିତ", updateOccupancy: "ବାସିନ୍ଦା ସଂଖ୍ୟା ଅପଡେଟ୍",
    occupiedOf: "ଭର୍ତ୍ତି, ମୋଟ", noOccupancy: "ବାସିନ୍ଦା ସଂଖ୍ୟା ଦିଆଯାଇନାହିଁ", occupancyUpdated: "ବାସିନ୍ଦା ସଂଖ୍ୟା ଅପଡେଟ୍ ହେଲା", occupancyUpdatedOn: "ଅପଡେଟ୍",
    emergencyLighting: "ଜରୁରୀ ଆଲୋକ", communication: "ଯୋଗାଯୋଗ ସୁବିଧା",
    shelterReadinessAvg: "ଲିପିବଦ୍ଧ ସୁବିଧା (ହାରାହାରି)", recordedOnly: "କେବଳ ଲିପିବଦ୍ଧ ସୁବିଧା · ଯାଞ୍ଚ ନୁହେଁ",
    hazardTitle: "ବିପର୍ଯ୍ୟୟ ଗାଇଡ୍", hazardSubtitle: "ଓଡ଼ିଶାର ବିପର୍ଯ୍ୟୟ ପାଇଁ ସାଧାରଣ ପ୍ରସ୍ତୁତି ପଦକ୍ଷେପ। ସର୍ବଦା ସରକାରୀ କର୍ତ୍ତୃପକ୍ଷଙ୍କ ନିର୍ଦ୍ଦେଶ ମାନନ୍ତୁ।",
    cyclone: "ବାତ୍ୟା", flood: "ବନ୍ୟା", heatwave: "ଲୁ", lightning: "ବଜ୍ରପାତ",
    listen: "ଶୁଣନ୍ତୁ", stopListening: "ଅଡିଓ ବନ୍ଦ", stepsDone: "ପଦକ୍ଷେପ ସମ୍ପୂର୍ଣ୍ଣ",
    speechNote: "ଅଡିଓ ଆପଣଙ୍କ ଡିଭାଇସର ଟେକ୍ସଟ୍-ଟୁ-ସ୍ପିଚ୍ ସ୍ୱର ବ୍ୟବହାର କରେ। ଓଡ଼ିଆ ସ୍ୱର ଉପଲବ୍ଧତା ଡିଭାଇସ ଅନୁସାରେ ଭିନ୍ନ।",
    noVoice: "ଏହି ଡିଭାଇସରେ ବଛାଯାଇଥିବା ଭାଷାର ସ୍ୱର ସ୍ଥାପିତ ନାହିଁ। ଡିଭାଇସ ସେଟିଂସରେ ସ୍ୱର ସ୍ଥାପନ କରନ୍ତୁ କିମ୍ବା ସ୍କ୍ରିନରେ ପଢ଼ନ୍ତୁ।",
    speechUnsupported: "ଏହି ବ୍ରାଉଜରରେ ଟେକ୍ସଟ୍-ଟୁ-ସ୍ପିଚ୍ ସମର୍ଥିତ ନୁହେଁ।",
    hazardOfficial: "ଏଗୁଡ଼ିକ ସାଧାରଣ ପଦକ୍ଷେପ, ସରକାରୀ ସତର୍କତା ନୁହେଁ। ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା କର୍ତ୍ତୃପକ୍ଷଙ୍କ ନିର୍ଦ୍ଦେଶ ମାନନ୍ତୁ।",
    cyclone1: "ପିଇବା ପାଣି, ଶୁଖିଲା ଖାଦ୍ୟ, ଔଷଧ, ଟର୍ଚ୍ଚ ଏବଂ ଚାର୍ଜ ହୋଇଥିବା ପାୱାର ବ୍ୟାଙ୍କ ପ୍ରସ୍ତୁତ ରଖନ୍ତୁ।",
    cyclone2: "ସରକାରୀ ବାତ୍ୟା ସତର୍କତା ଅନୁସରଣ କରନ୍ତୁ ଏବଂ କର୍ତ୍ତୃପକ୍ଷ କହିଲେ ଆଶ୍ରୟସ୍ଥଳକୁ ଯାଆନ୍ତୁ।",
    cyclone3: "ନିକଟତମ ବାତ୍ୟା ଆଶ୍ରୟସ୍ଥଳ କିମ୍ବା ମଜବୁତ ଘରକୁ ଯାଆନ୍ତୁ ଏବଂ ଝରକାଠାରୁ ଦୂରରେ ରୁହନ୍ତୁ।",
    cyclone4: "ଅଧିକାରୀମାନେ ସୁରକ୍ଷିତ ବୋଲି ଘୋଷଣା ନକରିବା ପର୍ଯ୍ୟନ୍ତ ଘର ଭିତରେ ରୁହନ୍ତୁ, ପବନ ହଠାତ୍ ଶାନ୍ତ ହେଲେ ମଧ୍ୟ।",
    cyclone5: "ଝଡ଼ ପରେ ଛିଣ୍ଡିଥିବା ବିଦ୍ୟୁତ୍ ତାର ଓ ବନ୍ୟାଜଳରୁ ଦୂରରେ ରୁହନ୍ତୁ ଏବଂ ସୁରକ୍ଷିତ ପାନୀୟ ଜଳ ବ୍ୟବହାର କରନ୍ତୁ।",
    flood1: "ଆଗୁଆ ଉଚ୍ଚ ସ୍ଥାନକୁ ଯାଆନ୍ତୁ ଏବଂ ସ୍ଥାନାନ୍ତର ନିର୍ଦ୍ଦେଶ ମାନନ୍ତୁ।",
    flood2: "ବନ୍ୟାଜଳରେ କେବେ ବି ଚାଲି, ଗାଧୋଇ କିମ୍ବା ଗାଡ଼ି ଚଳାଇ ଯାଆନ୍ତୁ ନାହିଁ।",
    flood3: "ସୁରକ୍ଷିତ ହେଲେ ବିଦ୍ୟୁତ୍ ଓ ଗ୍ୟାସ୍ ବନ୍ଦ କରନ୍ତୁ ଏବଂ ଛିଣ୍ଡିଥିବା ବିଦ୍ୟୁତ୍ ତାରଠାରୁ ଦୂରରେ ରୁହନ୍ତୁ।",
    flood4: "କାଗଜପତ୍ର ଓ ଔଷଧ ଜଳରୋଧୀ ଖୋଲରେ ରଖନ୍ତୁ ଏବଂ ସୁରକ୍ଷିତ ପାନୀୟ ଜଳ ସଂରକ୍ଷଣ କରନ୍ତୁ।",
    flood5: "ବନ୍ୟା ପରେ ପାଣି ଫୁଟାଇ କିମ୍ବା ଶୋଧନ କରି ପିଅନ୍ତୁ।",
    heatwave1: "ଶୋଷ ନଲାଗିଲେ ମଧ୍ୟ ବାରମ୍ବାର ପାଣି ପିଅନ୍ତୁ।",
    heatwave2: "ଅପରାହ୍ନର ଗରମରେ ବାହାରକୁ ଯିବା ଏଡ଼ାନ୍ତୁ; ହାଲୁକା, ଢିଲା ପୋଷାକ ପିନ୍ଧନ୍ତୁ ଏବଂ ମୁଣ୍ଡ ଢାଙ୍କନ୍ତୁ।",
    heatwave3: "ବୃଦ୍ଧ, ପିଲା ଏବଂ ଅସୁସ୍ଥ ଲୋକଙ୍କ ଖବର ନିଅନ୍ତୁ।",
    heatwave4: "ଲୁ ଲାଗିବାର ଲକ୍ଷଣ ଦେଖିଲେ ବ୍ୟକ୍ତିଙ୍କୁ ଥଣ୍ଡା ସ୍ଥାନକୁ ନିଅନ୍ତୁ ଏବଂ ତୁରନ୍ତ ଡାକ୍ତରୀ ସହାୟତା ନିଅନ୍ତୁ।",
    heatwave5: "ପିଲା କିମ୍ବା ପୋଷା ପ୍ରାଣୀଙ୍କୁ ଠିଆ କରାଯାଇଥିବା ଗାଡ଼ିରେ କେବେ ଛାଡ଼ନ୍ତୁ ନାହିଁ।",
    lightning1: "ବଜ୍ରପାତ ଶୁଣିଲେ ମଜବୁତ ଘର ଭିତରକୁ ଯାଆନ୍ତୁ।",
    lightning2: "ଖୋଲା ପଡ଼ିଆ, ଉଚ୍ଚ କିମ୍ବା ଏକୁଟିଆ ଗଛ ଏବଂ ଜଳାଶୟଠାରୁ ଦୂରରେ ରୁହନ୍ତୁ।",
    lightning3: "ଝଡ଼ ସମୟରେ ଧାତୁ ଜିନିଷ ଓ ତାର ଲାଗିଥିବା ବିଦ୍ୟୁତ୍ ଉପକରଣରୁ ଦୂରରେ ରୁହନ୍ତୁ।",
    lightning4: "ଏକୁଟିଆ ଗଛ ତଳେ କିମ୍ବା ଛୋଟ ଖୋଲା କୁଡ଼ିଆରେ ଆଶ୍ରୟ ନିଅନ୍ତୁ ନାହିଁ।",
    lightning5: "ବାହାରକୁ ଯିବା ପୂର୍ବରୁ ଶେଷ ବଜ୍ରନାଦ ପରେ ପ୍ରାୟ 30 ମିନିଟ୍ ଅପେକ୍ଷା କରନ୍ତୁ।",
    assessmentTitle: "ଆଶ୍ରୟସ୍ଥଳ ପ୍ରସ୍ତୁତି", assessmentSubtitle: "ପ୍ରତ୍ୟେକ ଆଶ୍ରୟସ୍ଥଳ ପାଇଁ ଲିପିବଦ୍ଧ ସୁବିଧା ଆଧାରିତ ସମ୍ପୂର୍ଣ୍ଣତା ସ୍କୋର।",
    assessmentNote: "ଏହି ସ୍କୋର କେବଳ ଏହି ଆପ୍‌ରେ ଦିଆଯାଇଥିବା ସୁବିଧା ଗଣେ। ଏହା ଯାଞ୍ଚ, ସୁରକ୍ଷା ରେଟିଂ କିମ୍ବା ପ୍ରମାଣପତ୍ର ନୁହେଁ।",
    facilitiesRecorded: "ସୁବିଧା ଲିପିବଦ୍ଧ", notRecorded: "ଲିପିବଦ୍ଧ ନାହିଁ", scoreStrong: "ଅଧିକାଂଶ ସୁବିଧା ଲିପିବଦ୍ଧ", scoreSome: "କିଛି ସୁବିଧା ନାହିଁ", scoreLow: "ଅନେକ ସୁବିଧା ନାହିଁ",
    gapsTitle: "ସମ୍ବଳ ଅଭାବ", gapsSubtitle: "ଆପଣଙ୍କ ଆଶ୍ରୟସ୍ଥଳ ଓ ଜିଲ୍ଲାରେ କେଉଁ ସୁବିଧା ଲିପିବଦ୍ଧ ନାହିଁ ଦେଖନ୍ତୁ।",
    gapsNote: "ଅଭାବ ଅର୍ଥ ଲିପିବଦ୍ଧ ତଥ୍ୟରେ ସୂଚନା ନାହିଁ। ସୁବିଧା ନଥାଇପାରେ କିମ୍ବା କେବଳ ଲେଖାଯାଇନାହିଁ।",
    sheltersRecording: "ଆଶ୍ରୟସ୍ଥଳରେ ଲିପିବଦ୍ଧ", noneRecord: "କୌଣସି ଆଶ୍ରୟସ୍ଥଳରେ ଲିପିବଦ୍ଧ ନାହିଁ", byDistrict: "ଜିଲ୍ଲା ଅନୁସାରେ", priorityShelters: "ସବୁଠାରୁ ଅଧିକ ସୁବିଧା ନଥିବା ଆଶ୍ରୟସ୍ଥଳ",
    allRecorded: "ସମସ୍ତ ସୁବିଧା ଲିପିବଦ୍ଧ ଅଛି।", sheltersWord: "ଆଶ୍ରୟସ୍ଥଳ", missingWord: "ନାହିଁ",
    simCurrent: "ବର୍ତ୍ତମାନର କ୍ଷମତା", simAfter: "ପରିସ୍ଥିତି ପରେ", simDemand: "ଚାହିଦା"
  }
};

function hasCoordinates(record) {
  return record.latitude !== null && record.longitude !== null && record.latitude !== "" && record.longitude !== "" &&
    Number.isFinite(Number(record.latitude)) && Number.isFinite(Number(record.longitude));
}
function distanceKm(lat1, lon1, lat2, lon2) {
  const toRad = (degrees) => degrees * Math.PI / 180;
  const a = Math.sin(toRad(lat2 - lat1) / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(toRad(lon2 - lon1) / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(a));
}
function mapLink(record) {
  const lat = Number(record.latitude), lon = Number(record.longitude);
  return `https://www.openstreetmap.org/?mlat=${encodeURIComponent(lat)}&mlon=${encodeURIComponent(lon)}#map=16/${encodeURIComponent(lat)}/${encodeURIComponent(lon)}`;
}
function parseOccupancy(text, capacity) {
  const trimmed = String(text ?? "").trim();
  if (trimmed === "") return { value: null };
  const value = Number(trimmed);
  if (!/^\d+$/.test(trimmed) || !Number.isSafeInteger(value) || value > capacity) return { error: t("occupancyInvalid") };
  return { value };
}
function hasOccupancy(record) { return Number.isInteger(record.occupancy) && record.occupancy >= 0; }
function availableSpaces(records) {
  const tracked = records.filter(hasOccupancy);
  if (!tracked.length) return null;
  return tracked.reduce((sum, record) => sum + Math.max(0, Number(record.capacity) - record.occupancy), 0);
}
function recordedFacilityPercent(record) {
  const recorded = SHELTER_FACILITIES.filter(([field]) => record.facilities?.includes(field)).length;
  return Math.round(recorded / SHELTER_FACILITIES.length * 100);
}
function occupancyBar(record) {
  if (!hasOccupancy(record)) return `<small class="occupancy-note">${escapeHtml(t("noOccupancy"))}</small>`;
  const capacity = Number(record.capacity);
  const percent = capacity > 0 ? Math.min(100, Math.round(record.occupancy / capacity * 100)) : 100;
  const level = percent >= 90 ? "high" : percent >= 70 ? "medium" : "low";
  const stamp = record.occupancyUpdatedAt ? ` · ${escapeHtml(t("occupancyUpdatedOn"))} ${escapeHtml(safeDate(record.occupancyUpdatedAt))}` : "";
  return `<div class="occupancy"><div class="occupancy-text"><span>${formatCapacity(record.occupancy)} ${escapeHtml(t("occupiedOf"))} ${formatCapacity(capacity)}</span><strong>${formatCapacity(Math.max(0, capacity - record.occupancy))} ${escapeHtml(t("availableSpaces"))}</strong></div><div class="progress-track"><div class="progress-fill occupancy-${level}" style="width:${percent}%"></div></div><small class="occupancy-note">${escapeHtml(t("availableNote"))}${stamp}</small></div>`;
}
function openOccupancyForm(id) {
  const record = getShelters().find((item) => item.id === id);
  if (!record) return;
  openModal(t("updateOccupancy"), `<form id="occupancyForm" novalidate><input type="hidden" name="recordId" value="${escapeHtml(record.id)}">
    <p class="page-subtitle"><strong>${escapeHtml(record.name)}</strong> · ${escapeHtml(t("capacity"))}: ${formatCapacity(record.capacity)}</p>
    <label class="field-group"><span>${escapeHtml(t("occupancyLabel"))}</span><input class="form-control" name="occupancy" type="number" min="0" max="${escapeHtml(record.capacity)}" step="1" inputmode="numeric" value="${hasOccupancy(record) ? record.occupancy : ""}"><small>${escapeHtml(t("occupancyHelp"))}</small></label>
    <div class="form-error" id="formError" role="alert"></div>
    <div class="modal-actions"><button type="button" class="button" data-action="close-modal">${escapeHtml(t("cancel"))}</button><button class="button primary" type="submit">${escapeHtml(t("saveRecord"))}</button></div></form>`);
}
function saveOccupancy(form) {
  const data = new FormData(form);
  const records = getShelters();
  const record = records.find((item) => item.id === String(data.get("recordId")));
  if (!record) return;
  const parsed = parseOccupancy(data.get("occupancy"), Number(record.capacity));
  if (parsed.error) { document.getElementById("formError").textContent = parsed.error; return; }
  record.occupancy = parsed.value;
  record.occupancyUpdatedAt = parsed.value === null ? null : new Date().toISOString();
  if (!writeStorage("shelters", records)) return;
  closeModal();
  renderPage();
  showToast(t("occupancyUpdated"));
}

function nearbyShelterRow(record, distance) {
  const away = distance === null ? "" : `<strong class="distance">${distance.toFixed(1)} km ${escapeHtml(t("distanceAway"))}</strong>`;
  const link = hasCoordinates(record) ? `<a class="button small" href="${mapLink(record)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("openMap"))}</a>` : "";
  const call = record.contact ? `<a class="button small" href="${telLink(record.contact)}" aria-label="Call ${escapeHtml(record.name)} at ${escapeHtml(record.contact)}">☎ ${escapeHtml(record.contact)}</a>` : "";
  return `<article class="card shelter-card"><span class="shelter-symbol" aria-hidden="true">⌂</span><div class="shelter-detail">
    <div class="alert-top"><h3>${escapeHtml(record.name)}</h3>${away}</div>
    <p>${escapeHtml(record.district)}${record.address ? ` · ${escapeHtml(record.address)}` : ""}</p>
    <div class="facility-pills"><span>${escapeHtml(t("recordedCapacity"))}: ${formatCapacity(record.capacity)}</span><span class="review-badge">${escapeHtml(t("needsReview"))}</span></div>${occupancyBar(record)}</div>
    <div class="record-actions">${call}${link}</div></article>`;
}
function renderNearby() {
  const records = getShelters();
  const statusMessages = { locating: "locating", denied: "locationDenied", unavailable: "locationUnavailable", unsupported: "locationUnsupported" };
  const status = statusMessages[nearby.status] ? `<div class="notice-banner"><span aria-hidden="true">ⓘ</span><span>${escapeHtml(t(statusMessages[nearby.status]))}</span></div>` : "";
  let body;
  if (!records.length) {
    body = emptyState("noRecords", "noRecordsHelp", `<button class="button primary" data-action="add-shelter">＋ ${escapeHtml(t("addShelter"))}</button>`);
  } else if (nearby.status === "ready") {
    const located = records.filter(hasCoordinates).map((record) => ({ record, distance: distanceKm(nearby.position.lat, nearby.position.lon, Number(record.latitude), Number(record.longitude)) })).sort((a, b) => a.distance - b.distance);
    const others = records.filter((record) => !hasCoordinates(record));
    body = `${located.length ? `<p class="page-subtitle">${escapeHtml(t("sortedByDistance"))}</p><div class="list-grid">${located.map((item) => nearbyShelterRow(item.record, item.distance)).join("")}</div>` : `<div class="notice-banner"><span aria-hidden="true">ⓘ</span><span>${escapeHtml(t("noLocatedShelters"))}</span></div>`}
      ${others.length ? `<h2 class="section-title">${escapeHtml(t("noCoordsShelters"))}</h2><div class="list-grid">${others.map((record) => nearbyShelterRow(record, null)).join("")}</div>` : ""}`;
  } else {
    body = `<div class="list-grid">${[...records].sort((a, b) => a.district.localeCompare(b.district)).map((record) => nearbyShelterRow(record, null)).join("")}</div>`;
  }
  return `${heading("nearbyTitle", "nearbySubtitle", `<button class="button primary" data-p1="locate">⌖ ${escapeHtml(t("useLocation"))}</button>`)}${notice("locationPrivacy")}${status}${body}`;
}
function requestLocation() {
  if (!navigator.geolocation) { nearby = { status: "unsupported", position: null }; renderPage(); return; }
  nearby = { status: "locating", position: null };
  renderPage();
  navigator.geolocation.getCurrentPosition(
    (position) => { nearby = { status: "ready", position: { lat: position.coords.latitude, lon: position.coords.longitude } }; if (currentPage === "nearby") renderPage(); },
    (error) => { nearby = { status: error.code === 1 ? "denied" : "unavailable", position: null }; if (currentPage === "nearby") renderPage(); },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
  );
}

function renderHazards() {
  const steps = [1, 2, 3, 4, 5].map((n) => `${hazardChoice}${n}`);
  const done = new Set(getChecks(`hazard-${hazardChoice}`));
  const tabs = HAZARDS.map((id) => `<button class="hazard-tab ${id === hazardChoice ? "active" : ""}" data-p1="hazard" data-id="${id}" aria-pressed="${id === hazardChoice}">${escapeHtml(t(id))}</button>`).join("");
  return `${heading("hazardTitle", "hazardSubtitle")}${notice("hazardOfficial")}
    <div class="hazard-tabs" role="group">${tabs}</div>
    <section class="card page-card"><div class="card-heading"><div><h2>${escapeHtml(t(hazardChoice))}</h2><p>${done.size}/${steps.length} ${escapeHtml(t("stepsDone"))}</p></div>
      <div class="heading-actions"><button class="button primary small" data-p1="speak">🔊 ${escapeHtml(t("listen"))}</button><button class="button small" data-p1="stop">${escapeHtml(t("stopListening"))}</button></div></div>
      ${hazardStagesHtml(hazardChoice, done)}
      <p class="page-subtitle" style="margin-top:12px">${escapeHtml(t("speechNote"))}</p></section>`;
}
function stopSpeech() { if ("speechSynthesis" in window) window.speechSynthesis.cancel(); }
function speakHazard() {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") { showToast(t("speechUnsupported")); return; }
  const lang = SPEECH_LANGUAGES[language] || "en-IN";
  const voices = window.speechSynthesis.getVoices();
  if (voices.length && !voices.some((voice) => voice.lang.toLowerCase().startsWith(lang.slice(0, 2)))) { showToast(t("noVoice")); return; }
  const text = [t(hazardChoice), ...[1, 2, 3, 4, 5].map((n) => t(`${hazardChoice}${n}`)), t("hazardOfficial")].join(". ");
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function renderAssessment() {
  const records = getShelters();
  if (!records.length) return `${heading("assessmentTitle", "assessmentSubtitle")}${notice("assessmentNote")}${emptyState("noRecords", "noRecordsHelp", `<button class="button primary" data-action="add-shelter">＋ ${escapeHtml(t("addShelter"))}</button>`)}`;
  const cards = [...records].sort((a, b) => recordedFacilityPercent(a) - recordedFacilityPercent(b)).map((record) => {
    const percent = recordedFacilityPercent(record);
    const label = percent >= 75 ? "scoreStrong" : percent >= 50 ? "scoreSome" : "scoreLow";
    const rows = SHELTER_FACILITIES.map(([field, key]) => { const has = record.facilities?.includes(field); return `<li class="${has ? "has" : "missing"}"><span aria-hidden="true">${has ? "✓" : "–"}</span>${escapeHtml(t(key))}${has ? "" : ` <small>(${escapeHtml(t("notRecorded"))})</small>`}</li>`; }).join("");
    const recorded = SHELTER_FACILITIES.filter(([field]) => record.facilities?.includes(field)).length;
    return `<article class="card page-card assessment-card"><div class="score-ring" style="--pct:${percent}"><span>${percent}%</span></div>
      <div><h3>${escapeHtml(record.name)}</h3><p class="page-subtitle">${escapeHtml(record.district)} · ${recorded}/${SHELTER_FACILITIES.length} ${escapeHtml(t("facilitiesRecorded"))}</p><span class="review-badge">${escapeHtml(t(label))}</span>
      <ul class="facility-status">${rows}</ul></div></article>`;
  }).join("");
  return `${heading("assessmentTitle", "assessmentSubtitle")}${notice("assessmentNote")}<div class="list-grid">${cards}</div>`;
}

function renderGaps() {
  const records = getShelters();
  if (!records.length) return `${heading("gapsTitle", "gapsSubtitle")}${notice("gapsNote")}${emptyState("noRecords", "noRecordsHelp", `<button class="button primary" data-action="add-shelter">＋ ${escapeHtml(t("addShelter"))}</button>`)}`;
  const matrix = SHELTER_FACILITIES.map(([field, key]) => {
    const count = records.filter((record) => record.facilities?.includes(field)).length;
    const percent = Math.round(count / records.length * 100);
    return `<div class="gap-row ${count === 0 ? "gap-none" : ""}"><span>${escapeHtml(t(key))}</span><strong>${count}/${records.length}</strong><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div>${count === 0 ? `<small>${escapeHtml(t("noneRecord"))}</small>` : `<small>${count} ${escapeHtml(t("sheltersRecording"))}</small>`}</div>`;
  }).join("");
  const districts = [...new Set(records.map((record) => record.district.trim()))].sort((a, b) => a.localeCompare(b)).map((district) => {
    const group = records.filter((record) => record.district.trim() === district);
    const capacity = group.reduce((sum, record) => sum + Number(record.capacity || 0), 0);
    const missing = SHELTER_FACILITIES.filter(([field]) => !group.some((record) => record.facilities?.includes(field))).map(([, key]) => t(key));
    return `<div class="district-row"><div><strong>${escapeHtml(district)}</strong><small>${group.length} ${escapeHtml(t("sheltersWord"))} · ${escapeHtml(t("recordedCapacity"))}: ${formatCapacity(capacity)}</small></div><div class="gap-tags">${missing.length ? missing.map((name) => `<span>${escapeHtml(t("missingWord"))}: ${escapeHtml(name)}</span>`).join("") : `<span class="ok">${escapeHtml(t("allRecorded"))}</span>`}</div></div>`;
  }).join("");
  const priority = records.map((record) => ({ record, missing: SHELTER_FACILITIES.filter(([field]) => !record.facilities?.includes(field)).map(([, key]) => t(key)) }))
    .filter((item) => item.missing.length).sort((a, b) => b.missing.length - a.missing.length).slice(0, 5)
    .map((item) => `<div class="district-row"><div><strong>${escapeHtml(item.record.name)}</strong><small>${escapeHtml(item.record.district)}</small></div><div class="gap-tags">${item.missing.map((name) => `<span>${escapeHtml(name)}</span>`).join("")}</div></div>`).join("");
  return `${heading("gapsTitle", "gapsSubtitle")}${notice("gapsNote")}
    <section class="card page-card"><h2>${escapeHtml(t("facilities"))}</h2><div class="gap-matrix">${matrix}</div></section>
    <section class="card page-card" style="margin-top:14px"><h2>${escapeHtml(t("byDistrict"))}</h2>${districts}</section>
    ${priority ? `<section class="card page-card" style="margin-top:14px"><h2>${escapeHtml(t("priorityShelters"))}</h2>${priority}</section>` : ""}`;
}

function simBarsHtml() {
  return `<div class="sim-bars">${["simCurrent", "simAfter", "simDemand"].map((key, index) => `<div class="sim-bar"><span>${escapeHtml(t(key))}</span><div class="progress-track"><div class="progress-fill sim-${index}" id="simBar${index}" style="width:0"></div></div><strong id="simValue${index}">—</strong></div>`).join("")}</div>`;
}
function updateSimBars(total, after, demand) {
  const values = [total, after, demand];
  const max = Math.max(1, ...values.filter((value) => value !== null));
  values.forEach((value, index) => {
    const bar = document.getElementById(`simBar${index}`), label = document.getElementById(`simValue${index}`);
    if (!bar || !label) return;
    bar.style.width = value === null ? "0" : `${Math.round(value / max * 100)}%`;
    label.textContent = value === null ? "—" : formatCapacity(value);
  });
}

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-p1]");
  if (!control) return;
  switch (control.dataset.p1) {
    case "locate": requestLocation(); break;
    case "hazard": stopSpeech(); hazardChoice = HAZARDS.includes(control.dataset.id) ? control.dataset.id : "cyclone"; renderPage(); break;
    case "speak": speakHazard(); break;
    case "stop": stopSpeech(); break;
    case "occupancy": openOccupancyForm(control.dataset.id); break;
  }
});
document.addEventListener("submit", (event) => {
  if (event.target.id !== "occupancyForm") return;
  event.preventDefault();
  saveOccupancy(event.target);
});
