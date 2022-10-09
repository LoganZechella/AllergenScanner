
// Variables
let addBtn = document.getElementById('add-btn');
let allergenInput = document.getElementById('allergen-input');
let allergenOl = document.getElementById('allergen-list-items');
const listDiv = document.getElementById('allergen-list');
let allergenList = [];
const beginScanBtn = document.getElementById('begin-scan-btn');
const addAllergenWindow = document.getElementById('add-allergen-window');
const scannerDiv = document.getElementById('scanner-div');

let storage = window.sessionStorage;

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

function finalAllergenList() {
    return allergenList;
}

function enableBeginScan() {
    if (allergenList.length > 0 && beginScanBtn.disabled === true) {
        beginScanBtn.style.cursor = 'pointer';
        beginScanBtn.removeAttribute('disabled');
    }
};

addBtn.addEventListener('click', function() {
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

function beginScan() {
    function onScanSuccess(decodedText, decodedResult) {
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${decodedText}`, decodedResult);
    }

    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${error}`);
    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
        "barcode-reader",
        { fps: 3},
  /* verbose= */ false);
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
}

function styleScanList() {
    let scanningAllergenList = document.getElementById('final-allergen-list');
    for (const allergen of allergenList) {
        let li = document.createElement('li');
        li.innerHTML = allergen;
        scanningAllergenList.appendChild(li);
    }
    document.getElementById('scanning-for-div').style.display = 'flex';
}

function storageCounter() {
    let counter = 0;
    for (const allergen of allergenList) {
        storage.setItem(counter, allergen);
        counter++;
    }
}

beginScanBtn.addEventListener('click', function () {
    storageCounter();
    beginScan();
    addAllergenWindow.style.display = 'none';
    scannerDiv.style.display = 'flex';
    styleScanList();
});
