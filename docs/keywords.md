# Hindicode कीवर्ड संदर्भ / Keyword Reference

Generated from `src/language/keywords.js` by `node tools/keywords-doc.js` — 418 aliases.

Every spelling with a nukta (ड़, फ़, ज़ …) is also accepted in its precomposed form and without the nukta
(`बड़ा` = `बडा`). English JavaScript always works too — Hindi and English can be mixed freely.

**Keywords are translated everywhere in code**, including object keys and property names.
Avoid using a keyword as your own variable or key name (`स्थिर जानकारी = …` becomes `const console.info = …`);
Hindicode reports this as `HC_KEYWORD_AS_NAME`.

- [Phrases](#phrases)
- [Control flow](#control-flow)
- [Declarations](#declarations)
- [Async](#async)
- [Literals](#literals)
- [OOP](#oop)
- [Modules](#modules)
- [Operators](#operators)
- [Error handling](#error-handling)
- [Console](#console)
- [Array methods](#array-methods)
- [Object methods](#object-methods)
- [Map / Set](#map-set)
- [Promise](#promise)
- [Browser APIs](#browser-apis)
- [Node.js](#node-js)
- [Built-ins](#built-ins)
- [Math shortcuts](#math-shortcuts)
- [JSON shortcuts](#json-shortcuts)
- [String methods](#string-methods)
- [Keywords & declarations](#keywords-declarations)
- [Functions](#functions)
- [More built-in objects](#more-built-in-objects)
- [Number methods](#number-methods)
- [Math](#math)
- [JSON](#json)
- [Set algebra](#set-algebra)
- [Date](#date)
- [RegExp](#regexp)
- [Reflect](#reflect)
- [Browser / DOM](#browser-dom)

## Phrases

| हिंदी | JavaScript |
|---|---|
| `नहीं तो` | `else` |
| `अन्यथा` | `else` |
| `के रूप में` | `as` |
| `का प्रकार` | `typeof` |
| `नया बनाओ` | `new` |
| `कम या बराबर` | `<=` |
| `ज्यादा या बराबर` | `>=` |
| `बराबर नहीं` | `!==` |
| `में से` | `of` |

## Control flow

| हिंदी | JavaScript |
|---|---|
| `अगर` | `if` |
| `वरना` | `else` |
| `करो` | `do` |
| `जबतक` | `while` |
| `केलिए` | `for` |
| `स्विच` | `switch` |
| `मामला` | `case` |
| `रोकें` | `break` |
| `जारी` | `continue` |
| `लौटाओ` | `return` |
| `फेंको` | `throw` |

## Declarations

| हिंदी | JavaScript |
|---|---|
| `नया` | `let` |
| `स्थिर` | `const` |
| `पुराना` | `var` |
| `कार्य` | `function` |
| `वर्ग` | `class` |

## Async

| हिंदी | JavaScript |
|---|---|
| `असिंक` | `async` |
| `इंतज़ार` | `await` |

## Literals

| हिंदी | JavaScript |
|---|---|
| `सच` | `true` |
| `सत्य` | `true` |
| `झूठ` | `false` |
| `असत्य` | `false` |
| `खाली` | `null` |
| `अपरिभाषित` | `undefined` |

## OOP

| हिंदी | JavaScript |
|---|---|
| `विस्तार` | `extends` |
| `सुपर` | `super` |
| `यह` | `this` |
| `हटाओ` | `delete` |
| `प्रोटो` | `prototype` |
| `में` | `in` |
| `सत्यापित` | `instanceof` |
| `वापसी` | `yield` |

## Modules

| हिंदी | JavaScript |
|---|---|
| `आयात` | `import` |
| `निर्यात` | `export` |
| `डिफ़ॉल्ट` | `default` |
| `डिफॉल्ट` | `default` |
| `से` | `from` |
| `मांगो` | `require` |
| `अनुरोध` | `require` |
| `मॉड्यूल` | `module` |

## Operators

| हिंदी | JavaScript |
|---|---|
| `और` | `&&` |
| `या` | `\|\|` |
| `नहीं` | `!` |
| `बराबर` | `===` |
| `छोटा` | `<` |
| `बड़ा` | `>` |
| `ढीला_बराबर_नहीं` | `!=` |
| `ढीला_बराबर` | `==` |
| `अगर_खाली_तो` | `??` |

## Error handling

| हिंदी | JavaScript |
|---|---|
| `कोशिश` | `try` |
| `पकड़ो` | `catch` |
| `पकड़` | `catch` |
| `अंततः` | `finally` |
| `त्रुटि` | `Error` |

## Console

| हिंदी | JavaScript |
|---|---|
| `दिखाओ` | `console.log` |
| `गलती` | `console.error` |
| `चेतावनी` | `console.warn` |
| `जानकारी` | `console.info` |
| `कंसोल` | `console` |
| `डिबग_दिखाओ` | `console.debug` |
| `संरचना_दिखाओ` | `console.dir` |
| `तालिका_दिखाओ` | `console.table` |
| `समय_शुरू` | `console.time` |
| `समय_खत्म` | `console.timeEnd` |
| `समय_लॉग` | `console.timeLog` |
| `ट्रेस_दिखाओ` | `console.trace` |
| `दावा_करो` | `console.assert` |
| `गिनती_करो` | `console.count` |
| `गिनती_रीसेट` | `console.countReset` |
| `समूह_शुरू` | `console.group` |
| `समूह_बंद_शुरू` | `console.groupCollapsed` |
| `समूह_खत्म` | `console.groupEnd` |

## Array methods

| हिंदी | JavaScript |
|---|---|
| `पुश` | `push` |
| `पॉप` | `pop` |
| `शिफ्ट` | `shift` |
| `अनशिफ्ट` | `unshift` |
| `स्लाइस` | `slice` |
| `जोड़ो` | `concat` |
| `शामिल` | `includes` |
| `ढूँढो` | `find` |
| `मानचित्र` | `map` |
| `फ़िल्टर` | `filter` |
| `कमकरो` | `reduce` |
| `हरएक` | `forEach` |
| `लंबाई` | `length` |
| `लम्बाई` | `length` |
| `इंडेक्स` | `indexOf` |
| `उलटाओ` | `reverse` |
| `क्रमित` | `sort` |
| `कुछ_है` | `some` |
| `सभी_हैं` | `every` |
| `समतल` | `flat` |
| `समतल_मानचित्र` | `flatMap` |
| `स्थान_पर` | `at` |
| `अंदर_कॉपी` | `copyWithin` |
| `भरो` | `fill` |
| `सूचकांक_ढूँढो` | `findIndex` |
| `आखिरी_ढूँढो` | `findLast` |
| `आखिरी_सूचकांक_ढूँढो` | `findLastIndex` |
| `आखिरी_इंडेक्स` | `lastIndexOf` |
| `जोड़तोड़` | `splice` |
| `दाएँ_से_कमकरो` | `reduceRight` |
| `उलटी_प्रति` | `toReversed` |
| `क्रमित_प्रति` | `toSorted` |
| `जोड़तोड़_प्रति` | `toSpliced` |
| `के_साथ` | `with` |
| `स्थानीय_टेक्स्ट` | `toLocaleString` |
| `टेक्स्ट_बनाओ` | `toString` |
| `मूल_मान` | `valueOf` |
| `ऐरे_है` | `isArray` |
| `असिंक_से` | `fromAsync` |

## Object methods

| हिंदी | JavaScript |
|---|---|
| `कुंजियाँ` | `keys` |
| `मूल्य` | `values` |
| `प्रविष्टियाँ` | `entries` |
| `बनाएँ` | `create` |
| `मिलाओ` | `assign` |
| `जमाओ` | `freeze` |
| `प्रविष्टियों_से` | `fromEntries` |
| `अपना_है` | `hasOwn` |
| `गुण_विवरण` | `getOwnPropertyDescriptor` |
| `सभी_गुण_विवरण` | `getOwnPropertyDescriptors` |
| `गुण_नाम` | `getOwnPropertyNames` |
| `गुण_प्रतीक` | `getOwnPropertySymbols` |
| `एक_ही_है` | `is` |
| `विस्तार_रोको` | `preventExtensions` |
| `सील_करो` | `seal` |
| `गुण_परिभाषित_करो` | `defineProperty` |
| `सभी_गुण_परिभाषित_करो` | `defineProperties` |
| `प्रोटो_लाओ` | `getPrototypeOf` |
| `प्रोटो_रखो` | `setPrototypeOf` |
| `विस्तार_योग्य_है` | `isExtensible` |
| `जमा_है` | `isFrozen` |
| `सील_है` | `isSealed` |
| `समूह_बनाओ` | `groupBy` |
| `अपना_गुण_है` | `hasOwnProperty` |

## Map / Set

| हिंदी | JavaScript |
|---|---|
| `नक्शा` | `Map` |
| `है` | `has` |
| `प्राप्त` | `get` |
| `रखो` | `set` |
| `साफ़` | `clear` |
| `आकार` | `size` |
| `डालो` | `add` |
| `कमज़ोर_नक्शा` | `WeakMap` |
| `कमजोर_नक्शा` | `WeakMap` |
| `कमज़ोर_सेट` | `WeakSet` |
| `कमजोर_सेट` | `WeakSet` |

## Promise

| हिंदी | JavaScript |
|---|---|
| `फिर` | `then` |
| `सभी` | `all` |
| `हल` | `resolve` |
| `अस्वीकार` | `reject` |
| `प्रॉमिस` | `Promise` |
| `दौड़` | `race` |
| `सब_निपटे` | `allSettled` |
| `कोई_भी` | `any` |
| `हल_सहित` | `withResolvers` |

## Browser APIs

| हिंदी | JavaScript |
|---|---|
| `विंडो` | `window` |
| `दस्तावेज` | `document` |
| `दस्तावेज़` | `document` |
| `ब्राउज़र` | `navigator` |
| `स्थान` | `location` |
| `इतिहास` | `history` |
| `संग्रह` | `localStorage` |
| `सत्र_संग्रह` | `sessionStorage` |
| `चेतावनी_डिब्बा` | `alert` |
| `पूछो` | `prompt` |
| `पक्का_करो` | `confirm` |
| `लाओ` | `fetch` |
| `समय_बाद` | `setTimeout` |
| `बार_बार` | `setInterval` |
| `समय_रोकें` | `clearTimeout` |
| `बार_रोकें` | `clearInterval` |
| `तत्व_ढूँढो_आईडी_से` | `getElementById` |
| `तत्व_ढूँढो` | `querySelector` |
| `सभी_तत्व_ढूँढो` | `querySelectorAll` |
| `घटना_सुनो` | `addEventListener` |
| `तत्व_बनाओ` | `createElement` |
| `बच्चा_जोड़ो` | `appendChild` |

## Node.js

| हिंदी | JavaScript |
|---|---|
| `प्रक्रिया` | `process` |
| `__नाम` | `__filename` |
| `__डायरेक्टरी` | `__dirname` |
| `बफर` | `Buffer` |
| `एक्सपोर्ट्स` | `exports` |
| `तर्क_सूची` | `argv` |
| `परिवेश` | `env` |
| `बाहर_निकलो` | `exit` |
| `वर्तमान_फ़ोल्डर` | `cwd` |
| `अगला_टिक` | `nextTick` |
| `सुनो` | `on` |
| `एक_बार_सुनो` | `once` |
| `घटना_भेजो` | `emit` |
| `फ़ाइल_पढ़ो` | `readFile` |
| `फ़ाइल_पढ़ो_सिंक` | `readFileSync` |
| `फ़ाइल_लिखो` | `writeFile` |
| `फ़ाइल_लिखो_सिंक` | `writeFileSync` |
| `मौजूद_है_सिंक` | `existsSync` |
| `फ़ोल्डर_बनाओ_सिंक` | `mkdirSync` |
| `फ़ोल्डर_पढ़ो_सिंक` | `readdirSync` |
| `मूल_नाम` | `basename` |
| `एक्सटेंशन` | `extname` |
| `फ़ोल्डर_नाम` | `dirname` |
| `सर्वर_बनाओ` | `createServer` |
| `सुनना_शुरू` | `listen` |

## Built-ins

| हिंदी | JavaScript |
|---|---|
| `ऑब्जेक्ट` | `Object` |
| `ऐरे` | `Array` |
| `सेट` | `Set` |
| `स्ट्रिंग` | `String` |
| `टेक्स्ट` | `String` |
| `नंबर` | `Number` |
| `बूलियन` | `Boolean` |
| `डेट` | `Date` |
| `तारीख` | `Date` |
| `गणित` | `Math` |
| `जेसन` | `JSON` |
| `जेसन_डेटा` | `json` |
| `जीसन` | `JSON` |
| `जोड़ें` | `join` |
| `रेगएक्स` | `RegExp` |
| `अनंत` | `Infinity` |
| `प्रतीक` | `Symbol` |
| `बड़ा_पूर्णांक` | `BigInt` |
| `यूआरएल` | `URL` |
| `यूआरएल_पैरामीटर` | `URLSearchParams` |
| `रद्द_नियंत्रक` | `AbortController` |
| `पूर्णांक_बनाओ` | `parseInt` |
| `दशमलव_बनाओ` | `parseFloat` |
| `संख्या_नहीं` | `isNaN` |
| `परिमित_है` | `isFinite` |

## Math shortcuts

| हिंदी | JavaScript |
|---|---|
| `गोलाई` | `Math.round` |
| `ऊपर` | `Math.ceil` |
| `नीचे` | `Math.floor` |
| `अधिकतम` | `Math.max` |
| `न्यूनतम` | `Math.min` |
| `यादृच्छ` | `Math.random` |
| `वर्गमूल` | `Math.sqrt` |
| `पाई` | `Math.PI` |

## JSON shortcuts

| हिंदी | JavaScript |
|---|---|
| `पार्स` | `JSON.parse` |
| `तार_बनाओ` | `JSON.stringify` |

## String methods

| हिंदी | JavaScript |
|---|---|
| `बड़े_अक्षर` | `toUpperCase` |
| `छोटे_अक्षर` | `toLowerCase` |
| `काटो` | `trim` |
| `विभाजन` | `split` |
| `बदलो` | `replace` |
| `खोजो` | `search` |
| `शुरू_से` | `startsWith` |
| `खत्म_से` | `endsWith` |
| `दोहराओ` | `repeat` |
| `हिस्सा` | `substring` |
| `मिलान` | `match` |
| `बाएँ_भरो` | `padStart` |
| `दाएँ_भरो` | `padEnd` |
| `अक्षर_पर` | `charAt` |
| `अक्षर_कोड` | `charCodeAt` |
| `कोड_बिंदु` | `codePointAt` |
| `सुगठित_है` | `isWellFormed` |
| `सुगठित_करो` | `toWellFormed` |
| `स्थानीय_तुलना` | `localeCompare` |
| `सभी_मिलान` | `matchAll` |
| `सामान्य_करो` | `normalize` |
| `सब_बदलो` | `replaceAll` |
| `शुरू_काटो` | `trimStart` |
| `अंत_काटो` | `trimEnd` |
| `स्थानीय_छोटे_अक्षर` | `toLocaleLowerCase` |
| `स्थानीय_बड़े_अक्षर` | `toLocaleUpperCase` |
| `कोड_से_अक्षर` | `fromCharCode` |
| `कोड_बिंदु_से` | `fromCodePoint` |
| `कच्चा` | `raw` |

## Keywords & declarations

| हिंदी | JavaScript |
|---|---|
| `स्थैतिक` | `static` |
| `नया_लक्ष्य` | `new.target` |
| `आयात_मेटा` | `import.meta` |
| `पुनरावर्तक` | `iterator` |
| `असिंक_पुनरावर्तक` | `asyncIterator` |
| `निर्माता` | `constructor` |
| `व्यर्थ` | `void` |
| `डिबगर` | `debugger` |
| `जैसा` | `as` |
| `सबकुछ` | `*` |
| `फ़ंक्शन` | `function` |
| `अमान्य_संख्या` | `NaN` |
| `वैश्विक` | `globalThis` |
| `ग्लोबल` | `global` |

## Functions

| हिंदी | JavaScript |
|---|---|
| `फलन` | `Function` |
| `बुलाओ` | `call` |
| `लागू_करो` | `apply` |
| `बाँधो` | `bind` |

## More built-in objects

| हिंदी | JavaScript |
|---|---|
| `कमज़ोर_संदर्भ` | `WeakRef` |
| `समापन_रजिस्टर` | `FinalizationRegistry` |
| `प्रॉक्सी` | `Proxy` |
| `प्रतिबिंब` | `Reflect` |
| `अंतरराष्ट्रीय` | `Intl` |
| `बाइट_बफर` | `ArrayBuffer` |
| `डेटा_दृश्य` | `DataView` |
| `बाइट_ऐरे` | `Uint8Array` |
| `पूर्णांक32_ऐरे` | `Int32Array` |
| `दशमलव64_ऐरे` | `Float64Array` |
| `प्रकार_त्रुटि` | `TypeError` |
| `सीमा_त्रुटि` | `RangeError` |
| `वाक्य_त्रुटि` | `SyntaxError` |
| `संदर्भ_त्रुटि` | `ReferenceError` |
| `समूह_त्रुटि` | `AggregateError` |
| `यूआरएल_भाग_एनकोड` | `encodeURIComponent` |
| `यूआरएल_भाग_डिकोड` | `decodeURIComponent` |
| `यूआरएल_एनकोड` | `encodeURI` |
| `यूआरएल_डिकोड` | `decodeURI` |
| `गहरी_प्रति` | `structuredClone` |
| `सूक्ष्म_कार्य` | `queueMicrotask` |
| `तुरंत_बाद` | `setImmediate` |

## Number methods

| हिंदी | JavaScript |
|---|---|
| `पूर्णांक_है` | `isInteger` |
| `सुरक्षित_पूर्णांक_है` | `isSafeInteger` |
| `अधिकतम_मान` | `MAX_VALUE` |
| `न्यूनतम_मान` | `MIN_VALUE` |
| `ऋण_अनंत` | `NEGATIVE_INFINITY` |
| `धन_अनंत` | `POSITIVE_INFINITY` |
| `अधिकतम_सुरक्षित` | `MAX_SAFE_INTEGER` |
| `न्यूनतम_सुरक्षित` | `MIN_SAFE_INTEGER` |
| `एप्सिलॉन` | `EPSILON` |
| `घातांकी` | `toExponential` |
| `दशमलव_तक` | `toFixed` |
| `परिशुद्धता` | `toPrecision` |

## Math

| हिंदी | JavaScript |
|---|---|
| `निरपेक्ष` | `Math.abs` |
| `घात` | `Math.pow` |
| `चिह्न` | `Math.sign` |
| `पूर्णांक_भाग` | `Math.trunc` |
| `घनमूल` | `Math.cbrt` |
| `कर्ण` | `Math.hypot` |
| `घातांक` | `Math.exp` |
| `घातांक_ऋण1` | `Math.expm1` |
| `लघुगणक` | `Math.log` |
| `लघुगणक2` | `Math.log2` |
| `लघुगणक10` | `Math.log10` |
| `लघुगणक1_धन` | `Math.log1p` |
| `ज्या` | `Math.sin` |
| `कोज्या` | `Math.cos` |
| `स्पर्शज्या` | `Math.tan` |
| `व्युत्क्रम_ज्या` | `Math.asin` |
| `व्युत्क्रम_कोज्या` | `Math.acos` |
| `व्युत्क्रम_स्पर्शज्या` | `Math.atan` |
| `व्युत्क्रम_स्पर्शज्या2` | `Math.atan2` |
| `अतिपरवलयिक_ज्या` | `Math.sinh` |
| `अतिपरवलयिक_कोज्या` | `Math.cosh` |
| `अतिपरवलयिक_स्पर्शज्या` | `Math.tanh` |
| `व्युत्क्रम_अतिपरवलयिक_ज्या` | `Math.asinh` |
| `व्युत्क्रम_अतिपरवलयिक_कोज्या` | `Math.acosh` |
| `व्युत्क्रम_अतिपरवलयिक_स्पर्शज्या` | `Math.atanh` |
| `अग्र_शून्य32` | `Math.clz32` |
| `पूर्णांक_गुणा` | `Math.imul` |
| `एकल_गोलाई` | `Math.fround` |
| `अर्ध_गोलाई` | `Math.f16round` |
| `गणित_ई` | `Math.E` |
| `प्राकृत_लघु10` | `Math.LN10` |
| `प्राकृत_लघु2` | `Math.LN2` |
| `लघु10_ई` | `Math.LOG10E` |
| `लघु2_ई` | `Math.LOG2E` |
| `आधा_वर्गमूल2` | `Math.SQRT1_2` |
| `वर्गमूल2` | `Math.SQRT2` |

## JSON

| हिंदी | JavaScript |
|---|---|
| `कच्चा_जेसन` | `JSON.rawJSON` |
| `कच्चा_जेसन_है` | `JSON.isRawJSON` |

## Set algebra

| हिंदी | JavaScript |
|---|---|
| `अंतर_निकालो` | `difference` |
| `प्रतिच्छेद` | `intersection` |
| `सममित_अंतर` | `symmetricDifference` |
| `संघ_बनाओ` | `union` |
| `उपसमुच्चय_है` | `isSubsetOf` |
| `अधिसमुच्चय_है` | `isSupersetOf` |
| `असंयुक्त_है` | `isDisjointFrom` |

## Date

| हिंदी | JavaScript |
|---|---|
| `अभी` | `now` |
| `तारीख_टेक्स्ट` | `toDateString` |
| `समय_टेक्स्ट` | `toTimeString` |
| `आईएसओ_टेक्स्ट` | `toISOString` |
| `जेसन_बनाओ` | `toJSON` |
| `स्थानीय_तारीख` | `toLocaleDateString` |
| `स्थानीय_समय` | `toLocaleTimeString` |
| `तारीख_लो` | `getDate` |
| `तारीख_रखो` | `setDate` |
| `दिन_लो` | `getDay` |
| `वर्ष_लो` | `getFullYear` |
| `वर्ष_रखो` | `setFullYear` |
| `महीना_लो` | `getMonth` |
| `महीना_रखो` | `setMonth` |
| `घंटे_लो` | `getHours` |
| `घंटे_रखो` | `setHours` |
| `मिनट_लो` | `getMinutes` |
| `मिनट_रखो` | `setMinutes` |
| `सेकंड_लो` | `getSeconds` |
| `सेकंड_रखो` | `setSeconds` |
| `मिलीसेकंड_लो` | `getMilliseconds` |
| `मिलीसेकंड_रखो` | `setMilliseconds` |
| `समय_लो` | `getTime` |
| `समय_रखो` | `setTime` |
| `समयक्षेत्र_अंतर` | `getTimezoneOffset` |

## RegExp

| हिंदी | JavaScript |
|---|---|
| `जाँचो` | `test` |
| `मिलान_चलाओ` | `exec` |
| `स्रोत` | `source` |
| `झंडे` | `flags` |
| `अंतिम_सूचकांक` | `lastIndex` |

## Reflect

| हिंदी | JavaScript |
|---|---|
| `गुण_हटाओ` | `deleteProperty` |
| `निर्माण_करो` | `construct` |
| `अपनी_कुंजियाँ` | `ownKeys` |

## Browser / DOM

| हिंदी | JavaScript |
|---|---|
| `घटना_हटाओ` | `removeEventListener` |
| `बच्चा_हटाओ` | `removeChild` |
| `अंदर_एचटीएमएल` | `innerHTML` |
| `टेक्स्ट_सामग्री` | `textContent` |
| `क्लास_सूची` | `classList` |
| `शैली` | `style` |
| `विशेषता_रखो` | `setAttribute` |
| `विशेषता_लो` | `getAttribute` |
| `डिफ़ॉल्ट_रोको` | `preventDefault` |
| `एनिमेशन_फ्रेम` | `requestAnimationFrame` |
| `वस्तु_लो` | `getItem` |
| `वस्तु_रखो` | `setItem` |
| `वस्तु_हटाओ` | `removeItem` |
