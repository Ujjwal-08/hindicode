// Source maps for Hindicode output.
//
// Translation only swaps words and never adds or removes line breaks, so every
// generated line maps to the same source line. Within a line there is a segment
// at the start of every word and punctuation mark (debuggers and stack traces
// resolve a position to the nearest segment at or before it) and at both ends
// of every replaced keyword.

const BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const TOKEN_START = /[\u0900-\u097F\w$]+|\S/g;

function encodeVLQ(value) {
    let vlq = value < 0 ? (-value << 1) | 1 : value << 1;
    let encoded = "";
    do {
        let digit = vlq & 31;
        vlq >>>= 5;
        if (vlq > 0) digit |= 32;
        encoded += BASE64[digit];
    } while (vlq > 0);
    return encoded;
}

// Walks source and edits together, calling onSegment(line, genCol, srcCol)
// (all 0-based) wherever a mapping boundary is needed.
function walkMappings(source, edits, onSegment) {
    let line = 0;
    let genCol = 0;
    let srcCol = 0;
    let position = 0;

    // Unchanged text on the current line: same text, so columns move together.
    const copySpan = (end) => {
        for (const match of source.slice(position, end).matchAll(TOKEN_START)) {
            onSegment(line, genCol + match.index, srcCol + match.index);
        }
        genCol += end - position;
        srcCol += end - position;
        position = end;
    };

    const copyUntil = (end) => {
        while (position < end) {
            const newline = source.indexOf("\n", position);
            if (newline === -1 || newline >= end) {
                copySpan(end);
                return;
            }
            copySpan(newline);
            position = newline + 1;
            line += 1;
            genCol = 0;
            srcCol = 0;
            onSegment(line, 0, 0);
        }
    };

    onSegment(0, 0, 0);
    for (const edit of edits) {
        copyUntil(edit.start);
        onSegment(line, genCol, srcCol);
        genCol += edit.text.length;
        srcCol += edit.end - edit.start;
        position = edit.end;
        onSegment(line, genCol, srcCol);
    }
    copyUntil(source.length);
}

function buildSourceMap(source, edits, { file = "output.js", sourceName = "input.hindi.js" } = {}) {
    const lines = [];
    walkMappings(source, edits, (line, genCol, srcCol) => {
        (lines[line] ||= []).push({ genCol, srcCol });
    });

    // genCol resets per line; source index, line and column are relative to the
    // previous segment across the whole map. No "names": Node would use them to
    // rename functions in stack traces.
    let previousSrcLine = 0;
    let previousSrcCol = 0;
    const mappings = [];

    for (let line = 0; line < lines.length; line++) {
        let previousGenCol = 0;
        let lastGenCol = -1;
        const segments = [];

        for (const segment of (lines[line] || []).sort((a, b) => a.genCol - b.genCol)) {
            if (segment.genCol === lastGenCol) continue;
            lastGenCol = segment.genCol;
            segments.push(
                encodeVLQ(segment.genCol - previousGenCol) +
                    encodeVLQ(0) +
                    encodeVLQ(line - previousSrcLine) +
                    encodeVLQ(segment.srcCol - previousSrcCol)
            );
            previousGenCol = segment.genCol;
            previousSrcLine = line;
            previousSrcCol = segment.srcCol;
        }
        mappings.push(segments.join(","));
    }

    return {
        version: 3,
        file,
        sources: [sourceName],
        sourcesContent: [source],
        names: [],
        mappings: mappings.join(";"),
    };
}

function toBase64(text) {
    if (typeof Buffer !== "undefined") return Buffer.from(text, "utf8").toString("base64");
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
}

function inlineSourceMapComment(map) {
    return `\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${toBase64(JSON.stringify(map))}`;
}

// Maps a 1-based generated (line, column) to the source column on the same line.
function createPositionMapper(source, edits) {
    const byLine = new Map();
    walkMappings(source, edits, (line, genCol, srcCol) => {
        if (!byLine.has(line)) byLine.set(line, []);
        byLine.get(line).push({ genCol, srcCol });
    });

    return (line, column) => {
        const segments = byLine.get(line - 1) || [{ genCol: 0, srcCol: 0 }];
        let best = segments[0];
        for (const segment of segments) {
            if (segment.genCol <= column - 1 && segment.genCol >= best.genCol) best = segment;
        }
        return { line, column: best.srcCol + (column - 1 - best.genCol) + 1 };
    };
}

module.exports = {
    buildSourceMap,
    createPositionMapper,
    encodeVLQ,
    inlineSourceMapComment,
};
