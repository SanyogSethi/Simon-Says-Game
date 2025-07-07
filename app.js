let body = document.querySelector("body");

let h2 = document.querySelector("h2");
let started = false;
let gameSeq = [];
let userSeq = [];
let lvl = 0;
let highscore = 0;
document.addEventListener("keydown", ()=> {
    if(!started) {
        started = true;
        h2.innerText = `Level ${lvl}`;
        lvlUp();
    }
})

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 100);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 100);
}

function checkSeq() {
    if(gameSeq[userSeq.length-1] === userSeq[userSeq.length-1]) {
        if(gameSeq.length == userSeq.length) {
            setTimeout(()=> {
                lvlUp();
            }, 500);
        }
    }
    else {
        gameover();
    }
}

function gameover() {
    highscore = Math.max(highscore, lvl);
    h2.innerHTML = `Game OVER!<br>Your Score: ${lvl}<br>High Score: ${highscore}<br>Press any key to continue`;
    body.classList.add("gameover");
    setTimeout(() => {
        body.classList.remove("gameover");
    }, 100);
    reset();
}

let map = ["red", "yellow", "green", "purple"];
function lvlUp() {
    lvl++;
    h2.innerText = `Level ${lvl}`;

    let randIdx = Math.floor(Math.random() * 4);
    let sel = document.querySelector(`.${map[randIdx]}`);
    setTimeout(() => btnFlash(sel), 100);
    gameSeq.push(map[randIdx]);

    let btns = document.querySelectorAll(".btn");
    userSeq = [];
    for(btnn of btns) {
        btnn.addEventListener("click", btnclick);
    }
}

function btnclick() {
    userFlash(this);
    let btnId = this.getAttribute("id");
    userSeq.push(btnId);
    checkSeq();
}

function reset() {
    gameSeq = [];
    userSeq = [];
    lvl = 0;
    started = false;
    let btns = document.querySelectorAll(".btn");
    for(btnn of btns) {
        btnn.removeEventListener("click", btnclick);
    }
}

