async function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!username || !password) {
        message.innerText = "Bitte alle Felder ausfüllen.";
        return;
    }

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            message.style.color = "green";
            message.innerText = "Login erfolgreich!";
            // Weiterleitung oder weitere Aktionen hier hinzufügen
        } else {
            message.style.color = "red";
            message.innerText = data.error || "Login fehlgeschlagen.";
        }
    } catch (error) {
        message.style.color = "red";
        message.innerText = "Fehler beim Verbinden mit dem Server.";
    }
}