
import { scannedText } from './addAllergens.js';

// API Data
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


// DB


export async function insertDB() {
    let newUser = JSON.stringify({
        user_name: 'test',
        user_email: 'test',
        user_password: 'test',
        user_allergens: 'test',
    });

    const send = await fetch('https://data.mongodb-api.com/app/data-zlrzk/endpoint/data/v1/action/insertOne', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "dataSource": "allergenScanner",
            "database": "allergenscanner",
            "collection": "users",
            "document": {
                "user_name": newUser.user_name,
                "user_email": newUser.user_email,
                "user-password": newUser.user_password,
                "user_allergens": newUser.user_allergens
            },
            "body": newUser,
        }
        }).then(response => {
        //handle response            
        console.log(response);
        })
        .then(data => {
            //handle data
            console.log(data);
        })
        .catch(error => {
            //handle error
        });
}

