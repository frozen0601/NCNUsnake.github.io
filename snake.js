/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.jpg";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
};

// create the score var
let score = 0;

//control the snake & food
let d;
let fd;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 65 && d != "RIGHT"){         //key 65 = a
        left.play();
        d = "LEFT";
    }else if(key == 87 && d != "DOWN"){     //key 87 = w
        d = "UP";
        up.play();
    }else if(key == 68 && d != "LEFT"){     //key 68 = d
        d = "RIGHT";
        right.play();
    }else if(key == 83 && d != "UP"){       //key 83 = s
        d = "DOWN";
        down.play();
    } else if ( key == 81 && d != "RD") d = "LU";
    else if (key == 69 && d != "LD") d = "RU";
    else if (key == 90 && d != "RU") d = "LD";
    else if (key == 67 && d != "LU") d = "RD";

    //food
    else if ( key == 37 && fd != "fRIGHT") {
        left.play();
        fd = "fLEFT";
    } else if (key == 38 && fd != "fDOWN") {
        fd = "fUP";
        up.play();
    } else if (key == 39 && fd != "fLEFT" ) {
        fd = "fRIGHT";
        right.play();
    } else if (key == 40 && fd != "fUP") {
        fd = "fDOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){
    
    ctx.drawImage(ground,0,0);
    
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction(snake)
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    if(d == "LU"){
        snakeX -= box;
        snakeY -= box;
    }
    if(d == "RU"){
        snakeX += box;
        snakeY -= box;
    }
    if(d == "LD"){
        snakeX -= box;
        snakeY += box;
    }
    if(d == "RD"){
        snakeX += box;
        snakeY += box;
    }
    //which direction(food)
    if( fd == "fLEFT" && food.x > 0) food.x -= box;
    if( fd == "fUP" && food.y < 16*box) food.y -= box;
    if( fd == "fRIGHT" && food.x < 16*box) food.x += box;
    if( fd == "fDOWN" && food.y < 0) food.y += box;
    

    // if the snake eats the food
    if(snakeX == food.X && snakeY == food.Y){
        score--;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
}

// call draw function every 100 ms

let game = setInterval(draw,100);


















