# Hindicode Phase One Checklist

This file is the execution checklist for Phase 1.

Use it as the working source of truth for:
- what has already been completed
- what still needs to be built
- what marks Phase 1 as fully complete

Tick boxes as work gets done.

## Phase 1 Title

Hindi JavaScript Core

## Phase 1 Mission

Make Hindicode a real Hindi-first JavaScript language layer with:
- structured compilation
- stable runtime behavior
- CLI-based usage
- better diagnostics
- strong tests
- docs that support further expansion

## How To Use This File

- `[x]` means completed
- `[ ]` means not yet completed
- if a task is partly done, keep it unchecked until it is truly complete

---

## 1. Product Definition

- [x] Write a dedicated Phase 1 planning document
- [ ] Write a short `VISION.md` for Hindicode long-term direction
- [ ] Write a short `ROADMAP.md` for phase-based evolution
- [ ] Define the exact purpose of Phase 1 in one clear paragraph
- [ ] Define target users for Phase 1
- [ ] Define what Phase 1 explicitly does not try to solve
- [ ] Define the supported environments for Phase 1
- [ ] Define the output target of Hindicode in Phase 1
- [ ] Define the meaning of “Hindi-first JavaScript”
- [ ] Freeze the Phase 1 scope

## 2. Language Specification

- [x] Create `docs/language-spec-v1.md`
- [ ] Define valid file extensions for Hindicode
- [ ] Decide whether `.hindi`, `.hindi.js`, or both are official
- [x] Define core syntax categories
- [x] Define supported control flow syntax
- [x] Define supported declaration syntax
- [x] Define supported async syntax
- [x] Define supported OOP syntax
- [x] Define supported module syntax
- [x] Define supported operators
- [x] Define supported literals
- [x] Define unsupported syntax for v1
- [ ] Define alias philosophy
- [ ] Define phrase-priority rules
- [ ] Define identifier boundary rules
- [ ] Define how Hindi and English identifiers may coexist
- [ ] Define whether alias sets should be strict or permissive
- [ ] Define when a Hindi alias should be rejected due to ambiguity
- [ ] Create `docs/keyword-reference.md`
- [ ] Create `docs/compatibility-table.md`

## 3. Keyword Inventory Management

- [x] Move keyword data into a dedicated module
- [ ] Categorize keywords by feature area in documentation
- [ ] Review all current keywords for naming consistency
- [ ] Remove or flag duplicate mappings where needed
- [ ] Add comments or metadata for why aliases exist
- [ ] Identify unsafe or collision-prone aliases
- [ ] Identify missing must-have aliases for v1 core
- [ ] Decide which aliases are “official”
- [ ] Decide which aliases are “experimental”
- [ ] Define process for adding new aliases safely
- [ ] Add automated validation for duplicate or conflicting aliases
- [ ] Add tests that fail when keyword order introduces regressions

## 4. Compiler Foundation

- [x] Create a `src/` foundation for compiler-related code
- [x] Create a shared compile entrypoint
- [x] Define internal compiler stages clearly
- [x] Define compile input and output interfaces
- [x] Define diagnostic object shape
- [x] Define compiler metadata shape
- [ ] Define debug output shape
- [x] Define source location tracking strategy
- [x] Add compile options contract
- [x] Add compiler-stage documentation

## 5. Tokenizer

- [x] Create tokenizer module
- [x] Define token types formally
- [x] Define tokenizer API in docs
- [x] Ensure tokenizer preserves source positions
- [ ] Tokenize Hindi identifiers correctly
- [ ] Tokenize English identifiers correctly
- [x] Tokenize mixed Hindi-English identifiers correctly
- [ ] Tokenize whitespace intentionally
- [ ] Tokenize punctuation intentionally
- [ ] Tokenize operators intentionally
- [x] Tokenize line comments
- [x] Tokenize block comments
- [x] Tokenize single-quoted strings
- [x] Tokenize double-quoted strings
- [x] Tokenize template literals
- [ ] Tokenize nested template expressions robustly
- [x] Tokenize regex literals robustly
- [ ] Distinguish regex from division more reliably
- [x] Add tokenizer snapshot tests
- [ ] Add tokenizer regression tests
- [x] Add tokenizer line/column tests
- [ ] Add tokenizer tests for malformed input behavior

## 6. Parsing Strategy

- [x] Decide Phase 1 parsing strategy
- [x] Decide whether to build a full parser or structured token transform first
- [x] Document parser strategy in architecture docs
- [ ] Define supported grammar forms
- [ ] Define unsupported grammar forms
- [x] Add parser or syntax-structure layer skeleton
- [x] Add parse result format
- [x] Add parser diagnostics format
- [x] Add parser tests for valid syntax
- [x] Add parser tests for invalid syntax
- [x] Add parser tests for keyword phrases
- [x] Add parser tests for nested expressions

## 7. Structured Translation Pipeline

- [ ] Reduce dependence on monolithic regex translation
- [ ] Move keyword translation into structured stages
- [ ] Keep protected regions safe without relying on global replacement alone
- [ ] Translate template literal expressions through structured pipeline
- [ ] Translate multi-word phrases safely
- [ ] Preserve formatting as much as practical
- [ ] Preserve semantics in nested expressions
- [ ] Add compile-to-JS regression tests
- [ ] Add tricky syntax conversion tests
- [ ] Add translation snapshots for important cases
- [ ] Compare old translator output with new pipeline output
- [ ] Decide when the legacy translation path can be retired

## 8. Diagnostics And Errors

- [x] Define diagnostic severity levels
- [x] Define syntax error format
- [ ] Define unsupported-feature error format
- [x] Define internal compiler error format
- [x] Include filename in diagnostics
- [x] Include line and column in diagnostics
- [ ] Include helpful code-frame style output
- [x] Improve current runtime hook error reporting
- [ ] Add Hindi-friendly diagnostic wording strategy
- [ ] Decide whether errors should be bilingual or Hindi-only
- [x] Add diagnostics tests
- [x] Add tests for bad syntax in `.hindi.js`
- [ ] Add tests for unsupported feature reporting
- [ ] Add tests for incorrect keyword usage

## 9. Code Generation

- [ ] Define JS code generation strategy
- [ ] Define formatting expectations for generated code
- [ ] Add codegen stage abstraction
- [ ] Add generated code readability checks
- [ ] Preserve stable output for debugging
- [ ] Add code generation snapshot tests
- [x] Add source map design
- [ ] Add initial source map support
- [ ] Add source map tests

## 10. Runtime Support

- [x] Move runtime registration into a dedicated module
- [x] Keep `.hindi.js` execution working through require hook
- [ ] Decide if runtime hook remains default long-term
- [ ] Add transpile-first execution path
- [ ] Add safer runtime module loading path
- [x] Add tests for multi-file runtime loading
- [x] Add tests for nested requires
- [ ] Add tests for runtime compilation failures
- [ ] Add debug flag for showing transpiled output before execution

## 11. CLI

- [x] Add CLI binary scaffold
- [x] Add `hindicode run`
- [x] Add `hindicode transpile`
- [x] Add `hindicode check`
- [x] Add CLI help output
- [x] Add CLI usage docs
- [x] Add CLI tests for success cases
- [x] Add CLI tests for failure cases
- [x] add proper exit code coverage
- [ ] Add `hindicode print` alias or equivalent
- [ ] Add `hindicode --watch`
- [ ] Add output-to-file option
- [ ] Add stdin support
- [ ] Add quiet mode
- [ ] Add debug mode

## 12. Test System Upgrade

- [x] Keep existing test suite passing during refactor
- [x] Add spec-style tests for broader compatibility
- [x] Add auto-discovery for numbered scenario tests
- [ ] Split tests into clearer categories over time
- [ ] Add `tests/spec/` structure
- [ ] Add `tests/integration/` structure
- [ ] Add `tests/regression/` structure
- [x] Add `tests/fixtures/` structure
- [ ] Add snapshot-style translation tests
- [x] Add tokenizer-specific test files
- [x] Add parser-specific test files
- [ ] Add compiler-stage tests
- [x] Add diagnostic tests
- [x] Add CLI tests
- [ ] Add source map tests

## 13. Scenario Coverage

- [x] Cover basics
- [x] Cover control flow
- [x] Cover functions
- [x] Cover arrays
- [x] Cover objects and classes
- [x] Cover async and promises
- [x] Cover error handling
- [x] Cover string and math helpers
- [x] Cover protection edge cases
- [x] Cover destructuring and spread
- [x] Cover collections
- [x] Cover Node basics
- [x] Cover browser mocks
- [x] Cover generators and advanced control features
- [x] Cover production-style Node pipelines
- [ ] Add multi-file CommonJS graph scenario
- [ ] Add HTTP server scenario
- [ ] Add EventEmitter scenario
- [ ] Add stream pipeline scenario
- [ ] Add CLI args scenario
- [ ] Add promise rejection scenario
- [ ] Add optional chaining scenario
- [ ] Add nullish coalescing scenario
- [ ] Add ESM smoke scenario

## 14. Integration Fixtures

- [x] Create fixture-based test strategy
- [x] Add multi-file CommonJS fixture
- [x] Add browser-targeted transpile fixture
- [x] Add Node script fixture
- [x] Add JSON/file-processing fixture
- [x] Add diagnostics fixture with intentionally broken code
- [x] Add CLI fixture tests
- [x] Add fixture runner

## 15. Module System

- [x] Define CommonJS support expectations
- [x] Define ESM support expectations
- [ ] Add real tests for import/export syntax
- [ ] Add named export fixture
- [ ] Add default export fixture
- [ ] Add mixed module graph fixture
- [ ] Decide if ESM execution is Phase 1 required or Phase 2
- [x] Document module support clearly

## 16. Browser-Targeted Support

- [x] Define Phase 1 browser support expectations
- [x] Add transpile examples that run in browser-oriented JS
- [x] Add DOM interaction fixture
- [x] Add fetch success/error fixture
- [x] Add storage fixture
- [x] Add storage edge-case coverage
- [x] Add event fixture beyond simple click


## 17. Node-Focused Support

- [x] Define Phase 1 Node support expectations
- [x] Add multi-file Node app fixture
- [x] Add CLI/script fixture
- [x] Add path/fs/process regression tests
- [ ] Add error stack behavior checks
- [x] Add environment variable fixture
- [x] Add argv/command parsing fixture
- [x] Add Node runtime helper fixture coverage

## 18. Documentation

- [x] Create Phase 1 plan doc
- [x] Create production gaps doc
- [x] Create new features backlog doc
- [x] Create architecture notes doc
- [x] Create language surface backlog doc
- [x] Create detailed test matrix doc
- [x] Create `docs/getting-started.md`
- [x] Create contributor guide
- [x] Create “how to add a keyword” guide
- [x] Create “how the compiler works” guide
- [x] Create CLI usage guide
- [x] Create migration notes from current runtime translator
- [x] Update README to reflect compiler direction

## 18.5 Newly Added Phase 1 Tasks

- [x] Add src/parser/ scaffold for Phase 1 parser strategy
- [ ] Add compiler validation stage abstraction between translate and execute
- [x] Add fixture cleanup/isolation utilities for integration tests

## 19. Repo Structure Cleanup

- [ ] Decide long-term `src/` folder structure
- [ ] Decide long-term `tests/` folder structure
- [ ] Create `docs/` folder if needed
- [ ] Move legacy test helpers into clearer structure
- [ ] Separate runtime, compiler, language, and CLI concerns cleanly
- [ ] Remove unused imports and old leftovers
- [ ] Remove legacy-only code once replaced safely

## 20. Backward Compatibility

- [ ] Define what current users must not lose
- [x] Keep current `require('hindicode')` story working during transition
- [x] Keep `.hindi.js` require hook stable during Phase 1
- [ ] Document any breaking changes before release
- [x] Add tests that protect existing public behavior

## 21. Release Engineering

- [ ] Define Phase 1 release criteria
- [ ] Define pre-release checklist
- [ ] Define migration notes format
- [ ] Define semantic versioning expectations
- [ ] Add release notes template for compiler milestones
- [ ] Prepare a release candidate checklist

## 22. Design Decisions To Explicitly Resolve

- [ ] Decide official Phase 1 file extension policy
- [ ] Decide if Hindicode is strict or permissive with aliases
- [ ] Decide if diagnostics are Hindi-only or bilingual
- [ ] Decide if source maps are required for Phase 1 completion
- [ ] Decide if ESM execution is required for Phase 1 completion
- [ ] Decide if runtime regex translation remains as fallback during transition
- [ ] Decide how much built-in/API alias expansion belongs in Phase 1

## 23. Nice-To-Have During Phase 1

- [ ] Add transpiled code debug view
- [ ] Add debug trace for replacements
- [ ] Add internal metrics for compiler stage timing
- [ ] Add playground planning notes
- [ ] Add benchmark notes for compile speed

## 24. Final Phase 1 Exit Checklist

This section is the real definition of “Phase 1 complete.”

- [ ] Language spec v1 exists and is good enough to guide contributors
- [ ] Compiler pipeline exists beyond regex-only translation
- [x] Tokenizer is tested and reliable
- [ ] Parsing strategy is implemented and documented
- [ ] Core language translation is stable through structured pipeline
- [x] Diagnostics are materially better than raw JS errors
- [x] CLI run/check/transpile flow is stable and tested
- [x] Multi-file Node usage is proven
- [x] Browser-targeted transpilation is demonstrated
- [x] Tests cover syntax, runtime, regressions, and edge cases
- [ ] Docs are sufficient for contributors and early adopters
- [ ] Existing public behavior is preserved or clearly migrated

## 25. Full Phase 1 Completion Task

Only tick this when all required Phase 1 exit criteria above are truly done.

- [ ] FULL PHASE ONE COMPLETED

---

## Current Status Snapshot

Completed foundation items so far:
- [x] Phase 1 planning doc created
- [x] `src/` compiler scaffold created
- [x] shared keyword module created
- [x] compiler entrypoint created
- [x] tokenizer module created
- [x] runtime register module created
- [x] diagnostics module scaffold created
- [x] CLI binary scaffold created
- [x] CLI main entry added for testable exit behavior
- [x] `run`, `transpile`, and `check` commands added
- [x] language spec draft created
- [x] CLI usage docs added
- [x] CLI quick reference added
- [x] runtime support expectations docs added
- [x] keyword contributor guide added
- [x] tokenizer tests added
- [x] parser tests added
- [x] CLI tests added
- [x] multi-file CommonJS fixture added
- [x] browser transpile fixture added
- [x] diagnostics fixture added
- [x] Node script fixture added
- [x] Node runtime regression fixture added
- [x] integration runner added
- [x] tokenizer line/column tests added
- [x] line/column-aware compiler diagnostics added
- [x] CLI exit-code coverage added
- [x] existing tests still passing after scaffold refactor

Recommended next unchecked items:
- [ ] define unsupported-feature error format
- [ ] add unsupported-feature reporting tests
- [ ] add helpful code-frame style output
- [ ] add compiler-stage tests
- [ ] add compile-to-JS regression tests
- [ ] add source map tests
- [ ] define ESM Phase 1 vs Phase 2 execution decision
- [ ] add backward-compatibility protection tests


