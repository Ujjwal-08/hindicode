# HindiCode - हिंदी में जावास्क्रिप्ट लिखें!

Hindicode is evolving from a runtime keyword translator into a Hindi-first JavaScript compiler pipeline.

### 💖 Donate

You can support the project here:

- **Patreon:** https://www.patreon.com/cw/BABU_ISHU  
- **PayPal:** https://www.paypal.com/ncp/payment/SECBQ62TRZZ6Y
  
## What Hindicode Supports Today

- `.hindi.js` runtime execution in Node
- `hindicode run`, `hindicode check`, and `hindicode transpile`
- multi-file CommonJS-style Hindicode programs
- browser-targeted transpilation experiments
- structured diagnostics for compile-time syntax failures

## Quick Example

```javascript
स्थिर नाम = "अर्जुन";

कार्य स्वागत(व्यक्ति) {
    लौटाओ `नमस्ते ${व्यक्ति}`;
}

दिखाओ(स्वागत(नाम));
```

## New Keywords

| Hindi | JavaScript | Hindi | JavaScript |
|---|---|---|---|
| `में से` | `of` (for...of) | `कुछ_है` | `some` |
| `सभी_हैं` | `every` | `समतल` | `flat` |
| `समतल_मानचित्र` | `flatMap` | `स्थान_पर` | `at` |
| `प्रविष्टियों_से` | `fromEntries` | `अपना_है` | `hasOwn` |
| `मिलान` | `match` | `बाएँ_भरो` / `दाएँ_भरो` | `padStart` / `padEnd` |
| `पूर्णांक_बनाओ` | `parseInt` | `दशमलव_बनाओ` | `parseFloat` |
| `संख्या_नहीं` | `isNaN` | `परिमित_है` | `isFinite` |
| `दौड़` | `race` | `सब_निपटे` | `allSettled` |
| `कमज़ोर_नक्शा` | `WeakMap` | `कमज़ोर_सेट` | `WeakSet` |
| `प्रतीक` | `Symbol` | `बड़ा_पूर्णांक` | `BigInt` |
| `यूआरएल` | `URL` | `यूआरएल_पैरामीटर` | `URLSearchParams` |
| `रद्द_नियंत्रक` | `AbortController` | | |

```javascript
केलिए (स्थिर अंक में से [1, 2, 3]) {
    दिखाओ(अंक);
}
```

## Install

```powershell
npm install hindicode
```

## CLI

```powershell
hindicode run app.hindi.js
hindicode check app.hindi.js
hindicode transpile app.hindi.js
```

## Compiler Direction

Phase 1 now includes:
- keyword inventory module
- tokenizer
- parser-strategy layer
- compiler contract
- runtime registration module
- CLI entrypoints
- parser, CLI, integration, and scenario coverage

## Best-Supported Phase 1 Use Cases

- learning JavaScript in Hindi
- Node scripts and utilities
- multi-file CommonJS projects
- browser-oriented transpilation with mocked or real browser globals

## Current Limits

Not yet fully promised in Phase 1:
- full ESM runtime execution
- React/Angular integrations
- source maps
- framework loaders
- full AST parser behavior

## Important Docs

- `PHASE_ONE_PLAN.md`
- `PHASE_ONE_CHECKLIST.md`
- `PHASE_TWO_PLAN.md`
- `PHASE_TWO_CHECKLIST.md`
- `VISION.md`
- `ROADMAP.md`
- `docs/getting-started.md`
- `docs/cli-usage.md`
- `docs/cli-quick-reference.md`
- `docs/language-spec-v1.md`
- `docs/compiler-contract.md`
- `docs/runtime-support.md`
- `docs/source-map-design.md`
- `docs/contributor-guide.md`
- `docs/how-to-add-keyword.md`

## Contributing

If you add language features, please update tests and docs together. Phase 1 is focused on correctness, diagnostics, and compiler structure.

## License

MIT
