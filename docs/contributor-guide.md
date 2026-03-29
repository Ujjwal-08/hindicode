# Hindicode Contributor Guide

This guide explains how to contribute safely during Phase 1.

## Current Architecture

The main compiler path is:
- `src/language/keywords.js`
- `src/compiler/tokenizer.js`
- `src/parser/index.js`
- `src/compiler/compile.js`
- `src/runtime/register.js`
- `src/cli/*`

Read these docs before making large changes:
- `docs/language-spec-v1.md`
- `docs/compiler-contract.md`
- `docs/runtime-support.md`
- `ARCHITECTURE_NOTES.md`

## Contribution Priorities In Phase 1

Highest value work:
- tests and regression fixes
- parser/tokenizer/compiler correctness
- diagnostics
- CLI stability
- clear docs

## Rules For Safe Contributions

- do not add aliases casually
- prefer readable Hindi that will make sense to real users
- consider identifier collisions before adding short keywords
- update docs when language surface changes
- add tests with every language or runtime change

## Minimum Change Checklist

If you add a keyword or alias, include:
- one direct translation test
- one executable scenario or integration test
- one edge-case or boundary test
- a doc update

If you change compiler behavior, include:
- parser/compiler test coverage
- CLI or integration coverage if relevant
- checklist/doc updates if the change completes a Phase 1 task

## Where To Add Things

- keyword inventory: `src/language/keywords.js`
- tokenization behavior: `src/compiler/tokenizer.js`
- parser strategy behavior: `src/parser/index.js`
- compiler orchestration: `src/compiler/compile.js`
- runtime behavior: `src/runtime/register.js`
- CLI behavior: `src/cli/`
- fixtures: `tests/fixtures/`

## Recommended Workflow

1. read the checklist
2. choose one Phase 1 task cluster
3. implement narrowly
4. add tests first or alongside
5. run `npm test`
6. update docs/checklist only for truly completed work

## What Not To Over-Promise

Please avoid marking a checklist item complete just because scaffolding exists.

A task should be marked complete only when:
- the implementation exists
- the tests cover it
- the docs reflect it when needed
