class Coin {
  constructor() {
    this.width = 23;
    this.height = 23;
    this.yLimit = 405;
    this.x =
      Math.floor(Math.random() * (canvasWidth - this.width)) + canvasWidth;
    this.y = Math.floor(Math.random() * (this.yLimit - 23));
    this.imgArr = [];
    this.imgCounter = 0;

    this.imgArr.push(loadImage("assets/Coin1_238_238.png"));
    this.imgArr.push(loadImage("assets/Coin2_238_238.png"));
    this.imgArr.push(loadImage("assets/Coin3_238_238.png"));
    this.imgArr.push(loadImage("assets/Coin4_238_238.png"));
    this.imgArr.push(loadImage("assets/Coin5_238_238.png"));
    this.imgArr.push(loadImage("assets/Coin6_238_238.png"));
  }

  draw() {
    if (frameCount % 5 === 0) {
      this.imgCounter++;
    }

    image(
      this.imgArr[this.imgCounter % this.imgArr.length],
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.x -= 1;
  }
}
