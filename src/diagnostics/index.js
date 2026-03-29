const DiagnosticSeverity = {
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
};

function createSourceLocation(line = 1, column = 1, index = 0) {
    return { line, column, index };
}

function createDiagnostic({
    code,
    message,
    severity = DiagnosticSeverity.ERROR,
    file = null,
    start = createSourceLocation(),
    end = start,
    hint = null,
}) {
    return {
        code,
        message,
        severity,
        file,
        start,
        end,
        hint,
    };
}

function formatDiagnostic(diagnostic) {
    const location = diagnostic.file
        ? `${diagnostic.file}:${diagnostic.start.line}:${diagnostic.start.column}`
        : `line ${diagnostic.start.line}, column ${diagnostic.start.column}`;

    const hint = diagnostic.hint ? `\nHint: ${diagnostic.hint}` : "";
    return `[${diagnostic.severity}] ${diagnostic.code} at ${location}: ${diagnostic.message}${hint}`;
}

module.exports = {
    createDiagnostic,
    createSourceLocation,
    DiagnosticSeverity,
    formatDiagnostic,
};
