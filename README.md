# HindiCode - हिंदी में जावास्क्रिप्ट लिखें! 🚀

## परिचय
**HindiCode** एक अनोखा NPM पैकेज है जो आपको **हिंदी में जावास्क्रिप्ट** लिखने की सुविधा देता है। यह कोड को रन-टाइम पर **हिंदी से जावास्क्रिप्ट** में परिवर्तित करता है ताकि आप **JavaScript के कीवर्ड्स हिंदी में** लिख सकें!

🔹 **दृष्टांत:**  
```hindi
स्थिर x = 10;
अगर (x > 5) {
    दिखाओ("x बड़ा है!");
} अन्यथा {
    दिखाओ("x छोटा है!");
}
```
✅ **परिवर्तित जावास्क्रिप्ट कोड:**  
```javascript
const x = 10;
if (x > 5) {
    console.log("x बड़ा है!");
} else {
    console.log("x छोटा है!");
}
```

---

## 📌 विशेषताएँ
✔ **हिंदी में कोडिंग:** जावास्क्रिप्ट के कीवर्ड्स हिंदी में!  
✔ **रन-टाइम ट्रांसपाइलर:** `.hindi.js` फ़ाइल को डायरेक्ट रन करें।  
✔ **स्ट्रिंग्स सुरक्षित:** कोड में लिखे हुए टेक्स्ट को अनछुए रखता है।  
✔ **सिंपल सेटअप:** बस इंस्टॉल करें और उपयोग करें!  

---

## 🔧 इंस्टॉलेशन
```sh
npm install -g hindicode
```

---

## 🚀 उपयोग कैसे करें?

### **1️⃣ हिंदी कोड लिखें**
`.hindi.js` फाइल बनाएं और हिंदी में जावास्क्रिप्ट लिखें:
```hindi
// test.hindi.js
स्थिर संख्या = 42;
दिखाओ("संख्या है:", संख्या);

कार्य जोड़ो(क, ख) {
    लौटाओ क + ख;
}

दिखाओ("जोड़:", जोड़ो(5, 7));
```

### **2️⃣ सीधे चलाएँ**
```sh

node test.hindi.js
or
node hindicode test.hindi.js


✅ आउटपुट:
```
संख्या है: 42
जोड़: 12
```

---

## 🔍 कैसे काम करता है?
**HindiCode** रन-टाइम पर `.hindi.js` फ़ाइल को लोड करता है और उसमें लिखे गए **हिंदी कीवर्ड्स को जावास्क्रिप्ट में** बदलकर उसे रन करता है।

```javascript
require.extensions[".hindi.js"] = function (module, filename) {
    let content = fs.readFileSync(filename, "utf8").trim();
    content = translateHindiJS(content);
    module._compile(content, filename);
};
```

---

## 📖 हिंदी से जावास्क्रिप्ट कीवर्ड्स मैपिंग
| **हिंदी** | **जावास्क्रिप्ट** |
|-----------|------------------|
| अगर       | if               |
| अन्यथा   | else             |
| दिखाओ    | console.log      |
| कार्य     | function         |
| लौटाओ    | return           |
| चलाओ     | for              |
| जबतक     | while            |
| नया       | let              |
| स्थिर     | const            |
| परिभाषा  | var              |
| सही       | true             |
| गलत      | false            |



---

## 💖 सहयोग करें!
अगर आपको **HindiCode** पसंद आया हो, तो हमारे प्रोजेक्ट को **सपोर्ट** करें!  
👉 [डोनेट करें - Patreon](https://www.patreon.com/c/BABU_ISHU)

---

## 📜 लाइसेंस
यह प्रोजेक्ट **MIT लाइसेंस** के अंतर्गत जारी किया गया है।  
आप इसे फ्री में उपयोग कर सकते हैं, लेकिन इसका सही उपयोग करें! 😊

---

## 🚀 योगदान करें
अगर आपके पास कोई सुझाव या नया फ़ीचर जोड़ना चाहते हैं, तो GitHub पर PR भेजें!  
**Happy Coding! ❤️**

# HindiCode - Write JavaScript in Hindi! 🚀  

## Introduction  
**HindiCode** is an NPM package that allows you to **write JavaScript in Hindi**. It transpiles **Hindi keywords into JavaScript** at runtime, enabling you to code in Hindi seamlessly!  

🔹 **Example:**  
```hindi
स्थिर x = 10;
अगर (x > 5) {
    दिखाओ("x बड़ा है!");
} अन्यथा {
    दिखाओ("x छोटा है!");
}
```
✅ **Transpiled JavaScript:**  
```javascript
const x = 10;
if (x > 5) {
    console.log("x बड़ा है!");
} else {
    console.log("x छोटा है!");
}
```

---

## 📌 Features  
✔ **Code in Hindi:** Use Hindi keywords instead of JavaScript ones.  
✔ **Runtime Transpiler:** Run `.hindi.js` files directly.  
✔ **String Protection:** Keeps your string content untouched.  
✔ **Simple Setup:** Install and start using immediately.  

---

## 🔧 Installation  
```sh
npm install -g hindicode
```

---

## 🚀 How to Use?  

### **1️⃣ Write Hindi Code**  
Create a `.hindi.js` file and write JavaScript using Hindi keywords:  
```hindi
// test.hindi.js
स्थिर संख्या = 42;
दिखाओ("संख्या है:", संख्या);

कार्य जोड़ो(क, ख) {
    लौटाओ क + ख;
}

दिखाओ("जोड़:", जोड़ो(5, 7));
```

### **2️⃣ Run Directly**  
```sh
node test.hindi.js
or
node hindicode test.hindi.js
```
✅ **Output:**  
```
संख्या है: 42  
जोड़: 12  
```

---

## 🔍 How Does It Work?  
**HindiCode** hooks into Node.js and **transpiles Hindi keywords into JavaScript** at runtime before execution.

```javascript
require.extensions[".hindi.js"] = function (module, filename) {
    let content = fs.readFileSync(filename, "utf8").trim();
    content = translateHindiJS(content);
    module._compile(content, filename);
};
```

---

## 📖 Hindi to JavaScript Keyword Mapping  
| **Hindi**   | **JavaScript** |
|------------|--------------|
| अगर       | if           |
| अन्यथा    | else         |
| दिखाओ     | console.log  |
| कार्य      | function     |
| लौटाओ     | return       |
| चलाओ      | for          |
| जबतक      | while        |
| नया       | let          |
| स्थिर      | const        |
| परिभाषा   | var          |
| सही       | true         |
| गलत       | false        |



---

## 💖 Support Us!  
If you like **HindiCode**, consider supporting the project!  
👉 [Donate on Patreon](https://www.patreon.com/c/BABU_ISHU)  

---

## 📜 License  
This project is released under the **MIT License**.  
Feel free to use it responsibly! 😊  

---

## 🚀 Contribute  
Have suggestions or want to add new features? Submit a PR on GitHub!  
**Happy Coding! ❤️**  
