

// Login Link
function loginLink() {
    toggleLogin();
};

// Signup Link
function signupLink() {
    toggleSignupWindow();
};

// Open Add Allergen Window
function startNow() {
    document.getElementById("add-allergen-window").style.display = "flex";
    document.getElementById("hero").style.display = "none";
    document.getElementById("about-prysm").style.display = "none";
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("why-prysm").style.display = "none";
    document.getElementById("founder-heading").style.display = "none";
    document.getElementById("founders").style.display = "none";
};

// Add to Waitlist Button - Text Change
function toggleThankYou() {
    document.getElementById("add-allergen-window-text").style.display = "none";
    document.getElementById("thankyou-text").style.display = "block";
};

// Close button
function closeLoginWindow() {
    document.getElementById("login-window").style.display = "none";
    document.getElementById("add-allergen-window").style.display = "none";
    document.getElementById("hero").style.display = "flex";
    document.getElementById("about-prysm").style.display = "flex";
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("why-prysm").style.display = "flex";
    document.getElementById("founders").style.display = "flex";
    document.getElementById("founder-heading").style.display = "flex";
};

function closeAddAllergen() {
    document.getElementById("add-allergen-window").style.display = "none";
    document.getElementById("add-allergen-window").style.display = "none";
    document.getElementById("hero").style.display = "flex";
    document.getElementById("about-prysm").style.display = "flex";
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("why-prysm").style.display = "flex";
    document.getElementById("founders").style.display = "flex";
    document.getElementById("founder-heading").style.display = "flex";
};

let loginCloseBtn = document.getElementById('login-close-btn');
let startNowbtn = document.getElementById('start-btn');
let addAllergenCloseBtn = document.getElementById('add-allergen-close-btn');

loginCloseBtn.addEventListener('click', function() {
    closeLoginWindow();
});
addAllergenCloseBtn.addEventListener('click', function () {
    closeAddAllergen();
});
startNowbtn.addEventListener('click', function () {
    startNow();
});

// Hamburger Animations
(function () {
    var burger = document.querySelector('.burger-container'),
        header = document.querySelector('.menu-container');

    burger.onclick = function () {
        header.classList.toggle('menu-opened');
    }
}());

let menuStart = document.querySelector('.menu-start');
let menuContainer = document.querySelector('.menu-container');

menuStart.addEventListener('click', function () {
    document.querySelector('.menu-container').classList.toggle('menu-opened');
    if (!menuContainer.classList.contains('menu-opened')) {
        startNow();
    } else {
        setTimeout(startNow, 800);
    }
});

