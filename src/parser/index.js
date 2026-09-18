const { TOKEN_TYPES, createLocator, tokenizeSource } = require("../compiler/tokenizer");
const { sortedKeywords, keywordLookup } = require("../language/keywords");
const { createDiagnostic, DiagnosticSeverity } = require("../diagnostics");

function escapeForRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const keywordRegex = new RegExp(
    `(?<![\\u0900-\\u097F\\w$])(?:${sortedKeywords.map(escapeForRegex).join("|")})(?![\\u0900-\\u097F\\w$])`,
    "g"
);

// ── Keywords in name positions ────────────────────────────────────────────────
//
// `{ नया: 1 }` used to become `{ let: 1 }` and `अवस्था.गणित` became `अवस्था.Math`,
// so keys never matched the strings people compare them with. When a keyword sits
// where only a *name* can go (an object key, or after `.`) and its translation
// would make no sense as a name, it is left in Hindi. Words that real APIs use as
// names (`.catch`, `.finally`, `.delete`, `.length`, `{ get() {} }`) still translate.

const NEVER_A_NAME = new Set(
    ("let const var if else while do switch case break continue typeof instanceof void true false null " +
        "undefined this super class function new extends yield await async import export try debugger " +
        "static as in").split(" ")
);

function isUnsafeAsName(js) {
    if (!/^[A-Za-z_$][\w$]*$/.test(js)) return true; // operators (&&) and paths (console.log)
    if (NEVER_A_NAME.has(js)) return true;
    // Global constructors / namespaces (Map, Math, Error, JSON, URL) — but not
    // constants such as Number.EPSILON, Math.PI or NaN/Infinity.
    if (js === "JSON" || js === "URL") return true;
    return /^[A-Z]/.test(js) && /[a-z]/.test(js) && js !== "NaN" && js !== "Infinity";
}

const GLOBAL_OBJECT_BEFORE_DOT = /(?:globalThis|window|global|self|वैश्विक|विंडो|ग्लोबल)\s*\??\.$/;

function lastSignificantChar(text) {
    const trimmed = text.trimEnd();
    return trimmed ? trimmed[trimmed.length - 1] : "";
}

// Is the keyword at code[index, index + length) in a name-only position?
function isNamePosition(code, index, length, previousChar) {
    const before = code.slice(0, index).trimEnd();
    const prev = before ? before[before.length - 1] : previousChar;
    const next = code.slice(index + length).trimStart()[0];

    if ((prev === "{" || prev === ",") && next === ":") return true; // object key
    if (prev === "." && before[before.length - 2] !== "." && !GLOBAL_OBJECT_BEFORE_DOT.test(before)) return true; // obj.नाम / obj?.नाम
    return false;
}

// ── Translation as a list of edits ────────────────────────────────────────────
//
// Translation is recorded as edits { start, end, text, name } against the source so
// the same pass produces the output code and an exact source map.

function collectCodeEdits(code, offset, previousChar, edits) {
    for (const match of code.matchAll(keywordRegex)) {
        const js = keywordLookup[match[0]];
        if (!js) continue;
        if (isUnsafeAsName(js) && isNamePosition(code, match.index, match[0].length, previousChar)) continue;
        edits.push({ start: offset + match.index, end: offset + match.index + match[0].length, text: js, name: match[0] });
    }
}

// Returns the index just past a quoted string or template literal starting at `start`.
function skipLiteral(source, start) {
    const quote = source[start];
    let index = start + 1;

    while (index < source.length) {
        const char = source[index];

        if (char === "\\") {
            index += 2;
            continue;
        }

        if (char === quote) {
            return index + 1;
        }

        if (quote === "`" && char === "$" && source[index + 1] === "{") {
            index = findExpressionEnd(source, index + 2) + 1;
            continue;
        }

        index += 1;
    }

    return index;
}

// Given the index right after `${`, returns the index of its matching `}`.
function findExpressionEnd(source, start) {
    let depth = 0;
    let index = start;

    while (index < source.length) {
        const char = source[index];

        if (char === "'" || char === "\"" || char === "`") {
            index = skipLiteral(source, index);
            continue;
        }

        if (char === "{") {
            depth += 1;
        } else if (char === "}") {
            if (depth === 0) {
                return index;
            }
            depth -= 1;
        }

        index += 1;
    }

    return source.length;
}

function collectTemplateEdits(value, offset, edits) {
    let index = 0;

    while (index < value.length) {
        const char = value[index];

        if (char === "\\") {
            index += 2;
            continue;
        }

        if (char === "$" && value[index + 1] === "{") {
            const end = findExpressionEnd(value, index + 2);
            const expression = value.slice(index + 2, end);
            collectTokenEdits(tokenizeSource(expression), offset + index + 2, edits);
            index = end + 1;
            continue;
        }

        index += 1;
    }
}

function collectTokenEdits(tokens, offset, edits) {
    let previousChar = "";

    for (const token of tokens) {
        if (token.type === TOKEN_TYPES.CODE) {
            collectCodeEdits(token.value, offset + token.start, previousChar, edits);
            previousChar = lastSignificantChar(token.value) || previousChar;
        } else if (token.type === TOKEN_TYPES.TEMPLATE) {
            collectTemplateEdits(token.value, offset + token.start, edits);
            previousChar = "`";
        } else if (token.type !== TOKEN_TYPES.LINE_COMMENT && token.type !== TOKEN_TYPES.BLOCK_COMMENT) {
            previousChar = token.value[token.value.length - 1];
        }
    }

    return edits;
}

function applyEdits(source, edits) {
    let output = "";
    let position = 0;
    for (const edit of edits) {
        output += source.slice(position, edit.start) + edit.text;
        position = edit.end;
    }
    return output + source.slice(position);
}

function transformCodeSegment(code) {
    const edits = [];
    collectCodeEdits(code, 0, "", edits);
    return applyEdits(code, edits);
}

function transformTokens(tokens) {
    const source = tokens.map((token) => token.value).join("");
    const offset = tokens.length ? tokens[0].start : 0;
    return applyEdits(source, collectTokenEdits(tokens, -offset, []));
}

function createParseResult({ source, tokens, transformedCode, filename = null }) {
    return {
        source,
        tokens,
        transformedCode,
        ast: null,
        diagnostics: [],
        edits: [],
        strategy: "token-transform",
        meta: {
            filename,
            parserStage: "phase-one-token-transform",
        },
    };
}

// ── Diagnostics ───────────────────────────────────────────────────────────────

const RESERVED_WORDS = new Set(
    ("break case catch class const continue debugger default delete do else export extends false finally for " +
        "function if import in instanceof new null return super switch this throw true try typeof var void while " +
        "with yield let static await async of get set as from constructor undefined NaN Infinity").split(" ")
);

// A declaration such as `स्थिर जानकारी = 1` silently becomes `const console.info = 1`.
// Catch keywords used as declared names and explain the problem in Hindi and English.
const declarationRegex = new RegExp(
    `(?<![\\u0900-\\u097F\\w$])(?:नया|स्थिर|पुराना|कार्य\\*?|वर्ग|let|const|var|function\\*?|class)\\s+(${sortedKeywords.map(escapeForRegex).join("|")})(?![\\u0900-\\u097F\\w$])`,
    "g"
);

function findKeywordNames(tokens, source, filename) {
    const diagnostics = [];
    let locate = null;

    for (const token of tokens) {
        if (token.type !== TOKEN_TYPES.CODE) continue;

        for (const match of token.value.matchAll(declarationRegex)) {
            const name = match[1];
            const js = keywordLookup[name];
            if (js === "extends") continue; // anonymous `वर्ग विस्तार आधार {}` is valid
            const breaksSyntax = !/^[A-Za-z_$][\w$]*$/.test(js) || RESERVED_WORDS.has(js);
            locate = locate || createLocator(source);
            const index = token.start + match.index + match[0].lastIndexOf(name);

            diagnostics.push(
                createDiagnostic({
                    code: "HC_KEYWORD_AS_NAME",
                    severity: breaksSyntax ? DiagnosticSeverity.ERROR : DiagnosticSeverity.WARNING,
                    file: filename,
                    message: `'${name}' Hindicode कीवर्ड है (→ ${js}), इसे नाम के रूप में इस्तेमाल नहीं कर सकते / '${name}' is a Hindicode keyword for ${js} and cannot be used as a name.`,
                    start: locate(index),
                    end: locate(index + name.length),
                    hint: `कोई दूसरा नाम चुनें, जैसे '${name}_मान' / Rename it, e.g. '${name}_मान'.`,
                })
            );
        }
    }

    return diagnostics;
}

function parseSource({ source, tokens, filename = null }) {
    const edits = collectTokenEdits(tokens, 0, []);
    const result = createParseResult({
        source,
        tokens,
        transformedCode: applyEdits(source, edits),
        filename,
    });

    result.edits = edits;
    result.diagnostics.push(...findKeywordNames(tokens, source, filename));
    return result;
}

module.exports = {
    applyEdits,
    createParseResult,
    isUnsafeAsName,
    parseSource,
    transformCodeSegment,
    transformTokens,
};
