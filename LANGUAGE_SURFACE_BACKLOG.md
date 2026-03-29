# Hindicode Language Surface Backlog

This file is the most detailed “what can be added next?” inventory for the Hindi language surface itself.

It focuses on syntax words, built-ins, and API naming opportunities.

## Already Present In The Current Dictionary

### Core Syntax
- `अगर`
- `वरना`
- `नहीं तो`
- `अन्यथा`
- `करो`
- `जबतक`
- `केलिए`
- `स्विच`
- `मामला`
- `रोकें`
- `जारी`
- `लौटाओ`
- `फेंको`

### Declarations
- `नया`
- `स्थिर`
- `पुराना`
- `कार्य`
- `वर्ग`
- `नया बनाओ`

### Async
- `असिंक`
- `इंतज़ार`
- `वापसी`

### Literals And Operators
- `सच`
- `झूठ`
- `खाली`
- `अपरिभाषित`
- `और`
- `या`
- `नहीं`
- `बराबर`
- `बराबर नहीं`
- `छोटा`
- `बड़ा`
- `कम या बराबर`
- `ज्यादा या बराबर`
- `का प्रकार`
- `में`

### OOP And Modules
- `विस्तार`
- `सुपर`
- `यह`
- `हटाओ`
- `प्रोटो`
- `सत्यापित`
- `आयात`
- `निर्यात`
- `डिफ़ॉल्ट`
- `डिफॉल्ट`
- `से`
- `मांगो`
- `मॉड्यूल`

### Runtime Helpers
- console aliases
- array aliases
- object aliases
- promise aliases
- browser aliases
- Node aliases
- built-in constructors
- math shortcuts
- JSON shortcuts
- string method aliases

## Surface Areas Still Missing

## 1. Iteration Syntax

Potential Hindi ideas:
- `केलिए ... का`
- `प्रत्येक ... का`
- `हर ... में`

Needed targets:
- `for...of`
- richer `for...in` examples
- iterator protocol examples

## 2. Promise API Expansion

Missing methods:
- `catch`
- `finally`
- `race`
- `allSettled`
- `any`

Potential Hindi ideas:
- `पकड़ो`
- `अंततः`
- `दौड़`
- `सभी_स्थिति`
- `कोई_एक`

## 3. Array API Expansion

Missing methods:
- `some`
- `every`
- `findIndex`
- `flat`
- `flatMap`
- `at`
- `fill`
- `splice`

Potential Hindi ideas:
- `कुछ`
- `सभी_मिलें`
- `सूचक_ढूँढो`
- `समतल`
- `समतल_मानचित्र`
- `स्थान`
- `भरें`
- `काट_जोड़`

## 4. String API Expansion

Missing methods:
- `slice`
- `match`
- `matchAll`
- `charAt`
- `padStart`
- `padEnd`
- `localeCompare`

## 5. Object And Reflection Expansion

Missing helpers:
- `fromEntries`
- `seal`
- `hasOwn`
- `getPrototypeOf`
- `setPrototypeOf`
- `defineProperty`
- `getOwnPropertyNames`

## 6. Number / Math Expansion

Missing helpers:
- `parseInt`
- `parseFloat`
- `Number.isNaN`
- `Number.isFinite`
- `Math.abs`
- `Math.pow`
- `Math.trunc`

## 7. Date Expansion

Missing helpers:
- `Date.now` alias
- constructors and formatting patterns
- timezone/date parsing examples

## 8. Node Expansion

Potential alias areas:
- file system helpers
- path helpers
- `events`
- `stream`
- `http`
- `crypto`
- `url`
- `child_process`

## 9. Browser Expansion

Potential alias areas:
- `document.body`
- `querySelector`
- `querySelectorAll`
- `createElement`
- `appendChild`
- `addEventListener`
- `removeEventListener`
- `classList`
- `textContent`

## 10. Web Platform Expansion

Potential targets:
- `URL`
- `URLSearchParams`
- `AbortController`
- `Headers`
- `Request`
- `Response`

## 11. Error Model Expansion

Potential aliases:
- `TypeError`
- `RangeError`
- `ReferenceError`
- `SyntaxError`

## 12. Advanced Language Features

Potential future handling:
- optional chaining
- nullish coalescing aliases, if desired
- dynamic import
- top-level await
- decorators
- private class fields

## Backlog Prioritization

### Highest priority
- more array/string/object helpers
- promise helpers
- `for...of`
- DOM method aliases

### Medium priority
- Node ecosystem aliases
- error subclass aliases
- number/date expansions

### Long-term priority
- advanced syntax localization strategy
- framework-specific alias packs

## Rules For Adding New Hindi Aliases

When adding a new alias:
- prefer common, readable Hindi
- avoid collision with likely user identifiers
- add phrase-first aliases before shorter variants
- add spec coverage
- add at least one executable Hindi example
- document the alias in README or a future keyword reference
