const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const BALL_COUNT = window.innerWidth > 500 ? 100 : 50;
const GRAVITY = 1;
const FRICTION = 0.8;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
document.body.appendChild(canvas);


const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(24, 24, 24, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

const randNum = (min, max) => Math.random() * (max - min) + min;

const randClr = () => {
    const r = randNum(20, 256);
    const g = randNum(20, 256);
    const b = randNum(20, 256);
    return `rgb(${r}, ${g}, ${b})`
}


class Ball {
    constructor(x, y) {
        this.radius = randNum(10, 20);
        this.x = x || randNum(this.radius, canvas.width - this.radius);
        this.y = y || randNum(0, canvas.height / 2);
        this.dx = randNum(-10, 10);
        this.dy = randNum(-6, 6);
        this.color = randClr();
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill()
    }


    update() {
        if (Math.abs(this.dy) < 1e-10 && this.dy !== 0) {
            this.dy = 0;
            this.draw();
            return;
        }

        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * FRICTION;
        } else {
            this.dy += GRAVITY;
        }


        if (this.x < this.radius || this.x > canvas.width - this.radius) {
            this.dx = -this.dx;
        }

        if (Math.abs(this.dx) > 0.05 && this.dx !== 0) {
            this.dx *= 0.995;
        } else if (this.dx !== 0) {
            this.dx = 0;
        }

        this.y += this.dy;
        this.x += this.dx;

        this.draw();
    }

}

const balls = Array.from({ length: BALL_COUNT }, () => new Ball());
const handleClick = ({ clientX, clientY }) => balls.push(new Ball(clientX, clientY));

const tick = () => {
    clearCanvas();
    balls.forEach(ball => ball.update())
    window.requestAnimationFrame(tick);
}

tick();

window.addEventListener('resize', resizeCanvas);
window.addEventListener('click', handleClick)