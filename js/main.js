const values = document.querySelectorAll('.canver__box-value')

const select = document.querySelector('#select')
const input = document.querySelector('#input')
const result = document.querySelector('#result')

const valuesArray = ['USD', 'EUR', 'GBP', 'CAD', 'DKK', 'SEK']

async function getCurrencies () {
  const currency = {}

  const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

  const response = await fetch(url)
  const data = await response.json();
  
  for (let item of valuesArray) {
    for (let el of data) {
      if (item === el.cc) currency[el.cc] = el.rate.toFixed(2)
    }
  }
  
  for (let item of values) {
    if (currency[item.dataset.value]) item.textContent = currency[item.dataset.value]
  }

  return currency
}

getCurrencies().then(elem => {
  input.oninput = converValue
  select.oninput = converValue

  function converValue() {
    result.value = ((input.value) / elem[select.value]).toFixed(2)
  }

  converValue()
})