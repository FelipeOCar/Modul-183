document.addEventListener("DOMContentLoaded", function () {
    generateCaptcha();
});

function generateCaptcha() {
    const captchaContainer = document.getElementById("captcha-container");
    captchaContainer.innerHTML = "";
    
    const captchaType = Math.floor(Math.random() * 3);
    
    if (captchaType === 0) {
        generateTextCaptcha(captchaContainer);
    } else if (captchaType === 1) {
        generateImageCaptcha(captchaContainer);
    } else {
        generateSliderCaptcha(captchaContainer);
    }

    setTimeout(() => {
        updateCaptchaTexts();  // 🟢 Texte sofort aktualisieren
        updateLoginButton();   // 🟢 Login-Button in richtiger Sprache setzen
    }, 50);
}

let captchaNum1 = 0;
let captchaNum2 = 0;

function generateTextCaptcha(container) {
    captchaNum1 = Math.floor(Math.random() * 10) + 1;
    captchaNum2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = captchaNum1 + captchaNum2;

    container.innerHTML = `<p id="captcha-question">${translations[currentLang].captchaQuestion} ${captchaNum1} + ${captchaNum2}?</p>
                            <input type="number" id="text-captcha-answer" required>
                            <button id="captcha-verify" onclick="validateTextCaptcha(${correctAnswer})">${translations[currentLang].captchaVerify}</button>`;

    setTimeout(() => {
        updateCaptchaTexts();   // Captcha-Texte nach Generierung aktualisieren
        updateLoginButton();     // Login-Button sicherstellen
    }, 50);
}

// 🔄 Aktualisiert die Captcha-Texte nach Sprachwechsel
function updateCaptchaTexts() {
    const captchaQuestionEl = document.getElementById("captcha-question");
    const captchaVerifyEl = document.getElementById("captcha-verify");

    if (captchaQuestionEl) {
        captchaQuestionEl.innerText = `${translations[currentLang].captchaQuestion} ${captchaNum1} + ${captchaNum2}?`;
    }
    if (captchaVerifyEl) {
        captchaVerifyEl.innerText = translations[currentLang].captchaVerify;
    }
}

function validateTextCaptcha(correctAnswer) {
    const userAnswer = document.getElementById("text-captcha-answer").value;
    if (parseInt(userAnswer, 10) === correctAnswer) {
        alert("CAPTCHA verified!");
    } else {
        alert("Incorrect answer. Try again!");
        generateCaptcha();
    }
}

function generateImageCaptcha(container) {
    container.innerHTML = `<p id="captcha-select">${translations[currentLang].captchaSelect}</p>
                            <div style="display: flex; gap: 10px;">
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/008/134/818/small_2x/check-mark-icon-checkmark-right-symbol-tick-sign-ok-button-correct-circle-icon-free-vector.jpg" onclick="validateImageCaptcha(true)" width="50" height="50">
                                <img src="https://cdn.pixabay.com/photo/2014/03/24/17/21/wrong-295503_1280.png" onclick="validateImageCaptcha(false)" width="50" height="50">
                                <img src="https://cdn.pixabay.com/photo/2014/03/24/17/21/wrong-295503_1280.png" onclick="validateImageCaptcha(false)" width="50" height="50">
                            </div>`;

    setTimeout(updateCaptchaTexts, 50); // 🟢 Captcha-Texte aktualisieren
}

function validateImageCaptcha(isCorrect) {
    if (isCorrect) {
        alert("CAPTCHA verified!");
    } else {
        alert("Incorrect image. Try again!");
        generateCaptcha();
    }
}

function generateSliderCaptcha(container) {
    container.innerHTML = `<p id="slider-status">${translations[currentLang].sliderCaptcha}</p>
                            <input type="range" id="slider" min="0" max="100" step="1" oninput="checkSlider()">`;

    setTimeout(updateCaptchaTexts, 50); // 🟢 Captcha-Texte aktualisieren
}

function checkSlider() {
    const slider = document.getElementById("slider");
    const status = document.getElementById("slider-status");
    if (parseInt(slider.value, 10) === 100) {
        status.innerText = "Verified!";
        alert("CAPTCHA verified!");
    }
}