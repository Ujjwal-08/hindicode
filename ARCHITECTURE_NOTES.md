# Hindicode Architecture Notes

This file describes how the project works today and where the architecture can evolve.

## Current Architecture

The current package is moving from a regex-driven runtime helper toward a staged compiler pipeline.

Today the runtime/compiler flow is:

1. `src/language/keywords.js` provides the Hindi keyword inventory
2. `src/compiler/tokenizer.js` splits source into code and protected tokens
3. `src/parser/index.js` applies the Phase 1 parser strategy
4. `src/compiler/compile.js` validates generated JavaScript and returns compiler metadata
5. `src/runtime/register.js` keeps `.hindi.js` runtime loading working
6. CLI and tests use the same compiler path

## Current Phase 1 Parser Strategy

Phase 1 is not building a full grammar parser first.

The active strategy is:
- tokenize Hindicode source first
- preserve protected regions such as comments, strings, regex literals, and templates
- run a structured token-transform phase for CODE tokens
- recursively transform template-literal expressions
- return a parse-result object that records strategy and transformed output
- validate generated JavaScript before execution

This means Phase 1 currently uses a parser-backed structure layer, but not a full AST grammar parser yet.

### Why this strategy is chosen

It gives Hindicode a safer foundation than raw global regex replacement while avoiding the implementation cost of a full parser too early.

It is a practical bridge between:
- the original regex-first runtime package
- a future token-aware or AST-aware compiler pipeline

### Current parse result contract

The parser layer returns a result object with:
- `source`
- `tokens`
- `transformedCode`
- `ast` (currently `null` in Phase 1)
- `diagnostics`
- `strategy`
- `meta`

This contract is important because it gives the compiler a stable place to grow into:
- parser diagnostics
- AST output
- source maps
- richer validation stages

## Current Core Components

### `src/language/keywords.js`

Responsibilities:
- define keyword map
- sort phrases longest-first
- centralize language-surface aliases

### `src/compiler/tokenizer.js`

Responsibilities:
- identify protected regions
- preserve source positions
- prepare token streams for the parser/transform layer

Strengths:
- safer than naive replacement
- supports source-aware diagnostics work

Current limitations:
- still not a full grammar parser
- regex-vs-division edge handling is still heuristic

### `src/parser/index.js`

Responsibilities:
- define the Phase 1 parser strategy
- transform token streams into JavaScript-oriented output
- return a structured parse result

Strengths:
- establishes a real parser contract for Phase 1
- separates token transformation from runtime glue

Current limitations:
- no AST yet
- no grammar validation beyond generated-JS validation
- no parser-specific diagnostics yet

### `src/compiler/compile.js`

Responsibilities:
- call tokenizer and parser stages
- validate generated JavaScript
- return compiler metadata and diagnostics

### `src/runtime/register.js`

Current behavior:
- intercept `.hindi.js`
- compile through the shared compiler path
- execute through Node module loading

Benefits:
- keeps current users unblocked during the compiler transition

Tradeoffs:
- still CommonJS oriented
- still runtime-first for execution

## Current Testing Architecture

### Scenario path
- real `.hindi.js` files
- direct execution through the runtime hook
- human-readable demonstrations

### Spec path
- Hindi snippets executed in VM
- exact assertions on runtime values
- direct inspection of translation behavior

### Integration path
- fixture directories under `tests/fixtures/`
- multi-file CommonJS coverage
- browser-targeted transpile coverage
- diagnostics fixtures
- Node script fixtures

## Current testing gaps in architecture

- no parser-specific test suite yet
- no snapshot tests for parse results
- no ESM fixtures yet
- no framework/bundler integration fixtures yet

## Architectural Risks

### Risk 1: Token transform growth

As more aliases and syntax forms are added:
- transform rules will grow
- phrase collisions become more likely
- parser-stage clarity becomes more important

### Risk 2: Syntax evolution

Modern JS evolves quickly.

Potential stress points:
- new operators
- new module forms
- decorators
- import attributes
- parser-sensitive constructs

### Risk 3: Environment expansion

Once Hindicode supports:
- CLI
- browser bundlers
- ESM
- frameworks

Phase 1's token-transform parser may need to evolve into a richer grammar-aware parser.

## Possible Future Architecture Paths

### Path A: Continue Phase 1 token-transform parser

Best for:
- incremental compiler growth
- stable backward compatibility
- fast expansion of validated syntax support

### Path B: Add parser validation layer on top of token transform

Best for:
- grammar diagnostics
- unsupported-syntax reporting
- better contributor confidence

### Path C: Move toward AST-backed parsing

Best for:
- source maps
- future syntax support
- industrial-grade tooling

Tradeoff:
- much more implementation complexity

## Recommended Architecture Steps

1. keep keyword inventory separated from compiler logic
2. keep tokenizer, parser, compiler, runtime, and CLI concerns distinct
3. add parser-specific tests and parse-result snapshots
4. add validation-stage abstraction between transform and execution
5. explore AST migration only after Phase 1 parser strategy is stable

## Non-Goals To Keep Explicit

To avoid accidental overreach, it may help to decide which of these are not current goals:
- replacing all English method names immediately
- supporting every browser/framework instantly
- promising full JavaScript parity before module/tooling gaps are solved
