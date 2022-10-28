import { getAPI } from './apiFetch.js';
import { apiOutput } from './apiFetch.js';

// Variables
const addBtn = document.getElementById('add-btn');
const allergenInput = document.getElementById('allergen-input');
const allergenOl = document.getElementById('allergen-list-items');
const listDiv = document.getElementById('allergen-list');
let allergenList = [];
const beginScanBtn = document.getElementById('begin-scan-btn');
const addAllergenWindow = document.getElementById('add-allergen-window');
const scannerDiv = document.getElementById('scanner-div');
const scanningForDiv = document.getElementById('scanning-for-div');
const scannedResults = document.getElementById('barcode-reader-results');
const barcodeReader = document.getElementById('barcode-reader');
const scannedItemName = document.getElementById('scanned-item-name');
const scannedItemAllergens = document.getElementById('scanned-item-allergens');
const scannedItemIngredients = document.getElementById('scanned-item-ingredients');
const loginBtn = document.getElementById('login-btn');
const loginWindow = document.getElementById('login-window');
const hero = document.getElementById('hero');
const stopScanBtn = document.getElementById('stop-scan-btn');

let storage = window.sessionStorage;

function toggleLogin() {
    hero.style.display = 'none';
    loginBtn.style.display = 'none';
    loginWindow.style.display = 'flex';
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
    listDiv.style.display = 'flex';
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
        allergenList.push(addedAllergen);
        createList();
        clearInput();
        allergenInput.focus();
    } else {
        addBtn.style.animation = 'shakeX 0.5s';
        allergenInput.style.animation = 'rubberBand 0.5s';
    }
    enableBeginScan();
});


function styleScanList() {
    let scanningAllergenList = document.getElementById('final-allergen-list');
    for (const allergen of allergenList) {
        let li = document.createElement('li');
        li.innerHTML = allergen;
        scanningAllergenList.appendChild(li);
    }
    document.getElementById('scanning-for-div').style.display = 'flex';
}


let matches = [];


function checkIngredients() {
    let rawIngredients = apiOutput.ingredients;
    let eachIngredient = rawIngredients.split(';');
    let lowercaseIngredients = [];
    for (const ingredient of eachIngredient) {
        lowercaseIngredients.push(ingredient.toLowerCase());
    }

    for (var i = 0; i < lowercaseIngredients.length; i++) {
        for (var j = 0; j < allergenList.length; j++) {
            var temp = allergenList[j].split(",");
            if (lowercaseIngredients[i] == temp[0]) {
                matches.push(allergenList[j]);
                break;
            }
        }
    }
    console.log(matches);
}

export let scannedText = '';

function finishScanning() {
    barcodeReader.style.display = 'none';
    scannedResults.style.display = 'flex';
    scannedItemName.innerHTML = `Product Name: ${apiOutput.name}`;
    scannedItemIngredients.innerHTML = `Ingredients: ${apiOutput.ingredients}`;
    // scannedItemAllergens.innerHTML = `Allergens: ${matches}`;
}

beginScanBtn.addEventListener('click', function () {
    addAllergenWindow.style.display = 'none';
    scannerDiv.style.display = 'flex';
    styleScanList();
    scannerInit();
    stopScanBtn.style.display = 'block';
})

function scannerInit() {
    let selectedDeviceId;
    const codeReader = new ZXing.BrowserMultiFormatReader();
    console.log('ZXing code reader initialized');
    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
            // console.log(result);
            scannedText = result.text;
            getAPI();
        }
        if (apiOutput) {
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
    barcodeReader.disabled = true;
    scannerDiv.style.display = 'none';
    scanningForDiv.style.display = 'none'; addAllergenWindow.style.display = 'flex';
    stopScanBtn.style.display = 'none';
});