// Detects ES module syntax in already-translated JavaScript.
// Static import/export statements or import.meta mean the file must run as ESM.
const MODULE_SYNTAX = /^[ \t]*(?:import\s*(?:[\w$*{]|["'])|export\s|.*\bimport\.meta\b)/m;

function isModuleSyntax(code) {
    return MODULE_SYNTAX.test(code);
}

module.exports = {
    isModuleSyntax,
};
