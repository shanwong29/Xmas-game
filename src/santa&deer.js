var santaX = 0;
var santaY = 0;

class SantaAndDeer {
  constructor() {
    this.limitHeight = 390;
    this.deerWidth = 89;
    this.deerHeight = 65;
    this.santaWidth = 93;
    this.santaHeight = 61.6;

    this.deerX;
    this.deerY;
    this.leashLength = 97;
    this.easing = 0.05;
    this.leashSantaEndX = 0;
    this.leashSantaEndY = 0;
  }

  preload() {
    console.log("Santa & deer are preloaded");
    this.deer = loadImage("assets/deer_551_422.png");
    this.santa = loadImage("assets/SantaClaus_606_401.png");
  }

  setup() {}

  draw() {
    this.deerX = mouseX - 65; // x = -65px from deer left top corner
    this.deerY = mouseY - 50; // y = -50px lower from the deer left top corner

    if (mouseX < 0) {
      this.deerX = 0 - 65;
    }

    if (mouseY <= 0) {
      this.deerY = 0 - 50;
    }
    if (mouseX > width) {
      this.deerX = width - 65;
    }
    if (mouseY > this.limitHeight) {
      this.deerY = this.limitHeight;
    }

    image(this.deer, this.deerX, this.deerY, this.deerWidth, this.deerHeight);

    stroke(255, 204, 0);
    strokeWeight(3);

    this.drawLeashAndSanta();
  }

  drawLeashAndSanta() {
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
      remapedMouseY = this.limitHeight + 50;
    }
    let targetX = remapedMouseX - 100;
    this.leashSantaEndX =
      this.leashSantaEndX + (targetX - this.leashSantaEndX) * this.easing;

    let targetY = remapedMouseY - 30;
    this.leashSantaEndY =
      this.leashSantaEndY + (targetY - this.leashSantaEndY) * this.easing;

    santaX = this.leashSantaEndX - 78;
    santaY = this.leashSantaEndY - 23;

    push();
    stroke(255, 204, 0); //color
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
