const menuItemLoginBtn = document.getElementById("menu-login");
var burger = document.querySelector('.burger-container');
var header = document.querySelector('.menu-container');
const menuContainer = document.querySelector('.menu-container');
const addAllergenWindow = document.getElementById("add-allergen-window");
const hero = document.getElementById("hero");
const loginBtn = document.getElementById("login-btn");
const stopScanBtn = document.getElementById("stop-scan-btn");


// Burger Toggle 
function burgerToggle() {
    addAllergenWindow.style.display = "flex";
    hero.style.display = "none";
    loginBtn.style.display = "none";
}


// Menu Login 
burger.addEventListener('click', function () {
    header.classList.toggle('menu-opened');
    hamburgerAnimate();
});

function menuLoginToggle() {
    menuContainer.classList.toggle('menu-opened');
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
