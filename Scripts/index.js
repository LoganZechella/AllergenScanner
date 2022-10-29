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


// Burger Toggle 
function burgerToggle() {
    addAllergenWindow.style.display = "flex";
    hero.style.display = "none";
    !loginBtn.style.display;
}


// Menu Login 
burger.addEventListener('click', function () {
    header.classList.toggle('menu-opened');
    hamburgerAnimate();
});

function menuLoginToggle() {
    menuContainer.classList.toggle('menu-opened');
    if (!menuContainer.classList.contains('menu-opened')) {
	    loginWindow.style.display = "flex";
	    hero.style.display = "none";
	    loginBtn.style.display = "none";
    } else {
        setTimeout(menuLoginToggle, 800);
    }
};

menuItemLoginBtn.addEventListener("click", menuLoginToggle);

// Open Add Allergen Window
function startNow() {
    addAllergenWindow.style.display = "flex";
    hero.style.display = "none";
    loginBtn.style.display = "none";
    landingHeader.style.padding = "1em 1em 1em 0";
};

// Open Login Window
function openLogin() {
    loginWindow.style.display = "flex";
    hero.style.display = "none";
    loginBtn.style.display = "none";
    landingHeader.style.padding = "1em 1em 1em 0";
}

loginBtn.addEventListener("click", openLogin);

// Close button
function closeLoginWindow() {
    loginWindow.style.display = "none";
    addAllergenWindow.style.display = "none";
    hero.style.display = "flex";
    landingHeader.style.display = "flex";
    landingHeader.style.padding = "0 0 0 0";
    loginBtn.style.display = "block";
};

// Close Add Allergen Window
function closeAddAllergen() {
    addAllergenWindow.style.display = "none";
    hero.style.display = "flex";
    loginBtn.style.display = "block";
    landingHeader.style.display = "flex";
    landingHeader.style.padding = "0 0 0 0";
};

let loginCloseBtn = document.getElementById('login-close-btn');
let startNowbtn = document.getElementById('start-btn');
let addAllergenCloseBtn = document.getElementById('add-allergen-close-btn');

loginCloseBtn.addEventListener('click', closeLoginWindow);
addAllergenCloseBtn.addEventListener('click', closeAddAllergen);
startNowbtn.addEventListener('click', startNow);


// Hamburger Animations

function hamburgerAnimate() {
    let menuStart = document.querySelector('.menu-start');
    menuStart.addEventListener('click', function () {
        document.querySelector('.menu-container').classList.toggle('menu-opened');
        if (!menuContainer.classList.contains('menu-opened')) {
            burgerToggle();
        } else {
            setTimeout(startNow, 800);
        }
    });
}
