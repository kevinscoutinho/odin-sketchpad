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

//will delete and recreate the sketchpad container
function recreateSketchpadContainer() {
    const centerContainer = document.querySelector('div.center');
    let sketchpadContainer = document.querySelector('div.sketchpad');
    centerContainer.removeChild(sketchpadContainer);
    const sketchpad = document.createElement('div');
    sketchpad.classList.add('sketchpad');
    centerContainer.appendChild(sketchpad);
}

//will genarate the sketchpad or alter the sketchpad resolution according to the slider value
function createSketchpad() {
    recreateSketchpadContainer();

    sketchpadContainer = document.querySelector('div.sketchpad');
    const sketchpadResolution = document.querySelector('input.slider').value;
    const square = calcNumberOfSquares(sketchpadResolution);
    for (let i = 0; i < sketchpadResolution**2; i++) {
        sketchpadContainer.appendChild(square[i]);
    }

    const squares = document.querySelectorAll('div.square');
    squares.forEach((square) => square.addEventListener('mouseover', paint));
    squares.forEach((square) => square.addEventListener('mousedown', paint));
}

//will change to pencil mode//
function changeToPencil() {
    sketchpadContainer = document.querySelector('div.sketchpad');
    sketchpadContainer.classList.remove('eraser');
    paintingMode = 'pencil';
}

//will change to RGB mode//
function changeToRGB() {
    sketchpadContainer = document.querySelector('div.sketchpad');
    sketchpadContainer.classList.remove('eraser');
    paintingMode = 'rgb';
}

//will chanbe to eraser mode//
function changeToEraser() {
    sketchpadContainer = document.querySelector('div.sketchpad');
    sketchpadContainer.classList.add('eraser');
    paintingMode = 'eraser';
}

//will paint the sketchpad according to the selected mode//
function paint(e) {
    if (!mousedown && e.type == 'mouseover') return
    switch (paintingMode) {
        case 'pencil':
            this.style.backgroundColor = document.getElementById('color-picker').value;
            console.log(e.type);
            break;
        case 'rgb':
            this.style.backgroundColor = `rgb(${Math.floor(Math.random() * 256)} 
            ${Math.floor(Math.random() * 256)} 
            ${Math.floor(Math.random() * 256)})`;
            break;
        case 'eraser':
            this.style.backgroundColor = 'white';
            break;
    } 
}

//will clear the sketchpad//
function clearSketchpad() {
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
    document.querySelector('div.selected-color').style.backgroundColor = document.getElementById('color-picker').value;
}

//will initiate the sketchpad//
createSketchpad();

let mousedown = false;
document.addEventListener('mousedown', () => mousedown = true);
document.addEventListener('mouseup', () => mousedown = false);

let paintingMode = 'pencil';

const resolutionSlider = document.querySelector('input.slider');

const colorPicker = document.getElementById('color-picker');

const applyButton = document.querySelector('button.apply-resolution');
const pencil = document.querySelector('div.buttons button.pencil');
const RGBButton = document.querySelector('button.rgb');
const eraser = document.querySelector('button.eraser');
const clearButton = document.querySelector('button.clear');
const gridButton = document.querySelector('button.grid');


resolutionSlider.addEventListener('input', outputResolution);

colorPicker.addEventListener('input', showChosenColor);

applyButton.addEventListener('click', createSketchpad);
pencil.addEventListener('click', changeToPencil);
RGBButton.addEventListener('click', changeToRGB);
eraser.addEventListener('click', changeToEraser);
clearButton.addEventListener('click', clearSketchpad);
gridButton.addEventListener('click', showGrid);