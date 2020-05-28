
class Snake{
  constructor(x, y, size){
    this.x = x;
    this.y = y;
    this.tail = [];
    this.size = size;
    this.rotateX = 0;
    this.rotateY = 1;
  }

  init(){
    var coordinates = {x:this.x,y:this.y};
    this.tail.push(coordinates);
  }

  move(){
    if(this.rotateX == 1) {
      var newRect = {
        x:this.tail[this.tail.length-1].x + 20,
        y:this.tail[this.tail.length-1].y
      };
    } 
    else if( this.rotateX == -1) {
      var newRect = {
        x:this.tail[this.tail.length-1].x - 20,
        y:this.tail[this.tail.length-1].y
      } 
    }
    else if( this.rotateY == 1) {
      var newRect = {
        x:this.tail[this.tail.length-1].x,
        y:this.tail[this.tail.length-1].y + 20
      }  
    }
    else if(this.rotateY == -1){
      var newRect = {
        x: this.tail[this.tail.length-1].x,
        y: this.tail[this.tail.length-1].y - 20,
      }
    }
    this.tail.shift();
    this.tail.push(newRect);
  }
}

class Apple {
  constructor(){
    this.x = Math.floor(Math.random() * canvas.width / snake.size) * snake.size;
    this.y = Math.floor(Math.random() * canvas.height / snake.size) * snake.size;
    this.color = 'pink';
    this.size = snake.size;
  }
}

var canvas = document.getElementById("canvas");
var snake = new Snake(20, 20, 20);
snake.init();
var apple = new Apple();

var canvasContext = canvas.getContext('2d');


window.onload = function (){
  gameLoop();
}
function gameLoop() {
  setInterval(show, 1000/15);
}

function show(){

  update();
  draw();
}

function update(){
  keyCheck();
  canvasContext.clearRect(0, 0, canvas.width, canvas.heigth);
  snake.move();
  eatApple();
}

function draw(){
  canvasContext.fillStyle = 'black';
  createRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < snake.tail.length; i++) {
    createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size -5, 'white');
  }
  canvasContext.font = "20px Arial";
  canvasContext.fillStyle = '#00FF42';
  canvasContext.fillText("Score: " + (snake.tail.length - 1), canvas.width - 120, 18);
  createRect(apple.x, apple.y, apple.size, apple.size, apple.color);
}

function createRect(x, y, width, height, color){
  canvasContext.fillStyle = color;
  canvasContext.fillRect(x, y , width, height);
}

function createEmptyRect(x, y, width, height, color) {
  canvasContext.beginPath();
  canvasContext.lineWidth = "1";
  canvasContext.strokeStyle = color;
  canvasContext.rect(x, y, width, height);
  canvasContext.stroke();
}

function keyCheck() {
  window.addEventListener("keydown", event => {
    setTimeout(function(){
      if(event.keyCode == 37 && snake.rotateX != 1) {
        snake.rotateX = -1;
        snake.rotateY = 0;
      }
      else if (event.keyCode == 38 && snake.rotateY != 1){
        snake.rotateX = 0;
        snake.rotateY = -1;
      }
      else if (event.keyCode == 39 && snake.rotateX != -1) {
        snake.rotateX = 1;
        snake.rotateY = 0;
      }
      else if (event.keyCode == 40 && snake.rotateY != -1) {
        snake.rotateX = 0;
        snake.rotateY = 1;
      }
    }, 1);
   })
}

function eatApple() {
  if(snake.tail[snake.tail.length - 1].x == apple.x && snake.tail[snake.tail.length-1].y == apple.y) {
    snake.tail[snake.tail.length] = {x: apple.x, y: apple.y};
    console.log("yedi");
    apple = new Apple();
  }
}
