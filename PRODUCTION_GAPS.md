# Hindicode Production Gaps

This file tracks what is still missing for Hindicode to feel trustworthy to a working JavaScript developer.

The goal is not just “can a demo run?”

The real goal is:
- can someone author real programs naturally in Hindi
- can they debug failures
- can they scale beyond a single file
- can they use normal JavaScript environments and tools

## Current Strengths

Based on the current codebase, Hindicode already does a lot well:

- keyword translation for a useful core slice of JavaScript
- protection for comments, strings, regex literals, and template strings
- `.hindi.js` require hook for direct execution in Node
- good educational examples from basics to moderate complexity
- spec-style tests for language and runtime behavior
- support for common arrays, objects, classes, async flows, Node basics, and mocked browser basics

That is a strong foundation.

The remaining gaps are mainly about completeness, reliability, and ecosystem usability.

## Gap 1: Hindi-First Language Surface Is Incomplete

Today, a lot of JavaScript can be written in Hindi, but not “everything and anything” naturally.

### What exists now
- control flow basics
- common declarations
- common literals
- some OOP and async terms
- several array/object/string helpers
- some Node/browser globals

### What is still thin
- many built-in methods still require English method names
- many common developer idioms still mix Hindi keywords with English APIs
- some JavaScript constructs are only symbol-based, not phrase-based

### Specific missing language areas
- `for...of`
- `for...in` Hindi-first phrasing
- `default` in broader usage patterns
- `try` with richer promise rejection patterns
- `Promise.race`
- `Promise.allSettled`
- `Promise.finally`
- `Array.some`
- `Array.every`
- `Array.flat`
- `Array.flatMap`
- `Array.at`
- `String.slice`
- `String.match`
- `String.padStart`
- `String.padEnd`
- `Object.fromEntries`
- `Object.seal`
- `Object.hasOwn`
- `Number.isNaN`
- `Number.isFinite`
- `parseInt`
- `parseFloat`
- `BigInt`
- `Symbol`
- `WeakMap`
- `WeakSet`
- `URL`
- `URLSearchParams`
- `AbortController`

### Why it matters

If users must constantly drop back to English APIs, Hindicode feels like partial localization rather than a full Hindi coding environment.

## Gap 2: Module Support Is Only Halfway There

The dictionary includes module keywords like:
- `आयात`
- `निर्यात`
- `डिफ़ॉल्ट`
- `से`

But operationally, the package is still centered on a CommonJS require hook.

### Missing pieces
- real ESM loader support
- multi-file import/export test fixtures
- package boundary behavior
- mixed `.js` and `.hindi.js` module graphs
- default export and named export execution coverage
- dynamic import coverage

### Why it matters

Modern JavaScript increasingly assumes ESM. Without a module story, Hindicode is limited mostly to Node CommonJS scripts.

## Gap 3: Translator Architecture Will Hit Limits

The translator is currently regex-driven.

That is smart and efficient for the current scope, but it creates scaling risk.

### What regex does well here
- simple keyword swapping
- protected regions
- phrase priority
- quick runtime translation

### Where regex becomes risky
- parser-sensitive syntax additions
- more module forms
- future JavaScript proposals
- nested syntax interactions
- frontend syntax like JSX
- advanced error localization

### Risk categories
- false positives
- false negatives
- syntax breakage in edge cases
- difficult debugging when translation goes wrong

### Likely future pivot

At some point Hindicode will likely benefit from:
- tokenization
- a real lexer
- an AST transform layer
- optional source map generation

## Gap 4: Production Debugging Experience Is Weak

Right now failures surface as raw JavaScript syntax/runtime errors after translation.

### Missing debugging capabilities
- source maps
- Hindi-aware stack traces
- translated syntax errors
- clearer error positioning
- translator diagnostics for unknown or suspicious Hindi keywords
- debug mode that prints transpiled output cleanly

### Why it matters

A language layer feels real when debugging feels real. Production users care about failure clarity as much as feature support.

## Gap 5: Tooling Surface Is Minimal

The package exposes:
- `index.js`
- `index.d.ts`
- a require hook

It does not yet expose a broader workflow.

### Missing tooling
- CLI runner
- watch mode
- print-transpiled mode
- lint/prettier integration story
- syntax highlighting story
- VS Code extension
- config file for alias packs or strict mode
- CI templates for users

### Suggested tooling roadmap
- `hindicode run file.hindi.js`
- `hindicode transpile file.hindi.js`
- `hindicode check file.hindi.js`
- `hindicode --watch`

## Gap 6: Ecosystem Integration Is Mostly Untested

Hindicode currently proves isolated code paths, but not mainstream app stacks.

### Missing integration targets
- Express
- Fastify
- Node `http`
- React
- Vite
- Webpack
- esbuild
- Jest
- Vitest
- Mocha
- Playwright
- Next.js

### Why it matters

People do not only write language demos. They write APIs, CLIs, frontend apps, tests, and tooling.

## Gap 7: TypeScript Story Is Bare Minimum

There is a very small `index.d.ts`, but no real interop guidance.

### Missing TS-related pieces
- how Hindicode fits into TS projects
- whether `.hindi.js` can coexist with `.ts`
- whether transpilation output can feed TS tooling
- authoring guidance for editors and autocomplete
- richer type definitions for package APIs

## Gap 8: Browser Story Is Still Mock-Centric

The current tests cover mocked browser flows, which is useful, but not enough.

### Missing browser capabilities
- real DOM mutation patterns
- event propagation patterns
- fetch error handling
- storage lifecycle semantics
- bundler-based browser execution
- script tag / browser loader story

## Gap 9: Node Story Is Good For Scripts, Not Yet Full Apps

Current Node coverage is strongest around file scripts and core helpers.

### Missing Node production coverage
- HTTP server apps
- EventEmitter
- streams
- crypto
- worker threads
- child processes
- URL handling
- env/argv heavy CLI flows

## Gap 10: Documentation Does Not Yet Match The Ambition

If the long-term vision is “anything JavaScript can do, Hindicode can do in Hindi,” the docs need to support that vision clearly.

### Missing docs
- full keyword inventory reference
- supported vs unsupported feature table
- migration guide
- architecture notes
- contribution guidelines for adding keywords safely
- release checklist for new keyword additions
- compatibility status by environment

## Priority Recommendations

### Highest leverage
- define a formal language surface roadmap
- expand keyword inventory intentionally by category
- add cross-file module fixtures
- add CLI tooling
- improve debugging output

### Highest production value
- multi-file Node apps
- HTTP server fixture
- test-runner integration
- bundler/browser fixture
- error-reporting improvements

### Highest technical-risk reduction
- move toward token-based parsing
- add regression fixtures around translation boundaries
- add snapshot-style translation tests for tricky syntax

## Decision Points To Resolve Eventually

### 1. What is Hindicode?

Pick one primary identity:
- educational Hindi syntax layer
- fully usable Hindi-authored JavaScript dialect
- transpiler ecosystem with tooling

It can be all three eventually, but one should lead roadmap decisions.

### 2. How far should Hindi localization go?

Possible approaches:
- only keywords
- keywords plus common built-ins
- keywords plus broad API aliasing
- almost fully Hindi standard library naming layer

### 3. Does Hindicode stay runtime-only?

Possible approaches:
- runtime require hook only
- optional ahead-of-time transpilation
- full CLI and build integration

### 4. Does Hindicode remain regex-based?

Possible approaches:
- keep regex and grow carefully
- tokenize first, parse later
- adopt parser infrastructure sooner

## Near-Term Backlog Candidates

- Hindi phrasing for `for...of`
- Promise helper expansion
- common additional array/string/object aliases
- multi-file CommonJS fixture
- ESM experiment branch
- CLI spike
- debug output mode
- source map design notes
