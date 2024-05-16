window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");

  let game;

  startButton.addEventListener("click", function () {
    startGame();
    game.gameStart.play();
  });

  function startGame() {
    game = new Game();
    game.start();

    const shipEngine = new Audio("spaceship-engine.wav");

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        if (game.player.directionX < 4) {
          game.player.directionX += 1;
          shipEngine.play();
        }
      }

      if (e.key === "ArrowLeft") {
        if (game.player.directionX > -4) {
          game.player.directionX -= 1;
          shipEngine.play();
        }
      }

      if (e.key === "ArrowDown") {
        if (game.player.directionY < 4) {
          game.player.directionY += 1;
          shipEngine.play();
        }
      }

      if (e.key === "ArrowUp") {
        if (game.player.directionY > -4) {
          game.player.directionY -= 1;
          shipEngine.play();
        }
      }
    });
  }
  function restartGame() {
    startGame();

    game.gameEndScreen.style.display = "none";
    game.gameEndScreen.style.padding = 0;
    game.gameEndScreen.style.height = 0;
  }

  restartButton.addEventListener("click", () => {
    restartGame();
    game.gameStart.play();
  });

  document.addEventListener("keydown", (e) => {
    // console.log(e);
    if (e.key === " ") {
      game.shoot();
    }
  });
};
