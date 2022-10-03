
// Login Pop-up 
function toggleLogin() {
    document.getElementById("login-window").style.display = "flex";
    document.getElementById("hero").style.display = "none";
    document.getElementById("about-prysm").style.display = "none";
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("why-prysm").style.display = "none";
    document.getElementById("founder-heading").style.display = "none";
    document.getElementById("founders").style.display = "none";
};

// Login Link
function loginLink() {
    toggleLogin();
};

// Signup Link
function signupLink() {
    toggleSignupWindow();
};

// Signup Pop-up
function toggleSignupWindow() {
    document.getElementById("signup-window").style.display = "flex";
    document.getElementById("hero").style.display = "none";
    document.getElementById("about-prysm").style.display = "none";
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("why-prysm").style.display = "none";
    document.getElementById("founder-heading").style.display = "none";
    document.getElementById("founders").style.display = "none";
};

// Add to Waitlist Button - Text Change
function toggleThankYou() {
    document.getElementById("signup-window-text").style.display = "none";
    document.getElementById("thankyou-text").style.display = "block";
};

// Close button
function closeLoginWindow() {
    document.getElementById("login-window").style.display = "none";
    document.getElementById("signup-window").style.display = "none";
    document.getElementById("hero").style.display = "flex";
    document.getElementById("about-prysm").style.display = "flex";
    document.getElementById("login-btn").style.display = "block";
    document.getElementById("why-prysm").style.display = "flex";
    document.getElementById("founders").style.display = "flex";
    document.getElementById("founder-heading").style.display = "flex";
};

// Hamburger Animations
(function () {
    var burger = document.querySelector('.burger-container'),
        header = document.querySelector('.menu-container');

    burger.onclick = function () {
        header.classList.toggle('menu-opened');
    }
}());

