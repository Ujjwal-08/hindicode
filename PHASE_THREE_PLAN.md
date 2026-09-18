# Hindicode Phase Three Plan

Phase 3 — **Framework Hindicode** — makes Hindicode usable inside mainstream JavaScript
app workflows, and carries over the Phase 2 items that are still open.

## Where Phase 2 Ended

Done:
- Hindi aliases for the whole tracked JavaScript surface (`npm run coverage`: 442/442)
- ES module execution (`import`/`export`, top-level await, dynamic `import()`)
- browser runtime (`<script type="text/hindicode">`, `dist/hindicode.browser.js`)
- source maps (Node stack traces and browser DevTools show Hindi source lines and columns)
- Hindi error messages, code frames, "did you mean" keyword suggestions (`HC_POSSIBLE_TYPO`)
- keyword-as-name diagnostics (`HC_KEYWORD_AS_NAME`); keywords as object keys / property names stay Hindi
- 20 example programs + a browser app run in `npm test`

## Phase 3 Work

### 1. Structured translation (parser) — highest technical risk
The translator swaps keywords token by token. It is reliable for everything tested so far,
but JSX, some future syntax, and smarter checks need a real syntax tree.
- [ ] evaluate an AST-based pipeline (e.g. parse the translated output with acorn and map back)
- [ ] check object keys in shorthand form (`{ त्रुटि }`) and class method names
- [ ] method shorthand with keyword names (`{ नया() {} }` becomes `let()`, while `obj.नया()` stays Hindi)

### 2. Build tools and frameworks
- [ ] Vite plugin (`.hindi.js` → JS with source maps)
- [ ] esbuild plugin
- [ ] webpack loader
- [ ] React / JSX: `.hindi.jsx` support (depends on item 1)
- [ ] fixture apps: Express API, React app, Next.js page

### 3. Test runners
- [ ] Jest transform
- [ ] Vitest (via the Vite plugin)
- [ ] Hindi assertion helpers (`अपेक्षा(x).बराबर_हो(y)`)

### 4. Developer workflow
- [ ] `hindicode run --watch`
- [ ] `hindicode build <src> <out>` — compile a folder, write `.js` + `.js.map`
- [ ] `hindicode.config.json` — alias packs, disabling specific aliases, strict mode (warnings as errors)
- [ ] `npm create hindicode` project scaffolding

### 5. Modules and interop
- [ ] named imports from CommonJS `.hindi.js` modules (only the default export works from ESM today)
- [ ] documented way to import `.hindi.js` from plain `.js` ES modules (register the loader)
- [ ] TypeScript: `.hindi.ts` support, or guidance for mixing `.hindi.js` with TS projects

### 6. Remaining English in everyday code
`npm run purity` shows what is still English in the example programs.
- [ ] common option keys (`recursive`, `method`, `headers`, `body`)
- [ ] `error.message`, iterator protocol (`next`, `value`, `done`)
- [ ] Intl constructors (`NumberFormat`, `DateTimeFormat`)
- [ ] well-known symbols (`Symbol.toPrimitive`, `Symbol.toStringTag`, `Symbol.hasInstance`)

Each alias must be checked against common Hindi words first: any keyword can no longer be a variable name.

## Phase 4 (Ecosystem) — Planned Next

- [ ] VS Code extension: syntax highlighting, keyword autocomplete, hover showing the JavaScript meaning, diagnostics
- [ ] formatter (Prettier plugin) and ESLint processor
- [ ] online playground (the browser runtime already makes this possible)
- [ ] Hindi learning track built from `examples/programs`

## Definition of Done for Phase 3

- a Vite + React app and an Express API can be written in Hindi and built/tested with standard tools
- `hindicode build` and `--watch` cover day-to-day development
- every new capability has an example program in `examples/programs` and runs in `npm test`
