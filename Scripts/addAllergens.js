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
const resumeScanBtn = document.getElementById('resume-scan-btn');
const addAllergenWindow = document.getElementById('add-allergen-window');
const scannerDiv = document.getElementById('scanner-div');
const scanningForDiv = document.getElementById('scanning-for-div');
const scanningForTxt = document.getElementById('scanning-for-txt');
const scannedResults = document.getElementById('barcode-reader-results');
const barcodeReader = document.getElementById('barcode-reader');
let scannedItemName = document.getElementById('scanned-item-name');
let scannedItemAllergens = document.getElementById('scanned-item-allergens');
let scannedItemIngredients = document.getElementById('scanned-item-ingredients');
const loginBtn = document.getElementById('header-login-btn');
const loginWindow = document.getElementById('login-window');
const hero = document.getElementById('hero');
const stopScanBtn = document.getElementById('stop-scan-btn');
const scanAgainBtn = document.getElementById('scan-again-btn');
const btnSpacer = document.querySelector('.spacer');


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
                matches.push(allergenList[j].toUpperCase());
            }
        }
    }
    if (matches.length === 0) {
        matches.push('None');

    }
}

export let scannedText;

async function finishScanning() {
    let apiResults = await getAPI();
    scannedResults.style.animation = 'bounceIn 1s';
    scannedResults.style.display = 'flex';
    barcodeReader.style.display = 'none';
    scanAgainBtn.style.display = 'flex';
    btnSpacer.style.display = 'flex';
    scannedItemName.innerHTML = `${apiOutput.name}`;
    scannedItemIngredients.innerHTML = `Ingredients: ${apiOutput.ingredients}`;
    checkIngredients();
    scannedItemAllergens.innerHTML = `Allergens: ${matches}`;
    if (matches.length >= 1 && matches[0] !== 'None') {
        scannedItemAllergens.className = 'scanned-item-allergens-unsafe';
    } else {
        scannedItemAllergens.className = 'scanned-item-allergens-safe';
    }
    codeReader.reset();
    matches = [];
}

function updateScanningFor() {
    for (const li of allergenOl.children) {
        finalList.innerHTML += `<li>${li.innerHTML}</li>`;
    };
}


beginScanBtn.addEventListener('click', function () {
    updateScanningFor();
    scannerInit();
    addAllergenWindow.style.display = 'none';
    scannerDiv.style.display = 'flex';
    scanAgainBtn.style.display = 'none';
    btnSpacer.style.display = 'none';
    scanningForDiv.style.display = 'flex';
    stopScanBtn.style.display = 'flex';
});

scanAgainBtn.addEventListener('click', function () {
    scannedResults.style.display = 'none';
    btnSpacer.style.display = 'none';
    barcodeReader.style.display = 'flex';
    scanAgainBtn.style.display = 'none';
    scannerInit();
});

let codeReader = new ZXing.BrowserMultiFormatReader();
function scannerInit() {
    let selectedDeviceId;
    console.log('ZXing code reader initialized');
    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
            // console.log(result);
            scannedText = result.text;
            console.log(scannedText);
            finishScanning();
            codeReader.stopAsyncDecode();
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

function scannerReInit() {
    let newCodeReader = new ZXing.BrowserMultiFormatReader();
    let selectedDeviceId;
    console.log('New ZXing code reader initialized');
    newCodeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
            // console.log(result);
            scannedText = result.text;
            newCodeReader.stopAsyncDecode();
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

resumeScanBtn.addEventListener('click', function () {
    updateScanningFor();
    scannerReInit();
    scannedResults.style.display = 'none';
    addAllergenWindow.style.display = 'none';
    btnSpacer.style.display = 'flex';
    scannerDiv.style.display = 'flex';
    barcodeReader.style.display = 'flex';
    scanAgainBtn.style.display = 'flex';
    stopScanBtn.style.display = 'flex';
    scanningForDiv.style.display = 'flex';
});

stopScanBtn.addEventListener('click', function () {
    codeReader.stopAsyncDecode();
    codeReader.reset();
    scannerDiv.style.display = 'none';
    scanningForDiv.style.display = 'none';
    finalList.innerHTML = '';
    beginScanBtn.style.display = 'none';
    resumeScanBtn.removeAttribute('disabled');
    resumeScanBtn.style.display = 'inline-block';
    addAllergenWindow.style.display = 'flex';
    stopScanBtn.style.display = 'none';
});




