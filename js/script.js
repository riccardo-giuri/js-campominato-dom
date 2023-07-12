"use strict";
/**
 * @type {Element}
 */
const newGameBtn = document.querySelector("#newGame_btn");
const modeSelect = document.querySelector("#modeSelect");
const gridContainer = document.querySelector(".square_container");
const scoreContainer = document.querySelector("#score");

newGameBtn.addEventListener("click", startNewGame);


function startNewGame() {
    let grid = [];
    let bombPositions = [];
    //reset score value
    scoreContainer.textContent = "0";

    switch (parseInt(modeSelect.value)) {
        //facile
        case 1:
            grid = createGrid(100);
            bombPositions = generateBombsPositionArray(100);
            addBombsToGrid(grid, bombPositions);
            printGrid(grid, gridContainer);
            break;

        //medio
        case 2:
            grid = createGrid(81);
            bombPositions = generateBombsPositionArray(81);
            addBombsToGrid(grid, bombPositions);
            printGrid(grid, gridContainer);
            break;
            
        
        //difficile
        case 3:
            grid = createGrid(49);
            bombPositions = generateBombsPositionArray(49);
            addBombsToGrid(grid, bombPositions);
            printGrid(grid, gridContainer);
            break;
    }
}

function createGrid(cellNumber) {
    const newGrid = [];
    const rowCellCount = Math.sqrt(cellNumber);

    for(let i = 0; i < cellNumber; i++) {
        const newCell = createCell((i + 1).toString(), rowCellCount);

        newGrid.push(newCell);
    }

    return newGrid;
}

function createCell(cellContent, cellPerRow) {
    const cell = document.createElement("div");

    cell.classList.add("square_box");
    cell.dataset.index = cellContent;
    cell.textContent = cellContent;
    cell.style.flexBasis = `calc(100% / ${cellPerRow})`;

    cell.addEventListener("click", cellClick);

    return cell;
}

function printGrid(gridtoPrint, htmlContainer) {
    htmlContainer.innerHTML = "";

    for(let i = 0; i < gridtoPrint.length; i++) {       
        htmlContainer.append(gridtoPrint[i]);
    }
}

function cellClick() {

    if(this.dataset.Clicked === undefined) {
        this.dataset.Clicked = "1";

        //you clicked on a clean cell
        if(this.dataset.Bomb === undefined){
            this.classList.add("bg-primary");
            let intScore = parseInt(scoreContainer.textContent);
            intScore += 1;
            scoreContainer.textContent = intScore.toString();
        }
        //you clicked on a bomb
        else {
            this.classList.add("bg-danger");
        }
    }
}

/**
 * Get a random number between 2 integer values a min value and a max value Inclusive
 */
function getRandomIntInclusive(min, maxInclusive) {
    return Math.floor(Math.random() * ((maxInclusive - min) + 1) + min);
}

/**
 * Add a random number from min to a max value Inclusive to an array if the number is not already present
 * @param {number[]} array The array where you want to add the numbers
 * @param {number} min Min value of the number randomly generated that will be added to the array
 * @param {number} maxValueInclusive Max value(Inclusive) of the number randomly generated that will be added to the array
 */
function addNotPresentItems(array, min, maxValueInclusive) {
    let Position = getRandomIntInclusive(min, maxValueInclusive);

    if(array.includes(Position) === true) {
        addNotPresentItems(array, min, maxValueInclusive);
    }
    else {
        array.push(Position);
    }
}

/**
 * Generate an array of 16 bombs Positions
 * @param {number} maxGridValue Max index value of the grid 
 * @returns {number[]} Number Array of bombs positions
 */
function generateBombsPositionArray(maxGridValue) {
    const bombsPositionArray = [];

    for(let i = 0; i <= 16; i++) {
        addNotPresentItems(bombsPositionArray, 1, maxGridValue);
    }

    return bombsPositionArray;
}

/**
 * Add the bombs in the relative positions 
 * @param {HTMLElement[]} grid 
 * @param {number[]} bombsPositions 
 */
function addBombsToGrid(grid, bombsPositions) {
    for(let i = 0; i < bombsPositions.length; i++) {
        const gridCell = grid[(bombsPositions[i] - 1)];

        gridCell.dataset.Bomb = "1";
    }
}