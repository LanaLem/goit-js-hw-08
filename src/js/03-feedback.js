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
    console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));

    e.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
}

function repairTextInput() { 
    const saveMessage = localStorage.getItem(LOCALSTORAGE_KEY);
    const parseMessage = JSON.parse(saveMessage);

    if (saveMessage) { 
        formEl.email.value = parseMessage.email;
        formEl.message.value = parseMessage.message;
    };
}