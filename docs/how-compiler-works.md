# How The Hindicode Compiler Works

This document explains the current Phase 1 compiler workflow.

## Pipeline Overview

1. Source input
2. Tokenization
3. Parser strategy stage
4. JavaScript validation
5. Runtime execution or CLI output

## 1. Source Input

Hindicode currently works primarily with `.hindi.js` source files.

The compiler receives:
- source text
- optional filename
- compile mode (`runtime`, `check`, `transpile`)

## 2. Tokenization

`src/compiler/tokenizer.js` splits source into tokens.

Important token families:
- code
- line comments
- block comments
- strings
- template literals
- regex literals

The tokenizer also records source positions.

## 3. Parser Strategy Stage

`src/parser/index.js` currently uses the Phase 1 `token-transform` strategy.

This stage:
- transforms only code tokens
- leaves protected tokens untouched
- recursively translates template literal expressions
- returns a parse-result object

## 4. JavaScript Validation

`src/compiler/compile.js` validates generated JavaScript using Node's parser.

If invalid syntax is produced, Hindicode returns a structured diagnostic with:
- code
- filename
- line
- column
- message
- hint

## 5. Runtime Or CLI Output

From there the output is used by:
- `src/runtime/register.js` for `.hindi.js` execution
- `src/cli/index.js` and `src/cli/main.js` for CLI workflows

## Current Limits

The Phase 1 compiler is still not:
- a full AST parser
- a source-map-enabled compiler
- a complete ESM runtime loader

It is, however, now more structured than the original regex-only runtime translation approach.
