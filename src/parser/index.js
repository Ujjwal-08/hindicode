const { TOKEN_TYPES, createLocator } = require("../compiler/tokenizer");
const { sortedKeywords, keywordLookup } = require("../language/keywords");
const { createDiagnostic, DiagnosticSeverity } = require("../diagnostics");

function escapeForRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const keywordRegex = new RegExp(
    `(?<![\\u0900-\\u097F\\w$])(?:${sortedKeywords.map(escapeForRegex).join("|")})(?![\\u0900-\\u097F\\w$])`,
    "g"
);

function transformCodeSegment(code) {
    return code.replace(keywordRegex, (match) => keywordLookup[match] || match);
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

function transformTemplate(value, recursiveTransform) {
    let result = "";
    let index = 0;

    while (index < value.length) {
        const char = value[index];

        if (char === "\\") {
            result += value.slice(index, index + 2);
            index += 2;
            continue;
        }

        if (char === "$" && value[index + 1] === "{") {
            const end = findExpressionEnd(value, index + 2);
            const expression = value.slice(index + 2, end);
            result += `${"$"}{${recursiveTransform(expression)}`;
            if (end < value.length) {
                result += "}";
            }
            index = end + 1;
            continue;
        }

        result += char;
        index += 1;
    }

    return result;
}

function transformTokens(tokens, recursiveTransform) {
    return tokens
        .map((token) => {
            if (token.type === TOKEN_TYPES.CODE) {
                return transformCodeSegment(token.value);
            }

            if (token.type === TOKEN_TYPES.TEMPLATE) {
                return transformTemplate(token.value, recursiveTransform);
            }

            return token.value;
        })
        .join("");
}

function createParseResult({ source, tokens, transformedCode, filename = null }) {
    return {
        source,
        tokens,
        transformedCode,
        ast: null,
        diagnostics: [],
        strategy: "token-transform",
        meta: {
            filename,
            parserStage: "phase-one-token-transform",
        },
    };
}

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

function parseSource({ source, tokens, recursiveTransform, filename = null }) {
    const transformedCode = transformTokens(tokens, recursiveTransform);
    const result = createParseResult({
        source,
        tokens,
        transformedCode,
        filename,
    });

    result.diagnostics.push(...findKeywordNames(tokens, source, filename));
    return result;
}

module.exports = {
    createParseResult,
    parseSource,
    transformCodeSegment,
    transformTokens,
};
