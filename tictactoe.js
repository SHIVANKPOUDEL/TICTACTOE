let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#rst-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msgcontainer");
let newmsgcontainer = document.querySelector(".newmsgcontainer");
let msg = document.querySelector("#msg");
const Xscore = document.querySelector("#X-score");
const Oscore = document.querySelector("#O-score");
const dscore = document.querySelector("#DRAW-score");
let newmsg = document.querySelector("#newmsg");
let btn2 = document.querySelector("#btn1");
let body = document.querySelector("body");

let turnO = true;
let scores = { X: 0, O: 0, DRAW: 0 };

const winningpatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const resetgame = () => {
    turnO = true;
    enabledboxes();
    msgcontainer.classList.add("hide");
    newmsgcontainer.classList.add("hide2");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Ensure the box is empty before making a move
            if (turnO) {
                box.innerText = "O";
            } else {
                box.innerText = "X";
            }
            turnO = !turnO;
            box.disabled = true;
            
            checkwinner();
            checkdraw();
        }
    });
});

const disabledboxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const enabledboxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showwinner = (winner) => {
    msg.innerText = `CONGRATULATIONS!, THE WINNER IS ${winner}`;
    msgcontainer.classList.remove("hide");
    disabledboxes();
    if (winner === "X") {
        scores.X++;
        Xscore.innerText = scores.X;
    } else if (winner === "O") {
        scores.O++;
        Oscore.innerText = scores.O;
    }
};

const showdraw = () => {
    newmsg.innerText = `IT'S A DRAW! PLAY AGAIN`;
    newmsgcontainer.classList.remove("hide2");
    disabledboxes();
    scores.DRAW++;
    dscore.innerText = scores.DRAW;
};

const checkwinner = () => {
    for (let pattern of winningpatterns) {
        let [a, b, c] = pattern;
        let pos1val = boxes[a].innerText;
        let pos2val = boxes[b].innerText;
        let pos3val = boxes[c].innerText;
        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            showwinner(pos1val);
            return;
        }
    }
};

const checkdraw = () => {
    let allBoxesFilled = true;
    boxes.forEach(box => {
        if (box.innerText === "") {
            allBoxesFilled = false;
        }
    });
    if (allBoxesFilled) {
        showdraw();
    }
};

newgamebtn.addEventListener("click", resetgame);
reset.addEventListener("click", resetgame);

let currmode = "light";
btn2.addEventListener("click", () => {
    if (currmode === "light") {
        body.classList.remove("light");
        body.classList.add("dark");
        currmode = "dark";
    } else {
        body.classList.remove("dark");
        body.classList.add("light");
        currmode = "light";
    }
    console.log(currmode);
});
