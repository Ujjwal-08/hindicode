const fs = अनुरोध('fs');
const path = अनुरोध('path');

const inputPath = path.join(__dirname, 'data.json');
const outputPath = path.join(__dirname, 'output.json');

// Read JSON
const rawData = fs.readFileSync(inputPath, 'utf8');
const data = JSON.parse(rawData);

// Process data using Hindi logic
अगर (data.active) {
    data.status = "सक्रिय";
} वरना {
    data.status = "निष्क्रिय";
}

data.processed = सत्य;
data.length = data.items.लम्बाई; // Assuming लम्बाई is an alias for length

// Write JSON back
fs.writeFileSync(outputPath, JSON.stringify(data, null, 4));

// Store result for test verification
process.__hindicode_json_result = data;
