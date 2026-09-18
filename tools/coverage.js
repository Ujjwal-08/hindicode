#!/usr/bin/env node
/**
 * Measures how much of the JavaScript surface can be written in Hindi.
 *
 * Every JavaScript program already runs through Hindicode (English passes
 * through untouched), so "coverage" here means: for how many JavaScript
 * keywords, globals and built-in methods does a Hindi alias exist?
 *
 * Usage: node tools/coverage.js [--missing] [--json]
 */
const { hindiToJS } = require("../src/language/keywords");

// Every name a Hindi alias can produce, including each part of "Math.round".
const covered = new Set();
for (const value of Object.values(hindiToJS)) {
    covered.add(value);
    for (const part of value.split(".")) covered.add(part);
}

const own = (obj) =>
    Object.getOwnPropertyNames(obj).filter(
        (name) => !["constructor", "length", "name", "prototype", "caller", "arguments", "callee"].includes(name) && !name.startsWith("__")
    );

const categories = {
    "Keywords & statements": [
        "if", "else", "for", "while", "do", "switch", "case", "default", "break", "continue", "return",
        "throw", "try", "catch", "finally", "let", "const", "var", "function", "class", "extends", "super",
        "this", "new", "delete", "typeof", "instanceof", "in", "of", "void", "yield", "async", "await",
        "import", "export", "from", "as", "static", "get", "set", "constructor", "debugger", "with",
    ],
    "Literals & values": ["true", "false", "null", "undefined", "NaN", "Infinity", "globalThis"],
    "Operators (word-able)": ["&&", "||", "!", "===", "!==", "==", "!=", "<", ">", "<=", ">=", "??"],
    "Global objects & functions": [
        "Object", "Function", "Array", "Number", "Boolean", "String", "Symbol", "BigInt", "Date", "RegExp",
        "Promise", "Map", "Set", "WeakMap", "WeakSet", "WeakRef", "FinalizationRegistry", "Proxy", "Reflect",
        "JSON", "Math", "Intl", "ArrayBuffer", "DataView", "Uint8Array", "Int32Array", "Float64Array",
        "Error", "TypeError", "RangeError", "SyntaxError", "ReferenceError", "AggregateError",
        "parseInt", "parseFloat", "isNaN", "isFinite", "encodeURIComponent", "decodeURIComponent",
        "encodeURI", "decodeURI", "structuredClone", "queueMicrotask",
    ],
    "Console & timers": [
        "log", "error", "warn", "info", "debug", "dir", "table", "time", "timeEnd", "timeLog", "trace", "assert", "count", "countReset", "group", "groupCollapsed", "groupEnd",
        "setTimeout", "setInterval", "clearTimeout", "clearInterval", "setImmediate",
    ],
    "Array methods": [...own(Array.prototype), ...own(Array)],
    "String methods": [...own(String.prototype), ...own(String)].filter((n) => !/^(anchor|big|blink|bold|fixed|font|italics|link|small|strike|sub|sup|substr|trimLeft|trimRight)/.test(n)),
    "Object methods": [...own(Object), "hasOwnProperty", "toString", "valueOf"],
    "Number methods": [...own(Number), ...own(Number.prototype)],
    "Math": own(Math),
    "JSON": own(JSON).filter((n) => typeof JSON[n] === "function"),
    "Promise": [...own(Promise), ...own(Promise.prototype)],
    "Map / Set": [...new Set([...own(Map.prototype), ...own(Set.prototype), ...own(Map)])],
    "Date methods": [...own(Date), ...own(Date.prototype)].filter((n) => !/UTC|^getYear|^setYear|toGMT/.test(n)),
    "RegExp methods": ["test", "exec", "match", "matchAll", "replace", "replaceAll", "search", "split", "source", "flags", "lastIndex"],
    "Reflect / Proxy": [...own(Reflect), "Proxy"],
    "Node.js": [
        "require", "module", "exports", "process", "Buffer", "__dirname", "__filename", "global",
        "argv", "env", "exit", "cwd", "nextTick", "on", "emit",
        "readFile", "readFileSync", "writeFile", "writeFileSync", "existsSync", "mkdirSync", "readdirSync",
        "join", "resolve", "basename", "extname", "dirname", "createServer", "listen",
    ],
    "Browser / DOM": [
        "window", "document", "navigator", "location", "history", "localStorage", "sessionStorage", "fetch",
        "alert", "prompt", "confirm", "getElementById", "querySelector", "querySelectorAll", "addEventListener",
        "removeEventListener", "createElement", "appendChild", "removeChild", "innerHTML", "textContent",
        "classList", "style", "setAttribute", "getAttribute", "preventDefault", "requestAnimationFrame",
        "getItem", "setItem", "removeItem",
    ],
};

const args = process.argv.slice(2);
const report = [];
let total = 0;
let hit = 0;

for (const [name, list] of Object.entries(categories)) {
    const unique = [...new Set(list)];
    const done = unique.filter((item) => covered.has(item));
    const missing = unique.filter((item) => !covered.has(item));
    total += unique.length;
    hit += done.length;
    report.push({ name, total: unique.length, covered: done.length, percent: Math.round((done.length / unique.length) * 100), missing });
}

if (args.includes("--json")) {
    console.log(JSON.stringify({ aliases: Object.keys(hindiToJS).length, total, covered: hit, categories: report }, null, 2));
    process.exit(0);
}

const bar = (p) => "█".repeat(Math.round(p / 5)).padEnd(20, "░");
console.log(`\nHindicode coverage — ${Object.keys(hindiToJS).length} Hindi aliases\n`);
for (const row of report) {
    console.log(`${row.name.padEnd(28)} ${bar(row.percent)} ${String(row.percent).padStart(3)}%  (${row.covered}/${row.total})`);
    if (args.includes("--missing") && row.missing.length) {
        console.log(`    missing: ${row.missing.join(", ")}`);
    }
}
console.log(`\n${"OVERALL".padEnd(28)} ${bar((hit / total) * 100)} ${String(Math.round((hit / total) * 100)).padStart(3)}%  (${hit}/${total})\n`);
