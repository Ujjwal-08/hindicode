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

## Gap 1: Hindi-First Language Surface — ✅ Largely Closed

`npm run coverage` tracks 442 JavaScript keywords, operators, globals and built-in methods; all of them now have a Hindi alias (418 aliases, listed in `docs/keywords.md`). The 20 programs in `examples/programs` exercise every feature area and are 92% Hindi by word count (`npm run purity`).

### What is still English
- property names of options objects (`{ recursive: true }`, `{ method: "POST" }`) and event names
- Node module names and their less common methods (`fs.mkdtempSync`, `crypto.createHash`)
- Intl constructors (`Intl.NumberFormat`), iterator protocol fields (`next`, `value`, `done`), `error.message`

### Known trade-off
Keywords translate everywhere in code, including object keys (`{ नया: 1 }` → `{ let: 1 }`). Common Hindi words that are keywords (`जानकारी`, `नया`, `गणित`, `है`, `से`) can't be used as names or keys. `HC_KEYWORD_AS_NAME` catches declarations; object keys are not yet checked.

## Gap 2: Module Support — ✅ Closed

`hindicode run` detects ES module syntax (static import/export, `import.meta`, top-level await) and registers a Node.js loader hook (`src/runtime/esm-loader.mjs`) so `.hindi.js` files can import each other. Covered by `examples/programs/15_ES_मॉड्यूल.hindi.js`: named/default/namespace imports, re-exports (`निर्यात सबकुछ से`), CommonJS interop, dynamic `import()`, `import.meta`, top-level await.

### Remaining
- ESM files imported from plain `.js` ESM outside `hindicode run` need the loader registered manually
- named imports from CommonJS `.hindi.js` modules (only the default export is available)

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
