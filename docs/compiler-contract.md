# Hindicode Compiler And Parser Contract

This document defines the current Phase 1 compiler contract.

## Compiler Stages

Phase 1 currently uses these stages:

1. Source load
2. Tokenization
3. Parser strategy layer (`token-transform`)
4. JavaScript validation
5. Runtime execution or CLI output

## Phase 1 Parser Strategy

Phase 1 uses a structured token-transform parser strategy.

This means:
- source is tokenized first
- protected regions are preserved as tokens
- code tokens are transformed using the Hindi keyword inventory
- template literal expressions are recursively transformed
- the parser returns a parse-result object instead of only a raw string

This is not yet a full AST grammar parser.

## Parse Result Format

The parser returns an object with these fields:

- `source`: original source text
- `tokens`: tokenizer output
- `transformedCode`: generated JavaScript string for this stage
- `ast`: currently `null` in Phase 1
- `diagnostics`: parser-stage diagnostics array
- `strategy`: parser strategy id, currently `token-transform`
- `meta`: parser metadata

### Parse Result Meta

Current `meta` shape:
- `filename`
- `parserStage`

Current parser stage value:
- `phase-one-token-transform`

## Parser Diagnostics Format

Parser diagnostics should follow the shared diagnostic model.

Expected fields:
- `code`
- `message`
- `severity`
- `file`
- `start`
- `end`
- `hint`

In the current implementation, parser diagnostics are an array on the parse result and are empty unless parser-stage validation adds entries.

## Compiler Input Contract

`compileHindiJS(source, options)` currently expects:
- `source`: UTF-8 Hindicode source string
- `options.filename`: optional source filename
- `options.mode`: optional compile mode such as `runtime`, `check`, or `transpile`

## Compiler Output Contract

`compileHindiJS()` returns:
- `code`: generated JavaScript
- `map`: source map placeholder, currently `null`
- `diagnostics`: compile-time diagnostics
- `meta`: compiler metadata
- `parseResult`: parser-stage result object

## Compiler Metadata Shape

Current compiler metadata includes:
- `filename`
- `mode`
- `parserStrategy`
- `parserStage`

## Source Location Strategy

Tokenizer tokens track:
- `start`
- `end`
- `startLoc`
- `endLoc`

Location objects currently include:
- `line`
- `column`
- `index`

These locations are the Phase 1 basis for better diagnostics and future source maps.

## Compile Options Contract

Current supported compile options:
- `filename`
- `mode`

Future likely additions:
- source-map mode
- debug-output mode
- strict validation mode

## Current Limitations

Phase 1 contract still has these gaps:
- no AST output yet
- no parser-specific diagnostics yet
- no source maps yet
- generated JS validation still relies on Node syntax validation
