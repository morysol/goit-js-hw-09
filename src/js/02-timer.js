import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  onClickStartBtn: document.querySelector('button[data-start]'),
  datetimePicker: document.querySelector('input#datetime-picker'),
  timerValaueDays: document.querySelector('.value[data-days]'),
  timerValaueDays: document.querySelector('.value[data-hours]'),
  timerValaueDays: document.querySelector('.value[data-minutes]'),
  timerValaueDays: document.querySelector('.value[data-seconds]'),
};

refs.onClickStartBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    return selectedDates[0];
  },
  locale: Russian,
};

let calendar = flatpickr(refs.datetimePicker, options);

// console.log(calendar.parseDate());
// console.log(calendar.formatDate(selectedDates[0], formatStr));
// console.log(calendar.selectedDates[0], calendar.dateStr);

// console.log('--->', flatpickr.parseDate(calendar.selectedDates[0], 'Y-m-d'));
// console.log('-><-', flatpickr.formatDate(new Date(), 'Y-m-d h:i K'));

// console.log('--->', flatpickr.formatDate(calendar.selectedDates[0], 'Ymd'));
// console.log('-><-', flatpickr.formatDate(new Date(), 'Ymd'));
// console.log(calendar);
// window.alert('Please choose a date in the future');

console.log(calendar.parseDate());
