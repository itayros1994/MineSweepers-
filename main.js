// itay rosental




var gBoard;
const MINE = '💣'
const FLAG = '⛳'
var gBoardSize = 4
var gameIsOn = false




// Starting the game!
function init() {
    gBoard = buildBoard(gBoardSize);
    console.table(gBoard);
    //add mines to the table
    addMines(gBoard)

    updateNumbersToFitMineAround(gBoard)
        //fix to number to fit the mines

    // render the modal
    renderBoard(gBoard)
    gameIsOn = true;
}



// Building Game board
function buildBoard(boardSize) {
    var board = [];
    for (var i = 0; i < boardSize; i++) {
        board[i] = []
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = { value: 0, isShown: false, isFlag: false };
        }
    }
    return board
}



// adding Random Mines
function addMines(board) {
    for (var i = 0; i < (board.length * board.length) / 3; i++) {
        board[getRandomIntInclusive(0, board.length - 1)][getRandomIntInclusive(0, board.length - 1)].value = MINE

    }
}




//  משנה את המספרים לפי כמות המוקשים בהם נוגעים
function updateNumbersToFitMineAround(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j].value !== MINE) {

                board[i][j].value = countingMineAround(board, i, j)
            }
        }

    }
}




// Counting neighbors
function countingMineAround(board, i, j) {
    var mineCounter = 0;
    for (var row = i - 1; row <= i + 1; row++) {

        for (var cols = j - 1; cols <= j + 1; cols++) {
            if (cols === j && row === i) {
                continue;
            }
            if (row < 0 || cols < 0 || row >= board.length || cols >= board.length) {
                continue;
            }
            if (board[row][cols].value === MINE) {
                mineCounter++
            }
        }
    }
    return mineCounter
}









var mineCount = 0

function cellClicked(elCell, event) {
    var elHeart = document.getElementsByClassName('.hearts')
    var elHeart1 = document.getElementsByClassName('.hearts1')
    var elHeart2 = document.getElementsByClassName('.hearts2')
    console.log(mineCount)
    var cellLocation = getCellCoord(elCell.id);
    gBoard[cellLocation.i][cellLocation.j].isShown = true
    console.log(event)

    if (event.which === 3) {

        gBoard[cellLocation.i][cellLocation.j].isFlag = true;

    }
    console.log(gBoard[cellLocation.i][cellLocation.j])
    if (gBoard[cellLocation.i][cellLocation.j].value === MINE && event.which === 1) {
        gBoard[cellLocation.i][cellLocation.j].isShown = false
        mineCount++
        elHeart.style.dis

        if (mineCount === 3) {
            gameOver()

        }
    }
    // renderCell(cellLocation, gBoard[cellLocation.i][cellLocation.j].value)
    renderBoard(gBoard)
}




// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}





function changeLevel(boardSize) {
    gBoardSize = boardSize
    init()
}







function gameOver() {
    // reval all the mines

    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].value === MINE)
                gBoard[i][j].isShown = true

        }

    }
    renderBoard(gBoard)
        // game over Alert
    alert('Game Over!')
    mineCount = 0

}

























// function makeTimer() {
//     inter = setInterval(increaseTime, 100)
// }


// function increaseTime() {
//     var elTimer = document.querySelector('h2 span');
//     timer += 0.1
//     elTimer.innerText = timer;
// }




// // Count mines around each cell and set the cell's minesAroundCount.
// function setMinesNegsCount(board) {


// }

// //renderBoard(board)

// // Called when a cell (td) is clicked
// function cellClicked(elCell, i, j)


// // Called on right click to mark a cell (suspected to be a mine) Search the web (and implement) how to hide the context menu on right click
// function cellMarked(elcell)


// //check if the game is over - game end When all mines are marked, and all the other cell are shown
// function checkGameOVer()



// function expandShown(board, elCell, i, j)