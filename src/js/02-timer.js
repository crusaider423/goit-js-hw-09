import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btn: document.querySelector('[data-start]'),
  daysMarkup: document.querySelector('[data-days]'),
  hoursMarkup: document.querySelector('[data-hours]'),
  minutesMarkup: document.querySelector('[data-minutes]'),
  secondsMarkup: document.querySelector('[data-seconds]'),
};
refs.btn.addEventListener('click', onBtnClick);
refs.btn.disabled = true;

flatpickr(
  '#datetime-picker',
  (options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      currentDate = calculateDate(selectedDates[0]);
    },
  })
);

function calculateDate(fp) {
  const selecDate = fp.getTime();
  const dataNow = Date.now();
  if (selecDate < dataNow) {
    Notify.failure('Please choose a date in the future', {
     position: 'center-top'
    });
    return;
  }
  refs.btn.disabled = false;
  return selecDate - dataNow;
}

function onBtnClick() {
  refs.btn.disabled = true;
  const intervalId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs((currentDate -= 1000));
    refs.daysMarkup.textContent = addLeadingZero(days);
    refs.hoursMarkup.textContent = addLeadingZero(hours);
    refs.minutesMarkup.textContent = addLeadingZero(minutes);
    refs.secondsMarkup.textContent = addLeadingZero(seconds);

    if (currentDate < 1000) {
      clearInterval(intervalId);
    }
  }, 1000);
}

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
  return String(value).padStart(2, '0');
}
