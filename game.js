const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let penguinY = 500;

function drawPenguin() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(200, penguinY, 20, 0, Math.PI * 2);
    ctx.fill();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPenguin();

    requestAnimationFrame(gameLoop);
}

gameLoop();
