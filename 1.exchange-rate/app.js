const currencyEl_1 = document.getElementById('currency-one');
const currencyEl_2 = document.getElementById('currency-two');
const amountEl_1 = document.getElementById('amount-one');
const amountEl_2 = document.getElementById('amount-two');
const swap = document.getElementById('swap');
const rateEl = document.getElementById('rate');

// console.log(rate);


//API
const olderApi='https://api.exchangerate-api.com/v4/latest/'
const apiKey= ' 75ee70aac3d41d40d460762d';
// const endpooint=`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;


//fetch function for getting data

function calculate() {
    //get currency name from select
        const currency_1= currencyEl_1.value;
        const currency_2= currencyEl_2.value;

    
    fetch(`${olderApi}${currency_1}`)
    .then(res=>res.json())
    .then(data=>{
        // console.log(data)
          const rate=data.rates[currency_2];
        //   console.log(rate);
        rateEl.innerText=`1 ${currency_1} = ${rate}  ${currency_2}`;
        // console.log(rate);

          amountEl_2.value=(amountEl_1.value*rate).toFixed(2)

    })



}

//event listeners

currencyEl_1.addEventListener('change', calculate);
currencyEl_2.addEventListener('change', calculate);
amountEl_1.addEventListener('input', calculate);
amountEl_2.addEventListener('input', calculate);



swap.addEventListener('click',()=>{

     const temp=currencyEl_1.value;
     currencyEl_1.value= currencyEl_2.value;
     currencyEl_2.value=temp;
     calculate();


});
// document.addEventListener('DOMContentLoaded',calculate)
calculate();