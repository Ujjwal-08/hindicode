// Browser runtime: runs <script type="text/hindicode"> tags directly in a web page.
//
//   <script src="https://cdn.jsdelivr.net/npm/hindicode/dist/hindicode.browser.js"></script>
//   <script type="text/hindicode">
//       दिखाओ("नमस्ते ब्राउज़र!");
//   </script>
//
// Scripts run in document order. `src="file.hindi.js"` is fetched, and
// `data-module` (or import/export syntax) runs the code as an ES module.
const { tokenizeSource } = require("./compiler/tokenizer");
const { parseSource } = require("./parser");
const { isModuleSyntax } = require("./runtime/module-syntax");

const SCRIPT_TYPE = "text/hindicode";

function translate(source) {
    const tokens = tokenizeSource(source);
    return parseSource({ source, tokens, recursiveTransform: translate }).transformedCode;
}

function execute(code, { module = isModuleSyntax(code), label = "hindicode" } = {}) {
    const script = document.createElement("script");
    if (module) script.type = "module";
    // sourceURL names the code in DevTools stack traces
    script.textContent = `${code}\n//# sourceURL=${label}`;
    document.head.appendChild(script);
    script.remove();
}

async function runScript(element) {
    const source = element.src ? await (await fetch(element.src)).text() : element.textContent;
    const code = translate(source);
    execute(code, {
        module: element.hasAttribute("data-module") || isModuleSyntax(code),
        label: element.src || `inline-hindicode-${runScript.count++}.js`,
    });
}
runScript.count = 1;

async function runAll() {
    const scripts = document.querySelectorAll(`script[type="${SCRIPT_TYPE}"]`);
    for (const element of scripts) {
        try {
            await runScript(element);
        } catch (error) {
            console.error("❌ Hindicode:", error);
        }
    }
    document.dispatchEvent(new CustomEvent("hindicode:ready"));
}

if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", runAll);
    } else {
        runAll();
    }
}

module.exports = { translate, execute, runAll };
