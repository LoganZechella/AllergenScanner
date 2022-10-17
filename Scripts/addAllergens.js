

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

// function beginScan() {
//     styleScanList();
//     storageCounter();
//     addAllergenWindow.style.display = 'none';
//     scannerDiv.style.display = 'flex';
// }

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


export let scannedText = '';

beginScanBtn.addEventListener('click', function () {
    addAllergenWindow.style.display = 'none';
    scannerDiv.style.display = 'flex';

    let selectedDeviceId;
    const codeReader = new ZXing.BrowserMultiFormatReader();
    console.log('ZXing code reader initialized');

    codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
        if (result) {
            console.log(result);
            scannedText = result.text;
            console.log(scannedText);
        }
        if (err && !(err instanceof ZXing.NotFoundException)) {
            console.error(err)
            document.getElementById('barcode-reader-results').textContent = err
        }
    })
        .catch((err) => {
            console.error(err)
        })
    console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
});



