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
    frame = null,
    ...extra
}) {
    return {
        code,
        message,
        severity,
        file,
        start,
        end,
        hint,
        frame,
        ...extra,
    };
}

function formatDiagnostic(diagnostic) {
    const location = diagnostic.file
        ? `${diagnostic.file}:${diagnostic.start.line}:${diagnostic.start.column}`
        : `line ${diagnostic.start.line}, column ${diagnostic.start.column}`;

    const frame = diagnostic.frame ? `\n${diagnostic.frame}` : "";
    const hint = diagnostic.hint ? `\nHint: ${diagnostic.hint}` : "";
    return `[${diagnostic.severity}] ${diagnostic.code} at ${location}: ${diagnostic.message}${frame}${hint}`;
}

module.exports = {
    createDiagnostic,
    createSourceLocation,
    DiagnosticSeverity,
    formatDiagnostic,
};
