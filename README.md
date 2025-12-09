# JS Obfuscation Detector (Offline + PWA)

A fast, lightweight JavaScript Obfuscation Detector that works **100% offline** and can be installed as a **PWA app** on Android, Windows, and Desktop browsers.

This tool can detect multiple types of encoded or obfuscated JavaScript such as:
- Base64
- URL Encode
- JSFuck
- JJEncode
- AAEncode
- Dean Edwards Packer
- Array Encode
- Hex Encode
- Number Encode
- Obfuscator.io patterns
- Eval-based obfuscation

---

## 🚀 Features

- 🔍 **Auto-detect obfuscation type**
- 📤 **Instant detection (no server needed)**
- 📱 **Installable PWA app**
- 📴 **Works fully offline**
- ⚡ **Fast Web Worker processing**
- 🎨 Clean UI + simple to use
- 🛡 No data sent anywhere (100% privacy)

---

## 📁 Folder Structure

```txt
/js-obfuscation-detector/
│── index.html
│── style.css
│── detect.js
│── main.js
│── manifest.json
│── sw.js
│── /icons/
│      ├── icon-192.png
│      └── icon-512.png

```
---

## 📦 Installation (PWA)

1. Open the website in Chrome (or any PWA-supported browser)
2. Press **Install App** button  
   or  
   “Add to Home Screen” from browser menu
3. Done! App now works offline.

---

## 🛠 Local Development

Clone this repo:

```bash
git clone https://github.com/yourusername/js-obfuscation-detector.git
```
Open index.html in your browser.

If you want to test service worker (offline mode), run a simple local server:

npx serve


---

## 🌐 Deploy to GitHub Pages

1. Go to Settings → Pages


2. Select branch: main


3. Folder: /root


4. Save



Your tool will be live at:

https://yourusername.github.io/js-obfuscation-detector/

---

# JS Obfuscation Detector & Decoder

**Version:** 2.0  
**Author:** Khin Maung Win  
**Description:** This tool detects and decodes various JavaScript obfuscation techniques such as base64, jjencode, aaencode, jsfuck, packer, arrayencode, numberencode, hexencode, unicodeescape, etc.

---

## Usage

Paste your obfuscated JavaScript code into the input box and click "Decode" to see the detected type and the decoded output.

---

## 📝 License

This project is open-source under MIT License.
See full license in LICENSE file.


---

## ❤️ Contributions

Pull requests are welcome.
If you find bugs or want new decode types, feel free to open an issue.


---

## 👨‍💻 Author

Developed by Khin Maung Win
Offline-ready, fast, and useful for daily JavaScript analysis.

---
