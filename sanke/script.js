const game = document.querySelector(".game");
const head = document.querySelector(".head");
const buttons = document.querySelector(".buttons");
const gameOver = document.querySelector(".gameover");

const startButton = document.querySelector("#startButton");
const stopButton = document.querySelector("#stopButton");
const reStart = document.querySelector("#reStart");
const resultButton = document.querySelector("#resultButton");

const food = document.querySelector(".food");
const bomb = document.querySelector(".bomb");
const timerDisplay = document.querySelector(".timer");
const scoreDisplay = document.querySelector(".score");


let headPosition = {
    x: 12,
    y: 12
};
const cellSize = 20;
head.style.left = headPosition.x * cellSize + "px";
head.style.top = headPosition.y * cellSize + "px";

let gameInterval;
let speed = 500;



const initialPosition = {
    x: 12,
    y: 12
};

// food
let foodInterval;
const foodTime = speed*25;
let foodPosition = {
    x: 0,
    y: 0
};

function createFood() {
    food.style.display = "";

    foodPosition.x = Math.floor(Math.random() * 25);
    foodPosition.y = Math.floor(Math.random() * 25);


    food.style.left = foodPosition.x * cellSize + "px";
    food.style.top = foodPosition.y * cellSize + "px";
}


function startFood() {
    createFood();
    // console.log(foodTime);
    foodInterval = setInterval(createFood, foodTime);

}


function eatFood() {
    let score = parseInt(scoreDisplay.textContent.split(": ")[1]);
    if (foodPosition.x === headPosition.x && foodPosition.y === headPosition.y) {
        
        stopFood();
        startFood();
        createBody();

        score++;
        scoreDisplay.textContent = `スコア: ${score}`;
    }
}

function stopFood() {
    clearInterval(foodInterval);
}

// bomb
let bombInterval;
const bombTime = speed*30;
let bombPosition = {
    x: 0,
    y: 0
};

function createBomb() {
    bomb.style.display = "";

    bombPosition.x = Math.floor(Math.random() * 25);
    bombPosition.y = Math.floor(Math.random() * 25);

    bomb.style.left = bombPosition.x * cellSize + "px";
    bomb.style.top = bombPosition.y * cellSize + "px";
}


function startBomb() {
    console.log(bombTime);
    bombInterval = setInterval(createBomb, bombTime);

}


function touchBomb() {

    if (bombPosition.x === headPosition.x && bombPosition.y === headPosition.y) {
        // console.log("bombPosition: ", bombPosition);
        // console.log("headPosition: ", headPosition);
        showGameOver();
    }
}

function stopBomb() {
    clearInterval(bombInterval);
}

// timer
let time = 0;
let timer;

function startTimer() {
     clearInterval(timer);
    timer = setInterval(() => {
        time++;

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        timerDisplay.textContent =
            `時間: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    time = 0;
    timerDisplay.textContent = "時間: 00:00";
}

function stopTimer() {
    clearInterval(timer);
}


//body
let bodyPosition = [];

function moveBody() {

    const bodies = document.querySelectorAll(".body");

    for (let i = 0; i < bodyPosition.length; i++) {

        bodies[i].style.left =bodyPosition[i].x * cellSize + "px";
        bodies[i].style.top =bodyPosition[i].y * cellSize + "px";
        bodies[i].style.display = "block";
    }
}

function moveBodyPosition(oldHeadPosition) {

    for (let i = bodyPosition.length - 1; i > 0; i--) {

        bodyPosition[i].x = bodyPosition[i - 1].x;
        bodyPosition[i].y = bodyPosition[i - 1].y;
    }

    if (bodyPosition.length > 0) {

        bodyPosition[0].x = oldHeadPosition.x;
        bodyPosition[0].y = oldHeadPosition.y;
    }

    moveBody();
}


function createBody() {

    const newBody = document.createElement("div");
    newBody.classList.add("body");

    document.querySelector(".background").appendChild(newBody);

    bodyPosition.push({
        x: headPosition.x,
        y: headPosition.y
    });

}

function checkSelfCollision() {

    for (let body of bodyPosition) {
        // console.log("body: ", body);
        // console.log("headPosition: ", headPosition);
        if (headPosition.x === body.x && headPosition.y === body.y) {
            showGameOver();
        }
    }

}


// ===== 移動 =====
function moveUp() {

    const oldHeadPosition = {
        x: headPosition.x,
        y: headPosition.y
    };

    headPosition.y -= 1;

    moveBodyPosition(oldHeadPosition);

    move();
}

function moveDown() {

    const oldHeadPosition = {
        x: headPosition.x,
        y: headPosition.y
    };

    headPosition.y += 1;

    moveBodyPosition(oldHeadPosition);

    move();
}

function moveLeft() {

    const oldHeadPosition = {
        x: headPosition.x,
        y: headPosition.y
    };

    headPosition.x -= 1;

    moveBodyPosition(oldHeadPosition);

    move();
}

function moveRight() {

    const oldHeadPosition = {
        x: headPosition.x,
        y: headPosition.y
    };

    headPosition.x += 1;

    moveBodyPosition(oldHeadPosition);

    move();
}


// ===== 境界チェック =====

function checkBoundary() {

    if (headPosition.x < 0) {
        headPosition.x = 0;
        showGameOver();
    }

    if (headPosition.x > 24) {
        headPosition.x = 24;
        showGameOver();
    }

    if (headPosition.y < 0) {
        headPosition.y = 0;
        showGameOver();
    }

    if (headPosition.y > 24) {
        headPosition.y = 24;
        showGameOver();
    }
}


// ===== ゲームオーバー =====

function showGameOver() {
    stopMove();
    stopFood();
    stopBomb();
    stopTimer();
    gameOver.style.display = "block";
    reStart.style.display = "";
    stopButton.style.display = "none";
}


// ===== 画面を更新 =====

function move() {
    checkBoundary();
    checkSelfCollision();
    
    head.style.left = headPosition.x * cellSize + "px";
    head.style.top = headPosition.y * cellSize + "px";

    eatFood();
    touchBomb();

}

// ===== 移動を停止 =====

function stopMove() {
    clearInterval(gameInterval);
    clearTimeout(boostTimer);

}


// ===== リスタート =====

function resetGame() {
    resetTimer();
    stopMove();
    stopFood();
    stopBomb();

    headPosition.x = initialPosition.x;
    headPosition.y = initialPosition.y;

    head.style.left = headPosition.x * cellSize + "px";
    head.style.top = headPosition.y * cellSize + "px";

    gameOver.style.display = "none";

    reStart.style.display = "none";
    stopButton.style.display = "none";
    startButton.style.display = "";
    food.style.display = "none";
    bomb.style.display = "none";
    scoreDisplay.textContent = "スコア: 0";

    bodyPosition = [];

    const bodies = document.querySelectorAll(".body");

    bodies.forEach(function (body) {
        body.remove();
    });
}

reStart.addEventListener("click", function () {
    resetGame();

});


// ===== スタート =====
let currentMove = moveRight;
startButton.addEventListener("click", function () {
    startTimer();
    startFood();
    startBomb();
   
    gameInterval = setInterval(currentMove, speed);

    startButton.style.display = "none";
    stopButton.style.display = "";
    reStart.style.display = "";
    resultButton.style.display = "";
});


// ===== ストップ =====

stopButton.addEventListener("click", function () {
    stopTimer();
    stopMove();
    stopFood();
    stopBomb();
    startButton.style.display = "";
    stopButton.style.display = "none";
});


// ===== キーボード操作 =====
let isBoosting = false;
let boostTimer;
let boostSpeed = 200;
let activeKey = null;

document.addEventListener("keydown", function (event) {
    if (startButton.style.display != "none") {
        return;
    }
    if (gameOver.style.display === "block") {
        return;
    }

    let moveFunction;

    if (event.key === "ArrowUp") {
        moveFunction = moveUp;
    } else if (event.key === "ArrowDown") {
        moveFunction = moveDown;
    } else if (event.key === "ArrowLeft") {
        moveFunction = moveLeft;
    } else if (event.key === "ArrowRight") {
        moveFunction = moveRight;
    } else {
        return;
    }

    // 長押しによるkeydownの繰り返しを防ぐ
    if (event.key === activeKey) {
        return;
    }

    activeKey = event.key;
    currentMove = moveFunction;
    isBoosting = false;

    // 通常の速度で移動する
    stopMove();
    gameInterval = setInterval(currentMove, speed);

    // 500ミリ秒長押しすると加速する
    clearTimeout(boostTimer);
    boostTimer = setTimeout(function () {
        if (activeKey === event.key) {
            isBoosting = true;

            stopMove();
            gameInterval = setInterval(currentMove, boostSpeed);
        }
    }, 500);
});

document.addEventListener("keyup", function (event) {
    if (event.key !== activeKey) {
        return;
    }

    clearTimeout(boostTimer);

    // キーを離すと通常の速度に戻る
    if (isBoosting) {
        isBoosting = false;

        stopMove();
        gameInterval = setInterval(currentMove, speed);
    }

    activeKey = null;
});


// result

const result = document.querySelector(".result");
const resultTime = document.querySelector("#resultTime");
const resultScore = document.querySelector("#resultScore");
const closeResult = document.querySelector("#closeResult");

resultButton.addEventListener("click", function () {
    resultTime.textContent = timerDisplay.textContent;
    resultScore.textContent = scoreDisplay.textContent;

    result.style.display = "flex";
    resetGame();
});

closeResult.addEventListener("click", function () {
    result.style.display = "none";
    resultButton.style.display = "none";
});