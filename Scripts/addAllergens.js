
// Variables
let addBtn = document.getElementById('add-btn');
let allergenInput = document.getElementById('allergen-input');
let allergenOl = document.getElementById('allergen-list-items');
const listDiv = document.getElementById('allergen-list');
let allergenList = [];
const beginScanBtn = document.getElementById('begin-scan-btn');
const addAllergenWindow = document.getElementById('add-allergen-window');
const scannerDiv = document.getElementById('scanner-div');

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


addBtn.addEventListener('click', function() {
    let addedAllergen = getText();
    if (addedAllergen !== undefined) {
        allergenList.push(addedAllergen);
        createList();
        clearInput();
    } else {
        addBtn.style.animation = 'shakeX 0.5s';
        allergenInput.style.animation = 'rubberBand 0.5s';
        
    }
});

function beginScan() {
    // Scanner Init
    var resultContainer = document.getElementById('barcode-reader-results');
    var lastResult, countResults = 0;

    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;
            // Handle on success condition with the decoded message.
            console.log(`Scan result ${decodedText}`, decodedResult);
        }
    }

    var html5QrcodeScanner = new Html5QrcodeScanner(
        "barcode-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
}

beginScanBtn.addEventListener('click', function () {
    beginScan();
    addAllergenWindow.style.display = 'none';
    scannerDiv.style.display = 'flex';
});