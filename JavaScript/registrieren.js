function validateInput(input) {
    const regex = /^[a-zA-Z0-9_]+$/; // Erlaubt nur Buchstaben, Zahlen und Unterstriche
    return regex.test(input);
}

async function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!validateInput(username) || !validateInput(password)) {
        message.innerText = "Ungültige Eingabe. Bitte nur Buchstaben, Zahlen und Unterstriche verwenden.";
        return;
    }

    if (!username || !password) {
        message.innerText = "Bitte alle Felder ausfüllen.";
        return;
    }

    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role: "User" })
        });

        const data = await response.json();
        if (response.ok) {
            message.style.color = "green";
            message.innerText = "Registrierung erfolgreich!";
            setTimeout(() => { window.location.href = "login.html"; }, 1500);
        } else {
            message.style.color = "red";
            message.innerText = data.error || "Registrierung fehlgeschlagen.";
        }
    } catch (error) {
        message.style.color = "red";
        message.innerText = "Fehler beim Verbinden mit dem Server.";
    }
}
