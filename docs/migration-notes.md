# Hindicode Migration Notes

This document tracks the transition from the original runtime translator toward the Phase 1 compiler pipeline.

## Old Model

Earlier Hindicode centered on:
- a direct runtime translator in `index.js`
- keyword replacement driven mostly by one translation flow
- `.hindi.js` require-hook execution

## Current Phase 1 Model

Hindicode now uses staged modules:
- keyword inventory in `src/language/keywords.js`
- tokenizer in `src/compiler/tokenizer.js`
- parser strategy layer in `src/parser/index.js`
- compile orchestration in `src/compiler/compile.js`
- runtime registration in `src/runtime/register.js`
- CLI entrypoints in `src/cli/`

## What Stayed Compatible

These workflows still work:
- `require('hindicode')`
- `.hindi.js` runtime execution
- existing numbered scenario tests

## What Improved

- structured compiler API
- CLI support
- parser-stage result contract
- line/column-aware syntax diagnostics
- multi-file integration coverage
- browser-targeted transpilation fixtures

## What To Watch During Further Migration

- parser behavior replacing more of the old translation logic
- future AST/source-map work
- ESM story
- contributor expectations for adding aliases and tests
