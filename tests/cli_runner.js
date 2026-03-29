const assert = require("assert/strict");
const path = require("path");

const { runCommand } = require("../src/cli");
const { runCli } = require("../src/cli/main");

const sampleFile = path.resolve(__dirname, "01_basics.hindi.js");
const brokenFile = path.resolve(__dirname, "fixtures", "diagnostics", "broken.hindi.js");

const tests = [
    {
        name: "check command returns success",
        run() {
            assert.equal(runCommand("check", sampleFile), 0);
        },
    },
    {
        name: "transpile command returns success",
        run() {
            const write = process.stdout.write;
            let output = "";
            process.stdout.write = (chunk) => {
                output += chunk;
                return true;
            };

            try {
                assert.equal(runCommand("transpile", sampleFile), 0);
            } finally {
                process.stdout.write = write;
            }

            assert.match(output, /\blet\b/);
            assert.match(output, /console\.log/);
        },
    },
    {
        name: "missing file raises structured diagnostic",
        run() {
            assert.throws(
                () => runCommand("check", path.resolve(__dirname, "missing-file.hindi.js")),
                (error) => error.code === "HC_CLI_FILE_NOT_FOUND"
            );
        },
    },
    {
        name: "unknown command raises structured diagnostic",
        run() {
            assert.throws(
                () => runCommand("unknown", sampleFile),
                (error) => error.code === "HC_CLI_UNKNOWN_COMMAND"
            );
        },
    },
    {
        name: "broken source raises line-column syntax diagnostic",
        run() {
            assert.throws(
                () => runCommand("check", brokenFile),
                (error) => error.code === "HC_JS_SYNTAX_ERROR" && error.start.line === 3 && error.start.column === 10
            );
        },
    },
    {
        name: "CLI main returns exit code 0 for valid check",
        run() {
            let output = "";
            const io = { error: () => {}, log: (text) => { output += text; } };
            const exitCode = runCli([process.execPath, "hindicode", "check", sampleFile], io);
            assert.equal(exitCode, 0);
        },
    },
    {
        name: "CLI main returns exit code 1 for invalid source",
        run() {
            let stderr = "";
            const io = { error: (text) => { stderr += text; }, log: () => {} };
            const exitCode = runCli([process.execPath, "hindicode", "check", brokenFile], io);
            assert.equal(exitCode, 1);
            assert.match(stderr, /HC_JS_SYNTAX_ERROR/);
            assert.match(stderr, /broken\.hindi\.js:3:10/);
        },
    },
];

console.log("Running CLI tests...\n");

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

console.log(`\nCLI coverage passed: ${passed}/${tests.length}`);
