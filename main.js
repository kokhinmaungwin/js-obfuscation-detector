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

  // Copy decoded output to clipboard
  function copyResult() {
    const resultBox = document.getElementById("resultBox");
    const range = document.createRange();
    range.selectNodeContents(resultBox);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert('Copied to clipboard!');
      } else {
        alert('Copy failed.');
      }
    } catch (err) {
      alert('Copy failed.');
    }

    selection.removeAllRanges();
  }

  // Clear input and output
  function clearAll() {
    document.getElementById("inputCode").value = "";
    document.getElementById("resultBox").innerHTML = "Decoded output will appear here...";
  }
