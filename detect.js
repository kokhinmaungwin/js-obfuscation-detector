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

function decodeJSFuck(str) {
  if (!/[\[\]\(\)\!\+]{10,}/.test(str)) return null;
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

// Decode function map
const decoders = {
  base64: decodeBase64,
  urlencode: decodeURL,
  jsfuck: decodeJSFuck,
  jjencode: decodeJJ,
  aaencode: decodeAA,
  packer: decodePacker
  // add more if needed
};

function detectObfuscation(src) {
    let s = src.trim();

    try {
        if (/^[A-Za-z0-9+/=]+\s*$/.test(s) && atob(s)) {
            return "base64";
        }
    } catch {}

    if (
        s.includes('%') &&
        (/%[0-9A-Fa-f]{2}/.test(s) || s.split('%').length > 4)
    ) {
        return "urlencode";
    }

    if (/^[\[\]\(\)!+]+$/.test(s)) {
        return "jsfuck";
    }

    if (
        s.includes('$={') ||
        s.includes('$_=') ||
        /\$\[[^\]]+\]=/.test(s) ||
        /^\$+[\s\S]+?\$/.test(s)
    ) {
        return "jjencode";
    }

    if (
        s.startsWith("ﾟ") ||
        s.includes("/*´∇｀*/") ||
        /ﾟ[\s\S]*?ωﾟ/.test(s)
    ) {
        return "aaencode";
    }

    if (s.includes("eval(function(p,a,c,k,e,d)") || /\.split\('\|'\)/.test(s)) {
        return "packer";
    }

    // other detect rules omitted for brevity...

    return "none";
}

// ===== UI FUNCTION =====
function checkType() {
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

// Helper to escape HTML so output is safe to display
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
