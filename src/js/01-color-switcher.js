const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
};

let timerID = null;

function onInitPage() {
  refs.btnStart.addEventListener('click', onClickBtnStart);
  refs.btnStop.addEventListener('click', onClickBtnStop);
  refs.btnStop.setAttribute('disabled', 'disabled');
}

function onClickBtnStart() {
  toggleButtons();
  timerID = setInterval(setBodyBgColor, 1000);
}

function onClickBtnStop() {
  toggleButtons();
  clearInterval(timerID);
}

function setBodyBgColor() {
  //   console.log(Date.now()); // debug only
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function toggleButtons() {
  refs.btnStop.toggleAttribute('disabled');
  refs.btnStart.toggleAttribute('disabled');
}

// start here
onInitPage();
