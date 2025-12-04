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
