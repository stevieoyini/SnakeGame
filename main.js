
//target Canvas

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
//Variable
//speed in x
vx = 10;

//speed in y 
vy = 0;

//AppleX
let appleX = 0;

//AppleY
let appleY = 0;


//bug
let BugDirection = false;

/*we draw the snake*/
let snake = [ {x:140, y:150}, {x:130, y:150}, {x:120, y:150}, {x:110, y:150} ]

function animation(){
    setTimeout(function(){
        BugDirection = false;

        CleanCanvas();

        DrawApple();

        MoveTheSnakeForward();
        
        if(EndGame()){
            restart();
           return;
        }

        DrawTheSnake();

        //Recursion
        animation();

    }, 100);

}
animation();
ToCreateApple();

function CleanCanvas(){
    //we draw the square

ctx.fillStyle = "blue";
ctx.strokeStyle = "black";
ctx.fillRect(0,0,canvas.width, canvas.height);

//outline
ctx.strokeRect(0,0,canvas.width, canvas.height);

}


function DrawThePieces(pieces) {

    ctx.fillStyle = "yellow";
    ctx.strokeStyle = 'black';
    ctx.fillRect(pieces.x, pieces.y, 10, 10);
    ctx.strokeRect(pieces.x, pieces.y, 10, 10);
}

function DrawTheSnake(){
    snake.forEach(pieces => {
        DrawThePieces(pieces);
    })
}




function MoveTheSnakeForward(){
    const head = {x: snake[0].x + vx, y: snake[0].y + vy};
    //Add an element at the beginning of the table in javascript we use the method .unshift
    snake.unshift(head);

    const SnakeEatApple = snake[0].x === appleX && snake[0].y === appleY;

    // Remove the last element of an array we use the method .pop.

    if(SnakeEatApple) {
        ToCreateApple();
    } else {
        snake.pop();
    }

}

DrawTheSnake();

document.addEventListener('keydown', ToChangeDirection);

function ToChangeDirection(event) {
  // console.log(event);
    

 // AvoidTheBug

 if(BugDirection) return;
 BugDirection = true;
   
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_TOP = 38;
const ARROW_DOWN = 40;

const direction = event.keyCode;

const top = vy === -10;
const down = vy === 10;
const right = vx === 10;
const left = vx === -10;

if(direction === ARROW_LEFT && !right) { vx = -10; vy = 0; }
if(direction === ARROW_TOP && !down) { vx = 0; vy = -10; }
if(direction === ARROW_RIGHT && !left) { vx = 10; vy = 0; }
if(direction === ARROW_DOWN && !top) { vx = 0; vy = 10; }

}

function random(){

    return Math.round((Math.random() * 390) / 10) * 10;
}


function ToCreateApple(){

    appleX = random();
    appleY = random();
    //console.log(appleX,appleY);
    
    snake.forEach(function(part){

        const SnakeOnApple = part.x == appleX && part.y == appleY;

        if(SnakeOnApple){
            ToCreateApple();
        }
    })
}

function DrawApple(){

    ctx.fillStyle = 'red';
    ctx.strokeStyle = "darkred";
    ctx.beginPath();
    ctx.arc(appleX + 5, appleY  + 5, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
}

function EndGame(){

    let SnakeHeadless = snake.slice(1,-1);
    let bitten = false;
    SnakeHeadless.forEach(pieces =>{
        if(pieces.x === snake[0].x && pieces.y === snake[0].y){
            bitten = true;
        }
    })

    const LeftWallKey = snake[0].x < -1;
    const RightWallKey = snake[0].x > canvas.width - 10;
    const TopWallKey= snake[0].y < 1;
    const BottomtWallKey = snake[0].y > canvas.height -10;
    
    let gameOver = false;
    
    if(bitten || LeftWallKey || RightWallKey || TopWallKey || BottomtWallKey) {
        gameOver = true;
    };

    return gameOver;
}


function restart() {
    const restart = document.getElementById('restart');
    restart.style.display = "block";

    document.addEventListener('keydown',(e) => {
        if(e.keyCode === 32) {
            document.location.reload(true);
        }
    })
} 