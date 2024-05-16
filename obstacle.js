class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = Math.random() * 800 + 80;
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
    this.top += 1.5;
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
}
