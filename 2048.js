var board;
var score = 0;
var end = false;
var moved = false;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            updateTile(tile, 0);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        tile.classList.add("x" + num.toString());
    }
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * 4);
        let c = Math.floor(Math.random() * 4);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, 2);
            found = true;
        }
    }
}

function hasEmptyTile() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

function haveMove() {
    if (hasEmptyTile()) {
        return true;
    }
    let same = false;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4-1; c++) {
            if (board[r][c] == board[r][c+1]) {
                same = true;
            }
        }
    }
    for (let r = 0; r < 4-1; r++) {
        for (let c = 0; c < 4; c++) {
            if (board[r][c] == board[r+1][c]) {
                same = true;
            }
        }
    }
    return same;
}

function gameover() {
    document.getElementById("gameover").innerText = "Game Over";
    end = true;
    document.getElementById("board").style.opacity = 0.3;
}

function slide(row) {
    let originalrow = row;
    row = row.filter(num => num != 0);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = row.filter(num => num != 0);
    while (row.length < 4) {
        row.push(0);
    }
    for (let i = 0; i < 4; i++) {
        if (originalrow[i] != row[i]) {
            moved = true;
        }
    }
    return row;
}

document.addEventListener("keyup", (e) => {
    if (end == true) {
        return;
    }
    if (e.code == "ArrowLeft") {
        moved = false;
        slideLeft();
        if (moved == true) {
            setTwo();
        }
    }
    else if (e.code == "ArrowRight") {
        moved = false;
        slideRight();
        if (moved == true) {
            setTwo();
        }
    }
    else if (e.code == "ArrowUp") {
        moved = false;
        slideUp();
        if (moved == true) {
            setTwo();
        }
    }
    else if (e.code == "ArrowDown") {
        moved = false;
        slideDown();
        if (moved == true) {
            setTwo();
        }
    }
    document.getElementById("score").innerText = score;
    if (!haveMove()) {
        gameover();
    }
})

function slideLeft() {
    for (let r = 0; r < 4; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < 4; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < 4; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for (let c = 0; c < 4; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < 4; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < 4; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < 4; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < 4; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}