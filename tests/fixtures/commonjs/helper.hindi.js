// CommonJS fixture helper module

कार्य योग_निकालो(values) {
    लौटाओ values.कमकरो((sum, value) => sum + value, 0);
}

कार्य लेबल_बनाओ(name, total) {
    लौटाओ `${name}: ${total}`;
}

मॉड्यूल.exports = {
    योग_निकालो,
    लेबल_बनाओ,
};
