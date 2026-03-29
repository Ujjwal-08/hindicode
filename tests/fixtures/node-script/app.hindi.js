// Node script fixture for argv/env/file workflow

स्थिर fs = मांगो("fs");
स्थिर path = मांगो("path");

स्थिर name = प्रक्रिया.argv[2] || "अतिथि";
स्थिर mode = प्रक्रिया.env.HINDICODE_MODE || "dev";
स्थिर outputFile = path.join(__डायरेक्टरी, "script-output.txt");
स्थिर message = `${name}:${mode}`;

fs.writeFileSync(outputFile, message, "utf8");
स्थिर written = fs.readFileSync(outputFile, "utf8");
fs.unlinkSync(outputFile);

प्रक्रिया.__hindicode_node_script_result = {
    name,
    mode,
    written,
    outputFile: path.basename(outputFile)
};

मॉड्यूल.exports = प्रक्रिया.__hindicode_node_script_result;
