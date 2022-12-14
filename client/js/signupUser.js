
let userName = document.getElementById('signup-name-text');
let userEmail = document.getElementById('signup-email-text');
let userPassword = document.getElementById('signup-password-text');
let userPasswordConfirm = document.getElementById('signup-password-confirm-text');
const signupForm = document.getElementById("signup-form");
const signupText = document.getElementById("signup-window-text");
const loginBtn = document.getElementById("login-btn");

// Signup Form
signupBtnSubmit.addEventListener("click", function () {
    if (userPassword.value === userPasswordConfirm.value && userName.value !== "" && userEmail.value !== "" && userPassword.value !== "" && userPasswordConfirm.value !== "") {
        putNewUser();
        signupWindow.querySelector("h2").innerHTML = "Signup Successful!";
        signupForm.style.display = "none";
        signupWindow.style.marginTop = "25vh";
        signupWindow.style.animation = "bounceOut 1500ms 500ms";
        setTimeout(function () {
            signupWindow.style.display = "none";
            addAllergenWindow.style.animation = "bounceIn 500ms";
            addAllergenWindow.style.display = "flex";
        }, 2000);
    } else {
        userPassword.style.animation = 'shakeX 0.5s';
        userPassword.style.border = '3px solid red';
        userPassword.setAttribute('placeholder', 'Passwords do not match');
        userPasswordConfirm.style.animation = 'shakeX 0.5s';
        userPasswordConfirm.style.border = '3px solid red';
    }
});

userPassword.addEventListener('focus', function () {
    userPassword.style.border = '1px solid #fff';
    userPassword.setAttribute('placeholder', '');
    userPasswordConfirm.style.border = '1px solid #fff';
    userPasswordConfirm.setAttribute('placeholder', '');
});

// JSON Pantry
async function putNewUser() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": userEmail.value,
        "name": userName.value,
        "password": userPassword.value
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://getpantry.cloud/apiv1/pantry/89aba819-8b18-44df-a06c-7a904c79f347/basket/userBasket", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

