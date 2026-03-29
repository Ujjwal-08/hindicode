# Hindicode CLI Usage

This document describes the Phase 1 CLI surface for Hindicode.

## Commands

### `hindicode run <file>`

Runs a Hindicode source file.

Current intent:
- load `.hindi.js` files through the Hindicode runtime
- execute the compiled JavaScript immediately
- preserve the simple script-oriented workflow users already have

Example:
```powershell
hindicode run app.hindi.js
```

### `hindicode transpile <file>`

Prints the generated JavaScript to stdout.

Use this when you want to:
- inspect the generated output
- debug translation issues
- experiment with browser-oriented output

Example:
```powershell
hindicode transpile app.hindi.js
```

### `hindicode check <file>`

Validates that a Hindicode file compiles into valid JavaScript.

Use this when you want:
- a fast syntax/translation check
- CI validation
- structured diagnostics without running the program

Example:
```powershell
hindicode check app.hindi.js
```

## Exit Codes

Phase 1 behavior:
- `0` for successful command completion
- `1` for invalid input or compile/runtime-facing CLI failures

## Diagnostics

CLI errors are moving toward structured compiler diagnostics.

Current behavior includes:
- diagnostic code
- filename when available
- line and column for compile-time syntax validation
- human-readable message
- optional hint text

Example diagnostic shape:
```text
[error] HC_JS_SYNTAX_ERROR at path\\to\\file.hindi.js:3:10: Unexpected token '{'
Hint: Run hindicode transpile to inspect generated JavaScript around this location.
```

## Current Phase 1 Limits

The CLI is intentionally small right now.

Not yet implemented:
- watch mode
- output-to-file mode
- stdin mode
- print alias
- config file support

## Recommended Usage In Phase 1

Best supported today:
- single-file scripts
- multi-file CommonJS-style `.hindi.js` programs
- transpile-and-inspect workflows
- early browser-targeted transpilation experiments

## Examples

### Validate a file
```powershell
hindicode check tests\\01_basics.hindi.js
```

### Run a file
```powershell
hindicode run tests\\fixtures\\commonjs\\entry.hindi.js
```

### Print JavaScript output
```powershell
hindicode transpile tests\\fixtures\\browser\\app.hindi.js
```
