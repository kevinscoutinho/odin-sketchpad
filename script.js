//will calculate how many squares the pad will have
function createSquares(padResolution) {
    const square = [];
    let squareSize = 600/padResolution;
    for (let i = 0; i < padResolution**2; i++){
        square[i] = document.createElement(`div`);
        square[i].classList.add(`square`);
        square[i].classList.add(`n${i}`)
        square[i].style.cssText = `height: ${squareSize}px; width: ${squareSize}px`;
    }
    return square
}

//will alter the pad resolution according to the slider value
function sketchpadResolution() {
    const padResolution = document.querySelector('input.slider').value;
    const center = document.querySelector('div.center');
    let sketchpad = document.querySelector('div.pad');
    center.removeChild(sketchpad);
    const pad = document.createElement('div');
    pad.classList.add('pad');
    center.appendChild(pad);
    sketchpad = document.querySelector('div.pad');
    const square = createSquares(padResolution);
    for (let i = 0; i < padResolution**2; i++) {
        sketchpad.appendChild(square[i]);
    }
    changeToPencil()
}


function changeToEraser() {
    sketchpad = document.querySelector('div.pad');
    sketchpad.classList.add('eraser');
    const squares = document.querySelectorAll('div.square');
    squares.forEach((square) => square.removeEventListener('mousemove', paint));
    squares.forEach((square) => square.addEventListener('mousemove', erase))
}


function changeToPencil() {
    sketchpad = document.querySelector('div.pad');
    sketchpad.classList.remove('eraser');
    const squares = document.querySelectorAll('div.square');
    squares.forEach((square) => square.removeEventListener('mousemove', erase));
    squares.forEach((square) => square.addEventListener('mousemove', paint));
}

function paint() {
    if (mousedown) {
        this.style.cssText = `
        background-color: ${document.getElementById('color-picker').value};
        width: ${this.style.width};
        height: ${this.style.height}`;
    }
}

function erase() {
    if (mousedown) {
        this.style.cssText = `
        background-color: white;
        width: ${this.style.width};
        height: ${this.style.height}`;
    }
}

function clearPad() {
    const squares = document.querySelectorAll('div.square');
    squares.forEach((square) => square.style.cssText = `
        background-color: white;
        width: ${square.style.width};
        height: ${square.style.height}`);
}

function outputResolution() {
    const setResolution = document.querySelector('p.resolution');
    setResolution.textContent = `${this.value} x ${this.value}`;
}

function showChosenColor() {
    document.querySelector('div.selected-color').style.cssText = `
        background-color: ${document.getElementById('color-picker').value};`;
}

sketchpadResolution();

const slider = document.querySelector('input.slider');

const color = document.getElementById('color-picker');

const applyButton = document.querySelector('button.apply-resolution');
const pencil = document.querySelector('div.buttons button.pencil');
const buttonRGB = document.querySelector('button.rgb');
const buttonDarkening = document.querySelector('button.darkening');
const eraser = document.querySelector('button.eraser');
const buttonClear = document.querySelector('button.clear');



slider.addEventListener('input', outputResolution);

color.addEventListener('input', showChosenColor);

applyButton.addEventListener('click', sketchpadResolution);
pencil.addEventListener('click', changeToPencil);
eraser.addEventListener('click', changeToEraser);
buttonClear.addEventListener('click', clearPad);

document.addEventListener('mousedown', () => mousedown = true);
document.addEventListener('mouseup', () => mousedown = false);
