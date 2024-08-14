// common convention : put all event listenres at the end and functions on the top of listeners

// grab all relative elements

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show input error msg
function showError(input, message) {
    const formControl = input.parentElement;
    //   formControl.classList.add('error');
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;

}

// show if success then green outline
function showSuccess(input) {

    const formControl = input.parentElement;

    formControl.className = 'form-control success';

}
// check email is valid
function checkEmail(input) {

    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (re.test(input.value.trim())) {
        showSuccess(input);
      } else {
         showError(input,'Email is not valid');
      }
}

//function to check if input fields are empty or not
function checkRequired(inputArr) {
    inputArr.forEach(function (input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);

        } else {
            showSuccess(input);
        }

    });

}
//function to uppercase the first letter
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//functio to check lenght of inputs
function checkLenght(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)}  must be at least ${min} characters `);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)}  must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }

}

// function to check either password matches
function checkPasswordMatch(input1,input2){
        
    if (input1.value !== input2.value) {
        showError(input2,'Password do not match')
        }


}












// all event listenres
// form submit on btn click
form.addEventListener('submit', function (e) {
    e.preventDefault();


    //this is simple and not standard method
    /* if (username.value === '') {
         showError(username, 'username is required');
 
     } else {
         showSuccess(username);
     }
     // if (email.value === '') {
     //     showError(email, 'email is required');
 
     // } else if (!isValidEmail(email.value)) {
     //     showError(email, 'email is not valid');
     // }
     // else {
     //     showSuccess(email);
     // }
     // if (password.value === '') {
     //     showError(password, 'passwor is required');
 
     // } else {
     //     showSuccess(password);
     // }
     // if (password2.value === '') {
     //     showError(password2, 'password is required');
 
     // } else {
     //     showSuccess(password2);
     // }
     */



    //    we make a function that recive array of all inputs and then run a forEach and valid it
    checkRequired([username, email, password, password2]);



    //    now check username length and password lenght
    checkLenght(username, 4, 15);
    checkLenght(password, 6, 20);
    checkEmail(email);
    checkPasswordMatch(password,password2)












});