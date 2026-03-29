# Hindicode ESM Support Expectations

This document defines the supported Hindi keywords for ECMAScript Modules (ESM) and the Phase 1 implementation status.

## ESM Keywords

| Hindi Keyword | English Equivalent | Purpose |
|---------------|--------------------|---------|
| `आयात`        | `import`           | Module import |
| `निर्यात`      | `export`           | Module export |
| `से`          | `from`             | Module source |
| `डिफ़ॉल्ट`     | `default`          | Default export/import |
| `सब`          | `*`                | Namespace import (e.g. `आयात सब से`) |

## Phase 1 Implementation Status

In Phase 1, Hindicode focuses on **Syntax Translation** for ESM.

### Supported Syntax (Transpilation Only)

The following forms will be translated by `bin/hindicode transpile`:

```javascript
// Hindicode
आयात { name } से './module.hindi.js';
निर्यात फ़ंक्शन hello() { ... }
निर्यात डिफ़ॉल्ट फ़ंक्शन() { ... }
आयात सब जैसा math से './math.hindi.js';
```

### Known Limitations

1. **Runtime Execution**: The current Node.js `require` hook does NOT support ESM. Running a `.hindi.js` file with `import`/`export` using `hindicode run` or standard `require` will fail if the environment is not configured for ESM.
2. **File Extensions**: Node.js typically requires `.mjs` or `"type": "module"` in `package.json` for ESM.
3. **Phase 2 Goal**: Expanding the runtime loader to support ESM hooks is planned for Phase 2.

## Recommendations for Phase 1

- Use **CommonJS** (`निर्यात.मॉड्यूल = ...`, `अनुरोध(...)`) for direct execution via `hindicode run`.
- Use the **transpiler** (`hindicode transpile`) if you intend to use ESM syntax for browser bundling or modern Node.js environments.
