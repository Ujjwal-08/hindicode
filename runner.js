// runner.js — Runs all numbered hindicode test files
require("./index.js");
require("./tests/assert_helper.js"); // Load Hindi assertions globally

const fs = require("fs");
const path = require("path");

const testsDir = path.join(__dirname, "tests");
const testFiles = fs
    .readdirSync(testsDir)
    .filter((file) => /^\d+_.*\.hindi\.js$/.test(file))
    .sort((a, b) => a.localeCompare(b, "en"))
    .map((file) => path.posix.join("tests", file));

let passed = 0;
let failed = 0;
let failedTests = [];

console.log("🚀 Running hindicode tests...\n");

testFiles.forEach((file) => {
    process.stdout.write(`── Testing ${file.padEnd(40)} `);
    try {
        require(`./${file}`);
        console.log("✅ PASSED");
        passed++;
    } catch (err) {
        console.log("❌ FAILED");
        console.error(`   Error: ${err.message}`);
        failed++;
        failedTests.push({ file, error: err.message });
    }
});

setTimeout(() => {
    console.log("\n" + "═".repeat(50));
    console.log(`✅ Passed: ${passed}  ❌ Failed: ${failed}`);

    if (failedTests.length > 0) {
        console.log("═".repeat(50));
        console.log("Detailed Failures:");
        failedTests.forEach((t) => {
            console.log(`- ${t.file}: ${t.error}`);
        });
    }
    console.log("═".repeat(50));

    if (failed > 0) {
        process.exit(1);
    }
}, 500);
