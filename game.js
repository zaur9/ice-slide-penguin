const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let penguinX = canvas.width / 2;
let penguinY = 500;
let speed = 5;
let leftPressed = false;
let rightPressed = false;

// --- Управление клавишами ---
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") leftPressed = true;
    if (e.key === "ArrowRight") rightPressed = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") leftPressed = false;
    if (e.key === "ArrowRight") rightPressed = false;
});

function drawPenguin() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(penguinX, penguinY, 20, 0, Math.PI * 2);
    ctx.fill();

    // животик
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(penguinX, penguinY + 5, 12, 0, Math.PI * 2);
    ctx.fill();
}

function updatePenguin() {
    if (leftPressed) penguinX -= speed;
    if (rightPressed) penguinX += speed;

    // Ограничение чтобы не вылетал за экран
    if (penguinX < 20) penguinX = 20;
    if (penguinX > canvas.width - 20) penguinX = canvas.width - 20;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePenguin();
    drawPenguin();

    requestAnimationFrame(gameLoop);
}

gameLoop();
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let penguinX = canvas.width / 2;
let penguinY = 500;
let speed = 5;
let leftPressed = false;
let rightPressed = false;

let snowflakes = [];
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

    // screen limits
    if (penguinX < 20) penguinX = 20;
    if (penguinX > canvas.width - 20) penguinX = canvas.width - 20;
}

// --- Snowflakes ---
function createSnowflake() {
    const x = Math.random() * canvas.width;
    const size = Math.random() * 6 + 4; // 4–10 px
    const speed = Math.random() * 2 + 1; // falling speed

    snowflakes.push({ x, y: 0, size, speed });
}

function updateSnowflakes() {
    for (let i = snowflakes.length - 1; i >= 0; i--) {
        const s = snowflakes[i];
        s.y += s.speed;

        // remove if out of screen
        if (s.y > canvas.height) {
            snowflakes.splice(i, 1);
        }

        // collision with penguin
        const dx = s.x - penguinX;
        const dy = s.y - penguinY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < s.size + 20) {
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

// --- Score ---
function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 30);
}

// --- Main Loop ---
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.03) createSnowflake(); // chance to spawn

    updatePenguin();
    updateSnowflakes();

    drawSnowflakes();
    drawPenguin();
    drawScore();

    requestAnimationFrame(gameLoop);
}

gameLoop();
