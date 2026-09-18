export interface SourceLocation {
    line: number;
    column: number;
    index: number;
}

export interface Diagnostic {
    code: string;
    message: string;
    severity: "error" | "warning" | "info";
    file: string | null;
    start: SourceLocation;
    end: SourceLocation;
    hint: string | null;
    /** Source excerpt with a caret under the problem. */
    frame: string | null;
    /** For HC_POSSIBLE_TYPO: the word and the keyword it probably should be. */
    word?: string;
    suggestion?: string;
}

export interface SourceMapV3 {
    version: 3;
    file: string;
    sources: string[];
    sourcesContent: string[];
    names: string[];
    mappings: string;
}

export interface CompileOptions {
    filename?: string;
    mode?: string;
}

export interface CompileResult {
    code: string;
    /** Source map from the generated JavaScript back to the Hindi source. */
    map: SourceMapV3;
    /** Warnings (errors are thrown as a Diagnostic). */
    diagnostics: Diagnostic[];
    meta: {
        filename: string | null;
        mode: string;
        format: "commonjs" | "module";
        parserStrategy: string;
        parserStage: string;
    };
}

/**
 * Transpiles Hindi JavaScript code to standard JavaScript.
 * @param code - The Hindi JavaScript code string.
 */
export function translateHindiJS(code: string, options?: CompileOptions): string;

/**
 * Compiles and validates Hindi JavaScript. Throws a `Diagnostic` on errors.
 */
export function compileHindiJS(code: string, options?: CompileOptions): CompileResult;

/** Formats a compile diagnostic with location, code frame and hint. */
export function formatDiagnostic(diagnostic: Diagnostic): string;

/** Formats a runtime error in Hindi, with a code frame from the .hindi.js source. */
export function formatRuntimeError(error: unknown): string;

/** Registers the `.hindi.js` require hook (done automatically on `require("hindicode")`). */
export function registerHindiExtension(options?: { quiet?: boolean }): void;

/** Every Hindi keyword and the JavaScript it becomes. */
export const hindiToJS: Readonly<Record<string, string>>;

/** All keyword spellings, longest first. */
export const sortedKeywords: readonly string[];

export function tokenizeSource(source: string): Array<{
    type: string;
    value: string;
    start: number;
    end: number;
    startLoc: SourceLocation;
    endLoc: SourceLocation;
}>;
