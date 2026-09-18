# HindiCode - हिंदी में जावास्क्रिप्ट लिखें!

Write JavaScript in Hindi. Hindicode translates Hindi keywords to JavaScript and runs the result in Node.js or the browser — any JavaScript program can be written with it, and English JavaScript can be mixed in freely.

### 💖 Donate

You can support the project here:

- **Patreon:** https://www.patreon.com/cw/BABU_ISHU  
- **PayPal:** https://www.paypal.com/ncp/payment/SECBQ62TRZZ6Y
  
## Quick Example

```javascript
स्थिर नाम = "अर्जुन";

कार्य स्वागत(व्यक्ति) {
    लौटाओ `नमस्ते ${व्यक्ति}`;
}

केलिए (स्थिर अंक में से [1, 2, 3]) {
    दिखाओ(स्वागत(नाम), अंक);
}
```

## How Complete Is It?

| Measure | Result |
|---|---|
| JavaScript keywords, operators, globals and built-in methods with a Hindi alias (`npm run coverage`) | **100%** (442 of 442 tracked) |
| Hindi aliases | **418** (+ automatic nukta spelling variants) |
| Example programs covering every JS feature area, written in Hindi and passing their self-tests | **20 programs, 646 checks** + a browser app (14 checks) |
| Share of code words in those programs that are Hindi (`npm run purity`) | **92%** — the rest are mostly module names like `fs`, `path` |

The 20 programs in [`examples/programs`](examples/programs) show what can be written, and run as part of `npm test`:

| # | Program | Covers |
|---|---|---|
| 01 | चर और ऑपरेटर | declarations, types, every operator, `??`, `?.`, conversions |
| 02 | नियंत्रण प्रवाह | if/else, switch, all loops, labels, break/continue |
| 03 | फ़ंक्शन | arrows, defaults, rest, closures, recursion, call/apply/bind, currying, memoization |
| 04 | वस्तुएँ | getters/setters, destructuring, spread, descriptors, freeze/seal, prototypes, `groupBy` |
| 05 | वर्ग और OOP | private `#fields`, static blocks, inheritance, `super`, mixins, `new.target` |
| 06 | ऐरे | every Array method incl. `toSorted`/`with`/`fromAsync`, typed arrays |
| 07 | टेक्स्ट और रेगएक्स | every String method, tagged templates, named groups, `matchAll`, Unicode |
| 08 | संख्या, गणित, तारीख | Number/Math/BigInt/Date, Intl (₹ formatting, Hindi dates) |
| 09 | इटरेटर और जेनरेटर | iterator protocol, generators, `yield*`, async generators, `for await` |
| 10 | असिंक | promises, all/race/any/allSettled, `withResolvers`, event loop, abort, retry, pools |
| 11 | त्रुटि प्रबंधन | try/catch/finally, custom error classes, `cause`, `AggregateError` |
| 12 | संग्रह | Map/Set, set algebra, WeakMap/WeakSet/WeakRef, LRU cache |
| 13 | मेटाप्रोग्रामिंग | Proxy traps, Reflect, well-known Symbols |
| 14 | JSON और बाइनरी | reviver/replacer, `ArrayBuffer`/`DataView`, Buffer, Base64, URL |
| 15 | ES मॉड्यूल | import/export, re-exports, dynamic `import()`, `import.meta`, top-level await |
| 16 | Node कोर | fs, path, os, events, streams, zlib, crypto (AES/scrypt), child_process, worker_threads |
| 17 | HTTP सर्वर | a REST API with routing, middleware, auth, streaming, `fetch` client |
| 18 | एल्गोरिदम | sorting, BST, heap, graphs (BFS/DFS/Dijkstra), trie, DP, backtracking |
| 19 | डिज़ाइन पैटर्न | factory, builder, observer, pub/sub, command (undo/redo), state machine, DI |
| 20 | काम सूची CLI | a complete command-line app that saves to a file |

The full alias list is in [`docs/keywords.md`](docs/keywords.md).

## Install

```powershell
npm install hindicode
```

## CLI

```powershell
hindicode run app.hindi.js          # CommonJS or ES modules (import/export, top-level await)
hindicode check app.hindi.js        # validate; also prints warnings
hindicode transpile app.hindi.js    # print the generated JavaScript
```

## In Node.js

```javascript
require("hindicode");            // registers the .hindi.js loader
const app = require("./app.hindi.js");

const { translateHindiJS } = require("hindicode");
translateHindiJS("दिखाओ(सच और झूठ)"); // → console.log(true && false)
```

## In the Browser

```html
<script src="https://cdn.jsdelivr.net/npm/hindicode/dist/hindicode.browser.js"></script>
<script type="text/hindicode">
    दस्तावेज़.तत्व_ढूँढो("h1").टेक्स्ट_सामग्री = "नमस्ते ब्राउज़र!";
</script>
<script type="text/hindicode" src="ऐप.hindi.js"></script>
```

`data-module` (or `import`/`export` in the code) runs a script as an ES module. See [`examples/browser`](examples/browser) — run `node tools/serve.js` and open http://localhost:5178/examples/browser/.

## Debugging

Errors are reported in Hindi (with the English original), point at the exact line and column of your `.hindi.js` file, and suggest the keyword you probably meant:

```text
❌ संदर्भ_त्रुटि (ReferenceError): 'गणीत' परिभाषित नहीं है
   गणीत is not defined
   💡 क्या आपका मतलब 'गणित' था? / Did you mean 'गणित' (Math)?
   → app.hindi.js:3:7
  2 | स्थिर x = 5;
> 3 | दिखाओ(गणीत.अधिकतम(x));
    |       ^
```

- **Source maps**: `compileHindiJS()` returns `map`; `hindicode run` and the require hook attach it, so Node stack traces (and browser DevTools, via the browser runtime) show Hindi source positions. For your own Node entry point, run with `node --enable-source-maps`.
- **Misspelled keywords**: `hindicode check` warns about words like `लौटओ` (→ `लौटाओ`) — a keyword with a wrong vowel sign — and syntax errors caused by them name the keyword.
- **`hindicode transpile`** prints the generated JavaScript, even when it does not compile.

## Things To Know

- **Object keys and property names stay Hindi when the keyword would not make sense there.** `{ नया: 1, गणित: 90 }` keeps the keys `नया` and `गणित` (not `let`/`Math`), so they match strings like `"नया"` and survive `JSON`. Keywords that are real API names still translate: `{ लंबाई: 3 }` → `{ length: 3 }`, `.पकड़ो()` → `.catch()`, `.हटाओ()` → `.delete()`.
- Declaring a keyword as a variable name (`स्थिर जानकारी = …` would become `const console.info = …`) is reported as `HC_KEYWORD_AS_NAME` with a clear message.
- Keywords with a nukta (`बड़ा`, `फ़िल्टर`) also work in their precomposed form and without the nukta (`बडा`, `फिल्टर`).
- HTTP headers must be ASCII, and regular expressions need `[\p{L}\p{M}]` (not just `\p{L}`) to match Devanagari words, because vowel signs are Unicode marks.
- Names of Node modules (`fs`, `path`), options objects (`{ recursive: true }`), and less common APIs stay in English — any JavaScript name that has no alias works unchanged.

## Current Limits

- The compiler is a token-level translator, not a full AST parser.
- No framework loaders (React/JSX, Vite/webpack plugins, Jest transform) yet — use `hindicode transpile` in a build step.
- No watch mode, config file or editor extension yet.

What comes next is in [`PHASE_THREE_PLAN.md`](PHASE_THREE_PLAN.md).

## Tools

- `npm run coverage` — Hindi coverage of the JavaScript surface
- `npm run purity` — how much of each example program is Hindi
- `node tools/keywords-doc.js` — regenerate `docs/keywords.md`
- `npm run build` — build `dist/hindicode.browser.js`

## Important Docs

- `docs/keywords.md` — every Hindi alias
- `docs/getting-started.md`
- `docs/cli-usage.md`
- `docs/cli-quick-reference.md`
- `docs/language-spec-v1.md`
- `docs/esm-support.md`
- `docs/compiler-contract.md`
- `docs/runtime-support.md`
- `docs/source-map-design.md`
- `docs/contributor-guide.md`
- `docs/how-to-add-keyword.md`
- `PHASE_ONE_PLAN.md`, `PHASE_TWO_PLAN.md`, `PHASE_THREE_PLAN.md`, `VISION.md`, `ROADMAP.md`

## Contributing

If you add language features, please update tests and docs together. New keywords need a program in `examples/programs` that uses them, and `node tools/keywords-doc.js` to refresh the reference.

## License

MIT
