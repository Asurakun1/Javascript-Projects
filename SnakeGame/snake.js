
//board
var blockSize = 25;
var rows = 20, cols = 20;
var board, context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0, velocityY = 0;

var snakeBody = [];
//food
var foodX, foodY;

var gameOver = false;

window.onload = function (){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/10);
}


function update(){
    if(gameOver){
        return;
    }

    context.fillStyle="black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX,foodY]);
        placeFood();
    }

    for(let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    context.fillStyle="lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);

    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1], blockSize, blockSize);
    }

    if(snakeX < 0 || snakeX > cols * blockSize ||
        snakeY < 0 || snakeY > rows * blockSize){
            gameOver = true;
            alert('Game Over!');
    }

    //game over conditions

    for(let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert('Game Over!');
        }
    }

}

function changeDirection(event){
    if(event.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(event.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(event.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(event.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }

}

function placeFood(){
    foodX = Math.floor(Math.random() * rows) * blockSize;
    foodY = Math.floor(Math.random() * cols) * blockSize;
}