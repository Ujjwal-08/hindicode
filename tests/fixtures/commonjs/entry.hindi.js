// Multi-file CommonJS fixture entry

स्थिर helper = मांगो("./helper.hindi.js");
स्थिर calc = मांगो("./services/calc.hindi.js");
स्थिर config = मांगो("./data/config.hindi.js");

स्थिर numbers = [5, 10, 15];
स्थिर total = helper.योग_निकालो(numbers);
स्थिर labeled = helper.लेबल_बनाओ(config.appName, total);
स्थिर doubled = calc.दोगुना(total);

स्थिर result = {
    app: config.appName,
    total,
    doubled,
    labeled,
    env: config.environment,
    version: config.version
};

प्रक्रिया.__hindicode_fixture_result = result;
मॉड्यूल.exports = result;
