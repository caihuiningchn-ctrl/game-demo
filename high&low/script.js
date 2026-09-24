
// HTMLの要素を取得する
const startScreen = document.querySelector("#startScreen");
const startButton = document.querySelector("#StartButton");

const gameScreen = document.querySelector("#gameScreen");
const currentCard = document.querySelector("#currentCard");
const newCard = document.querySelector("#newCard");
const Rarrow = document.querySelector("#Rarrow");
const buttons = document.querySelectorAll("button");
const pointText = document.querySelector("#point");
const successNum = document.querySelector("#success");
const Result = document.querySelector("#result");

const endScreen = document.querySelector("#endScreen");
const endText = document.querySelector("#endText");
const endPoint = document.querySelector("#endPoint");
const endSucc = document.querySelector("#endSucc");



// 開始ボタンをクリックしたとき
startButton.addEventListener("click", function () {

    // 開始画面を非表示にする
    startScreen.style.display = "none";
    // ゲーム画面を表示する
    gameScreen.style.display = "";
    let number = getRandomNumber();
    currentCard.textContent = getromaji(number); 
});

function getRandomNumber() {

    let number = Math.floor(Math.random() * 13) + 1;
    return number;
}

function getromaji(num){

    if (num === 1) {
        return "A";
    } else if (num === 11) {
        return "J";
    } else if (num === 12) {
        return "Q";
    } else if (num === 13) {
        return "K";
    } else {
        return num;
    }
}

function toNumber(num){

    if (num === "A") {
        return 1;
    } else if (num === "J") {
        return 11;
    } else if (num === "Q") {
        return 12;
    } else if (num === "K") {
        return 13;
    } else {
        return Number(num);
    }
}

function plusPoint(point){
    if(point === 0){
        point = 1;
        pointText.textContent = point;
    }else{
        point = point*2
        pointText.textContent = point;
    }
    Result.textContent = "成功した！" 

    let succ = Number(successNum.textContent);//成功回数
    succ = succ+1;
    successNum.textContent = succ;
    if(succ === 10){
        endScr(succ);
    }
}

function countPoint(){
    Result.textContent = "失敗した🙀。残念！ポイント獲得なし！"
    pointText.textContent = 0;
    ReStartButton.style.display = "";
    HighButton.style.display = "none"
    LowButton.style.display = "none"
}

ReStartButton.addEventListener("click", function () {
    Rarrow.style.display = "none";
    newCard.style.display = "none";  
    ReStartButton.style.display = "none";
    Result.textContent = ""
    successNum.textContent = 0;
    HighButton.style.display = ""
    LowButton.style.display = ""
    let num = getRandomNumber();
    currentCard.textContent = getromaji(num);
});


function drawAndJudge() {
    // 初期判断
    let number = toNumber(currentCard.textContent);//古いカード番号
    if(newCard.style.display === "none"){
        newCard.style.display = "";    
        Rarrow.style.display = ""; 
    }else{
        number = toNumber(newCard.textContent);
    }

    let newNumber = getRandomNumber(); //新しいカード番号
    console.log(`high ${number} ${newNumber}`);
    while(number === newNumber){
        newNumber = getRandomNumber(); 
    }
    console.log(`high1 ${number} ${newNumber}`);
    currentCard.textContent = getromaji(number);
    newCard.textContent = getromaji(newNumber);

    return [number,newNumber];
}

function endScr(succ){
    let point = Number(pointText.textContent);
    
    // ゲーム画面を非表示にする
    gameScreen.style.display = "none";
    endScreen.style.display = "";

    if(succ === 10){
        endText.textContent = "全問正解おめでとうございます！"
    }
    if(succ > 0){
         endText.textContent = "おめでとうございます！"
    }

    endSucc.textContent = succ;
    endPoint.textContent = point;
}

// ハイボタンをクリックしたとき
HighButton.addEventListener("click", function () {
    let num = drawAndJudge();
    number = num[0];
    newNumber = num[1];
    
    let point = Number(pointText.textContent);
    newNumber > number ? plusPoint(point) : countPoint();
    
});

// ローボタンをクリックしたとき
LowButton.addEventListener("click", function () {
    let num = drawAndJudge();
    number = num[0];
    newNumber = num[1];

    let point = Number(pointText.textContent);
    newNumber < number ? plusPoint(point) : countPoint(point);
});

// 終了ボタンをクリックしたとき
EndButton.addEventListener("click", function () {
    let succ = Number(successNum.textContent);//成功回数
    endScr(succ);
});