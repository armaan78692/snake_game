//Game Constants & Variables
let inputDir = {x:0 , y:0};
const foodsound = new Audio('music/eating.mp3');
const bgMusic = new Audio('music/bgmusic.mp3');
const gameOverSound = new Audio('music/game_over.mp3');
const moveSound = new Audio('music/moving.mp3');
let lastpaintTime = 0;
let speed = 5    ;
let score = 0;
let snakearr = [
    {x: 13, y: 15}
]
let food = {x: 6, y: 7};


//Game functions
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastpaintTime)/1000 < 1/speed){
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    //If you bump into your self
    for(let i = 1; i < snakearr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    //If you bump into the wall
        if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0 ){
            return true;
        }
}

function gameEngine(){
    // Part 1: Updating the snake array
    if(isCollide(snakearr)){
        gameOverSound.play();
        bgMusic.pause();
        inputDir =  {x: 0 , y: 0};
        alert("Game over, Press any key to play again!")
        snakearr = [{x: 13, y: 15}];
        bgMusic.play()
        score = 0;

    }

    //If you have eaten the food, Increment the score and regenerate the food
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        foodsound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("High Score: ", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "High Score: " + hiscoreval; 
        }
        scoreBox.innerHTML = "Score: "+score;
        snakearr.unshift({x: snakearr[0].x + inputDir.x, y: snakearr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
    }

    //Moving the snake
    for(let i = snakearr.length - 2; i >= 0; i--){
    snakearr[i+1] = {...snakearr[i]};
    }

    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;


    // Part 2: Display the snake and food
    //Display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x; 

        if(index === 0){

            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x; 
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//Main logic
let hiscore = localStorage.getItem("High Score: ");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("High Score: ", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0 , y: 1} //Start the game
    moveSound.play();
    switch(e. key){
        case "ArrowUp":
            console.log('ArrowUp');
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log('ArrowDown');
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log('ArrowRight');
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log('ArrowLeft');
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});