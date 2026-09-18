# Hindicode Source Map Design Notes

**Status: implemented** in `src/compiler/source-map.js`. The parser records every keyword replacement as an edit
(`parseResult.edits`); `buildSourceMap()` turns source + edits into a v3 map with a segment at every word and at both
ends of each replacement. Translation never changes line breaks, so lines map 1:1. `compileHindiJS()` returns the map,
the require hook / ESM loader / browser runtime inline it, and `hindicode run` enables Node source-map support.

The original Phase 1 design notes follow.

## Why Source Maps Matter

Hindicode compiles Hindi-authored source to JavaScript.

Without source maps, debugging becomes harder because runtime errors point at generated JavaScript instead of the original Hindicode source.

## Phase 1 Goal

Phase 1 does not need full source-map implementation yet, but it should define the design clearly.

## Current Inputs Available

The compiler already has useful ingredients:
- original source text
- token boundaries
- token source locations
- parse-result metadata
- generated JavaScript output

## Phase 1 Design Direction

A future source-map stage should map:
- generated JS segments
- back to original Hindicode line/column positions

Most useful early strategy:
- line/column mappings at token boundaries
- start with code-token transformations
- keep protected tokens aligned where possible

## Likely Implementation Path

1. extend parse-result metadata with mapping records
2. record generated segment spans during transform
3. emit source map object alongside `code`
4. expose map in `compileHindiJS()` output
5. add CLI option for writing map files

## Hard Areas

- recursive template-literal expression translation
- multi-word phrase replacement length differences
- future AST-based transforms
- module/bundler integration

## Phase 1 Non-Goal

Do not block the compiler foundation waiting for perfect source-map support.

The right Phase 1 deliverable is:
- design clarity
- compiler contract readiness
- a future-friendly data model
