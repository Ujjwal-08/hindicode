# Hindicode New Features Backlog

This file is a future-facing feature inventory.

Use it when deciding what to build next.

The idea is simple:
- each feature should make Hindicode more natural
- more complete
- easier to debug
- easier to adopt in real projects

## Feature Bucket 1: Hindi Language Expansion

These features make code feel more fully Hindi-authored.

### Control Flow
- Hindi-first `for...of` phrasing
- Hindi-first `for...in` phrasing
- richer `switch` patterns with fallthrough examples
- keyword aliases for common natural variants users may type

### Async
- aliases for `Promise.race`
- aliases for `Promise.allSettled`
- alias or pattern support for `Promise.finally`
- more Hindi examples for retry and timeout flows

### Arrays
- aliases for `some`
- aliases for `every`
- aliases for `flat`
- aliases for `flatMap`
- aliases for `at`
- aliases for `findIndex`

### Strings
- aliases for `slice`
- aliases for `match`
- aliases for `matchAll`
- aliases for `padStart`
- aliases for `padEnd`
- aliases for `charAt`

### Objects
- aliases for `fromEntries`
- aliases for `seal`
- aliases for `hasOwn`
- aliases for `getOwnPropertyNames`

### Numbers and Parsing
- aliases for `parseInt`
- aliases for `parseFloat`
- aliases for `isNaN`
- aliases for `isFinite`
- aliases for integer/decimal helpers

### Modern JS Types
- `BigInt`
- `Symbol`
- `WeakMap`
- `WeakSet`
- `URL`
- `URLSearchParams`
- `AbortController`

## Feature Bucket 2: Runtime And Execution

These features make Hindicode easier to run in real projects.

### CLI
- `hindicode run app.hindi.js`
- `hindicode transpile app.hindi.js`
- `hindicode check app.hindi.js`
- `hindicode --watch`
- `hindicode --print`

### Modules
- multi-file CommonJS support validation
- official ESM loader
- mixed module graph support
- `import`/`export` fixture projects

### Error Experience
- Hindi-friendly parser messages
- better runtime error wrapping
- line/column friendly transpiler errors
- optional raw transpiled output dump

## Feature Bucket 3: Tooling

### Editor Experience
- VS Code syntax highlighting
- snippets for Hindi keywords
- autocomplete dictionary
- hover docs for Hindi keywords

### Formatting And Linting
- Prettier strategy
- ESLint integration guidance
- static checking for unknown Hindi aliases
- lint rule for unsupported syntax hints

### Build Integration
- Vite plugin
- Webpack loader
- esbuild plugin
- Babel plugin or compatibility layer

## Feature Bucket 4: Framework Integration

### Node / Backend
- Express example project
- Fastify example project
- Node HTTP example
- CLI starter example

### Frontend
- browser demo app
- React starter
- DOM utility examples
- fetch/error/loading examples

### Testing Ecosystem
- Jest example
- Vitest example
- Mocha example

## Feature Bucket 5: Reliability Features

### Translator Safety
- stricter translation diagnostics
- snapshot tests for tricky syntax
- keyword collision reports
- optional strict mode for unsupported patterns

### Architecture
- tokenization prototype
- AST transform prototype
- source map support
- ahead-of-time transpilation mode

## Good First Features

These are high-value and relatively approachable:
- add more built-in method aliases
- add `for...of` Hindi support
- add multi-file tests
- add CLI runner
- add transpiled-output debug mode

## High-Impact Features

These change adoption more significantly:
- ESM support
- source maps
- VS Code extension
- Vite/Webpack integration
- Express/React sample apps

## Stretch Features

These are ambitious but exciting:
- Hindi-localized error explanations
- Hindi language server support
- optional AST-backed parser
- browser playground
- online REPL

## Feature Evaluation Checklist

Before adding a new feature, ask:

1. Does it make Hindi code feel more natural?
2. Does it increase real-world JavaScript coverage?
3. Can it be tested with both translation and execution tests?
4. Does it increase regex-parser risk?
5. Does it need docs/examples at the same time?

## Recommended Next Feature Sequence

1. Expand standard library aliases
2. Add `for...of`
3. Add multi-file module fixtures
4. Add CLI
5. Improve errors
6. Prototype ESM
7. Explore source maps




Phase 1: “Hindi JavaScript”
Build a lexer/parser, keep JS parity as the main goal, support Node + browser.
Phase 2: “Production Hindicode”
Add source maps, CLI, modules, bundler plugins, testing integrations.
Phase 3: “Framework Hindicode”
Add React/Vite/Jest support and real app templates.
Phase 4: “Multi-target Hindicode”
Explore HTML/template tooling, CSS helpers, maybe non-JS targets later.
