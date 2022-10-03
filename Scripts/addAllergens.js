// Variables
let addBtn = document.getElementById('add-btn');
let allergenInput = document.getElementById('allergen-input');
let allergenOl = document.getElementById('allergen-list-items');
const listDiv = document.getElementById('allergen-list');
let allergenList = [];


function getText() {
    if (allergenInput.value !== '') {
        let allergenText = allergenInput.value;
        console.log(allergenText);
        return allergenText; 
    } else {
        alert('Please enter at least one allergen to start!');
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
        li.setAttribute('class', 'animate__bounceInDown');
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
    allergenList.push(addedAllergen);
    createList();
    clearInput();
});

