// Node.js module-loader hook that lets `import` load .hindi.js files.
// Registered by `hindicode run` when the entry file uses ES module syntax.
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { compileHindiJS } = require("../compiler/compile.js");

export async function load(url, context, nextLoad) {
    if (!url.startsWith("file:") || !url.endsWith(".hindi.js")) {
        return nextLoad(url, context);
    }

    const filename = fileURLToPath(url);
    const source = await readFile(filename, "utf8");
    const { code, meta } = compileHindiJS(source, { filename, mode: "runtime" });

    if (meta.format === "module") {
        return { format: "module", source: code, shortCircuit: true };
    }

    // CommonJS: let Node's CJS loader handle it through the .hindi.js require hook.
    return { format: "commonjs", shortCircuit: true };
}
