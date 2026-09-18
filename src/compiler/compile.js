const vm = require("vm");
const path = require("path");
const { createDiagnostic, DiagnosticSeverity } = require("../diagnostics");
const { codeFrame, suggestKeyword, translateMessage } = require("../diagnostics/runtime");
const { tokenizeSource, TOKEN_TYPES, createLocator } = require("./tokenizer");
const { parseSource } = require("../parser");
const { isModuleSyntax } = require("../runtime/module-syntax");
const { buildSourceMap, createPositionMapper } = require("./source-map");
const { keywordLookup } = require("../language/keywords");

// Script-parse errors that only mean "this is an ES module", not a real mistake.
const MODULE_ONLY_ERRORS = /await is only valid|Cannot use import statement|Unexpected token 'export'|import\.meta/;

function translateHindiJS(source, options = {}) {
    const tokens = tokenizeSource(source);
    return parseSource({ source, tokens, filename: options.filename || null }).transformedCode;
}

function extractLocationFromSyntaxError(stackText, filename) {
    const lines = String(stackText || "").split(/\r?\n/);
    const header = lines.find((line) => line.startsWith(`${filename}:`)) || "";
    const match = header.match(/:(\d+)$/);
    const line = match ? Number(match[1]) : 1;

    const caretLine = lines.find((lineText) => /^\s*\^/.test(lineText)) || "^";
    const column = Math.max(caretLine.indexOf("^") + 1, 1);

    return { line, column };
}

// A misspelled keyword (लौटओ for लौटाओ) usually appears exactly once, while
// the programmer's own names appear at least twice (declared and used).
function findPossibleTypos(tokens, source, filename, edits) {
    // words that are part of a translated keyword (ज्यादा in "ज्यादा या बराबर") are fine
    const translated = (index) => edits.some((edit) => index >= edit.start && index < edit.end);
    const occurrences = new Map();
    for (const token of tokens) {
        if (token.type !== TOKEN_TYPES.CODE) continue;
        for (const match of token.value.matchAll(/(?<![\u0900-\u097F\w$#])[\u0900-\u097F][\u0900-\u097F\w$]*/g)) {
            if (keywordLookup[match[0]] || translated(token.start + match.index)) continue;
            const seen = occurrences.get(match[0]);
            if (seen) seen.count++;
            else occurrences.set(match[0], { count: 1, index: token.start + match.index });
        }
    }

    const locate = createLocator(source);
    const diagnostics = [];
    for (const [word, { count, index }] of occurrences) {
        if (count !== 1) continue;
        const suggestion = suggestKeyword(word, { minConsonants: 3 });
        if (!suggestion) continue;
        const start = locate(index);
        diagnostics.push(
            createDiagnostic({
                code: "HC_POSSIBLE_TYPO",
                severity: DiagnosticSeverity.WARNING,
                file: filename,
                message: `'${word}' — क्या आपका मतलब '${suggestion}' था? / did you mean '${suggestion}' (${keywordLookup[suggestion]})?`,
                start,
                end: locate(index + word.length),
                frame: codeFrame(source, start.line, start.column, { context: 0 }),
                word,
                suggestion,
            })
        );
    }
    return diagnostics;
}

function validateGeneratedJavaScript(code, filename, { source, mapPosition, typos }) {
    if (isModuleSyntax(code)) {
        // vm.Script cannot parse ES modules; Node reports module syntax errors on load.
        return { format: "module", diagnostics: [] };
    }

    try {
        new vm.Script(code, { filename });
        return { format: "commonjs", diagnostics: [] };
    } catch (error) {
        if (MODULE_ONLY_ERRORS.test(error.message)) {
            return { format: "module", diagnostics: [] };
        }

        const generated = extractLocationFromSyntaxError(error.stack, filename || "inline.hindi.js");
        const location = mapPosition(generated.line, generated.column);
        const translated = translateMessage(error.message);
        const nearbyTypos = typos.filter((typo) => Math.abs(typo.start.line - location.line) <= 1);
        const hint = nearbyTypos.length
            ? nearbyTypos.map((typo) => `💡 '${typo.word}' → '${typo.suggestion}'? (पंक्ति ${typo.start.line})`).join("\n")
            : "hindicode transpile से बना JavaScript देखें / Run hindicode transpile to inspect the generated JavaScript.";

        return {
            format: "commonjs",
            diagnostics: [
                createDiagnostic({
                    code: "HC_JS_SYNTAX_ERROR",
                    file: filename || null,
                    message: translated ? `${translated} / ${error.message}` : error.message,
                    start: { ...location, index: 0 },
                    end: { ...location, index: 0 },
                    hint,
                    frame: codeFrame(source, location.line, location.column),
                }),
            ],
        };
    }
}

function compileHindiJS(source, options = {}) {
    let parseResult;
    let tokens;

    try {
        tokens = tokenizeSource(source);
        parseResult = parseSource({ source, tokens, filename: options.filename || null });
    } catch (error) {
        throw createDiagnostic({
            code: "HC_COMPILE_FAILURE",
            file: options.filename || null,
            message: error.message,
            hint: "Inspect the source near the reported location or use hindicode transpile for debugging.",
        });
    }

    for (const diagnostic of parseResult.diagnostics) {
        diagnostic.frame = diagnostic.frame || codeFrame(source, diagnostic.start.line, diagnostic.start.column);
    }

    const typos = findPossibleTypos(tokens, source, options.filename || null, parseResult.edits);
    const validation = validateGeneratedJavaScript(parseResult.transformedCode, options.filename || "inline.hindi.js", {
        source,
        mapPosition: createPositionMapper(source, parseResult.edits),
        typos,
    });
    const diagnostics = [...parseResult.diagnostics, ...validation.diagnostics, ...typos];

    const firstError = diagnostics.find((diagnostic) => diagnostic.severity === "error");
    if (firstError) {
        throw firstError;
    }

    const sourceName = options.filename ? path.basename(options.filename) : "input.hindi.js";
    const map = buildSourceMap(source, parseResult.edits, {
        file: sourceName.replace(/\.hindi\.js$/, ".js"),
        sourceName,
    });

    return {
        code: parseResult.transformedCode,
        map,
        diagnostics,
        meta: {
            filename: options.filename || null,
            mode: options.mode || "runtime",
            format: validation.format,
            parserStrategy: parseResult.strategy,
            parserStage: parseResult.meta.parserStage,
        },
        parseResult,
    };
}

module.exports = {
    compileHindiJS,
    tokenizeSource,
    translateHindiJS,
};
