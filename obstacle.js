class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = Math.random() * 300 + 100;
    this.top = -150;
    this.width = 75;
    this.height = 55;
    this.element = document.createElement("img");
    this.element.src = "/Enemy1.png";
    this.element.style.position = "absolute";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
  }
  move() {
    this.top += 3;
    this.updatePostion();
  }

  updatePostion() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }
  createExplosion() {
    let newElement = document.createElement("img");
    newElement.src = "/explosion.gif";
    newElement.style.position = "absolute";
    newElement.style.left = `${this.left}px`;
    newElement.style.top = `${this.top}px`;
    newElement.style.width = `${this.width}px`;
    newElement.style.height = `${this.height}px`;

    this.gameScreen.appendChild(newElement);

    setTimeout(() => {
      newElement.remove();
    }, 1250);
  }

  //   didCollide(bullets)
  // {
  //   const obstacleRect = this.element.getBoundingClientRect();
  //   const bulletsRect = bullets.element.getBoundingClientRect();

  //   if (
  //     obstacleRect.left < bulletsRect.right &&
  //     obstacleRect.right > bulletsRect.left &&
  //     obstacleRect.top < bulletsRect.bottom &&
  //     obstacleRect.bottom > bulletsRect.top
  //   ) {
  //     return true;
  //   }
  //     else {
  //     return false;
  //   }
  // }
}

// for (let b = 0; b < bullet.length; b++) {
//   let bullet = bullet[b];
//   ctx.beginPath();
//   ctx.arc(bullet.x, bullet.y, 2, 0, Math.PI * 2);
//   ctx.fill();
//   bullet.x += bullet.dx;
//   didCollide(bullet, obstacle);
// };

// function detectAndHandleCollisions(bullet, enemies) {
//   for (var j = enemies.length; j-- > 0;) {
//       var enemy = enemies[j];
//       if (bullet.x > enemy.x && bullet.x < enemy.x + enemy.width && bullet.y > enemy.y && bullet.y < enemy.y + enemy.height) {
//           enemies.splice(j, 1);
//           // Handle bullet collisions here if needed
//       }
//   }
// };

