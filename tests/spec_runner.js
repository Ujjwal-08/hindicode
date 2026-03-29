const assert = require("assert/strict");
const fs = require("fs");
const os = require("os");
const path = require("path");
const vm = require("vm");

const { translateHindiJS } = require("../index");

function createConsoleRecorder() {
    const entries = [];
    const push = (type) => (...args) => entries.push({ type, args });

    return {
        entries,
        api: {
            log: push("log"),
            error: push("error"),
            warn: push("warn"),
            info: push("info"),
        },
    };
}

function createExecutionContext(overrides = {}) {
    const recorder = createConsoleRecorder();
    const context = {
        console: recorder.api,
        require,
        module: { exports: {} },
        exports: {},
        process,
        Buffer,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        Promise,
        Math,
        JSON,
        Date,
        Object,
        Array,
        String,
        Number,
        Boolean,
        Map,
        Set,
        RegExp,
        Error,
        ...overrides,
    };

    context.global = context;
    context.globalThis = context;
    return { context, recorder };
}

async function executeHindi(code, overrides = {}) {
    const translated = translateHindiJS(code);
    const { context, recorder } = createExecutionContext(overrides);
    const script = new vm.Script(`(async () => {\n${translated}\n})()`, {
        filename: "inline.hindi.js",
    });

    const result = await script.runInNewContext(context);
    return { result, translated, context, logs: recorder.entries };
}

function normalize(value) {
    return JSON.parse(JSON.stringify(value));
}

const tests = [
    {
        name: "translates control flow, declarations, and operators",
        run() {
            const translated = translateHindiJS(`
                नया संख्या = 10;
                अगर (संख्या ज्यादा या बराबर 10 और संख्या बराबर 10) {
                    दिखाओ("ठीक");
                } नहीं तो {
                    दिखाओ("गलत");
                }
            `);

            assert.match(translated, /\blet\b/);
            assert.match(translated, /\bif\b/);
            assert.match(translated, />=/);
            assert.match(translated, /&&/);
            assert.match(translated, /===/);
            assert.match(translated, /\belse\b/);
            assert.match(translated, /console\.log/);
        },
    },
    {
        name: "protects comments, strings, and regex literals",
        run() {
            const translated = translateHindiJS(`
                // अगर दिखाओ जबतक
                स्थिर संदेश = "अगर दिखाओ";
                स्थिर खोज = /अगर|दिखाओ/g;
                /* नया बनाओ नहीं तो */
            `);

            assert.match(translated, /\/\/ अगर दिखाओ जबतक/);
            assert.match(translated, /"अगर दिखाओ"/);
            assert.match(translated, /\/अगर\|दिखाओ\/g/);
            assert.doesNotMatch(translated, /\/\/ if console\.log while/);
        },
    },
    {
        name: "preserves identifiers that contain keyword-like text",
        async run() {
            const { result, translated } = await executeHindi(`
                नया agarCount = 2;
                नया नहींतोValue = 5;
                module.exports = { agarCount, नहींतोValue };
            `);

            assert.equal(result, undefined);
            assert.match(translated, /let agarCount = 2/);
            assert.match(translated, /let नहींतोValue = 5/);
        },
    },
    {
        name: "translates template literal expressions recursively",
        async run() {
            const { context } = await executeHindi(`
                नया नाम = "दुनिया";
                नया संदेश = \`नमस्ते \${10 बड़ा 5 ? नाम : "कोई नहीं"}\`;
                module.exports = संदेश;
            `);

            assert.equal(context.module.exports, "नमस्ते दुनिया");
        },
    },
    {
        name: "executes modern language patterns with classes and inheritance",
        async run() {
            const { context } = await executeHindi(`
                वर्ग जीव {
                    constructor(नाम) {
                        यह.नाम = नाम;
                    }

                    बोलो() {
                        लौटाओ \`\${यह.नाम} बोल रहा है\`;
                    }
                }

                वर्ग डेवलपर विस्तार जीव {
                    constructor(नाम, भाषा) {
                        सुपर(नाम);
                        यह.भाषा = भाषा;
                    }

                    परिचय() {
                        लौटाओ \`\${यह.नाम} \${यह.भाषा} में कोड करता है\`;
                    }
                }

                नया dev = नया बनाओ डेवलपर("आरव", "हिंदी");
                module.exports = {
                    speech: dev.बोलो(),
                    intro: dev.परिचय(),
                    isDev: dev सत्यापित डेवलपर,
                    isLiving: dev सत्यापित जीव
                };
            `);

            assert.deepEqual(normalize(context.module.exports), {
                speech: "आरव बोल रहा है",
                intro: "आरव हिंदी में कोड करता है",
                isDev: true,
                isLiving: true,
            });
        },
    },
    {
        name: "supports arrays, objects, destructuring, spread, and high-order methods",
        async run() {
            const { context } = await executeHindi(`
                स्थिर अंक = [5, 10, 15];
                स्थिर बढ़े = अंक.मानचित्र((मान) => मान * 2);
                स्थिर फ़िल्टर_किए = बढ़े.फ़िल्टर((मान) => मान बड़ा 15);
                स्थिर योग = फ़िल्टर_किए.कमकरो((कुल, मान) => कुल + मान, 0);
                स्थिर [पहला, ...बाकी] = अंक;
                स्थिर मूल = { नाम: "रीमा", शहर: "भोपाल" };
                स्थिर संयुक्त = { ...मूल, भूमिका: "इंजीनियर" };
                module.exports = { बढ़े, फ़िल्टर_किए, योग, पहला, बाकी, संयुक्त };
            `);

            assert.deepEqual(normalize(context.module.exports), {
                बढ़े: [10, 20, 30],
                फ़िल्टर_किए: [20, 30],
                योग: 50,
                पहला: 5,
                बाकी: [10, 15],
                संयुक्त: { नाम: "रीमा", शहर: "भोपाल", भूमिका: "इंजीनियर" },
            });
        },
    },
    {
        name: "supports async workflows, promises, and timers",
        async run() {
            const { context } = await executeHindi(`
                कार्य इंतज़ार_करो(मान) {
                    लौटाओ नया बनाओ प्रॉमिस((हल) => समय_बाद(() => हल(मान), 5));
                }

                असिंक कार्य मुख्य() {
                    स्थिर पहला = इंतज़ार इंतज़ार_करो(10);
                    स्थिर दूसरा = इंतज़ार इंतज़ार_करो(20);
                    लौटाओ पहला + दूसरा;
                }

                module.exports = मुख्य();
            `);

            assert.equal(await context.module.exports, 30);
        },
    },
    {
        name: "supports error handling and custom Error construction",
        async run() {
            const { context } = await executeHindi(`
                कार्य भाग(क, ख) {
                    अगर (ख बराबर 0) {
                        फेंको नया बनाओ त्रुटि("शून्य से भाग नहीं");
                    }
                    लौटाओ क / ख;
                }

                नया संदेश = "";
                कोशिश {
                    भाग(5, 0);
                } पकड़ो (e) {
                    संदेश = e.message;
                } अंततः {
                    संदेश = संदेश + "!";
                }

                module.exports = संदेश;
            `);

            assert.equal(context.module.exports, "शून्य से भाग नहीं!");
        },
    },
    {
        name: "supports collection APIs with Map, Set, and Object helpers",
        async run() {
            const { context } = await executeHindi(`
                स्थिर टीम = नया बनाओ सेट();
                टीम.डालो("अनु");
                टीम.डालो("अनु");
                टीम.डालो("जय");

                स्थिर registry = नया बनाओ नक्शा();
                registry.रखो("frontend", "अनु");
                registry.रखो("backend", "जय");

                स्थिर merged = ऑब्जेक्ट.मिलाओ({}, { a: 1 }, { b: 2 });
                module.exports = {
                    teamSize: टीम.आकार,
                    hasJay: टीम.है("जय"),
                    owner: registry.प्राप्त("frontend"),
                    values: ऑब्जेक्ट.मूल्य(merged)
                };
            `);

            assert.deepEqual(normalize(context.module.exports), {
                teamSize: 2,
                hasJay: true,
                owner: "अनु",
                values: [1, 2],
            });
        },
    },
    {
        name: "supports Node.js-style scripting with fs, path, and process",
        async run() {
            const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "hindicode-node-"));
            const tempFile = path.join(tempDir, "data.txt");

            try {
                const { context } = await executeHindi(`
                    स्थिर fs = मांगो("fs");
                    स्थिर path = मांगो("path");
                    स्थिर target = path.जोड़ें(process.env.HINDICODE_TEMP_DIR, "data.txt");
                    fs.writeFileSync(target, "नमस्ते", "utf8");
                    स्थिर output = fs.readFileSync(target, "utf8");
                    module.exports = {
                        output,
                        basename: path.basename(target),
                        platform: प्रक्रिया.platform
                    };
                `, {
                    process: {
                        ...process,
                        env: {
                            ...process.env,
                            HINDICODE_TEMP_DIR: tempDir,
                        },
                    },
                });

                assert.deepEqual(normalize(context.module.exports), {
                    output: "नमस्ते",
                    basename: "data.txt",
                    platform: process.platform,
                });
            } finally {
                if (fs.existsSync(tempFile)) {
                    fs.unlinkSync(tempFile);
                }
                fs.rmdirSync(tempDir);
            }
        },
    },
    {
        name: "supports browser-style code with document, storage, fetch, and timers",
        async run() {
            const calls = [];
            const { context } = await executeHindi(`
                असिंक कार्य पृष्ठ_चलाओ() {
                    दस्तावेज.title = "HindiCode App";
                    संग्रह.setItem("theme", "light");
                    स्थिर response = इंतज़ार लाओ("/api/data");
                    स्थिर data = इंतज़ार response.जेसन_डेटा();
                    लौटाओ {
                        title: दस्तावेज.title,
                        theme: संग्रह.getItem("theme"),
                        answer: data.answer
                    };
                }

                module.exports = पृष्ठ_चलाओ();
            `, {
                document: { title: "" },
                localStorage: {
                    store: {},
                    getItem(key) {
                        return this.store[key] ?? null;
                    },
                    setItem(key, value) {
                        this.store[key] = value;
                    },
                },
                fetch: async (url) => {
                    calls.push(url);
                    return {
                        json: async () => ({ answer: 42 }),
                    };
                },
            });

            assert.equal(calls[0], "/api/data");
            assert.deepEqual(normalize(await context.module.exports), {
                title: "HindiCode App",
                theme: "light",
                answer: 42,
            });
        },
    },
    {
        name: "supports real-world data transformation pipelines",
        async run() {
            const { context } = await executeHindi(`
                स्थिर orders = [
                    { id: 1, स्थिति: "paid", राशि: 1200 },
                    { id: 2, स्थिति: "draft", राशि: 500 },
                    { id: 3, स्थिति: "paid", राशि: 1800 }
                ];

                स्थिर report = orders
                    .फ़िल्टर((order) => order.स्थिति बराबर "paid")
                    .मानचित्र((order) => ({ ...order, tax: order.राशि * 0.18 }))
                    .कमकरो((acc, order) => {
                        acc.count++;
                        acc.total += order.राशि;
                        acc.taxTotal += order.tax;
                        लौटाओ acc;
                    }, { count: 0, total: 0, taxTotal: 0 });

                module.exports = report;
            `);

            assert.deepEqual(normalize(context.module.exports), {
                count: 2,
                total: 3000,
                taxTotal: 540,
            });
        },
    },
    {
        name: "supports custom require hook for .hindi.js files",
        run() {
            const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "hindicode-hook-"));
            const modulePath = path.join(tempDir, "sample.hindi.js");

            fs.writeFileSync(modulePath, `
                स्थिर आधार = 7;
                मॉड्यूल.exports = {
                    doubled: आधार * 2,
                    status: सच
                };
            `);

            try {
                const loaded = require(modulePath);
                assert.deepEqual(loaded, { doubled: 14, status: true });
            } finally {
                delete require.cache[modulePath];
                fs.unlinkSync(modulePath);
                fs.rmdirSync(tempDir);
            }
        },
    },
    {
        name: "supports switch, default aliases, delete, in, and typeof flows",
        async run() {
            const { context } = await executeHindi(`
                स्थिर उपयोगकर्ता = { नाम: "किरण", भूमिका: "admin", token: "xyz" };
                स्थिर नाम_कुंजी = "नाम" में उपयोगकर्ता;
                हटाओ उपयोगकर्ता.token;

                नया संदेश = "";
                स्विच (उपयोगकर्ता.भूमिका) {
                    मामला "admin":
                        संदेश = "व्यवस्थापक";
                        रोकें;
                    डिफॉल्ट:
                        संदेश = "साधारण";
                }

                module.exports = {
                    nameKeyExists: नाम_कुंजी,
                    tokenType: का प्रकार (उपयोगकर्ता.token),
                    roleLabel: संदेश
                };
            `);

            assert.deepEqual(normalize(context.module.exports), {
                nameKeyExists: true,
                tokenType: "undefined",
                roleLabel: "व्यवस्थापक",
            });
        },
    },
    {
        name: "supports promise chaining and Promise.all style workflows",
        async run() {
            const { context } = await executeHindi(`
                स्थिर पहला = प्रॉमिस.resolve(4);
                स्थिर दूसरा = प्रॉमिस.resolve(6);

                module.exports = प्रॉमिस
                    .सभी([पहला, दूसरा])
                    .फिर((values) => values.कमकरो((sum, value) => sum + value, 0));
            `);

            assert.equal(await context.module.exports, 10);
        },
    },
    {
        name: "supports generators and yield-based iteration",
        async run() {
            const { context } = await executeHindi(`
                कार्य* संख्या_श्रृंखला() {
                    वापसी 1;
                    वापसी 2;
                    वापसी 3;
                }

                स्थिर iterator = संख्या_श्रृंखला();
                module.exports = [
                    iterator.next().value,
                    iterator.next().value,
                    iterator.next().value,
                    iterator.next().done
                ];
            `);

            assert.deepEqual(normalize(context.module.exports), [1, 2, 3, true]);
        },
    },
    {
        name: "supports prototype-based extension and object freezing",
        async run() {
            const { context } = await executeHindi(`
                कार्य Person(नाम) {
                    यह.नाम = नाम;
                }

                Person.प्रोटो.बोलो = कार्य() {
                    लौटाओ this.नाम + " तैयार है";
                };

                स्थिर config = ऑब्जेक्ट.जमाओ({ mode: "production" });
                स्थिर dev = नया बनाओ Person("मोहन");

                module.exports = {
                    speech: dev.बोलो(),
                    frozen: Object.isFrozen(config)
                };
            `);

            assert.deepEqual(normalize(context.module.exports), {
                speech: "मोहन तैयार है",
                frozen: true,
            });
        },
    },
    {
        name: "supports browser event-style code paths with full Hindi aliases where available",
        async run() {
            const listeners = {};
            const { context } = await executeHindi(`
                स्थिर बटन = दस्तावेज.getElementById("save");
                नया clicked = 0;

                बटन.addEventListener("click", कार्य() {
                    clicked = clicked + 1;
                });

                बटन.click();
                बटन.click();
                module.exports = clicked;
            `, {
                document: {
                    getElementById() {
                        return {
                            addEventListener(name, handler) {
                                listeners[name] = handler;
                            },
                            click() {
                                listeners.click();
                            },
                        };
                    },
                },
            });

            assert.equal(context.module.exports, 2);
        },
    },
    {
        name: "supports backend request processing style transformations",
        async run() {
            const { context } = await executeHindi(`
                कार्य validateAndNormalize(body) {
                    अगर (!body.email) {
                        फेंको नया बनाओ त्रुटि("email required");
                    }

                    लौटाओ {
                        ...body,
                        email: body.email.काटो().छोटे_अक्षर(),
                        roles: body.roles ?? ["user"]
                    };
                }

                स्थिर payload = validateAndNormalize({
                    email: "  ADMIN@EXAMPLE.COM ",
                    roles: ["admin"]
                });

                module.exports = payload;
            `);

            assert.deepEqual(normalize(context.module.exports), {
                email: "admin@example.com",
                roles: ["admin"],
            });
        },
    },
];

(async () => {
    console.log("Running spec-style compatibility tests...\n");

    let passed = 0;

    for (const test of tests) {
        process.stdout.write(`- ${test.name} `);
        try {
            await test.run();
            console.log("OK");
            passed++;
        } catch (error) {
            console.log("FAILED");
            console.error(error);
            process.exitCode = 1;
            break;
        }
    }

    if (process.exitCode) {
        process.exit(process.exitCode);
    }

    console.log(`\nSpec coverage passed: ${passed}/${tests.length}`);
})();
