class Gift {
  constructor() {
    console.log("Gifts are preloaded");
    this.x;
    this.y;

    this.width = 30;
    this.height = 30;

    this.distanceGift = 0;
    this.maxGiftCircleRadius = 120;
    this.velocity = 0;
    this.acceleration = 0.8;

    this.canDeliverGift = false;
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
    // by using translate to set santaX & Y as position 0,0
    push();
    translate(santaX + 25, santaY + 13);
    this.x = cos(Math.sqrt(3) / 2) * this.distanceGift;
    this.y = sin(1 / 2) * this.distanceGift;

    //top gift
    image(
      this.gift1,
      0,
      0 - this.distanceGift + 10 + this.fallingSpeed,
      this.width,
      this.height
    );

    // //right top gift
    image(
      this.gift2,
      this.x,
      -this.y + this.fallingSpeed,
      this.width,
      this.height
    );

    //left bottom gift
    image(
      this.gift3,
      -this.x,
      -this.y + this.fallingSpeed,
      this.width,
      this.height
    );

    //right bottom gift
    image(
      this.gift4,
      this.x,
      this.y + this.fallingSpeed,
      this.width,
      this.height
    );

    //bottom gift
    image(
      this.gift5,
      0,
      0 + this.distanceGift - 10 + this.fallingSpeed,
      this.width,
      this.height
    );

    //left top gift
    image(
      this.gift6,
      -this.x,
      this.y + this.fallingSpeed,
      this.width,
      this.height
    );

    this.distanceGift += 2;

    if (this.distanceGift >= this.maxGiftCircleRadius) {
      this.distanceGift = this.maxGiftCircleRadius;

      this.velocity += this.acceleration;
      this.fallingSpeed += this.velocity;
    }

    if (this.fallingSpeed > 280) {
      console.log("fallingSpeed", this.fallingSpeed);
      this.canDeliverGift = false;
      this.fallingSpeed = 0;
      this.distanceGift = 0;
      this.velocity = 0;
    }
    pop();
  }
}
