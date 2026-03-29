# CLI Quick Reference

## Commands

```powershell
hindicode run app.hindi.js
hindicode check app.hindi.js
hindicode transpile app.hindi.js
```

## What Each Command Does

- `run`: executes a `.hindi.js` file through the runtime hook
- `check`: compiles and validates syntax without running the file
- `transpile`: prints generated JavaScript to stdout

## Common Phase 1 Workflows

Check a file:

```powershell
hindicode check tests\01_basics.hindi.js
```

Run a file:

```powershell
hindicode run tests\fixtures\commonjs\entry.hindi.js
```

Inspect generated JavaScript:

```powershell
hindicode transpile tests\fixtures\browser\app.hindi.js
```

## Current Phase 1 Limits

- input must be a file path
- no watch mode yet
- no stdin mode yet
- no output-file flag yet
- `run` is focused on `.hindi.js` runtime execution
