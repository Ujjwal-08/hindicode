// tests/11_collections.hindi.js

console.log("🚀 Testing Collections (Map/Set)...");

// ── Set ──
let मेरा_सेट = new Set();
मेरा_सेट.add(10); 
मेरा_सेट.add(20);
मेरा_सेट.add(10); // Duplicate
console.log("सेट का आकार:", मेरा_सेट.size);
console.log("क्या 10 है?", मेरा_सेट.has(10));

// ── Map ──
let Map = new Map();
Map.set("नाम", "शुभम");
Map.set("भाषा", "हिंदी");
console.log("नक्शा प्राप्त:", Map.get("नाम"));
console.log("नक्शा आकार:", Map.size);

Map.forEach((values, कुंजी) => {
    console.log(`${कुंजी} -> ${values}`);
});

// ── Object entries ──
const स्थानीय_व्यक्ति = { नाम: "प्रिया", आयु: 20 };
Object.entries(स्थानीय_व्यक्ति).forEach(([कुंजी, values]) => {
    console.log(`Entry: ${कुंजी} = ${values}`);
});
