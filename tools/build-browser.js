#!/usr/bin/env node
// Bundles src/browser.js and its CommonJS dependencies into dist/hindicode.browser.js,
// a single file that works from a plain <script> tag (exposes window.Hindicode).
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const entry = path.join(root, "src", "browser.js");
const modules = new Map();

function collect(file) {
    if (modules.has(file)) return;
    const source = fs.readFileSync(file, "utf8");
    modules.set(file, source);
    for (const [, request] of source.matchAll(/require\("(\.[^"]+)"\)/g)) {
        const resolved = require.resolve(path.resolve(path.dirname(file), request));
        collect(resolved);
    }
}
collect(entry);

const ids = new Map([...modules.keys()].map((file, index) => [file, index]));
const wrapped = [...modules].map(([file, source]) => {
    const rewritten = source.replace(/require\("(\.[^"]+)"\)/g, (_, request) => {
        const resolved = require.resolve(path.resolve(path.dirname(file), request));
        return `__require(${ids.get(resolved)})`;
    });
    return `/* ${path.relative(root, file).replace(/\\/g, "/")} */\nfunction (module, exports, __require) {\n${rewritten}\n}`;
});

const { version } = require(path.join(root, "package.json"));
const bundle = `/*! hindicode ${version} — browser runtime | ISC License */
(function () {
"use strict";
var factories = [
${wrapped.join(",\n")}
];
var cache = {};
function __require(id) {
    if (cache[id]) return cache[id].exports;
    var module = (cache[id] = { exports: {} });
    factories[id](module, module.exports, __require);
    return module.exports;
}
window.Hindicode = __require(${ids.get(entry)});
})();
`;

fs.mkdirSync(path.join(root, "dist"), { recursive: true });
const out = path.join(root, "dist", "hindicode.browser.js");
fs.writeFileSync(out, bundle);
console.log(`Built ${path.relative(root, out)} (${(bundle.length / 1024).toFixed(1)} KB, ${modules.size} modules)`);
