
import { scannedText } from './addAllergens.js';





// API Data
export var apiOutput;
let outputName, outputIngredients;
export async function getAPI() {

    let scannedUPC = scannedText;
    const urlPtOne = 'https://api.edamam.com/api/food-database/v2/parser?app_id=ca2296e3&app_key=a2e456b4aee5d50b688e3b76c657f79f&upc=';

    function makeURL(scannedUPC) {
        return urlPtOne + scannedUPC;
    };

    var urlString = makeURL(scannedUPC);
    var urlWithUPC = new URL(urlString);
    
    const res = await fetch(urlWithUPC).then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {
        // This is the JSON from our response
        outputName = data.hints[0].food.label;
        outputIngredients = data.hints[0].food.foodContentsLabel;
        apiOutput = {
            name: outputName,
            ingredients: outputIngredients
        };
        return apiOutput;
    })
    .catch(function (err) {
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

