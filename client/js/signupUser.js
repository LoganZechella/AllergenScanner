// JSONBIN.io API 
export function signupUser() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText);
        }
    };
    let userName = document.getElementById('signup-name-text').value;
    let userEmail = document.getElementById('signup-email-text').value;
    let userPassword = document.getElementById('signup-password-text').value;
    let userPasswordConfirm = document.getElementById('signup-password-confirm-text').value;
    // let userAllergens = allergenList;
    class User {
        constructor(name, email, password) {
            this.name = name;
            this.email = email;
            this.password = password;
        }
    }
    let newUser = new User(userName, userEmail, userPassword);
    let newUserJson = JSON.stringify(newUser);

    req.open("POST", "https://api.jsonbin.io/v3/b", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "");
    req.send(newUserJson);
}

let signupBtn = document.getElementById('signup-new-btn');
signupBtn.addEventListener('click', signupUser);


