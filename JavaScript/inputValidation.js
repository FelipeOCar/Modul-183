function validateInputFields() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!validateInput(username) || !validateInput(password)) {
        alert("Ungültige Eingabe. Nur alphanumerische Zeichen sind erlaubt.");
        return false;
    }
    return true;
}
