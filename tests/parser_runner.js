const assert = require("assert/strict");
const path = require("path");

const { tokenizeSource, translateHindiJS } = require("../src/compiler/compile");
const { parseSource } = require("../src/parser");
const { compileHindiJS } = require("../src/compiler/compile");

const tests = [
    {
        name: "returns a structured parse result for valid source",
        run() {
            const source = "नया संख्या = 10;";
            const tokens = tokenizeSource(source);
            const result = parseSource({
                source,
                tokens,
                filename: "sample.hindi.js",
                recursiveTransform: (inner) => inner,
            });

            assert.equal(result.strategy, "token-transform");
            assert.equal(result.meta.filename, "sample.hindi.js");
            assert.equal(result.meta.parserStage, "phase-one-token-transform");
            assert.equal(result.transformedCode, "let संख्या = 10;");
            assert.equal(result.ast, null);
            assert.deepEqual(result.diagnostics, []);
            assert.ok(Array.isArray(result.tokens));
        },
    },
    {
        name: "preserves phrase-priority in parser transform",
        run() {
            const source = "अगर (झूठ) { दिखाओ(1); } नहीं तो { दिखाओ(2); }";
            const tokens = tokenizeSource(source);
            const result = parseSource({
                source,
                tokens,
                recursiveTransform: (inner) => inner,
            });

            assert.match(result.transformedCode, /if/);
            assert.match(result.transformedCode, /else/);
            assert.doesNotMatch(result.transformedCode, /! तो/);
        },
    },
    {
        name: "handles nested template expressions through parser transform",
        run() {
            const source = "नया नाम = `नमस्ते ${10 बड़ा 5 ? `सच ${'दुनिया'}` : 'नहीं'}`;";
            const tokens = tokenizeSource(source);
            const result = parseSource({
                source,
                tokens,
                recursiveTransform: (inner) => translateHindiJS(inner),
            });

            assert.match(result.transformedCode, /let नाम/);
            assert.match(result.transformedCode, /10 > 5/);
        },
    },
    {
        name: "compile path surfaces invalid generated syntax as a structured diagnostic",
        run() {
            assert.throws(
                () => compileHindiJS("अगर (सच { दिखाओ(1); }", { filename: "broken.hindi.js" }),
                (error) => error.code === "HC_JS_SYNTAX_ERROR" && error.file === "broken.hindi.js"
            );
        },
    },
];

console.log("Running parser tests...\n");

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

console.log(`\nParser coverage passed: ${passed}/${tests.length}`);

