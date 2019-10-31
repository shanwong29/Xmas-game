class Coin {
  constructor() {
    this.coinRandomX = Math.floor(Math.random() * (1000 - 23)) + width;
    this.coinRandomY = Math.floor(Math.random() * (405 - 23)); //y limit of coin = 382;
    this.coinWidth = 23;
    this.coinHeight = 23;
    this.coinFrames = [];
    this.coinImgCounter = 0;

    this.coinFrames.push(loadImage("assets/Coin1_238_238.png"));
    this.coinFrames.push(loadImage("assets/Coin2_238_238.png"));
    this.coinFrames.push(loadImage("assets/Coin3_238_238.png"));
    this.coinFrames.push(loadImage("assets/Coin4_238_238.png"));
    this.coinFrames.push(loadImage("assets/Coin5_238_238.png"));
    this.coinFrames.push(loadImage("assets/Coin6_238_238.png"));
  }

  preload() {
    console.log("coins are preload");
  }

  draw() {
    if (frameCount % 5 === 0) {
      this.coinImgCounter++;
    }

    image(
      this.coinFrames[this.coinImgCounter % this.coinFrames.length],
      this.coinRandomX,
      this.coinRandomY,
      this.coinWidth,
      this.coinHeight
    );

    this.coinRandomX -= 1;
  }
}
