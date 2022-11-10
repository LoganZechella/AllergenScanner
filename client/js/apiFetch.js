
import { scannedText } from './addAllergens.js';

// Edemam API Data
export let apiOutput;

export async function getAPI() {
    const urlPtOne = 'https://api.edamam.com/api/food-database/v2/parser?app_id=ca2296e3&app_key=a2e456b4aee5d50b688e3b76c657f79f&upc=';
    let fetchUrl = new URL(urlPtOne + scannedText);
    const resjson = await fetch(fetchUrl).then(function (response) {
        // The API call was successful
        return response.json();
    }).then(function (data) {
        // This is the JSON from response
        let name = data.hints[0].food.label;
        let ingredients = data.hints[0].food.foodContentsLabel;
        apiOutput = {
            name: name,
            ingredients: ingredients
        }
    })
    .catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    })
    return apiOutput; 
}

// Add to DB

// let userAllergens = allergenList;

class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

export async function addToDB() {
    let userName = document.getElementById('signup-name-text').value;
    let userEmail = document.getElementById('signup-email-text').value;
    let userPassword = document.getElementById('signup-password-text').value;
    let newUser = new User(userName, userEmail, userPassword);
    let newUserJson = JSON.stringify(newUser);

    // JSONBIN.io API 
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText);

        } else {
            console.log("Error");
        }
    };

    req.open("POST", "https://api.jsonbin.io/v3/b", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "");
    req.send(newUserJson);
}

