class Bullet {
  constructor(left, top, height, width, gameScreen) {
    this.left = left;
    this.top = top;
    this.height = height;
    this.width = width;
    this.gameScreen = gameScreen;

    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("div");
    // this.element.src = imgSrc;
    this.element.style.position = "absolute";
    this.element.style.backgroundColor = "red";
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.width = `${this.width}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.top -= 2;

    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  //  createExplosion() {
  //     let newElement = document.createElement("img");
  //     newElement.src = "/explosion.gif";
  //     newElement.style.position = "absolute";
  //     newElement.style.left = `${this.left}px`;
  //     newElement.style.top = `${this.top}px`;
  //     newElement.style.width = `${this.width}px`;
  //     newElement.style.height = `${this.height}px`;

  //     this.gameScreen.appendChild(newElement);

  //     setTimeout(() => {
  //       newElement.remove();
  //     }, 1250);
  //   }

    didCollide(obstacle)
  {
    const bulletRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      bulletRect.left < obstacleRect.right &&
      bulletRect.right > obstacleRect.left &&
      bulletRect.top < obstacleRect.bottom &&
      bulletRect.bottom > obstacleRect.top
    ) {
      return true;
    }
      else {
      return false;
    }
  }
}
