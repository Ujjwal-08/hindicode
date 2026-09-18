// Hindi-friendly error reporting: translated messages, "did you mean" keyword
// suggestions, and code frames pointing at the original .hindi.js source.
const { hindiToJS } = require("../language/keywords");

// First Hindi alias for each JavaScript name (for Error → त्रुटि, length → लंबाई).
const jsToHindi = new Map();
for (const [hindi, js] of Object.entries(hindiToJS)) {
    if (!jsToHindi.has(js) && !hindi.includes(" ")) jsToHindi.set(js, hindi);
}
const hindiName = (js) => jsToHindi.get(js);
const withHindi = (js) => (hindiName(js) ? `'${hindiName(js)}' (${js})` : `'${js}'`);

const MESSAGE_RULES = [
    [/^(.+) is not defined$/, (m) => `${withHindi(m[1])} परिभाषित नहीं है`],
    [/^(.+) is not a function$/, (m) => `${withHindi(m[1])} फ़ंक्शन नहीं है, इसे बुलाया नहीं जा सकता`],
    [/^(.+) is not a constructor$/, (m) => `${withHindi(m[1])} से 'नया बनाओ' नहीं किया जा सकता`],
    [/^(.+) is not iterable/, (m) => `${m[1]} पर 'में से' लूप नहीं चल सकता (यह इटरेबल नहीं है)`],
    [/^Cannot read properties of (undefined|null) \(reading '(.+)'\)$/, (m) =>
        `${m[1] === "null" ? "खाली (null)" : "अपरिभाषित (undefined)"} का गुण ${withHindi(m[2])} नहीं पढ़ सकते`],
    [/^Cannot set properties of (undefined|null) \(setting '(.+)'\)$/, (m) =>
        `${m[1] === "null" ? "खाली (null)" : "अपरिभाषित (undefined)"} पर गुण ${withHindi(m[2])} नहीं रख सकते`],
    [/^Cannot access '(.+)' before initialization$/, (m) => `'${m[1]}' को घोषणा से पहले इस्तेमाल नहीं कर सकते`],
    [/^Assignment to constant variable\.$/, () => "स्थिर चर को दोबारा मान नहीं दिया जा सकता — 'नया' इस्तेमाल करें"],
    [/^Identifier '(.+)' has already been declared$/, (m) => `'${m[1]}' पहले से घोषित है`],
    [/^Missing initializer in const declaration$/, () => "'स्थिर' को घोषणा के समय ही मान देना ज़रूरी है"],
    [/^Unexpected identifier '(.+)'$/, (m) => `अनपेक्षित नाम '${m[1]}' — शायद इससे पहले कोई कीवर्ड गलत लिखा है`],
    [/^Unexpected identifier$/, () => "अनपेक्षित नाम — शायद कोई कीवर्ड गलत लिखा है"],
    [/^Unexpected token '(.+)'$/, (m) => `अनपेक्षित चिह्न '${m[1]}'`],
    [/^Unexpected end of input$/, () => "कोड अधूरा है — कोई '}' या ')' छूट गया है"],
    [/^Unexpected string$/, () => "अनपेक्षित टेक्स्ट — शायद कोई ',' या '+' छूट गया है"],
    [/^Unexpected number$/, () => "अनपेक्षित संख्या — शायद कोई ऑपरेटर या ',' छूट गया है"],
    [/^Invalid or unexpected token$/, () => "अमान्य चिह्न — कोई उद्धरण चिह्न (\" या ') बंद नहीं हुआ?"],
    [/^missing \) after argument list$/, () => "तर्क सूची के बाद ')' छूट गया है"],
    [/^Unexpected reserved word$/, () => "आरक्षित शब्द यहाँ नहीं आ सकता — 'इंतज़ार' केवल 'असिंक' फ़ंक्शन में?"],
    [/^await is only valid in async functions/, () => "'इंतज़ार' केवल 'असिंक' फ़ंक्शन (या ES मॉड्यूल) में इस्तेमाल हो सकता है"],
    [/^Illegal return statement$/, () => "'लौटाओ' केवल फ़ंक्शन के अंदर इस्तेमाल हो सकता है"],
    [/^Illegal break statement$/, () => "'रोकें' केवल लूप या स्विच के अंदर"],
    [/^Maximum call stack size exceeded$/, () => "कॉल स्टैक भर गया — शायद अनंत रिकर्शन है (फ़ंक्शन खुद को बिना रुके बुला रहा है)"],
    [/^Invalid array length$/, () => "अमान्य ऐरे लंबाई"],
    [/is not valid JSON|^Unexpected token .* in JSON|^Unexpected end of JSON input$/, () => "अमान्य JSON — पार्स नहीं हो सका"],
    [/^Class constructor (.+) cannot be invoked without 'new'$/, (m) => `वर्ग '${m[1]}' को 'नया बनाओ' के साथ बुलाएँ`],
    [/^Converting circular structure to JSON/, () => "चक्रीय वस्तु को JSON में नहीं बदला जा सकता"],
    [/^Do not know how to serialize a BigInt$/, () => "बड़ा_पूर्णांक (BigInt) को सीधे JSON में नहीं बदला जा सकता"],
];

function translateMessage(message) {
    for (const [pattern, render] of MESSAGE_RULES) {
        const match = String(message).match(pattern);
        if (match) return render(match);
    }
    return null;
}

function hindiErrorName(name) {
    const hindi = hindiName(name);
    return hindi ? `${hindi} (${name})` : name;
}

// ── "Did you mean" ──

function editDistance(a, b, limit) {
    if (Math.abs(a.length - b.length) > limit) return limit + 1;
    let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
        const current = [i];
        let rowMin = i;
        for (let j = 1; j <= b.length; j++) {
            current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
            rowMin = Math.min(rowMin, current[j]);
        }
        if (rowMin > limit) return limit + 1;
        previous = current;
    }
    return previous[b.length];
}

// Typing Hindi, people most often get a vowel sign (मात्रा), nukta or halant
// wrong while the consonants are right: लौटओ → लौटाओ, गणीत → गणित. So a word is
// a likely typo of a keyword when both have the same consonant "skeleton".
// Plain edit distance would also match real words (सम/सच, वर्ष/वर्ग).
const skeleton = (word) => word.normalize("NFC").replace(/[\u0900-\u0903\u093A-\u094F\u0955-\u0957\u0962\u0963]/g, "");

const KEYWORDS_BY_SKELETON = new Map();
for (const keyword of Object.keys(hindiToJS)) {
    if (keyword.includes(" ")) continue;
    const key = skeleton(keyword);
    if (!KEYWORDS_BY_SKELETON.has(key)) KEYWORDS_BY_SKELETON.set(key, []);
    KEYWORDS_BY_SKELETON.get(key).push(keyword);
}

// Closest keyword to a (probably misspelled) Devanagari word, or null. Static
// checks pass minConsonants: 3, because short real words (कार, खुला) share
// consonants with short keywords (करो, खाली).
function suggestKeyword(word, { minConsonants = 2 } = {}) {
    if (!/[\u0900-\u097F]/.test(word) || hindiToJS[word]) return null;
    const candidates = KEYWORDS_BY_SKELETON.get(skeleton(word));
    if (!candidates || skeleton(word).length < minConsonants) return null;
    let best = null;
    let bestDistance = Infinity;
    for (const keyword of candidates) {
        const distance = editDistance(word, keyword, 4);
        if (distance > 0 && distance < bestDistance) {
            best = keyword;
            bestDistance = distance;
        }
    }
    return bestDistance <= 3 ? best : null;
}

// ── Code frames ──

function codeFrame(source, line, column, { context = 1 } = {}) {
    const lines = String(source).split(/\r?\n/);
    if (!line || line > lines.length) return "";
    const first = Math.max(1, line - context);
    const last = Math.min(lines.length, line + context);
    const width = String(last).length;
    const out = [];
    for (let n = first; n <= last; n++) {
        if (n > line && !lines[n - 1].trim()) break; // no trailing blank context
        out.push(`${n === line ? ">" : " "} ${String(n).padStart(width)} | ${lines[n - 1]}`);
        if (n === line && column) {
            const prefix = lines[n - 1].slice(0, column - 1).replace(/[^\t]/g, " ");
            out.push(`  ${" ".repeat(width)} | ${prefix}^`);
        }
    }
    return out.join("\n");
}

// ── Runtime errors ──

const HINDI_FRAME = /(?:\(|at )((?:file:\/\/\/?)?[^()\s]*?\.hindi\.js):(\d+):(\d+)\)?/;

function locateInHindiSource(error) {
    const match = String(error && error.stack).match(HINDI_FRAME);
    if (!match) return null;
    let file = match[1];
    if (file.startsWith("file:")) {
        try {
            file = require("url").fileURLToPath(file);
        } catch {
            return null;
        }
    }
    return { file, line: Number(match[2]), column: Number(match[3]) };
}

function formatRuntimeError(error, { readFile } = {}) {
    if (!(error instanceof Error)) return `❌ फेंका गया मान / Thrown value: ${String(error)}`;

    const lines = [];
    const translated = translateMessage(error.message);
    lines.push(`❌ ${hindiErrorName(error.name)}: ${translated || error.message}`);
    if (translated) lines.push(`   ${error.message}`);

    const missing = error.message.match(/^(.+) is not defined$/);
    const suggestion = missing && suggestKeyword(missing[1]);
    if (suggestion) lines.push(`   💡 क्या आपका मतलब '${suggestion}' था? / Did you mean '${suggestion}' (${hindiToJS[suggestion]})?`);

    const location = locateInHindiSource(error);
    if (location) {
        lines.push(`   → ${location.file}:${location.line}:${location.column}`);
        try {
            const source = (readFile || ((file) => require("fs").readFileSync(file, "utf8")))(location.file);
            lines.push(codeFrame(source, location.line, location.column));
        } catch {
            // file not readable: the location line is enough
        }
    }

    const stack = String(error.stack || "")
        .split("\n")
        .filter((line) => /^\s+at /.test(line) && !/\(?node:|hindicode[\\/](?:src|bin)[\\/]/.test(line));
    if (stack.length) lines.push("", ...stack);
    if (error.cause) lines.push(`   कारण / cause: ${error.cause instanceof Error ? `${error.cause.name}: ${error.cause.message}` : String(error.cause)}`);
    return lines.join("\n");
}

module.exports = {
    codeFrame,
    formatRuntimeError,
    hindiErrorName,
    suggestKeyword,
    translateMessage,
};
