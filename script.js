//will calculate how many squares the pad will have
function calcNumberOfSquares(sketchpadResolution) {
    const square = [];
    let squareSize = 600/sketchpadResolution;
    for (let i = 0; i < sketchpadResolution**2; i++){
        square[i] = document.createElement(`div`);
        square[i].classList.add(`square`);
        square[i].classList.add(`n${i}`)
        square[i].style.cssText = `height: ${squareSize}px; width: ${squareSize}px`;
    }
    return square
}

//will genarate the pad or alter the pad resolution according to the slider value
function createSketchpad() {
    const sketchpadResolution = document.querySelector('input.slider').value;
    const center = document.querySelector('div.center');
    let sketchpad = document.querySelector('div.pad');
    center.removeChild(sketchpad);
    const pad = document.createElement('div');
    pad.classList.add('pad');
    center.appendChild(pad);
    sketchpad = document.querySelector('div.pad');
    const square = calcNumberOfSquares(sketchpadResolution);
    for (let i = 0; i < sketchpadResolution**2; i++) {
        sketchpad.appendChild(square[i]);
    }

    const squares = document.querySelectorAll('div.square');
    squares.forEach((square) => square.addEventListener('mouseover', paint));
    squares.forEach((square) => square.addEventListener('mousedown', paint));
}

//will change to pencil mode//
function changeToPencil() {
    sketchpad = document.querySelector('div.pad');
    sketchpad.classList.remove('eraser');
    mode = 'pencil';
}

//will change to RGB mode//
function changeToRGB() {
    sketchpad = document.querySelector('div.pad');
    sketchpad.classList.remove('eraser');
    mode = 'rgb';
}

//will chanbe to eraser mode//
function changeToEraser() {
    sketchpad = document.querySelector('div.pad');
    sketchpad.classList.add('eraser');
    mode = 'eraser';
}

//will paint the pad according to the selected mode//
function paint() {
    if (!mousedown) return
    switch (mode) {
        case 'pencil':
            this.style.backgroundColor = document.getElementById('color-picker').value;
            break;
        case 'rgb':
            this.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)} ${Math.floor(Math.random() * 256)})`;
            break;
        case 'eraser':
            this.style.backgroundColor = 'white';
            break;
    } 
}

//will clear the pad//
function clearPad() {
    const squares = document.querySelectorAll('div.square');
    squares.forEach((square) => square.style.backgroundColor = "white");
}

//will show the grid//
function showGrid() {
    const squares = document.querySelectorAll('div.square');
    if (getComputedStyle(squares[1]).border.split(" ")[0] == "1px") {
        squares.forEach((square) => square.classList.remove('grid-active'));
    } else {
        squares.forEach((square) => square.classList.add('grid-active'));
    }
}

//will exhibit the resolution of the slider//
function outputResolution() {
    const setResolution = document.querySelector('p.resolution');
    setResolution.textContent = `${this.value} x ${this.value}`;
}

//will show the chosen color//
function showChosenColor() {
    document.querySelector('div.selected-color').style.cssText = `
        background-color: ${document.getElementById('color-picker').value};`;
}

//will initiate the pad//
createSketchpad();

let mode = 'pencil';

const slider = document.querySelector('input.slider');

const color = document.getElementById('color-picker');

const applyButton = document.querySelector('button.apply-resolution');
const pencil = document.querySelector('div.buttons button.pencil');
const RGBButton = document.querySelector('button.rgb');
const eraser = document.querySelector('button.eraser');
const buttonClear = document.querySelector('button.clear');
const gridButton = document.querySelector('button.grid');

slider.addEventListener('input', outputResolution);

color.addEventListener('input', showChosenColor);

applyButton.addEventListener('click', createSketchpad);
pencil.addEventListener('click', changeToPencil);
RGBButton.addEventListener('click', changeToRGB);
eraser.addEventListener('click', changeToEraser);
buttonClear.addEventListener('click', clearPad);
gridButton.addEventListener('click', showGrid);

let mousedown = false;
document.addEventListener('mousedown', () => mousedown = true);
document.addEventListener('mouseup', () => mousedown = false);
