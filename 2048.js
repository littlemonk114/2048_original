let board = [];
let score = 0;
let end = false;
let moved = false;
const N = 4;

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
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * N);
        let c = Math.floor(Math.random() * N);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, 2);
            found = true;
        }
    }
}

window.onload = function() {
    for (let r = 0; r < N; r++) {
        let row = [];
        for (let c = 0; c < N; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            updateTile(tile, 0);
            document.getElementById("board").append(tile);
            row.push(0);
        }
        board.push(row);
    }
    setTwo();
    setTwo();
}

function hasEmptyTile() {
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N; c++) {
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
    for (let r = 0; r < N; r++) {
        for (let c = 0; c < N-1; c++) {
            if (board[r][c] == board[r][c+1]) {
                return true;
            }
        }
    }
    for (let r = 0; r < N-1; r++) {
        for (let c = 0; c < N; c++) {
            if (board[r][c] == board[r+1][c]) {
                return true;
            }
        }
    }
    return false;
}

function slide(row) {
    let originalrow = row;
    row = row.filter(num => num != 0);         /* this is a function, num is the parameter, return (num!=0) */
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = row.filter(num => num != 0);
    while (row.length < N) {
        row.push(0);
    }
    for (let i = 0; i < N; i++) {
        if (originalrow[i] != row[i]) {
            moved = true;
        }
    }
    return row;
}

function slideLeft() {
    moved = false;
    for (let r = 0; r < N; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < N; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    if (moved == true) {
        setTwo();
    }
}

function slideRight() {
    moved = false;
    for (let r = 0; r < N; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;
        for (let c = 0; c < N; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    if (moved == true) {
        setTwo();
    }
}

function slideUp() {
    moved = false;
    for (let c = 0; c < N; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < N; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    if (moved == true) {
        setTwo();
    }
}

function slideDown() {
    moved = false;
    for (let c = 0; c < N; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < N; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
    if (moved == true) {
        setTwo();
    }
}

function gameover() {
    end = true;
    document.getElementById("gameover").innerText = "Game Over";
    document.getElementById("board").style.opacity = 0.3;
}

document.addEventListener("keyup", (e) => {
    if (end == true) {
        return;
    }
    if (e.code == "ArrowLeft") {
        slideLeft();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
    }
    document.getElementById("score").innerText = score;
    if (!haveMove()) {
        gameover();
    }
})

document.addEventListener("touchstart", handleTouchStart);        
document.addEventListener("touchend", handleTouchEnd);

let xStart;                                                        
let yStart;                                                   
                                                                         
function handleTouchStart(e) {
    xStart = e.touches[0].clientX;                                     
    yStart = e.touches[0].clientY;                           
};                                                
                                                                         
function handleTouchEnd(e) {
    let xEnd = e.changedTouches[0].clientX;                                    
    let yEnd = e.changedTouches[0].clientY;
    let xChange = xEnd - xStart;
    let yChange = yEnd - yStart;
                                                             
    if (Math.abs(xChange) > Math.abs(yChange)) {
        if (xChange < 0 ) {
            slideLeft();
        } else {
            slideRight();
        }                       
    } 
    else {
        if (yChange > 0) {
            slideDown();
        } else { 
            slideUp();
        }                                                                 
    }
    document.getElementById("score").innerText = score;
    if (!haveMove()) {
        gameover();
    }                                           
};