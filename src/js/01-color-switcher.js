const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
refs.btnStart.addEventListener('click', onBtnStart);
refs.btnStop.addEventListener('click', onBtnStop);

let btnStartId = null;

function onBtnStart(e) {
  document.body.style.backgroundColor = getRandomHexColor();
  btnStartId = setInterval(
    () => (document.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
  e.target.disabled = true;
  refs.btnStop.disabled = false;
}
function onBtnStop(e) {
  clearInterval(btnStartId);
  refs.btnStart.disabled = false;
  e.target.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
