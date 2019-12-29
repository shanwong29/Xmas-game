class Gift {
  constructor() {
    this.x;
    this.y;

    this.width = 30;
    this.height = 30;

    this.giftDistance = 0;
    this.maxGiftCircleRadius = 120;
    this.fallingSpeed = 0;
    this.velocity = 0;
    this.acceleration = 0.8;
    this.maxFallingSpeed = 300;
    this.canDeliverGift = false;
  }

  preload() {
    this.gift1 = loadImage("assets/gift_red_104_109.png");
    this.gift2 = loadImage("assets/gift_blue_104_109.png");
    this.gift3 = loadImage("assets/gift_yellow_104_109.png");
    this.gift4 = loadImage("assets/gift_green_104_109.png");
    this.gift5 = loadImage("assets/gift_purple_104_109.png");
    this.gift6 = loadImage("assets/gift_orange_104_109.png");
  }

  draw() {
    //use Santa as center of the gift circle
    // by using translate to set santaX & Y as position 0,0
    push();
    translate(santaX + 25, santaY + 13);
    this.x = cos(Math.sqrt(3) / 2) * this.giftDistance;
    this.y = sin(1 / 2) * this.giftDistance;

    //top gift
    image(
      this.gift1,
      0,
      0 - this.giftDistance + 10 + this.fallingSpeed,
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
      0 + this.giftDistance - 10 + this.fallingSpeed,
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

    this.giftDistance += 2;

    if (this.giftDistance >= this.maxGiftCircleRadius) {
      this.giftDistance = this.maxGiftCircleRadius;

      this.velocity += this.acceleration;
      this.fallingSpeed += this.velocity;
    }

    if (this.fallingSpeed > this.maxFallingSpeed) {
      this.canDeliverGift = false;
      this.fallingSpeed = 0;
      this.velocity = 0;
      this.giftDistance = 0;
    }
    pop();
  }
}
