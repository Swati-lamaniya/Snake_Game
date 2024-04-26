let inputDir = { x: 0, y: 0 };
let moveSound = new Audio('move.mp3')
let foodSound = new Audio('food.mp3')
let gameOverSound = new Audio('gameover.mp3')
let musicSound = new Audio('music.mp3')
let speed = 9;
let score = 0;
let lastPaintTime = 0;
let snakearr = [
    { x: 13, y: 15 }
]

food = { x: 6, y: 7 };


function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // return false;
    // if u bump into yourself
    for (let index = 1; index < snakearr.length; index++) {
        if (snake[index].x === snake[0].x && snake[index].y === snake[0].y) {
            return true;
        }
    }
      // if u bump into wall
    if (snake[0].x >= 19 || snake[0].x <= 0 ||   snake[0].y >= 19 || snake[0].y <= 0) {
        return true;
    }

}
function gameEngine() {

    if (isCollide(snakearr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over press any key to restart the game...!!!");
        snakearr = [
            { x: 13, y: 15 }
        ];
        musicSound.play();
        score = 0;
    }
    //if you have been eaten the food , increent the score and regenerate the food

    if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
        foodSound.play();
        score +=1;
        // score.innerHTML='Score: '+ score;
        scoreBox.innerHTML = "Score:" + score;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem('hiscore',JSON.stringify(hiscoreval));
            highscoreBox.innerHTML='High Score :0'+ hiscoreval;
        }

        snakearr.unshift({ x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: 2 + Math.round(a + (b - a) * Math.random()), y: 2 + Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake
    for (let i = snakearr.length - 2; i >= 0; i--) {
        // const element=array[i];
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;

    //display the snake and food
    board.innerHTML = "";
    snakearr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // snakeElement.classList.add('snake');
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);
}









//local storage

let hiscore=localStorage.getItem('hiscore');
if (hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem('hiscore',JSON.stringify(hiscoreval))
}
else{
    hiscoreval=JSON.parse(hiscore);
    highscoreBox.innerHTML='High Score :'+ hiscore;
    
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;


        default:
            break;
    }
});