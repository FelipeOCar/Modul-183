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
}

function generateTextCaptcha(container) {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num1 + num2;
    
    container.innerHTML = `<p>What is ${num1} + ${num2}?</p>
                            <input type="number" id="text-captcha-answer" required>
                            <button onclick="validateTextCaptcha(${correctAnswer})">Verify</button>`;
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
    container.innerHTML = `<p>Select the correct image:</p>
                            <div style="display: flex; gap: 10px;">
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/008/134/818/small_2x/check-mark-icon-checkmark-right-symbol-tick-sign-ok-button-correct-circle-icon-free-vector.jpg" onclick="validateImageCaptcha(true)" width="50" height="50">
                                <img src="https://cdn.pixabay.com/photo/2014/03/24/17/21/wrong-295503_1280.png" onclick="validateImageCaptcha(false)" width="50" height="50">
                                <img src="https://cdn.pixabay.com/photo/2014/03/24/17/21/wrong-295503_1280.png" onclick="validateImageCaptcha(false)" width="50" height="50">
                            </div>`;
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
    container.innerHTML = `<p>Slide to verify:</p>
                            <input type="range" id="slider" min="0" max="100" step="1" oninput="checkSlider()">
                            <span id="slider-status">Slide to 100</span>`;
}

function checkSlider() {
    const slider = document.getElementById("slider");
    const status = document.getElementById("slider-status");
    if (parseInt(slider.value, 10) === 100) {
        status.innerText = "Verified!";
        alert("CAPTCHA verified!");
    }
}