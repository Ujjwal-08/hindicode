# Hindicode Phase Two Checklist

This file is the execution checklist for Phase 2.

Use it as the working source of truth for:
- what has been completed in Phase 2
- what still remains
- what defines Phase 2 completion

## Phase 2 Title

Production Hindicode

## Phase 2 Mission

Turn Hindicode from a promising compiler foundation into a practical production-oriented toolchain.

## How To Use This File

- `[x]` means completed
- `[ ]` means not yet completed
- keep items unchecked if they are only partially complete

---

## 1. Phase Setup

- [x] Create `VISION.md`
- [x] Create `ROADMAP.md`
- [x] Create `PHASE_TWO_PLAN.md`
- [x] Create `PHASE_TWO_CHECKLIST.md`
- [ ] Define Phase 2 scope in one stable paragraph
- [ ] Define explicit Phase 2 non-goals
- [ ] Define dependency on unfinished Phase 1 work
- [ ] Freeze entry criteria for active Phase 2 execution

## 2. Structured Translation Ownership

- [ ] Reduce dependence on legacy regex translation
- [ ] Define structured translation stage boundaries
- [ ] Add translation stage metadata to compile output
- [ ] Add compile-to-JS regression tests
- [ ] Add translation snapshots for representative programs
- [ ] Compare legacy output and structured output intentionally
- [ ] Define fallback policy for legacy translation path
- [ ] Retire legacy path for stable language subsets

## 3. Code Generation

- [ ] Define code generation strategy
- [ ] Add codegen stage abstraction
- [ ] Add stable formatting expectations
- [ ] Add generated code readability checks
- [ ] Add code generation snapshot tests
- [ ] Add generated output debug metadata

## 4. Source Maps

- [ ] Implement initial source map emission
- [ ] Add source map object to compile output
- [ ] Add source map tests
- [ ] Verify stack trace usefulness with source maps
- [ ] Document source map workflow for contributors

## 5. Diagnostics

- [ ] Define unsupported-feature diagnostic type
- [ ] Add unsupported-feature reporting tests
- [ ] Add code-frame style formatting
- [ ] Add stage-aware compiler errors
- [ ] Add Hindi-friendly diagnostic wording strategy
- [ ] Decide bilingual vs Hindi-only diagnostics for production mode
- [ ] Add incorrect-keyword usage diagnostics

## 6. Modules And Runtime

- [ ] Add tests for runtime compilation failures
- [ ] Add transpile-first execution path
- [ ] Add safer runtime module loading path
- [ ] Add real tests for import/export syntax
- [ ] Add named export fixture
- [ ] Add default export fixture
- [ ] Add mixed module graph fixture
- [ ] Decide whether production ESM execution is Phase 2 required

## 7. CLI Workflow Expansion

- [ ] Add `hindicode print` alias or equivalent
- [ ] Add output-to-file option
- [ ] Add `hindicode --watch`
- [ ] Add stdin support
- [ ] Add quiet mode
- [ ] Add debug mode
- [ ] Add CLI tests for new workflow flags

## 8. Test Architecture

- [ ] Add compiler-stage tests
- [ ] Split tests into `tests/spec/`, `tests/integration/`, and `tests/regression/`
- [ ] Add translation regression snapshots
- [ ] Add source map tests
- [ ] Add backward-compatibility protection tests for public behaviors that still matter
- [ ] Add module interop regression tests

## 9. Compatibility And Release Engineering

- [ ] Define what users must not lose between Phase 1 and Phase 2
- [ ] Document breaking-change policy
- [ ] Define release criteria for Phase 2 milestones
- [ ] Create pre-release checklist
- [ ] Create release notes template
- [ ] Create migration guidance for compiler-path changes

## 10. Repo Structure And Cleanup

- [ ] Decide long-term `src/` structure
- [ ] Decide long-term `tests/` structure
- [ ] Move legacy helpers into clearer locations
- [ ] Separate runtime/compiler/language/CLI concerns more cleanly
- [ ] Remove legacy-only code when replacement is proven safe

## 11. Final Phase 2 Exit Checklist

- [ ] Structured translation clearly owns the main compile path
- [ ] Generated JavaScript is stable and testable
- [ ] Source maps exist and are tested
- [ ] Diagnostics are production-friendly
- [ ] Module/runtime behavior is well-defined and tested
- [ ] CLI supports real production workflows
- [ ] Compatibility and release practices are documented

## 12. Full Phase 2 Completion Task

- [ ] FULL PHASE TWO COMPLETED
