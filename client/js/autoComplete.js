const addAllergenInput = document.querySelector('#allergen-input');
const autocompleteDiv = document.getElementById('autocomplete');

export async function autoComplete() {
    let query = addAllergenInput.value;
    let baseUrl = 'https://api.edamam.com/auto-complete?app_id=ca2296e3&app_key=a2e456b4aee5d50b688e3b76c657f79f&q=';
    let fetchUrl = new URL(baseUrl + query + '&limit=5');
    const resjson = await fetch(fetchUrl).then(function (response) {
        // The API call was successful
        return response.json();
    }).then(function (data) {
        // This is the JSON from response
        let topFive = data.slice(0, 5);
        for (let i = 0; i < topFive.length; i++) {
            let liText = topFive[i];
            document.getElementById(`ac-${i + 1}`).innerHTML = liText;
        }
    }).then(function () {
        autocompleteDiv.style.display = "flex";
    })
    .catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
    });
};
