// itay rosental



var gBoard;
const MINE = '💣'
const FLAG = '⛳'
var gBoardSize = 4
var gameIsOn = false
var elHappy = document.querySelector('.happy')
var gameStarted = false;
var Time = 0;


// Starting the game!
function init() {
    gBoard = buildBoard(gBoardSize);
    console.table(gBoard);
    //add mines to the table
    addMines(gBoard)
    updateNumbersToFitMineAround(gBoard)
        //fix to number to fit the mine
        // render the modal
    renderBoard(gBoard)
    elGameOver.style.visibility = 'hidden'
        // Put the hearts life 
    elHeart.style.visibility = 'visible';
    elHeart1.style.visibility = 'visible';
    elHeart2.style.visibility = 'visible';
    mineCount = 0;
    counterNumsValue = 0;
    elWin.style.visibility = ('hidden')
    numsOfClicks = 0;
    document.querySelector('h2 span').innerHTML = Time;
    Time = 0
    elHappy.innerText = '😀'
    gameStarted = false
    clearInterval(myIntreval);
    myIntreval = setInterval(MakingTimer, 1000)

}

function MakingTimer() {
    document.querySelector('h2 span').innerHTML = Time;
    if (gameStarted === true) {
        Time++
    }
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

// Getting Hearts / Smiley Elements From The HTML

var mineCount = 0
var elHeart = document.querySelector('.hearts')
var elHeart1 = document.querySelector('.hearts1')
var elHeart2 = document.querySelector('.hearts2')
elHeart.style.visibility = 'visible';
elHeart1.style.visibility = 'visible';
elHeart2.style.visibility = 'visible';

var counterNumsValue = 0;
// Clicking Events...

var myIntreval;
var numsOfClicks = 0;
console.log(numsOfClicks)

function cellClicked(elCell, event) {
    gameStarted = true


    console.log(mineCount)
    var cellLocation = getCellCoord(elCell.id);
    if (gBoard[cellLocation.i][cellLocation.j].value !== MINE && event.which === 1 && gBoard[cellLocation.i][cellLocation.j].isShown === false) {
        counterNumsValue++
    }

    gBoard[cellLocation.i][cellLocation.j].isShown = true
    console.log(event)

    if (event.which === 3) {
        gBoard[cellLocation.i][cellLocation.j].isFlag = true;

    }
    console.log(gBoard[cellLocation.i][cellLocation.j])
    if (gBoard[cellLocation.i][cellLocation.j].value === MINE && event.which === 1) {
        gBoard[cellLocation.i][cellLocation.j].isShown = false
        mineCount++
        if (mineCount === 1) {
            elHeart.style.visibility = 'hidden';
            elHeart1.style.visibility = 'visible';
            elHeart2.style.visibility = 'visible';
            elHappy.innerText = '😬'
        }
        if (mineCount === 2) {
            elHeart.style.visibility = 'hidden';
            elHeart1.style.visibility = 'hidden';
            elHeart2.style.visibility = 'visible';
            elHappy.innerText = '😬'
        }
        if (mineCount === 3) {
            elHeart.style.visibility = 'hidden';
            elHeart1.style.visibility = 'hidden';
            elHeart2.style.visibility = 'hidden';
            elHappy.innerText = '😭'
            gameOver();

        }
    }
    // חושף את כל ה0
    if (gBoard[cellLocation.i][cellLocation.j].value === 0) {
        for (var row = cellLocation.i - 1; row <= cellLocation.i + 1; row++) {
            for (var cols = cellLocation.j - 1; cols <= cellLocation.j + 1; cols++) {

                if (cols === cellLocation.j && row === cellLocation.i) {
                    continue;
                }
                if (row < 0 || cols < 0 || row >= gBoard.length || cols >= gBoard.length) {
                    continue;
                }
                gBoard[row][cols].isShown = true;
                counterNumsValue++
            }
        }
    }
    winGame()
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
// win game when all the numbers reveald
var elWin = document.querySelector('.win')

function winGame() {
    var isNumber = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].value !== MINE) {
                isNumber++
            }
        }
    }
    console.log(isNumber, counterNumsValue)

    if (isNumber === counterNumsValue) {
        elWin.style.visibility = ('visible')
        clearInterval(myIntreval);
    }
}

var elGameOver = document.querySelector('.gameOVer');
var elStartAgain = document.querySelector('.StartAgain')

// Doin Game Timer
function gameOver() {
    // reval all the mines
    clearInterval(myIntreval);
    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].value === MINE)
                gBoard[i][j].isShown = true
        }
    }
    renderBoard(gBoard)
        // game over Alert
    elGameOver.style.visibility = 'visible'
    elStartAgain.style.visibility = 'visible'
    counterNumsValue = 0
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



// function expandShown(board, elCell, i, j