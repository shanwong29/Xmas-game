class Deer {
  constructor() {
    this.limitHeight = 440;
    this.width = 89;
    this.height = 65;

    this.x;
    this.y;

    this.deerImgAdjustmentX = -65; //reference to mouseX & Y
    this.deerImgAdjustmentY = -50;
  }

  preload() {
    this.deer = loadImage("assets/deer_551_422.png");
  }

  draw() {
    this.x = mouseX + this.deerImgAdjustmentX;
    this.y = mouseY + this.deerImgAdjustmentY;

    if (mouseX < 0) {
      this.x = 0 + this.deerImgAdjustmentX;
    }

    if (mouseY <= 0) {
      this.y = 0 + this.deerImgAdjustmentY;
    }
    if (mouseX > canvasWidth) {
      this.x = canvasWidth + this.deerImgAdjustmentX;
    }
    if (mouseY >= this.limitHeight) {
      this.y = this.limitHeight + this.deerImgAdjustmentY;
    }

    image(this.deer, this.x, this.y, this.width, this.height);
  }
}
