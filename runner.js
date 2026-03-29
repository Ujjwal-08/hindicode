// runner.js — Runs all hindicode test files
require('./index.js');

const testFiles = [
    'tests/01_basics.hindi.js',
    'tests/02_control_flow.hindi.js',
    'tests/03_functions.hindi.js',
    'tests/04_arrays.hindi.js',
    'tests/05_objects_classes.hindi.js',
    'tests/06_async.hindi.js',
    'tests/07_error_handling.hindi.js',
    'tests/08_math_string.hindi.js',
    'tests/09_protection.hindi.js',
    'tests/10_destructuring_spread.hindi.js',
    'tests/11_collections.hindi.js',
    'tests/12_node_core.hindi.js',
    'tests/13_logic_operators.hindi.js',
];

let passed = 0;
let failed = 0;

console.log("🚀 Running hindicode tests...\n");

testFiles.forEach(file => {
    console.log(`\n── Testing ${file} ─────────────────`);
    try {
        require(`./${file}`);
        console.log(`✅ ${file} PASSED`);
        passed++;
    } catch (err) {
        console.error(`❌ ${file} FAILED:`, err.message);
        failed++;
    }
});

setTimeout(() => {
    console.log(`\n────────────────────────────────────`);
    console.log(`✅ Passed: ${passed}  ❌ Failed: ${failed}`);
    console.log(`────────────────────────────────────`);
}, 500);
