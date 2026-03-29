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
    "असांयकालिक": "async",
    "त्रुटि": "Error",
};

function translateHindiJS(code) {
    const sortedKeywords = Object.keys(hindiToJS).sort((a, b) => b.length - a.length);

    const parts = [
        /(?<BLOCK>\/\*[\s\S]*?\*\/)/.source,
        /(?<LINE>\/\/.*)/.source,
        /(?<STRING_DBL>"(?:[^"\\]|\\.)*")/.source,
        /(?<STRING_SGL>'(?:[^'\\]|\\.)*')/.source,
        /(?<BACKTICK>`[\s\S]*?`)/.source,
        /(?<REGEX>\/(?![*\/])(?:[^\/\\\n]|\\.)*?\/[gimuy]*)/.source,
        `(?<KEYWORD>(?<![\\u0900-\\u097F])(?:${sortedKeywords.join("|")})(?![\\u0900-\\u097F]))`
    ];

    const masterRegex = new RegExp(parts.join("|"), "g");

    return code.replace(masterRegex, (...args) => {
        const groups = args[args.length - 1];
        const { BACKTICK, KEYWORD } = groups;

        if (KEYWORD && hindiToJS[KEYWORD]) {
            return hindiToJS[KEYWORD];
        }

        if (BACKTICK) {
            return BACKTICK.replace(/\${([\s\S]*?)}/g, (m, inner) => {
                return `${"$"}{${translateHindiJS(inner)}}`;
            });
        }

        return args[0];
    });
}

// Custom require hook for `.hindi.js` files
require.extensions[".hindi.js"] = function (module, filename) {
    try {
        let content = fs.readFileSync(filename, "utf8").trim();
        content = translateHindiJS(content);
        module._compile(content, filename);
     

        // Run translated JavaScript code
        module._compile(content, filename);
    } catch (error) {
        console.error("❌ Hindi Transpiler Error:", error);
    }
};

module.exports = { translateHindiJS };
