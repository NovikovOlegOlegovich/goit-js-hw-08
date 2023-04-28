import _throttle from 'lodash.throttle';
import Notiflix from 'notiflix';

const ref = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('input[name="email"]'),
  messageEl: document.querySelector('textarea[name="message"]'),
};

ref.formEl.addEventListener('input', _throttle(setLocalstorage, 1000));
ref.formEl.addEventListener('submit', onFormSubmit);

const key = 'feedback-form-state';
const formData = JSON.parse(localStorage.getItem(key)) || {};

pageLoading();

function setLocalstorage(event) {
  formData[event.target.name] = event.target.value;
  console.log(formData);
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem(key, formDataJSON);
}

function onFormSubmit(event) {
  event.preventDefault();

  const data = JSON.parse(localStorage.getItem(key));
  if (localStorage.getItem(key)) {
    if (!data.email || !data.message) {
      Notiflix.Notify.failure('fill all the fields');
    }
  }
  event.currentTarget.reset();
  localStorage.removeItem(key);
}

function pageLoading() {
  const data = JSON.parse(localStorage.getItem(key));

  for (let key in data) {
    if (data.key) {
      continue;
    }
    data.key = data[key];
  }
  if (data.hasOwnProperty('email')) {
    ref.emailEl.value = data.email;
  }
  if (data.hasOwnProperty('message')) {
    ref.messageEl.value = data.message;
  }
}
