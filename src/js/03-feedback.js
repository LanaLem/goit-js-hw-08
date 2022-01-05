var throttle = require('lodash.throttle');

const formEl = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = "feedback-form-state";
const formData = {}

repairTextInput();

formEl.addEventListener('input', throttle(onFormInput, 500));
function onFormInput(e) { 
    e.preventDefault();
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
    formData[e.target.name] = e.target.value;
}

formEl.addEventListener("submit", onFormSubmit);
function onFormSubmit(e) { 
    e.preventDefault();
    const parseMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    if (parseMessage?.email && parseMessage?.message) {
        console.log(parseMessage);
        localStorage.removeItem(LOCALSTORAGE_KEY);
        e.currentTarget.reset();  
    } else { alert('заполните все поля'); };
}

function repairTextInput() { 
    const parseMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

    if (parseMessage?.message) {
        formEl.message.value = parseMessage.message;
        formData.message = formEl.message.value
    };

    if (parseMessage?.email) {
        formEl.email.value = parseMessage.email;
        formData.email = formEl.email.value
    };
}