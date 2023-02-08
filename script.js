'use strict';

const haveCurrency = document.querySelectorAll('.exchange-currency_have')
const getCurrency = document.querySelectorAll('.exchange-currency_get')
const haveCurrrencyLabel = document.querySelector('.have-currency-label')
const getCurrrencyLabel = document.querySelector('.get-currency-label')
const getCurrencyInput = document.querySelector('.get-currency-input')
const haveCurrencyInput = document.querySelector('.have-currency-input')
let currencyHave = 'RUB'
let currencyGet = 'USD'

async function getApi(from, to) {

    return fetch(`https://api.exchangerate.host/latest?base=${from}&symbols=${to}`)
        .then(response => response.json())

}


function addClass(firstElement, secondElement, thirdElement) {
    firstElement.forEach((element) => {
        if (element.classList.contains('active')) {
            element.classList.remove('active')
        }
    })


    secondElement.forEach((element) => {
        if (element.classList.contains('active')) {
            thirdElement = element.innerText
        }
    })
}


function showInputValue(data, getInput, haveInput, currency) {

    if (data && data.rates) {
        getInput.value = (haveInput.value * data.rates[currency]).toFixed(4);

    } else {
        console.error('Error: rates property not found');
    }
}

function showRates(data, label, currencyOne, currencyTwo) {

    label.innerText = 1 + ' ' + currencyOne + '=' + ' ' + data.rates[currencyTwo] + ' ' + currencyTwo

}




haveCurrency.forEach((el) => {

    el.addEventListener('click', () => {

        addClass(haveCurrency, getCurrency, currencyGet)

        currencyHave = el.innerText

        el.classList.add('active')



        getApi(currencyHave, currencyGet).then(data => {

            showInputValue(data, getCurrencyInput, haveCurrencyInput, currencyGet)

            showRates(data, haveCurrrencyLabel, currencyHave, currencyGet)



            getApi(currencyGet, currencyHave).then(data2 => {

                showRates(data2, getCurrrencyLabel, currencyGet, currencyHave)

            })


        }
        )
    })
})





getCurrency.forEach((el) => {

    el.addEventListener('click', () => {

        addClass(getCurrency, haveCurrency, currencyHave)


        el.classList.add('active')

        currencyGet = el.innerText

        getApi(currencyHave, currencyGet).then(data => {

            showInputValue(data, getCurrencyInput, haveCurrencyInput, currencyGet)

            showRates(data, haveCurrrencyLabel, currencyHave, currencyGet)


            getApi(currencyGet, currencyHave).then(data2 => {

                showRates(data2, getCurrrencyLabel, currencyGet, currencyHave)


            })
        }
        )
    })
})




haveCurrencyInput.addEventListener('keyup', () => {
    haveCurrencyInput.setAttribute('value', `${haveCurrencyInput.value}`)

    getApi(currencyHave, currencyGet).then(data => {


        getCurrencyInput.value = (haveCurrencyInput.value * data.rates[currencyGet]).toFixed(4)

        showRates(data, haveCurrrencyLabel, currencyHave, currencyGet)

        getApi(currencyGet, currencyHave).then(data2 => {

            showRates(data2, getCurrrencyLabel, currencyGet, currencyHave)


        })
    }
    )
})





getCurrencyInput.addEventListener('keyup', () => {
    getCurrencyInput.setAttribute('value', `${getCurrencyInput.value}`)

    getApi(currencyHave, currencyGet).then(data => {

        showRates(data, haveCurrrencyLabel, currencyHave, currencyGet)


        getApi(currencyGet, currencyHave).then(data2 => {

            haveCurrencyInput.value = (getCurrencyInput.value / data.rates[currencyGet]).toFixed(4)

            showRates(data2, getCurrrencyLabel, currencyGet, currencyHave)


        })
    }
    )
})