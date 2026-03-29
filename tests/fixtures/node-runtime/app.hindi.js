स्थिर fs = मांगो("fs");
स्थिर path = मांगो("path");
स्थिर helper = मांगो("./helper.hindi.js");

स्थिर mode = प्रक्रिया.env.HINDICODE_MODE || "unknown";
स्थिर cwdName = path.basename(प्रक्रिया.cwd());
स्थिर outputFile = path.resolve(__डायरेक्टरी, "runtime-output.txt");
स्थिर payload = तार_बनाओ({
    cwdName,
    mode,
    helperLabel: helper.label,
    folderName: helper.folderName(__नाम),
    argvCount: प्रक्रिया.argv.length
});

fs.writeFileSync(outputFile, payload, "utf8");
स्थिर beforeCleanup = fs.existsSync(outputFile);
स्थिर written = fs.readFileSync(outputFile, "utf8");
स्थिर parsed = पार्स(written);
fs.unlinkSync(outputFile);

प्रक्रिया.__hindicode_node_runtime_result = {
    cwdName,
    mode,
    helperLabel: parsed.helperLabel,
    folderName: parsed.folderName,
    argvCount: parsed.argvCount,
    beforeCleanup,
    removedAfterRun: !fs.existsSync(outputFile),
    outputFileName: path.basename(outputFile)
};

मॉड्यूल.exports = प्रक्रिया.__hindicode_node_runtime_result;
