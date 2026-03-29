// tests/20_node_pipeline.hindi.js
// Node production pipeline style coverage

स्थिर fs = मांगो("fs");
स्थिर os = मांगो("os");
स्थिर path = मांगो("path");

दिखाओ("🗂️ Testing Node data pipeline...");

स्थिर folder = fs.mkdtempSync(path.join(os.tmpdir(), "hindicode-pipeline-"));
स्थिर inputFile = path.join(folder, "orders.json");

स्थिर orders = [
    { id: 1, status: "paid", amount: 100 },
    { id: 2, status: "draft", amount: 50 },
    { id: 3, status: "paid", amount: 250 }
];

fs.writeFileSync(inputFile, तार_बनाओ(orders), "utf8");

स्थिर loaded = पार्स(fs.readFileSync(inputFile, "utf8"));
स्थिर report = loaded
    .फ़िल्टर((item) => item.status बराबर "paid")
    .कमकरो((acc, item) => {
        acc.count++;
        acc.total += item.amount;
        लौटाओ acc;
    }, { count: 0, total: 0 });

बराबर_है(report.count, 2);
बराबर_है(report.total, 350);

fs.unlinkSync(inputFile);
fs.rmdirSync(folder);
