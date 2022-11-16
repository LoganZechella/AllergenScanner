
export async function loginUser() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = "";

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        body: null,
        redirect: 'follow'
    };

    await fetch("https://getpantry.cloud/apiv1/pantry/89aba819-8b18-44df-a06c-7a904c79f347/basket/userBasket", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            let userBasket = JSON.parse(result);
            console.log(userBasket);
            return userBasket;
        })
        .catch(error => console.log('error', error));
};

