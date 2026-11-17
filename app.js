const messages = {
  en: {
    localApp:"LOCAL APP · ODISHA PILOT", odishaPilot:"Odisha pilot", localOnly:"On this device", localRecords:"Local records", deviceOnly:"Saved on this device",
    workspace:"WORKSPACE", overview:"Overview", disasterMap:"Shelter locations", shelters:"Shelter directory",
    alerts:"Official alerts", assistant:"Preparedness guide", preparedness:"PREPAREDNESS", readiness:"Readiness checklist",
    simulator:"Capacity planner", emergencyKit:"Emergency kit", familySafety:"Family plan", reports:"Reports & export",
    settings:"Settings", studentInnovator:"Local user", guestMode:"No account · local storage", emergencyHelp:"Emergency help",
    footerNotice:"Records are stored on this device · Not a live emergency service", home:"Home", map:"Map", ai:"Guide", more:"More",
    overviewTitle:"Shelter management", overviewSubtitle:"Manage Odisha pilot records and household preparedness from this device.",
    totalShelters:"Shelter records", totalCapacity:"Recorded capacity", pendingReview:"Needs review", checklistProgress:"Personal readiness",
    location:"District / area", addShelter:"Add shelter record", search:"Search name, district or address…",
    officialAlerts:"Official alerts", alertsNotConnected:"No official alert source is connected. No current warnings are shown here.",
    alertsNote:"Check official instructions from the relevant disaster-management authority. This app will show alerts only after a trusted source is configured.",
    latestShelters:"Recently updated records", noRecords:"No shelter records yet", noRecordsHelp:"Add a real shelter using information you have permission to record. New entries are marked “Needs review” until checked.",
    viewAll:"View directory", openAlerts:"Open alerts", readinessCard:"Household readiness", updateNow:"Update checklist", localDataNotice:"Device-only storage. Records entered here do not sync to other people or devices.",
    directoryTitle:"Shelter directory", directorySubtitle:"Add and maintain shelter information for the Odisha pilot. Every new entry needs its own source and remains pending review until independently checked.",
    allDistricts:"All districts / areas", anyFacility:"Any facility", drinkingWater:"Drinking water", sanitation:"Sanitation",
    medicalSupport:"Medical support", backupPower:"Backup power", accessibility:"Accessible access", foodSupplies:"Food supplies",
    clearFilters:"Clear filters", noMatch:"No matching shelters", changeFilters:"Try another search or clear the filters.",
    addRecord:"Add a shelter", editRecord:"Edit shelter record", shelterName:"Shelter name", district:"District / area",
    address:"Address / directions", capacity:"Recorded capacity (people)", capacityHelp:"Enter the capacity from your source; do not estimate live occupancy.",
    source:"Information source", sourceHelp:"Required for each record: enter the source you actually used, such as a document title and date or a URL. A source citation alone does not verify the record.", sourceExample:"Example (only if you used this source): OSDMA Shelter Locations, accessed [date].", sourceLink:"Open OSDMA Shelter Locations",
    publicContact:"Public shelter contact (optional)", facilities:"Facilities recorded", coordinates:"Coordinates (optional)",
    latitude:"Latitude", longitude:"Longitude", notes:"Notes (optional)", saveRecord:"Save record", cancel:"Cancel",
    sourceRequired:"Add the source for this information.", nameRequired:"Shelter name and district / area are required.",
    capacityInvalid:"Capacity must be a whole number greater than or equal to zero.", coordsInvalid:"Enter both valid coordinates, or leave both blank.",
    needsReview:"Needs review", sourceProvided:"Source entered · not independently verified", recordedCapacity:"Recorded capacity", reviewBadgeHelp:"This label remains until someone independently checks the record; adding a source does not remove it.",
    updated:"Updated", edit:"Edit", delete:"Delete", confirmDelete:"Delete this shelter record from this device?",
    recordSaved:"Shelter record saved on this device.", recordDeleted:"Shelter record deleted from this device.",
    mapTitle:"Shelter locations", mapSubtitle:"Only records with coordinates entered by you are shown as mappable. No coordinates or map locations are invented.",
    noCoordinates:"No shelter records have coordinates yet", noCoordinatesHelp:"Add coordinates only when you have a reliable source. You can still search the directory by district or address.",
    openMap:"Open map", mapProvider:"OpenStreetMap opens only when you choose a shelter link; coordinates are sent to that map provider.",
    alertTitle:"Official alerts", alertSubtitle:"Current official alerts are not available in this app yet.",
    alertEmptyTitle:"No official alert source connected", alertEmptyBody:"No live warning is shown. We will not create or display a simulated warning as if it were real.",
    alertFollow:"For current instructions, use official national and state disaster-management and weather services.",
    guideTitle:"Preparedness guide", guideSubtitle:"Offline checklist and guidance tools. No live AI service is connected.",
    guideUnavailable:"AI assistant not connected", guideUnavailableBody:"This version does not send questions to an AI service. Use the checklists and follow current official safety instructions.",
    readinessTitle:"Household readiness", readinessSubtitle:"A private planning checklist stored in this browser. It is not a safety certification.",
    readinessScore:"Checklist progress", checklistDisclaimer:"This personal checklist score does not assess or certify a shelter.",
    familyPlan:"Household plan", householdPlan:"Agree how household members will contact one another",
    waterPlan:"Plan for drinking water needs", medicines:"Consider essential medicines and prescriptions",
    firstAid:"Review first-aid supplies", torch:"Prepare a torch and spare batteries",
    documents:"Keep important documents accessible", meetingPoint:"Agree on an accessible meeting point",
    supportNeeds:"Plan support for children, older adults, and people with disabilities",
    kitTitle:"Emergency kit checklist", kitSubtitle:"Save a household checklist on this device; adapt it to official local advice and personal needs.",
    kitDisclaimer:"Follow current official guidance and personal medical advice for quantities and supplies.",
    waterItem:"Drinking water", foodItem:"Non-perishable food", medicineItem:"Personal medicines",
    firstAidItem:"First-aid kit", torchItem:"Torch and spare batteries", powerItem:"Power bank and charging cable",
    hygieneItem:"Hygiene supplies", documentsItem:"Copies of important documents", clothingItem:"Clothing and rain protection",
    capacityTitle:"Capacity planner", capacitySubtitle:"Explore a planning scenario using only capacity entered in your local shelter records.",
    scenarioDemand:"Additional people in scenario", closedShelters:"Exclude a shelter from this scenario",
    estimatedCapacity:"Recorded capacity included", projectedDemand:"Entered scenario demand", remaining:"Capacity after demand",
    capacityDisclaimer:"Planning calculation only. It is not live occupancy, a forecast, or an evacuation plan. Record accuracy is not independently verified.",
    enterDemand:"Enter a scenario demand to calculate the remaining capacity.", shortfall:"Potential capacity gap", buffer:"Capacity above entered demand",
    familyTitle:"Household safety plan", familySubtitle:"A private checklist. This app does not collect names, phone numbers, or precise home locations.",
    contactPlan:"Choose trusted emergency contacts", meetingPlan:"Agree on an accessible meeting point",
    carePlan:"Plan for children, older adults, and support needs", updatePlan:"Decide how to receive official updates",
    privacyNote:"Checklist ticks stay on this device. Do not enter sensitive personal details.",
    reportsTitle:"Reports & export", reportsSubtitle:"Figures below are calculated from records saved on this device.",
    sourceCount:"Records needing review", alertStatus:"Official alert feed", notConnected:"Not connected",
    exportCsv:"Export shelter records (CSV)", exportUnavailable:"No shelter records to export.",
    settingsTitle:"Settings", settingsSubtitle:"Language, theme, checklists, and shelter records are saved only in this browser.",
    language:"Language", appearance:"Appearance", dark:"Dark", light:"Light", privacy:"Local storage",
    privacyBody:"No account, server, or sync is configured. Other users cannot see these records.",
    clearData:"Delete all local app data", confirmClear:"Delete all shelter records and checklist data stored by this app on this device?",
    dataCleared:"Local app data deleted.", storageError:"Browser storage is unavailable. Changes may not persist after closing this page.",
    emergencyTitle:"Emergency help", emergencySubtitle:"This app cannot call responders, send SOS, or share your location.",
    immediateDanger:"If there is immediate danger, contact your local official emergency service directly.",
    indiaNumber:"India emergency response number", indiaNote:"112 is for use in India. If you are elsewhere, use your local emergency number. This page does not place calls.",
    noCall:"No call or SOS is sent by this app.", acknowledge:"Understood", print:"Print checklist",
    offlineLabel:"Available on this device", saveError:"Could not save changes in browser storage.",
    openGuide:"Open preparedness guide", sourceField:"Source", capacityField:"Capacity", facilitiesField:"Facilities",
    emptyReport:"No records saved yet.", currentLanguage:"Language updated.", currentTheme:"Theme updated.", rolloutTitle:"Rollout phases",
    phaseOne:"Phase 1 · Odisha pilot launch", phaseTwo:"Phase 2 · Test in selected Odisha districts and shelters",
    phaseThree:"Phase 3 · Expand to other Indian states after feedback and verification",
    rolloutLimit:"No India-wide launch is claimed. Expansion follows testing and verification.",
    shelterSaved:"Shelter saved.", guideLink:"Open official guidance separately", allDataLocal:"Data remains on this device only.",
    deleteAction:"Delete record", close:"Close", optional:"Optional", yes:"Yes", no:"No"
  },
  hi: {
    localApp:"स्थानीय ऐप · ओडिशा पायलट", odishaPilot:"ओडिशा पायलट", localOnly:"इसी डिवाइस पर", localRecords:"स्थानीय रिकॉर्ड", deviceOnly:"इसी डिवाइस पर सहेजा",
    workspace:"कार्य क्षेत्र", overview:"अवलोकन", disasterMap:"आश्रय स्थान", shelters:"आश्रय सूची",
    alerts:"आधिकारिक अलर्ट", assistant:"तैयारी गाइड", preparedness:"तैयारी", readiness:"तैयारी सूची",
    simulator:"क्षमता योजनाकार", emergencyKit:"आपातकालीन किट", familySafety:"परिवार योजना", reports:"रिपोर्ट और निर्यात",
    settings:"सेटिंग", studentInnovator:"स्थानीय उपयोगकर्ता", guestMode:"खाता नहीं · स्थानीय संग्रहण", emergencyHelp:"आपातकालीन सहायता",
    footerNotice:"रिकॉर्ड इसी डिवाइस पर हैं · लाइव आपातकालीन सेवा नहीं", home:"होम", map:"मानचित्र", ai:"गाइड", more:"और",
    overviewTitle:"आश्रय प्रबंधन", overviewSubtitle:"इसी डिवाइस से ओडिशा पायलट के रिकॉर्ड और परिवार की तैयारी संभालें।",
    totalShelters:"आश्रय रिकॉर्ड", totalCapacity:"दर्ज क्षमता", pendingReview:"जांच बाकी", checklistProgress:"व्यक्तिगत तैयारी",
    location:"जिला / क्षेत्र", addShelter:"आश्रय रिकॉर्ड जोड़ें", search:"नाम, जिला या पता खोजें…",
    officialAlerts:"आधिकारिक अलर्ट", alertsNotConnected:"कोई आधिकारिक अलर्ट स्रोत जुड़ा नहीं है। यहां मौजूदा चेतावनी नहीं दिखाई जाती।",
    alertsNote:"संबंधित आपदा प्रबंधन प्राधिकरण के आधिकारिक निर्देश देखें। विश्वसनीय स्रोत जुड़ने के बाद ही ऐप अलर्ट दिखाएगा।",
    latestShelters:"हाल में बदले रिकॉर्ड", noRecords:"अभी कोई आश्रय रिकॉर्ड नहीं", noRecordsHelp:"जिस वास्तविक आश्रय की जानकारी दर्ज करने की अनुमति हो, उसे जोड़ें। जांच होने तक नई प्रविष्टि “जांच बाकी” रहेगी।",
    viewAll:"सूची देखें", openAlerts:"अलर्ट खोलें", readinessCard:"परिवार की तैयारी", updateNow:"सूची अपडेट करें", localDataNotice:"जानकारी इसी डिवाइस पर रहती है। यह दूसरे लोगों या उपकरणों से सिंक नहीं होती।",
    directoryTitle:"आश्रय सूची", directorySubtitle:"ओडिशा पायलट के लिए आश्रय जानकारी जोड़ें और संभालें। हर रिकॉर्ड का अपना स्रोत होना चाहिए और स्वतंत्र जाँच तक समीक्षा लंबित रहेगी।",
    allDistricts:"सभी जिले / क्षेत्र", anyFacility:"कोई भी सुविधा", drinkingWater:"पीने का पानी", sanitation:"स्वच्छता",
    medicalSupport:"चिकित्सा सहायता", backupPower:"बैकअप बिजली", accessibility:"सुलभ प्रवेश", foodSupplies:"खाद्य सामग्री",
    clearFilters:"फ़िल्टर हटाएं", noMatch:"कोई मिलता-जुलता आश्रय नहीं", changeFilters:"दूसरी खोज करें या फ़िल्टर हटाएं।",
    addRecord:"आश्रय जोड़ें", editRecord:"आश्रय रिकॉर्ड संपादित करें", shelterName:"आश्रय का नाम", district:"जिला / क्षेत्र",
    address:"पता / दिशा", capacity:"दर्ज क्षमता (लोग)", capacityHelp:"स्रोत में दी क्षमता दर्ज करें; मौजूदा खाली जगह का अनुमान न लगाएं।",
    source:"जानकारी का स्रोत", sourceHelp:"हर रिकॉर्ड के लिए ज़रूरी: वही स्रोत लिखें जिसका आपने वास्तव में उपयोग किया—जैसे दस्तावेज़ का नाम और तारीख या URL। स्रोत लिखने भर से रिकॉर्ड सत्यापित नहीं होता।", sourceExample:"उदाहरण (केवल यदि यही स्रोत इस्तेमाल किया हो): OSDMA Shelter Locations, देखने की तारीख [तारीख]।", sourceLink:"OSDMA Shelter Locations खोलें",
    publicContact:"आश्रय का सार्वजनिक संपर्क (वैकल्पिक)", facilities:"दर्ज सुविधाएं", coordinates:"निर्देशांक (वैकल्पिक)",
    latitude:"अक्षांश", longitude:"देशांतर", notes:"नोट (वैकल्पिक)", saveRecord:"रिकॉर्ड सहेजें", cancel:"रद्द करें",
    sourceRequired:"इस जानकारी का स्रोत दें।", nameRequired:"आश्रय का नाम और जिला / क्षेत्र जरूरी है।",
    capacityInvalid:"क्षमता शून्य या उससे बड़ी पूर्ण संख्या होनी चाहिए।", coordsInvalid:"दोनों मान्य निर्देशांक डालें या दोनों खाली छोड़ें।",
    needsReview:"जांच बाकी", sourceProvided:"स्रोत दर्ज · स्वतंत्र सत्यापन नहीं", recordedCapacity:"दर्ज क्षमता", reviewBadgeHelp:"यह लेबल तब तक रहेगा जब तक कोई व्यक्ति रिकॉर्ड की स्वतंत्र जाँच न करे; स्रोत जोड़ने से लेबल नहीं हटता।",
    updated:"अपडेट", edit:"संपादित करें", delete:"हटाएं", confirmDelete:"इस डिवाइस से यह आश्रय रिकॉर्ड हटाएं?",
    recordSaved:"आश्रय रिकॉर्ड इस डिवाइस पर सहेजा गया।", recordDeleted:"आश्रय रिकॉर्ड इस डिवाइस से हटाया गया।",
    mapTitle:"आश्रय स्थान", mapSubtitle:"केवल आपके डाले निर्देशांक वाले रिकॉर्ड मानचित्र पर खुलेंगे। कोई स्थान या निर्देशांक गढ़े नहीं जाते।",
    noCoordinates:"अभी किसी आश्रय रिकॉर्ड में निर्देशांक नहीं हैं", noCoordinatesHelp:"विश्वसनीय स्रोत मिलने पर ही निर्देशांक जोड़ें। जिला या पते से सूची खोज सकते हैं।",
    openMap:"मानचित्र खोलें", mapProvider:"आपके चुनने पर OpenStreetMap खुलेगा; निर्देशांक उस मानचित्र सेवा को भेजे जाएंगे।",
    alertTitle:"आधिकारिक अलर्ट", alertSubtitle:"इस ऐप में अभी मौजूदा आधिकारिक अलर्ट उपलब्ध नहीं हैं।",
    alertEmptyTitle:"आधिकारिक अलर्ट स्रोत जुड़ा नहीं है", alertEmptyBody:"कोई लाइव चेतावनी नहीं दिखाई जाती। नकली अभ्यास चेतावनी को असली बताकर नहीं दिखाया जाएगा।",
    alertFollow:"मौजूदा निर्देशों के लिए राष्ट्रीय और राज्य आपदा प्रबंधन तथा मौसम सेवाओं के आधिकारिक स्रोत देखें।",
    guideTitle:"तैयारी गाइड", guideSubtitle:"ऑफ़लाइन सूची और तैयारी के औज़ार। लाइव AI सेवा कनेक्ट नहीं है।",
    guideUnavailable:"AI सहायक कनेक्ट नहीं है", guideUnavailableBody:"यह संस्करण सवाल किसी AI सेवा को नहीं भेजता। सूची का उपयोग करें और मौजूदा आधिकारिक सुरक्षा निर्देश मानें।",
    readinessTitle:"परिवार की तैयारी", readinessSubtitle:"इस ब्राउज़र में रखी निजी योजना सूची। यह सुरक्षा प्रमाणपत्र नहीं है।",
    readinessScore:"सूची की प्रगति", checklistDisclaimer:"यह व्यक्तिगत सूची स्कोर किसी आश्रय का आकलन या प्रमाणन नहीं है।",
    familyPlan:"परिवार योजना", householdPlan:"तय करें कि परिवार के सदस्य एक-दूसरे से कैसे संपर्क करेंगे",
    waterPlan:"पीने के पानी की जरूरत की योजना", medicines:"जरूरी दवाइयों और पर्चों पर विचार",
    firstAid:"प्राथमिक उपचार सामग्री जांचें", torch:"टॉर्च और अतिरिक्त बैटरी तैयार रखें",
    documents:"जरूरी दस्तावेज सुलभ रखें", meetingPoint:"सुलभ मिलने की जगह तय करें",
    supportNeeds:"बच्चों, बुजुर्गों और दिव्यांग लोगों की सहायता की योजना बनाएं",
    kitTitle:"आपातकालीन किट सूची", kitSubtitle:"इस डिवाइस पर परिवार की सूची सहेजें; इसे स्थानीय आधिकारिक सलाह और निजी जरूरतों के अनुसार ढालें।",
    kitDisclaimer:"मात्रा और सामान के लिए मौजूदा आधिकारिक सलाह तथा निजी चिकित्सा सलाह मानें।",
    waterItem:"पीने का पानी", foodItem:"लंबे समय तक चलने वाला भोजन", medicineItem:"निजी दवाइयां",
    firstAidItem:"प्राथमिक उपचार किट", torchItem:"टॉर्च और अतिरिक्त बैटरी", powerItem:"पावर बैंक और चार्जिंग केबल",
    hygieneItem:"स्वच्छता सामग्री", documentsItem:"जरूरी दस्तावेजों की प्रतियां", clothingItem:"कपड़े और बारिश से बचाव",
    capacityTitle:"क्षमता योजनाकार", capacitySubtitle:"अपने स्थानीय आश्रय रिकॉर्ड में दर्ज क्षमता से योजना परिदृश्य देखें।",
    scenarioDemand:"परिदृश्य में अतिरिक्त लोग", closedShelters:"इस परिदृश्य से आश्रय हटाएं",
    estimatedCapacity:"शामिल दर्ज क्षमता", projectedDemand:"दर्ज परिदृश्य मांग", remaining:"मांग के बाद क्षमता",
    capacityDisclaimer:"केवल योजना गणना। यह मौजूदा भीड़, पूर्वानुमान या निकासी योजना नहीं है। रिकॉर्ड स्वतंत्र रूप से सत्यापित नहीं हैं।",
    enterDemand:"बची क्षमता निकालने के लिए परिदृश्य की मांग दर्ज करें।", shortfall:"संभावित क्षमता की कमी", buffer:"दर्ज मांग से अधिक क्षमता",
    familyTitle:"परिवार सुरक्षा योजना", familySubtitle:"निजी सूची। यह ऐप नाम, फोन नंबर या घर का सटीक स्थान नहीं लेता।",
    contactPlan:"विश्वसनीय आपातकालीन संपर्क चुनें", meetingPlan:"सुलभ मिलने की जगह तय करें",
    carePlan:"बच्चों, बुजुर्गों और सहायता जरूरतों की योजना बनाएं", updatePlan:"आधिकारिक अपडेट पाने का तरीका तय करें",
    privacyNote:"सूची के निशान इसी डिवाइस पर रहते हैं। संवेदनशील निजी जानकारी न डालें।",
    reportsTitle:"रिपोर्ट और निर्यात", reportsSubtitle:"नीचे की गणना इसी डिवाइस पर सहेजे गए रिकॉर्ड से है।",
    sourceCount:"जांच बाकी रिकॉर्ड", alertStatus:"आधिकारिक अलर्ट स्रोत", notConnected:"कनेक्ट नहीं",
    exportCsv:"आश्रय रिकॉर्ड निर्यात करें (CSV)", exportUnavailable:"निर्यात करने के लिए कोई आश्रय रिकॉर्ड नहीं है।",
    settingsTitle:"सेटिंग", settingsSubtitle:"भाषा, थीम, सूचियां और आश्रय रिकॉर्ड केवल इसी ब्राउज़र में सहेजे जाते हैं।",
    language:"भाषा", appearance:"रूप", dark:"डार्क", light:"लाइट", privacy:"स्थानीय संग्रहण",
    privacyBody:"कोई खाता, सर्वर या सिंक सेट नहीं है। दूसरे उपयोगकर्ता ये रिकॉर्ड नहीं देख सकते।",
    clearData:"सभी स्थानीय ऐप डेटा हटाएं", confirmClear:"इस डिवाइस पर ऐप के सभी आश्रय रिकॉर्ड और सूची डेटा हटाएं?",
    dataCleared:"स्थानीय ऐप डेटा हटाया गया।", storageError:"ब्राउज़र संग्रहण उपलब्ध नहीं है। पेज बंद करने के बाद बदलाव सहेजे न रहें।",
    emergencyTitle:"आपातकालीन सहायता", emergencySubtitle:"यह ऐप सेवाओं को कॉल, SOS या स्थान साझा नहीं कर सकता।",
    immediateDanger:"तत्काल खतरे में सीधे अपनी स्थानीय आधिकारिक आपातकालीन सेवा से संपर्क करें।",
    indiaNumber:"भारत आपातकालीन सेवा नंबर", indiaNote:"112 भारत में उपयोग के लिए है। अन्य जगह स्थानीय नंबर का उपयोग करें। यह पेज कॉल नहीं करता।",
    noCall:"इस ऐप से कोई कॉल या SOS नहीं भेजा जाएगा।", acknowledge:"समझ गया", print:"सूची प्रिंट करें",
    offlineLabel:"इस डिवाइस पर उपलब्ध", saveError:"ब्राउज़र संग्रहण में बदलाव सहेजा नहीं जा सका।",
    openGuide:"तैयारी गाइड खोलें", sourceField:"स्रोत", capacityField:"क्षमता", facilitiesField:"सुविधाएं",
    emptyReport:"अभी कोई रिकॉर्ड सहेजा नहीं गया।", currentLanguage:"भाषा अपडेट हुई।", currentTheme:"थीम अपडेट हुई।", rolloutTitle:"लॉन्च के चरण",
    phaseOne:"चरण 1 · ओडिशा पायलट लॉन्च", phaseTwo:"चरण 2 · ओडिशा के चुने जिलों और आश्रयों में परीक्षण",
    phaseThree:"चरण 3 · प्रतिक्रिया और सत्यापन के बाद अन्य भारतीय राज्यों में विस्तार",
    rolloutLimit:"अभी पूरे भारत में लॉन्च का दावा नहीं है। परीक्षण और सत्यापन के बाद ही विस्तार होगा।",
    shelterSaved:"आश्रय सहेजा गया।", guideLink:"आधिकारिक सलाह अलग से खोलें", allDataLocal:"डेटा केवल इसी डिवाइस पर रहेगा।",
    deleteAction:"रिकॉर्ड हटाएं", close:"बंद करें", optional:"वैकल्पिक", yes:"हां", no:"नहीं"
  },
  or: {
    localApp:"ସ୍ଥାନୀୟ ଆପ୍ · ଓଡ଼ିଶା ପାଇଲଟ୍", odishaPilot:"ଓଡ଼ିଶା ପାଇଲଟ୍", localOnly:"ଏହି ଡିଭାଇସ୍‌ରେ", localRecords:"ସ୍ଥାନୀୟ ରେକର୍ଡ", deviceOnly:"ଏହି ଡିଭାଇସ୍‌ରେ ସଞ୍ଚିତ",
    workspace:"କାର୍ଯ୍ୟକ୍ଷେତ୍ର", overview:"ସାରାଂଶ", disasterMap:"ଆଶ୍ରୟସ୍ଥଳ ଅବସ୍ଥାନ", shelters:"ଆଶ୍ରୟ ତାଲିକା",
    alerts:"ସରକାରୀ ସତର୍କତା", assistant:"ପ୍ରସ୍ତୁତି ଗାଇଡ୍", preparedness:"ପ୍ରସ୍ତୁତି", readiness:"ପ୍ରସ୍ତୁତି ତାଲିକା",
    simulator:"କ୍ଷମତା ଯୋଜନା", emergencyKit:"ଜରୁରୀ କିଟ୍", familySafety:"ପରିବାର ଯୋଜନା", reports:"ରିପୋର୍ଟ ଓ ରପ୍ତାନି",
    settings:"ସେଟିଂସ୍", studentInnovator:"ସ୍ଥାନୀୟ ବ୍ୟବହାରକାରୀ", guestMode:"ଖାତା ନାହିଁ · ସ୍ଥାନୀୟ ସଂରକ୍ଷଣ", emergencyHelp:"ଜରୁରୀ ସହାୟତା",
    footerNotice:"ରେକର୍ଡ ଏହି ଡିଭାଇସ୍‌ରେ ସଞ୍ଚିତ · ଲାଇଭ୍ ଜରୁରୀ ସେବା ନୁହେଁ", home:"ମୂଳପୃଷ୍ଠା", map:"ମାନଚିତ୍ର", ai:"ଗାଇଡ୍", more:"ଅଧିକ",
    overviewTitle:"ଆଶ୍ରୟ ପରିଚାଳନା", overviewSubtitle:"ଏହି ଡିଭାଇସ୍‌ରୁ ଓଡ଼ିଶା ପାଇଲଟ୍ ରେକର୍ଡ ଏବଂ ପରିବାର ପ୍ରସ୍ତୁତି ପରିଚାଳନା କରନ୍ତୁ।",
    totalShelters:"ଆଶ୍ରୟ ରେକର୍ଡ", totalCapacity:"ରେକର୍ଡ କ୍ଷମତା", pendingReview:"ଯାଞ୍ଚ ବାକି", checklistProgress:"ବ୍ୟକ୍ତିଗତ ପ୍ରସ୍ତୁତି",
    location:"ଜିଲ୍ଲା / ଅଞ୍ଚଳ", addShelter:"ଆଶ୍ରୟ ରେକର୍ଡ ଯୋଡ଼ନ୍ତୁ", search:"ନାମ, ଜିଲ୍ଲା କିମ୍ବା ଠିକଣା ଖୋଜନ୍ତୁ…",
    officialAlerts:"ସରକାରୀ ସତର୍କତା", alertsNotConnected:"କୌଣସି ସରକାରୀ ସତର୍କତା ଉତ୍ସ ସଂଯୁକ୍ତ ନାହିଁ। ଏଠାରେ ବର୍ତ୍ତମାନର ସତର୍କବାଣୀ ଦେଖାଯାଏ ନାହିଁ।",
    alertsNote:"ସମ୍ପୃକ୍ତ ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା କର୍ତ୍ତୃପକ୍ଷଙ୍କ ସରକାରୀ ନିର୍ଦ୍ଦେଶ ଦେଖନ୍ତୁ। ଭରସାଯୋଗ୍ୟ ଉତ୍ସ ସଂଯୁକ୍ତ ହେଲେ ମାତ୍ର ଆପ୍ ସତର୍କତା ଦେଖାଇବ।",
    latestShelters:"ନିକଟରେ ଅପଡେଟ୍ ରେକର୍ଡ", noRecords:"ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଆଶ୍ରୟ ରେକର୍ଡ ନାହିଁ", noRecordsHelp:"ରେକର୍ଡ କରିବାକୁ ଅନୁମତି ଥିବା ପ୍ରକୃତ ଆଶ୍ରୟ ତଥ୍ୟ ଯୋଡ଼ନ୍ତୁ। ଯାଞ୍ଚ ହେବା ପର୍ଯ୍ୟନ୍ତ ନୂଆ ଏଣ୍ଟ୍ରି “ଯାଞ୍ଚ ବାକି” ରହିବ।",
    viewAll:"ତାଲିକା ଦେଖନ୍ତୁ", openAlerts:"ସତର୍କତା ଖୋଲନ୍ତୁ", readinessCard:"ପରିବାର ପ୍ରସ୍ତୁତି", updateNow:"ତାଲିକା ଅପଡେଟ୍ କରନ୍ତୁ", localDataNotice:"ତଥ୍ୟ କେବଳ ଏହି ଡିଭାଇସ୍‌ରେ ରହେ। ଅନ୍ୟ ବ୍ୟବହାରକାରୀ କିମ୍ବା ଡିଭାଇସ୍ ସହିତ ସିଙ୍କ୍ ହୁଏ ନାହିଁ।",
    directoryTitle:"ଆଶ୍ରୟ ତାଲିକା", directorySubtitle:"ଓଡ଼ିଶା ପାଇଲଟ୍ ପାଇଁ ଆଶ୍ରୟ ସୂଚନା ଯୋଡ଼ନ୍ତୁ ଏବଂ ପରିଚାଳନା କରନ୍ତୁ। ପ୍ରତ୍ୟେକ ରେକର୍ଡର ନିଜସ୍ୱ ଉତ୍ସ ଦରକାର ଏବଂ ସ୍ୱାଧୀନ ଯାଞ୍ଚ ନହେବା ପର୍ଯ୍ୟନ୍ତ ଯାଞ୍ଚ ବାକି ରହିବ।",
    allDistricts:"ସମସ୍ତ ଜିଲ୍ଲା / ଅଞ୍ଚଳ", anyFacility:"ଯେକୌଣସି ସୁବିଧା", drinkingWater:"ପିଇବା ପାଣି", sanitation:"ପରିମଳ",
    medicalSupport:"ଚିକିତ୍ସା ସହାୟତା", backupPower:"ବିକଳ୍ପ ବିଦ୍ୟୁତ୍", accessibility:"ସହଜ ପ୍ରବେଶ", foodSupplies:"ଖାଦ୍ୟ ସାମଗ୍ରୀ",
    clearFilters:"ଫିଲ୍ଟର୍ ହଟାନ୍ତୁ", noMatch:"ମେଳ ଖାଉଥିବା ଆଶ୍ରୟ ନାହିଁ", changeFilters:"ଅନ୍ୟ ଖୋଜ କରନ୍ତୁ କିମ୍ବା ଫିଲ୍ଟର୍ ହଟାନ୍ତୁ।",
    addRecord:"ଆଶ୍ରୟ ଯୋଡ଼ନ୍ତୁ", editRecord:"ଆଶ୍ରୟ ରେକର୍ଡ ସମ୍ପାଦନା", shelterName:"ଆଶ୍ରୟର ନାମ", district:"ଜିଲ୍ଲା / ଅଞ୍ଚଳ",
    address:"ଠିକଣା / ଦିଗ", capacity:"ରେକର୍ଡ କ୍ଷମତା (ଲୋକ)", capacityHelp:"ଉତ୍ସରେ ଥିବା କ୍ଷମତା ଲେଖନ୍ତୁ; ବର୍ତ୍ତମାନ ଖାଲି ସ୍ଥାନର ଅନୁମାନ କରନ୍ତୁ ନାହିଁ।",
    source:"ସୂଚନା ଉତ୍ସ", sourceHelp:"ପ୍ରତ୍ୟେକ ରେକର୍ଡ ପାଇଁ ଆବଶ୍ୟକ: ଆପଣ ପ୍ରକୃତରେ ବ୍ୟବହାର କରିଥିବା ଉତ୍ସ ଲେଖନ୍ତୁ—ଯେପରି ଦଲିଲ୍ ନାମ ଓ ତାରିଖ କିମ୍ବା URL। କେବଳ ଉତ୍ସ ଲେଖିଲେ ରେକର୍ଡ ଯାଞ୍ଚ ହୁଏ ନାହିଁ।", sourceExample:"ଉଦାହରଣ (କେବଳ ଏହି ଉତ୍ସ ବ୍ୟବହାର କରିଥିଲେ): OSDMA Shelter Locations, ଦେଖିଥିବା ତାରିଖ [ତାରିଖ]।", sourceLink:"OSDMA Shelter Locations ଖୋଲନ୍ତୁ",
    publicContact:"ସାର୍ବଜନୀନ ଆଶ୍ରୟ ଯୋଗାଯୋଗ (ଇଚ୍ଛାଧୀନ)", facilities:"ରେକର୍ଡ ସୁବିଧା", coordinates:"ସ୍ଥାନାଙ୍କ (ଇଚ୍ଛାଧୀନ)",
    latitude:"ଅକ୍ଷାଂଶ", longitude:"ଦ୍ରାଘିମା", notes:"ଟିପ୍ପଣୀ (ଇଚ୍ଛାଧୀନ)", saveRecord:"ରେକର୍ଡ ସଞ୍ଚୟ", cancel:"ବାତିଲ୍",
    sourceRequired:"ଏହି ସୂଚନାର ଉତ୍ସ ଦିଅନ୍ତୁ।", nameRequired:"ଆଶ୍ରୟର ନାମ ଏବଂ ଜିଲ୍ଲା / ଅଞ୍ଚଳ ଆବଶ୍ୟକ।",
    capacityInvalid:"କ୍ଷମତା ଶୂନ୍ୟ କିମ୍ବା ତାଠାରୁ ଅଧିକ ପୂର୍ଣ୍ଣ ସଂଖ୍ୟା ହେବା ଦରକାର।", coordsInvalid:"ଉଭୟ ବୈଧ ସ୍ଥାନାଙ୍କ ଦିଅନ୍ତୁ କିମ୍ବା ଉଭୟ ଖାଲି ରଖନ୍ତୁ।",
    needsReview:"ଯାଞ୍ଚ ବାକି", sourceProvided:"ଉତ୍ସ ଲେଖାଯାଇଛି · ସ୍ୱାଧୀନ ଯାଞ୍ଚ ହୋଇନାହିଁ", recordedCapacity:"ରେକର୍ଡ କ୍ଷମତା", reviewBadgeHelp:"କେହି ଏହି ରେକର୍ଡକୁ ସ୍ୱାଧୀନ ଭାବେ ଯାଞ୍ଚ ନକରିବା ପର୍ଯ୍ୟନ୍ତ ଏହି ଚିହ୍ନ ରହିବ; ଉତ୍ସ ଯୋଡ଼ିଲେ ଏହା ହଟିବ ନାହିଁ।",
    updated:"ଅପଡେଟ୍", edit:"ସମ୍ପାଦନା", delete:"ବିଲୋପ", confirmDelete:"ଏହି ଡିଭାଇସ୍‌ରୁ ଏହି ଆଶ୍ରୟ ରେକର୍ଡ ବିଲୋପ କରିବେ?",
    recordSaved:"ଆଶ୍ରୟ ରେକର୍ଡ ଏହି ଡିଭାଇସ୍‌ରେ ସଞ୍ଚିତ ହେଲା।", recordDeleted:"ଏହି ଡିଭାଇସ୍‌ରୁ ଆଶ୍ରୟ ରେକର୍ଡ ବିଲୋପ ହେଲା।",
    mapTitle:"ଆଶ୍ରୟ ଅବସ୍ଥାନ", mapSubtitle:"ଆପଣ ନିଜେ ସ୍ଥାନାଙ୍କ ଦେଇଥିବା ରେକର୍ଡ ମାନଚିତ୍ରରେ ଖୋଲିବ। କୌଣସି ସ୍ଥାନ କିମ୍ବା ସ୍ଥାନାଙ୍କ ତିଆରି କରାଯାଏ ନାହିଁ।",
    noCoordinates:"କୌଣସି ଆଶ୍ରୟ ରେକର୍ଡରେ ସ୍ଥାନାଙ୍କ ନାହିଁ", noCoordinatesHelp:"ଭରସାଯୋଗ୍ୟ ଉତ୍ସ ଥିଲେ ମାତ୍ର ସ୍ଥାନାଙ୍କ ଯୋଡ଼ନ୍ତୁ। ଜିଲ୍ଲା କିମ୍ବା ଠିକଣା ଦ୍ୱାରା ତାଲିକା ଖୋଜିପାରିବେ।",
    openMap:"ମାନଚିତ୍ର ଖୋଲନ୍ତୁ", mapProvider:"ଆପଣ ଆଶ୍ରୟ ଲିଙ୍କ୍ ବାଛିଲେ OpenStreetMap ଖୋଲିବ; ସ୍ଥାନାଙ୍କ ସେହି ମାନଚିତ୍ର ସେବାକୁ ପଠାଯିବ।",
    alertTitle:"ସରକାରୀ ସତର୍କତା", alertSubtitle:"ଏହି ଆପ୍‌ରେ ବର୍ତ୍ତମାନ ସରକାରୀ ସତର୍କତା ଉପଲବ୍ଧ ନାହିଁ।",
    alertEmptyTitle:"ସରକାରୀ ସତର୍କତା ଉତ୍ସ ସଂଯୁକ୍ତ ନାହିଁ", alertEmptyBody:"କୌଣସି ଲାଇଭ୍ ସତର୍କବାଣୀ ଦେଖାଯାଏ ନାହିଁ। ଅଭ୍ୟାସ ସତର୍କବାଣୀକୁ ପ୍ରକୃତ ବୋଲି ଦେଖାଯିବ ନାହିଁ।",
    alertFollow:"ବର୍ତ୍ତମାନର ନିର୍ଦ୍ଦେଶ ପାଇଁ ଜାତୀୟ ଓ ରାଜ୍ୟ ବିପର୍ଯ୍ୟୟ ପରିଚାଳନା ଏବଂ ପାଣିପାଗ ସେବାର ସରକାରୀ ଉତ୍ସ ଦେଖନ୍ତୁ।",
    guideTitle:"ପ୍ରସ୍ତୁତି ଗାଇଡ୍", guideSubtitle:"ଅଫ୍‌ଲାଇନ୍ ତାଲିକା ଏବଂ ପ୍ରସ୍ତୁତି ଉପକରଣ। ଲାଇଭ୍ AI ସେବା ସଂଯୁକ୍ତ ନାହିଁ।",
    guideUnavailable:"AI ସହାୟକ ସଂଯୁକ୍ତ ନାହିଁ", guideUnavailableBody:"ଏହି ସଂସ୍କରଣ ପ୍ରଶ୍ନକୁ AI ସେବାକୁ ପଠାଏ ନାହିଁ। ତାଲିକା ବ୍ୟବହାର କରନ୍ତୁ ଏବଂ ବର୍ତ୍ତମାନର ସରକାରୀ ସୁରକ୍ଷା ନିର୍ଦ୍ଦେଶ ମାନନ୍ତୁ।",
    readinessTitle:"ପରିବାର ପ୍ରସ୍ତୁତି", readinessSubtitle:"ଏହି ବ୍ରାଉଜର୍‌ରେ ରଖାଯାଇଥିବା ବ୍ୟକ୍ତିଗତ ଯୋଜନା ତାଲିକା। ଏହା ସୁରକ୍ଷା ପ୍ରମାଣପତ୍ର ନୁହେଁ।",
    readinessScore:"ତାଲିକାର ଅଗ୍ରଗତି", checklistDisclaimer:"ଏହି ବ୍ୟକ୍ତିଗତ ତାଲିକା ସ୍କୋର କୌଣସି ଆଶ୍ରୟସ୍ଥଳକୁ ମୂଲ୍ୟାୟନ କିମ୍ବା ପ୍ରମାଣିତ କରେ ନାହିଁ।",
    familyPlan:"ପରିବାର ଯୋଜନା", householdPlan:"ପରିବାର ସଦସ୍ୟ ପରସ୍ପର ସହିତ କିପରି ଯୋଗାଯୋଗ କରିବେ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ",
    waterPlan:"ପିଇବା ପାଣି ଆବଶ୍ୟକତା ପାଇଁ ଯୋଜନା", medicines:"ଆବଶ୍ୟକ ଔଷଧ ଓ ପ୍ରେସକ୍ରିପସନ୍ ବିଚାର କରନ୍ତୁ",
    firstAid:"ପ୍ରାଥମିକ ଚିକିତ୍ସା ସାମଗ୍ରୀ ଯାଞ୍ଚ କରନ୍ତୁ", torch:"ଟର୍ଚ୍ଚ ଓ ଅତିରିକ୍ତ ବ୍ୟାଟେରୀ ପ୍ରସ୍ତୁତ ରଖନ୍ତୁ",
    documents:"ଜରୁରୀ ଦଲିଲ୍ ହାତ ପାଖରେ ରଖନ୍ତୁ", meetingPoint:"ସହଜ ପ୍ରବେଶଯୋଗ୍ୟ ମିଳନ ସ୍ଥାନ ଧାର୍ଯ୍ୟ କରନ୍ତୁ",
    supportNeeds:"ଶିଶୁ, ବୟସ୍କ ଏବଂ ଦିବ୍ୟାଙ୍ଗ ବ୍ୟକ୍ତିଙ୍କ ପାଇଁ ସହାୟତା ଯୋଜନା କରନ୍ତୁ",
    kitTitle:"ଜରୁରୀ କିଟ୍ ତାଲିକା", kitSubtitle:"ଏହି ଡିଭାଇସ୍‌ରେ ପରିବାର ତାଲିକା ସଞ୍ଚୟ କରନ୍ତୁ; ସ୍ଥାନୀୟ ସରକାରୀ ପରାମର୍ଶ ଓ ବ୍ୟକ୍ତିଗତ ଆବଶ୍ୟକତା ଅନୁସାରେ ବଦଳାନ୍ତୁ।",
    kitDisclaimer:"ପରିମାଣ ଓ ସାମଗ୍ରୀ ପାଇଁ ବର୍ତ୍ତମାନର ସରକାରୀ ପରାମର୍ଶ ଏବଂ ବ୍ୟକ୍ତିଗତ ଚିକିତ୍ସା ପରାମର୍ଶ ମାନନ୍ତୁ।",
    waterItem:"ପିଇବା ପାଣି", foodItem:"ଦୀର୍ଘସ୍ଥାୟୀ ଖାଦ୍ୟ", medicineItem:"ବ୍ୟକ୍ତିଗତ ଔଷଧ",
    firstAidItem:"ପ୍ରାଥମିକ ଚିକିତ୍ସା କିଟ୍", torchItem:"ଟର୍ଚ୍ଚ ଓ ଅତିରିକ୍ତ ବ୍ୟାଟେରୀ", powerItem:"ପାୱାର ବ୍ୟାଙ୍କ ଓ ଚାର୍ଜିଂ କେବୁଲ୍",
    hygieneItem:"ସ୍ୱଚ୍ଛତା ସାମଗ୍ରୀ", documentsItem:"ଜରୁରୀ ଦଲିଲ୍‌ର ନକଲ", clothingItem:"ପୋଷାକ ଓ ବର୍ଷା ସୁରକ୍ଷା",
    capacityTitle:"କ୍ଷମତା ଯୋଜନା", capacitySubtitle:"ଆପଣଙ୍କ ସ୍ଥାନୀୟ ଆଶ୍ରୟ ରେକର୍ଡରେ ଥିବା କ୍ଷମତା ବ୍ୟବହାର କରି ଯୋଜନା ଦୃଶ୍ୟ ଦେଖନ୍ତୁ।",
    scenarioDemand:"ଦୃଶ୍ୟରେ ଅତିରିକ୍ତ ଲୋକ", closedShelters:"ଏହି ଦୃଶ୍ୟରୁ ଆଶ୍ରୟ ବାଦ୍ ଦିଅନ୍ତୁ",
    estimatedCapacity:"ଅନ୍ତର୍ଭୁକ୍ତ ରେକର୍ଡ କ୍ଷମତା", projectedDemand:"ଲେଖାଯାଇଥିବା ଦୃଶ୍ୟ ଚାହିଦା", remaining:"ଚାହିଦା ପରେ କ୍ଷମତା",
    capacityDisclaimer:"କେବଳ ଯୋଜନା ଗଣନା। ଏହା ଲାଇଭ୍ ଭିଡ଼, ପୂର୍ବାନୁମାନ କିମ୍ବା ସ୍ଥାନାନ୍ତର ଯୋଜନା ନୁହେଁ। ରେକର୍ଡ ସ୍ୱାଧୀନ ଭାବେ ଯାଞ୍ଚିତ ନୁହେଁ।",
    enterDemand:"ବଳକା କ୍ଷମତା ଗଣନା ପାଇଁ ଦୃଶ୍ୟ ଚାହିଦା ଲେଖନ୍ତୁ।", shortfall:"ସମ୍ଭାବ୍ୟ କ୍ଷମତା ଅଭାବ", buffer:"ଲେଖାଯାଇଥିବା ଚାହିଦାଠାରୁ ଅଧିକ କ୍ଷମତା",
    familyTitle:"ପରିବାର ସୁରକ୍ଷା ଯୋଜନା", familySubtitle:"ବ୍ୟକ୍ତିଗତ ତାଲିକା। ଏହି ଆପ୍ ନାମ, ଫୋନ୍ ନମ୍ବର କିମ୍ବା ଘରର ସଠିକ୍ ସ୍ଥାନ ନିଏ ନାହିଁ।",
    contactPlan:"ଭରସାଯୋଗ୍ୟ ଜରୁରୀ ଯୋଗାଯୋଗ ବାଛନ୍ତୁ", meetingPlan:"ସହଜ ପ୍ରବେଶଯୋଗ୍ୟ ମିଳନ ସ୍ଥାନ ଧାର୍ଯ୍ୟ କରନ୍ତୁ",
    carePlan:"ଶିଶୁ, ବୟସ୍କ ଏବଂ ସହାୟତା ଆବଶ୍ୟକତା ପାଇଁ ଯୋଜନା କରନ୍ତୁ", updatePlan:"ସରକାରୀ ଅପଡେଟ୍ କିପରି ପାଇବେ ନିର୍ଦ୍ଧାରଣ କରନ୍ତୁ",
    privacyNote:"ତାଲିକାର ଚିହ୍ନ ଏହି ଡିଭାଇସ୍‌ରେ ରହେ। ସମ୍ବେଦନଶୀଳ ବ୍ୟକ୍ତିଗତ ତଥ୍ୟ ଦିଅନ୍ତୁ ନାହିଁ।",
    reportsTitle:"ରିପୋର୍ଟ ଓ ରପ୍ତାନି", reportsSubtitle:"ନିମ୍ନର ଗଣନା ଏହି ଡିଭାଇସ୍‌ରେ ସଞ୍ଚିତ ରେକର୍ଡରୁ ହୋଇଛି।",
    sourceCount:"ଯାଞ୍ଚ ବାକି ରେକର୍ଡ", alertStatus:"ସରକାରୀ ସତର୍କତା ଉତ୍ସ", notConnected:"ସଂଯୁକ୍ତ ନୁହେଁ",
    exportCsv:"ଆଶ୍ରୟ ରେକର୍ଡ ରପ୍ତାନି (CSV)", exportUnavailable:"ରପ୍ତାନି ପାଇଁ କୌଣସି ଆଶ୍ରୟ ରେକର୍ଡ ନାହିଁ।",
    settingsTitle:"ସେଟିଂସ୍", settingsSubtitle:"ଭାଷା, ଥିମ୍, ତାଲିକା ଏବଂ ଆଶ୍ରୟ ରେକର୍ଡ କେବଳ ଏହି ବ୍ରାଉଜର୍‌ରେ ସଞ୍ଚିତ ହୁଏ।",
    language:"ଭାଷା", appearance:"ଦୃଶ୍ୟ", dark:"ଡାର୍କ", light:"ଲାଇଟ୍", privacy:"ସ୍ଥାନୀୟ ସଂରକ୍ଷଣ",
    privacyBody:"କୌଣସି ଖାତା, ସର୍ଭର କିମ୍ବା ସିଙ୍କ୍ ବ୍ୟବସ୍ଥା ନାହିଁ। ଅନ୍ୟ ବ୍ୟବହାରକାରୀ ଏହି ରେକର୍ଡ ଦେଖିପାରିବେ ନାହିଁ।",
    clearData:"ସମସ୍ତ ସ୍ଥାନୀୟ ଆପ୍ ତଥ୍ୟ ବିଲୋପ କରନ୍ତୁ", confirmClear:"ଏହି ଡିଭାଇସ୍‌ରେ ଆପ୍‌ର ସମସ୍ତ ଆଶ୍ରୟ ଏବଂ ତାଲିକା ତଥ୍ୟ ବିଲୋପ କରିବେ?",
    dataCleared:"ସ୍ଥାନୀୟ ଆପ୍ ତଥ୍ୟ ବିଲୋପ ହେଲା।", storageError:"ବ୍ରାଉଜର୍ ସଂରକ୍ଷଣ ଉପଲବ୍ଧ ନାହିଁ। ପୃଷ୍ଠା ବନ୍ଦ କଲେ ପରିବର୍ତ୍ତନ ସଞ୍ଚିତ ନ ରହିପାରେ।",
    emergencyTitle:"ଜରୁରୀ ସହାୟତା", emergencySubtitle:"ଏହି ଆପ୍ ସହାୟତାକାରୀଙ୍କୁ କଲ୍, SOS କିମ୍ବା ଆପଣଙ୍କ ସ୍ଥାନ ପଠାଇପାରେ ନାହିଁ।",
    immediateDanger:"ତୁରନ୍ତ ବିପଦ ଥିଲେ ସିଧାସଳଖ ସ୍ଥାନୀୟ ସରକାରୀ ଜରୁରୀ ସେବା ସହିତ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
    indiaNumber:"ଭାରତ ଜରୁରୀ ସେବା ନମ୍ବର", indiaNote:"112 ଭାରତରେ ବ୍ୟବହାର ପାଇଁ। ଅନ୍ୟ ଦେଶରେ ସ୍ଥାନୀୟ ନମ୍ବର ବ୍ୟବହାର କରନ୍ତୁ। ଏହି ପୃଷ୍ଠା କଲ୍ କରେ ନାହିଁ।",
    noCall:"ଏହି ଆପ୍‌ରୁ କଲ୍ କିମ୍ବା SOS ପଠାଯାଏ ନାହିଁ।", acknowledge:"ବୁଝିଲି", print:"ତାଲିକା ପ୍ରିଣ୍ଟ୍ କରନ୍ତୁ",
    offlineLabel:"ଏହି ଡିଭାଇସ୍‌ରେ ଉପଲବ୍ଧ", saveError:"ବ୍ରାଉଜର୍‌ରେ ପରିବର୍ତ୍ତନ ସଞ୍ଚୟ ହେଲା ନାହିଁ।",
    openGuide:"ପ୍ରସ୍ତୁତି ଗାଇଡ୍ ଖୋଲନ୍ତୁ", sourceField:"ଉତ୍ସ", capacityField:"କ୍ଷମତା", facilitiesField:"ସୁବିଧା",
    emptyReport:"ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ରେକର୍ଡ ସଞ୍ଚୟ ହୋଇନାହିଁ।", currentLanguage:"ଭାଷା ଅପଡେଟ୍ ହେଲା।", currentTheme:"ଥିମ୍ ଅପଡେଟ୍ ହେଲା।", rolloutTitle:"ପର୍ଯ୍ୟାୟକ୍ରମିକ ଆରମ୍ଭ",
    phaseOne:"ପର୍ଯ୍ୟାୟ ୧ · ଓଡ଼ିଶା ପାଇଲଟ୍ ଆରମ୍ଭ", phaseTwo:"ପର୍ଯ୍ୟାୟ ୨ · ଓଡ଼ିଶାର ଚୟନିତ ଜିଲ୍ଲା ଓ ଆଶ୍ରୟରେ ପରୀକ୍ଷା",
    phaseThree:"ପର୍ଯ୍ୟାୟ ୩ · ମତାମତ ଓ ଯାଞ୍ଚ ପରେ ଅନ୍ୟ ରାଜ୍ୟକୁ ବିସ୍ତାର",
    rolloutLimit:"ସମଗ୍ର ଭାରତରେ ଆରମ୍ଭ ହୋଇଛି ବୋଲି ଦାବି ନାହିଁ। ପରୀକ୍ଷା ଓ ଯାଞ୍ଚ ପରେ ମାତ୍ର ବିସ୍ତାର ହେବ।",
    shelterSaved:"ଆଶ୍ରୟ ସଞ୍ଚିତ ହେଲା।", guideLink:"ସରକାରୀ ପରାମର୍ଶ ଅଲଗା ଭାବେ ଖୋଲନ୍ତୁ", allDataLocal:"ତଥ୍ୟ କେବଳ ଏହି ଡିଭାଇସ୍‌ରେ ରହିବ।",
    deleteAction:"ରେକର୍ଡ ବିଲୋପ କରନ୍ତୁ", close:"ବନ୍ଦ", optional:"ଇଚ୍ଛାଧୀନ", yes:"ହଁ", no:"ନା"
  }
};

const STORAGE_PREFIX = "aapadalens:v1:";
const SHELTER_FACILITIES = [
  ["water", "drinkingWater"], ["sanitation", "sanitation"], ["medical", "medicalSupport"],
  ["power", "backupPower"], ["accessible", "accessibility"], ["food", "foodSupplies"],
  ["lighting", "emergencyLighting"], ["comms", "communication"]
];
const READINESS_ITEMS = ["householdPlan", "waterPlan", "medicines", "firstAid", "torch", "documents", "meetingPoint", "supportNeeds"];
const KIT_ITEMS = ["waterItem", "foodItem", "medicineItem", "firstAidItem", "torchItem", "powerItem", "hygieneItem", "documentsItem", "clothingItem"];
const FAMILY_ITEMS = ["contactPlan", "meetingPlan", "carePlan", "updatePlan"];
Object.assign(messages.en, {
  emergencySubtitle:"Tapping a number opens your device dialer. This app does not send SOS messages or share your location.",
  indiaNote:"These numbers are for India. Confirm your district control-room number with local authorities.", noCall:"The app does not send SOS messages or share location.",
  quickActions:"Quick actions", findShelter:"Find shelter", sosLabel:"SOS", tasksTitle:"Preparedness tasks", checklistTask:"Emergency kit checklist", familyTask:"Family safety plan", readinessTask:"Household readiness",
  splashTagline:"Safer Communities · Stronger Odisha · A More Resilient Tomorrow", onboardTitle:"Be Prepared. Stay Safer.", onboardBody:"Record shelters, plan ahead and follow official alerts for disasters.",
  next:"Next", skip:"Skip", chooseLanguage:"Choose language", continueLabel:"Continue", sosTap:"Tap for Emergency Help", emergencyNumber:"Emergency", disasterHelpline:"Disaster helpline", ambulance:"Ambulance", fireService:"Fire service", alertBannerBody:"Not connected · no live warnings shown"
});
Object.assign(messages.hi, {
  emergencySubtitle:"किसी नंबर पर टैप करने से आपके डिवाइस का डायलर खुलता है। यह ऐप SOS संदेश नहीं भेजता और आपका स्थान साझा नहीं करता।",
  indiaNote:"ये नंबर भारत के लिए हैं। अपने जिले का नियंत्रण-कक्ष नंबर स्थानीय अधिकारियों से सत्यापित करें।", noCall:"ऐप SOS संदेश नहीं भेजता और स्थान साझा नहीं करता।",
  quickActions:"त्वरित कार्य", findShelter:"आश्रय खोजें", sosLabel:"SOS", tasksTitle:"तैयारी के कार्य", checklistTask:"आपातकालीन किट सूची", familyTask:"परिवार सुरक्षा योजना", readinessTask:"घर की तैयारी",
  splashTagline:"सुरक्षित समुदाय · मजबूत ओडिशा · बेहतर कल", onboardTitle:"तैयार रहें, सुरक्षित रहें", onboardBody:"आश्रय दर्ज करें, पहले से योजना बनाएं और आधिकारिक अलर्ट का पालन करें।",
  next:"आगे", skip:"छोड़ें", chooseLanguage:"भाषा चुनें", continueLabel:"जारी रखें", sosTap:"आपातकालीन सहायता के लिए टैप करें", emergencyNumber:"आपातकाल", disasterHelpline:"आपदा हेल्पलाइन", ambulance:"एम्बुलेंस", fireService:"अग्निशमन", alertBannerBody:"जुड़ा नहीं है · कोई लाइव चेतावनी नहीं"
});
Object.assign(messages.or, {
  emergencySubtitle:"ନମ୍ବରରେ ଟ୍ୟାପ୍ କଲେ ଆପଣଙ୍କ ଡିଭାଇସ୍ ଡାଏଲର୍ ଖୋଲେ। ଏହି ଆପ୍ SOS ବାର୍ତ୍ତା ପଠାଏ ନାହିଁ କିମ୍ବା ଆପଣଙ୍କ ସ୍ଥାନ ସେୟାର୍ କରେ ନାହିଁ।",
  indiaNote:"ଏହି ନମ୍ବରଗୁଡ଼ିକ ଭାରତ ପାଇଁ। ଆପଣଙ୍କ ଜିଲ୍ଲାର କଣ୍ଟ୍ରୋଲ୍ ରୁମ୍ ନମ୍ବର ସ୍ଥାନୀୟ କର୍ତ୍ତୃପକ୍ଷଙ୍କଠାରୁ ନିଶ୍ଚିତ କରନ୍ତୁ।", noCall:"ଆପ୍ SOS ବାର୍ତ୍ତା ପଠାଏ ନାହିଁ କିମ୍ବା ସ୍ଥାନ ସେୟାର୍ କରେ ନାହିଁ।",
  quickActions:"ଦ୍ରୁତ କାର୍ଯ୍ୟ", findShelter:"ଆଶ୍ରୟସ୍ଥଳ ଖୋଜନ୍ତୁ", sosLabel:"SOS", tasksTitle:"ପ୍ରସ୍ତୁତି କାର୍ଯ୍ୟ", checklistTask:"ଜରୁରୀ କିଟ୍ ତାଲିକା", familyTask:"ପରିବାର ସୁରକ୍ଷା ଯୋଜନା", readinessTask:"ଘରର ପ୍ରସ୍ତୁତି",
  splashTagline:"ସୁରକ୍ଷିତ ସମାଜ · ଶକ୍ତିଶାଳୀ ଓଡ଼ିଶା · ଉନ୍ନତ ଆସନ୍ତାକାଲି", onboardTitle:"ପ୍ରସ୍ତୁତ ରୁହନ୍ତୁ, ସୁରକ୍ଷିତ ରୁହନ୍ତୁ", onboardBody:"ଆଶ୍ରୟସ୍ଥଳ ଲେଖନ୍ତୁ, ଆଗୁଆ ଯୋଜନା କରନ୍ତୁ ଏବଂ ସରକାରୀ ସତର୍କତା ଅନୁସରଣ କରନ୍ତୁ।",
  next:"ପରବର୍ତ୍ତୀ", skip:"ଛାଡ଼ନ୍ତୁ", chooseLanguage:"ଭାଷା ବାଛନ୍ତୁ", continueLabel:"ଜାରି ରଖନ୍ତୁ", sosTap:"ଜରୁରୀ ସହାୟତା ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ", emergencyNumber:"ଜରୁରୀକାଳୀନ", disasterHelpline:"ବିପର୍ଯ୍ୟୟ ହେଲ୍ପଲାଇନ୍", ambulance:"ଆମ୍ବୁଲାନ୍ସ", fireService:"ଅଗ୍ନିଶମ", alertBannerBody:"ସଂଯୁକ୍ତ ନାହିଁ · କୌଣସି ଲାଇଭ୍ ସତର୍କତା ନାହିଁ"
});
for (const code of Object.keys(PHASE1_MESSAGES)) Object.assign(messages[code], PHASE1_MESSAGES[code], PHASE2_MESSAGES[code], PHASE3_MESSAGES[code]);
const app = document.getElementById("appContent");
const sidebar = document.getElementById("sidebar");
const modal = document.getElementById("modalBackdrop");
let language = readStorage("language", "en");
if (!messages[language]) language = "en";
let currentPage = "overview";
let shelterSearchTerm = "";
let toastTimer;

function t(key) { return messages[language][key] || messages.en[key] || key; }
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    console.error("Could not read local app data.", error);
    showToast(t("storageError"));
    return fallback;
  }
}
function writeStorage(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Could not save local app data.", error);
    showToast(t("saveError"));
    return false;
  }
}
function getShelters() {
  const records = readStorage("shelters", []);
  return Array.isArray(records) ? records.filter((record) => record && typeof record === "object" && record.id) : [];
}
function getChecks(name) {
  const checks = readStorage(name, []);
  return Array.isArray(checks) ? checks.filter((item) => typeof item === "string") : [];
}
function setLanguage(next) {
  if (!messages[next]) return;
  language = next;
  writeStorage("language", language);
  document.documentElement.lang = language;
  document.getElementById("languageSelect").value = language;
  renderShellTranslations();
  renderPage();
}
function renderShellTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    node.textContent = t(key);
  });
  const globalSearch = document.getElementById("globalSearch");
  globalSearch.placeholder = t("search");
  globalSearch.setAttribute("aria-label", t("search"));
  const location = document.getElementById("locationInput");
  location.placeholder = t("location");
  location.setAttribute("aria-label", t("location"));
}
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}
function heading(title, subtitle, actions = "") {
  return `<div class="page-heading"><div><div class="eyebrow">AapadaLens · ${escapeHtml(t("odishaPilot"))}</div><h1>${escapeHtml(t(title))}</h1><p class="page-subtitle">${escapeHtml(t(subtitle))}</p></div><div class="heading-actions">${actions}</div></div>`;
}
function notice(textKey, emphasis = "") {
  return `<div class="notice-banner"><span aria-hidden="true">ⓘ</span><span>${emphasis ? `<strong>${escapeHtml(t(emphasis))}</strong> ` : ""}${escapeHtml(t(textKey))}</span></div>`;
}
function safeDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(language === "hi" ? "hi-IN" : language === "or" ? "or-IN" : "en-IN", { dateStyle: "medium" }).format(date);
}
function navButton(page, icon, key) {
  return `<button class="nav-link" data-nav="${page}"><span>${icon}</span><span>${escapeHtml(t(key))}</span></button>`;
}
function metric(label, value, note, icon) {
  return `<article class="card metric-card"><div class="metric-top"><span>${escapeHtml(t(label))}</span><span class="metric-icon">${icon}</span></div><div class="metric-value">${escapeHtml(String(value))}</div><div class="metric-foot">${escapeHtml(t(note))}</div></article>`;
}
function emptyState(title, text, action = "") {
  return `<div class="card empty-state"><strong>${escapeHtml(t(title))}</strong><span>${escapeHtml(t(text))}</span>${action}</div>`;
}
function formatCapacity(value) { return Number(value).toLocaleString(language === "hi" ? "hi-IN" : language === "or" ? "or-IN" : "en-IN"); }
function shelterCard(record) {
  const chips = SHELTER_FACILITIES.filter(([field]) => record.facilities?.includes(field))
    .map(([, label]) => `<span>${escapeHtml(t(label))}</span>`).join("");
  return `<article class="card shelter-card">
    <span class="shelter-symbol" aria-hidden="true">⌂</span>
    <div class="shelter-detail">
      <div class="alert-top"><h3>${escapeHtml(record.name)}</h3><span class="review-badge" title="${escapeHtml(t("reviewBadgeHelp"))}">${escapeHtml(t("needsReview"))}</span></div>
      <p>${escapeHtml(record.district)}${record.address ? ` · ${escapeHtml(record.address)}` : ""}</p>
      <div class="facility-pills"><span>${escapeHtml(t("recordedCapacity"))}: ${formatCapacity(record.capacity)}</span>${chips}</div>
      ${occupancyBar(record)}
      ${record.contact ? `<p><a class="button small" href="${telLink(record.contact)}" aria-label="Call ${escapeHtml(record.name)} at ${escapeHtml(record.contact)}">☎ ${escapeHtml(record.contact)}</a></p>` : ""}
      <small class="record-source">${escapeHtml(t("source"))}: ${escapeHtml(record.source)} · ${escapeHtml(t("updated"))} ${escapeHtml(safeDate(record.updatedAt))}</small>
    </div>
    <div class="record-actions"><button class="button small" data-p1="occupancy" data-id="${escapeHtml(record.id)}">${escapeHtml(t("updateOccupancy"))}</button><button class="button small" data-edit="${escapeHtml(record.id)}">${escapeHtml(t("edit"))}</button><button class="button small" data-delete="${escapeHtml(record.id)}">${escapeHtml(t("delete"))}</button></div>
  </article>`;
}
function filteredShelters() {
  const query = shelterSearchTerm.toLocaleLowerCase();
  const district = document.getElementById("locationInput").value.trim().toLocaleLowerCase();
  const filter = document.getElementById("facilityFilter")?.value || "";
  return getShelters().filter((record) => {
    const searchable = `${record.name} ${record.district} ${record.address || ""} ${record.source}`.toLocaleLowerCase();
    const queryMatch = !query || searchable.includes(query);
    const districtMatch = !district || `${record.district} ${record.address || ""}`.toLocaleLowerCase().includes(district);
    const facilityMatch = !filter || record.facilities?.includes(filter);
    return queryMatch && districtMatch && facilityMatch;
  }).sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
}
function renderShelterList(records, noRecordsText = "noRecords") {
  if (!records.length) {
    if (getShelters().length) return emptyState("noMatch", "changeFilters");
    return emptyState("noRecords", "noRecordsHelp", `<button class="button primary" data-action="add-shelter">＋ ${escapeHtml(t("addShelter"))}</button>`);
  }
  return `<div class="list-grid">${records.map(shelterCard).join("")}</div>`;
}
function renderOverview() {
  const records = getShelters();
  const capacity = records.reduce((sum, record) => sum + Number(record.capacity || 0), 0);
  const ready = getChecks("readiness").length;
  const recent = [...records].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))).slice(0, 3);
  return `${heading("overviewTitle", "overviewSubtitle", `<button class="button primary" data-action="add-shelter">＋ ${escapeHtml(t("addShelter"))}</button>`)}
    ${notice("localDataNotice", "deviceOnly")}
    <button class="alert-banner" data-nav="alerts"><span class="alert-banner-icon" aria-hidden="true">◉</span><span><strong>${escapeHtml(t("officialAlerts"))}</strong><small>${escapeHtml(t("alertBannerBody"))}</small></span><span aria-hidden="true">›</span></button>
    <h2 class="section-title">${escapeHtml(t("quickActions"))}</h2>
    <div class="quick-actions">
      <button data-nav="nearby"><span class="qa-icon qa-green">➤</span>${escapeHtml(t("navNearby"))}</button>
      <button data-nav="map"><span class="qa-icon qa-blue">◎</span>${escapeHtml(t("map"))}</button>
      <button data-nav="hazards"><span class="qa-icon qa-purple">⚠</span>${escapeHtml(t("navHazards"))}</button>
      <button data-nav="emergency"><span class="qa-icon qa-red">SOS</span>${escapeHtml(t("sosLabel"))}</button>
    </div>
    <div class="grid metrics-grid">${metric("totalShelters", records.length, "pendingReview", "⌂")}${metric("totalCapacity", formatCapacity(capacity), "sourceProvided", "▣")}${metric("availableSpaces", availableSpaces(records) === null ? "—" : formatCapacity(availableSpaces(records)), "availableNote", "◔")}${metric("shelterReadinessAvg", records.length ? `${Math.round(records.reduce((sum, record) => sum + recordedFacilityPercent(record), 0) / records.length)}%` : "—", "recordedOnly", "✓")}</div>
    <div class="grid dashboard-grid">
      <section class="card"><div class="card-heading"><div><h2>${escapeHtml(t("latestShelters"))}</h2><p>${escapeHtml(t("directorySubtitle"))}</p></div><button class="text-link" data-nav="shelters">${escapeHtml(t("viewAll"))} →</button></div>
        <div class="shelter-list">${recent.length ? recent.map(shelterCard).join("") : emptyState("noRecords", "noRecordsHelp")}</div></section>
      <div class="panel-stack">
        <section class="card alert-card"><div class="alert-top"><h2>${escapeHtml(t("officialAlerts"))}</h2><span class="severity">${escapeHtml(t("notConnected"))}</span></div><p>${escapeHtml(t("alertsNotConnected"))}</p><div class="source-note">${escapeHtml(t("alertsNote"))}</div><button class="text-link" data-nav="alerts">${escapeHtml(t("openAlerts"))} →</button></section>
        <section class="card page-card"><h2>${escapeHtml(t("readinessCard"))}</h2><p class="page-subtitle">${escapeHtml(t("checklistDisclaimer"))}</p><button class="button" data-nav="readiness">${escapeHtml(t("updateNow"))}</button></section>
      </div>
    </div>
    <section class="card page-card tasks-card"><h2>${escapeHtml(t("tasksTitle"))}</h2>${[["checklistTask", "kit", KIT_ITEMS, "kit"], ["familyTask", "family", FAMILY_ITEMS, "family"], ["readinessTask", "readiness", READINESS_ITEMS, "readiness"]].map(([label, page, items, store]) => {
      const percent = Math.round(getChecks(store).length / items.length * 100);
      return `<button class="task-link" data-nav="${page}"><span>${escapeHtml(t(label))}</span><strong>${percent}%</strong><span class="progress-track"><span class="progress-fill" style="width:${percent}%"></span></span></button>`;
    }).join("")}</section>
    <section class="card rollout-card"><h2>${escapeHtml(t("rolloutTitle"))}</h2><ol>
      <li>${escapeHtml(t("phaseOne"))}</li><li>${escapeHtml(t("phaseTwo"))}</li><li>${escapeHtml(t("phaseThree"))}</li>
    </ol><p class="page-subtitle">${escapeHtml(t("rolloutLimit"))}</p></section>`;
}
function renderShelters() {
  const facilities = SHELTER_FACILITIES.map(([field, label]) => `<option value="${field}">${escapeHtml(t(label))}</option>`).join("");
  return `${heading("directoryTitle", "directorySubtitle", `<button class="button primary" data-action="add-shelter">＋ ${escapeHtml(t("addShelter"))}</button>`)}
    <div class="notice-banner"><span aria-hidden="true">ⓘ</span><span><strong>${escapeHtml(t("needsReview"))}</strong> ${escapeHtml(t("reviewBadgeHelp"))} ${escapeHtml(t("sourceHelp"))}<br><a href="https://www.osdma.org/shelter-locations/" target="_blank" rel="noopener noreferrer">${escapeHtml(t("sourceLink"))}</a></span></div>
    <section class="card page-card"><div class="filter-row">
      <input id="shelterSearch" type="search" value="${escapeHtml(shelterSearchTerm)}" placeholder="${escapeHtml(t("search"))}" aria-label="${escapeHtml(t("search"))}">
      <select id="facilityFilter" aria-label="${escapeHtml(t("anyFacility"))}"><option value="">${escapeHtml(t("anyFacility"))}</option>${facilities}</select>
      <button class="button" data-action="clear-filters">${escapeHtml(t("clearFilters"))}</button>
    </div><div id="shelterResults">${renderShelterList(filteredShelters())}</div></section>`;
}
function checklistCard(title, subtitle, items, storeKey) {
  const selected = new Set(getChecks(storeKey));
  const percent = Math.round(selected.size / items.length * 100);
  return `<section class="card page-card"><div class="card-heading"><div><h2>${escapeHtml(t(title))}</h2><p>${escapeHtml(t(subtitle))}</p></div><strong>${selected.size}/${items.length}</strong></div>
    <div class="kit-progress"><span>${percent}%</span><div class="progress-track"><div class="progress-fill" style="width:${percent}%"></div></div></div>
    <div class="checklist">${items.map((key) => `<label class="check-row"><input type="checkbox" data-checklist="${storeKey}" value="${key}" ${selected.has(key) ? "checked" : ""}><span>${escapeHtml(t(key))}</span></label>`).join("")}</div></section>`;
}
function renderReadiness() {
  return `${heading("readinessTitle", "readinessSubtitle")}${notice("checklistDisclaimer")}
    <div class="grid readiness-layout">${checklistCard("readinessTitle", "privacyNote", READINESS_ITEMS, "readiness")}
    <section class="card page-card"><h2>${escapeHtml(t("readinessScore"))}</h2><p class="page-subtitle">${escapeHtml(t("checklistDisclaimer"))}</p></section></div>`;
}
function renderKit() {
  return `${heading("kitTitle", "kitSubtitle", `<button class="button" data-action="print">${escapeHtml(t("print"))}</button>`)}${notice("kitDisclaimer")}
    ${checklistCard("emergencyKit", "deviceOnly", KIT_ITEMS, "kit")}`;
}
function renderFamily() {
  return `${heading("familyTitle", "familySubtitle")}${notice("privacyNote")}${checklistCard("familyPlan", "privacyNote", FAMILY_ITEMS, "family")}`;
}
function renderSimulator() {
  const records = getShelters();
  const capacity = records.reduce((sum, record) => sum + Number(record.capacity || 0), 0);
  return `${heading("capacityTitle", "capacitySubtitle")}${notice("capacityDisclaimer")}
    <div class="grid simulator-layout"><section class="card page-card"><label class="field-label" for="scenarioInput">${escapeHtml(t("scenarioDemand"))}</label>
      <input class="form-control" id="scenarioInput" type="number" min="0" step="1" inputmode="numeric" placeholder="0">
      <p class="page-subtitle" style="margin-top:8px">${escapeHtml(t("capacityDisclaimer"))}</p>
      <div class="checklist">${records.map((record) => `<label class="check-row"><input type="checkbox" data-exclude="${escapeHtml(record.id)}"><span>${escapeHtml(t("closedShelters"))}: ${escapeHtml(record.name)}</span><small>${formatCapacity(record.capacity)}</small></label>`).join("") || `<p class="page-subtitle">${escapeHtml(t("noRecords"))}</p>`}</div>
    </section><section class="card page-card"><h2>${escapeHtml(t("capacityTitle"))}</h2><div class="result-box"><div class="result-row"><span>${escapeHtml(t("estimatedCapacity"))}</span><strong id="calcCapacity">${formatCapacity(capacity)}</strong></div>
      <div class="result-row"><span>${escapeHtml(t("projectedDemand"))}</span><strong id="calcDemand">—</strong></div>
      <div class="result-row"><span id="calcLabel">${escapeHtml(t("remaining"))}</span><strong id="calcResult">—</strong></div></div>${simBarsHtml()}<p class="page-subtitle" id="calcHint" style="margin-top:12px">${escapeHtml(t("enterDemand"))}</p></section></div>`;
}
function renderReports() {
  const records = getShelters(), capacity = records.reduce((sum, record) => sum + Number(record.capacity || 0), 0);
  return `${heading("reportsTitle", "reportsSubtitle")}${notice("allDataLocal")}
    <div class="grid metrics-grid">${metric("totalShelters", records.length, "sourceProvided", "⌂")}${metric("totalCapacity", formatCapacity(capacity), "sourceProvided", "▣")}${metric("sourceCount", records.length, "needsReview", "◔")}${metric("alertStatus", t("notConnected"), "alertsNotConnected", "◉")}</div>
    <section class="card page-card"><h2>${escapeHtml(t("reportsTitle"))}</h2><p class="page-subtitle">${escapeHtml(t("reportsSubtitle"))}</p>
      <button class="button primary" data-action="export-csv">${escapeHtml(t("exportCsv"))}</button></section>`;
}
function renderSettings() {
  return `${heading("settingsTitle", "settingsSubtitle")}${notice("privacyBody", "privacy")}
    <section class="card page-card">
      <div class="settings-row"><span><strong>${escapeHtml(t("language"))}</strong><small>English · ଓଡ଼ିଆ · हिन्दी</small></span><select id="settingsLanguage" class="form-control"><option value="en" ${language === "en" ? "selected" : ""}>English</option><option value="or" ${language === "or" ? "selected" : ""}>ଓଡ଼ିଆ</option><option value="hi" ${language === "hi" ? "selected" : ""}>हिन्दी</option></select></div>
      <div class="settings-row"><span><strong>${escapeHtml(t("appearance"))}</strong><small>${escapeHtml(t("deviceOnly"))}</small></span><button class="button" data-action="theme">${escapeHtml(document.body.classList.contains("light-theme") ? t("light") : t("dark"))}</button></div>
      <div class="settings-row"><span><strong>${escapeHtml(t("privacy"))}</strong><small>${escapeHtml(t("privacyBody"))}</small></span><span>✓</span></div>
      <div class="settings-row"><span><strong>${escapeHtml(t("clearData"))}</strong><small>${escapeHtml(t("allDataLocal"))}</small></span><button class="button danger" data-action="clear-data">${escapeHtml(t("delete"))}</button></div>
    </section>`;
}
function renderEmergency() {
  return `${heading("emergencyTitle", "emergencySubtitle")}${notice("immediateDanger", "emergencyHelp")}
    <a class="sos-button" href="tel:112"><strong>SOS</strong><span>${escapeHtml(t("sosTap"))}</span></a>
    <div class="emergency-numbers">${[["112", "emergencyNumber", "☎"], ["1077", "disasterHelpline", "◉"], ["108", "ambulance", "✚"], ["101", "fireService", "▲"]]
      .map(([number, label, icon]) => `<a class="number-card" href="tel:${number}"><span class="number-icon" aria-hidden="true">${icon}</span><strong>${number}</strong><small>${escapeHtml(t(label))}</small></a>`).join("")}</div>
    <p class="page-subtitle">${escapeHtml(t("indiaNote"))} ${escapeHtml(t("noCall"))}</p>`;
}
function renderIntro(step) {
  const intro = document.getElementById("intro");
  intro.hidden = false;
  intro.dataset.step = step;
  if (step === "splash") {
    intro.innerHTML = `<div class="intro-screen splash"><img class="intro-logo" src="aapadalens-logo.png" alt="AapadaLens"><p>${escapeHtml(t("splashTagline"))}</p></div>`;
  } else if (step === "splash-animation") {
    intro.innerHTML = `<div class="intro-screen splash"><div class="intro-animation" role="img" aria-label="Weather startup animation"></div></div>`;
  } else if (step === "onboarding") {
    intro.innerHTML = `<div class="intro-screen onboarding"><div class="intro-art" aria-hidden="true"><svg viewBox="0 0 300 190"><defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbd9a6"/><stop offset="1" stop-color="#9fd6f0"/></linearGradient></defs><rect width="300" height="190" rx="22" fill="url(#sky)"/><circle cx="215" cy="52" r="24" fill="#fff4cf"/><path d="M0 128c40-18 70 12 115-4s72-14 185 6v60H0z" fill="#3a9bd5"/><path d="M0 150c60-18 110 10 160-2s88-8 140 4v38H0z" fill="#1f6fae"/><circle cx="118" cy="98" r="10" fill="#14385c"/><circle cx="168" cy="100" r="9" fill="#14385c"/><path d="M104 112h28l5 42h-38zM156 114h24l4 40h-32z" fill="#e9a043"/></svg></div><h1>${escapeHtml(t("onboardTitle"))}</h1><p>${escapeHtml(t("onboardBody"))}</p><button class="intro-primary" data-intro="language">${escapeHtml(t("next"))}</button><button class="intro-skip" data-intro="language">${escapeHtml(t("skip"))}</button></div>`;
  } else {
    const options = [["en", "English", "Continue in English"], ["or", "ଓଡ଼ିଆ", "ଓଡ଼ିଆରେ ଜାରି ରଖନ୍ତୁ"], ["hi", "हिन्दी", "हिन्दी में जारी रखें"]];
    intro.innerHTML = `<div class="intro-screen language"><h1>${escapeHtml(t("chooseLanguage"))}</h1>${options.map(([code, name, hint]) => `<button class="language-card ${language === code ? "selected" : ""}" data-intro-language="${code}"><strong>${name}</strong><small>${hint}</small></button>`).join("")}<button class="intro-primary" data-intro="finish">${escapeHtml(t("continueLabel"))}</button></div>`;
  }
}
function finishIntro() {
  writeStorage("introSeen", true);
  document.getElementById("intro").hidden = true;
}
function startIntro() {
  const seen = readStorage("introSeen", false);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const showLogo = () => {
    renderIntro("splash");
    setTimeout(() => {
      if (seen) {
        const intro = document.getElementById("intro");
        intro.hidden = true;
        intro.innerHTML = "";
      } else renderIntro("onboarding");
    }, 1600);
  };
  if (reducedMotion || readStorage("prefs", {}).lowData) {
    showLogo();
    return;
  }
  if (!window.lottie) {
    console.warn("Startup animation player unavailable.");
    showLogo();
    return;
  }
  renderIntro("splash-animation");
  let animation;
  let finished = false;
  const finishAnimation = (failed) => {
    if (finished) return;
    finished = true;
    clearTimeout(timeout);
    if (failed) console.warn("Startup animation could not be played.");
    if (animation) animation.destroy();
    showLogo();
  };
  const timeout = setTimeout(() => finishAnimation(true), 15000);
  try {
    animation = window.lottie.loadAnimation({
      container: document.querySelector(".intro-animation"),
      renderer: "svg",
      loop: false,
      autoplay: true,
      path: "assets/startup/weather.json",
      assetsPath: "assets/startup/images/"
    });
    animation.addEventListener("complete", () => finishAnimation(false));
    animation.addEventListener("data_failed", () => finishAnimation(true));
    animation.addEventListener("error", () => finishAnimation(true));
  } catch (error) {
    finishAnimation(true);
  }
}
function renderPage() {
  const pages = {
    overview: renderOverview, map: renderMap, shelters: renderShelters, alerts: renderAlerts,
    assistant: renderGuide, readiness: renderReadiness, simulator: renderSimulator,
    kit: renderKit, family: renderFamily, reports: renderReports, settings: renderSettings,
    emergency: renderEmergency, nearby: renderNearby, hazards: renderHazards,
    assessment: renderAssessment, gaps: renderGaps, weather: renderWeather, translate: renderTranslate,
    compare: renderCompare, plan: renderPlan, triage: renderTriage, ...PHASE3_PAGES
  };
  app.innerHTML = (pages[currentPage] || renderOverview)();
  document.querySelectorAll("[data-nav]").forEach((button) => {
    const active = button.dataset.nav === currentPage;
    button.classList.toggle("active", active);
    if (active) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  if (currentPage === "simulator") updateCapacityCalculation();
  afterPageRender(currentPage);
}
function navigate(page) {
  stopSpeech();
  currentPage = page;
  sidebar.classList.remove("open");
  renderPage();
  app.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function openModal(title, html) {
  document.getElementById("modalContent").innerHTML = `<h2 id="modalTitle">${escapeHtml(title)}</h2>${html}`;
  modal.hidden = false;
  const initialFocus = modal.querySelector('#modalContent input:not([type="hidden"]):not([type="checkbox"]),#modalContent select,#modalContent textarea,#modalContent button');
  (initialFocus || modal.querySelector("#modalClose"))?.focus();
}
function closeModal() { modal.hidden = true; }
function openShelterForm(record = null) {
  const isEditing = Boolean(record);
  const facilities = SHELTER_FACILITIES.map(([field, key]) => `<label class="facility-choice"><input type="checkbox" name="facility" value="${field}" ${record?.facilities?.includes(field) ? "checked" : ""}><span>${escapeHtml(t(key))}</span></label>`).join("");
  openModal(isEditing ? t("editRecord") : t("addRecord"), `<form id="shelterForm" novalidate>
    <input type="hidden" name="recordId" value="${escapeHtml(record?.id || "")}">
    <div class="form-grid">
      <label class="field-group"><span>${escapeHtml(t("shelterName"))} *</span><input class="form-control" name="name" required maxlength="120" value="${escapeHtml(record?.name || "")}"></label>
      <label class="field-group"><span>${escapeHtml(t("district"))} *</span><input class="form-control" name="district" required maxlength="100" value="${escapeHtml(record?.district || "")}"></label>
      <label class="field-group full-field"><span>${escapeHtml(t("address"))}</span><input class="form-control" name="address" maxlength="240" value="${escapeHtml(record?.address || "")}"></label>
      <label class="field-group"><span>${escapeHtml(t("capacity"))} *</span><input class="form-control" name="capacity" type="number" min="0" max="1000000" step="1" required value="${record ? escapeHtml(record.capacity) : ""}"><small>${escapeHtml(t("capacityHelp"))}</small></label>
      <label class="field-group"><span>${escapeHtml(t("occupancyLabel"))}</span><input class="form-control" name="occupancy" type="number" min="0" step="1" inputmode="numeric" value="${hasOccupancy(record || {}) ? escapeHtml(record.occupancy) : ""}"><small>${escapeHtml(t("occupancyHelp"))}</small></label>
      <label class="field-group"><span>${escapeHtml(t("publicContact"))}</span><input class="form-control" name="contact" maxlength="80" value="${escapeHtml(record?.contact || "")}"></label>
      <fieldset class="field-group full-field"><legend>${escapeHtml(t("facilities"))}</legend><div class="facility-grid">${facilities}</div></fieldset>
      <label class="field-group full-field"><span>${escapeHtml(t("source"))} *</span><input class="form-control" name="source" required maxlength="300" value="${escapeHtml(record?.source || "")}"><small>${escapeHtml(t("sourceHelp"))}<br>${escapeHtml(t("sourceExample"))} <a href="https://www.osdma.org/shelter-locations/" target="_blank" rel="noopener noreferrer">${escapeHtml(t("sourceLink"))}</a></small></label>
      <fieldset class="field-group full-field"><legend>${escapeHtml(t("coordinates"))}</legend><div class="coordinate-grid">
        <label><span>${escapeHtml(t("latitude"))}</span><input class="form-control" name="latitude" type="number" min="-90" max="90" step="any" value="${escapeHtml(record?.latitude ?? "")}"></label>
        <label><span>${escapeHtml(t("longitude"))}</span><input class="form-control" name="longitude" type="number" min="-180" max="180" step="any" value="${escapeHtml(record?.longitude ?? "")}"></label>
      </div></fieldset>
      <label class="field-group full-field"><span>${escapeHtml(t("notes"))}</span><textarea class="form-control" name="notes" rows="2" maxlength="500">${escapeHtml(record?.notes || "")}</textarea></label>
    </div><div class="form-error" id="formError" role="alert"></div>
    <div class="modal-actions"><button type="button" class="button" data-action="close-modal">${escapeHtml(t("cancel"))}</button><button class="button primary" type="submit">${escapeHtml(t("saveRecord"))}</button></div>
  </form>`);
}
function validateShelter(form) {
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const district = String(data.get("district") || "").trim();
  const source = String(data.get("source") || "").trim();
  const capacityText = String(data.get("capacity") || "").trim();
  const capacity = Number(capacityText);
  const latitudeText = String(data.get("latitude") || "").trim();
  const longitudeText = String(data.get("longitude") || "").trim();
  const latitude = latitudeText === "" ? null : Number(latitudeText);
  const longitude = longitudeText === "" ? null : Number(longitudeText);
  const occupancy = parseOccupancy(data.get("occupancy"), capacity);
  let error = "";
  if (!name || !district) error = t("nameRequired");
  else if (!source) error = t("sourceRequired");
  else if (!/^\d+$/.test(capacityText) || !Number.isSafeInteger(capacity) || capacity < 0 || capacity > 1000000) error = t("capacityInvalid");
  else if ((latitudeText === "") !== (longitudeText === "") ||
    (latitude !== null && (!Number.isFinite(latitude) || latitude < -90 || latitude > 90)) ||
    (longitude !== null && (!Number.isFinite(longitude) || longitude < -180 || longitude > 180))) error = t("coordsInvalid");
  else if (occupancy.error) error = occupancy.error;
  if (error) { document.getElementById("formError").textContent = error; return null; }
  const previous = getShelters().find((item) => item.id === String(data.get("recordId")));
  return {
    id: String(data.get("recordId") || (globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`)),
    name, district, address: String(data.get("address") || "").trim(),
    capacity, occupancy: occupancy.value,
    occupancyUpdatedAt: occupancy.value === null ? null : (previous?.occupancy === occupancy.value && previous.occupancyUpdatedAt ? previous.occupancyUpdatedAt : new Date().toISOString()),
    contact: String(data.get("contact") || "").trim(),
    facilities: data.getAll("facility").map(String),
    source, latitude, longitude, notes: String(data.get("notes") || "").trim(),
    updatedAt: new Date().toISOString(), status: "needs-review"
  };
}
function saveShelterFromForm(form) {
  const record = validateShelter(form);
  if (!record) return;
  const records = getShelters();
  const index = records.findIndex((item) => item.id === record.id);
  if (index >= 0) records[index] = record;
  else records.push(record);
  if (!writeStorage("shelters", records)) return;
  closeModal();
  shelterSearchTerm = "";
  renderPage();
  showToast(t("recordSaved"));
}
function updateCapacityCalculation() {
  const input = document.getElementById("scenarioInput");
  if (!input) return;
  const excluded = new Set([...document.querySelectorAll("[data-exclude]:checked")].map((node) => node.dataset.exclude));
  const capacity = getShelters().filter((record) => !excluded.has(record.id)).reduce((sum, record) => sum + Number(record.capacity || 0), 0);
  document.getElementById("calcCapacity").textContent = formatCapacity(capacity);
  const demandText = input.value.trim();
  if (!demandText) {
    document.getElementById("calcDemand").textContent = "—";
    document.getElementById("calcResult").textContent = "—";
    document.getElementById("calcHint").textContent = t("enterDemand");
    updateSimBars(getShelters().reduce((sum, record) => sum + Number(record.capacity || 0), 0), capacity, null);
    return;
  }
  const demand = Number(demandText);
  if (!Number.isSafeInteger(demand) || demand < 0) {
    document.getElementById("calcHint").textContent = t("capacityInvalid");
    return;
  }
  const difference = capacity - demand;
  document.getElementById("calcDemand").textContent = formatCapacity(demand);
  document.getElementById("calcLabel").textContent = t(difference < 0 ? "shortfall" : "buffer");
  document.getElementById("calcResult").textContent = formatCapacity(Math.abs(difference));
  document.getElementById("calcHint").textContent = t("capacityDisclaimer");
  updateSimBars(getShelters().reduce((sum, record) => sum + Number(record.capacity || 0), 0), capacity, demand);
}
function downloadCsv() {
  const records = getShelters();
  if (!records.length) { showToast(t("exportUnavailable")); return; }
  const columns = ["name", "district", "address", "capacity", "occupancy", "occupancyUpdatedAt", "facilities", "source", "contact", "latitude", "longitude", "notes", "status", "updatedAt"];
  const csvEscape = (value) => {
    let text = String(value ?? "");
    if (/^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  };
  const rows = [columns.map(csvEscape).join(","), ...records.map((record) => columns.map((key) => csvEscape(Array.isArray(record[key]) ? record[key].join("; ") : record[key])).join(","))];
  const blob = new Blob(["\uFEFF" + rows.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = "aapadalens-shelter-records.csv";
  document.body.appendChild(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function clearLocalData() {
  if (!window.confirm(t("confirmClear"))) return;
  try {
    Object.keys(localStorage).filter((key) => key.startsWith(STORAGE_PREFIX)).forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    console.error("Could not clear local app data.", error);
    showToast(t("storageError"));
    return;
  }
  language = "en";
  document.body.classList.remove("light-theme");
  document.getElementById("languageSelect").value = "en";
  shelterSearchTerm = "";
  renderShellTranslations();
  renderPage();
  showToast(t("dataCleared"));
}

document.addEventListener("click", (event) => {
  const intro = event.target.closest("[data-intro]");
  if (intro) { if (intro.dataset.intro === "finish") finishIntro(); else renderIntro(intro.dataset.intro); return; }
  const introLanguage = event.target.closest("[data-intro-language]");
  if (introLanguage) { setLanguage(introLanguage.dataset.introLanguage); renderIntro("language"); return; }
  const nav = event.target.closest("[data-nav]");
  if (nav) { event.preventDefault(); navigate(nav.dataset.nav); return; }
  const add = event.target.closest('[data-action="add-shelter"]');
  if (add) { openShelterForm(); return; }
  const edit = event.target.closest("[data-edit]");
  if (edit) { openShelterForm(getShelters().find((record) => record.id === edit.dataset.edit)); return; }
  const remove = event.target.closest("[data-delete]");
  if (remove) {
    if (!window.confirm(t("confirmDelete"))) return;
    const remaining = getShelters().filter((record) => record.id !== remove.dataset.delete);
    if (writeStorage("shelters", remaining)) { renderPage(); showToast(t("recordDeleted")); }
    return;
  }
  const action = event.target.closest("[data-action]");
  if (!action) return;
  switch (action.dataset.action) {
    case "close-modal": closeModal(); break;
    case "clear-filters":
      shelterSearchTerm = "";
      document.getElementById("locationInput").value = "";
      renderPage();
      break;
    case "theme":
      document.body.classList.toggle("light-theme");
      writeStorage("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
      if (currentPage === "settings") renderPage();
      break;
    case "print": window.print(); break;
    case "export-csv": downloadCsv(); break;
    case "clear-data": clearLocalData(); break;
  }
});
document.addEventListener("change", (event) => {
  const input = event.target;
  if (input.matches("[data-checklist]")) {
    const current = new Set(getChecks(input.dataset.checklist));
    if (input.checked) current.add(input.value); else current.delete(input.value);
    if (writeStorage(input.dataset.checklist, [...current])) renderPage();
  }
  if (input.id === "languageSelect" || input.id === "settingsLanguage") setLanguage(input.value);
  if (input.id === "facilityFilter" || input.id === "locationInput") {
    const results = document.getElementById("shelterResults");
    if (results) results.innerHTML = renderShelterList(filteredShelters());
  }
  if (input.matches("[data-exclude]")) updateCapacityCalculation();
});
document.addEventListener("input", (event) => {
  if (event.target.id === "shelterSearch") {
    shelterSearchTerm = event.target.value;
    const results = document.getElementById("shelterResults");
    if (results) results.innerHTML = renderShelterList(filteredShelters());
  }
  if (event.target.id === "locationInput") {
    const results = document.getElementById("shelterResults");
    if (results) results.innerHTML = renderShelterList(filteredShelters());
  }
  if (event.target.id === "scenarioInput") updateCapacityCalculation();
});
document.addEventListener("submit", (event) => {
  if (event.target.id !== "shelterForm") return;
  event.preventDefault();
  saveShelterFromForm(event.target);
});
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  writeStorage("theme", document.body.classList.contains("light-theme") ? "light" : "dark");
  if (currentPage === "settings") renderPage();
});
document.getElementById("menuToggle").addEventListener("click", () => sidebar.classList.toggle("open"));
document.getElementById("moreToggle").addEventListener("click", () => {
  sidebar.classList.add("open");
  sidebar.querySelector(".settings-link").focus();
});
document.getElementById("modalClose").addEventListener("click", () => { modal.hidden = true; });
modal.addEventListener("click", (event) => { if (event.target === modal) modal.hidden = true; });
document.getElementById("globalSearch").addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  shelterSearchTerm = event.currentTarget.value.trim();
  if (event.shiftKey && shelterSearchTerm) { searchFromGlobal(shelterSearchTerm); return; }
  navigate("shelters");
  const input = document.getElementById("shelterSearch");
  input.value = shelterSearchTerm;
  input.dispatchEvent(new Event("input", { bubbles: true }));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { modal.hidden = true; sidebar.classList.remove("open"); }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault(); document.getElementById("globalSearch").focus();
  }
});
const theme = readStorage("theme", "dark");
if (theme === "light") document.body.classList.add("light-theme");
document.getElementById("languageSelect").value = language;
document.documentElement.lang = language;
renderShellTranslations();
renderPage();
startIntro();
loadAiStatus();
