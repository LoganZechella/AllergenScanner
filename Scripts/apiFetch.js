
import { scannedText } from './addAllergens.js';


// API Data
export let apiOutput;

export async function getAPI() {
    const urlPtOne = 'https://api.edamam.com/api/food-database/v2/parser?app_id=ca2296e3&app_key=a2e456b4aee5d50b688e3b76c657f79f&upc=';

    const res = await fetch(urlPtOne + scannedText).then(function (response) {
        // The API call was successful
        return response.json();
    }).then(function (data) {
        // This is the JSON from response
        apiOutput = {
            name: data.hints[0].food.label,
            ingredients: data.hints[0].food.foodContentsLabel
        }
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    })
}

// DB Exchange

class User {
    constructor(name, email, password, allergens) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.allergens = allergens;
    }
}


// function checkAllergies(apiOutput) {
//     let stringConvert = apiOutput.toString();
//     let splitContents = stringConvert.split(';');
//     const lower = splitContents.map(element => {
//         return element.toLowerCase();
//     return lower;
//     })
// };

