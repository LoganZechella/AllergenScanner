import { getAPI } from './apiFetch.js';
import { apiOutput } from './apiFetch.js';
import { autoComplete } from './autoComplete.js';
import { loginUser } from './loginUser.js';

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
const userLoginBtn = document.getElementById('login-btn');
const loginWindow = document.getElementById('login-window');
const hero = document.getElementById('hero');
const stopScanBtn = document.getElementById('stop-scan-btn');
const scanAgainBtn = document.getElementById('scan-again-btn');
const btnSpacer = document.querySelector('.spacer');
const autoompleteList = document.getElementById('autocomplete-list');
const loginFormEmail = document.getElementById('login-email-text');
const loginFormPassword = document.getElementById('login-password-text');

//Login Window Functions
function toggleLogin() {
    hero.style.display = 'none';
    loginBtn.style.display = 'none';
    loginWindow.style.display = 'flex';
    addAllergenWindow.style.display = 'none';
}

loginBtn.addEventListener('click', toggleLogin);
userLoginBtn.addEventListener('click', async function () {
    let userBasket = await loginUser();
    if (loginFormEmail.value === userBasket && loginFormPassword.value === userBasket && loginFormPassword.value !== '' && loginFormEmail.value !== '') {
        loginWindow.querySelector("h2").innerHTML = "Signup Successful!";
        loginWindow.querySelector("form").style.display = "none";
        loginWindow.style.marginTop = "25vh";
        loginWindow.style.animation = "bounceOut 1500ms 500ms";
        setTimeout(function () {
            loginWindow.style.display = "none";
            addAllergenWindow.style.animation = "bounceIn 500ms";
            addAllergenWindow.style.display = "flex";
        }, 2000);
    } else {
        loginFormEmail.style.animation = "shake 0.5s";
        loginFormPassword.style.animation = "shake 0.5s";
        loginFormEmail.style.border = "3px solid red";
        loginFormPassword.style.border = "3px solid red";
    }
    loginFormEmail.addEventListener('input', function () {
        loginFormEmail.style.border = "none";
        loginFormPassword.style.border = "none";
    });
    
});

function getText() {
    if (allergenInput.value !== '') {
        let allergenText = allergenInput.value;
        return allergenText;
    } else {
        allergenInput.style.animation = 'rubberBand 0.5s';
    }
}

function clearInput() {
    allergenInput.value = '';
    for (const li of autoompleteList.children) {
        li.innerHTML = '';
    }
}

// Add Allergen Window Functions
function createList() {
    if (allergenList.length === 0) {
        let li = document.createElement('li');
        li.setAttribute('class', 'animate__bounceInDown');
        li.innerHTML = allergenList[0];
        allergenOl.appendChild(li).setAttribute('class', 'added-item');
    } else {
        let newestLi = allergenList[allergenList.length - 1];
        let li = document.createElement('li');
        li.innerHTML = newestLi;
        allergenOl.appendChild(li).setAttribute('class', 'added-item');
    }
}

function enableBeginScan() {
    if (allergenList.length > 0 || beginScanBtn.disabled === true) {
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
        autoompleteList.style.display = 'none';
        allergenInput.focus();
    } else {
        addBtn.style.animation = 'shakeX 0.5s';
        allergenInput.style.animation = 'rubberBand 0.5s';
    }
    if (beginScanBtn.style.display !== 'none' && beginScanBtn.disabled === true) {
        enableBeginScan();
    } else {
        resumeScanBtn.style.cursor = 'pointer';
        resumeScanBtn.removeAttribute('disabled');
    }
});

allergenInput.addEventListener('input', function () {
    autoComplete(allergenInput.value);
    if (autoompleteList.style.display === 'none') {
        autoompleteList.style.display = 'block';
    }
    if (allergenInput.value === '') {
        for (const li of autoompleteList.children) {
            li.innerHTML = '';
        }
        autoompleteList.style.display = 'none';
    }
    if (beginScanBtn.style.display !== 'none' && beginScanBtn.disabled === true) {
        enableBeginScan();
    } else {
        resumeScanBtn.style.cursor = 'pointer';
        resumeScanBtn.removeAttribute('disabled');
    }
});

autoompleteList.addEventListener('click', function (e) {
    let clickedItem = e.target.innerHTML;
    allergenList.push(clickedItem.toLowerCase());
    createList();
    autoompleteList.style.display = 'none';
    listDiv.style.display = 'flex';
    clearInput();
    allergenInput.focus();
});


function deleteItem() {
    let item = this;
    item.remove();
    allergenList.splice(allergenList.indexOf(item.innerHTML), 1);
    if (allergenList.length === 0) {
        beginScanBtn.setAttribute('disabled', true);
        beginScanBtn.style.cursor = 'not-allowed';
        resumeScanBtn.setAttribute('disabled', true);
        resumeScanBtn.style.cursor = 'not-allowed';
    }
    if (allergenList.length > 0 && resumeScanBtn.disabled === true) {
        resumeScanBtn.style.cursor = 'pointer';
        resumeScanBtn.removeAttribute('disabled');
    }
}

allergenOl.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.style.animation = 'bounceOut 600ms';
        e.target.style.color = 'red';
        setTimeout(deleteItem.bind(e.target), 600);
    }
});


// Check for allergen matches in ingredients &
// Search for all tree nuts if user adds 'nuts' or 'tree nuts' to list
const nutReplacements = ["Almond", "Beechnut", "Brazil nut", "Bush nut", "Butternut", "Cashew", "Chestnut", "Coconut", "Filbert", "Ginko nut", "Hazelnut", "Hickory nut", "Lichee nut", "Macadamia nut", "Nangai nut", "Pecan", "Peanut", "Pine nut", "Pistachio", "Shea nut", "Walnut"]

let matches = [];
var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

function checkIngredients() {
    let ingredientList = apiOutput.ingredients.toLowerCase().split(',');
    let cleanedIngredients = ingredientList.map((string) => {
        return string
            .split('')
            .filter(function (letter) {
                return punctuation.indexOf(letter) === -1;
            })
            .join('');
    });
    let cleanedArray = cleanedIngredients.map((string) => {
        return string.split(' ');
    })
    function filterItems(arr, query) {
        return arr.filter((el) => el.toLowerCase().includes(query.toLowerCase()));
    }

    for (let i = 0; i < cleanedArray.length; i++) {
        for (let j = 0; j < allergenList.length; j++) {
            if (allergenList[j] === 'nuts' || allergenList[j] === 'tree nuts') {
                nutReplacements.forEach((nut) => {
                    if (!allergenList.includes(nut.toLowerCase())) {
                        allergenList.push(nut);
                    }
                })
            }
            let filtered = filterItems(cleanedIngredients, allergenList[j])
            if (filtered.length > 0) {
                matches.push(allergenList[j].toUpperCase());
            }
        }
    }

    if (matches.length === 0) {
        matches.push('None');
    }
}


// Finish Scanning and Check Ingredients for Allergens
export let scannedText;

async function finishScanning() {
    let apiResults = await getAPI();
    scannedResults.style.animation = 'bounceIn 1s';
    scannedResults.style.display = 'flex';
    barcodeReader.style.display = 'none';
    scanAgainBtn.style.display = 'flex';
    btnSpacer.style.display = 'flex';
    scannedItemName.innerHTML = `${apiOutput.name}`;
    scannedItemIngredients.innerHTML = `Ingredients:<br/> ${apiOutput.ingredients.replaceAll(';', ', ')}`;
    checkIngredients();
    scannedItemAllergens.innerHTML = `Allergens: ${matches}`;
    if (matches.length >= 1 && matches[0] !== 'None') {
        scannedItemAllergens.className = 'scanned-item-allergens-unsafe';
    } else {
        scannedItemAllergens.className = 'scanned-item-allergens-safe';
    }
    codeReader.reset();
}

function updateScanningFor() {
    for (const li of allergenOl.children) {
        finalList.innerHTML += `<li>${li.innerHTML}</li>`;
    };
}

// Scanner Buttons Event Listeners
beginScanBtn.addEventListener('click', function () {
    updateScanningFor();
    scannerInit();
    addAllergenWindow.style.display = 'none';
    scannerDiv.style.display = 'flex';
    scanAgainBtn.style.display = 'none';
    btnSpacer.style.display = 'none';
    scanningForDiv.style.display = 'flex';
    stopScanBtn.style.display = 'flex';
    sessionStorage.setItem('allergenList', JSON.stringify(allergenList));
});

scanAgainBtn.addEventListener('click', function () {
    scannedResults.style.display = 'none';
    btnSpacer.style.display = 'none';
    barcodeReader.style.display = 'flex';
    scanAgainBtn.style.display = 'none';
    matches = [];
    scannerInit();
});

resumeScanBtn.addEventListener('click', function () {
    updateScanningFor();
    scannerReInit();
    scannedResults.style.display = 'none';
    addAllergenWindow.style.display = 'none';
    scannerDiv.style.display = 'flex';
    barcodeReader.style.display = 'flex';
    stopScanBtn.style.display = 'flex';
    scanningForDiv.style.display = 'flex';
});

stopScanBtn.addEventListener('click', function () {
    codeReader.stopAsyncDecode();
    codeReader.reset();
    matches = [];
    scannerDiv.style.display = 'none';
    scanningForDiv.style.display = 'none';
    finalList.innerHTML = '';
    beginScanBtn.style.display = 'none';
    resumeScanBtn.removeAttribute('disabled');
    resumeScanBtn.style.display = 'inline-block';
    addAllergenWindow.style.display = 'flex';
    stopScanBtn.style.display = 'none';
});

// Barcode Scanner
let codeReader = new ZXing.BrowserMultiFormatReader();
function scannerInit() {
    let selectedDeviceId;

    // Debug
    if (!navigator.mediaDevices?.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
    } else {
        // List cameras and microphones.
        navigator.mediaDevices.enumerateDevices()
            .then((devices) => {
                devices.forEach((device) => {
                    console.log(`${device.kind}: ${device.label} id = ${device.deviceId}`);
                });
            })
            .catch((err) => {
                console.error(`${err.name}: ${err.message}`);
            });
    }



    console.log('ZXing code reader initialized');
    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
            scannedText = result.text;
            finishScanning();
            codeReader.stopAsyncDecode();
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
            document.getElementById('barcode-reader-results').innerHTML = "It looks like this item isn't in our database just yet. We apologize for the inconvenience. Try scanning another item.";
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
            scannedText = result.text;
            newCodeReader.stopAsyncDecode();
            finishScanning();
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err);
            document.getElementById('barcode-reader-results').innerHTML = "It looks like this item isn't in our database just yet. We apologize for the inconvenience. Try scanning another item.";
        }
    })
        .catch((err) => {
            console.error(err);
        });
    console.log(`Started continous decode from camera with id ${selectedDeviceId}`);

}




