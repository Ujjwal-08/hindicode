const fs = require("fs");
const Module = require("module");
const path = require("path");
const hindiToJS = {
    "अगर": "if",
    "अन्यथा": "else",
    "दिखाओ": "console.log",
    "कार्य": "function",
    "लौटाओ": "return",
    "चलाओ": "for",
    "जबतक": "while",
    "नया": "let",
    "स्थिर": "const",
    "परिभाषा": "var",
    "सही": "true",
    "गलत": "false",
    "शून्य": "null",
    "प्रयास": "try",
    "पकड़ो": "catch",
    "अंततः": "finally",
    "फेंको": "throw",
    "वर्ग": "class",
    "विस्तार": "extends",
    "सुपर": "super",
    "वापसी": "yield",
    "प्रतीक्षा": "await",
    "आयात": "import",
    "निर्यात": "export",
    "डिफ़ॉल्ट": "default",
    "केस": "case",
    "ब्रेक": "break",
    "जारी": "continue",
    "स्विच": "switch",
    "केलिए": "for",
    "प्रत्येक": "forEach",
    "मानचित्र": "map",
    "फ़िल्टर": "filter",
    "कम करना": "reduce",
    "शामिल": "includes",
    "इंडेक्स": "indexOf",
    "पुश": "push",
    "पॉप": "pop",
    "शिफ्ट": "shift",
    "अनशिफ्ट": "unshift",
    "splice": "splice",
    "concat": "concat",
    "स्लाइस": "slice",
    "लंबाई": "length",
    "प्रकार": "typeof",
    "उदाहरण": "instanceof",
    "में": "in",
    "नयाउदाहरण": "new",
    "हटाना": "delete",
    "शून्य करना": "void",
    "साथ": "with",
    "डीबग": "debugger",
    "लेबल": "label",
    "कोशिश": "try",
    "ये": "this",
    "प्रोटो": "prototype",
    "कॉल": "call",
    "लागू": "apply",
    "बाध्य": "bind",
    "अर्जुन": "arguments",
    "बनाएँ": "create",
    "कुंजी": "key",
    "मूल्य": "value",
    "प्रविष्टि": "entry",
    "सेट": "set",
    "प्राप्त": "get",
    "है": "has",
    "साफ़": "clear",
    "आकार": "size",
    "फिर": "then",
    "पकड़": "catch",
    "अंत में": "finally",
    "सभी": "all",
    "रेस": "race",
    "हल": "resolve",
    "अस्वीकार": "reject",
    "से": "from",
    "एक": "as",
    "नम": "name",
    "भेजें": "send",
    "प्राप्त": "receive",
    "कनेक्ट": "connect",
    "सुनो": "listen",
    "सर्वर": "server",
    "ग्राहक": "client",
    "अनंत": "Infinity",
    "NaN": "NaN",
    "कोड": "code",
    "संदेश": "message",
};
// // Hindi to JavaScript keyword mapping
// const hindiToJS = {
//     "अगर": "if",
//     "अन्यथा": "else",
//     "दिखाओ": "console.log",
//     "कार्य": "function",
//     "लौटाओ": "return",
//     "चलाओ": "for",
//     "जबतक": "while",
//     "नया": "let",
//     "स्थिर": "const",
//     "परिभाषा": "var"
// };
function translateHindiJS(code) {
    // स्ट्रिंग्स को प्रोटेक्ट करने के लिए, पहले उन्हें अलग कर लें
    let stringLiterals = [];
    code = code.replace(/(["'`])((?:\\\1|.)*?)\1/g, (match) => {
        stringLiterals.push(match); // स्ट्रिंग सेव कर लो
        return `___STR${stringLiterals.length - 1}___`; // प्लेसहोल्डर डाल दो
    });

    // अब सिर्फ जावास्क्रिप्ट केवर्ड्स को ही ट्रांसलेट करो
    Object.entries(hindiToJS).forEach(([hindi, js]) => {
        if (hindi === "नाम") {
            // ✅ 'this.नाम' और 'let नाम' को नहीं बदलना
            code = code.replace(/([^.\w])नाम([^.\w])/g, `$1name$2`);
        }  else {
            const regex = new RegExp(`(?<![\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w])${hindi}(?![\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w])`, "g");
            code = code.replace(regex, js);
        }
    });

    // अब स्ट्रिंग्स को वापस लाओ
    code = code.replace(/___STR(\d+)___/g, (_, index) => stringLiterals[parseInt(index)]);
console.log(code);
    return code;
}


// Custom require hook for `.hindi.js` files
require.extensions[".hindi.js"] = function (module, filename) {
    try {
        let content = fs.readFileSync(filename, "utf8").trim();
      

        // Translate Hindi to JavaScript
        content = translateHindiJS(content); // Assign the returned value back to 'content'
     

        // Run translated JavaScript code
        module._compile(content, filename);
    } catch (error) {
        console.error("❌ Hindi Transpiler Error:", error);
    }
};
