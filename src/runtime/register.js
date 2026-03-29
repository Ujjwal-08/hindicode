const fs = require("fs");
const { compileHindiJS } = require("../compiler/compile");
const { formatDiagnostic } = require("../diagnostics");

function registerHindiExtension() {
    require.extensions[".hindi.js"] = function loadHindiModule(module, filename) {
        try {
            const content = fs.readFileSync(filename, "utf8").trim();
            const compiled = compileHindiJS(content, { filename, mode: "runtime" });
            module._compile(compiled.code, filename);
        } catch (error) {
            if (error && error.code && error.message) {
                console.error("❌ Hindi Transpiler Error:", formatDiagnostic(error));
            } else {
                console.error("❌ Hindi Transpiler Error:", error);
            }
            throw error;
        }
    };
}

module.exports = {
    registerHindiExtension,
};
