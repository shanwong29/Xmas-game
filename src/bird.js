class Bird {
  constructor() {
    this.width = 96;
    this.height = 63;
    this.yLimit = 419;
    this.x =
      Math.floor(Math.random() * (canvasWidth - this.width)) + canvasWidth;
    this.y = Math.random() * (this.yLimit - this.height);
    this.imgArr = [];
    this.imgCounter = 0;
    this.imgArr.push(loadImage("assets/stork-flow(0)_236*145.png"));
    this.imgArr.push(loadImage("assets/stork-flow(1).png"));
    this.imgArr.push(loadImage("assets/stork-flow(2).png"));
    this.imgArr.push(loadImage("assets/stork-flow(3).png"));
    this.imgArr.push(loadImage("assets/stork-flow(4).png"));
    this.imgArr.push(loadImage("assets/stork-flow(5).png"));
  }

  draw() {
    if (frameCount % 10 == 0) {
      this.imgCounter++;
    }

    this.x -= 2;

    image(
      this.imgArr[this.imgCounter % this.imgArr.length],
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
