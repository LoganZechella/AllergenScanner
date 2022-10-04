import fetch from 'node-fetch';
import { finalAllergenList } from './addAllergens';
import Quagga from 'quagga';

let addAllergenWindow = document.getElementById('signup-window');
let scannerDiv = document.getElementById('scanner-div');

// Allergen Variables
let allergens = finalAllergenList();


// Quagga Scanner



// const alg1 = 'peanut';
// const alg2 = 'tree nuts';
// const alg2a = 'almond';
// const alg2b = 'hazelnut';
// const alg2c = 'coconut';
// const alg2d = 'nuts';
// const alg2e = 'cashew';
// const alg3 = 'sesame';
// const alg4 = 'mustard';
// const alg5 = 'barley';
// const alg6 = 'rye';

// API Data

const scannedUPC = '014100085485';
const urlPtOne = 'https://api.edamam.com/api/food-database/v2/parser?app_id=ca2296e3&app_key=a2e456b4aee5d50b688e3b76c657f79f&upc=';
const urlPtTwo = '&nutrition-type=cooking&health=mustard-free&health=peanut-free&health=sesame-free&health=tree-nut-free';


function makeURL(scannedUPC) {
    return urlPtOne + scannedUPC + urlPtTwo;
}

var urlString = makeURL(scannedUPC);
var urlWithUPC = new URL(urlString);


export async function getAPI() {
    var apiOutput;
    const res = await fetch(urlWithUPC).then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (data) {
        // This is the JSON from our response
        apiOutput = `Name: ${data.hints[0].food.label}: ${data.hints[0].food.foodContentsLabel}`;
        console.log(apiOutput);
        return apiOutput;
    }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });


};

// getAPI();

//Data Search

function checkAllergies(apiDataString) {
    let splitContents = apiDataString.split(';');
    const lower = splitContents.map(element => {
        return element.toLowerCase();
    });

    const matches = lower.filter(element => {
        if (element.includes(alg1) || element.includes(alg2) || element.includes(alg2a) || element.includes(alg2b) || element.includes(alg2c) || element.includes(alg2d) || element.includes(alg2e) || element.includes(alg3) || element.includes(alg4) || element.includes(alg5) || element.includes(alg6)) {
            return true;
        } else {
            return false;
        }
    });

    console.log(matches);

    if (matches.length > 0) {
        let safeVerdict = `WARNING! This product contains ${matches.length} of your allergens! They include: [${matches}]. Verify this by reading the product label immediately!`;
        alert(safeVerdict);
    } else {
        let safeVerdict = 'This product is free of your allergens! For safety and your own peace of mind, feel free to verify this information by reading the product label.';
        alert(safeVerdict);
    }

    const upper = matches.map(match => match.toUpperCase());

    var text = `Allergens?: ${upper}`;
    console.log(text);
};

checkAllergies(apiDataString);
