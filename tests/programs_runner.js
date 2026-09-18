// Runs every example program in examples/programs through the real CLI
// (`hindicode run`) in its own process, and checks it passes its self-tests.
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const bin = path.join(__dirname, "..", "bin", "hindicode.js");
const programsDir = path.join(__dirname, "..", "examples", "programs");
const programs = fs
    .readdirSync(programsDir)
    .filter((file) => /^\d+_.*\.hindi\.js$/.test(file))
    .sort();

console.log("Running Hindi example programs...\n");

let passed = 0;
let checks = 0;
const failures = [];

for (const program of programs) {
    process.stdout.write(`- ${program} `);
    try {
        const output = execFileSync(process.execPath, [bin, "run", program], {
            cwd: programsDir,
            encoding: "utf8",
            timeout: 60000,
            stdio: ["ignore", "pipe", "pipe"],
        });
        const summary = output.match(/✅ .+: (\d+) जाँचें सफल/);
        if (!summary) throw new Error(`no success line in output:\n${output}`);
        checks += Number(summary[1]);
        passed++;
        console.log(`OK (${summary[1]} checks)`);
    } catch (error) {
        console.log("FAILED");
        failures.push({ program, error: error.stderr || error.message });
    }
}

// Browser example: it must at least compile.
const { compileHindiJS } = require("../index");
const browserApp = path.join(__dirname, "..", "examples", "browser", "ऐप.hindi.js");
compileHindiJS(fs.readFileSync(browserApp, "utf8"), { filename: browserApp });
console.log("- examples/browser/ऐप.hindi.js OK (compiles)");

for (const failure of failures) {
    console.error(`\n✖ ${failure.program}\n${failure.error}`);
}

console.log(`\nProgram coverage passed: ${passed}/${programs.length} (${checks} checks)`);
if (failures.length) process.exit(1);
