function validateInput(input) {
    // Beispiel für einfache Validierung, um SQL-Injection zu verhindern
    const regex = /^[a-zA-Z0-9_]+$/; // Erlaubt nur alphanumerische Zeichen und Unterstriche
    return regex.test(input);
}

function handleAuth() {
    const message = document.getElementById("message");
    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {
        message.innerText = translations[currentLang].captchaError;
        return;
    }

    let username, password;
    if (isLogin) {
        // Login-Felder
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;

        // Input Validierung
        if (!validateInput(username) || !validateInput(password)) {
            message.innerText = "Ungültige Eingabe. Versuchen Sie es erneut.";
            return;
        }

        if (!username || !password) {
            message.innerText = translations[currentLang].fillAllFields;
            return;
        }

        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            logAction("login", username); // Loggen des Logins
            message.style.color = "green";
            message.innerText = translations[currentLang].loginSuccess;
            setTimeout(() => {
                alert(translations[currentLang].loginAlert);
            }, 500);
        } else {
            message.style.color = "red";
            message.innerText = translations[currentLang].wrongLogin;
        }
    }
}
