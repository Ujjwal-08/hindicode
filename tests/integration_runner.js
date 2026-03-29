const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

require("../index");
const { runCommand } = require("../src/cli");
const { compileHindiJS } = require("../src/compiler/compile");
const { cleanupFixtureOutputs, clearFixtureCache } = require("./fixture_utils");

const commonjsEntryFile = path.resolve(__dirname, "fixtures", "commonjs", "entry.hindi.js");
const browserFixtureFile = path.resolve(__dirname, "fixtures", "browser", "app.hindi.js");
const browserFetchFixtureFile = path.resolve(__dirname, "fixtures", "browser-fetch", "app.hindi.js");
const browserStorageFixtureFile = path.resolve(__dirname, "fixtures", "browser-storage", "app.hindi.js");
const browserEventsFixtureFile = path.resolve(__dirname, "fixtures", "browser-events", "app.hindi.js");
const nodeScriptFixtureFile = path.resolve(__dirname, "fixtures", "node-script", "app.hindi.js");
const nodeRuntimeFixtureFile = path.resolve(__dirname, "fixtures", "node-runtime", "app.hindi.js");
const jsonFixtureFile = path.resolve(__dirname, "fixtures", "json-processing", "app.hindi.js");
const domFixtureFile = path.resolve(__dirname, "fixtures", "dom", "app.hindi.js");

const fixtureFiles = [
    commonjsEntryFile,
    path.resolve(__dirname, "fixtures", "commonjs", "helper.hindi.js"),
    path.resolve(__dirname, "fixtures", "commonjs", "services", "calc.hindi.js"),
    path.resolve(__dirname, "fixtures", "commonjs", "data", "config.hindi.js"),
    browserFetchFixtureFile,
    browserStorageFixtureFile,
    browserEventsFixtureFile,
    nodeScriptFixtureFile,
    nodeRuntimeFixtureFile,
    path.resolve(__dirname, "fixtures", "node-runtime", "helper.hindi.js"),
    jsonFixtureFile,
    domFixtureFile,
];

function normalize(value) {
    return JSON.parse(JSON.stringify(value));
}

function createStorage() {
    return {
        store: {},
        getItem(key) {
            return this.store[key] ?? null;
        },
        setItem(key, value) {
            this.store[key] = value;
        },
    };
}

const tests = [
    {
        name: "loads a multi-file CommonJS graph through the runtime hook",
        run() {
            clearFixtureCache(fixtureFiles);
            const loaded = require(commonjsEntryFile);
            assert.deepEqual(loaded, {
                app: "Hindicode CommonJS",
                total: 30,
                doubled: 60,
                labeled: "Hindicode CommonJS: 30",
                env: "test",
                version: 1,
            });
        },
    },
    {
        name: "supports nested requires through the CLI run command",
        run() {
            clearFixtureCache(fixtureFiles);
            assert.equal(runCommand("run", commonjsEntryFile), 0);
            assert.deepEqual(process.__hindicode_fixture_result, {
                app: "Hindicode CommonJS",
                total: 30,
                doubled: 60,
                labeled: "Hindicode CommonJS: 30",
                env: "test",
                version: 1,
            });
        },
    },
    {
        name: "transpiles browser-oriented Hindicode into runnable JavaScript",
        async run() {
            const source = fs.readFileSync(browserFixtureFile, "utf8");
            const compiled = compileHindiJS(source, { filename: browserFixtureFile, mode: "transpile" });

            assert.match(compiled.code, /document\.title/);
            assert.match(compiled.code, /localStorage\.setItem/);
            assert.match(compiled.code, /fetch\("\/api\/browser"\)/);

            const window = {};
            const document = { title: "" };
            const localStorage = createStorage();

            const script = new vm.Script(`(async () => {\n${compiled.code}\n})()`);
            await script.runInNewContext({
                window,
                document,
                localStorage,
                fetch: async () => ({
                    json: async () => ({ status: "ok", items: [1, 2, 3] }),
                }),
                setTimeout,
                clearTimeout,
                console,
            });

            await new Promise((resolve) => setTimeout(resolve, 0));

            assert.deepEqual(normalize(window.__hindicode_browser_result), {
                title: "Hindicode Browser",
                theme: "light",
                status: "ok",
                count: 3,
            });
        },
    },
    {
        name: "covers fetch success and error browser flows",
        async run() {
            const source = fs.readFileSync(browserFetchFixtureFile, "utf8");
            const compiled = compileHindiJS(source, { filename: browserFetchFixtureFile, mode: "transpile" });

            assert.match(compiled.code, /fetch\('\/api\/success'\)/);
            assert.match(compiled.code, /fetch\('\/api\/fail'\)/);

            const window = {};
            const script = new vm.Script(`(async () => {\n${compiled.code}\n})()`);
            await script.runInNewContext({
                window,
                fetch: async (url) => {
                    if (url === '/api/success') {
                        return { json: async () => ({ message: 'loaded' }) };
                    }
                    throw new Error('network failed');
                },
                console,
            });

            await new Promise((resolve) => setTimeout(resolve, 0));
            assert.deepEqual(normalize(window.__hindicode_fetch_result), {
                success: 'loaded',
                error: 'network failed',
            });
        },
    },
    {
        name: "covers browser storage lifecycle through local and session storage",
        run() {
            const source = fs.readFileSync(browserStorageFixtureFile, "utf8");
            const compiled = compileHindiJS(source, { filename: browserStorageFixtureFile, mode: "transpile" });

            assert.match(compiled.code, /localStorage\.setItem/);
            assert.match(compiled.code, /sessionStorage\.setItem/);

            const window = {};
            const localStorage = createStorage();
            const sessionStorage = createStorage();
            const script = new vm.Script(compiled.code);
            script.runInNewContext({
                window,
                localStorage,
                sessionStorage,
                console,
            });

            assert.deepEqual(normalize(window.__hindicode_storage_result), {
                theme: 'light',
                language: 'hindi',
                token: 'abc123',
                missingProfile: null,
                missingSession: null,
                themeExists: true,
                tokenExists: true,
                missingValuesReturnNull: true,
            });
        },
    },
    {
        name: "covers browser event flows beyond a simple click",
        run() {
            const source = fs.readFileSync(browserEventsFixtureFile, "utf8");
            const compiled = compileHindiJS(source, { filename: browserEventsFixtureFile, mode: "transpile" });

            assert.match(compiled.code, /addEventListener\('input'/);
            assert.match(compiled.code, /addEventListener\('click'/);
            assert.match(compiled.code, /addEventListener\('submit'/);

            const handlers = {};
            const window = {};
            const document = {
                title: '',
                getElementById: () => ({
                    addEventListener(name, cb) { handlers[`form:${name}`] = cb; },
                }),
                querySelector: (selector) => ({
                    addEventListener(name, cb) { handlers[`${selector}:${name}`] = cb; },
                }),
            };

            const script = new vm.Script(compiled.code);
            script.runInNewContext({ window, document, console });

            handlers['input:input']({ target: { value: 'रीना' } });
            handlers['button:click']();
            handlers['form:submit']({ preventDefault() {} });

            assert.deepEqual(normalize(window.__hindicode_get_event_result()), {
                title: 'हिन्दी इवेंट परीक्षण',
                log: ['input:रीना', 'click:save', 'submit:done'],
            });
        },
    },
    {
        name: "runs a Node script fixture with argv env and file output behavior",
        run() {
            clearFixtureCache(fixtureFiles);
            const originalArgv = process.argv;
            const originalMode = process.env.HINDICODE_MODE;

            process.argv = [process.execPath, nodeScriptFixtureFile, "रीना"];
            process.env.HINDICODE_MODE = "prod";

            try {
                assert.equal(runCommand("run", nodeScriptFixtureFile), 0);
                assert.deepEqual(process.__hindicode_node_script_result, {
                    name: "रीना",
                    mode: "prod",
                    written: "रीना:prod",
                    outputFile: "script-output.txt",
                });
            } finally {
                process.argv = originalArgv;
                if (originalMode === undefined) {
                    delete process.env.HINDICODE_MODE;
                } else {
                    process.env.HINDICODE_MODE = originalMode;
                }
            }
        },
    },
    {
        name: "covers Node path fs and process regressions through a multi-file fixture",
        run() {
            clearFixtureCache(fixtureFiles);
            cleanupFixtureOutputs();

            const originalArgv = process.argv;
            const originalMode = process.env.HINDICODE_MODE;

            process.argv = [process.execPath, nodeRuntimeFixtureFile, "--phase1"];
            process.env.HINDICODE_MODE = "regression";

            try {
                assert.equal(runCommand("run", nodeRuntimeFixtureFile), 0);
                assert.deepEqual(process.__hindicode_node_runtime_result, {
                    cwdName: path.basename(process.cwd()),
                    mode: "regression",
                    helperLabel: "node-runtime-helper",
                    folderName: "node-runtime",
                    argvCount: 3,
                    beforeCleanup: true,
                    removedAfterRun: true,
                    outputFileName: "runtime-output.txt",
                });
            } finally {
                process.argv = originalArgv;
                if (originalMode === undefined) {
                    delete process.env.HINDICODE_MODE;
                } else {
                    process.env.HINDICODE_MODE = originalMode;
                }
            }
        },
    },
    {
        name: "processes JSON and files through a Node fixture",
        run() {
            clearFixtureCache(fixtureFiles);
            cleanupFixtureOutputs();

            assert.equal(runCommand("run", jsonFixtureFile), 0);

            const result = process.__hindicode_json_result;
            assert.equal(result.active, true);
            assert.equal(result.status, "सक्रिय");
            assert.equal(result.processed, true);
            assert.equal(result.length, 5);

            const writtenPath = path.resolve(path.dirname(jsonFixtureFile), "output.json");
            assert.ok(fs.existsSync(writtenPath), "Output file should exist");
            const writtenData = JSON.parse(fs.readFileSync(writtenPath, "utf8"));
            assert.deepEqual(writtenData, result);
        },
    },
    {
        name: "transpiles and runs advanced DOM interaction logic in a mock context",
        async run() {
            const source = fs.readFileSync(domFixtureFile, "utf8");
            const compiled = compileHindiJS(source, { filename: domFixtureFile, mode: "transpile" });

            assert.match(compiled.code, /document\.getElementById/);
            assert.match(compiled.code, /document\.querySelector/);
            assert.match(compiled.code, /addEventListener\('click'/);

            const root = { innerHTML: "" };
            const window = {};
            const document = {
                title: "",
                getElementById: () => root,
                querySelector: () => ({ addEventListener: () => {} }),
            };

            const script = new vm.Script(compiled.code);
            script.runInNewContext({
                window,
                document,
                console,
            });

            const result = window.__hindicode_dom_result;
            assert.equal(result.title, "हिन्दी कोड DOM");
            assert.equal(result.html, "<h1>नमस्ते दुनिया</h1>");
        },
    },
    {
        name: "verifies CLI behavior against integration fixtures",
        run() {
            const write = process.stdout.write;
            let output = "";
            process.stdout.write = (chunk) => {
                output += chunk;
                return true;
            };

            try {
                assert.equal(runCommand("transpile", jsonFixtureFile), 0);
                assert.equal(runCommand("check", jsonFixtureFile), 0);
            } finally {
                process.stdout.write = write;
            }

            assert.match(output, /JSON\.parse/);
            assert.match(output, /OK: app\.hindi\.js/);

            const brokenFile = path.resolve(__dirname, "fixtures", "diagnostics", "broken.hindi.js");
            assert.throws(() => runCommand("check", brokenFile), (error) => error.code === "HC_JS_SYNTAX_ERROR");
        },
    },
];

console.log("Running integration tests...\n");

(async () => {
    let passed = 0;
    for (const test of tests) {
        process.stdout.write(`- ${test.name} `);
        try {
            await test.run();
            console.log("OK");
            passed++;
        } catch (error) {
            console.log("FAILED");
            console.error(error);
            process.exit(1);
        }
    }

    clearFixtureCache(fixtureFiles);
    cleanupFixtureOutputs();
    console.log(`\nIntegration coverage passed: ${passed}/${tests.length}`);
})();
