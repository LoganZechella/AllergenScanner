const menuItemLoginBtn = document.getElementById("menu-login");
var burger = document.querySelector('.burger-container');
var header = document.querySelector('.menu-container');
const menuContainer = document.querySelector('.menu-container');
const landingHeader = document.getElementById("landing-header");
const addAllergenWindow = document.getElementById("add-allergen-window");
const loginWindow = document.getElementById("login-window");
const hero = document.getElementById("hero");
const loginBtn = document.getElementById("header-login-btn");
const stopScanBtn = document.getElementById("stop-scan-btn");
const menuItemScanBtn = document.getElementById("menu-start");
const signupWindow = document.getElementById("signup-window");
const menuItemSignupBtn = document.getElementById("menu-signup");


// Burger Toggle 
function burgerToggle() {
    addAllergenWindow.style.display = "flex";
    hero.style.display = "none";
    !loginBtn.style.display;
}

burger.addEventListener('click', function () {
    header.classList.toggle('menu-opened');
});

// Menu Login 
function menuLoginToggle() {
    menuContainer.classList.toggle('menu-opened');
    if (!menuContainer.classList.contains('menu-opened')) {
	    loginWindow.style.display = "flex";
	    hero.style.display = "none";
	    loginBtn.style.display = "none";
        addAllergenWindow.style.display = "none";
        signupWindow.style.display = "none";
    } else {
        setTimeout(menuLoginToggle, 800);
    }
};

// Menu Scan
function menuScanToggle() {
    menuContainer.classList.toggle('menu-opened');
    if (!menuContainer.classList.contains('menu-opened')) {
        addAllergenWindow.style.display = "flex";
        hero.style.display = "none";
        loginBtn.style.display = "none";
        loginWindow.style.display = "none";
        signupWindow.style.display = "none";
        hamburgerAnimate();
    } else {
        setTimeout(burgerToggle, 800);
    }
};

// Menu Signup
function menuSignupToggle() {
    menuContainer.classList.toggle('menu-opened');
    if (!menuContainer.classList.contains('menu-opened')) {
        signupWindow.style.display = "flex";
        hero.style.display = "none";
        loginBtn.style.display = "none";
        loginWindow.style.display = "none";
        hamburgerAnimate();
    } else {
        setTimeout(burgerToggle, 800);
    }
};

// Menu Item Event Listeners
menuItemLoginBtn.addEventListener("click", menuLoginToggle);
menuItemScanBtn.addEventListener("click", menuScanToggle);
menuItemSignupBtn.addEventListener("click", menuSignupToggle);

// Open Add Allergen Window
function startNow() {
    addAllergenWindow.style.display = "flex";
    hero.style.display = "none";
    loginBtn.style.display = "none";
    landingHeader.style.padding = "0.5em 0 0.5em 0";
};

// Open Login Window
function openLogin() {
    loginWindow.style.display = "flex";
    hero.style.display = "none";
    loginBtn.style.display = "none";
    landingHeader.style.padding = "1em 1em 1em 0";
}

loginBtn.addEventListener("click", openLogin);

// Close Login Window
function closeLoginWindow() {
    loginWindow.style.display = "none";
    addAllergenWindow.style.display = "none";
    hero.style.display = "flex";
    landingHeader.style.display = "flex";
    loginBtn.style.display = "block";
};

// Close Add Allergen Window
function closeAddAllergen() {
    addAllergenWindow.style.display = "none";
    hero.style.display = "flex";
    loginBtn.style.display = "block";
    landingHeader.style.display = "flex";
};

// Close Signup Window
function closeSignup() {
    signupWindow.style.display = "none";
    hero.style.display = "flex";
    loginBtn.style.display = "block";
    landingHeader.style.display = "flex";
};

// Close Button Event Listeners
let loginCloseBtn = document.getElementById('login-close-btn');
let startNowbtn = document.getElementById('start-btn');
let addAllergenCloseBtn = document.getElementById('add-allergen-close-btn');
let signupCloseBtn = document.getElementById('signup-close-btn');

loginCloseBtn.addEventListener('click', closeLoginWindow);
addAllergenCloseBtn.addEventListener('click', closeAddAllergen);
startNowbtn.addEventListener('click', startNow);
signupCloseBtn.addEventListener('click', closeSignup);

// Hamburger Animations
function hamburgerAnimate() {
    let menuStart = document.querySelector('.menu-start');
    menuStart.addEventListener('click', function () {
        document.querySelector('.menu-container').classList.toggle('menu-opened');
        if (!menuContainer.classList.contains('menu-opened')) {
            hamburgerAnimate();
        } else {
            setTimeout(burgerToggle, 800);
        }
    });
}
