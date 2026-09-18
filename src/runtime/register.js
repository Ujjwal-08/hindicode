const fs = require("fs");
const { compileHindiJS } = require("../compiler/compile");
const { formatDiagnostic } = require("../diagnostics");

function registerHindiExtension() {
    require.extensions[".hindi.js"] = function loadHindiModule(module, filename) {
        let compiled;

        try {
            const content = fs.readFileSync(filename, "utf8").replace(/^\uFEFF/, ""); // keep lines so stack traces match
            compiled = compileHindiJS(content, { filename, mode: "runtime" });
        } catch (error) {
            if (error && typeof error.code === "string" && error.code.startsWith("HC_")) {
                console.error("❌ Hindi Transpiler Error:", formatDiagnostic(error));
            } else {
                console.error("❌ Hindi Transpiler Error:", error);
            }
            throw error;
        }

        // Runtime errors from the program itself propagate untouched.
        module._compile(compiled.code, filename);
    };
}

module.exports = {
    registerHindiExtension,
};
