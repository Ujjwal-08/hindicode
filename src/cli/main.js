const { formatDiagnostic, runCommand } = require("./index");

function runCli(argv = process.argv, io = console) {
    try {
        const [, , command, filePath] = argv;
        const exitCode = runCommand(command, filePath);
        return typeof exitCode === "number" ? exitCode : 0;
    } catch (error) {
        if (error && error.code && error.message) {
            io.error(formatDiagnostic(error));
        } else {
            io.error(error.message);
        }
        return 1;
    }
}

module.exports = {
    runCli,
};
