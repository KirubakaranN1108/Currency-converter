fetch('https://api.frankfurter.app/currencies')
    .then(res => res.json())
    .then(res => currencydropdown(res));

let select = document.querySelectorAll('.currency');
let input = document.getElementById('input');
let btn = document.getElementById('btn');

function currencydropdown(res) {
    let currency = Object.entries(res);
    for (let i = 0; i < currency.length; i++) {
        select[0].innerHTML += `<option value="${currency[i][0]}">${currency[i][0]} - ${currency[i][1]}</option>`;
        select[1].innerHTML += `<option value="${currency[i][0]}">${currency[i][0]} - ${currency[i][1]}</option>`;
    }
}

btn.addEventListener('click', () => {
    processConversion();
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { 
        processConversion();
    }
});

function processConversion() {
    let currency1 = select[0].value;
    let currency2 = select[1].value;
    let inputval = input.value;

    if (!inputval || isNaN(inputval) || inputval <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    if (currency1 === currency2) {
        alert('Please select different currencies.');
        return;
    }

    convert(currency1, currency2, inputval);
}

function convert(currency1, currency2, inputval) {
    fetch(`https://api.frankfurter.app/latest?amount=${inputval}&from=${currency1}&to=${currency2}`)
        .then((resp) => resp.json())
        .then((data) => {
            document.getElementById('result').value = Object.values(data.rates)[0];
        })
        .catch((error) => {
            alert('An error occurred while fetching the conversion rate.');
            console.error(error);
        });
}
