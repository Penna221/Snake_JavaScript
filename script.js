const canvas = document.getElementById("canvas");
const gridWidth = 40;
const gridHeight = 40;
const tileSize = 16;
canvas.width = (tileSize*gridWidth);
canvas.height = (tileSize*gridHeight);
const ctx = canvas.getContext("2d");
let snake;
let apple;
let dir = 0;
let maxScore = 0;
let gameOver = false;
window.onload = function(){
    console.log("Script loaded")
    init();
}
const init = function(){
    console.log("Init");
    gameOver = false;
    dir = 0;
    let snakeStartX = 3;
    let snakeStartY = Math.floor(canvas.height/tileSize/2);
    snake = new Snake([snakeStartX,snakeStartY]);
    snake.eat();
    snake.eat();
    snake.eat();
    let appleStartX = Math.floor(canvas.width/tileSize/2);
    let appleStartY = Math.floor(canvas.height/tileSize/2);
    apple = new Apple([appleStartX,appleStartY])
}
const Snake = function(pos){
    this.pos = pos;
    this.bodyParts = [];

    this.eat = function(){
        const newPart = new BodyPart([this.pos[0],this.pos[1]]);
        this.bodyParts.push(newPart);
    }
    this.move = function(){
        let cX = this.pos[0];
        let cY = this.pos[1];
        switch(dir){
            case 0:
                //Move right
                this.pos[0] = cX +1;
                break;
            case 1:
                //Move left
                this.pos[0] = cX -1;
                break;
            case 2:
                //Move up
                this.pos[1] = cY -1;
                break;
            case 3:
                //Move down    
                this.pos[1] = cY +1;
                break;
            default:
                return;
        }
        //console.log("X: " + this.pos[0] + " Y: " + this.pos[1]);
        this.bodyParts.shift();
        this.eat();
    }
    this.checkCollision = function(){
        let x = this.pos[0];
        let y = this.pos[1];
        if(x < 0 || x > gridWidth || y < 0 || y > gridHeight){
            endGame();
        }
        let appleX = apple.pos[0];
        let appleY = apple.pos[1];
        if(x == appleX && y == appleY){
            this.eat();
            this.eat();
            apple.getEaten();
        }
        for(let i = 0; i < this.bodyParts.length-3; i++){
            let bx = this.bodyParts[i].pos[0];
            let by = this.bodyParts[i].pos[1];
            if(x == bx && y == by){
                endGame();
            }
        }
    }
    this.draw = function(){
        ctx.fillStyle = "black";
        for (let i = 0; i < this.bodyParts.length-1; i++) {
            let bp = this.bodyParts[i];
            let x = bp.pos[0];
            let y = bp.pos[1];
            ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
        }
        ctx.fillStyle = "white";
        let head = this.bodyParts[this.bodyParts.length-1];
        let x = head.pos[0];
        let y = head.pos[1];
        ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
    }
}
function getRandomPos(){
    let x = Math.floor(Math.random()*gridWidth);
    let y = Math.floor(Math.random()*gridHeight);
    return [x,y];
}
const BodyPart = function(pos){
    this.pos = pos;
}

const Apple = function(pos){
    this.pos = pos;
    this.getEaten = function(){
        let newPos = getRandomPos();
        this.pos[0] = newPos[0];
        this.pos[1] = newPos[1];
    }
    this.draw = function(){
        ctx.fillStyle = "red";
        
        let x = this.pos[0];
        let y = this.pos[1];
        ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
    }
}


const gameLoop = function(){
    if(gameOver){
        ctx.font = "48px serif";
        ctx.fillStyle = "blue";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "black";
        ctx.fillText("Game over", 10, 50);
        ctx.font = "20px serif";
        ctx.fillText("Score: " + snake.bodyParts.length, 10, 100);
        ctx.fillText("Highscore: " + maxScore, 10, 150);
        ctx.fillText("Press space to restart", 10, 200);
    }else{
        ctx.fillStyle = "blue";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        snake.move();
        snake.checkCollision();
        snake.draw();
        apple.draw();
    }
}

document.onkeydown = function(event){
    
    if(event.key == " "){
        init();
    }else{
        let key = event.key;
        let toGo = dir;
        switch (key){
            case "ArrowLeft":
                toGo = 1;
                break;
            case "ArrowRight":
                toGo = 0;
                break;
            case "ArrowUp":
                toGo = 2;
                break;
            case "ArrowDown":
                toGo = 3;
                break;
            default:
                console.log(event);
                break;
        }
        checkDirChange(toGo);

    }
}
const checkDirChange = function(attempt){
    switch(dir){
        case 0:
            //Currently going right
            if(attempt==2 || attempt == 3){
                dir = attempt;
            }
            break;
        case 1:
            //Currently going left
            if(attempt==2 || attempt == 3){
                dir = attempt;
            }
            break;
        case 2:
            //Currently going up
            if(attempt==0 || attempt == 1){
                dir = attempt;
            }
            break;
        case 3:
            //Currently going down
            if(attempt==0 || attempt == 1){
                dir = attempt;
            }
            break;
        default:
            break;
    }
}
function endGame(){
    gameOver = true;
    if(snake.bodyParts.length> maxScore){
        maxScore = snake.bodyParts.length;
    }
}
setInterval(gameLoop,1000/15)