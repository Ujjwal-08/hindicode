// tests/17_control_modules_advanced.hindi.js
// Production-style control flow and language feature coverage

दिखाओ("🧭 Testing switch/default/delete/in/typeof...");

नया सेवा = { नाम: "hindicode", स्तर: "production", token: "secret" };
सत्यापित_करो("नाम" में सेवा, "'in' ऑपरेटर काम करना चाहिए");

हटाओ सेवा.token;
बराबर_है(का प्रकार (सेवा.token), "undefined", "'delete' और 'typeof' काम करने चाहिए");

नया लेबल = "";
स्विच (सेवा.स्तर) {
    मामला "production":
        लेबल = "तैयार";
        रोकें;
    डिफॉल्ट:
        लेबल = "जाँच";
}

बराबर_है(लेबल, "तैयार", "switch/default alias काम करना चाहिए");

दिखाओ("🌱 Testing generators...");

कार्य* क्रम() {
    वापसी 10;
    वापसी 20;
    वापसी 30;
}

नया iterator = क्रम();
बराबर_है(iterator.next().value, 10);
बराबर_है(iterator.next().value, 20);
बराबर_है(iterator.next().value, 30);
बराबर_है(iterator.next().done, सच);

दिखाओ("🧱 Testing prototype + freeze...");

कार्य उपयोगकर्ता(नाम) {
    यह.नाम = नाम;
}

उपयोगकर्ता.प्रोटो.परिचय = कार्य() {
    लौटाओ `${this.नाम} सक्रिय है`;
};

स्थिर सेटिंग्स = ऑब्जेक्ट.जमाओ({ mode: "production" });
नया व्यक्ति = नया बनाओ उपयोगकर्ता("आर्या");

बराबर_है(व्यक्ति.परिचय(), "आर्या सक्रिय है");
सत्यापित_करो(ऑब्जेक्ट.isFrozen(सेटिंग्स), "Object.freeze काम करना चाहिए");
