const TOKEN_TYPES = {
    CODE: "code",
    LINE_COMMENT: "line_comment",
    BLOCK_COMMENT: "block_comment",
    STRING_SINGLE: "string_single",
    STRING_DOUBLE: "string_double",
    TEMPLATE: "template",
    REGEX: "regex",
};

function isEscaped(source, index) {
    let backslashes = 0;
    for (let i = index - 1; i >= 0 && source[i] === "\\"; i--) {
        backslashes++;
    }
    return backslashes % 2 === 1;
}

function isRegexAllowedAfter(previousNonWhitespace) {
    if (!previousNonWhitespace) {
        return true;
    }

    return /[=([{:,;!?&|+\-*/%^<>~]/.test(previousNonWhitespace);
}

function readQuoted(source, start, quote) {
    let index = start + 1;

    while (index < source.length) {
        if (source[index] === quote && !isEscaped(source, index)) {
            return index + 1;
        }
        index++;
    }

    return source.length;
}

function readLineComment(source, start) {
    let index = start + 2;
    while (index < source.length && source[index] !== "\n") {
        index++;
    }
    return index;
}

function readBlockComment(source, start) {
    let index = start + 2;
    while (index < source.length) {
        if (source[index] === "*" && source[index + 1] === "/") {
            return index + 2;
        }
        index++;
    }
    return source.length;
}

function readRegex(source, start) {
    let index = start + 1;
    let inCharClass = false;

    while (index < source.length) {
        const char = source[index];

        if (char === "[" && !isEscaped(source, index)) {
            inCharClass = true;
        } else if (char === "]" && !isEscaped(source, index)) {
            inCharClass = false;
        } else if (char === "/" && !inCharClass && !isEscaped(source, index)) {
            index++;
            while (/[a-z]/i.test(source[index] || "")) {
                index++;
            }
            return index;
        }

        index++;
    }

    return source.length;
}

function readTemplate(source, start) {
    let index = start + 1;

    while (index < source.length) {
        const char = source[index];

        if (char === "`" && !isEscaped(source, index)) {
            return index + 1;
        }

        if (char === "$" && source[index + 1] === "{" && !isEscaped(source, index)) {
            index += 2;
            let depth = 1;

            while (index < source.length && depth > 0) {
                const inner = source[index];

                if ((inner === "'" || inner === '"') && !isEscaped(source, index)) {
                    index = readQuoted(source, index, inner);
                    continue;
                }

                if (inner === "`" && !isEscaped(source, index)) {
                    index = readTemplate(source, index);
                    continue;
                }

                if (inner === "{" && !isEscaped(source, index)) {
                    depth++;
                } else if (inner === "}" && !isEscaped(source, index)) {
                    depth--;
                }

                index++;
            }

            continue;
        }

        index++;
    }

    return source.length;
}

function getLocation(source, index) {
    let line = 1;
    let column = 1;

    for (let i = 0; i < index; i++) {
        if (source[i] === "\n") {
            line++;
            column = 1;
        } else {
            column++;
        }
    }

    return { line, column, index };
}

function createToken(source, type, start, end) {
    return {
        type,
        value: source.slice(start, end),
        start,
        end,
        startLoc: getLocation(source, start),
        endLoc: getLocation(source, end),
    };
}

function tokenizeSource(source) {
    const tokens = [];
    let codeStart = 0;
    let index = 0;
    let previousNonWhitespace = "";

    const pushCode = (end) => {
        if (end > codeStart) {
            tokens.push(createToken(source, TOKEN_TYPES.CODE, codeStart, end));
        }
    };

    const pushProtected = (type, start, end) => {
        pushCode(start);
        tokens.push(createToken(source, type, start, end));
        codeStart = end;
        index = end;
    };

    while (index < source.length) {
        const char = source[index];
        const next = source[index + 1];

        if (char === "/" && next === "/") {
            pushProtected(TOKEN_TYPES.LINE_COMMENT, index, readLineComment(source, index));
            continue;
        }

        if (char === "/" && next === "*") {
            pushProtected(TOKEN_TYPES.BLOCK_COMMENT, index, readBlockComment(source, index));
            continue;
        }

        if (char === "'" || char === '"') {
            const type = char === "'" ? TOKEN_TYPES.STRING_SINGLE : TOKEN_TYPES.STRING_DOUBLE;
            pushProtected(type, index, readQuoted(source, index, char));
            continue;
        }

        if (char === "`") {
            pushProtected(TOKEN_TYPES.TEMPLATE, index, readTemplate(source, index));
            continue;
        }

        if (char === "/" && isRegexAllowedAfter(previousNonWhitespace)) {
            pushProtected(TOKEN_TYPES.REGEX, index, readRegex(source, index));
            continue;
        }

        if (!/\s/.test(char)) {
            previousNonWhitespace = char;
        }

        index++;
    }

    pushCode(source.length);
    return tokens;
}

module.exports = {
    TOKEN_TYPES,
    tokenizeSource,
};
