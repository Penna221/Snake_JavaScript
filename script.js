const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let snake;
let dir = 0;
const tileSize = 10;

window.onload = function(){
    console.log("Script loaded")
    init();
}
const init = function(){
    console.log("Init");
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0,canvas.width,canvas.height)
    snake = new Snake([10,4]);
    snake.eat();
    snake.eat();
    snake.eat();
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
                this.pos[0] = cX +tileSize;
                break;
            case 1:
                //Move left
                this.pos[0] = cX -tileSize;
                break;
            case 2:
                //Move up
                this.pos[1] = cY -tileSize;
                break;
            case 3:
                //Move down    
                this.pos[1] = cY +tileSize;
                break;
            default:
                return;
        }
        console.log("X: " + this.pos[0] + " Y: " + this.pos[1]);
        this.eat();
        this.bodyParts.shift();
    }
    this.checkCollision = function(){

    }
    this.draw = function(){
        ctx.fillStyle = "black";
        for (let i = 0; i < this.bodyParts.length; i++) {
            let bp = this.bodyParts[i];
            let x = bp.pos[0];
            let y = bp.pos[1];
            ctx.fillRect(x,y,tileSize,tileSize);
        }
        
    }
}
const BodyPart = function(pos){
    this.pos = pos;
}

const Apple = function(pos){
    this.pos = pos;
    this.getEaten = function(){
        this.pos[0] = Math.floor(Math.random()*20);
        this.pos[1] = Math.floor(Math.random()*20);
    }
}


const gameLoop = function(){
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    snake.move();
    snake.draw();
}
setInterval(gameLoop,1000/1)