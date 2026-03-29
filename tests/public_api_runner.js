const assert = require("assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");

const hindicode = require("../index");

const tests = [
    {
        name: "exports the expected public compiler and runtime API",
        run() {
            assert.equal(typeof hindicode.compileHindiJS, "function");
            assert.equal(typeof hindicode.translateHindiJS, "function");
            assert.equal(typeof hindicode.tokenizeSource, "function");
            assert.equal(typeof hindicode.registerHindiExtension, "function");
            assert.equal(typeof hindicode.hindiToJS, "object");
            assert.ok(Array.isArray(hindicode.sortedKeywords));
        },
    },
    {
        name: "keeps the .hindi.js require hook registered through the package entry",
        run() {
            assert.equal(typeof require.extensions[".hindi.js"], "function");
        },
    },
    {
        name: "loads a temporary .hindi.js module through the public entrypoint",
        run() {
            const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "hindicode-public-"));
            const modulePath = path.join(tempDir, "public-api.hindi.js");

            fs.writeFileSync(modulePath, `
                स्थिर base = 9;
                मॉड्यूल.exports = {
                    total: base * 3,
                    ready: सच
                };
            `);

            try {
                const loaded = require(modulePath);
                assert.deepEqual(loaded, { total: 27, ready: true });
            } finally {
                delete require.cache[modulePath];
                fs.unlinkSync(modulePath);
                fs.rmdirSync(tempDir);
            }
        },
    },
];

console.log("Running public API compatibility tests...\n");

let passed = 0;
for (const test of tests) {
    process.stdout.write(`- ${test.name} `);
    try {
        test.run();
        console.log("OK");
        passed++;
    } catch (error) {
        console.log("FAILED");
        console.error(error);
        process.exit(1);
    }
}

console.log(`\nPublic API coverage passed: ${passed}/${tests.length}`);
