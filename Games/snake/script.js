let intervaId = null;
const scoreEl = document.getElementById('score');
const overlay = document.getElementById('overlay')
const boarder = document.querySelector('canvas');
const size = 25, colls = 30, rows = 50;
boarder.width = size * rows;
boarder.height = size * colls;

const c = boarder.getContext('2d');
let gameRunning = false;

const snake = {
    body: [{
    x: Math.floor((rows/2)) * size,
    y: Math.floor((colls/2)) * size
  }],
    
    diraction: {dx: 1, dy: 0},
    length: 1
}

const food = {
    x: undefined,
    y: undefined,
    placeFood: function() {
        food.x = Math.floor(1 + Math.random() * (rows - 2)) * size;
        food.y = Math.floor(1 + Math.random() * (colls - 2)) * size;
    }
}

function startGame() {
    resetGame();
    food.placeFood();
    intervaId = setInterval(draw, 100);
    overlay.classList.remove('show');
    gameRunning = true;
}
function resetGame() {
    snake.body = [{
    x: Math.floor((rows/2)) * size,
    y: Math.floor((colls/2)) * size
  }];
    snake.length = 1;
    snake.diraction = {dx: 1, dy: 0};
    updateScore();
}

function updateScore() {
    scoreEl.textContent = `Score: ${snake.length}`;
}
function draw() {
    c.clearRect(0, 0, boarder.width,boarder.height);
    c.fillStyle = 'red';

    c.fillRect(food.x, food.y, size, size);



    c.fillStyle = 'yellow';
    for(let i = 0; i < snake.body.length; i++){
        const segment = snake.body[i];
        c.fillRect(segment.x,segment.y,size,size);
    }
    const newHead = {
        x:snake.body[0].x + (snake.diraction.dx * size),
        y:snake.body[0].y + (snake.diraction.dy * size)
    };
    if(collision(newHead, snake.body)) {
        clearInterval(intervaId);
        gameOver();
        return;
    }
snake.body.unshift(newHead);
    


if (snake.body[0].x == food.x && snake.body[0].y == food.y) {
    snake.length++;
    food.placeFood();
    updateScore();
} else {
    snake.body.pop();
}

function gameOver() {
 overlay.innerHTML = 'GAME OVER<br><span class ="small">Press Space</span>';
 overlay.classList.add('show');
 gameRunning = false;

}
function collision(head, tail) {
    if(head.x < 0 || head.y < 0 || head.x + size > boarder.width || head.y + size > boarder.height) {
        return true
    }
    for(let i = 0; i < tail.length; i++) {
        if(head.x == tail[i].x && head.y == tail[i].y) {
            return true;
        }
    }
}
    return false;

}


food.placeFood();





document.addEventListener('keydown', (e)=> {
    const dir = snake.diraction;

    if(!gameRunning && e.code == 'Space') {
        startGame();
    }

    if ((e.key == 'ArrowLeft' || e.key == 'a') && dir.dx != 1) {
        dir.dx = -1;
        dir.dy = 0;

    }
    else if ((e.key == 'ArrowRight' || e.key == 'd') && dir.dx != -1) {
        dir.dx = 1;
        dir.dy = 0;
        
    } else if ((e.key == 'ArrowUp' || e.key == 'w') && dir.dy != 1) {
        dir.dx = 0;
        dir.dy = -1;

    }
    else if ((e.key == 'ArrowDown' || e.key == 's') && dir.dy !=-1) {
        dir.dx = 0;
        dir.dy = 1;
    }
})
