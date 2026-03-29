const fs = require("fs");
const path = require("path");

function clearFixtureCache(files) {
    for (const file of files) {
        delete require.cache[file];
    }
    delete process.__hindicode_fixture_result;
    delete process.__hindicode_node_script_result;
    delete process.__hindicode_node_runtime_result;
    delete process.__hindicode_json_result;
}

function cleanupFixtureOutputs() {
    const filesToCleanup = [
        path.resolve(__dirname, "fixtures", "node-script", "script-output.txt"),
        path.resolve(__dirname, "fixtures", "node-runtime", "runtime-output.txt"),
        path.resolve(__dirname, "fixtures", "json-processing", "output.json"),
    ];

    for (const file of filesToCleanup) {
        if (fs.existsSync(file)) {
            try {
                fs.unlinkSync(file);
            } catch (error) {
                // Ignore cleanup errors in tests
            }
        }
    }
}

module.exports = {
    cleanupFixtureOutputs,
    clearFixtureCache,
};
