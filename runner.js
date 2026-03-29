// runner.js
require('./index.js');
const path = require('path');
const fs = require('fs');

console.log("🚀 Running hindicode tests...\n");

const testFiles = [
    'basic.hindi.js',
    'logic.hindi.js',
    'strings_comments.hindi.js',
    'advanced.hindi.js'
];

testFiles.forEach(file => {
    console.log(`--- Testing ${file} ---`);
    try {
        require(`./tests/${file}`);
        console.log(`✅ ${file} passed\n`);
    } catch (err) {
        console.error(`❌ ${file} failed:`, err);
    }
});
