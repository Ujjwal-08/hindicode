const { compileHindiJS, tokenizeSource, translateHindiJS } = require("./src/compiler/compile");
const { registerHindiExtension } = require("./src/runtime/register");
const { hindiToJS, sortedKeywords } = require("./src/language/keywords");

registerHindiExtension();

module.exports = {
    compileHindiJS,
    hindiToJS,
    registerHindiExtension,
    sortedKeywords,
    tokenizeSource,
    translateHindiJS,
};
