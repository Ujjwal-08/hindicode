#!/usr/bin/env node
/**
 * How much of a real program is written in Hindi?
 *
 * Counts the words in code (strings and comments excluded) of each file and
 * reports the share written in Devanagari, plus the English words that remain.
 *
 * Usage: node tools/purity.js [files or folders...]   (default: examples/)
 */
const fs = require("fs");
const path = require("path");
const { tokenizeSource, TOKEN_TYPES } = require("../src/compiler/tokenizer");

const targets = process.argv.slice(2);
const roots = targets.length ? targets : [path.join(__dirname, "..", "examples")];

function collectFiles(target) {
    const stat = fs.statSync(target);
    if (stat.isFile()) return target.endsWith(".hindi.js") ? [target] : [];
    return fs.readdirSync(target).flatMap((name) => collectFiles(path.join(target, name)));
}

const files = roots.flatMap(collectFiles).filter((file) => !path.basename(file).startsWith("_"));
const wordRegex = /[\u0900-\u097F\w$]+/g;
const englishCounts = new Map();
let totalHindi = 0;
let totalEnglish = 0;
const rows = [];

for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const code = tokenizeSource(source)
        .filter((token) => token.type === TOKEN_TYPES.CODE || token.type === TOKEN_TYPES.TEMPLATE)
        .map((token) => (token.type === TOKEN_TYPES.TEMPLATE ? (token.value.match(/\$\{[\s\S]*?\}/g) || []).join(" ") : token.value))
        .join(" ");

    let hindi = 0;
    let english = 0;
    for (const [word] of code.matchAll(wordRegex)) {
        if (/^\d/.test(word) || /^[_$]+$/.test(word) || /^[A-Za-z]$/.test(word)) continue; // numbers, bare _ and one-letter names (i, x) are neutral
        if (/[\u0900-\u097F]/.test(word)) {
            hindi++;
        } else {
            english++;
            englishCounts.set(word, (englishCounts.get(word) || 0) + 1);
        }
    }
    totalHindi += hindi;
    totalEnglish += english;
    rows.push({ file: path.relative(process.cwd(), file), hindi, english, percent: (hindi / (hindi + english)) * 100 || 0 });
}

for (const row of rows) {
    console.log(`${row.percent.toFixed(1).padStart(5)}%  ${row.file}`);
}
const overall = (totalHindi / (totalHindi + totalEnglish)) * 100;
console.log(`\nOverall: ${overall.toFixed(1)}% of ${totalHindi + totalEnglish} code words are Hindi across ${rows.length} files.`);
console.log(
    "Most common English words left: " +
        [...englishCounts]
            .sort((a, b) => b[1] - a[1])
            .slice(0, 25)
            .map(([word, count]) => `${word}(${count})`)
            .join(", ")
);
