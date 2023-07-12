"use strict";
/**
 * @type {Element}
 */
const newGameBtn = document.querySelector("#newGame_btn");
const modeSelect = document.querySelector("#modeSelect");
const gridContainer = document.querySelector(".square_container");

newGameBtn.addEventListener("click", startNewGame);


function startNewGame() {
    let grid = [];

    switch (parseInt(modeSelect.value)) {
        //facile
        case 1:
            grid = createGrid(100);
            printGrid(grid, gridContainer);
            break;

        //medio
        case 2:
            grid = createGrid(81);
            printGrid(grid, gridContainer);
            break;
            
        
        //difficile
        case 3:
            grid = createGrid(49);
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
    cell.textContent = cellContent;
    cell.style.flexBasis = `calc(100% / ${cellPerRow})`

    return cell;
}

function printGrid(gridtoPrint, htmlContainer) {
    htmlContainer.innerHTML = "";

    for(let i = 0; i < gridtoPrint.length; i++) {       
        htmlContainer.append(gridtoPrint[i]);
    }
}