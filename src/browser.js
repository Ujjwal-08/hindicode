// Browser runtime: runs <script type="text/hindicode"> tags directly in a web page.
//
//   <script src="https://cdn.jsdelivr.net/npm/hindicode/dist/hindicode.browser.js"></script>
//   <script type="text/hindicode">
//       दिखाओ("नमस्ते ब्राउज़र!");
//   </script>
//
// Scripts run in document order. `src="file.hindi.js"` is fetched, and
// `data-module` (or import/export syntax) runs the code as an ES module.
// Each script carries a source map, so DevTools shows and debugs the Hindi source.
const { tokenizeSource } = require("./compiler/tokenizer");
const { parseSource } = require("./parser");
const { isModuleSyntax } = require("./runtime/module-syntax");
const { buildSourceMap, inlineSourceMapComment } = require("./compiler/source-map");

const SCRIPT_TYPE = "text/hindicode";

function compile(source, sourceName = "inline.hindi.js") {
    const result = parseSource({ source, tokens: tokenizeSource(source) });
    return { code: result.transformedCode, map: buildSourceMap(source, result.edits, { sourceName }) };
}

function translate(source) {
    return compile(source).code;
}

function execute(code, { module = isModuleSyntax(code), label = "hindicode", map = null } = {}) {
    const script = document.createElement("script");
    if (module) script.type = "module";
    // The source map shows the Hindi source in DevTools; sourceURL names the script.
    script.textContent = `${code}${map ? inlineSourceMapComment(map) : ""}\n//# sourceURL=${label}.js`;
    document.head.appendChild(script);
    script.remove();
}

async function runScript(element) {
    const source = element.src ? await (await fetch(element.src)).text() : element.textContent;
    const label = element.src || `inline-hindicode-${runScript.count++}.hindi.js`;
    const { code, map } = compile(source, label);
    execute(code, {
        module: element.hasAttribute("data-module") || isModuleSyntax(code),
        label,
        map,
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

module.exports = { compile, translate, execute, runAll };
