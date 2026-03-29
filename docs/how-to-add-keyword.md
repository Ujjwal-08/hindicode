# How To Add A Keyword

This guide explains the Phase 1 process for adding a new Hindicode keyword safely.

## 1. Decide Whether The Alias Belongs In Phase 1

Add a keyword only if it improves Hindi-first JavaScript without creating confusing ambiguity.

Good candidates:
- core JavaScript control-flow words
- common built-in APIs that improve readability in Hindi
- runtime terms already used across existing fixtures

Avoid in Phase 1:
- aliases that collide with common variable names
- multiple new aliases for the same concept unless there is a strong reason
- framework-specific surface area unless it supports general JavaScript usage

## 2. Update The Keyword Inventory

Edit [src/language/keywords.js](C:/node-libraries/hindicode/src/language/keywords.js).

Rules:
- keep longer multi-word phrases above shorter ones in `hindiToJS`
- group the alias under the nearest feature-area comment
- prefer one clear official alias over many near-duplicates

Example:

```javascript
"स्विच": "switch",
"मामला": "case",
```

## 3. Think About Safety

Before keeping the alias, ask:
- can it appear naturally inside identifiers?
- can it conflict with a more specific multi-word phrase?
- can it create surprising replacements inside ordinary code?

If the answer is yes, add a test before relying on it.

## 4. Add Tests

At minimum, update one or more of:
- [tests/spec_runner.js](C:/node-libraries/hindicode/tests/spec_runner.js)
- [tests/parser_runner.js](C:/node-libraries/hindicode/tests/parser_runner.js)
- numbered Hindi scenario tests in [tests](C:/node-libraries/hindicode/tests)

Recommended test coverage:
- direct translation of the new keyword
- no replacement inside strings/comments/regex where unsafe
- one real usage example in Hindicode

## 5. Update Docs

When a keyword becomes part of the supported Phase 1 surface, update:
- [docs/language-spec-v1.md](C:/node-libraries/hindicode/docs/language-spec-v1.md)
- [LANGUAGE_SURFACE_BACKLOG.md](C:/node-libraries/hindicode/LANGUAGE_SURFACE_BACKLOG.md) if it changes backlog status
- [tests/TEST_MATRIX.md](C:/node-libraries/hindicode/tests/TEST_MATRIX.md) if it expands coverage

## 6. Verify

Run:

```powershell
npm test
```

Do not mark the keyword as supported until the test suite passes.
