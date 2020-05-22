// Building The Board Size 


function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // figure class name

            var tdId = `cell-${i}-${j}`;
            var cellValue = ""
            if (cell.isFlag) {
                cellValue = FLAG
            } else
            if (cell.isShown) {
                cellValue = cell.value

            }


            strHtml += `<td id="${tdId}" class="${tdId}" onmousedown="cellClicked(this,event)" oncontextmenu="return false">
                            ${cellValue}
                        </td>`
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}



function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}