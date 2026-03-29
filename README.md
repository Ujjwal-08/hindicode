# HindiCode - हिंदी में जावास्क्रिप्ट लिखें! 🚀
> Write JavaScript in Hindi with Industrial-Grade Robustness.

---

## 🌍 [HI] परिचय (Introduction)
**HindiCode** एक आधुनिक NPM पैकेज है जो आपको **हिंदी में जावास्क्रिप्ट** लिखने की सुविधा देता है। यह कोड को रन-टाइम पर पार्स करता है और हिंदी के कीवर्ड्स को जावास्क्रिप्ट में बदल देता है।

**HindiCode** is a modern NPM package that lets you **write JavaScript in Hindi**. It transpiles Hindi keywords into JavaScript at runtime, enabling a seamless native coding experience.

### 🔹 Example (उदाहरण)
```javascript
स्थिर x = 10;
अगर (x > 5) {
    दिखाओ("x बड़ा है!");
} अन्यथा {
    दिखाओ("x छोटा है!");
}
```

---

## 🌟 Features (विशेषताएँ)
- **Industrial-Grade Protection**: 
  - **🛡️ Comment Protection**: Keywords inside `//` or `/* */` are never translated.
  - **🛡️ String Protection**: Your text inside `" "` or `' '` stays exactly as written.
  - **🛡️ Regex Protection**: Search patterns like `/अगर/g` are preserved perfectly.
- **Smart Template Literals**: Supports full `${}` interpolation with recursive translation.
- **Unicode Boundaries**: Professional word boundaries ensure `नम` doesn't break `नमस्ते`.
- **Zero Configuration**: Just register the hook and run `.hindi.js` files.

---

## 🔧 Installation (स्थापना)
```sh
npm install hindicode
```

---

## 🚀 Usage (उपयोग)

### 1. Register the Transpiler
Add this to your entry point (e.g., `index.js`):
```javascript
require('hindicode');
require('./your-file.hindi.js');
```

### 2. Write in Hindi (`.hindi.js`)
```javascript
// app.hindi.js
नया नाम = "अर्जुन";
दिखाओ(`नमस्ते ${नाम}!`);

कार्य जोड़(अ, ब) {
    लौटाओ अ + ब;
}

दिखाओ("योग:", जोड़(10, 20));
```

---

## 🖥️ Windows Console Setup (Fix Hindi Visibility)
If you are using **PowerShell** or **CMD** and cannot see Hindi characters correctly, run this command in your terminal:

```powershell
# For PowerShell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
chcp 65001
```

**Note**: Ensure your terminal font is set to a Unicode-compatible font like **Cascadia Code**, **Consolas**, or **MS Gothic**.

---

## 📖 Keyword Mapping (प्रमुख कीवर्ड्स)
| Hindi | JavaScript | Hindi | JavaScript |
| :--- | :--- | :--- | :--- |
| **अगर** | if | **वरना** / **नहीं तो** | else |
| **नया** | let | **स्थिर** | const |
| **कार्य** | function | **लौटाओ** | return |
| **दिखाओ** | console.log | **गलती** | console.error |
| **जबतक** | while | **केलिए** / **हरएक** | for |
| **असिंक** | async | **इंतज़ार** | await |
| **सच** | true | **झूठ** | false |
| **खाली** | null | **अपरिभाषित** | undefined |
| **कोशिश** | try | **पकड़ो** | catch |
| **वर्ग** | class | **विस्तार** | extends |
| **आयात** | import | **निर्यात** | export |
| **मांगो** | require | **मॉड्यूल** | module |

*(Check `index.js` for the full dictionary of **160+ terms**, including Math, JSON, and Node.js APIs!)*

---

## 🗺️ Roadmap (भविष्य की योजना)
- [ ] **Hindi Variables**: Support for non-keyword Hindi tokens as identifiers.
- [ ] **Hindi CLI**: A dedicated runner (`hindicode my-file.hindi.js`).
- [ ] **VS Code Extension**: Syntax highlighting and snippets for `.hindi.js`.
- [ ] **Hindi Error Messages**: Localized compiler errors.
- [ ] **Hindi-DOM**: Support for `दस्तावेज़` (document) and `खिड़की` (window).

---

## 💖 Contribute (योगदान)
We welcome contributions! Star the repo and join the movement to make coding accessible in every language. 

👉 **Support Us**: [Patreon](https://www.patreon.com/c/BABU_ISHU)

---

## 📜 License
Released under the **MIT License**. 😊
