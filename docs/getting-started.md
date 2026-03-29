# Hindicode Getting Started

This guide is the quickest way to start using Hindicode in Phase 1.

## What Hindicode Is Today

Hindicode is a Hindi-first JavaScript language layer.

In Phase 1 it supports:
- Hindi-authored `.hindi.js` files
- Node/CommonJS execution
- transpile/check workflows through the CLI
- browser-targeted transpilation experiments

## Install

```powershell
npm install hindicode
```

## Quick Start

Create `app.hindi.js`:

```javascript
स्थिर नाम = "अर्जुन";

कार्य स्वागत(व्यक्ति) {
    लौटाओ `नमस्ते ${व्यक्ति}`;
}

दिखाओ(स्वागत(नाम));
```

Run it:

```powershell
hindicode run app.hindi.js
```

Check it:

```powershell
hindicode check app.hindi.js
```

Print transpiled JavaScript:

```powershell
hindicode transpile app.hindi.js
```

## Best Supported Phase 1 Workflows

- single-file scripts
- multi-file CommonJS `.hindi.js` programs
- Node utilities using `fs`, `path`, `process`, timers, and promises
- browser-targeted transpilation with mocked or real browser globals

## Example Project Shape

```text
project/
  app.hindi.js
  helper.hindi.js
```

`app.hindi.js`
```javascript
स्थिर helper = मांगो('./helper.hindi.js');
दिखाओ(helper.योग(10, 20));
```

`helper.hindi.js`
```javascript
कार्य योग(अ, ब) {
    लौटाओ अ + ब;
}

मॉड्यूल.exports = { योग };
```

## Current Limits

Phase 1 does not yet fully promise:
- ESM runtime execution
- React/Angular integrations
- source maps
- IDE/language-server support
- framework-specific loaders

## Where To Look Next

- `docs/cli-usage.md`
- `docs/language-spec-v1.md`
- `docs/runtime-support.md`
- `docs/compiler-contract.md`
