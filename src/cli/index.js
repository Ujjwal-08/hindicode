const fs = require("fs");
const path = require("path");

const { compileHindiJS } = require("../compiler/compile");
const { createDiagnostic, formatDiagnostic } = require("../diagnostics");
const { registerHindiExtension } = require("../runtime/register");

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

function runCommand(command, filePath) {
    if (!command || command === "--help" || command === "-h") {
        printHelp();
        return 0;
    }

    const resolved = resolveInputFile(filePath);

    if (command === "run") {
        registerHindiExtension();
        require(resolved);
        return 0;
    }

    const source = fs.readFileSync(resolved, "utf8");
    const result = compileHindiJS(source, { filename: resolved, mode: command });

    if (command === "transpile") {
        process.stdout.write(result.code);
        return 0;
    }

    if (command === "check") {
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
