function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Decode functions
  function decodeBase64(str) {
    try {
      return atob(str);
    } catch {
      return null;
    }
  }

  function decodeURL(str) {
    try {
      return decodeURIComponent(str);
    } catch {
      return null;
    }
  }

  function decodeHex(str) {
    try {
      const fixedStr = str.replace(/\\\\/g, "\\");
      return eval(`"${fixedStr}"`);
    } catch {
      return null;
    }
  }

  function decodeUnicodeEscape(str) {
    try {
      const fixedStr = str.replace(/\\\\/g, "\\");
      return eval(`"${fixedStr}"`);
    } catch {
      return null;
    }
  }

  function decodeJSFuck(str) {
    if (!/[\[\]\(\)!+]{10,}/.test(str)) return null;
    try {
      return eval(str);
    } catch {
      return null;
    }
  }

  function decodeJJ(str) {
    if (!str.includes('$={') && !str.includes('$_=')) return null;
    try {
      return eval(str);
    } catch {
      return null;
    }
  }

  function decodeAA(str) {
    if (!str.startsWith("ﾟ")) return null;
    try {
      return eval(str);
    } catch {
      return null;
    }
  }

  function decodePacker(str) {
    if (!str.includes("eval(function(p,a,c,k,e,d)")) return null;
    try {
      return eval(str);
    } catch {
      return null;
    }
  }

  // Detection function
  function detectObfuscation(src) {
    let s = src.trim();
    
    try {
      if (/^[A-Za-z0-9+/=]+\s*$/.test(s) && atob(s)) return "base64";
    } catch {}
    
    if (s.includes('%') && (/%[0-9A-Fa-f]{2}/.test(s) || s.split('%').length > 4)) return "urlencode";
    
    if (/^[\[\]\(\)!+]+$/.test(s)) return "jsfuck";
    
    if (s.includes('$={') || s.includes('$_=') || /\$\[[^\]]+\]=/.test(s) || /^\$+[\s\S]+?\$/.test(s)) return "jjencode";
    
    if (s.startsWith("ﾟ") || s.includes("/*´∇｀*/") || /ﾟ[\s\S]*?ωﾟ/.test(s)) return "aaencode";
    
    if (s.includes("eval(function(p,a,c,k,e,d)") || /\.split\('\|'\)/.test(s)) return "packer";
    
    if (/var\s*_0x[a-fA-F0-9]{4,}\s*=\s*\[/.test(s) || /\b_0x[a-fA-F0-9]{4,}\(/.test(s)) return "arrayencode";
    
    if (/var\s+_[0-9a-fA-F]{3,6}\s*=\s*(?:\d+,?)+/.test(s)) return "_numberencode";
    
    if (s.includes("eval(")) {
      if (!/\b(window|document|console)\./i.test(s)) return "evalencode";
      return "safe-eval";
    }
    
    if (/\\x[0-9A-Fa-f]{2}/.test(s)) return "hexencode";
    
    if (/\\u[0-9a-fA-F]{4}/.test(s) || /\\u\{[0-9a-fA-F]+\}/.test(s)) return "unicodeescape";
    
    if (/\bfunction\b/.test(s) && /var _0x[a-fA-F0-9]+/.test(s) && /while\s*\(--/.test(s)) return "obfuscator.io";
    
    return "none";
  }

  // Decoder map
  const decoders = {
    base64: decodeBase64,
    urlencode: decodeURL,
    jsfuck: decodeJSFuck,
    jjencode: decodeJJ,
    aaencode: decodeAA,
    packer: decodePacker,
    hexencode: decodeHex,
    unicodeescape: decodeUnicodeEscape,
    // add more if needed
  };

  // Main UI decode function
  function checkTypeAndDecode() {
    let code = document.getElementById("inputCode").value.trim();
    
    if (!code) {
      document.getElementById("resultBox").innerHTML = "❌ Please paste some code!";
      return;
    }
    
    let detected = detectObfuscation(code);
    let decoded = null;
    
    if (detected !== "none" && decoders[detected]) {
      decoded = decoders[detected](code);
    }
    
    let output = `<b>Detected:</b> ${detected}<br><br>`;
    output += `<b>Decoded Output:</b><br>`;
    
    if (decoded) {
      output += `<pre style="white-space: pre-wrap; background:#222; padding:10px; border-radius:6px; color:#0f0;">${escapeHtml(decoded)}</pre>`;
    } else {
      output += `<i>Failed to decode or no decoder implemented for this type.</i>`;
    }
    
    document.getElementById("resultBox").innerHTML = output;
  }
