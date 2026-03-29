# Hindicode Language Specification v1 Draft

This document defines the intended Phase 1 language surface for Hindicode.

It is a practical specification, not a theoretical one.

The purpose of this spec is to make Hindicode predictable for:
- users
- contributors
- tooling authors
- future compiler work

## 1. Language Identity

Hindicode is a Hindi-first language layer for JavaScript.

In Phase 1:
- Hindicode source is authored with Hindi keywords and aliases
- Hindicode compiles to JavaScript
- JavaScript remains the execution target
- Hindicode aims for JavaScript semantic compatibility, not separate runtime semantics

## 2. Phase 1 Goals

Phase 1 focuses on:
- core JavaScript semantics in Hindi
- Node-friendly execution
- browser-targeted transpilation
- a stable compiler foundation

Phase 1 does not promise complete framework integration.

## 3. File Types

Phase 1 supports:
- `.hindi.js`

Phase 1 may later add:
- `.hindi`

Current recommendation:
- keep `.hindi.js` as the official execution-oriented extension during transition

## 4. Source Encoding

All Hindicode source should be treated as UTF-8 text.

The compiler should preserve:
- line positions
- column positions
- original file names

## 5. Language Model

Hindicode does not invent a separate runtime model.

Instead:
- keywords and selected APIs are written in Hindi
- resulting semantics map to JavaScript
- runtime behavior should remain JavaScript-compatible

## 6. Supported Core Syntax Categories

### 6.1 Supported grammar forms in Phase 1

Supported grammar families include:
- declarations
- functions and arrow functions
- conditionals
- loops already represented by current keyword support
- object and array literals
- template literals with recursive expression translation
- classes and inheritance
- async functions and await
- try/catch/finally
- CommonJS-oriented module patterns

### 6.2 Declarations

Supported:
- `नया` -> `let`
- `स्थिर` -> `const`
- `पुराना` -> `var`
- `कार्य` -> `function`
- `वर्ग` -> `class`
- `नया बनाओ` -> `new`

### 6.3 Control Flow

Supported:
- `अगर` -> `if`
- `वरना` -> `else`
- `नहीं तो` -> `else`
- `अन्यथा` -> `else`
- `जबतक` -> `while`
- `करो` -> `do`
- `केलिए` -> `for`
- `स्विच` -> `switch`
- `मामला` -> `case`
- `रोकें` -> `break`
- `जारी` -> `continue`
- `लौटाओ` -> `return`
- `फेंको` -> `throw`

### 6.4 Async And Control Transfer

Supported:
- `असिंक` -> `async`
- `इंतज़ार` -> `await`
- `वापसी` -> `yield`

### 6.5 Literals

Supported:
- `सच` / `सत्य` -> `true`
- `झूठ` / `असत्य` -> `false`
- `खाली` -> `null`
- `अपरिभाषित` -> `undefined`
- `अनंत` -> `Infinity`

### 6.6 Operators

Supported phrase and keyword operators:
- `और` -> `&&`
- `या` -> `||`
- `नहीं` -> `!`
- `बराबर` -> `===`
- `बराबर नहीं` -> `!==`
- `छोटा` -> `<`
- `बड़ा` -> `>`
- `कम या बराबर` -> `<=`
- `ज्यादा या बराबर` -> `>=`
- `का प्रकार` -> `typeof`
- `में` -> `in`
- `सत्यापित` -> `instanceof`
- `हटाओ` -> `delete`

### 6.7 OOP

Supported:
- `यह` -> `this`
- `सुपर` -> `super`
- `विस्तार` -> `extends`
- `प्रोटो` -> `prototype`

### 6.8 Error Handling

Supported:
- `कोशिश` -> `try`
- `पकड़ो` / `पकड़` -> `catch`
- `अंततः` -> `finally`
- `त्रुटि` -> `Error`

### 6.9 Modules

Supported keyword translation:
- `आयात` -> `import`
- `निर्यात` -> `export`
- `डिफ़ॉल्ट` / `डिफॉल्ट` -> `default`
- `से` -> `from`
- `मांगो` / `अनुरोध` -> `require`
- `मॉड्यूल` -> `module`

Note:
- translation support exists
- full runtime execution support varies by module system

## 7. Built-In API Alias Philosophy

Hindicode Phase 1 supports selected Hindi aliases for common JavaScript APIs.

The goal is usability, not immediate total replacement of all JavaScript API naming.

## 8. Identifier Rules

Identifiers may be:
- Hindi
- English
- mixed Hindi-English

The translator/compiler must not replace text inside identifiers just because it resembles a keyword.

## 9. Phrase Priority Rules

Multi-word phrases must be matched before shorter subparts.

Examples:
- `नहीं तो` must win before `नहीं`
- `नया बनाओ` must win before `नया`
- `कम या बराबर` must win before shorter fragments

## 10. Protected Regions

The compiler/runtime must not blindly translate inside:
- line comments
- block comments
- quoted strings
- regex literals

Template literals are special:
- literal text should remain unchanged
- `${...}` expressions should be translated

## 11. Unsupported grammar forms or not-yet-guaranteed areas in Phase 1

These may work partially, but are not yet guaranteed as formal Phase 1 promises:
- full ESM runtime loading
- bundler integrations
- React integration
- Angular integration
- JSX handling
- source maps everywhere
- full DOM API localization
- framework-specific alias packs
- full AST output
- parser-specific grammar diagnostics for every unsupported form

## 12. Diagnostics Expectations

The compiler should eventually report:
- filename
- line
- column
- severity
- machine-readable code
- human-readable message

## 13. Phase 1 Minimum Promise

By the end of Phase 1, Hindicode should reliably support:
- core keyword translation
- structured compilation beyond regex-only replacement
- CLI-based run/check/transpile
- stable Node execution for `.hindi.js`
- early browser-targeted transpilation
- contributor-safe documentation
