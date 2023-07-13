"use strict";
/**
 * The Button element that starts a new game
 * @type {Element} 
 */
const newGameBtn = document.querySelector("#newGame_btn");

/**
 * The select element of the different game modes difficulties
 * @type {Element} 
 */
const modeSelect = document.querySelector("#modeSelect");

/**
 * The container element of the grid
 * @type {Element} 
 */
const gridContainer = document.querySelector(".square_container");

/**
 * The container element of the score points
 * @type {Element} 
 */
const scoreContainer = document.querySelector("#score");

/**
 * The element of the text that appear when the game is over 
 * @type {Element} 
 */
const gameOverText = document.querySelector("#gameOverText");

/**
 * The number of times left that the cells are clickable   
 * @type {number} 
 */
let cellClickableCounter = 0;

/**
 * The boolean that rapresents if the games is over or not  
 * @type {boolean} 
 */
let isGameOver = false;

/**
 * The array of cells elements that composes the grid  
 * @type {Element[]} 
 */
let grid = [];

/**
 * The array of position where the bombs are in the grid 
 * @type {number[]} 
 */
let bombPositions = [];


//the click event on the start new game button
newGameBtn.addEventListener("click", startNewGame);

/**
 * Function that starts a new game
 */
function startNewGame() {
    resetValues();

    switch (parseInt(modeSelect.value)) {
        //facile
        case 1:
            cellClickableCounter = 100;
            grid = createGrid(100);
            bombPositions = generateBombsPositionArray(100);
            addBombsToGrid(grid, bombPositions);
            printGrid(grid, gridContainer);
            break;

        //medio
        case 2:
            cellClickableCounter = 81;
            grid = createGrid(81);
            bombPositions = generateBombsPositionArray(81);
            addBombsToGrid(grid, bombPositions);
            printGrid(grid, gridContainer);
            break;
            
        
        //difficile
        case 3:
            cellClickableCounter = 49;
            grid = createGrid(49);
            bombPositions = generateBombsPositionArray(49);
            addBombsToGrid(grid, bombPositions);
            printGrid(grid, gridContainer);
            break;
    }
}

/**
 * Create and retrive a new Grid
 * @param {number} cellNumber The Amout of cells that need to be in the grid
 * @returns The array of Cell elements that composes the grid
 */
function createGrid(cellNumber) {
    const newGrid = [];
    const rowCellCount = Math.sqrt(cellNumber);

    for(let i = 0; i < cellNumber; i++) {
        const newCell = createCell((i + 1).toString(), rowCellCount);

        newGrid.push(newCell);
    }

    return newGrid;
}

/**
 * Create and retrive a new cell element
 * @param {string} cellContent The content that need to be inside the cell
 * @param {number} cellPerRow The number of cells per row in the grid
 * @returns The new cell element created
 */
function createCell(cellContent, cellPerRow) {
    const cell = document.createElement("div");

    cell.classList.add("square_box");
    cell.dataset.index = cellContent;
    cell.textContent = cellContent;
    cell.style.flexBasis = `calc(100% / ${cellPerRow})`;

    cell.addEventListener("click", cellClick);

    return cell;
}

/**
 * Print the Grid array into the HTML
 * @param {Element[]} gridtoPrint The grid array to print to the HTML
 * @param {Element} htmlContainer The HTML container where the grid will be printed
 */
function printGrid(gridtoPrint, htmlContainer) {
    htmlContainer.innerHTML = "";

    for(let i = 0; i < gridtoPrint.length; i++) {       
        htmlContainer.append(gridtoPrint[i]);
    }
}


/**
 * The Logic that need to be performed when the cell is clicked
 */
function cellClick() {

    //the cell is clickable if doesnt have a clicked attribiute and the game is still on 
    if(this.dataset.Clicked === undefined && isGameOver == false) {
        this.dataset.Clicked = "1";

        //you clicked on a clean cell
        if(this.dataset.Bomb === undefined){
            //color the cell clicked
            this.classList.add("bg-primary");
            //update the score
            let intScore = parseInt(scoreContainer.textContent);
            intScore += 1;
            scoreContainer.textContent = intScore.toString();
            //diminish the total clickable cells left
            cellClickableCounter -= 1;

            //if there are no more cell clickable left that means you win
            if(cellClickableCounter <= 0) {
                //print the winning message
                gameOverText.textContent = `Complimenti Hai Vinto la Partita!`;
                //update the game over variable to true
                isGameOver = true;
            }
        }
        //you clicked on a bomb
        else {
            //add the red color to the cell
            this.classList.add("bg-danger");

            //activate all bombs
            activateAllBombs(grid, bombPositions);

            //print the game over message
            gameOverText.textContent = `Hai perso! Hai preso una bomba!`;

            //update game over variable to true
            isGameOver = true;
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

function activateAllBombs(grid, bombsPositions) {
    for(let i = 0; i < bombPositions.length; i++) {
        const gridCell = grid[(bombsPositions[i] - 1)];

        if(!gridCell.classList.contains("bg-danger")) {
            gridCell.classList.add("bg-danger");
        }
    }
}

/**
 * Reset the values when a new game is starting
 */
function resetValues() {
    grid = [];
    bombPositions = [];
    scoreContainer.textContent = "0";
    cellClickableCounter = 0;
    gameOverText.textContent = "";
    isGameOver = false;
}