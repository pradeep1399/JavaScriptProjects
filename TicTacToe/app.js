let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let startGameBtn = document.querySelector("#startGame");
let scoreBoard = document.querySelector(".scoreboard");
let player1Name = "";
let player2Name = "";
let player1Wins = 0;
let player2Wins = 0;

let turnO = true; //playerX, playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


const startGame = () => {
    player1Name = document.getElementById("player1").value;
    player2Name = document.getElementById("player2").value;
    enableBoxes();
    if (player1Name && player2Name) {
        createGameBoard();
        // Store player names in memory
        localStorage.setItem('player1Name', player1Name);
        localStorage.setItem('player2Name', player2Name);
        // Update scoreboard with player names
        document.getElementById("player1-score").innerText = `${player1Name} Wins: ${player1Wins}`;
        document.getElementById("player2-score").innerText = `${player2Name} Wins: ${player2Wins}`;
        startGameBtn.style.display = "none";
    } else {
        alert("Please Enter Playes's Name")
    }
}

const createGameBoard = () => {
    scoreBoard.classList.remove("hide");
}

const resetGame = () => {
    turnO  =true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const reloadGame = () => {
    turnO  =true;
    scoreBoard.classList.add("hide");
    disabledBoxesOnReset();
    startGameBtn.style.display = "";
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
    player1Wins = 0;
    player2Wins = 0;
    msgContainer.classList.add("hide");
}

let count = 0;
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (player1Name && player2Name) {
            if(turnO){   //player)
                box.innerText = "O";
                turnO = false;
                count++;
            } else{   //playerX
                box.innerText = "X";
                turnO = true;
                count++;
            }
            box.disabled = true;
            checkWinner(count);
        } else {
            alert("Plese Enter Playes's Name")
        }
    });
});

const disabledBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const disabledBoxesOnReset = () => {
    for(let box of boxes) {
        box.disabled = true;
        box.innerText = "";
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    count = 0;
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    if(winner === "O"){
        console.log("player1Wins:"+player1Wins);
        player1Wins++;
        console.log("player1Wins:"+player1Wins);
    } else {
        player2Wins++;
    }
    // Update scoreboard with player names
    document.getElementById("player1-score").innerText = `${player1Name} Wins: ${player1Wins}`;
    document.getElementById("player2-score").innerText = `${player2Name} Wins: ${player2Wins}`;
    disabledBoxes();
};

const showDraw = () => {
    msg.innerText = `Game Draw`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    count = 0;
};

const checkWinner = (count) => {
    for(pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return;
            }
        }
    }
    if(count === 9){
        showDraw();
    }
};

startGameBtn.addEventListener("click", startGame);
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", reloadGame);