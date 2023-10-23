document.addEventListener("DOMContentLoaded", function () {
    const upperSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerSet = "abcdefghijklmnopqrstuvwxyz";
    const numberSet = "1234567890";
    const symbolSet = "~!@#$%^&*()_+/";
    
    const lowerInput = document.getElementById('lower-case');
    const upperInput = document.getElementById('upper-case');
    const numberInput = document.getElementById('numbers');
    const symbolInput = document.getElementById('symbols');
    const totalChar = document.getElementById('total-char');
    const passBox = document.getElementById('pass-box');
    const generateButton = document.getElementById("btn");
    
    generateButton.addEventListener("click", function () {
        if (!(lowerInput.checked || upperInput.checked || numberInput.checked || symbolInput.checked)) {
            alert("Please select at least one character set.");
            return;
        }
        
        let charset = "";
        if (upperInput.checked) charset += upperSet;
        if (lowerInput.checked) charset += lowerSet;
        if (numberInput.checked) charset += numberSet;
        if (symbolInput.checked) charset += symbolSet;
        
        const passwordLength = parseInt(totalChar.value);
        if (isNaN(passwordLength) || passwordLength < 1) {
            alert("Please enter a valid password length.");
            return;
        }
        
        const generatedPassword = generatePassword(charset, passwordLength);
        passBox.innerText = generatedPassword;

        
        if (generatedPassword) {
            const copyButton = document.createElement("button");
            copyButton.innerText = "Copy";
            copyButton.addEventListener("click", function () {
                copyToClipboard(generatedPassword);
            });
            passBox.appendChild(copyButton);
        }
    });

    function generatePassword(charset, length) {
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset.charAt(randomIndex);
        }
        return password;
    }

    function copyToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Password copied to clipboard!");
    }
});
