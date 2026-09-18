const { TOKEN_TYPES } = require("../compiler/tokenizer");
const { sortedKeywords, hindiToJS } = require("../language/keywords");

function escapeForRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const keywordRegex = new RegExp(
    `(?<![\\u0900-\\u097F\\w$])(?:${sortedKeywords.map(escapeForRegex).join("|")})(?![\\u0900-\\u097F\\w$])`,
    "g"
);

function transformCodeSegment(code) {
    return code.replace(keywordRegex, (match) => hindiToJS[match] || match);
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

function parseSource({ source, tokens, recursiveTransform, filename = null }) {
    const transformedCode = transformTokens(tokens, recursiveTransform);

    return createParseResult({
        source,
        tokens,
        transformedCode,
        filename,
    });
}

module.exports = {
    createParseResult,
    parseSource,
    transformCodeSegment,
    transformTokens,
};
