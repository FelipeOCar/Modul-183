let isLogin = true;

function toggleForm() {
    isLogin = !isLogin;
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const formTitle = document.getElementById("form-title");

    if (isLogin) {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        formTitle.innerText = translations[currentLang].login;
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        formTitle.innerText = translations[currentLang].register;
    }

    updatePlaceholders();
}

function handleAuth() {
    const message = document.getElementById("message");
    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {
        message.innerText = translations[currentLang].captchaError;
        return;
    }

    if (isLogin) {
        // Login-Felder
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            message.innerText = translations[currentLang].fillAllFields;
            return;
        }

        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            message.style.color = "green";
            message.innerText = translations[currentLang].loginSuccess;
            setTimeout(() => {
                alert(translations[currentLang].loginAlert);
            }, 500);
        } else {
            message.style.color = "red";
            message.innerText = translations[currentLang].wrongLogin;
        }
    } else {
        // Registrierungs-Felder
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("reg-email").value;
        const phone = document.getElementById("reg-phone").value;
        const password = document.getElementById("reg-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
            message.innerText = translations[currentLang].fillAllFields;
            return;
        }

        if (password !== confirmPassword) {
            message.style.color = "red";
            message.innerText = translations[currentLang].passwordMismatch;
            return;
        }

        if (localStorage.getItem(email)) {
            message.style.color = "red";
            message.innerText = translations[currentLang].userExists;
        } else {
            localStorage.setItem(email, password);
            message.style.color = "green";
            message.innerText = translations[currentLang].registerSuccess;
            setTimeout(() => toggleForm(), 500);
        }
    }
}

// 🌍 Sprachen-Handling mit localStorage
let currentLang = localStorage.getItem("lang") || "de";

const translations = {
    de: {
        title: "Login & Registrierung",
        login: "Login",
        register: "Registrieren",
        username: "Benutzername",
        firstName: "Vorname",
        lastName: "Nachname",
        email: "E-Mail",
        phone: "Telefonnummer",
        password: "Passwort",
        confirmPassword: "Passwort bestätigen",
        toggleText: "Noch kein Konto?",
        alreadyHaveAccount: "Schon ein Konto?",
        loginSuccess: "Login erfolgreich!",
        registerSuccess: "Registrierung erfolgreich! Jetzt einloggen.",
        userExists: "Benutzer existiert bereits!",
        fillAllFields: "Bitte alle Felder ausfüllen!",
        passwordMismatch: "Passwörter stimmen nicht überein!",
        wrongLogin: "Falscher Benutzername oder Passwort!",
        captchaError: "Bitte bestätigen Sie, dass Sie kein Roboter sind!",
        loginAlert: "Glückwunsch! Du bist eingeloggt.",
        captchaSelect: "Wähle das richtige Bild aus:",
        captchaVerify: "Verifizieren",
        captchaQuestion: "Was ist",
        sliderCaptcha: "Zum Verifizieren schieben",
        registerButton: "Registrieren",
        loginButton: "Einloggen"
    },
    fr: {
        title: "Connexion & Inscription",
        login: "Connexion",
        register: "S'inscrire",
        username: "Nom d'utilisateur",
        firstName: "Prénom",
        lastName: "Nom",
        email: "E-mail",
        phone: "Numéro de téléphone",
        password: "Mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        toggleText: "Pas encore de compte?",
        alreadyHaveAccount: "Déjà un compte?",
        loginSuccess: "Connexion réussie!",
        registerSuccess: "Inscription réussie! Connectez-vous.",
        userExists: "L'utilisateur existe déjà!",
        fillAllFields: "Veuillez remplir tous les champs!",
        passwordMismatch: "Les mots de passe ne correspondent pas!",
        wrongLogin: "Nom d'utilisateur ou mot de passe incorrect!",
        captchaError: "Veuillez confirmer que vous n'êtes pas un robot!",
        loginAlert: "Félicitations! Vous êtes connecté.",
        captchaSelect: "Sélectionnez l'image correcte:",
        captchaVerify: "Vérifier",
        captchaQuestion: "Quel est",
        sliderCaptcha: "Faites glisser pour vérifier",
        registerButton: "S'inscrire",
        loginButton: "Se connecter"
    },
    it: {
        title: "Accesso & Registrazione",
        login: "Accesso",
        register: "Registrati",
        username: "Nome utente",
        firstName: "Nome",
        lastName: "Cognome",
        email: "E-mail",
        phone: "Numero di telefono",
        password: "Password",
        confirmPassword: "Conferma Password",
        toggleText: "Non hai ancora un account?",
        alreadyHaveAccount: "Hai già un account?",
        loginSuccess: "Accesso riuscito!",
        registerSuccess: "Registrazione riuscita! Ora accedi.",
        userExists: "L'utente esiste già!",
        fillAllFields: "Compila tutti i campi!",
        passwordMismatch: "Le password non corrispondono!",
        wrongLogin: "Nome utente o password errati!",
        captchaError: "Conferma di non essere un robot!",
        loginAlert: "Congratulazioni! Sei connesso.",
        captchaSelect: "Seleziona l'immagine corretta:",
        captchaVerify: "Verifica",
        captchaQuestion: "Quanto fa",
        sliderCaptcha: "Fai scorrere per verificare",
        registerButton: "Registrati",
        loginButton: "Accedi"
    },
    en: {
        title: "Login & Registration",
        login: "Login",
        register: "Register",
        username: "Username",
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone Number",
        password: "Password",
        confirmPassword: "Confirm Password",
        toggleText: "Don't have an account?",
        alreadyHaveAccount: "Already have an account?",
        loginSuccess: "Login successful!",
        registerSuccess: "Registration successful! Now log in.",
        userExists: "User already exists!",
        fillAllFields: "Please fill all fields!",
        passwordMismatch: "Passwords do not match!",
        wrongLogin: "Incorrect username or password!",
        captchaError: "Please confirm you are not a robot!",
        loginAlert: "Congratulations! You are logged in.",
        captchaSelect: "Select the correct image:",
        captchaVerify: "Verify",
        captchaQuestion: "What is",
        sliderCaptcha: "Slide to verify",
        registerButton: "Register",
        loginButton: "Login"
    }
};

// 🌍 Sprache wechseln & speichern
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    updatePlaceholders();
    updateCaptchaTexts();  // 🟢 Captcha-Texte SOFORT aktualisieren
}


// 🔄 Aktualisiert alle Captcha-Texte nach Sprachwechsel
function updateCaptchaTexts() {
    const captchaQuestionEl = document.getElementById("captcha-question"); // Mathe-Captcha
    const captchaVerifyEl = document.getElementById("captcha-verify"); // Alle Captcha-Typen
    const captchaSelectEl = document.getElementById("captcha-select"); // Bild-Captcha
    const sliderStatusEl = document.getElementById("slider-status"); // Slider-Captcha

    // Mathe-Captcha aktualisieren
    if (captchaQuestionEl) {
        captchaQuestionEl.innerText = `${translations[currentLang].captchaQuestion} ${captchaNum1} + ${captchaNum2}?`;
    }

    // "Verifizieren"-Button für alle Captcha-Typen aktualisieren
    if (captchaVerifyEl) {
        captchaVerifyEl.innerText = translations[currentLang].captchaVerify;
    }

    // Bild-Captcha-Text aktualisieren
    if (captchaSelectEl) {
        captchaSelectEl.innerText = translations[currentLang].captchaSelect;
    }

    // Slider-Captcha-Text aktualisieren
    if (sliderStatusEl) {
        sliderStatusEl.innerText = translations[currentLang].sliderCaptcha;
    }
}

function updateLoginButton() {
    const loginButton = document.getElementById("login-button");
    if (loginButton) {
        loginButton.innerText = translations[currentLang].loginButton;
    }
}

function updateToggleText() {
    let toggleTexts = document.querySelectorAll("#toggle-text");

    if (toggleTexts.length === 2) {
        toggleTexts[0].innerHTML = `${translations[currentLang].toggleText} <a href='#' onclick='toggleForm()'>${translations[currentLang].registerButton}</a>`;
        toggleTexts[1].innerHTML = `${translations[currentLang].alreadyHaveAccount} <a href='#' onclick='toggleForm()'>${translations[currentLang].loginButton}</a>`;
    }
}


function toggleForm() {
    isLogin = !isLogin;
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const formTitle = document.getElementById("form-title");

    if (isLogin) {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        formTitle.innerText = translations[currentLang].login;
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        formTitle.innerText = translations[currentLang].register;
    }

    updateToggleText(); // 🟢 Toggle-Text beim Umschalten aktualisieren
    updatePlaceholders();
}

// 🌍 Sprachen-Handling mit localStorage
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    updatePlaceholders();
    updateToggleText();  // 🟢 Toggle-Text sofort übersetzen!
    generateCaptcha();  // 🟢 Captcha-Texte sofort übersetzen!
}


// 🔄 Übersetzungen für Platzhalter, Buttons und Captcha aktualisieren
function updatePlaceholders() {
    const fields = {
        "username": "username",
        "first-name": "firstName",
        "last-name": "lastName",
        "email": "email",
        "phone": "phone",
        "password": "password",
        "reg-email": "email",
        "reg-phone": "phone",
        "reg-password": "password",
        "confirm-password": "confirmPassword"
    };

    Object.keys(fields).forEach(id => {
        let element = document.getElementById(id);
        if (element) {
            element.placeholder = translations[currentLang][fields[id]];
        }
    });

    // 🟢 Stelle sicher, dass die `toggle-text`-Elemente aktualisiert werden!
    updateToggleText();

    // Login- und Registrierungsbutton aktualisieren
    const loginButton = document.getElementById("login-button");
    const registerButton = document.getElementById("register-form").querySelector("button");

    if (loginButton) loginButton.innerText = translations[currentLang].loginButton;
    if (registerButton) registerButton.innerText = translations[currentLang].registerButton;

    // Form-Titel aktualisieren
    const formTitle = document.getElementById("form-title");
    if (formTitle) formTitle.innerText = isLogin ? translations[currentLang].login : translations[currentLang].register;

    // Toggle-Text aktualisieren
    let toggleText = document.getElementById("toggle-text");
    if (toggleText) {
        toggleText.innerHTML = isLogin 
            ? `${translations[currentLang].toggleText} <a href='#' onclick='toggleForm()'>${translations[currentLang].registerButton}</a>` 
            : `${translations[currentLang].alreadyHaveAccount} <a href='#' onclick='toggleForm()'>${translations[currentLang].loginButton}</a>`;
    }

    updateCaptchaTexts();  // 🟢 Jetzt wird das Captcha SOFORT aktualisiert!
}

// 🌟 Initialisierung der Übersetzungen nach `DOMContentLoaded`
document.addEventListener("DOMContentLoaded", () => {
    updatePlaceholders();
});