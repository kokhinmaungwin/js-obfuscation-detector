function detectObfuscation(src) {
    let s = src.trim();

    // ========== BASE64 ==========
    try {
        if (/^[A-Za-z0-9+/=]+\s*$/.test(s) && atob(s)) {
            return "base64";
        }
    } catch {}

    // ========== URL ENCODE ==========
    if (
        s.includes('%') &&
        (/%[0-9A-Fa-f]{2}/.test(s) || s.split('%').length > 4)
    ) {
        return "urlencode";
    }

    // ========== JSFUCK ==========
    if (/^[\[\]\(\)!+]+$/.test(s)) {
        return "jsfuck";
    }

    // ========== JJENCODE ==========
    if (
        s.includes('$={') ||
        s.includes('$_=') ||
        /\$\[[^\]]+\]=/.test(s) ||
        /^\$+[\s\S]+?\$/.test(s)
    ) {
        return "jjencode";
    }

    // ========== AAENCODE ==========
    if (
        s.startsWith("ﾟ") ||
        s.includes("/*´∇｀*/") ||
        /ﾟ[\s\S]*?ωﾟ/.test(s)
    ) {
        return "aaencode";
    }

    // ========== DEAN EDWARDS PACKER ==========
    if (s.includes("eval(function(p,a,c,k,e,d)") || /\.split\('\|'\)/.test(s)) {
        return "packer";
    }

    // ========== ARRAY-ENCODE ==========
    if (
        /var\s*_0x[a-fA-F0-9]{4,}\s*=\s*\[/.test(s) ||
        /\b_0x[a-fA-F0-9]{4,}\(/.test(s)
    ) {
        return "arrayencode";
    }

    // ========== NUMBER-ENCODE ==========
    if (/var\s+_[0-9a-fA-F]{3,6}\s*=\s*(?:\d+,?)+/.test(s)) {
        return "_numberencode";
    }

    // ========== NORMAL eval OBFUSCATION ==========
    if (s.includes("eval(")) {
        if (!/\b(window|document|console)\./i.test(s)) {
            return "evalencode";
        }
        return "safe-eval";
    }

    // ========== HEX ENCODE ==========
    if (/\\x[0-9A-Fa-f]{2}/.test(s)) {
        return "hexencode";
    }

    // ========== SIMPLE OBFUSCATOR.IO ==========
    if (
        /\bfunction\b/.test(s) &&
        /var _0x[a-fA-F0-9]+/.test(s) &&
        /while\s*\(--/.test(s)
    ) {
        return "obfuscator.io";
    }

    return "none";
}

// ===== UI FUNCTION =====
function checkType() {
    let code = document.getElementById("inputCode").value.trim();

    if (!code) {
        document.getElementById("resultBox").innerHTML = "❌ Please paste some code!";
        return;
    }

    let result = detectObfuscation(code);

    document.getElementById("resultBox").innerHTML = `Detected: <b>${result}</b>`;
}
