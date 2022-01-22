
//target Canvas

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d');
//Variable
//speed in x
vx = 10;

//speed in y 
vy = 0;


/*we draw the snake*/
let snake = [ {x:140, y:150}, {x:130, y:150}, {x:120, y:150}, {x:110, y:150} ]

function animation(){
    setTimeout(function(){

        CleanCanvas();

        MoveTheSnakeForward();

        DrawTheSnake();

        //Recursion
        animation();

    }, 100);

}
animation();

function CleanCanvas(){
    //we draw the square

ctx.fillStyle = "white";
ctx.strokeStyle = "black";
ctx.fillRect(0,0,canvas.width,canvas.height);

//outline
ctx.strokeRect(0,0,canvas.width,canvas.height);

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
    // Remove the last element of an array we use the method .pop.
    snake.pop();

}

DrawTheSnake();

document.addEventListener('keydown', ToChangeDirection);

function ToChangeDirection(event) {
  // console.log(event);
    
   
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

