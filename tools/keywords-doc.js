#!/usr/bin/env node
// Generates docs/keywords.md — the full Hindi → JavaScript reference — from
// src/language/keywords.js, grouped by the section comments in that file.
const fs = require("fs");
const path = require("path");

const source = fs.readFileSync(path.join(__dirname, "..", "src", "language", "keywords.js"), "utf8");
const body = source.slice(source.indexOf("const hindiToJS = {"), source.indexOf("\n};"));

const sections = [];
let current = { title: "Phrases", rows: [] };
for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^\s*\/\/\s*(.+?)\s*$/);
    const entry = line.match(/^\s*"([^"]+)":\s*"([^"]*)"/);
    if (heading && !heading[1].startsWith("Multi-word")) {
        if (current.rows.length) sections.push(current);
        current = { title: heading[1].replace(/\s*\(continued\)$/, ""), rows: [] };
    } else if (entry) {
        current.rows.push(entry.slice(1));
    }
}
if (current.rows.length) sections.push(current);

// Merge "(continued)" sections back into their first occurrence.
const merged = new Map();
for (const section of sections) {
    if (!merged.has(section.title)) merged.set(section.title, []);
    merged.get(section.title).push(...section.rows);
}

const total = [...merged.values()].reduce((sum, rows) => sum + rows.length, 0);
let markdown = `# Hindicode कीवर्ड संदर्भ / Keyword Reference

Generated from \`src/language/keywords.js\` by \`node tools/keywords-doc.js\` — ${total} aliases.

Every spelling with a nukta (ड़, फ़, ज़ …) is also accepted in its precomposed form and without the nukta
(\`बड़ा\` = \`बडा\`). English JavaScript always works too — Hindi and English can be mixed freely.

Keywords can't be used as your own variable names (\`स्थिर जानकारी = …\` would become \`const console.info = …\`);
Hindicode reports this as \`HC_KEYWORD_AS_NAME\`. As object keys and after \`.\`, keywords that would not make
sense as a name (\`नया\` → let, \`गणित\` → Math) stay in Hindi, so \`{ नया: 1 }\` keeps the key \`नया\`.

`;

markdown += [...merged.keys()].map((title) => `- [${title}](#${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")})`).join("\n");
markdown += "\n";

for (const [title, rows] of merged) {
    markdown += `\n## ${title}\n\n| हिंदी | JavaScript |\n|---|---|\n`;
    markdown += rows.map(([hindi, js]) => `| \`${hindi}\` | \`${js.replace(/\|/g, "\\|")}\` |`).join("\n");
    markdown += "\n";
}

const out = path.join(__dirname, "..", "docs", "keywords.md");
fs.writeFileSync(out, markdown);
console.log(`Wrote ${path.relative(process.cwd(), out)} (${total} aliases, ${merged.size} sections)`);
