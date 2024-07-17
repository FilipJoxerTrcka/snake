    // function to prevent screen to move when usings keys
    document.addEventListener('keydown', function(event) {
        var keysToPreventScrolling = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        
        if (keysToPreventScrolling.includes(event.key)) {
          event.preventDefault();
        }
      });
            //listener
            document.addEventListener("keydown", keyPush);
      
            //canvas
            const canvas = document.querySelector("canvas");
            const title = document.querySelector("h1");

            const ctx = canvas.getContext("2d");
      
            //player
            const tileSize = 30;
            let snakeSpeed = tileSize;
            let snakePosX = 0;
            let snakePosY = canvas.height / 2;
      
            let velocityX = 0;
            let velocityY = 1;
      
            let tail = [];
            let snakeLenght = 4;
      
            //food
            let foodPosX = 0;
            let foodPosY = 0;
      
            //game
            let gameIsRunning = true;
      
            let fps = 7;
            let score = 0;
      
            const tileCountX = canvas.width / tileSize;
            const tileCountY = canvas.height / tileSize;
      
            //loop
            function gameLoop() {
              if (gameIsRunning) {
                drawStuff();
                moveStuff();
                setTimeout(gameLoop, 1000 / fps);
              }
            }
      
            resetFood();
            gameLoop();
      
            //move everything
            function moveStuff() {
              snakePosX += snakeSpeed * velocityX;
              snakePosY += snakeSpeed * velocityY;
      
              //wall collision
      
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
              //GAMEOVER (crash into myself)
              tail.forEach((snakePart) => {
                if (snakePosX === snakePart.x && snakePosY === snakePart.y) {
                  gameOver();
                }
              });
      
      
              //tail
              tail.push({ x: snakePosX, y: snakePosY });
      
              //forget earliest parts of snake
              tail = tail.slice(snakeLenght * -1);
      
              //food collision
      
              if (snakePosX === foodPosX && snakePosY === foodPosY) {
                // ++fps;
                ++snakeLenght;
                title.textContent = ++score;
                resetFood();
              }
            }
      
            //draw everything
      
            function drawStuff() {
              //backround
              rectangle("#aaaaaa", 0, 0, canvas.width, canvas.height);
      
              //grid
              drawGrid();
      
              //food
              rectangle("silver", foodPosX, foodPosY, tileSize, tileSize);
      
              //tail
              tail.forEach((snakePart) =>
                rectangle("#2a623d", snakePart.x, snakePart.y, tileSize, tileSize)
              );
      
              //sssnake
              rectangle("green", snakePosX, snakePosY, tileSize, tileSize);
            }
      
            function rectangle(color, x, y, width, height) {
              ctx.fillStyle = color;
              ctx.fillRect(x, y, width, height);
            }
      
            //randomize food position
            function resetFood() {
        
      
              foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
              foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;
      
              // dont spawn food on snakes head
              if (foodPosX === snakePosX && foodPosY === snakePosY) {
                resetFood();
              }
      
              // dont spawn food on any snake part
              if (
                tail.some(
                  (snakePart) => snakePart.x === foodPosX && snakePart.y === foodPosY
                )
              ) {
                resetFood();
              }
            }
            //game over
           
      function gameOver() {
  if (window.innerWidth > 1000) {
    title.innerHTML = `☠️ <strong> ${score} </strong> ☠️ <br> Press any key to restart`;
  } else {
    title.textContent = `☠️ ${score} ☠️`;
  }
  gameIsRunning = false;
}
       
            //Keyboard
      
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
                  // restart game
                  if (!gameIsRunning) location.reload();
                  break;
              }
            }
            // touchpad
            function moveleft() {
              if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
              }
            }
      
            function moveup() {
              if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
              }
            }
      
            function moveright() {
              if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
              }
            }
      
            function movedown() {
              if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
              }
            }
            // restart game
            function restart() {
              if (!gameIsRunning) location.reload();
            }
      
            //grid
            function drawGrid() {
              for (let i = 0; i < tileCountX; i++) {
                for (let j = 0; j < tileCountY; j++) {
                  rectangle(
                    "#1a472a",
                    tileSize * i,
                    tileSize * j,
                    tileSize - 1,
                    tileSize - 1
                  );
                }
              }
            }
