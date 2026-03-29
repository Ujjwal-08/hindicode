const assert = require("assert/strict");

const { tokenizeSource } = require("../src/compiler/compile");

const tests = [
    {
        name: "splits code and protected comments",
        run() {
            const tokens = tokenizeSource("नया x = 1; // टिप्पणी");
            assert.equal(tokens.length, 2);
            assert.equal(tokens[0].type, "code");
            assert.equal(tokens[1].type, "line_comment");
        },
    },
    {
        name: "detects strings and block comments",
        run() {
            const tokens = tokenizeSource(`स्थिर नाम = \"राम\"; /* नोट */`);
            assert.equal(tokens[1].type, "string_double");
            assert.equal(tokens[3].type, "block_comment");
        },
    },
    {
        name: "detects template literals as protected tokens",
        run() {
            const tokens = tokenizeSource("दिखाओ(`नमस्ते ${नाम}`)");
            const templateToken = tokens.find((token) => token.type === "template");
            assert.ok(templateToken);
            assert.equal(templateToken.value, "`नमस्ते ${नाम}`");
        },
    },
    {
        name: "detects regex literals",
        run() {
            const tokens = tokenizeSource("स्थिर खोज = /अगर|वरना/g;");
            const regexToken = tokens.find((token) => token.type === "regex");
            assert.ok(regexToken);
            assert.equal(regexToken.value, "/अगर|वरना/g");
        },
    },
    {
        name: "keeps mixed identifiers inside code tokens",
        run() {
            const tokens = tokenizeSource("नया agarनाम = 5;");
            assert.equal(tokens.length, 1);
            assert.equal(tokens[0].type, "code");
            assert.match(tokens[0].value, /agarनाम/);
        },
    },
    {
        name: "tracks line and column positions for protected tokens",
        run() {
            const source = "नया x = 1;\nदिखाओ(\"राम\");\n// टिप्पणी";
            const tokens = tokenizeSource(source);
            const stringToken = tokens.find((token) => token.type === "string_double");
            const commentToken = tokens.find((token) => token.type === "line_comment");

            assert.equal(stringToken.startLoc.line, 2);
            assert.equal(stringToken.startLoc.column, 7);
            assert.equal(commentToken.startLoc.line, 3);
            assert.equal(commentToken.startLoc.column, 1);
        },
    },
];

console.log("Running tokenizer tests...\n");

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

console.log(`\nTokenizer coverage passed: ${passed}/${tests.length}`);

