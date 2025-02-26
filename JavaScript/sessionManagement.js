let sessionTimeout;
let idleTimeout;

function resetTimeouts() {
    clearTimeout(sessionTimeout);
    clearTimeout(idleTimeout);

    idleTimeout = setTimeout(logoutDueToIdle,  300000); // 10 Minuten Idle Timeout
    sessionTimeout = setTimeout(logoutDueToTimeout, 1800000); // 30 Minuten Absolutes Timeout
}

function logoutDueToIdle() {
    alert("Ihre Sitzung ist aufgrund von Inaktivität abgelaufen.");
    logout();
}

function logoutDueToTimeout() {
    alert("Ihre Sitzung ist abgelaufen.");
    logout();
}

function logout() {
    // Benutzer abmelden
    sessionStorage.clear();
    location.reload();
}

document.addEventListener('mousemove', resetTimeouts);
document.addEventListener('keypress', resetTimeouts);
