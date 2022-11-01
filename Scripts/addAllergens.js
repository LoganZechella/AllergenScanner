import { getAPI } from './apiFetch.js';
import { apiOutput } from './apiFetch.js';

// Variables
const addBtn = document.getElementById('add-btn');
const allergenInput = document.getElementById('allergen-input');
const allergenOl = document.getElementById('allergen-list-items');
const listDiv = document.getElementById('allergen-list');
const finalList = document.getElementById('final-allergen-list')
let allergenList = [];
const beginScanBtn = document.getElementById('begin-scan-btn');
const addAllergenWindow = document.getElementById('add-allergen-window');
const scannerDiv = document.getElementById('scanner-div');
const scanningForDiv = document.getElementById('scanning-for-div');
const scanningForTxt = document.getElementById('scanning-for-txt');
const scannedResults = document.getElementById('barcode-reader-results');
const barcodeReader = document.getElementById('barcode-reader');
const scannedItemName = document.getElementById('scanned-item-name');
const scannedItemAllergens = document.getElementById('scanned-item-allergens');
const scannedItemIngredients = document.getElementById('scanned-item-ingredients');
const loginBtn = document.getElementById('header-login-btn');
const loginWindow = document.getElementById('login-window');
const hero = document.getElementById('hero');
const stopScanBtn = document.getElementById('stop-scan-btn');
const scannerIconsDiv = document.getElementById('scanner-icons');
const successIcon = document.getElementById('scanner-success-icon');
const failIcon = document.getElementById('scanner-fail-icon');



function toggleLogin() {
    hero.style.display = 'none';
    loginBtn.style.display = 'none';
    loginWindow.style.display = 'flex';
    addAllergenWindow.style.display = 'none';
}

loginBtn.addEventListener('click', toggleLogin);

function getText() {
    if (allergenInput.value !== '') {
        let allergenText = allergenInput.value;
        console.log(allergenText);
        return allergenText;
    } else {
        allergenInput.style.animation = 'rubberBand 0.5s';
    }
}

function clearInput() {
    allergenInput.value = '';
}


function createList() {
    if (allergenList.length === 0) {
        let li = document.createElement('li');
        li.setAttribute('class', 'animate__bounceInDown');
        li.innerHTML = allergenList[0];
        allergenOl.appendChild(li);
    } else {
        let newestLi = allergenList[allergenList.length - 1];
        let li = document.createElement('li');
        li.innerHTML = newestLi;
        allergenOl.appendChild(li);
    }
}

function enableBeginScan() {
    if (allergenList.length > 0 && beginScanBtn.disabled === true) {
        beginScanBtn.style.cursor = 'pointer';
        beginScanBtn.removeAttribute('disabled');
    }
};

addBtn.addEventListener('click', function () {
    let addedAllergen = getText();
    if (addedAllergen !== undefined) {
        allergenList.push(addedAllergen.toLowerCase());
        createList();
        listDiv.style.display = 'flex';
        clearInput();
        allergenInput.focus();
    } else {
        addBtn.style.animation = 'shakeX 0.5s';
        allergenInput.style.animation = 'rubberBand 0.5s';
    }
    enableBeginScan();
});


let matches = [];
var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

function checkIngredients() {
    let ingredientList = apiOutput.ingredients.toLowerCase().split(',');
    let cleanedIngredients = ingredientList.map((string) => {
        return string
        .split('')
        .filter(function(letter) {
            return punctuation.indexOf(letter) === -1;
        })
        .join('');
    });
    let cleanedArray = cleanedIngredients.map((string) => {
        return string.split(' ');
    })
    for (let i = 0; i < cleanedArray.length; i++) {
        for (let j = 0; j < allergenList.length; j++) {
            if (cleanedArray[i].includes(allergenList[j])) {
                matches.push(allergenList[j]);
            }
        }
    }
    if (matches.length === 0) {
        matches.push('None');
    }
}

export let scannedText = '';

function finishScanning() {
    barcodeReader.style.display = 'none';
    scannedResults.style.display = 'flex';
    scanningForTxt.style.display = 'none';
    finalList.style.display = 'none';
    scannedItemName.innerHTML = `Product Name: ${apiOutput.name}`;
    scannedItemIngredients.innerHTML = `Ingredients: ${apiOutput.ingredients}`;
    checkIngredients();
    scannedItemAllergens.innerHTML = `Allergens: ${matches}`;
}

beginScanBtn.addEventListener('click', function () {
    if (codeReader) {
        codeReader.reset();    
    }
    for (const li of allergenOl.children) {
        let item = li.innerHTML;
        finalList.innerHTML += `<li>${item}</li>`;
    }
    scannerInit();
    scannerIconsDiv.style.display = 'flex';
    addAllergenWindow.style.display = 'none';
    scannerDiv.style.display = 'flex';
    scanningForDiv.style.display = 'flex';
    stopScanBtn.style.display = 'block';
});

function resetScanner() {
    if (apiOutput) {
        codeReader.reset();    
    } 
}

const codeReader = new ZXing.BrowserMultiFormatReader();
function scannerInit() {
    let selectedDeviceId;
    console.log('ZXing code reader initialized');
    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
            // console.log(result);
            scannedText = result.text;
            getAPI();
        }
        if (apiOutput) {
            resetScanner();
            finishScanning();
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
            document.getElementById('barcode-reader-results').textContent = err;
        }
    })
        .catch((err) => {
            console.error(err);
        });
    console.log(`Started continous decode from camera with id ${selectedDeviceId}`);
    
}

stopScanBtn.addEventListener('click', function () {
    resetScanner();
    scannerDiv.style.display = 'none';
    scanningForDiv.style.display = 'none';
    addAllergenWindow.style.display = 'flex';
    stopScanBtn.style.display = 'none';
});




