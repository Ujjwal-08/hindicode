// Object-key handling, source maps and Hindi error reporting.
const assert = require("assert/strict");
const { execFileSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const { translateHindiJS, compileHindiJS } = require("../index");
const { translateMessage, suggestKeyword, codeFrame } = require("../src/diagnostics/runtime");

const bin = path.join(__dirname, "..", "bin", "hindicode.js");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "hindicode-debug-"));

function runHindi(name, source) {
    const file = path.join(tempDir, name);
    fs.writeFileSync(file, source);
    try {
        return { code: 0, output: execFileSync(process.execPath, [bin, "run", file], { encoding: "utf8", stdio: "pipe" }) };
    } catch (error) {
        return { code: error.status, output: `${error.stdout}${error.stderr}` };
    }
}

const tests = [
    {
        name: "keywords used as object keys stay Hindi when the translation is not a name",
        run() {
            assert.equal(translateHindiJS("स्थिर क = { नया: 1, गणित: 2, त्रुटि: 3 };"), "const क = { नया: 1, गणित: 2, त्रुटि: 3 };");
            assert.equal(translateHindiJS("क.नया + क?.गणित"), "क.नया + क?.गणित");
        },
    },
    {
        name: "API names still translate as keys and properties",
        run() {
            assert.equal(translateHindiJS("ऐरे.से({ लंबाई: 3 })"), "Array.from({ length: 3 })");
            assert.equal(translateHindiJS("वादा.फिर(f).पकड़ो(g).अंततः(h)"), "वादा.then(f).catch(g).finally(h)");
            assert.equal(translateHindiJS("नक्शा_1.हटाओ(1)"), "नक्शा_1.delete(1)");
            assert.equal(translateHindiJS("वैश्विक.गणित.PI"), "globalThis.Math.PI");
            assert.equal(translateHindiJS("नंबर.एप्सिलॉन"), "Number.EPSILON");
        },
    },
    {
        name: "ternaries, switch cases and spreads are not mistaken for keys",
        run() {
            assert.equal(translateHindiJS("स्थिर क = { ख: ग ? सच : झूठ };"), "const क = { ख: ग ? true : false };");
            assert.equal(translateHindiJS("स्विच (x) { डिफ़ॉल्ट: रोकें; }"), "switch (x) { default: break; }");
            assert.equal(translateHindiJS("स्विच (x) { मामला सच: रोकें; }"), "switch (x) { case true: break; }");
            assert.equal(translateHindiJS("[...गणित_सूची]"), "[...गणित_सूची]");
        },
    },
    {
        name: "object keys round-trip through JSON with their Hindi names",
        run() {
            const result = runHindi("keys.hindi.js", `
स्थिर अवस्था = { नया: "शुरू", गणित: 90 };
दिखाओ(तार_बनाओ(अवस्था), अवस्था["नया"], अवस्था.गणित);
`);
            assert.equal(result.code, 0, result.output);
            assert.equal(result.output.trim(), '{"नया":"शुरू","गणित":90} शुरू 90');
        },
    },
    {
        name: "compile returns a source map with the Hindi source",
        run() {
            const { map } = compileHindiJS("दिखाओ(सच);\nनया क = 1;", { filename: "x.hindi.js" });
            assert.equal(map.version, 3);
            assert.deepEqual(map.sources, ["x.hindi.js"]);
            assert.equal(map.sourcesContent[0], "दिखाओ(सच);\nनया क = 1;");
            assert.equal(map.mappings.split(";").length, 2);
        },
    },
    {
        name: "runtime errors point at the exact column in the Hindi source",
        run() {
            const result = runHindi("column.hindi.js", `स्थिर वस्तु = खाली;\nदिखाओ(वस्तु.नाम.लंबाई);\n`);
            assert.equal(result.code, 1);
            assert.match(result.output, /खाली \(null\) का गुण 'नाम' नहीं पढ़ सकते/);
            assert.match(result.output, /column\.hindi\.js:2:13/);
            assert.match(result.output, /> 2 \| दिखाओ\(वस्तु\.नाम\.लंबाई\);/);
        },
    },
    {
        name: "undefined names suggest the keyword that was probably meant",
        run() {
            const result = runHindi("typo.hindi.js", `दिखाओ(गणीत.अधिकतम(1, 2));\n`);
            assert.equal(result.code, 1);
            assert.match(result.output, /संदर्भ_त्रुटि \(ReferenceError\): 'गणीत' परिभाषित नहीं है/);
            assert.match(result.output, /क्या आपका मतलब 'गणित' था\?/);
        },
    },
    {
        name: "syntax errors caused by a misspelled keyword name the keyword",
        run() {
            assert.throws(
                () => compileHindiJS("कार्य क(स) {\n    लौटओ स;\n}", { filename: "s.hindi.js" }),
                (error) => error.code === "HC_JS_SYNTAX_ERROR" && /'लौटओ' → 'लौटाओ'/.test(error.hint) && error.start.line === 2
            );
        },
    },
    {
        name: "check warns about likely typos but not about real words",
        run() {
            const { diagnostics } = compileHindiJS('दिखओ("नमस्ते");\nस्थिर कार = 1; स्थिर सम = कार + 1;');
            assert.deepEqual(diagnostics.map((d) => [d.code, d.word, d.suggestion]), [["HC_POSSIBLE_TYPO", "दिखओ", "दिखाओ"]]);
        },
    },
    {
        name: "unhandled promise rejections are reported in Hindi",
        run() {
            const result = runHindi("async.hindi.js", `असिंक कार्य क() { फेंको नया बनाओ प्रकार_त्रुटि("गलत डेटा"); }\nक();\n`);
            assert.equal(result.code, 1);
            assert.match(result.output, /❌ प्रकार_त्रुटि \(TypeError\): गलत डेटा/);
            assert.match(result.output, /async\.hindi\.js:1:\d+/);
        },
    },
    {
        name: "message translation, suggestions and code frames",
        run() {
            assert.equal(translateMessage("Assignment to constant variable."), "स्थिर चर को दोबारा मान नहीं दिया जा सकता — 'नया' इस्तेमाल करें");
            assert.equal(translateMessage("something unusual"), null);
            assert.equal(suggestKeyword("अगार"), "अगर");
            assert.equal(suggestKeyword("सम"), null);
            assert.equal(codeFrame("क\nख\nग", 2, 1), "  1 | क\n> 2 | ख\n    | ^\n  3 | ग");
        },
    },
];

console.log("Running debugging tests...\n");

let passed = 0;
try {
    for (const test of tests) {
        process.stdout.write(`- ${test.name} `);
        try {
            test.run();
            console.log("OK");
            passed++;
        } catch (error) {
            console.log("FAILED");
            console.error(error);
            process.exitCode = 1;
        }
    }
} finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
}

console.log(`\nDebugging coverage passed: ${passed}/${tests.length}`);
