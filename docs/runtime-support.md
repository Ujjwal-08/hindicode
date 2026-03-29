# Hindicode Runtime Support Expectations

This document defines what Phase 1 should promise for CommonJS, ESM expectations, and browser-targeted usage.

## CommonJS Support Expectations

Phase 1 CommonJS support is expected to be strong.

### Supported expectations
- `.hindi.js` files can be loaded in Node through the Hindicode runtime hook
- a Hindicode file can `मांगो()` other `.hindi.js` modules
- nested requires should work in multi-file programs
- `module.exports`-style exports should work reliably
- script-style Node usage should work for small apps and utilities

### Examples that Phase 1 should support
- helper modules
- service modules
- config modules
- file processing scripts
- env/argv-driven small scripts

## ESM Support Expectations

Phase 1 ESM expectations are intentionally limited.

### Current expectation
- Hindi ESM keywords may translate at source level
- runtime execution should not yet be promised as fully supported
- ESM should be treated as a Phase 1 design and fixture area, not a stable execution guarantee

### Not yet fully promised
- full ESM runtime support
- loader-based ESM execution
- mixed advanced module resolution edge cases
- bundler-managed ESM graphs

## Browser-Targeted Support Expectations

Phase 1 browser support is expected to be transpile-oriented, not runtime-loader-oriented.

### Supported expectations
- Hindicode can compile browser-oriented source into valid JavaScript
- translated output can use browser globals such as:
  - `document`
  - `window`
  - `localStorage`
  - `fetch`
  - timers
- generated code should be usable in a browser-like runtime when those globals exist

### Intended workflow
- author Hindicode source
- transpile to JavaScript
- run the generated output in browser tooling or a browser-compatible environment

## Browser Limitations In Phase 1

Not yet fully promised:
- native browser loader for Hindicode source
- framework-specific integrations
- JSX support
- DOM API localization beyond current aliases
- source-map-grade browser debugging everywhere
- full browser framework ecosystems

## Module Support Boundary

Hindicode Phase 1 should confidently support:
- Node/CommonJS execution
- browser-targeted transpilation

It should not yet over-promise:
- React support
- Angular support
- full ESM parity

## Why This Boundary Matters

This keeps Phase 1 realistic.

A strong Phase 1 should prove:
- Hindicode is a usable language layer for JavaScript
- it works well in Node today
- it can produce browser-usable JavaScript output
- the architecture is ready for broader ecosystem expansion later
