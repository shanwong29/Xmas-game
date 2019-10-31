class Gift {
  constructor() {
    console.log("Gifts are preloaded");
    this.imgWidth = 30;
    this.imgHeight = 30;
    this.distanceGift = 0;

    this.velocity = 0;
  }

  preload() {
    this.gift1 = loadImage("assets/8bit pres (1).png");
    this.gift2 = loadImage("assets/8bit pres (2)_104_109.png");
    this.gift3 = loadImage("assets/8bit pres (3).png");
    this.gift4 = loadImage("assets/8bit pres (4).png");
    this.gift5 = loadImage("assets/8bit pres (5)_104_109.png");
    this.gift6 = loadImage("assets/gift_orange_104_109.png");
  }

  draw() {
    console.log("drawing gift");

    //use Santa as center of the gift circle
    push();
    translate(santaX + 25, santaY + 13);

    this.x = cos(Math.sqrt(3) / 2) * this.distanceGift;
    this.y = sin(1 / 2) * this.distanceGift;

    if (this.isfloating !== false) {
      this.fallingSpeed = 0;
    }

    //top gift
    image(
      this.gift1,
      0,
      0 - this.distanceGift + 10 + this.fallingSpeed,
      this.imgWidth,
      this.imgHeight
    );

    // //right top gift
    image(
      this.gift2,
      this.x,
      -this.y + this.fallingSpeed,
      this.imgWidth,
      this.imgHeight
    );

    //left bottom gift
    image(
      this.gift3,
      -this.x,
      -this.y + this.fallingSpeed,
      this.imgWidth,
      this.imgHeight
    );

    //right bottom gift
    image(
      this.gift4,
      this.x,
      this.y + this.fallingSpeed,
      this.imgWidth,
      this.imgHeight
    );

    //bottom gift
    image(
      this.gift5,
      0,
      0 + this.distanceGift - 10 + this.fallingSpeed,
      this.imgWidth,
      this.imgHeight
    );

    //left top gift
    image(
      this.gift6,
      -this.x,
      this.y + this.fallingSpeed,
      this.imgWidth,
      this.imgHeight
    );

    this.distanceGift += 2;

    if (this.distanceGift >= 120) {
      this.distanceGift = 120;

      this.isfloating = false;
      this.velocity += 0.8;

      this.fallingSpeed += this.velocity;
      if (this.fallingSpeed > 300) {
        this.fallingSpeed = 0;
        this.velocity = 0;
      }
    }
    pop();
  }
}
