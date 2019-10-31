class Bird {
  constructor() {
    this.birdRandomX = Math.floor(Math.random() * (1000 - 96)) + width;
    this.birdRandomY = Math.random() * (419 - 63);
    this.birdWidth = 96;
    this.birdHeight = 63;
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
    this.birdRandomX -= 2;

    image(
      this.birdImgArr[this.birdImgCounter % this.birdImgArr.length],
      this.birdRandomX,
      this.birdRandomY,
      this.birdWidth,
      this.birdHeight
    );
  }
}
