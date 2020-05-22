'use strict'
const MINE = '💣'
const FLAG = '🚩'
const SMILE = '😄'
const SMILE_BOMBED = '🤯'
const SMILE_WIN = '😎'
var LIVES = ' '
var gElSmileBtn = document.querySelector('.emoji')
var gameStartedInterval
var gBoard = []
var isManual = false
var gElLive = document.querySelector('.life')
var gElGameOver = document.querySelector('.game-over')
var gElWinner = document.querySelector('.winner')
var gSafeClicks = 0

// This is an object by which the board size is set
var gLevel = {

    SIZE: 4,
    MINES: 2

}

var gGame = {
    // Boolean, when true we let the user play
    isOn: false,
    // How many cells are shown
    shownCount: 0,
    // How many cells are marked (with a flag)
    markedCount: 0,
    //  How many seconds passed
    secsPassed: 0,
    // how many lives? 
    lives: 3,
    // mines allready placed
    minesPlaced: 0
}

function init() {

    gBoard = []

    gSafeClicks = 0

    gElLive.innerText = '❤️❤️❤️'

    gElGameOver.style.visibility = 'hidden'

    gElWinner.style.visibility = 'hidden'

    gElSmileBtn.innerText = SMILE

    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        lives: 3,
        minesPlaced: 0
    }

    clearInterval(gameStartedInterval)
    var elTimer = document.querySelector('.timer')
    elTimer.innerText = 'Time : ' + 0
    buildBoard(gBoard)
    renderBoard(gBoard)
    console.log(gBoard)
}

// updating the board by difficuly
function setMode(elBtn) {
    var currMode = elBtn.className;
    isManual = false
    switch (currMode) {
        case 'easy':
            gLevel = { SIZE: 4, MINES: 2 }
            init()
            break;
        case 'med':
            gLevel = { SIZE: 8, MINES: 12 }
            init()
            break;
        case 'hard':
            gLevel = { SIZE: 12, MINES: 30 }
            init()
    }
}

// Builds the board Set mines at random locations
function buildBoard(board) {

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {

            board[i][j] = {

                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
        }
    }

    return board
}

// placing the mines
function placeMinesRnd(firstClickI, firstClickJ) {
    while (gGame.minesPlaced < gLevel.MINES) {
        var rndIdxRow = getRandomIntInclusive(0, gLevel.SIZE - 1)
        var colIdxRnd = getRandomIntInclusive(0, gLevel.SIZE - 1)
        if (gBoard[rndIdxRow][colIdxRnd].isMine) continue
        if (gBoard[firstClickI][firstClickJ] === gBoard[rndIdxRow][colIdxRnd]) continue
        gBoard[rndIdxRow][colIdxRnd].isMine = true
        gGame.minesPlaced++
        gBoard[rndIdxRow][colIdxRnd].minesAroundCount = null
    }
}

// active manula mode - user place the mines
function changeToManual() {
    isManual = true
    init()
}

//  Render the board as a <table> to the page
function renderBoard(gBoard) {
    var strHtml = '';
    for (var i = 0; i < gBoard.length; i++) {
        var row = gBoard[i];
        strHtml += '<tr>';
        for (var j = 0; j < gBoard.length; j++) {
            var cell = row[j];
            // figure class name
            var className = 'hidden'
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td id="${tdId}" class="${className}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j})">
                        </td>`
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('.game-board');
    elBoard.innerHTML = strHtml;
}

// updating minds count after first click

function updateMinesCount() {

    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            var mines = setMinesNegsCount(gBoard, i, j)
            if (gBoard[i][j].minesAroundCount === null) continue
            gBoard[i][j].minesAroundCount = mines
        }
    }
}

// Count mines around each cell and set the cell's minesAroundCount
function setMinesNegsCount(gBoard, cellI, cellJ) {

    var minesCount = 0

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            if (i === cellI && j === cellJ) continue;
            if (gBoard[i][j].isMine === true) minesCount++
        }
    }
    return minesCount
}

// Called when a cell (td) is clicked
function cellClicked(elCell, i, j) {

    // placing mines randomly if manual mode is off
    if (!gGame.minesPlaced && !isManual) {
        placeMinesRnd(i, j)
        updateMinesCount()
    }

    var cellContent = (gBoard[i][j].isMine) ? MINE : gBoard[i][j].minesAroundCount

    // flipping cells by there content - continue accordingly
    if (elCell.classList.contains('hidden') && (!gBoard[i][j].isMarked) && gGame.minesPlaced === gLevel.MINES) {

        // MINE
        if ((cellContent === MINE)) {
            gGame.lives--
            console.log(gGame.lives, 'more lives has left')
            gElSmileBtn.innerText = SMILE_BOMBED
            LIVES = ' '
            for (var i = 0; i < gGame.lives; i++) {
                LIVES += '❤️'
            }
            gElLive.innerText = LIVES
            if (!gGame.lives) {
                flipCell(elCell, i, j)
                elCell.classList.add('bombed')
                gameOver()
            } else {
                setTimeout(() => {
                    gElSmileBtn.innerText = SMILE
                }, 1000);
            }

            // EMPTY - 0
        } else if (!cellContent) {
            expandShown(i, j)
            flipCell(elCell, i, j)

            //  NEGS NUMBER
        } else { flipCell(elCell, i, j) }
        if (checkWinner()) gElSmileBtn.innerText = SMILE_WIN
    }

    // placing mines manualy if needed
    if ((gGame.minesPlaced < gLevel.MINES) && isManual && !gBoard[i][j].isMine) {
        gBoard[i][j].isMine = true
        gGame.minesPlaced++
        if (gGame.minesPlaced === gLevel.MINES) { gameStarted() }
        updateMinesCount()
    } else if (gBoard[i][j].isMine && !gGame.isOn) {
        console.log('already placed a mine here')
    }

    // updating game started and time is taken for timer
    if (!gGame.isOn && !isManual) gameStarted()
}


// "flipping cells" = changing classes and rendering content 
function flipCell(elCell, cellI, cellJ) {

    if ((gBoard[cellI][cellJ].isMarked) || (elCell.classList.contains('flipped'))) return
    elCell.classList.remove('hidden')
    elCell.classList.add('flipped')
    elCell.innerText = (!gBoard[cellI][cellJ].isMine) ? gBoard[cellI][cellJ].minesAroundCount : MINE
    // model
    gBoard[cellI][cellJ].isShown = true
    gGame.shownCount++
}

// searching for empty cells around clicked cell
function expandShown(cellI, cellJ) {

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gBoard.length) continue;
            if (i === cellI && j === cellJ) continue;

            var elCell = document.querySelector(`#cell-${i}-${j}`)
            if (!gBoard[i][j].minesAroundCount) {
                if (gBoard[i][j].minesAroundCount === null) continue

                if (elCell.classList.contains('hidden')) {
                    flipCell(elCell, i, j)
                    expandShown(i, j)
                }
            } else if (gBoard[i][j].minesAroundCount > 0) {

                if (elCell.classList.contains('hidden')) {
                    flipCell(elCell, i, j)
                }
            }

        }
    }
}

// Called on right click to mark a cell (suspected to be a mine)
// how to hide the context menu on right click?

function cellMarked(elCell, cellI, cellJ) {
    window.oncontextmenu = (e) => { e.preventDefault() }
    // updating game started and time is taken
    if (!gGame.isOn) gameStarted()
    if (gBoard[cellI][cellJ].isShown) return
    if (gBoard[cellI][cellJ].isMarked) {
        gBoard[cellI][cellJ].isMarked = false
        elCell.innerText = ' '
        gGame.markedCount--
    }
    else {
        gBoard[cellI][cellJ].isMarked = true
        elCell.innerText = FLAG
        gGame.markedCount++

        if (checkWinner()) gElSmileBtn.innerText = SMILE_WIN
    }
}


// bolding safe cells when user click the safeclick button
function safeClick() {

    if (gSafeClicks >= 3) return

    for (var i = 0; i < gBoard.length; i++) {
        var rndRowIdx = getRandomIntInclusive(0, gBoard.length - 1)
        var rndColIdx = getRandomIntInclusive(0, gBoard.length - 1)
        var elCell = document.querySelector(`#cell-${rndRowIdx}-${rndColIdx}`)
        console.log(elCell)
        if (!gBoard[rndRowIdx][rndColIdx].isMine) {
            elCell.classList.add('outline')
            gSafeClicks++
            setTimeout (() => {
                elCell.classList.remove('outline')
            },2000)
            return
        }
    }
}

// updating game is on + starting timer
function gameStarted() {

    if (!gGame.isOn) {
        gGame.isOn = true
        gGame.secsPassed = Date.now()
    }

    gameStartedInterval = setInterval(() => {

        var timer = Math.floor((Date.now() - gGame.secsPassed) / 1000)
        var elTimer = document.querySelector('.timer')
        elTimer.innerText = 'Time : ' + timer
    }, 1000)
}

// Game ends when all mines are marked, and all the other cells are shown
function checkWinner() {

    var detectedMines = 0
    var otherCells = (gLevel.SIZE ** 2) - gLevel.MINES

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine && gBoard[i][j].isMarked) detectedMines++
            if ((gGame.shownCount === otherCells) && (detectedMines === gLevel.MINES)) {
                clearInterval(gameStartedInterval)
                gElWinner.style.visibility = 'visible'
                return true
            }
        }
    }
    return false
}

// render you loose and stops interval
function gameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine) {
                var elCell = document.querySelector(`#cell-${i}-${j}`)
                elCell.innerHTML = MINE
                elCell.classList.remove('hidden')
                elCell.classList.add('flipped')
            }
        }
    }
    gElGameOver.style.visibility = 'visible'
    clearInterval(gameStartedInterval)
}

// help functions

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}




