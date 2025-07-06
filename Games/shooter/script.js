const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth - 6;
canvas.height = window.innerHeight - 6;

function Player(x, y, radius, color,) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.score = 0;
    this.draw = function() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fill();
    }
}


function Projectile(x, y, radius, color, velocity, speed=6) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.speed = speed;
    this.draw = function() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fill();
    };

    this.update = function() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}
function Enemy(x, y, radius, color, velocity, speed=2) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.speed = speed;
    this.draw = function() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        c.fill();
    };

    this.update = function() {
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }   
}
const player = new Player(canvas.width/2, canvas.height/2, 30, 'blue');
const projectiles = [];
const enemies = [];


function spawnEnemy() {
    setInterval(() => {  
    const radius = 6 + Math.random() * (30 - 6);
    let x;
    let y;

    if(Math.random() < 0.5) {
        x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
        y = Math.random() * canvas.height;
    } else {
        y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
        x = Math.random() * canvas.width;
    }

    const color = 'purple';
    const velocity = {
        x: 1,
        y: 1
    }
     enemies.push(new Enemy(x, y, radius, color, velocity));
   }, 1000);
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    projectiles.forEach(item => {
        item.update();
    });
    enemies.forEach(item => {
        item.update();
    })
}

window.addEventListener('click', (e)=> {
    const angle = Math.atan2(e.clientY - player.y, e.clientX - player.x);
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(new Projectile(
        player.x,
        player.y,
        10,
        'red',
        velocity
    ));
});

animate();
spawnEnemy();