const fs = require("fs");
const Module = require("module");
const path = require("path");

const hindiToJS = {
    // ── Multi-word phrases FIRST (longest → shortest to avoid partial matches) ──
    "नहीं तो": "else",
    "के रूप में": "as",
    "का प्रकार": "typeof",
    "नया बनाओ": "new",
    "कम या बराबर": "<=",
    "ज्यादा या बराबर": ">=",
    "बराबर नहीं": "!==",

    // ── Control Flow ─────────────────────────────────
    "अगर": "if",
    "वरना": "else",
    "करो": "do",
    "जबतक": "while",
    "केलिए": "for",
    "स्विच": "switch",
    "मामला": "case",
    "रोकें": "break",
    "जारी": "continue",
    "लौटाओ": "return",
    "फेंको": "throw",

    // ── Declarations ─────────────────────────────────
    "नया": "let",
    "स्थिर": "const",
    "पुराना": "var",
    "कार्य": "function",
    "वर्ग": "class",

    // ── Async ─────────────────────────────────────────
    "असिंक": "async",
    "इंतज़ार": "await",

    // ── Literals ─────────────────────────────────────
    "सच": "true",
    "झूठ": "false",
    "खाली": "null",
    "अपरिभाषित": "undefined",

    // ── OOP ──────────────────────────────────────────
    "विस्तार": "extends",
    "सुपर": "super",
    "यह": "this",
    "हटाओ": "delete",
    "प्रोटो": "prototype",
    "में": "in",
    "सत्यापित": "instanceof",
    "वापसी": "yield",

    // ── Modules ──────────────────────────────────────
    "आयात": "import",
    "निर्यात": "export",
    "डिफ़ॉल्ट": "default",
    "से": "from",
    "मांगो": "require",
    "मॉड्यूल": "module",

    // ── Operators ────────────────────────────────────
    "और": "&&",
    "या": "||",
    "नहीं": "!",
    "बराबर": "===",
    "छोटा": "<",
    "बड़ा": ">",

    // ── Error Handling ────────────────────────────────
    "कोशिश": "try",
    "पकड़ो": "catch",
    "पकड़": "catch",
    "अंततः": "finally",
    "त्रुटि": "Error",

    // ── Console ──────────────────────────────────────
    "दिखाओ": "console.log",
    "गलती": "console.error",
    "चेतावनी": "console.warn",
    "जानकारी": "console.info",
    "कंसोल": "console",

    // ── Array Methods ────────────────────────────────
    "पुश": "push",
    "पॉप": "pop",
    "शिफ्ट": "shift",
    "अनशिफ्ट": "unshift",
    "स्लाइस": "slice",
    "जोड़ो": "concat",
    "शामिल": "includes",
    "ढूँढो": "find",
    "मानचित्र": "map",
    "फ़िल्टर": "filter",
    "कमकरो": "reduce",
    "हरएक": "forEach",
    "लंबाई": "length",
    "इंडेक्स": "indexOf",
    "उलटाओ": "reverse",
    "क्रमित": "sort",

    // ── Object Methods ────────────────────────────────
    "कुंजियाँ": "keys",
    "मूल्य": "values",
    "प्रविष्टियाँ": "entries",
    "बनाएँ": "create",
    "मिलाओ": "assign",
    "जमाओ": "freeze",

    // ── Map / Set ─────────────────────────────────────
    "नक्शा": "Map",
    "है": "has",
    "प्राप्त": "get",
    "रखो": "set",
    "साफ़": "clear",
    "आकार": "size",

    // ── Promise ───────────────────────────────────────
    "फिर": "then",
    "सभी": "all",
    "हल": "resolve",
    "अस्वीकार": "reject",
    "प्रॉमिस": "Promise",

    // ── Browser APIs ──────────────────────────────────
    "विंडो": "window",
    "दस्तावेज": "document",
    "ब्राउज़र": "navigator",
    "स्थान": "location",
    "इतिहास": "history",
    "संग्रह": "localStorage",
    "सत्र_संग्रह": "sessionStorage",
    "चेतावनी_डिब्बा": "alert",
    "पूछो": "prompt",
    "पक्का_करो": "confirm",
    "लाओ": "fetch",
    "समय_बाद": "setTimeout",
    "बार_बार": "setInterval",
    "समय_रोकें": "clearTimeout",
    "बार_रोकें": "clearInterval",

    // ── Node.js ───────────────────────────────────────
    "प्रक्रिया": "process",
    "__नाम": "__filename",
    "__डायरेक्टरी": "__dirname",
    "बफर": "Buffer",

    // ── Built-ins ─────────────────────────────────────
    "ऑब्जेक्ट": "Object",
    "ऐरे": "Array",
    "टेक्स्ट": "String",
    "नंबर": "Number",
    "बूलियन": "Boolean",
    "तारीख": "Date",
    "गणित": "Math",
    "जेसन": "JSON",
    "रेगएक्स": "RegExp",
    "अनंत": "Infinity",

    // ── Math Shortcuts ────────────────────────────────
    "गोलाई": "Math.round",
    "ऊपर": "Math.ceil",
    "नीचे": "Math.floor",
    "अधिकतम": "Math.max",
    "न्यूनतम": "Math.min",
    "यादृच्छ": "Math.random",
    "वर्गमूल": "Math.sqrt",
    "पाई": "Math.PI",

    // ── JSON Shortcuts ────────────────────────────────
    "पार्स": "JSON.parse",
    "तार_बनाओ": "JSON.stringify",

    // ── String Methods ────────────────────────────────
    "बड़े_अक्षर": "toUpperCase",
    "छोटे_अक्षर": "toLowerCase",
    "काटो": "trim",
    "विभाजन": "split",
    "बदलो": "replace",
    "खोजो": "search",
    "शुरू_से": "startsWith",
    "खत्म_से": "endsWith",
    "दोहराओ": "repeat",
    "हिस्सा": "substring",
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
    } catch (error) {
        console.error("❌ Hindi Transpiler Error:", error);
    }
};

module.exports = { translateHindiJS };
