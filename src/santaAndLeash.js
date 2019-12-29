class SantaAndLeash {
  constructor() {
    this.limitHeight = 440;
    this.santaWidth = 93;
    this.santaHeight = 61.6;

    this.easing = 0.05;

    this.leashSantaEndX = 0;
    this.leashSantaEndY = 0;

    this.leashSantaEndAdjustmentX = -100; //reference to remappedMouseX & Y
    this.leashSantaEndAdjustmentY = -30;

    this.santaAdjustmentX = -78; //reference to this.leashSantaEndX & Y
    this.santaAdjustmentY = -23;
  }

  preload() {
    this.santa = loadImage("assets/SantaClaus_606_401.png");
  }

  draw() {
    // remapedMouseX & Y is to ensure characters stay in canvas
    let remapedMouseX = mouseX;
    let remapedMouseY = mouseY;

    if (mouseX < 0) {
      remapedMouseX = 0;
    }

    if (mouseY <= 0) {
      remapedMouseY = 0;
    }
    if (mouseX > width) {
      remapedMouseX = width;
    }
    if (mouseY > this.limitHeight) {
      remapedMouseY = this.limitHeight;
    }

    // target X & Y is the static position where the leash attached to Santa
    let targetX = remapedMouseX + this.leashSantaEndAdjustmentX;
    this.leashSantaEndX =
      this.leashSantaEndX + (targetX - this.leashSantaEndX) * this.easing;

    let targetY = remapedMouseY + this.leashSantaEndAdjustmentY;
    this.leashSantaEndY =
      this.leashSantaEndY + (targetY - this.leashSantaEndY) * this.easing;

    santaX = this.leashSantaEndX + this.santaAdjustmentX;
    santaY = this.leashSantaEndY + this.santaAdjustmentY;

    push();
    stroke(255, 204, 0); //color of the leash
    strokeWeight(3);
    line(
      this.leashSantaEndX,
      this.leashSantaEndY,
      remapedMouseX + 2,
      remapedMouseY - 16
    );
    pop();
    image(this.santa, santaX, santaY, this.santaWidth, this.santaHeight);
  }
}
