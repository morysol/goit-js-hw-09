import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.5.min.js';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

const refs = {
  form: document.querySelector('.form'),
  formInput: document.querySelector('.form[name="delay"]'),
  formStep: document.querySelector('.form[name="step"]'),
  formAmount: document.querySelector('.form[name="amount"]'),
  formButton: document.querySelector('.form button'),
};

refs.form.addEventListener('submit', formOnSubmit);

function formOnSubmit(event) {
  event.preventDefault();
  // console.log(event.target.elements);
  const {
    elements: { delay, step, amount },
  } = event.target;

  console.log(delay.value, step.value, amount.value);

  // const {
  //   elements: { email, message },
  // } = event.target;

  // if (email.value === '' || message.value === '') {
  //   return console.log('Please fill in all the fields!');
  // }

  // console.log(` ------> submited email: "${email.value}", message: "${message.value}"`);

  // localStorage.removeItem(localStorageLable);

  event.target.reset();
}

// refs.formButton.addEventListener('click', formOnSubmit);
// function formOnSubmit() {
//   console.log('submitted');
//   console.log(refs);
// }
