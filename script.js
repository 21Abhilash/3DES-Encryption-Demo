// --- Encrypt Function ---
function encryptText() {
  const plaintext = document.getElementById("plaintext").value;
  const key = document.getElementById("key").value;

  if (key.length !== 24) {
    alert("Key must be exactly 24 characters for 3-key 3DES.");
    return;
  }

  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const iv = CryptoJS.lib.WordArray.random(8);

  const encrypted = CryptoJS.TripleDES.encrypt(plaintext, keyHex, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const output = {
    iv: CryptoJS.enc.Hex.stringify(iv),
    ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
  };

  document.getElementById("ciphertext").value = JSON.stringify(output, null, 2);
  document.getElementById("decrypted").value = "";
}

// --- Decrypt Function ---
function decryptText() {
  try {
    const key = document.getElementById("key").value;
    const encryptedData = JSON.parse(document.getElementById("ciphertext").value);

    const iv = CryptoJS.enc.Hex.parse(encryptedData.iv);
    const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.ciphertext);
    const keyHex = CryptoJS.enc.Utf8.parse(key);

    const decrypted = CryptoJS.TripleDES.decrypt(
      { ciphertext: ciphertext },
      keyHex,
      { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    document.getElementById("decrypted").value = plaintext || "Invalid decryption!";
  } catch (err) {
    alert("Error decrypting! Ensure ciphertext format is correct.");
  }
}
