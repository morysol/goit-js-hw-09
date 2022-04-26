import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.5.min.js';

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

  if (amount.value < 1) {
    event.target.reset();
    console.log('The amount must be >= 1');
    return;
  }

  for (
    let i = 1, myDelay = Number.parseInt(delay.value);
    i <= amount.value;
    i += 1, myDelay += Number.parseInt(step.value)
  ) {
    console.log(myDelay);

    createPromise(i, myDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`);
        console.log(`❌ Rejected promise ${position} in ${delay} ms`);
      });
  }

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }

  event.target.reset();
}
