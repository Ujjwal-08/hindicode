# Hindicode Test Matrix

This file is the long-term testing map for Hindicode.

It is meant to answer four questions quickly:

1. What do we already test?
2. What is only partially tested?
3. What is not tested yet at all?
4. What should be added next for production confidence?

## Current Test Layers

### 1. Scenario Tests

These are numbered `.hindi.js` files executed through the real require hook.

Purpose:
- prove that actual Hindi-authored files run end-to-end
- verify runtime behavior after translation
- serve as living examples of how Hindicode is used

Current files:
- `01_basics.hindi.js`
- `02_control_flow.hindi.js`
- `03_functions.hindi.js`
- `04_arrays.hindi.js`
- `05_objects_classes.hindi.js`
- `06_async.hindi.js`
- `07_error_handling.hindi.js`
- `08_math_string.hindi.js`
- `09_protection.hindi.js`
- `10_destructuring_spread.hindi.js`
- `11_collections.hindi.js`
- `12_node_core.hindi.js`
- `13_logic_operators.hindi.js`
- `14_production_node.hindi.js`
- `15_edge_cases.hindi.js`
- `16_browser_mock.hindi.js`
- `17_control_modules_advanced.hindi.js`
- `18_promises_real_world.hindi.js`
- `19_browser_events.hindi.js`
- `20_node_pipeline.hindi.js`

### 2. Spec-Style Compatibility Tests

These live in `tests/spec_runner.js`.

Purpose:
- validate translation output directly
- run Hindi snippets inside a controlled VM
- cover behavior without relying only on console output
- isolate language features from environment noise

### 3. Harness-Level Execution

These are supporting execution paths:
- `runner.js`
- `tests/assert_helper.js`
- `package.json` test script

Purpose:
- ensure tests are discoverable and runnable in CI
- keep Hindi assertions available globally

## Coverage By Capability

Legend:
- `Strong`: covered by both scenario and spec tests
- `Partial`: covered, but thin or narrow
- `Missing`: not meaningfully covered yet

| Area | Status | Notes |
| :-- | :-- | :-- |
| Basic declarations (`let`/`const`/`var`) | Strong | Covered in scenario and spec tests |
| `if` / `else` / `while` / `do while` / `for` | Strong | Covered in control flow tests |
| `switch` / `case` / `default` | Partial | Basic branch covered; fallthrough and nesting not yet covered |
| Functions and recursion | Strong | Basic, recursion, params covered |
| Arrow functions | Strong | Used across array and spec tests |
| Rest / spread | Strong | Arrays, objects, and params covered |
| Destructuring | Strong | Array and object destructuring covered |
| Ternary operator | Partial | Used, but no deeper edge coverage |
| Logical operators (`&&`, `||`, `!`) | Strong | Covered directly |
| Comparison operators | Strong | Covered directly |
| `typeof`, `delete`, `in`, `instanceof` | Partial | Recently covered, still not broad |
| Classes / inheritance / `this` / `super` | Strong | Covered in both suites |
| Prototype-based patterns | Partial | Basic prototype mutation covered |
| Generators / `yield` | Partial | Basic iterator flow covered; no delegation or loops yet |
| Async / `await` | Strong | Covered in both suites |
| `Promise.then` / `Promise.all` | Strong | Covered in both suites |
| `Promise.reject` / error propagation | Partial | Indirectly covered only |
| `Promise.race` / `allSettled` / `finally` | Missing | No dedicated tests yet |
| Arrays (`map`, `filter`, `reduce`, `find`, `includes`) | Strong | Good breadth already |
| Arrays (`some`, `every`, `flat`, `flatMap`, `at`) | Missing | No alias support or tests yet |
| Strings (`trim`, `split`, `replace`, `search`, `repeat`) | Strong | Basic string layer covered |
| Strings (`slice`, `padStart`, `padEnd`, `matchAll`) | Missing | Not mapped or tested |
| Objects (`keys`, `values`, `entries`, `assign`, `freeze`) | Strong | Core object helpers covered |
| Objects (`seal`, `fromEntries`, `hasOwn`, `getOwnPropertyNames`) | Missing | Not mapped or tested |
| `Map` / `Set` basics | Strong | Creation, add, set, get, size covered |
| WeakMap / WeakSet | Missing | No support or tests |
| Regex protection | Strong | Translator protection covered |
| Complex regex syntax | Partial | Basic literal preservation only |
| Comments / strings protection | Strong | Covered directly |
| Template literal recursion | Strong | Covered directly |
| Tagged template literals | Missing | No tests |
| CommonJS require hook | Strong | Covered directly |
| Multi-file CommonJS graphs | Missing | No cross-file require graph tests |
| ESM syntax translation | Partial | Keywords translate, execution story untested |
| ESM loader integration | Missing | No loader or fixture support |
| Node core: `fs`, `path`, `process`, `Buffer` | Strong | Good starter coverage |
| Node core: `events`, `stream`, `crypto`, `http`, `url` | Missing | No production integration tests |
| Browser globals: `window`, `document`, storage, `fetch` | Strong | Mocked coverage exists |
| DOM mutation and traversal | Partial | Very light coverage |
| Browser events | Partial | Basic click flow only |
| Timers | Strong | `setTimeout` and related coverage exists |
| Error handling (`try/catch/finally`) | Strong | Covered well |
| Custom error subclasses | Missing | No subclassed error tests |
| JSON parse/stringify | Strong | Covered |
| Math helpers | Strong | Covered |
| Date usage | Partial | Used lightly; no behavior-focused test |
| Unicode identifiers | Strong | Basic Hindi identifiers covered |
| Boundary safety for keyword collisions | Strong | Explicitly tested |
| Optional chaining (`?.`) | Missing | No tests |
| Nullish coalescing (`??`) | Partial | Used in spec tests, but not translator-facing or Hindi alias based |
| Dynamic import | Missing | No tests |
| Top-level await | Missing | No tests |
| CLI workflows | Missing | No CLI exists yet |
| Bundler integration | Missing | No Vite/Webpack/esbuild fixtures |
| Test-runner integration | Missing | No Jest/Vitest/Mocha fixtures |

## Coverage By Real-World Use Case

| Use case | Status | Notes |
| :-- | :-- | :-- |
| Learning JavaScript through Hindi | Strong | Many readable example files |
| Small Node scripts | Strong | Good support today |
| File processing / batch jobs | Strong | Covered by production Node tests |
| API request normalization / business logic | Partial | Basic transform tests exist |
| Browser toy apps | Partial | Mocks only, not real DOM runtime |
| CLI tools | Missing | No CLI entrypoint or argument parsing tests |
| HTTP server apps | Missing | No Express/Fastify/Node HTTP fixtures |
| React / frontend frameworks | Missing | No support or integration tests |
| Build tool plugins | Missing | No test fixtures |
| Monorepo / package usage | Missing | No workspace or linked-package coverage |
| Teaching examples / snippets | Strong | Already good |
| Production app debugging | Missing | No source maps or translated stack traces |

## Translator-Specific Risk Tests

These matter because the translator is regex-based.

### Covered
- comments stay untouched
- string literals stay untouched
- regex literals stay untouched
- template literal expressions get recursively translated
- longer phrases win before shorter ones
- identifiers containing Hindi keywords are not mangled

### Still Needed
- nested regex-like content near division operators
- tricky multiline template literals
- unicode escapes inside strings and regexes
- nested comments in invalid user input
- JSX-like syntax if frontend support is ever attempted
- decorators if future JS syntax is targeted
- import/export edge forms
- object literal shorthand next to translated keywords

## Priority Additions For Next Test Waves

### Wave 1: Production Language Confidence
- multi-file CommonJS fixture
- `switch` fallthrough tests
- `Promise.reject`, rejection chains, and `finally`
- `for...of` once Hindi syntax is chosen
- custom error subclass and stack behavior
- optional chaining and nullish coalescing behavior checks

### Wave 2: Platform Confidence
- Node `http` server fixture
- EventEmitter fixture
- stream/file pipeline fixture
- browser DOM mutation fixture
- localStorage/sessionStorage lifecycle fixture

### Wave 3: Ecosystem Confidence
- Jest/Vitest integration fixture
- Vite/Webpack/esbuild fixture
- Express/Fastify server fixture
- React component fixture

## Suggested Future Test File Naming

Use numbered scenario tests for end-to-end Hindi examples:
- `21_commonjs_graph.hindi.js`
- `22_http_server.hindi.js`
- `23_event_emitter.hindi.js`
- `24_promise_rejection.hindi.js`
- `25_dom_mutation.hindi.js`
- `26_cli_args.hindi.js`
- `27_stream_pipeline.hindi.js`
- `28_optional_chaining.hindi.js`
- `29_esm_smoke.hindi.js`
- `30_framework_fixture.hindi.js`

Use dedicated JS harness files for structured assertions:
- `tests/spec_runner.js`
- `tests/integration_runner.js`
- `tests/fixtures/*`

## Definition Of “Good Enough” Test Coverage

Hindicode is not “production-ready” just because examples pass.

The test matrix should eventually prove:
- translation correctness
- runtime correctness
- cross-file behavior
- environment compatibility
- failure clarity
- upgrade safety when new keywords are added

If a new keyword or phrase is introduced, the minimum expected additions should be:
- one direct translation assertion
- one executable Hindi scenario
- one edge-case or boundary test
