// tests/15_edge_cases.hindi.js
// Testing edge cases: priority, nesting, protection

दिखाओ("🔍 Testing Phrase Priority...");

// 'नहीं तो' should be 'else', 'नहीं' should be '!'
नया x = 10;
नया y = 20;
नया res = "";

अगर (x बड़ा y) {
    res = "x बड़ा है";
} नहीं तो {
    res = "y बड़ा है";
}
बराबर_है(res, "y बड़ा है", "'नहीं तो' को 'else' होना चाहिए");

// 'नया बनाओ' should be 'new', 'नया' should be 'let'
नया सूची = नया बनाओ ऐरे(1, 2, 3);
सत्यापित_करो(सूची सत्यापित ऐरे, "'नया बनाओ' को 'new' होना चाहिए");

दिखाओ("🔍 Testing String/Regex Protection...");

// Keywords inside strings should NOT change
नया s = "अगर जबतक दिखाओ";
बराबर_है(s, "अगर जबतक दिखाओ", "Strings must be protected");

// Keywords inside regex should NOT change
नया r = /अगर|जबतक/; 
सत्यापित_करो(r.test("अगर"), "Regex must be protected");
सत्यापित_करो(r.test("जबतक"), "Regex must be protected");

दिखाओ("🔍 Testing Nested Template Literals...");

नया नाम = "हिंदी";
नया मैसेज = `स्वागत है ${नाम}, क्या आप ${10 > 5 ? `सचमुच ${नाम} में` : "नहीं"} कोड करना चाहते हैं?`;
सत्यापित_करो(मैसेज.शामिल("सचमुच हिंदी में"), "Nested templates with keywords inside must work");

दिखाओ("🔍 Testing Identifier Protection...");

// 'agar' in 'agarCount' should NOT change to 'ifCount'
नया agarCount = 5;
बराबर_है(agarCount, 5, "Identifiers containing keywords must be protected");

नया variable_नाम = "test";
बराबर_है(variable_नाम, "test", "Hindi characters in identifiers must work");

दिखाओ("🔍 Testing Multi-line Keywords...");
नया 
क 
= 10;
बराबर_है(क, 10, "Whitespace between keyword and variable should work");

दिखाओ("✅ Edge cases successful");
