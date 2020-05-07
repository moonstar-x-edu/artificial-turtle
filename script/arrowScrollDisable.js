const arrowCodes = [32, 37, 38, 39, 40];

function disableArrowScroll(event) {
  if (arrowCodes.includes(event.keyCode)) {
    event.preventDefault();
  }
}

function disableGameControl(event) {
  event.stopPropagation();
}

document.addEventListener('click', (event) => {
  if (event.target.tagName === 'CANVAS') {
    document.addEventListener('keydown', disableArrowScroll);
    document.removeEventListener('keydown', disableGameControl);
  } else {
    document.removeEventListener('keydown', disableArrowScroll);
    document.addEventListener('keydown', disableGameControl);
  }
});

window.addEventListener('load', () => {
  document.addEventListener('keydown', disableGameControl);
});
