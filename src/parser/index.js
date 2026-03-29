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

function transformTokens(tokens, recursiveTransform) {
    return tokens
        .map((token) => {
            if (token.type === TOKEN_TYPES.CODE) {
                return transformCodeSegment(token.value);
            }

            if (token.type === TOKEN_TYPES.TEMPLATE) {
                return token.value.replace(/\${([\s\S]*?)}/g, (fullMatch, expression) => {
                    return `${"$"}{${recursiveTransform(expression)}}`;
                });
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
