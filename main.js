var gBoard;
const MINE = '💣'

// Starting the game!
function init() {
    gBoard = buildBoard(8);
    console.table(gBoard);
    //add mines to the table
    addMines(gBoard)


    updateNumbersToFitMineAround(gBoard)
        //fix to number to fit the mines

    // render the modal
    renderBoard(gBoard)
}


function buildBoard(boardSize) {
    var board = [];

    for (var i = 0; i < boardSize; i++) {
        board[i] = []
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = 2;
        }
    }
    return board
}

function addMines(board) {

    for (var i = 0; i < (board.length * board.length) / 3; i++) {
        board[getRandomIntInclusive(0, board.length - 1)][getRandomIntInclusive(0, board.length - 1)] = MINE;

    }
}

function updateNumbersToFitMineAround(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j] !== MINE) {

                board[i][j] = countingMineAround(board, i, j)
            }
        }

    }
}

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
            if (board[row][cols] === MINE) {
                mineCounter++
            }
        }
    }
    return mineCounter
}

// makes cells Flipp
function FlipCell(board) {
    var elCell = document.querySelector('table');

    for (var i = 0; i < board.length; i++) {

        for (var j = 0; j < board.length; j++) {




        }


    }



}














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