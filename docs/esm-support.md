# Hindicode ESM Support

`hindicode run` executes ES modules directly — no build step needed.

## ESM Keywords

| Hindi Keyword | English Equivalent | Purpose |
|---------------|--------------------|---------|
| `आयात`        | `import`           | Module import (also dynamic `आयात("./x.hindi.js")`) |
| `निर्यात`      | `export`           | Module export |
| `से`          | `from`             | Module source |
| `डिफ़ॉल्ट`     | `default`          | Default export/import |
| `सबकुछ`       | `*`                | Namespace import / re-export |
| `जैसा`        | `as`               | Rename (`के रूप में` also works) |
| `आयात_मेटा`   | `import.meta`      | Module metadata (`आयात_मेटा.url`) |

```javascript
// गणित.hindi.js
निर्यात स्थिर पाई_मान = 3.14159;
निर्यात डिफ़ॉल्ट कार्य गुणा(क, ख) { लौटाओ क * ख; }

// मुख्य.hindi.js
आयात गुणा, { पाई_मान } से "./गणित.hindi.js";
आयात सबकुछ जैसा गणित_मॉड्यूल से "./गणित.hindi.js";
स्थिर डेटा = इंतज़ार प्रॉमिस.हल(42); // शीर्ष-स्तरीय इंतज़ार
दिखाओ(गुणा(2, पाई_मान), डेटा);
```

## How It Works

- A file is treated as an ES module when its translated code contains a static `import`/`export`, `import.meta`, or top-level `await`.
- `hindicode run` then registers a Node.js module loader hook (`src/runtime/esm-loader.mjs`, needs Node.js 20.6+) so `import` can load other `.hindi.js` files.
- ES modules can import CommonJS `.hindi.js` modules (as the default export) and Node built-ins (`node:fs/promises`, …). CommonJS files keep working through the `require` hook.
- `import()` (dynamic import) works from both module kinds.

See `examples/programs/15_ES_मॉड्यूल.hindi.js` for a complete, tested example.

## In the Browser

`<script type="text/hindicode" data-module>` (or import/export syntax) runs as a native browser module via `dist/hindicode.browser.js`.
