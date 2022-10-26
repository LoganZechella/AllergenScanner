const menuItemLoginBtn = document.getElementById("menu-login");
var burger = document.querySelector('.burger-container');
var header = document.querySelector('.menu-container');

// Menu Login 
burger.addEventListener('click', function () {
    hamburgerAnimate();
});

function menuLoginToggle() {
    let menuContainer = document.querySelector('.menu-container');
    document.querySelector('.menu-container').classList.toggle('menu-opened');
    if (!menuContainer.classList.contains('menu-opened')) {
	    document.getElementById("login-window").style.display = "flex";
	    document.getElementById("hero").style.display = "none";
	    document.getElementById("login-btn").style.display = "none";
    } else {
        setTimeout(menuLoginToggle, 800);
    }
};

menuItemLoginBtn.addEventListener("click", menuLoginToggle);

// Open Add Allergen Window
function startNow() {
    document.getElementById("add-allergen-window").style.display = "flex";
    document.getElementById("hero").style.display = "none";
    document.getElementById("login-btn").style.display = "none";
};

// Close button
function closeLoginWindow() {
    document.getElementById("login-window").style.display = "none";
    document.getElementById("add-allergen-window").style.display = "none";
    document.getElementById("hero").style.display = "flex";
    document.getElementById("landing-header").style.display = "flex";
    document.getElementById("login-btn").style.display = "block";
};

function closeAddAllergen() {
    document.getElementById("add-allergen-window").style.display = "none";
    document.getElementById("add-allergen-window").style.display = "none";
    document.getElementById("hero").style.display = "flex";
    document.getElementById("login-btn").style.display = "block";
};

let loginCloseBtn = document.getElementById('login-close-btn');
let startNowbtn = document.getElementById('start-btn');
let addAllergenCloseBtn = document.getElementById('add-allergen-close-btn');

loginCloseBtn.addEventListener('click', closeLoginWindow);
addAllergenCloseBtn.addEventListener('click', closeAddAllergen);
startNowbtn.addEventListener('click', startNow);

// Hamburger Animations

function hamburgerAnimate() {
    (function () {
        var burger = document.querySelector('.burger-container'), header = document.querySelector('.menu-container');

        burger.onclick = function () {
            header.classList.toggle('menu-opened');
        };
    } ());

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
}
