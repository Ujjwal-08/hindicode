const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const { compileHindiJS, translateHindiJS } = require("../compiler/compile");
const { createDiagnostic, formatDiagnostic } = require("../diagnostics");
const { registerHindiExtension } = require("../runtime/register");
const { formatRuntimeError } = require("../diagnostics/runtime");

function printHelp() {
    console.log(`hindicode <command> <file>

Commands:
  run <file>         Run a Hindicode file
  transpile <file>   Print transpiled JavaScript
  check <file>       Validate a Hindicode file compiles
`);
}

function resolveInputFile(filePath) {
    if (!filePath) {
        throw createDiagnostic({
            code: "HC_CLI_NO_INPUT",
            message: "No input file provided.",
            hint: "Use hindicode <command> <file>.",
        });
    }

    const resolved = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(resolved)) {
        throw createDiagnostic({
            code: "HC_CLI_FILE_NOT_FOUND",
            file: resolved,
            message: "Input file does not exist.",
            hint: "Check the path or run the command from the project root.",
        });
    }

    return resolved;
}

// Uncaught errors (including unhandled promise rejections) are printed with a
// Hindi message and a code frame. Programs with their own handler keep control.
function installErrorReporter(io = console) {
    process.on("uncaughtException", function hindicodeErrorReporter(error) {
        if (process.listenerCount("uncaughtException") > 1) return;
        io.error(formatRuntimeError(error));
        process.exit(1);
    });
}

// ES module entry: register the .hindi.js loader hook, then import the file.
function runModule(resolved) {
    const nodeModule = require("module");
    if (typeof nodeModule.register !== "function") {
        throw createDiagnostic({
            code: "HC_ESM_UNSUPPORTED_NODE",
            file: resolved,
            message: `Running ES modules needs Node.js 20.6 or newer (current: ${process.version}).`,
            hint: "Upgrade Node.js, or use CommonJS (मांगो / मॉड्यूल.exports).",
        });
    }

    nodeModule.register(pathToFileURL(path.join(__dirname, "../runtime/esm-loader.mjs")));
    return import(pathToFileURL(resolved).href).then(() => 0);
}

function runCommand(command, filePath) {
    if (!command || command === "--help" || command === "-h") {
        printHelp();
        return 0;
    }

    const resolved = resolveInputFile(filePath);

    if (command === "run") {
        // Map stack traces back to the Hindi source, and report crashes in Hindi.
        if (typeof process.setSourceMapsEnabled === "function") process.setSourceMapsEnabled(true);
        registerHindiExtension({ quiet: true });
        installErrorReporter();
        const entry = compileHindiJS(fs.readFileSync(resolved, "utf8"), { filename: resolved, mode: "runtime" });

        if (entry.meta.format === "module") {
            return runModule(resolved);
        }

        require(resolved);
        return 0;
    }

    const source = fs.readFileSync(resolved, "utf8");

    if (command === "transpile") {
        // Always print the translation, even when it does not compile: that is
        // exactly when people need to see it.
        try {
            process.stdout.write(compileHindiJS(source, { filename: resolved, mode: command }).code);
            return 0;
        } catch (error) {
            process.stdout.write(translateHindiJS(source, { filename: resolved }));
            throw error;
        }
    }

    const result = compileHindiJS(source, { filename: resolved, mode: command });

    if (command === "check") {
        for (const diagnostic of result.diagnostics) {
            console.warn(formatDiagnostic(diagnostic));
        }
        console.log(`OK: ${path.basename(resolved)}`);
        return 0;
    }

    throw createDiagnostic({
        code: "HC_CLI_UNKNOWN_COMMAND",
        message: `Unknown command: ${command}`,
        hint: "Use --help to see supported commands.",
    });
}

module.exports = {
    formatDiagnostic,
    runCommand,
};
