class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      215,
      450,
      66,
      150,
      "/heroSpaceShip.png"
    );
    this.height = 570;
    this.width = 1000;
    this.obstacles = [];
    this.bullets = [];
    this.score = 0;
    this.lives = 8;
    this.timer = 60;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000 / 60;
    this.frames = 0;
    this.scoreElement = document.getElementById("score");
    this.livesElement = document.getElementById("lives");
    this.stats = document.getElementById("stats-container");
    this.clockContainer = document.getElementById("clock-container");
    this.clock = document.getElementById("clock");
    this.endMessage = document.getElementById("end-message");
    this.explosionEffect = new Audio(
      "/mixkit-arcade-chiptune-explosion-1691.wav"
    );
    this.laserBeam = new Audio("/mixkit-short-laser-gun-shot-1670.wav");
    this.gameOver = new Audio("/arcade-fast-game-over.wav");
    this.gameStart = new Audio("/gameStart.wav");
    this.shipEngine = new Audio("/spaceship-engine.wav");
  }
  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.startScreen.style.padding = 0;
    this.startScreen.style.height = 0;

    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.frames += 1;

    if (this.frames % 90 === 0) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

    this.update();

    if (this.lives <= 0) {
      console.log("Lives====>", this.lives);
      this.gameIsOver = true;
    }

    if (this.frames % 60 === 0) {
      this.timer--;
      this.clock.innerHTML = this.timer;
    }

    if (this.timer <= 0) {
      this.gameIsOver = true;
      this.gameOver.play();
    }

    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalId);
      this.gameOverScreen();
    }
  }

  update() {
    this.player.move();

    this.obstacles.forEach((obstacle, i) => {
      obstacle.move();
      this.bullets.forEach((bullet, j) => {
        bullet.move();

        if (bullet.didCollide(obstacle)) {
          this.explosionEffect.play();
          obstacle.createExplosion();
          obstacle.element.remove();
          bullet.element.remove();
          this.bullets.splice(j, 1);
          this.obstacles.splice(i, 1);
          this.score++;
        }

        if (this.bullets.top < -5) {
          bullet.element.remove();
          this.bullets.splice(i, 1);
        }
      });

      if (this.player.didCollide(obstacle)) {
        this.explosionEffect.play();
        obstacle.createExplosion();
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives -= 1;
      }

      if (obstacle.top > 640) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        // this.score++;
        this.lives -= 1;
      }
    });
    this.scoreElement.innerHTML = this.score;
    this.livesElement.innerHTML = this.lives;
  }

  shoot() {
    this.bullets.push(
      new Bullet(this.player.left, this.player.top, 40, 10, this.gameScreen)
    );
    this.laserBeam.play();
  }

  returnLivesMessage() {
    return this.lives;
  }

  gameOverScreen() {
    this.player.element.remove();

    this.obstacles.forEach((obstacle) => {
      obstacle.element.remove();
    });

    this.gameScreen.style.height = `${0}px`;
    this.gameScreen.style.width = `${0}px`;
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "inherit";
    if (this.timer <= 0) {
      this.endMessage.innerText = `You won! You finished with a score of ${
        this.score
      } and ${this.returnLivesMessage()} lives!`;
    } else {
      this.endMessage.innerText = `You lost!  You ran out of lives and finished with a score of ${this.score}.`;
    }
    this.gameOver.play();
  }
}
