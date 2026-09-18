const { formatDiagnostic, runCommand } = require("./index");
const { formatRuntimeError } = require("../diagnostics/runtime");

function reportError(error, io) {
    if (error && typeof error.code === "string" && error.code.startsWith("HC_")) {
        io.error(formatDiagnostic(error));
    } else {
        io.error(formatRuntimeError(error));
    }
}

function runCli(argv = process.argv, io = console) {
    try {
        const [, , command, filePath] = argv;
        const exitCode = runCommand(command, filePath);

        if (exitCode && typeof exitCode.then === "function") {
            // ES module run: errors surface asynchronously
            exitCode.catch((error) => {
                reportError(error, io);
                process.exitCode = 1;
            });
            return 0;
        }

        return typeof exitCode === "number" ? exitCode : 0;
    } catch (error) {
        reportError(error, io);
        return 1;
    }
}

module.exports = {
    runCli,
};
