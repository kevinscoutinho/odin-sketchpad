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

function sketchpadResolution(padResolution) {
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
}

function changeToEraser() {
    sketchpad = document.querySelector('div.pad');
    sketchpad.classList.add('eraser');
}

function changeToPencil() {
    sketchpad = document.querySelector('div.pad');
    sketchpad.classList.remove('eraser');
}

function paint() {
    this.style.cssText = `
    background-color: black;
    width: ${this.style.width};
    height: ${this.style.height}`;
}

function clearPad() {
    const squares = document.querySelectorAll('div.square');
    squares.forEach((square) => square.style.cssText = `
    background-color: white;
    width: ${square.style.width};
    height: ${square.style.height}`);
}

//const squares = document.querySelectorAll('div.square');

//squares.forEach((square) => square.addEventListener('mousemove', paint))

const pencil = document.querySelector('div.buttons button.pencil');
const buttonRGB = document.querySelector('button.rgb');
const buttonDarkening = document.querySelector('button.darkening');
const eraser = document.querySelector('button.eraser');
const buttonClear = document.querySelector('button.clear');

console.log(pencil);
console.log(eraser);
console.log(buttonRGB);
console.log(buttonClear);
console.log(buttonDarkening);

pencil.addEventListener('click', changeToPencil);
eraser.addEventListener('click', changeToEraser);
buttonClear.addEventListener('click', clearPad);
