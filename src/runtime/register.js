const fs = require("fs");
const { compileHindiJS } = require("../compiler/compile");
const { formatDiagnostic } = require("../diagnostics");
const { inlineSourceMapComment } = require("../compiler/source-map");

// quiet: the caller (the CLI) reports compile errors itself.
function registerHindiExtension({ quiet = false } = {}) {
    require.extensions[".hindi.js"] = function loadHindiModule(module, filename) {
        let compiled;

        try {
            const content = fs.readFileSync(filename, "utf8").replace(/^\uFEFF/, ""); // keep lines so stack traces match
            compiled = compileHindiJS(content, { filename, mode: "runtime" });
        } catch (error) {
            if (quiet) throw error;
            if (error && typeof error.code === "string" && error.code.startsWith("HC_")) {
                console.error("❌ Hindi Transpiler Error:", formatDiagnostic(error));
            } else {
                console.error("❌ Hindi Transpiler Error:", error);
            }
            throw error;
        }

        // Runtime errors from the program itself propagate untouched. The inline
        // source map lets Node (with source maps enabled) report Hindi source columns.
        module._compile(compiled.code + inlineSourceMapComment(compiled.map), filename);
    };
}

module.exports = {
    registerHindiExtension,
};
