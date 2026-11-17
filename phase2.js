const PHASE2_MESSAGES = {
  en: {
    notConnected: "NDMA Sachet feed", alertsNotConnected: "Official alerts for Odisha come from the NDMA Sachet feed. Open the alerts centre to read the latest items.",
    alertsNote: "Alerts can be delayed or expired. Always confirm with your local disaster-management authority or call 1077.", alertBannerBody: "Open the official alerts centre",
    navWeather: "Weather", navCompare: "Compare shelters", navPlan: "Resource planning", navTriage: "Report triage", navTranslate: "Translate",
    aiReady: "AI connected", aiOff: "AI not set up on this server", aiChecking: "Checking AI…",
    aiOffHelp: "Add GROQ_API_KEY or GEMINI_API_KEY on the server to turn on AI features. Everything else works without it.",
    aiDisclaimer: "AI answers are general guidance and may be wrong. They are not official warnings. If you are in danger, call 112.",
    aiError: "Could not get an answer right now. Please try again.", loading: "Loading…", retry: "Retry", copy: "Copy", copied: "Copied", aiGenerated: "AI-generated · may contain errors",
    weatherTitle: "Weather", weatherSubtitle: "Current conditions and a 4-day model forecast for a place you choose.",
    weatherNote: "Model forecast from Open-Meteo, not an IMD warning. Check official alerts before acting.",
    weatherPlace: "Place", myLocation: "My location (not saved)", enterCoords: "Enter coordinates", latitude: "Latitude", longitude: "Longitude", getWeather: "Get weather",
    weatherFail: "Weather could not be loaded. Check your connection and try again.", cachedWarning: "Offline copy · data may be outdated. Last fetched {time}. Do not use this as a current warning.", weatherPickFirst: "Choose a place to see the weather.", weatherCoordsInvalid: "Enter valid latitude and longitude.",
    nowLabel: "Now", feelsLike: "Feels like", humidity: "Humidity", windLabel: "Wind", gustsLabel: "Gusts", rainLabel: "Rain", nextDays: "Next days",
    strongNote: "The model forecast shows strong wind or very heavy rain on at least one day. Check official IMD and OSDMA warnings.",
    wx_clear: "Clear", wx_cloud: "Cloudy", wx_fog: "Fog", wx_drizzle: "Drizzle", wx_rain: "Rain", wx_shower: "Showers", wx_thunder: "Thunderstorm", wx_other: "Other",
    alertsCentreTitle: "Official alerts centre", alertsCentreSubtitle: "Latest items from the national alert feed for Odisha.",
    alertsSourceNote: "Source: NDMA Sachet CAP feed for Odisha. This reminder appears because feed items may be delayed or expired; it is not itself an alert. Confirm with local authorities or call 1077.", alertSourceLink: "Open official Odisha RSS feed", alertPortalLink: "NDMA SACHET portal",
    alertsEmpty: "The feed has no items right now.", alertsFail: "The official alert feed could not be reached. This does not mean nothing is happening. Check IMD, OSDMA or call 1077.",
    openSource: "Open official source", summarise: "Summarise", translateAlert: "Translate", refreshAlerts: "Refresh feed", alertsUpdated: "Feed fetched", alertsCount: "{n} items in the official Odisha feed",
    riskMapNote: "Official cyclone and flood hazard-zone layers are not connected. This map shows only shelter records entered on this device. Use Official alerts for warnings.",
    mapLoadFail: "The map could not be loaded. Use the list below.", mapListTitle: "Shelters with coordinates",
    aiTitle: "Aapada AI assistant", aiSubtitle: "Ask general preparedness questions by typing or speaking.",
    chatPlaceholder: "Ask about cyclone safety…", send: "Send", speak: "Speak", listening: "Listening… tap to stop", thinking: "Thinking…",
    micUnsupported: "Voice input is not supported in this browser. Please type.", micError: "Voice input did not work. Please type your question.",
    starter1: "What should I pack in an emergency kit?", starter2: "How do I stay safe during a cyclone?", starter3: "What should I do after a flood?",
    chatPrivacy: "Your messages are sent to Groq and may be sent to Gemini if Groq is unavailable. Do not include sensitive information.",
    translateTitle: "AI translation", translateSubtitle: "Translate safety messages between Odia, English and Hindi.",
    translationNote: "Machine translation. Ask a native speaker to check important safety messages.",
    dirEnOr: "English → Odia", dirOrEn: "Odia → English", dirEnHi: "English → Hindi", dirHiEn: "Hindi → English",
    textToTranslate: "Text to translate", translateBtn: "Translate", translationResult: "Translation",
    compareTitle: "Shelter comparison", compareSubtitle: "Compare shelter records side by side.",
    compareNote: "A side-by-side view of records entered on this device. Records are unverified and this is not a safety ranking.",
    pickShelters: "Select 2 to 4 shelters", compareNeed: "Select at least 2 shelters to compare.", compareTooMany: "You can compare up to 4 shelters.",
    aiNoteBtn: "Get AI note", aiSends: "Sends only the name, district, capacity, occupancy and facilities of the selected shelters. No contact details or location.",
    planTitle: "Resource planning", planSubtitle: "Planning notes based on the facilities and capacity recorded.",
    planNote: "Planning aid from recorded data only. It does not predict how many people will arrive.",
    planNone: "Add shelter records to see planning notes.", planVerify: "Facilities to verify or arrange", planMissingLine: "{n} of {total} shelters have no record of: {facility}",
    planAllRecorded: "Every facility is recorded for every shelter.", planTotals: "Recorded totals",
    triageTitle: "Report triage", triageSubtitle: "Sort citizen and volunteer reports by type and urgency.",
    triageNote: "Reports stay on this device and are not sent to authorities. Do not include names or phone numbers. For emergencies call 112.",
    reportText: "Describe the report", classifyBtn: "Classify report", savedReports: "Saved on this device", noReports: "No reports yet.",
    triageReview: "A person must review every classification before acting.", methodAi: "AI suggestion", methodRules: "Keyword rules (AI off)", reasonLabel: "Reason",
    reportEmpty: "Write the report first.",
    cat_shelter_issue: "Shelter issue", cat_medical: "Medical", cat_water_sanitation: "Water / sanitation", cat_road_blocked: "Road blocked", cat_missing_person: "Missing person",
    cat_power_outage: "Power outage", cat_infrastructure_damage: "Infrastructure damage", cat_information_request: "Information request", cat_other: "Other",
    urg_low: "Low", urg_medium: "Medium", urg_high: "High", urgencyLabel: "Urgency"
  },
  hi: {
    notConnected: "NDMA Sachet फ़ीड", alertsNotConnected: "ओडिशा के आधिकारिक अलर्ट NDMA Sachet फ़ीड से आते हैं। ताज़ा प्रविष्टियाँ पढ़ने के लिए अलर्ट केंद्र खोलें।",
    alertsNote: "अलर्ट देर से आ सकते हैं या समाप्त हो सकते हैं। हमेशा स्थानीय आपदा प्रबंधन प्राधिकरण से पुष्टि करें या 1077 पर कॉल करें।", alertBannerBody: "आधिकारिक अलर्ट केंद्र खोलें",
    navWeather: "मौसम", navCompare: "आश्रय तुलना", navPlan: "संसाधन योजना", navTriage: "रिपोर्ट छँटाई", navTranslate: "अनुवाद",
    aiReady: "AI जुड़ा है", aiOff: "इस सर्वर पर AI सेट नहीं है", aiChecking: "AI जाँच रहे हैं…",
    aiOffHelp: "AI सुविधाएँ चालू करने के लिए सर्वर पर GROQ_API_KEY या GEMINI_API_KEY जोड़ें। बाकी सब इसके बिना चलता है।",
    aiDisclaimer: "AI के उत्तर सामान्य मार्गदर्शन हैं और गलत हो सकते हैं। ये आधिकारिक चेतावनी नहीं हैं। खतरे में हों तो 112 पर कॉल करें।",
    aiError: "अभी उत्तर नहीं मिल सका। कृपया फिर कोशिश करें।", loading: "लोड हो रहा है…", retry: "फिर कोशिश करें", copy: "कॉपी करें", copied: "कॉपी हो गया", aiGenerated: "AI द्वारा बनाया गया · गलतियाँ हो सकती हैं",
    weatherTitle: "मौसम", weatherSubtitle: "आपके चुने स्थान की मौजूदा स्थिति और 4 दिन का मॉडल पूर्वानुमान।",
    weatherNote: "Open-Meteo का मॉडल पूर्वानुमान, IMD की चेतावनी नहीं। कदम उठाने से पहले आधिकारिक अलर्ट देखें।",
    weatherPlace: "स्थान", myLocation: "मेरी लोकेशन (सेव नहीं होती)", enterCoords: "निर्देशांक दर्ज करें", latitude: "अक्षांश", longitude: "देशांतर", getWeather: "मौसम देखें",
    weatherFail: "मौसम लोड नहीं हो सका। कनेक्शन जाँचकर फिर कोशिश करें।", cachedWarning: "ऑफ़लाइन कॉपी · डेटा पुराना हो सकता है। पिछली बार {time} पर प्राप्त हुआ। इसे मौजूदा चेतावनी न मानें।", weatherPickFirst: "मौसम देखने के लिए स्थान चुनें।", weatherCoordsInvalid: "सही अक्षांश और देशांतर दर्ज करें।",
    nowLabel: "अभी", feelsLike: "महसूस होता है", humidity: "नमी", windLabel: "हवा", gustsLabel: "झोंके", rainLabel: "बारिश", nextDays: "अगले दिन",
    strongNote: "मॉडल पूर्वानुमान में कम से कम एक दिन तेज़ हवा या बहुत भारी बारिश दिख रही है। IMD और OSDMA की आधिकारिक चेतावनी देखें।",
    wx_clear: "साफ़", wx_cloud: "बादल", wx_fog: "कोहरा", wx_drizzle: "फुहार", wx_rain: "बारिश", wx_shower: "बौछारें", wx_thunder: "आँधी-तूफ़ान", wx_other: "अन्य",
    alertsCentreTitle: "आधिकारिक अलर्ट केंद्र", alertsCentreSubtitle: "ओडिशा के लिए राष्ट्रीय अलर्ट फ़ीड की ताज़ा प्रविष्टियाँ।",
    alertsSourceNote: "स्रोत: ओडिशा के लिए NDMA Sachet CAP फ़ीड। यह सूचना इसलिए है क्योंकि फ़ीड की प्रविष्टियाँ देर से आ सकती हैं या समाप्त हो सकती हैं; यह स्वयं कोई अलर्ट नहीं है। स्थानीय अधिकारियों से पुष्टि करें या 1077 पर कॉल करें।", alertSourceLink: "आधिकारिक ओडिशा RSS फ़ीड खोलें", alertPortalLink: "NDMA SACHET पोर्टल",
    alertsEmpty: "फ़ीड में अभी कोई प्रविष्टि नहीं है।", alertsFail: "आधिकारिक अलर्ट फ़ीड नहीं मिल सकी। इसका मतलब यह नहीं कि कुछ नहीं हो रहा। IMD, OSDMA देखें या 1077 पर कॉल करें।",
    openSource: "आधिकारिक स्रोत खोलें", summarise: "सारांश", translateAlert: "अनुवाद", refreshAlerts: "फ़ीड ताज़ा करें", alertsUpdated: "फ़ीड प्राप्त हुई", alertsCount: "आधिकारिक ओडिशा फ़ीड में {n} प्रविष्टियाँ",
    riskMapNote: "आधिकारिक चक्रवात और बाढ़ जोखिम-क्षेत्र परतें जुड़ी नहीं हैं। यह मानचित्र केवल इस डिवाइस पर दर्ज आश्रय रिकॉर्ड दिखाता है। चेतावनी के लिए आधिकारिक अलर्ट देखें।",
    mapLoadFail: "मानचित्र लोड नहीं हो सका। नीचे की सूची देखें।", mapListTitle: "निर्देशांक वाले आश्रय",
    aiTitle: "आपदा AI सहायक", aiSubtitle: "टाइप करके या बोलकर तैयारी के सामान्य प्रश्न पूछें।",
    chatPlaceholder: "चक्रवात सुरक्षा के बारे में पूछें…", send: "भेजें", speak: "बोलें", listening: "सुन रहे हैं… रोकने के लिए दबाएँ", thinking: "सोच रहे हैं…",
    micUnsupported: "इस ब्राउज़र में आवाज़ से इनपुट समर्थित नहीं है। कृपया टाइप करें।", micError: "आवाज़ इनपुट काम नहीं किया। कृपया प्रश्न टाइप करें।",
    starter1: "इमरजेंसी किट में क्या रखें?", starter2: "चक्रवात के दौरान सुरक्षित कैसे रहें?", starter3: "बाढ़ के बाद क्या करें?",
    chatPrivacy: "आपके संदेश Groq को भेजे जाते हैं और Groq उपलब्ध न होने पर Gemini को भी भेजे जा सकते हैं। संवेदनशील जानकारी न लिखें।",
    translateTitle: "AI अनुवाद", translateSubtitle: "सुरक्षा संदेशों का ओड़िया, अंग्रेज़ी और हिंदी में अनुवाद करें।",
    translationNote: "मशीन अनुवाद। ज़रूरी सुरक्षा संदेश किसी मातृभाषी से जँचवाएँ।",
    dirEnOr: "अंग्रेज़ी → ओड़िया", dirOrEn: "ओड़िया → अंग्रेज़ी", dirEnHi: "अंग्रेज़ी → हिंदी", dirHiEn: "हिंदी → अंग्रेज़ी",
    textToTranslate: "अनुवाद के लिए पाठ", translateBtn: "अनुवाद करें", translationResult: "अनुवाद",
    compareTitle: "आश्रय तुलना", compareSubtitle: "आश्रय रिकॉर्ड साथ-साथ देखें।",
    compareNote: "इस डिवाइस पर दर्ज रिकॉर्ड की साथ-साथ तुलना। रिकॉर्ड असत्यापित हैं और यह सुरक्षा रैंकिंग नहीं है।",
    pickShelters: "2 से 4 आश्रय चुनें", compareNeed: "तुलना के लिए कम से कम 2 आश्रय चुनें।", compareTooMany: "आप अधिकतम 4 आश्रयों की तुलना कर सकते हैं।",
    aiNoteBtn: "AI टिप्पणी पाएँ", aiSends: "केवल चुने आश्रयों का नाम, ज़िला, क्षमता, अधिभोग और सुविधाएँ भेजी जाती हैं। संपर्क विवरण या लोकेशन नहीं।",
    planTitle: "संसाधन योजना", planSubtitle: "दर्ज सुविधाओं और क्षमता पर आधारित योजना-टिप्पणियाँ।",
    planNote: "केवल दर्ज डेटा पर आधारित योजना सहायक। यह नहीं बताता कि कितने लोग आएँगे।",
    planNone: "योजना-टिप्पणियाँ देखने के लिए आश्रय रिकॉर्ड जोड़ें।", planVerify: "जाँचने या जुटाने योग्य सुविधाएँ", planMissingLine: "{total} में से {n} आश्रयों में इसका रिकॉर्ड नहीं: {facility}",
    planAllRecorded: "हर आश्रय की हर सुविधा दर्ज है।", planTotals: "दर्ज कुल",
    triageTitle: "रिपोर्ट छँटाई", triageSubtitle: "नागरिक और स्वयंसेवक रिपोर्ट को प्रकार और तात्कालिकता से छाँटें।",
    triageNote: "रिपोर्ट इसी डिवाइस पर रहती हैं और अधिकारियों को नहीं भेजी जातीं। नाम या फ़ोन नंबर न लिखें। आपातकाल में 112 पर कॉल करें।",
    reportText: "रिपोर्ट लिखें", classifyBtn: "रिपोर्ट वर्गीकृत करें", savedReports: "इस डिवाइस पर सहेजी", noReports: "अभी कोई रिपोर्ट नहीं।",
    triageReview: "कार्रवाई से पहले हर वर्गीकरण को किसी व्यक्ति को जाँचना होगा।", methodAi: "AI सुझाव", methodRules: "कीवर्ड नियम (AI बंद)", reasonLabel: "कारण",
    reportEmpty: "पहले रिपोर्ट लिखें।",
    cat_shelter_issue: "आश्रय की समस्या", cat_medical: "चिकित्सा", cat_water_sanitation: "पानी / स्वच्छता", cat_road_blocked: "सड़क बंद", cat_missing_person: "लापता व्यक्ति",
    cat_power_outage: "बिजली गुल", cat_infrastructure_damage: "ढाँचे को नुकसान", cat_information_request: "जानकारी का अनुरोध", cat_other: "अन्य",
    urg_low: "कम", urg_medium: "मध्यम", urg_high: "उच्च", urgencyLabel: "तात्कालिकता"
  },
  or: {
    notConnected: "NDMA Sachet ଫିଡ୍", alertsNotConnected: "ଓଡ଼ିଶାର ସରକାରୀ ସତର୍କତା NDMA Sachet ଫିଡ୍ ରୁ ଆସେ। ନୂଆ ବିବରଣୀ ପଢ଼ିବାକୁ ସତର୍କତା କେନ୍ଦ୍ର ଖୋଲନ୍ତୁ।",
    alertsNote: "ସତର୍କତା ବିଳମ୍ବିତ କିମ୍ବା ସମାପ୍ତ ହୋଇପାରେ। ସବୁବେଳେ ସ୍ଥାନୀୟ ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା କର୍ତ୍ତୃପକ୍ଷଙ୍କୁ ପଚାରନ୍ତୁ କିମ୍ବା 1077 ଡାଏଲ୍ କରନ୍ତୁ।", alertBannerBody: "ସରକାରୀ ସତର୍କତା କେନ୍ଦ୍ର ଖୋଲନ୍ତୁ",
    navWeather: "ପାଣିପାଗ", navCompare: "ଆଶ୍ରୟସ୍ଥଳ ତୁଳନା", navPlan: "ସମ୍ବଳ ଯୋଜନା", navTriage: "ରିପୋର୍ଟ ବାଛଣା", navTranslate: "ଅନୁବାଦ",
    aiReady: "AI ସଂଯୁକ୍ତ", aiOff: "ଏହି ସର୍ଭରରେ AI ସେଟ୍ ହୋଇନାହିଁ", aiChecking: "AI ଯାଞ୍ଚ କରୁଛୁ…",
    aiOffHelp: "AI ସୁବିଧା ଚାଲୁ କରିବାକୁ ସର୍ଭରରେ GROQ_API_KEY କିମ୍ବା GEMINI_API_KEY ଯୋଡ଼ନ୍ତୁ। ଅନ୍ୟ ସବୁ ଏହା ବିନା ଚାଲେ।",
    aiDisclaimer: "AI ଉତ୍ତର ସାଧାରଣ ମାର୍ଗଦର୍ଶନ ଏବଂ ଭୁଲ ହୋଇପାରେ। ଏହା ସରକାରୀ ସତର୍କତା ନୁହେଁ। ବିପଦରେ ଥିଲେ 112 ଡାଏଲ୍ କରନ୍ତୁ।",
    aiError: "ଏବେ ଉତ୍ତର ମିଳିପାରିଲା ନାହିଁ। ଦୟାକରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।", loading: "ଲୋଡ୍ ହେଉଛି…", retry: "ପୁଣି ଚେଷ୍ଟା", copy: "କପି", copied: "କପି ହୋଇଗଲା", aiGenerated: "AI ଦ୍ୱାରା ତିଆରି · ଭୁଲ ଥାଇପାରେ",
    weatherTitle: "ପାଣିପାଗ", weatherSubtitle: "ଆପଣ ବାଛିଥିବା ସ୍ଥାନର ବର୍ତ୍ତମାନ ଅବସ୍ଥା ଏବଂ 4 ଦିନର ମଡେଲ୍ ପୂର୍ବାନୁମାନ।",
    weatherNote: "Open-Meteo ର ମଡେଲ୍ ପୂର୍ବାନୁମାନ, IMD ସତର୍କତା ନୁହେଁ। କାର୍ଯ୍ୟ ପୂର୍ବରୁ ସରକାରୀ ସତର୍କତା ଦେଖନ୍ତୁ।",
    weatherPlace: "ସ୍ଥାନ", myLocation: "ମୋ ଲୋକେସନ୍ (ସେଭ୍ ହୁଏ ନାହିଁ)", enterCoords: "ସ୍ଥାନାଙ୍କ ଦିଅନ୍ତୁ", latitude: "ଅକ୍ଷାଂଶ", longitude: "ଦ୍ରାଘିମା", getWeather: "ପାଣିପାଗ ଦେଖନ୍ତୁ",
    weatherFail: "ପାଣିପାଗ ଲୋଡ୍ ହେଲା ନାହିଁ। ସଂଯୋଗ ଯାଞ୍ଚ କରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।", cachedWarning: "ଅଫଲାଇନ୍ କପି · ତଥ୍ୟ ପୁରୁଣା ହୋଇପାରେ। ଶେଷ ଥର {time} ରେ ଆସିଥିଲା। ଏହାକୁ ବର୍ତ୍ତମାନର ସତର୍କତା ଭାବେ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।", weatherPickFirst: "ପାଣିପାଗ ଦେଖିବାକୁ ସ୍ଥାନ ବାଛନ୍ତୁ।", weatherCoordsInvalid: "ସଠିକ୍ ଅକ୍ଷାଂଶ ଓ ଦ୍ରାଘିମା ଦିଅନ୍ତୁ।",
    nowLabel: "ଏବେ", feelsLike: "ଅନୁଭବ", humidity: "ଆର୍ଦ୍ରତା", windLabel: "ପବନ", gustsLabel: "ଝଟକା", rainLabel: "ବର୍ଷା", nextDays: "ଆଗାମୀ ଦିନ",
    strongNote: "ମଡେଲ୍ ପୂର୍ବାନୁମାନରେ ଅତିକମରେ ଏକ ଦିନ ପ୍ରବଳ ପବନ କିମ୍ବା ଅତି ଭାରି ବର୍ଷା ଦେଖାଯାଉଛି। IMD ଓ OSDMA ର ସରକାରୀ ସତର୍କତା ଦେଖନ୍ତୁ।",
    wx_clear: "ସଫା", wx_cloud: "ମେଘୁଆ", wx_fog: "କୁହୁଡ଼ି", wx_drizzle: "ଟୁପୁରା", wx_rain: "ବର୍ଷା", wx_shower: "ଝିପିଝିପି", wx_thunder: "ବଜ୍ରପାତ ସହ ଝଡ଼", wx_other: "ଅନ୍ୟ",
    alertsCentreTitle: "ସରକାରୀ ସତର୍କତା କେନ୍ଦ୍ର", alertsCentreSubtitle: "ଓଡ଼ିଶା ପାଇଁ ଜାତୀୟ ସତର୍କତା ଫିଡ୍ ର ନୂଆ ବିବରଣୀ।",
    alertsSourceNote: "ଉତ୍ସ: ଓଡ଼ିଶା ପାଇଁ NDMA Sachet CAP ଫିଡ୍। ଫିଡ୍‌ର ସୂଚନା ବିଳମ୍ବିତ କିମ୍ବା ସମାପ୍ତ ହୋଇପାରେ ବୋଲି ଏହି ସୂଚନା ଦିଆଯାଇଛି; ଏହା ନିଜେ କୌଣସି ସତର୍କତା ନୁହେଁ। ସ୍ଥାନୀୟ କର୍ତ୍ତୃପକ୍ଷଙ୍କୁ ପଚାରନ୍ତୁ କିମ୍ବା 1077 ଡାଏଲ୍ କରନ୍ତୁ।", alertSourceLink: "ସରକାରୀ ଓଡ଼ିଶା RSS ଫିଡ୍ ଖୋଲନ୍ତୁ", alertPortalLink: "NDMA SACHET ପୋର୍ଟାଲ୍",
    alertsEmpty: "ଫିଡ୍ ରେ ଏବେ କିଛି ନାହିଁ।", alertsFail: "ସରକାରୀ ସତର୍କତା ଫିଡ୍ ମିଳିଲା ନାହିଁ। ଏହାର ଅର୍ଥ କିଛି ହେଉନାହିଁ ନୁହେଁ। IMD, OSDMA ଦେଖନ୍ତୁ କିମ୍ବା 1077 ଡାଏଲ୍ କରନ୍ତୁ।",
    openSource: "ସରକାରୀ ଉତ୍ସ ଖୋଲନ୍ତୁ", summarise: "ସାରାଂଶ", translateAlert: "ଅନୁବାଦ", refreshAlerts: "ଫିଡ୍ ସତେଜ କରନ୍ତୁ", alertsUpdated: "ଫିଡ୍ ଆଣାଗଲା", alertsCount: "ସରକାରୀ ଓଡ଼ିଶା ଫିଡ୍ ରେ {n} ଟି ବିବରଣୀ",
    riskMapNote: "ସରକାରୀ ବାତ୍ୟା ଓ ବନ୍ୟା ବିପଦ-ଅଞ୍ଚଳ ସ୍ତର ସଂଯୁକ୍ତ ନାହିଁ। ଏହି ମାନଚିତ୍ର କେବଳ ଏହି ଡିଭାଇସ୍‌ରେ ଦିଆଯାଇଥିବା ଆଶ୍ରୟସ୍ଥଳ ଦେଖାଏ। ସତର୍କତା ପାଇଁ ସରକାରୀ ସତର୍କତା ଦେଖନ୍ତୁ।",
    mapLoadFail: "ମାନଚିତ୍ର ଲୋଡ୍ ହେଲା ନାହିଁ। ତଳ ତାଲିକା ଦେଖନ୍ତୁ।", mapListTitle: "ସ୍ଥାନାଙ୍କ ଥିବା ଆଶ୍ରୟସ୍ଥଳ",
    aiTitle: "ଆପଦା AI ସହାୟକ", aiSubtitle: "ଟାଇପ୍ କରି କିମ୍ବା କହି ପ୍ରସ୍ତୁତିର ସାଧାରଣ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ।",
    chatPlaceholder: "ବାତ୍ୟା ସୁରକ୍ଷା ବିଷୟରେ ପଚାରନ୍ତୁ…", send: "ପଠାନ୍ତୁ", speak: "କୁହନ୍ତୁ", listening: "ଶୁଣୁଛି… ବନ୍ଦ କରିବାକୁ ଦବାନ୍ତୁ", thinking: "ଚିନ୍ତା କରୁଛି…",
    micUnsupported: "ଏହି ବ୍ରାଉଜରରେ ଭଏସ୍ ଇନପୁଟ୍ ସମର୍ଥିତ ନୁହେଁ। ଦୟାକରି ଟାଇପ୍ କରନ୍ତୁ।", micError: "ଭଏସ୍ ଇନପୁଟ୍ ଚାଲିଲା ନାହିଁ। ଦୟାକରି ପ୍ରଶ୍ନ ଟାଇପ୍ କରନ୍ତୁ।",
    starter1: "ଜରୁରୀ କିଟ୍ ରେ କ'ଣ ରଖିବି?", starter2: "ବାତ୍ୟା ସମୟରେ କିପରି ସୁରକ୍ଷିତ ରହିବି?", starter3: "ବନ୍ୟା ପରେ କ'ଣ କରିବି?",
    chatPrivacy: "ଆପଣଙ୍କ ବାର୍ତ୍ତା Groq କୁ ପଠାଯାଏ ଏବଂ Groq ଉପଲବ୍ଧ ନଥିଲେ Gemini କୁ ମଧ୍ୟ ପଠାଯାଇପାରେ। ସମ୍ବେଦନଶୀଳ ତଥ୍ୟ ଲେଖନ୍ତୁ ନାହିଁ।",
    translateTitle: "AI ଅନୁବାଦ", translateSubtitle: "ସୁରକ୍ଷା ବାର୍ତ୍ତାକୁ ଓଡ଼ିଆ, ଇଂରାଜୀ ଓ ହିନ୍ଦୀରେ ଅନୁବାଦ କରନ୍ତୁ।",
    translationNote: "ମେସିନ୍ ଅନୁବାଦ। ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସୁରକ୍ଷା ବାର୍ତ୍ତା କୌଣସି ମାତୃଭାଷୀଙ୍କୁ ଦେଖାନ୍ତୁ।",
    dirEnOr: "ଇଂରାଜୀ → ଓଡ଼ିଆ", dirOrEn: "ଓଡ଼ିଆ → ଇଂରାଜୀ", dirEnHi: "ଇଂରାଜୀ → ହିନ୍ଦୀ", dirHiEn: "ହିନ୍ଦୀ → ଇଂରାଜୀ",
    textToTranslate: "ଅନୁବାଦ ପାଇଁ ଲେଖା", translateBtn: "ଅନୁବାଦ କରନ୍ତୁ", translationResult: "ଅନୁବାଦ",
    compareTitle: "ଆଶ୍ରୟସ୍ଥଳ ତୁଳନା", compareSubtitle: "ଆଶ୍ରୟସ୍ଥଳ ରେକର୍ଡ ପାଖାପାଖି ଦେଖନ୍ତୁ।",
    compareNote: "ଏହି ଡିଭାଇସ୍‌ରେ ଦିଆଯାଇଥିବା ରେକର୍ଡର ପାଖାପାଖି ତୁଳନା। ରେକର୍ଡ ଯାଞ୍ଚ ହୋଇନାହିଁ ଏବଂ ଏହା ସୁରକ୍ଷା ର୍ୟାଙ୍କିଂ ନୁହେଁ।",
    pickShelters: "2 ରୁ 4 ଆଶ୍ରୟସ୍ଥଳ ବାଛନ୍ତୁ", compareNeed: "ତୁଳନା ପାଇଁ ଅତିକମରେ 2 ଆଶ୍ରୟସ୍ଥଳ ବାଛନ୍ତୁ।", compareTooMany: "ଆପଣ ସର୍ବାଧିକ 4 ଆଶ୍ରୟସ୍ଥଳ ତୁଳନା କରିପାରିବେ।",
    aiNoteBtn: "AI ମନ୍ତବ୍ୟ ନିଅନ୍ତୁ", aiSends: "କେବଳ ବାଛିଥିବା ଆଶ୍ରୟସ୍ଥଳର ନାମ, ଜିଲ୍ଲା, କ୍ଷମତା, ବାସିନ୍ଦା ସଂଖ୍ୟା ଓ ସୁବିଧା ପଠାଯାଏ। ଯୋଗାଯୋଗ ବିବରଣୀ କିମ୍ବା ଲୋକେସନ୍ ନୁହେଁ।",
    planTitle: "ସମ୍ବଳ ଯୋଜନା", planSubtitle: "ଦିଆଯାଇଥିବା ସୁବିଧା ଓ କ୍ଷମତା ଆଧାରିତ ଯୋଜନା ଟିପ୍ପଣୀ।",
    planNote: "କେବଳ ଦିଆଯାଇଥିବା ତଥ୍ୟ ଆଧାରିତ ଯୋଜନା ସହାୟକ। କେତେ ଲୋକ ଆସିବେ ଏହା କହେ ନାହିଁ।",
    planNone: "ଯୋଜନା ଟିପ୍ପଣୀ ଦେଖିବାକୁ ଆଶ୍ରୟସ୍ଥଳ ରେକର୍ଡ ଯୋଡ଼ନ୍ତୁ।", planVerify: "ଯାଞ୍ଚ କିମ୍ବା ବ୍ୟବସ୍ଥା କରିବାକୁ ସୁବିଧା", planMissingLine: "{total} ମଧ୍ୟରୁ {n} ଆଶ୍ରୟସ୍ଥଳରେ ଏହାର ରେକର୍ଡ ନାହିଁ: {facility}",
    planAllRecorded: "ପ୍ରତ୍ୟେକ ଆଶ୍ରୟସ୍ଥଳର ସବୁ ସୁବିଧା ଦିଆଯାଇଛି।", planTotals: "ଦିଆଯାଇଥିବା ମୋଟ",
    triageTitle: "ରିପୋର୍ଟ ବାଛଣା", triageSubtitle: "ନାଗରିକ ଓ ସ୍ୱେଚ୍ଛାସେବୀ ରିପୋର୍ଟକୁ ପ୍ରକାର ଓ ଜରୁରୀତା ଅନୁସାରେ ବାଛନ୍ତୁ।",
    triageNote: "ରିପୋର୍ଟ ଏହି ଡିଭାଇସ୍‌ରେ ରହେ ଏବଂ କର୍ତ୍ତୃପକ୍ଷଙ୍କୁ ପଠାଯାଏ ନାହିଁ। ନାମ କିମ୍ବା ଫୋନ୍ ନମ୍ବର ଲେଖନ୍ତୁ ନାହିଁ। ଜରୁରୀ ସ୍ଥିତିରେ 112 ଡାଏଲ୍ କରନ୍ତୁ।",
    reportText: "ରିପୋର୍ଟ ଲେଖନ୍ତୁ", classifyBtn: "ରିପୋର୍ଟ ବର୍ଗୀକରଣ", savedReports: "ଏହି ଡିଭାଇସ୍‌ରେ ସଞ୍ଚିତ", noReports: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ରିପୋର୍ଟ ନାହିଁ।",
    triageReview: "କାର୍ଯ୍ୟ ପୂର୍ବରୁ ପ୍ରତ୍ୟେକ ବର୍ଗୀକରଣ କେହି ବ୍ୟକ୍ତି ଯାଞ୍ଚ କରିବେ।", methodAi: "AI ପରାମର୍ଶ", methodRules: "କୀୱାର୍ଡ ନିୟମ (AI ବନ୍ଦ)", reasonLabel: "କାରଣ",
    reportEmpty: "ପ୍ରଥମେ ରିପୋର୍ଟ ଲେଖନ୍ତୁ।",
    cat_shelter_issue: "ଆଶ୍ରୟସ୍ଥଳ ସମସ୍ୟା", cat_medical: "ଚିକିତ୍ସା", cat_water_sanitation: "ପାଣି / ସ୍ୱଚ୍ଛତା", cat_road_blocked: "ରାସ୍ତା ବନ୍ଦ", cat_missing_person: "ନିଖୋଜ ବ୍ୟକ୍ତି",
    cat_power_outage: "ବିଦ୍ୟୁତ୍ ନାହିଁ", cat_infrastructure_damage: "ଭିତ୍ତିଭୂମି କ୍ଷତି", cat_information_request: "ସୂଚନା ଅନୁରୋଧ", cat_other: "ଅନ୍ୟ",
    urg_low: "କମ୍", urg_medium: "ମଧ୍ୟମ", urg_high: "ଉଚ୍ଚ", urgencyLabel: "ଜରୁରୀତା"
  }
};

const AI_PAGES = ["alerts", "assistant", "translate", "compare", "plan", "triage"];
const SPEECH_CODES = { en: "en-IN", hi: "hi-IN", or: "or-IN" };
const CATEGORY_KEYS = ["shelter_issue", "medical", "water_sanitation", "road_blocked", "missing_person", "power_outage", "infrastructure_damage", "information_request", "other"];
const TRIAGE_RULES = {
  medical: ["injur", "medic", "doctor", "ambulance", "pregnan", "bleed", "unconscious", "insulin", "घायल", "दवा", "डॉक्टर", "ଆହତ", "ଡାକ୍ତର", "ଔଷଧ"],
  water_sanitation: ["water", "toilet", "sanitation", "drinking", "पानी", "शौचालय", "ପାଣି", "ଜଳ", "ଶୌଚାଳୟ"],
  road_blocked: ["road", "tree fell", "fallen tree", "blocked", "bridge", "सड़क", "पुल", "ରାସ୍ତା", "ସେତୁ"],
  missing_person: ["missing", "lost child", "cannot find", "can't find", "लापता", "ନିଖୋଜ"],
  power_outage: ["power cut", "no power", "electricity", "blackout", "बिजली", "ବିଦ୍ୟୁତ"],
  infrastructure_damage: ["collapsed", "damaged", "roof", "wall", "broken", "गिर", "टूट", "ଭାଙ୍ଗି", "ଖସି"],
  shelter_issue: ["shelter", "overcrowd", "full", "capacity", "आश्रय", "ଆଶ୍ରୟ"],
  information_request: ["where", "how do", "when", "which", "information", "कहाँ", "कैसे", "କେଉଁଠି", "କିପରି"]
};
const URGENT_WORDS = ["trapped", "drown", "bleeding", "unconscious", "collapsed", "fire", "dying", "not breathing", "stuck", "फंस", "डूब", "बेहोश", "ଫସି", "ବୁଡ଼", "ବେହୋସ"];

let aiReady = null;
const CHAT_KEY = "aapadalens:v1:chatHistory";
let chatMessages = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(CHAT_KEY) || "[]");
    return Array.isArray(saved) ? saved.filter((m) => m && (m.role === "user" || m.role === "model") && typeof m.text === "string").slice(-40) : [];
  } catch { return []; }
})();
function saveChat() {
  try { localStorage.setItem(CHAT_KEY, JSON.stringify(chatMessages.slice(-40))); } catch { /* storage unavailable */ }
}
const CHAT_TEXT = {
  en: { clear: "Clear chat", cleared: "Chat cleared", offline: "You are offline. Connect to the internet and try again.", busy: "Too many requests. Please wait a minute and try again.", off: "AI is not configured on this server.", quota: "AI usage limit reached. Please check your API quota or try again later.", config: "The AI service configuration is invalid. Please contact the administrator.", timeout: "The AI request timed out. Please try again.", network: "Could not connect to the AI service. Check your connection and try again.", unavailable: "The AI service is temporarily unavailable. Please try again later.", error: "The AI service could not complete the request. Please try again later." },
  hi: { clear: "चैट साफ़ करें", cleared: "चैट साफ़ हो गई", offline: "आप ऑफ़लाइन हैं। इंटरनेट जोड़कर फिर कोशिश करें।", busy: "बहुत अधिक अनुरोध। एक मिनट रुककर फिर कोशिश करें।", off: "इस सर्वर पर AI सेट नहीं है।", quota: "AI उपयोग सीमा पूरी हो गई है। API quota जाँचें या बाद में फिर कोशिश करें।", config: "AI सेवा का कॉन्फ़िगरेशन सही नहीं है। कृपया व्यवस्थापक से संपर्क करें।", timeout: "AI अनुरोध में समय अधिक लगा। कृपया फिर कोशिश करें।", network: "AI सेवा से कनेक्ट नहीं हो पाया। इंटरनेट जाँचकर फिर कोशिश करें।", unavailable: "AI सेवा अस्थायी रूप से उपलब्ध नहीं है। बाद में फिर कोशिश करें।", error: "AI सेवा अनुरोध पूरा नहीं कर सकी। कृपया बाद में फिर कोशिश करें।" },
  or: { clear: "ଚାଟ୍ ସଫା କରନ୍ତୁ", cleared: "ଚାଟ୍ ସଫା ହେଲା", offline: "ଆପଣ ଅଫଲାଇନ୍ ଅଛନ୍ତି। ଇଣ୍ଟରନେଟ୍ ଯୋଡ଼ି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।", busy: "ଅନେକ ଅନୁରୋଧ। ଏକ ମିନିଟ୍ ଅପେକ୍ଷା କରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।", off: "ଏହି ସର୍ଭରରେ AI ସେଟ୍ ହୋଇନାହିଁ।", quota: "AI ବ୍ୟବହାର ସୀମା ପୂରଣ ହୋଇଛି। API quota ଯାଞ୍ଚ କରନ୍ତୁ କିମ୍ବା ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।", config: "AI ସେବାର ବିନ୍ୟାସ ଠିକ୍ ନାହିଁ। ପ୍ରଶାସକଙ୍କ ସହ ଯୋଗାଯୋଗ କରନ୍ତୁ।", timeout: "AI ଅନୁରୋଧରେ ଅଧିକ ସମୟ ଲାଗିଲା। ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।", network: "AI ସେବା ସହିତ ସଂଯୋଗ ହୋଇପାରିଲା ନାହିଁ। ଇଣ୍ଟରନେଟ୍ ଯାଞ୍ଚ କରି ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।", unavailable: "AI ସେବା ଅସ୍ଥାୟୀ ଭାବେ ଉପଲବ୍ଧ ନାହିଁ। ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।", error: "AI ସେବା ଅନୁରୋଧ ପୂରଣ କରିପାରିଲା ନାହିଁ। ପରେ ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ।" }
};
function chatText(key) { return (CHAT_TEXT[language] || CHAT_TEXT.en)[key]; }
let chatBusy = false;
let recognition = null;
let alertState = { status: "idle", items: [], fetchedAt: null, notes: {}, offlineCached: false };
let weatherState = { status: "idle", data: null, place: "" };
let translateState = { direction: "en-or", text: "", result: "", status: "idle" };
let compareSelection = [];
let compareAi = { status: "idle", text: "" };
let planAi = { status: "idle", text: "" };
let triageState = { text: "", status: "idle", error: "" };
let leafletMap = null;
let leafletPromise = null;

function interpolate(text, values) { return text.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? ""); }
function localeFor() { return language === "hi" ? "hi-IN" : language === "or" ? "or-IN" : "en-IN"; }
function formatDateTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(localeFor(), { dateStyle: "medium", timeStyle: "short" }).format(date);
}
function formatAi(text) {
  const lines = escapeHtml(text).split(/\r?\n/);
  let html = "", inList = false;
  for (const raw of lines) {
    const line = raw.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    const bullet = line.match(/^\s*[*-]\s+(.*)$/);
    if (bullet) { if (!inList) { html += "<ul>"; inList = true; } html += `<li>${bullet[1]}</li>`; continue; }
    if (inList) { html += "</ul>"; inList = false; }
    if (line.trim()) html += `<p>${line}</p>`;
  }
  return html + (inList ? "</ul>" : "");
}

async function apiGet(path) {
  const response = await fetch(path, { headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const result = await response.json();
  if (response.headers.get("X-AapadaLens-Offline-Cache") === "true" && result && typeof result === "object") result._offlineCached = true;
  return result;
}
async function aiRequest(body) {
  const response = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  let result;
  try { result = await response.json(); } catch { result = {}; }
  if (!response.ok) {
    const error = new Error(typeof result.error === "string" ? result.error : `HTTP ${response.status}`);
    error.status = response.status;
    error.code = result.code;
    throw error;
  }
  return result;
}
async function loadAiStatus() {
  try { aiReady = Boolean((await apiGet("/api/status")).ai); } catch { aiReady = false; }
  if (AI_PAGES.includes(currentPage) && !document.activeElement?.matches?.("textarea, input")) renderPage();
}

function aiBadge() {
  const label = aiReady === null ? t("aiChecking") : aiReady ? t("aiReady") : t("aiOff");
  return `<span class="review-badge ai-badge ${aiReady ? "on" : ""}">${escapeHtml(label)}</span>`;
}
function aiOffCard() {
  return aiReady === false ? `<div class="notice-banner"><span aria-hidden="true">ⓘ</span><span>${escapeHtml(t("aiOffHelp"))}</span></div>` : "";
}
function aiDisabled() { return aiReady ? "" : "disabled"; }

function speakText(text, lang) {
  if (!("speechSynthesis" in window)) { showToast(t("speechUnsupported")); return; }
  stopSpeech();
  const code = (lang || language).slice(0, 2);
  const voice = speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith(code));
  if (!voice) { showToast(t("noVoice")); return; }
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  speechSynthesis.speak(utterance);
}

/* Weather */
function weatherGroup(code) {
  if (code === 0 || code === 1) return "wx_clear";
  if (code === 2 || code === 3) return "wx_cloud";
  if (code === 45 || code === 48) return "wx_fog";
  if (code >= 51 && code <= 57) return "wx_drizzle";
  if (code >= 61 && code <= 67) return "wx_rain";
  if (code >= 80 && code <= 82) return "wx_shower";
  if (code >= 95) return "wx_thunder";
  return "wx_other";
}
function renderWeather() {
  const located = getShelters().filter(hasCoordinates);
  const options = [`<option value="gps">${escapeHtml(t("myLocation"))}</option>`, `<option value="manual">${escapeHtml(t("enterCoords"))}</option>`]
    .concat(located.map((record) => `<option value="${escapeHtml(record.id)}">${escapeHtml(record.name)} · ${escapeHtml(record.district)}</option>`)).join("");
  return `${heading("weatherTitle", "weatherSubtitle")}${notice("weatherNote")}
    <section class="card page-card"><form data-p2form="weather" class="weather-form">
      <label class="field-group"><span>${escapeHtml(t("weatherPlace"))}</span><select class="form-control" name="place" id="weatherPlace">${options}</select></label>
      <div class="coord-fields" id="weatherCoords" hidden>
        <label class="field-group"><span>${escapeHtml(t("latitude"))}</span><input class="form-control" name="lat" inputmode="decimal"></label>
        <label class="field-group"><span>${escapeHtml(t("longitude"))}</span><input class="form-control" name="lon" inputmode="decimal"></label>
      </div>
      <button class="button primary" type="submit">${escapeHtml(t("getWeather"))}</button></form></section>
    <div id="weatherBody">${weatherBodyHtml()}</div>`;
}
function weatherBodyHtml() {
  if (weatherState.status === "loading") return `<p class="page-subtitle">${escapeHtml(t("loading"))}</p>`;
  if (weatherState.status === "error") return `<div class="notice-banner"><span>⚠</span><span>${escapeHtml(weatherState.error || t("weatherFail"))}</span></div>`;
  if (weatherState.status !== "ready") return `<p class="page-subtitle">${escapeHtml(t("weatherPickFirst"))}</p>`;
  const { current, daily } = weatherState.data;
  const cachedNotice = weatherState.offlineCached
    ? `<div class="notice-banner warn"><span>⚠</span><span>${escapeHtml(interpolate(t("cachedWarning"), { time: formatDateTime(weatherState.data.fetchedAt) || "unknown" }))}</span></div>`
    : "";
  const number = (value, digits = 0) => Number(value).toLocaleString(localeFor(), { maximumFractionDigits: digits });
  const strong = daily.wind_gusts_10m_max.some((value) => value >= 60) || daily.precipitation_sum.some((value) => value >= 65);
  const days = daily.time.map((day, index) => `<div class="wx-day"><strong>${escapeHtml(new Intl.DateTimeFormat(localeFor(), { weekday: "short", day: "numeric", month: "short" }).format(new Date(`${day}T00:00:00`)))}</strong><span>${escapeHtml(t(weatherGroup(daily.weather_code[index])))}</span><span>${number(daily.temperature_2m_min[index])}–${number(daily.temperature_2m_max[index])}°C</span><span>${escapeHtml(t("rainLabel"))} ${number(daily.precipitation_sum[index], 1)} mm</span><span>${escapeHtml(t("gustsLabel"))} ${number(daily.wind_gusts_10m_max[index])} km/h</span></div>`).join("");
  return `${cachedNotice}${strong ? `<div class="notice-banner warn"><span>⚠</span><span>${escapeHtml(t("strongNote"))}</span></div>` : ""}
    <section class="card page-card"><h2>${escapeHtml(weatherState.place)} · ${escapeHtml(t("nowLabel"))}</h2>
      <div class="wx-now"><div class="wx-temp">${number(current.temperature_2m)}°C<small>${escapeHtml(t(weatherGroup(current.weather_code)))}</small></div>
        <div class="wx-tile"><span>${escapeHtml(t("feelsLike"))}</span><strong>${number(current.apparent_temperature)}°C</strong></div>
        <div class="wx-tile"><span>${escapeHtml(t("humidity"))}</span><strong>${number(current.relative_humidity_2m)}%</strong></div>
        <div class="wx-tile"><span>${escapeHtml(t("windLabel"))}</span><strong>${number(current.wind_speed_10m)} km/h</strong></div>
        <div class="wx-tile"><span>${escapeHtml(t("gustsLabel"))}</span><strong>${number(current.wind_gusts_10m)} km/h</strong></div>
        <div class="wx-tile"><span>${escapeHtml(t("rainLabel"))}</span><strong>${number(current.precipitation, 1)} mm</strong></div></div>
      <h3 class="section-title">${escapeHtml(t("nextDays"))}</h3><div class="wx-days">${days}</div>
      <small class="occupancy-note">${escapeHtml(weatherState.source || "")}</small></section>`;
}
function refreshWeather() { const body = document.getElementById("weatherBody"); if (body) body.innerHTML = weatherBodyHtml(); }
function resolveWeatherPlace(form) {
  const choice = form.get("place");
  if (choice === "manual") {
    const lat = Number(String(form.get("lat")).trim()), lon = Number(String(form.get("lon")).trim());
    if (!String(form.get("lat")).trim() || !String(form.get("lon")).trim() || !Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return Promise.reject(new Error(t("weatherCoordsInvalid")));
    return Promise.resolve({ lat, lon, name: `${lat}, ${lon}` });
  }
  if (choice === "gps") {
    if (!navigator.geolocation) return Promise.reject(new Error(t("locationUnsupported")));
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(
      (position) => resolve({ lat: position.coords.latitude, lon: position.coords.longitude, name: t("myLocation").replace(/\s*\(.*\)/, "") }),
      (error) => reject(new Error(error.code === 1 ? t("locationDenied") : t("locationUnavailable"))), { timeout: 15000, maximumAge: 60000 }));
  }
  const record = getShelters().find((item) => item.id === choice);
  if (!record || !hasCoordinates(record)) return Promise.reject(new Error(t("weatherPickFirst")));
  return Promise.resolve({ lat: Number(record.latitude), lon: Number(record.longitude), name: record.name });
}
async function submitWeather(formElement) {
  weatherState = { status: "loading", data: null, place: "" };
  refreshWeather();
  try {
    const place = await resolveWeatherPlace(new FormData(formElement));
    const data = await apiGet(`/api/weather?lat=${encodeURIComponent(place.lat)}&lon=${encodeURIComponent(place.lon)}`);
    weatherState = { status: "ready", data, place: place.name, source: data.source, offlineCached: data._offlineCached === true };
  } catch (error) {
    weatherState = { status: "error", data: null, place: "", error: /^HTTP/.test(error.message) ? t("weatherFail") : error.message };
  }
  refreshWeather();
}

/* Alerts centre */
function renderAlerts() {
  const sourceNotice = `<div class="notice-banner"><span aria-hidden="true">ⓘ</span><span>${escapeHtml(t("alertsSourceNote"))}<br><a href="https://sachet.ndma.gov.in/cap_public_website/rss/rss_odisha.xml" target="_blank" rel="noopener noreferrer">${escapeHtml(t("alertSourceLink"))}</a> · <a href="https://sachet.ndma.gov.in/" target="_blank" rel="noopener noreferrer">${escapeHtml(t("alertPortalLink"))}</a></span></div>`;
  return `${heading("alertsCentreTitle", "alertsCentreSubtitle")}${sourceNotice}${aiOffCard()}<div id="alertsBody">${alertsBodyHtml()}</div>`;
}
function alertsRefreshButton(label, disabled = false) {
  return `<button class="button" data-p2="alerts-reload" ${disabled ? "disabled" : ""}>${escapeHtml(label)}</button>`;
}
function alertsBodyHtml() {
  if (alertState.status === "loading" || alertState.status === "idle") return `<p class="page-subtitle">${escapeHtml(t("loading"))}</p>${alertsRefreshButton(t("refreshAlerts"), true)}`;
  if (alertState.status === "error") return `<div class="notice-banner warn"><span>⚠</span><span>${escapeHtml(t("alertsFail"))}</span></div><button class="button" data-p2="alerts-reload">${escapeHtml(t("retry"))}</button>`;
  if (!alertState.items.length) return `${emptyState("alertsEmpty", "alertsSourceNote")}${alertsRefreshButton(t("refreshAlerts"))}`;
  const cards = alertState.items.map((item, index) => {
    const note = alertState.notes[item.id] || {};
    const noteHtml = ["summary", "translation"].filter((key) => note[key]).map((key) => `<div class="ai-note"><small>${escapeHtml(t("aiGenerated"))}</small>${formatAi(note[key])}</div>`).join("");
    const busy = note.busy ? `<small>${escapeHtml(t("thinking"))}</small>` : "";
    return `<article class="card alert-item"><div class="alert-item-head"><span class="severity">${escapeHtml(item.category || "")}</span><small>${escapeHtml(item.author || "")} · ${escapeHtml(formatDateTime(item.published))}</small></div>
      <p class="alert-title">${escapeHtml(item.title)}</p>${noteHtml}${busy}
      <div class="record-actions">${item.link ? `<a class="button small" href="${escapeHtml(item.link)}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("openSource"))}</a>` : ""}
        <button class="button small" data-p2="alert-ai" data-kind="summarise" data-i="${index}" ${aiDisabled()}>✦ ${escapeHtml(t("summarise"))}</button>
        <button class="button small" data-p2="alert-ai" data-kind="translate" data-i="${index}" ${aiDisabled()}>${escapeHtml(t("translateAlert"))}</button></div></article>`;
  }).join("");
  const cachedNotice = alertState.offlineCached
    ? `<div class="notice-banner warn"><span>⚠</span><span>${escapeHtml(interpolate(t("cachedWarning"), { time: formatDateTime(alertState.fetchedAt) || "unknown" }))}</span></div>`
    : "";
  return `${cachedNotice}<div class="record-actions"><p class="page-subtitle">${escapeHtml(t("alertsUpdated"))}: ${escapeHtml(formatDateTime(alertState.fetchedAt))} · ${escapeHtml(interpolate(t("alertsCount"), { n: alertState.items.length }))}</p>${alertsRefreshButton(t("refreshAlerts"))}</div><div class="list-grid">${cards}</div>`;
}
async function loadAlerts(force = false) {
  if (alertState.status === "loading") return;
  if (!force && alertState.status === "ready" && Date.now() - new Date(alertState.fetchedAt).getTime() < 120000) return;
  alertState.status = "loading";
  refreshAlerts();
  try {
    const data = await apiGet("/api/alerts");
    alertState = { status: "ready", items: data.items || [], fetchedAt: data.fetchedAt, notes: alertState.notes, offlineCached: data._offlineCached === true };
  } catch { alertState.status = "error"; }
  refreshAlerts();
  updateOverviewBanner();
}
function refreshAlerts() { const body = document.getElementById("alertsBody"); if (body) body.innerHTML = alertsBodyHtml(); }
function updateOverviewBanner() {
  const small = document.querySelector(".alert-banner small");
  if (small && alertState.status === "ready") small.textContent = interpolate(t("alertsCount"), { n: alertState.items.length });
}
async function alertAi(kind, index) {
  const item = alertState.items[Number(index)];
  if (!item) return;
  const note = alertState.notes[item.id] = alertState.notes[item.id] || {};
  note.busy = true;
  refreshAlerts();
  try {
    const result = await aiRequest(kind === "summarise" ? { task: "summarise", text: item.title, language } : { task: "translate", text: item.title, target: language });
    note[kind === "summarise" ? "summary" : "translation"] = result.text;
  } catch { showToast(t("aiError")); }
  note.busy = false;
  refreshAlerts();
}

/* Risk map */
function loadLeaflet() {
  if (window.L) return Promise.resolve();
  if (leafletPromise) return leafletPromise;
  leafletPromise = new Promise((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet"; css.href = "/vendor/leaflet/leaflet.css";
    document.head.appendChild(css);
    const script = document.createElement("script");
    script.src = "/vendor/leaflet/leaflet.js";
    script.onload = resolve;
    script.onerror = () => { leafletPromise = null; reject(new Error("leaflet")); };
    document.head.appendChild(script);
  });
  return leafletPromise;
}
function renderMap() {
  const located = getShelters().filter(hasCoordinates);
  const cards = located.map((record) => `<article class="card shelter-card"><span class="shelter-symbol">⌖</span><div class="shelter-detail"><h3>${escapeHtml(record.name)}</h3><p>${escapeHtml(record.district)} · ${escapeHtml(record.address || "")}</p><small>${escapeHtml(t("needsReview"))} · ${escapeHtml(String(record.latitude))}, ${escapeHtml(String(record.longitude))}</small></div><a class="button small" href="${escapeHtml(mapLink(record))}" target="_blank" rel="noopener noreferrer">${escapeHtml(t("openMap"))}</a></article>`).join("");
  return `${heading("mapTitle", "mapSubtitle")}${notice("riskMapNote")}
    <section class="card page-card"><div id="riskMap" class="map-box" role="application" aria-label="${escapeHtml(t("mapTitle"))}"></div><p class="page-subtitle" id="mapMessage"></p></section>
    ${located.length ? `<h2 class="section-title">${escapeHtml(t("mapListTitle"))}</h2><div class="list-grid">${cards}</div>` : emptyState("noCoordinates", "noCoordinatesHelp", `<button class="button" data-nav="shelters">${escapeHtml(t("addShelter"))}</button>`)}`;
}
async function initMap() {
  const box = document.getElementById("riskMap");
  if (!box) return;
  try {
    await loadLeaflet();
    if (!document.getElementById("riskMap") || document.getElementById("riskMap") !== box) return;
    L.Icon.Default.imagePath = "/vendor/leaflet/images/";
    leafletMap = L.map(box).setView([20.95, 85.1], 7);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap contributors" }).addTo(leafletMap);
    const located = getShelters().filter(hasCoordinates);
    const points = located.map((record) => {
      const popup = document.createElement("div");
      const title = document.createElement("strong"); title.textContent = record.name;
      const line = document.createElement("div"); line.textContent = `${record.district} · ${t("needsReview")}`;
      popup.append(title, line);
      const point = [Number(record.latitude), Number(record.longitude)];
      L.marker(point).addTo(leafletMap).bindPopup(popup);
      return point;
    });
    if (points.length) leafletMap.fitBounds(points, { padding: [40, 40], maxZoom: 13 });
  } catch {
    box.hidden = true;
    const message = document.getElementById("mapMessage");
    if (message) message.textContent = t("mapLoadFail");
  }
}

/* AI assistant and voice */
function renderGuide() {
  const starters = ["starter1", "starter2", "starter3"].map((key) => `<button class="chip" data-p2="starter" data-key="${key}" ${aiDisabled()}>${escapeHtml(t(key))}</button>`).join("");
  const micButton = (window.SpeechRecognition || window.webkitSpeechRecognition) ? `<button class="button" type="button" data-p2="mic" id="micButton" ${aiDisabled()}>🎤 ${escapeHtml(t("speak"))}</button>` : "";
  return `${heading("aiTitle", "aiSubtitle", aiBadge())}${notice("aiDisclaimer")}${aiOffCard()}
    <section class="card page-card chat-card"><div class="chat-log" id="chatLog" aria-live="polite">${chatLogHtml()}</div>
      ${chatMessages.length ? "" : `<div class="chips">${starters}</div>`}
      <form data-p2form="chat" class="chat-form"><input class="form-control" name="message" maxlength="1000" autocomplete="off" placeholder="${escapeHtml(t("chatPlaceholder"))}" aria-label="${escapeHtml(t("chatPlaceholder"))}" ${aiDisabled()}>${micButton}<button class="button primary" type="submit" ${aiDisabled()}>${escapeHtml(t("send"))}</button></form>
      <small class="occupancy-note">${escapeHtml(t("chatPrivacy"))}</small>${chatMessages.length ? `<div class="record-actions"><button class="button small" type="button" data-p2="chat-clear">${escapeHtml(chatText("clear"))}</button></div>` : ""}</section>`;
}
function chatLogHtml() {
  return chatMessages.map((message, index) => message.role === "user"
    ? `<div class="chat-bubble user">${escapeHtml(message.text)}</div>`
    : `<div class="chat-bubble model">${formatAi(message.text)}<div class="record-actions"><button class="button small" data-p2="speak-chat" data-i="${index}">🔊 ${escapeHtml(t("listen"))}</button><button class="button small" data-p2="stop">${escapeHtml(t("stopListening"))}</button></div></div>`).join("")
    + (chatBusy ? `<div class="chat-bubble model"><small>${escapeHtml(t("thinking"))}</small></div>` : "");
}
function refreshChat() {
  const log = document.getElementById("chatLog");
  if (log) { log.innerHTML = chatLogHtml(); log.scrollTop = log.scrollHeight; }
}
async function sendChat(text, spoken = false) {
  const message = String(text || "").trim();
  if (!message || chatBusy || !aiReady) return;
  chatMessages.push({ role: "user", text: message });
  chatBusy = true;
  if (chatMessages.length === 1) renderPage(); else refreshChat();
  refreshChat();
  try {
    const result = await aiRequest({ task: "chat", language, messages: chatMessages.filter((item) => !item.failed).map((item) => ({ role: item.role, text: item.text })) });
    if (typeof result.text !== "string" || !result.text.trim()) {
      const error = new Error("AI returned an empty response");
      error.code = "AI_EMPTY_RESPONSE";
      throw error;
    }
    chatMessages.push({ role: "model", text: result.text });
    if (spoken) speakText(result.text);
  } catch (error) {
    const messages = {
      AI_AUTH: "config",
      AI_NOT_CONFIGURED: "off",
      AI_QUOTA: "quota",
      AI_TIMEOUT: "timeout",
      AI_NETWORK: "network",
      AI_UNAVAILABLE: "unavailable",
      AI_EMPTY_RESPONSE: "error",
      AI_ERROR: "error"
    };
    const known = !navigator.onLine ? chatText("offline")
      : messages[error.code] ? chatText(messages[error.code])
        : error.status === 429 ? chatText("quota")
          : error.status === 503 ? chatText("unavailable")
            : error.status === 504 ? chatText("timeout")
              : error.status === 502 ? chatText("network") : t("aiError");
    chatMessages.push({ role: "model", text: known, failed: true });
  }
  chatBusy = false;
  saveChat();
  refreshChat();
}
function toggleMic() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) { showToast(t("micUnsupported")); return; }
  const button = document.getElementById("micButton");
  if (recognition) { recognition.stop(); return; }
  recognition = new Recognition();
  recognition.lang = SPEECH_CODES[language];
  recognition.interimResults = false;
  recognition.onresult = (event) => sendChat(event.results[0][0].transcript, true);
  recognition.onerror = () => showToast(t("micError"));
  recognition.onend = () => { recognition = null; const current = document.getElementById("micButton"); if (current) current.textContent = `🎤 ${t("speak")}`; };
  if (button) button.textContent = `■ ${t("listening")}`;
  try { recognition.start(); } catch { recognition = null; showToast(t("micError")); }
}

/* Translation */
function renderTranslate() {
  const directions = [["en-or", "dirEnOr"], ["or-en", "dirOrEn"], ["en-hi", "dirEnHi"], ["hi-en", "dirHiEn"]];
  const result = translateState.status === "ready" ? `<div class="ai-note"><small>${escapeHtml(t("aiGenerated"))}</small><h3>${escapeHtml(t("translationResult"))}</h3>${formatAi(translateState.result)}<div class="record-actions"><button class="button small" data-p2="tr-copy">${escapeHtml(t("copy"))}</button><button class="button small" data-p2="tr-speak">🔊 ${escapeHtml(t("listen"))}</button></div></div>`
    : translateState.status === "loading" ? `<p class="page-subtitle">${escapeHtml(t("thinking"))}</p>` : translateState.status === "error" ? `<p class="form-error">${escapeHtml(t("aiError"))}</p>` : "";
  return `${heading("translateTitle", "translateSubtitle", aiBadge())}${notice("translationNote")}${aiOffCard()}
    <section class="card page-card"><form data-p2form="translate"><label class="field-group"><span>${escapeHtml(t("navTranslate"))}</span><select class="form-control" name="direction">${directions.map(([value, key]) => `<option value="${value}" ${translateState.direction === value ? "selected" : ""}>${escapeHtml(t(key))}</option>`).join("")}</select></label>
      <label class="field-group"><span>${escapeHtml(t("textToTranslate"))}</span><textarea class="form-control" name="text" rows="5" maxlength="2000">${escapeHtml(translateState.text)}</textarea></label>
      <button class="button primary" type="submit" ${aiDisabled()}>${escapeHtml(t("translateBtn"))}</button></form>${result}</section>`;
}
async function submitTranslate(formElement) {
  const data = new FormData(formElement);
  translateState = { direction: String(data.get("direction")), text: String(data.get("text")).trim(), result: "", status: "loading" };
  if (!translateState.text) { translateState.status = "idle"; return; }
  renderPage();
  try {
    const result = await aiRequest({ task: "translate", text: translateState.text, target: { or: "or", en: "en", hi: "hi" }[translateState.direction.split("-")[1]] });
    translateState.result = result.text;
    translateState.status = "ready";
  } catch { translateState.status = "error"; }
  if (currentPage === "translate") renderPage();
}

/* Shelter comparison */
function shelterPayload(record) {
  return { name: record.name, district: record.district, capacity: Number(record.capacity), occupancy: hasOccupancy(record) ? record.occupancy : null, facilities: SHELTER_FACILITIES.filter(([field]) => record.facilities?.includes(field)).map(([field]) => field), source: record.source };
}
function renderCompare() {
  const records = getShelters();
  const picks = records.map((record) => `<label class="check-row"><input type="checkbox" data-p2="cmp" value="${escapeHtml(record.id)}" ${compareSelection.includes(record.id) ? "checked" : ""}><span>${escapeHtml(record.name)} · ${escapeHtml(record.district)}</span></label>`).join("");
  const chosen = compareSelection.map((id) => records.find((record) => record.id === id)).filter(Boolean);
  let table = `<p class="page-subtitle">${escapeHtml(t("compareNeed"))}</p>`;
  if (chosen.length >= 2) {
    const head = chosen.map((record) => `<th scope="col">${escapeHtml(record.name)}<small>${escapeHtml(record.district)}</small></th>`).join("");
    const rows = [[t("recordedCapacity"), (r) => formatCapacity(r.capacity)], [t("availableSpaces"), (r) => hasOccupancy(r) ? formatCapacity(Math.max(0, Number(r.capacity) - r.occupancy)) : "—"], [t("shelterReadinessAvg"), (r) => `${recordedFacilityPercent(r)}%`]]
      .concat(SHELTER_FACILITIES.map(([field, key]) => [t(key), (r) => r.facilities?.includes(field) ? "✓" : "–"]))
      .map(([label, fn]) => `<tr><th scope="row">${escapeHtml(label)}</th>${chosen.map((record) => `<td>${escapeHtml(String(fn(record)))}</td>`).join("")}</tr>`).join("");
    table = `<div class="table-scroll"><table class="cmp-table"><thead><tr><th></th>${head}</tr></thead><tbody>${rows}</tbody></table></div>
      <div class="record-actions"><button class="button" data-p2="cmp-ai" ${aiDisabled()}>✦ ${escapeHtml(t("aiNoteBtn"))}</button></div><small class="occupancy-note">${escapeHtml(t("aiSends"))}</small>
      ${compareAi.status === "loading" ? `<p class="page-subtitle">${escapeHtml(t("thinking"))}</p>` : compareAi.status === "ready" ? `<div class="ai-note"><small>${escapeHtml(t("aiGenerated"))}</small>${formatAi(compareAi.text)}</div>` : compareAi.status === "error" ? `<p class="form-error">${escapeHtml(t("aiError"))}</p>` : ""}`;
  }
  return `${heading("compareTitle", "compareSubtitle", aiBadge())}${notice("compareNote")}${aiOffCard()}
    <div class="grid simulator-layout"><section class="card page-card"><h2>${escapeHtml(t("pickShelters"))}</h2><div class="checklist">${picks || `<p class="page-subtitle">${escapeHtml(t("noRecords"))}</p>`}</div></section>
    <section class="card page-card">${table}</section></div>`;
}

/* Resource planning */
function renderPlan() {
  const records = getShelters();
  if (!records.length) return `${heading("planTitle", "planSubtitle", aiBadge())}${notice("planNote")}${emptyState("planNone", "planNote")}`;
  const capacity = records.reduce((sum, record) => sum + Number(record.capacity || 0), 0);
  const free = availableSpaces(records);
  const gaps = SHELTER_FACILITIES.map(([field, key]) => ({ key, missing: records.filter((record) => !record.facilities?.includes(field)).length })).filter((item) => item.missing > 0).sort((a, b) => b.missing - a.missing);
  const lines = gaps.length ? `<ul class="plan-list">${gaps.map((gap) => `<li>${escapeHtml(interpolate(t("planMissingLine"), { n: gap.missing, total: records.length, facility: t(gap.key) }))}</li>`).join("")}</ul>` : `<p class="page-subtitle">${escapeHtml(t("planAllRecorded"))}</p>`;
  return `${heading("planTitle", "planSubtitle", aiBadge())}${notice("planNote")}${aiOffCard()}
    <div class="grid metrics-grid">${metric("totalShelters", records.length, "sourceProvided", "⌂")}${metric("totalCapacity", formatCapacity(capacity), "sourceProvided", "▣")}${metric("availableSpaces", free === null ? "—" : formatCapacity(free), "availableNote", "◔")}</div>
    <section class="card page-card"><h2>${escapeHtml(t("planVerify"))}</h2>${lines}
      <div class="record-actions"><button class="button" data-p2="plan-ai" ${aiDisabled()}>✦ ${escapeHtml(t("aiNoteBtn"))}</button></div><small class="occupancy-note">${escapeHtml(t("aiSends"))}</small>
      ${planAi.status === "loading" ? `<p class="page-subtitle">${escapeHtml(t("thinking"))}</p>` : planAi.status === "ready" ? `<div class="ai-note"><small>${escapeHtml(t("aiGenerated"))}</small>${formatAi(planAi.text)}</div>` : planAi.status === "error" ? `<p class="form-error">${escapeHtml(t("aiError"))}</p>` : ""}</section>`;
}
async function runSheltersAi(task, state, records) {
  state.status = "loading";
  renderPage();
  try {
    const result = await aiRequest({ task, language, text: JSON.stringify(records.map(shelterPayload)) });
    state.text = result.text; state.status = "ready";
  } catch { state.status = "error"; }
  if (currentPage === (task === "compare" ? "compare" : "plan")) renderPage();
}

/* Report triage */
function ruleClassify(text) {
  const lower = text.toLowerCase();
  const category = CATEGORY_KEYS.find((key) => (TRIAGE_RULES[key] || []).some((word) => lower.includes(word))) || "other";
  const urgency = URGENT_WORDS.some((word) => lower.includes(word)) ? "high" : category === "medical" || category === "missing_person" ? "medium" : "low";
  return { category, urgency, reason: "" };
}
function getReports() { const list = readStorage("triage", []); return Array.isArray(list) ? list : []; }
function renderTriage() {
  const order = { high: 0, medium: 1, low: 2 };
  const reports = getReports().sort((a, b) => (order[a.urgency] - order[b.urgency]) || String(b.createdAt).localeCompare(String(a.createdAt)));
  const list = reports.length ? reports.map((report) => `<article class="card alert-item urg-${escapeHtml(report.urgency)}"><div class="alert-item-head"><span class="severity">${escapeHtml(t(`urg_${report.urgency}`))}</span><strong>${escapeHtml(t(`cat_${report.category}`))}</strong><small>${escapeHtml(formatDateTime(report.createdAt))} · ${escapeHtml(t(report.method === "ai" ? "methodAi" : "methodRules"))}</small></div>
    <p class="alert-title">${escapeHtml(report.text)}</p>${report.reason ? `<small>${escapeHtml(t("reasonLabel"))}: ${escapeHtml(report.reason)}</small>` : ""}
    ${typeof isDataImage === "function" && isDataImage(report.photo) ? `<img class="report-photo" src="${report.photo}" alt="${escapeHtml(t("photoAlt"))}">` : ""}
    ${report.dupOf ? `<p class="dup-flag">⚠ ${escapeHtml(t("dupPossible"))} <small>(${escapeHtml(t("dupNote"))})</small></p>` : ""}
    <div class="record-actions"><select class="form-control small-select" data-p3change="report-status" data-id="${escapeHtml(report.id)}" aria-label="${escapeHtml(t("reviewStatus"))}">${["new", "reviewed", "resolved"].map((s) => `<option value="${s}" ${(report.status || "new") === s ? "selected" : ""}>${escapeHtml(t(`rs_${s}`))}</option>`).join("")}</select><button class="button small danger" data-p2="report-delete" data-id="${escapeHtml(report.id)}">${escapeHtml(t("delete"))}</button></div></article>`).join("") : `<p class="page-subtitle">${escapeHtml(t("noReports"))}</p>`;
  return `${heading("triageTitle", "triageSubtitle", aiBadge())}${notice("triageNote")}<div class="notice-banner"><span aria-hidden="true">ⓘ</span><span>${escapeHtml(t("triageReview"))}</span></div>
    <section class="card page-card"><form data-p2form="triage"><label class="field-group"><span>${escapeHtml(t("reportText"))}</span><textarea class="form-control" name="text" rows="4" maxlength="2000">${escapeHtml(triageState.text)}</textarea></label>
      <label class="field-group"><span>${escapeHtml(t("photoOptional"))}</span><input class="form-control" type="file" name="photo" accept="image/*"></label><small>${escapeHtml(t("photoNote"))}</small>
      ${triageState.error ? `<p class="form-error">${escapeHtml(triageState.error)}</p>` : ""}<button class="button primary" type="submit" ${triageState.status === "loading" ? "disabled" : ""}>${escapeHtml(triageState.status === "loading" ? t("thinking") : t("classifyBtn"))}</button></form></section>
    <h2 class="section-title">${escapeHtml(t("savedReports"))}</h2><div class="list-grid">${list}</div>`;
}
async function submitTriage(formElement) {
  const formData = new FormData(formElement);
  const text = String(formData.get("text")).trim();
  triageState = { text, status: "idle", error: "" };
  if (!text) { triageState.error = t("reportEmpty"); renderPage(); return; }
  let photo = "";
  const file = formData.get("photo");
  if (file && file.size) {
    try { photo = await shrinkImage(file); } catch { triageState.error = t("photoBad"); renderPage(); return; }
  }
  let result, method = "rules";
  if (aiReady) {
    triageState.status = "loading"; renderPage();
    try { result = await aiRequest({ task: "classify", text, language }); method = "ai"; } catch { result = null; }
  }
  if (!result) result = ruleClassify(text);
  const reports = getReports();
  const duplicate = findDuplicate(text, reports);
  reports.push({ id: `r-${Date.now()}`, text, category: result.category, urgency: result.urgency, reason: result.reason || "", method, createdAt: new Date().toISOString(), status: "new", ...(photo ? { photo } : {}), ...(duplicate ? { dupOf: duplicate.id } : {}) });
  if (!writeStorage("triage", reports)) return;
  triageState = { text: "", status: "idle", error: "" };
  if (currentPage === "triage") renderPage();
}

function afterPageRender(page) {
  if (leafletMap) { leafletMap.remove(); leafletMap = null; }
  if (page === "alerts") loadAlerts();
  if (page === "map") initMap();
  if (page === "overview") { loadAlerts().then(updateOverviewBanner); updateOverviewBanner(); }
  if (page === "assistant") { const log = document.getElementById("chatLog"); if (log) log.scrollTop = log.scrollHeight; }
}

document.addEventListener("click", (event) => {
  const control = event.target.closest("[data-p2]");
  if (!control || control.type === "checkbox") return;
  const { p2: action, i, kind, key, id } = control.dataset;
  switch (action) {
    case "alerts-reload": loadAlerts(true); break;
    case "alert-ai": alertAi(kind, i); break;
    case "starter": sendChat(t(key)); break;
    case "mic": toggleMic(); break;
    case "speak-chat": speakText(chatMessages[Number(i)]?.text || ""); break;
    case "stop": stopSpeech(); break;
    case "chat-clear": chatMessages = []; saveChat(); renderPage(); showToast(chatText("cleared")); break;
    case "tr-copy": navigator.clipboard?.writeText(translateState.result).then(() => showToast(t("copied"))); break;
    case "tr-speak": speakText(translateState.result, translateState.direction.split("-")[1]); break;
    case "cmp-ai": compareAi = { status: "idle", text: "" }; runSheltersAi("compare", compareAi, compareSelection.map((sid) => getShelters().find((record) => record.id === sid)).filter(Boolean)); break;
    case "plan-ai": planAi = { status: "idle", text: "" }; runSheltersAi("plan", planAi, getShelters().slice(0, 30)); break;
    case "report-delete": writeStorage("triage", getReports().filter((report) => report.id !== id)); renderPage(); break;
  }
});
document.addEventListener("change", (event) => {
  const box = event.target.closest('input[data-p2="cmp"]');
  if (box) {
    if (box.checked && compareSelection.length >= 4) { box.checked = false; showToast(t("compareTooMany")); return; }
    compareSelection = box.checked ? [...compareSelection, box.value] : compareSelection.filter((value) => value !== box.value);
    compareAi = { status: "idle", text: "" };
    renderPage();
  }
  if (event.target.id === "weatherPlace") document.getElementById("weatherCoords").hidden = event.target.value !== "manual";
});
document.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-p2form]");
  if (!form) return;
  event.preventDefault();
  switch (form.dataset.p2form) {
    case "weather": submitWeather(form); break;
    case "chat": { const input = form.elements.message; const text = input.value; input.value = ""; sendChat(text); break; }
    case "translate": submitTranslate(form); break;
    case "triage": submitTriage(form); break;
  }
});
