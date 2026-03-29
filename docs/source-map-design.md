# Hindicode Source Map Design Notes

This document captures the Phase 1 source-map design direction.

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
