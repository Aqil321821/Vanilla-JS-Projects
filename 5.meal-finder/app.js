const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal'),
    spinner = document.getElementById('spinner');


//show spinner
function showSpinner() {
    spinner.classList.add('show');
}
function hideSpinner() {
    spinner.classList.remove('show');
}


//function to get random meal from API
function randomMeal() {
    // clear previous results from dom
    mealsEl.innerHTML = '';
    resultHeading.innerHTML = '';
    showSpinner();
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            hideSpinner();
            const meal = data.meals[0];
            addMealToDOM(meal);
        });

}





//function to search mael
function saerchMeal(e) {
    e.preventDefault();

    //when we search for meals it gives us multiple meals and when we click it will get displayed under neath and if we hit again any meal we will have to clear previous meal
    single_mealEl.innerHTML = '';
    mealsEl.innerHTML = '';
    //get the term tobe saerched
    const term = search.value;
    //    console.log(term);
    //    check for empty string
    if (term.trim()) {
        showSpinner();
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)

            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                // console.log(data.meals);
                hideSpinner();
                resultHeading.innerHTML = `<h2> Search Results For '${term}' : </h2>`;
                if (data.meals === null) {
                    resultHeading.innerHTML = `<h2>No Results Found For '${term}'  Try Again !</h2>`;

                } else {
                    mealsEl.innerHTML = data.meals.map(meal =>
                        `  
                <div class="meal">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/> 
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                      <h3> ${meal.strMeal}</h3>
                    </div>

                </div>
                
                `
                    ).join('');

                }
            });

        //clear input field
        search.value = '';
    }
    else {
        alert('Enter Some Words To Search');
    }

}



//function to get meal by id single meal
function getMealById(mealID) {
    showSpinner();
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            hideSpinner();
            const meal = data.meals[0];
            addMealToDOM(meal);
        });
}

//function to add meal on to DOM

function addMealToDOM(meal) {

    //take ingredients from object and make an array of it
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
            // console.log(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);

        } else {
            break;
        }

    }
    console.log(ingredients);

    single_mealEl.innerHTML = `
     
          <div class="single-meal">
               <h1>${meal.strMeal}</h1>
               <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

               <div class="single-meal-info">
                  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : `' '`}
                  ${meal.strArea ? `<p>${meal.strArea}</p>` : `' '`}
               </div>
               <div>
                 <p>${meal.strInstructions}</p>
                 <h2>Ingredients</h2>
                 <ul>
                    ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                 </ul>
               </div>
          </div>
     
    `;

}














//all event listeners

submit.addEventListener('submit', saerchMeal);
random.addEventListener('click', randomMeal);


//find where the user clicked inside meal container
//we need to get the id of that meal which is clicked 
//we set an evenList on mealsEl which is the container of each meal div
//find() loop throughs all the child items of 'meal' div which is parent 



mealsEl.addEventListener('click', e => {
    const path = e.composedPath();

    const mealInfo = path.find(item => {
        // console.log(item);
        if (item.classList) {
            return item.classList.contains('meal-info');
            //  item.classList.contains('meal-info')

        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealId');
        // console.log(mealID);
        getMealById(mealID);

    }


});


//get random meal when page loads

document.addEventListener('DOMContentLoaded', randomMeal);

