const user = {
    role: 'user',  // Setze die Rolle des Users
    name: 'Max Mustermann',
    balance: 100.00
};

document.addEventListener('DOMContentLoaded', function () {
    // Benutzername und Kontostand setzen
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('balance').textContent = `Kontostand: €${user.balance}`;
});

function logout() {
    alert('Abgemeldet!');
    window.location.href = '/login';  // Hier zur Login-Seite weiterleiten
}

function editProfile() {
    alert('Profil bearbeiten...');
}
