// tests/assert_helper.js
// Simple assertion helper for hindicode tests

global.सत्यापित_करो = function (condition, message) {
    if (!condition) {
        throw new Error(`❌ Assertion Failed: ${message || "Expected condition to be truthy"}`);
    }
};

global.बराबर_है = function (actual, expected, message) {
    if (actual !== expected) {
        throw new Error(`❌ Assertion Failed: ${message || `Expected ${expected} but got ${actual}`}`);
    }
};

console.log("✅ Assertion helper loaded (सत्यापित_करो, बराबर_है)");
