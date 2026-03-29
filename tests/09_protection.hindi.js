// 09_protection.hindi.js - Strings, comments, regex are NOT translated

// यह एक comment है जिसमें हिंदी keywords हैं: अगर जबतक दिखाओ
/*
  Multi-line comment:
  स्थिर नया वर्ग कार्य
  इनको नहीं बदलना चाहिए!
*/

// Strings should NOT be translated
नया message = "इस string में 'अगर' और 'दिखाओ' हैं";
दिखाओ(message);

// Regex should NOT be translated
नया pattern = /अगर|दिखाओ/g;
नया matches = "अगर तुम दिखाओ".match(pattern);
दिखाओ("Regex matches:", matches); // Should find ['अगर', 'दिखाओ']

// Template literal — the ${} INSIDE should be translated, text outside should NOT
स्थिर संख्या = 42;
दिखाओ(`यह संख्या है: ${संख्या}`);

// Nested template literal
स्थिर नाम = "विकास";
दिखाओ(`नमस्ते ${नाम}, तुम्हारा स्कोर ${100 > 90 ? "उत्तम" : "साधारण"} है`);
