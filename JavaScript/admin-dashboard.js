const adminUser = {
    role: 'admin',  // Setze die Rolle des Admins
    name: 'Max Mustermann',
    balance: 1000.00,
    users: [
        { name: 'User1', balance: 150.00 },
        { name: 'User2', balance: 200.00 },
    ]
};

document.addEventListener('DOMContentLoaded', function () {
    // Benutzername und Kontostand setzen
    document.getElementById('user-name').textContent = adminUser.name;
    document.getElementById('balance').textContent = `Kontostand: €${adminUser.balance}`;

    // Benutzerliste anzeigen
    const userList = document.getElementById('user-list');
    adminUser.users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.name}: €${user.balance}`;
        userList.appendChild(listItem);
    });
});

function logout() {
    alert('Abgemeldet!');
    window.location.href = '/login';  // Hier zur Login-Seite weiterleiten
}

function createUser() {
    alert('Neuen Benutzer erstellen...');
}
