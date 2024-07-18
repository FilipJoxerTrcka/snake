// Canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const tileSize = 30;
const tileCountX = canvas.width / tileSize;
const tileCountY = canvas.height / tileSize;

// Player
let snakeSpeed = tileSize;
let snakePosX = 0;
let snakePosY = canvas.height / 2;
let velocityX = 0;
let velocityY = 1;
let tail = [];
let snakeLength = 4;

// Food
let foodPosX = 0;
let foodPosY = 0;

// Game
let gameIsRunning = true;
let fps = 7;
let score = 0;

// HTML Elements
const title = document.querySelector("h1");

// Add event listeners
document.addEventListener("keydown", keyPush);

// Game loop
function gameLoop() {
  if (gameIsRunning) {
    drawStuff();
    moveStuff();
    setTimeout(gameLoop, 1000 / fps);
  }
}

// Initialize game
resetFood();
gameLoop();

// Move everything
function moveStuff() {
  snakePosX += snakeSpeed * velocityX;
  snakePosY += snakeSpeed * velocityY;

  // Wall collision
  if (snakePosX > canvas.width - tileSize) {
    snakePosX = 0;
  }
  if (snakePosX < 0) {
    snakePosX = canvas.width;
  }
  if (snakePosY > canvas.height - tileSize) {
    snakePosY = 0;
  }
  if (snakePosY < 0) {
    snakePosY = canvas.height;
  }

  // Game over (crash into self)
  tail.forEach(snakePart => {
    if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
      gameOver();
    }
  });

  // Tail
  tail.push({ x: snakePosX, y: snakePosY });
  tail = tail.slice(snakeLength * -1);

  // Food collision
  if (snakePosX === foodPosX && snakePosY === foodPosY) {
    snakeLength++;
    title.textContent = ++score;
    resetFood();
  }
}

// Draw everything
function drawStuff() {
  // Background
  rectangle("#aaaaaa", 0, 0, canvas.width, canvas.height);

  // Grid
  drawGrid();

  // Food
  rectangle("silver", foodPosX, foodPosY, tileSize, tileSize);

  // Tail
  tail.forEach(snakePart => rectangle("#2a623d", snakePart.x, snakePart.y, tileSize, tileSize));

  // Snake
  rectangle("green", snakePosX, snakePosY, tileSize, tileSize);
}

// Draw rectangle
function rectangle(color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

// Reset food position
function resetFood() {
  foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
  foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;

  if (foodPosX === snakePosX && foodPosY === snakePosY) {
    resetFood();
  }

  if (tail.some(snakePart => snakePart.x === foodPosX && snakePart.y === foodPosY)) {
    resetFood();
  }
}

// Game over
function gameOver() {
  if (window.innerWidth > 1000) {
    title.innerHTML = `☠️ <strong>${score}</strong> ☠️ <br> Press any key to restart`;
  } else {
    title.textContent = `☠️ ${score} ☠️`;
  }
  gameIsRunning = false;
}

// Keyboard input
function keyPush(event) {
  switch (event.key) {
    case "ArrowLeft":
      if (velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      }
      break;
    case "ArrowUp":
      if (velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
      }
      break;
    case "ArrowRight":
      if (velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }
      break;
    case "ArrowDown":
      if (velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      }
      break;
    default:
      // Restart game
      if (!gameIsRunning) {
        location.reload();
      }
      break;
  }
}

// Grid
function drawGrid() {
  for (let i = 0; i < tileCountX; i++) {
    for (let j = 0; j < tileCountY; j++) {
      rectangle("#1a472a", tileSize * i, tileSize * j, tileSize - 1, tileSize - 1);
    }
  }
}
