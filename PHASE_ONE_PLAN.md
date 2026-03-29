# Hindicode Phase One Plan

This document defines Phase 1 of Hindicode's long-term evolution.

Phase 1 is the foundation phase.

Its purpose is not to support everything immediately.
Its purpose is to transform Hindicode from a regex-powered package into the first real version of a Hindi-first JavaScript language layer.

## Phase 1 Name

Hindi JavaScript Core

## Phase 1 Goal

Build Hindicode as a real Hindi-authored language layer that:
- parses code intentionally instead of relying only on regex
- compiles cleanly to JavaScript
- supports real Node and browser-oriented JavaScript workflows
- is stable enough for early adopters to write useful programs in Hindi

## Core Principle

Phase 1 should optimize for:
- correctness
- clarity
- language design stability
- compiler foundation

Phase 1 should not try to solve every framework and every environment at once.

## Phase 1 Product Definition

At the end of Phase 1, Hindicode should be:
- a Hindi-first language that compiles to JavaScript
- able to run real `.hindi` or `.hindi.js` programs
- able to support core JavaScript semantics reliably
- usable for scripts, logic-heavy apps, and small Node/browser programs

At the end of Phase 1, Hindicode does not need full maturity for:
- React
- Angular
- build tool ecosystems
- editor language servers
- HTML/CSS templating
- non-JS targets

Those belong mostly to later phases.

## Phase 1 Scope

### In Scope

- language specification for Hindicode v1 core
- lexer/tokenizer
- parser or parser-backed syntax strategy
- AST transformation into JavaScript
- code generation
- source map planning or initial source map support
- CLI for run/check/transpile
- CommonJS execution support
- initial ESM design decisions, even if execution support is limited
- robust test architecture
- high-quality errors for syntax and translation issues
- documentation for contributors and users

### Out Of Scope

- full React integration
- Angular integration
- bundler plugins for all ecosystems
- browser playground
- full IDE ecosystem
- PHP target support
- CSS language support
- “translate every global API ever” ambition

## Phase 1 Success Criteria

Phase 1 is successful if all of these are true:

1. Hindicode no longer depends primarily on regex replacement for core parsing.
2. A Hindi source file can be parsed into a structured representation safely.
3. Core JavaScript features are supported through a stable language definition.
4. Users can run and transpile Hindicode files through a CLI.
5. Error messages are more useful than raw JavaScript failures.
6. Test coverage exists for syntax, runtime behavior, and edge cases.
7. The architecture is ready for Phase 2 integrations.

## User Stories For Phase 1

### Primary User Stories

- As a learner, I can write normal JavaScript logic using Hindi keywords and run it easily.
- As a Node developer, I can write scripts and small applications in Hindicode.
- As a browser-focused developer, I can write basic JavaScript logic in Hindi and compile it to JavaScript for browser use.
- As a contributor, I can add new language features without breaking existing translations.
- As a debugger, I can understand syntax/runtime failures clearly enough to fix my code.

### Secondary User Stories

- As a teacher, I can show Hindi examples that map clearly to JavaScript concepts.
- As an early adopter, I can inspect transpiled JavaScript output.
- As a maintainer, I can reason about feature support through docs and tests instead of guesswork.

## Phase 1 Deliverables

### Deliverable 1: Hindicode Language Spec v1

This should define:
- supported keywords
- supported operators
- literals
- module behavior
- syntax forms that are intentionally supported
- syntax forms that are intentionally unsupported in v1
- naming conventions for Hindi aliases
- error behavior expectations

Suggested output files:
- `docs/language-spec-v1.md`
- `docs/keyword-reference.md`
- `docs/compatibility-table.md`

### Deliverable 2: Compiler Core

This is the technical heart of Phase 1.

Required components:
- tokenizer
- parser or syntax-tree builder
- AST normalization strategy
- JS code generator
- diagnostic collection

Suggested folder structure:
- `src/lexer/`
- `src/parser/`
- `src/ast/`
- `src/compiler/`
- `src/diagnostics/`
- `src/cli/`

### Deliverable 3: CLI

Minimum commands:
- `hindicode run file.hindi.js`
- `hindicode transpile file.hindi.js`
- `hindicode check file.hindi.js`

Nice-to-have commands:
- `hindicode print file.hindi.js`
- `hindicode --watch`

### Deliverable 4: Runtime Interop

Phase 1 should preserve and improve:
- Node execution
- CommonJS interop
- browser-oriented transpile output

### Deliverable 5: Test System v2

Required layers:
- tokenizer tests
- parser tests
- AST transform tests
- output generation tests
- scenario tests
- fixture-based integration tests
- regression tests for previously broken syntax

### Deliverable 6: Documentation Set

Minimum docs:
- vision summary
- phase plan
- language spec
- feature support matrix
- architecture notes
- contributor guide
- “how to add a keyword” guide

## Recommended Phase 1 Architecture

## 1. Source Input

Input:
- `.hindi`
- `.hindi.js`

The compiler should read raw source as UTF-8 and preserve line/column locations.

## 2. Tokenization

Tokenizer responsibilities:
- identify identifiers
- identify Hindi keywords
- preserve strings/comments/regex/template literals correctly
- distinguish operators and punctuation
- track line and column positions

Why this matters:
- tokenization is the first major escape from regex fragility
- it enables better diagnostics
- it reduces accidental replacements

## 3. Parsing

Parser responsibilities:
- understand supported syntax forms
- produce a structured syntax tree
- validate grammar usage
- emit syntax diagnostics

Two possible approaches:

### Option A: Hindicode-specific parser
- more control
- more implementation work

### Option B: tokenize + map to JS-compatible source + reuse parser tools
- faster to reach value
- still better than raw regex-only translation

Recommended Phase 1 choice:
- start with tokenization plus a structured conversion pipeline
- avoid building a full parser from scratch if it delays delivery too much

## 4. Transformation

Transform Hindicode syntax into:
- normalized JavaScript-oriented AST
- or structured token stream that can generate JS safely

Responsibilities:
- keyword mapping
- phrase normalization
- module syntax normalization
- diagnostic handling for unsupported constructs

## 5. Code Generation

Outputs:
- JavaScript code
- optional source maps
- optional debug metadata

Need:
- stable formatting
- preserved semantics
- readable output for debugging

## 6. Runtime Execution

Phase 1 runtime execution modes:
- direct CLI execution
- CommonJS require hook compatibility layer
- transpile-first execution path

## Milestones

### Milestone 1: Language Definition Freeze

Goal:
- decide what Hindicode v1 core actually is

Tasks:
- finalize core keyword set
- define supported syntax list
- define unsupported syntax list
- define alias acceptance rules
- define initial file extension policy

Outputs:
- language spec draft
- compatibility table
- contributor rules for aliases

### Milestone 2: Tokenizer Prototype

Goal:
- parse source into reliable tokens

Tasks:
- tokenize Hindi identifiers
- tokenize keywords and phrases
- tokenize comments, strings, regex, templates
- attach source locations
- add tokenizer test suite

Outputs:
- tokenizer module
- token snapshot tests
- regression tests around boundary issues

### Milestone 3: Structured Compiler Pipeline

Goal:
- replace the current direct regex-first translation path with a structured pipeline

Tasks:
- implement token-to-output transform
- support current keyword inventory
- preserve template expression translation
- produce valid JS output
- compare output against existing behavior

Outputs:
- compile API
- debug print mode
- output tests

### Milestone 4: Diagnostics And Errors

Goal:
- make failures developer-friendly

Tasks:
- syntax diagnostics
- unsupported-feature diagnostics
- better runtime wrapping
- line/column error presentation
- optional Hindi and English error output strategy

Outputs:
- diagnostics engine
- documented error model

### Milestone 5: CLI

Goal:
- make Hindicode usable as a real tool

Tasks:
- implement `run`
- implement `transpile`
- implement `check`
- add help output
- add exit codes

Outputs:
- executable CLI
- CLI tests

### Milestone 6: Integration Fixtures

Goal:
- prove Hindicode works on realistic projects

Tasks:
- Node script fixture
- multi-file CommonJS fixture
- browser logic fixture
- JSON/file processing fixture
- error reporting fixture

Outputs:
- `tests/fixtures/`
- integration runner

### Milestone 7: Phase 1 Release Candidate

Goal:
- stabilize and prepare for wider usage

Tasks:
- close critical bugs
- freeze language spec v1
- verify CLI and docs
- verify tests in CI
- publish migration notes

Outputs:
- release checklist
- changelog
- v1-core release candidate

## Detailed Workstreams

## Workstream A: Language Design

Owner focus:
- semantics
- naming consistency
- long-term readability

Tasks:
- define keyword philosophy
- decide whether aliases are strict or permissive
- decide what counts as “Hindi-first enough”
- define natural-language forms carefully

Important design rule:
- do not add aliases casually without considering collisions and readability

## Workstream B: Compiler Engineering

Owner focus:
- tokenizer
- transform pipeline
- output generation
- diagnostics

Tasks:
- create compile function
- separate translation data from compiler logic
- build testable compiler stages
- preserve source positions

## Workstream C: Runtime / CLI

Owner focus:
- user execution experience
- developer ergonomics

Tasks:
- run files
- transpile files
- print JS output
- validate exit codes

## Workstream D: Testing

Owner focus:
- confidence
- regression prevention

Tasks:
- categorize tests by layer
- add fixtures
- add failure tests
- add unsupported-syntax tests

## Workstream E: Documentation

Owner focus:
- contributor onboarding
- product clarity

Tasks:
- language spec
- getting started
- feature support matrix
- architecture notes
- roadmap references

## Recommended Repository Evolution For Phase 1

Current repo is lightweight.

Recommended eventual structure:

```text
hindicode/
  src/
    cli/
    compiler/
    diagnostics/
    lexer/
    parser/
    runtime/
  tests/
    scenarios/
    spec/
    fixtures/
    integration/
    regression/
  docs/
    language-spec-v1.md
    keyword-reference.md
    compatibility-table.md
    contributor-guide.md
  index.js
  package.json
```

This does not need to happen all at once, but Phase 1 should move toward it.

## Suggested Testing Plan For Phase 1

### Test Layer 1: Tokenizer

Test:
- Hindi keyword tokenization
- English identifier preservation
- mixed Hindi/English identifiers
- strings/comments/regex/templates
- line and column tracking

### Test Layer 2: Translation / Transform

Test:
- token sequences convert to correct JS
- phrase priority
- operator mapping
- template expression handling
- module keyword normalization

### Test Layer 3: Execution

Test:
- script execution
- async flows
- classes and objects
- Node file handling
- browser-style transpiled logic

### Test Layer 4: Integration

Test:
- multi-file app
- CLI command behavior
- transpile output files
- diagnostics behavior

### Test Layer 5: Regression

Test:
- every previously reported bug
- every keyword boundary bug
- tricky syntax combinations

## Risks In Phase 1

### Risk 1: Over-scoping

Trying to support:
- React
- Angular
- Node
- browser
- bundlers
- IDE tooling

all in Phase 1 would likely slow everything down.

Mitigation:
- keep Phase 1 focused on compiler core and JS parity foundation

### Risk 2: Under-defining The Language

If language rules are vague, contributions become messy.

Mitigation:
- write spec before expanding too far

### Risk 3: Building Too Much Parser Too Soon

A full parser from scratch is ambitious.

Mitigation:
- use staged architecture
- start with tokenization and structured translation

### Risk 4: Alias Explosion

Too many loosely chosen aliases can hurt consistency.

Mitigation:
- define alias review rules

### Risk 5: Debugging Complexity

Compiler bugs can be harder to debug than regex bugs if architecture is unclear.

Mitigation:
- clear stages
- debug output mode
- snapshot tests

## Phase 1 Non-Negotiables

These should not be compromised:

- predictable behavior
- readable Hindi syntax
- reliable tests
- clear errors
- documented support boundaries

## Metrics For Phase 1

Track progress through:
- number of language features formally specified
- number of structured compiler stages completed
- number of scenario/spec/integration tests
- number of runtime error classes improved
- number of CLI workflows supported
- reduction in regex-only translation responsibility

## Phase 1 Exit Criteria

Phase 1 can be considered complete when:
- a compiler pipeline exists beyond regex-only replacement
- Hindicode CLI exists and works
- core JS semantics are supported with strong tests
- multi-file Node usage is proven
- browser-targeted transpilation is demonstrated
- docs are good enough for contributors to keep expanding safely

## Immediate Next Actions

1. Write `docs/language-spec-v1.md`
2. Decide file extension policy: `.hindi`, `.hindi.js`, or both
3. Design tokenizer output format
4. Create `src/` compiler skeleton
5. Add tokenizer test plan
6. Define CLI command contract
7. Create Phase 1 project board from this document

## Short Version

Phase 1 is about making Hindicode real.

Not bigger for the sake of bigger.
Not more aliases for the sake of more aliases.

Real means:
- defined
- parsed
- compiled
- testable
- debuggable
- usable
