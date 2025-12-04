const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

// --- Penguin ---
let penguinX = canvas.width / 2;
let penguinY = 500;
let speed = 5;
let leftPressed = false;
let rightPressed = false;

// --- Snowflakes ---
let snowflakes = [];
let obstacles = [];
let score = 0;

// --- Controls ---
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") leftPressed = true;
    if (e.key === "ArrowRight") rightPressed = true;
});
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") leftPressed = false;
    if (e.key === "ArrowRight") rightPressed = false;
});

// --- Penguin ---
function drawPenguin() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(penguinX, penguinY, 20, 0, Math.PI * 2);
    ctx.fill();

    // belly
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(penguinX, penguinY + 5, 12, 0, Math.PI * 2);
    ctx.fill();
}

function updatePenguin() {
    if (leftPressed) penguinX -= speed;
    if (rightPressed) penguinX += speed;

    if (penguinX < 20) penguinX = 20;
    if (penguinX > canvas.width - 20) penguinX = canvas.width - 20;
}

// --- Snowflakes ---
function createSnowflake() {
    const x = Math.random() * canvas.width;
    const size = Math.random() * 6 + 4;
    const speed = Math.random() * 2 + 1;
    snowflakes.push({ x, y: 0, size, speed });
}

function updateSnowflakes() {
    for (let i = snowflakes.length - 1; i >= 0; i--) {
        const s = snowflakes[i];
        s.y += s.speed;

        if (s.y > canvas.height) snowflakes.splice(i, 1);

        const dx = s.x - penguinX;
        const dy = s.y - penguinY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // collision with penguin
        let hitObstacle = obstacles.some(o => 
            penguinX + 20 > o.x && penguinX - 20 < o.x + o.width &&
            penguinY + 20 > o.y && penguinY - 20 < o.y + o.height
        );

        if (distance < s.size + 20 && !hitObstacle) {
            snowflakes.splice(i, 1);
            score++;
        }
    }
}

function drawSnowflakes() {
    ctx.fillStyle = "white";
    snowflakes.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
    });
}

// --- Obstacles ---
function createObstacle() {
    const width = Math.random() * 50 + 20;
    const height = 15;
    const x = Math.random() * (canvas.width - width);
    const y = 0;
    const speed = 2;
    obstacles.push({ x, y, width, height, speed });
}

function updateObstacles() {
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const o = obstacles[i];
        o.y += o.speed;
        if (o.y > canvas.height) obstacles.splice(i, 1);

        ctx.fillStyle = "#00ffff"; // cyan ice block
        ctx.fillRect(o.x, o.y, o.width, o.height);
    }
}

// --- Score Display ---
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

// --- Main Loop ---
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.03) createSnowflake();
    if (Math.random() < 0.01) createObstacle();

    updatePenguin();
    updateSnowflakes();
    updateObstacles();

    drawSnowflakes();
    drawPenguin();
    drawScore();

    requestAnimationFrame(gameLoop);
}

gameLoop();
