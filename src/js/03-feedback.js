import _throttle from 'lodash.throttle';

const ref = {
  formEl: document.querySelector('.feedback-form'),
  emailEl: document.querySelector('input[name="email"]'),
  messageEl: document.querySelector('textarea[name="message"]'),
};

ref.formEl.addEventListener('input', _throttle(setLocalstorage, 1000));
ref.formEl.addEventListener('submit', onFormSubmit);

const key = 'feedback-form-state';
const formData = {};

pageLoading();

function setLocalstorage(event) {
  formData[event.target.name] = event.target.value;
  const formDataJSON = JSON.stringify(formData);
  localStorage.setItem(key, formDataJSON);
}

function onFormSubmit(event) {
  event.preventDefault();

  const data = JSON.parse(localStorage.getItem(key));
  if (localStorage.getItem(key)) {
    if (!data['email'] || !data['message']) {
      return;
    }
    console.log(data);
  }
  event.currentTarget.reset();
  localStorage.removeItem(key);
}

function pageLoading() {
  const data = JSON.parse(localStorage.getItem(key));

  if (localStorage.getItem(key)) {
    if (data['email']) {
      ref.emailEl.value = data['email'];
    }
    if (data['message']) {
      ref.messageEl.value = data['message'];
    }
  }
}
