"use strict";

//target Canvas

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext('2d');

//we draw the square

ctx.fillStyle = "white";
ctx.strokeStyle = "black";
ctx.fillRect(0,0,canvas.width,canvas.height);

//outline
ctx.strokeRect(0,0,canvas.width,canvas.height);


/*we draw the snake*/
let snake = [ {x:140, y:150}, {x:130, y:150}, {x:120, y:150}, {x:110, y:150} ]


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

DrawTheSnake();