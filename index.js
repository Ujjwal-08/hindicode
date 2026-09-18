const { compileHindiJS, tokenizeSource, translateHindiJS } = require("./src/compiler/compile");
const { registerHindiExtension } = require("./src/runtime/register");
const { hindiToJS, sortedKeywords } = require("./src/language/keywords");
const { formatDiagnostic } = require("./src/diagnostics");
const { formatRuntimeError } = require("./src/diagnostics/runtime");

registerHindiExtension();

module.exports = {
    compileHindiJS,
    formatDiagnostic,
    formatRuntimeError,
    hindiToJS,
    registerHindiExtension,
    sortedKeywords,
    tokenizeSource,
    translateHindiJS,
};
