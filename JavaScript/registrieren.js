async function registerUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!username || !password) {
        message.innerText = "Bitte alle Felder ausfüllen.";
        return;
    }

    try {
        const response = await fetch("http://localhost:5123/api/register", {  // 🔥 WICHTIG: Volle URL nutzen!
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Username: username, PasswordHash: password })
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
