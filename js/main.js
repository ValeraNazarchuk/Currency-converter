const values = document.querySelectorAll('.canver__box-value')

const select = document.querySelector('#select')
const input = document.querySelector('#input')
const result = document.querySelector('#result')

setInterval(getCurrencies, 60000)

async function getCurrencies () {
  const currency = {}

  const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

  const response = await fetch(url)
  const data = await response.json();
  
  for (let item of values) {
    for (let el of data) {
      if (item.dataset.value === el.cc) (
        currency[el.cc] = el.rate.toFixed(2),
        item.textContent = el.rate.toFixed(2)
      )
    }
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