स्थिर path = मांगो("path");

मॉड्यूल.exports = {
    label: "node-runtime-helper",
    folderName(filePath) {
        लौटाओ path.basename(path.dirname(filePath));
    }
};
