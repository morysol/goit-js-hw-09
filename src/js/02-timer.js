import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-aio-3.2.5.min.js';

import '../css/timer.css'; // my little joke

const refs = {
  btnStart: document.querySelector('button[data-start]'),
  datetimePicker: document.querySelector('input#datetime-picker'),
  timerValaueDays: document.querySelector('.value[data-days]'),
  timerValaueHours: document.querySelector('.value[data-hours]'),
  timerValaueMinutes: document.querySelector('.value[data-minutes]'),
  timerValaueSeconds: document.querySelector('.value[data-seconds]'),

  timer: document.querySelector('.timer'),
};

createBtnCancel();
disableBtnStart();

refs.btnStart.addEventListener('click', makeTimer);

let timerId = null;
let timerUI = null;

const datesLimits = {
  start: 0,
  current: 0,
  finish: 0,
  isFinish: false,
  offset: 1000,
  init(start, finish) {
    this.start = start;
    this.current = start - finish;
    this.finish = finish;
  },
  timerTick() {
    this.current -= this.offset;
    this.isFinish = this.current <= 0;
  },
  setOffset(offset) {
    this.offset = offset;
  },
};

function makeTimer() {
  disableBtnStart();
  timerId = setInterval(goTimer, 1000, datesLimits);
  document.querySelector('.geddon button').addEventListener('click', cancelArmageddon);
  visibleBtnCancel();
}

function enableBtnStart() {
  refs.btnStart.removeAttribute('disabled');
}

function disableBtnStart() {
  refs.btnStart.setAttribute('disabled', 'disabled');
}

function goTimer(datesLimits) {
  timerUI = convertMs(datesLimits.current);

  refs.timerValaueDays.textContent = addLeadingZero(timerUI.days);
  refs.timerValaueHours.textContent = addLeadingZero(timerUI.hours);
  refs.timerValaueMinutes.textContent = addLeadingZero(timerUI.minutes);
  refs.timerValaueSeconds.textContent = addLeadingZero(timerUI.seconds);

  datesLimits.timerTick();

  if (datesLimits.isFinish) {
    clearInterval(timerId);
  }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    let todayDate = instance.now.getTime();
    let selectedDate = selectedDates[0].getTime();

    if (selectedDate > todayDate) {
      enableBtnStart();
      datesLimits.init(selectedDate, todayDate);
    } else {
      // alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      instance.open();
      disableBtnStart();
    }
  },

  locale: Russian,
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

let calendar = flatpickr(refs.datetimePicker, options);

function createBtnCancel() {
  const timerUIMarkUp = `<div class='geddon'>
<p>До конца света осталось :</p>
<button type="button" data-cancel>Остановить</button>
</div>`;
  refs.timer.insertAdjacentHTML('beforebegin', timerUIMarkUp);
}

function visibleBtnCancel() {
  document.querySelector('.geddon').classList.add('visible');
}

function cancelArmageddon() {
  clearInterval(timerId);
  document.querySelector('.geddon').classList.remove('visible');
  document.querySelector('.geddon button').removeEventListener('click', cancelArmageddon);
  // datesLimits.setOffset(1000000);
}
