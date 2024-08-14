const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millions');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('total-wealth');


let data = [];

//fetching data from randomapi
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();


    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)

    };
    addData(newUser);

    // console.log(newUser);
    // console.log(data);
    /* 
    data me ek array mil raha ha ...uske ander ek 'results' name ka 
    array ha ....us array k ander ek object ha jiski d/f props hen
    */
}

// getRandomUser();

//now add new object of user tpo data array
function addData(obj) {
    data.push(obj);
    updateDOM();
}

//updateDOM

function updateDOM(providedData = data) {

    //clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });



}



//formate number as money

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
}
// Sort users by richest
function sortByRichest() {
    console.log(123);
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
  
    updateDOM();
  }

  //Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}



//event listenrs

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click',showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);












