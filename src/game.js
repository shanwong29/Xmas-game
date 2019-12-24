class Game {
  constructor() {
    console.log("Game Constructor");
    this.sky = new Sky();
    this.buildings = new Buildings();
    this.santaAndDeer = new SantaAndDeer();
    this.scoreBox = new ScoreBox();
    this.gift1 = new Gift();
    this.coinArr = [];
    this.birdArr = [];
    this.coinCounter = 0;
    this.totalCoinsCollected = 0;
    this.mission = 0;
    this.coinDisplay = 0;
    this.coinDisplayRun = true;
  }

  preload() {
    console.log("game is preloaded");
    this.EightBitFont = loadFont("assets/8_bit_madness/8-Bit Madness.ttf");
    this.sky.preload();
    this.buildings.preload();
    this.santaAndDeer.preload();
    this.scoreBox.preload();
    this.gift1.preload();
  }

  setup() {}

  startPage() {
    this.sky.draw();
    this.buildings.draw();

    this.santaAndDeer.draw();

    // console.log("Santa" + santaX);
    push();
    fill(255, 255, 255, 200);
    stroke(0, 0, 0, 200);
    rect(150, 100, 700, 300, 20);
    pop();
    push();
    textFont(this.EightBitFont);
    textSize(36);
    textAlign(CENTER, CENTER);
    stroke(255, 255, 255);
    let instruction =
      "Use the mouse to control the deer, avoid the birds and help Santa to collect coins. Whenever 20 coins are collected, press <SPACEBAR> to help Santa deliver gifts. Press <ENTER> to start.";
    text(instruction, 180, 100, 640, 300);
    pop();
  }

  draw() {
    //drawing background
    this.sky.draw();
    this.buildings.draw();

    //drawing player
    this.santaAndDeer.draw();

    //generating & drawing coins, and eliminating coins when it s outside the screen
    if (frameCount >= 60 && frameCount % 30 == 0) {
      this.coinArr.push(new Coin());
    }
    this.coinArr.forEach((currentCoin, index) => {
      currentCoin.draw();
      if (currentCoin.x + currentCoin.width < 0) {
        console.log("coin gone");
        this.coinArr.splice(index, 1);
        console.log("coinArr", this.coinArr.length);
      }

      //when collision between coins & santa is detected
      if (this.isCollision(currentCoin, this.santaAndDeer)) {
        console.log("get one pt");
        this.coinCounter += 1;
        this.totalCoinsCollected += 1;
        this.coinArr.splice(index, 1);
      }
    });

    //generating & drawing birds(obstacle), and eliminating birds when it s outside the screen

    if (frameCount >= 60 && frameCount % 150 == 0) {
      this.birdArr.push(new Bird());
    }

    this.birdArr.forEach((currentBird, index) => {
      currentBird.draw();
      // if (currentBird.x < -currentBird.width) {
      if (currentBird.x + currentBird.width < 0) {
        console.log("bird gone");
        this.birdArr.splice(index, 1);
        console.log("BirdArr", this.birdArr.length);
      }

      //when collision between coins & santa is detected
      if (this.isCollisionBird(currentBird, this.santaAndDeer)) {
        console.log("Game Over");
        noLoop();
        setTimeout(function() {
          mode = 2;
          loop();
        }, 2000);
      }
    });

    //drawing score box & text
    this.scoreBox.draw();
    push();
    textFont(this.EightBitFont);
    textSize(26);
    stroke(255, 255, 255);
    text("Coins : " + this.coinCounter + " / 20", width - 192, 35);
    text("Mission : " + this.mission, width - 180, 60);
    pop();

    // check if game.drop is true
    // if yes call gift.draw()
    if (this.drop == true) {
      this.gift1.draw();

      if (this.gift1.fallingSpeed > 280) {
        this.drop = false;
        this.gift1.floating = true;
        console.log("falling Speed =" + this.gift1.fallingSpeed);
        console.log("velocity=" + this.gift1.velocity);
        this.gift1.fallingSpeed = 0;
        this.gift1.distanceGift = 0;
        this.gift1.velocity = 0;
      }
    }
  }

  getTotalCoinsCollected() {
    return this.totalCoinsCollected;
  }

  //collision condition between coins & santa
  isCollision(coins, santa) {
    if (
      coins.x < santaX + santa.santaWidth &&
      coins.x + coins.width > santaX &&
      coins.y < santaY + santa.santaHeight &&
      coins.y + coins.height > santaY
    ) {
      return true;
    }
  }

  //collision condition between birds & deer
  isCollisionBird(birdsInstance, deerInstance) {
    if (
      birdsInstance.x < deerInstance.deerX - 7 + deerInstance.deerWidth &&
      birdsInstance.x + birdsInstance.width > deerInstance.deerX + 27 &&
      birdsInstance.y < deerInstance.deerY - 35 + deerInstance.deerHeight &&
      birdsInstance.y + birdsInstance.height > deerInstance.deerY + 15
    ) {
      return true;
    }
  }

  //draw game over scene
  endGamedraw() {
    this.isInButton = false;
    this.sky.draw();
    this.buildings.draw();
    this.santaAndDeer.draw();
    push();
    textFont(this.EightBitFont);
    textSize(22);
    textAlign(CENTER, CENTER);
    stroke(183, 183, 183);

    this.displayFinalResult();
    pop();
  }

  displayIncrement() {
    this.coinDisplay++;
    console.log("abc", this.coinDisplay);

    if (this.coinDisplay === this.getTotalCoinsCollected()) {
      console.log("inside");
      console.log("function ", this.getTotalCoinsCollected());
      console.log("coin Disply", this.coinDisplay);
      clearInterval(this.coinsID);
      this.coinDisplayRun = false;
      this.coinsID = null;
      // this.coinDisplay = this.getTotalCoinsCollected();
    }
  }

  //inside game over scene - final result text & start again button
  displayFinalResult() {
    if (this.coinDisplayRun == true && !this.coinsID) {
      this.coinsID = setInterval(() => this.displayIncrement(), 100);
    }

    // console.log(this.coinDisplay);
    // if (this.coinDisplayRun) {
    //   console.log(this.coinDisplayRun);
    //   this.displayRun();
    // }
    // var _this = this;
    // var coinsID = setInterval(function() {
    //   _this.coinDisplay++;
    //   console.log("diplay" + _this.coinDisplay);
    //   console.log("the number" + _this.getTotalCoinsCollected());
    //   if (_this.coinDisplay >= _this.getTotalCoinsCollected()) {
    //     console.log("nside");
    //     clearInterval(coinsID);
    //   }
    // }, 500);

    // const coinsID = setInterval(() => {
    //   this.coinDisplay++;
    //   if (this.coinDisplay == this.getTotalCoinsCollected()) {
    //     console.log("inside");
    //     console.log("function " + this.getTotalCoinsCollected());
    //     console.log("coin Disply" + this.coinDisplay);
    //     clearInterval(coinsID);
    //   }
    //   // this.coinDisplay = this.getTotalCoinsCollected();
    // }, 1000);

    let result = `Wow!  You have collected  ${this.coinDisplay}  coins.\nYou have completed  ${this.mission}  missions.`;
    fill(38, 43, 61);

    push();
    textSize(33);
    text("Merry Christmas!!!", 350, 80, 300, 200);
    pop();
    text(result, 300, 120, 400, 200);
    push();

    fill(153, 255, 51);
    rect(400, 280, 200, 70, 20); //start again button
    fill(0, 0, 0);
    textSize(33);
    text("Start Again", 350, 280, 300, 70);
    pop();
  }

  mousePressed() {
    mode = 0;
  }

  //check if there are more than 20 coins when spacebar is pressed
  giftDeliver() {
    console.log("giftDevliver");
    if (this.coinCounter >= 20 && this.gift1.distanceGift == 0) {
      console.log("this drop is true");
      this.drop = true;
      this.coinCounter -= 20;
      this.mission += 1;
    }
  }
}
