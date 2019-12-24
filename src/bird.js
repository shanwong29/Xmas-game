class Bird {
  constructor() {
    this.width = 96;
    this.height = 63;
    this.yLimit = 419;
    this.x =
      Math.floor(Math.random() * (canvasWidth - this.width)) + canvasWidth;
    this.y = Math.random() * (this.yLimit - this.height);
    this.birdImgArr = [];
    this.birdImgCounter = 0;
    this.birdImgArr.push(loadImage("assets/stork-flow(0)_236*145.png"));
    this.birdImgArr.push(loadImage("assets/stork-flow(1).png"));
    this.birdImgArr.push(loadImage("assets/stork-flow(2).png"));
    this.birdImgArr.push(loadImage("assets/stork-flow(3).png"));
    this.birdImgArr.push(loadImage("assets/stork-flow(4).png"));
    this.birdImgArr.push(loadImage("assets/stork-flow(5).png"));
  }

  preload() {
    console.log("bird is preloaded");
  }
  draw() {
    if (frameCount % 10 == 0) {
      this.birdImgCounter++;
    }

    this.x -= 2;

    image(
      this.birdImgArr[this.birdImgCounter % this.birdImgArr.length],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
