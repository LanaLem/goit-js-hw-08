import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const email = formEl.elements.email;
const message = formEl.elements.message;
const LOCALSTORAGE_KEY = 'feedback-form-state';

repairTextInput();

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

function onFormInput() {
  const formData = {
    email: email.value,
    message: message.value,
  };

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (email.value && message.value) {
    console.log({ email: email.value, message: message.value });
    localStorage.removeItem(LOCALSTORAGE_KEY);
    e.currentTarget.reset();
  } else {
    alert('заполните все поля');
  }
}

function repairTextInput() {
  const parseMessage = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));

  if (!parseMessage) return;

  message.value = parseMessage.message;
  email.value = parseMessage.email;
}