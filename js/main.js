const canvas = document.querySelector('[data-js="canvas"]');
const ctx = canvas.getContext('2d');
const file = document.querySelector('[data-js="file"]');
const btn = document.querySelector('[data-js="saveBtn"]');
const topLineText = document.querySelector('[data-js="topLineText"]');
const bottomLineText = document.querySelector('[data-js="bottomLineText"]');

window.topLineText = '';
window.bottomLineText = '';
topLineText.addEventListener('input', textChangeListener);
bottomLineText.addEventListener('input', textChangeListener);

file.addEventListener('change', handleFileSelect, false);
btn.addEventListener('click', saveFile, false);

function textChangeListener (e) {
    const data = e.target.dataset.js;
    const text = e.target.value;

    if (data == 'topLineText') {
      window.topLineText = text;
    } else {
      window.bottomLineText = text;
    }

    redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
    if (image !== null)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Text attributes
    ctx.font = '30pt Impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';

    if (topLine != null) {
        ctx.fillText(topLine, canvas.width / 2, 40);
        ctx.strokeText(topLine, canvas.width / 2, 40);
    }

    if (bottomLine != null) {
        ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
    }
}

function saveFile() {
  window.open(canvas.toDataURL());
}

function handleFileSelect(e) {
  const canvasWidth = 500;
  const canvasHeight = 500;
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.onload = function(fileObject) {
    const data = fileObject.target.result;

    // Create an image object
    const image = new Image();
    image.onload = function() {
      window.imageSrc = this;
      redrawMeme(window.imageSrc, null, null);
    }

    // Set image data to background image.
    image.src = data;
  };
  reader.readAsDataURL(file);
}
