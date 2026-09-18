const vm = require("vm");
const { createDiagnostic } = require("../diagnostics");
const { tokenizeSource } = require("./tokenizer");
const { parseSource } = require("../parser");
const { isModuleSyntax } = require("../runtime/module-syntax");

// Script-parse errors that only mean "this is an ES module", not a real mistake.
const MODULE_ONLY_ERRORS = /await is only valid|Cannot use import statement|Unexpected token 'export'|import\.meta/;

function translateHindiJS(source, options = {}) {
    const tokens = tokenizeSource(source);
    const parseResult = parseSource({
        source,
        tokens,
        filename: options.filename || null,
        recursiveTransform: (innerSource) => translateHindiJS(innerSource, options),
    });

    return parseResult.transformedCode;
}

function extractLocationFromSyntaxError(stackText, filename) {
    const lines = String(stackText || "").split(/\r?\n/);
    const header = lines.find((line) => line.startsWith(`${filename}:`)) || "";
    const match = header.match(/:(\d+)$/);
    const line = match ? Number(match[1]) : 1;

    const caretLine = lines.find((lineText) => /\^/.test(lineText)) || "^";
    const column = Math.max(caretLine.indexOf("^") + 1, 1);

    return {
        line,
        column,
    };
}

function validateGeneratedJavaScript(code, filename) {
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

        const location = extractLocationFromSyntaxError(error.stack, filename || "inline.hindi.js");
        return { format: "commonjs", diagnostics: [
            createDiagnostic({
                code: "HC_JS_SYNTAX_ERROR",
                file: filename || null,
                message: error.message,
                start: {
                    line: location.line,
                    column: location.column,
                    index: 0,
                },
                end: {
                    line: location.line,
                    column: location.column,
                    index: 0,
                },
                hint: "Run hindicode transpile to inspect generated JavaScript around this location.",
            }),
        ] };
    }
}

function compileHindiJS(source, options = {}) {
    let parseResult;

    try {
        const tokens = tokenizeSource(source);
        parseResult = parseSource({
            source,
            tokens,
            filename: options.filename || null,
            recursiveTransform: (innerSource) => translateHindiJS(innerSource, options),
        });
    } catch (error) {
        const diagnostic = createDiagnostic({
            code: "HC_COMPILE_FAILURE",
            file: options.filename || null,
            message: error.message,
            hint: "Inspect the source near the reported location or use hindicode transpile for debugging.",
        });
        throw diagnostic;
    }

    const validation = validateGeneratedJavaScript(parseResult.transformedCode, options.filename || "inline.hindi.js");
    const diagnostics = [...parseResult.diagnostics, ...validation.diagnostics];

    const firstError = diagnostics.find((diagnostic) => diagnostic.severity === "error");
    if (firstError) {
        throw firstError;
    }

    return {
        code: parseResult.transformedCode,
        map: null,
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
