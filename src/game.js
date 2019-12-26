class Game {
  constructor() {
    console.log("Game Constructor");
    this.sky = new Sky();
    this.buildings = new Buildings();
    this.santaAndLeash = new SantaAndLeash();
    this.deer = new Deer();
    this.scoreBox = new ScoreBox();
    this.gift = new Gift();
    this.coinArr = [];
    this.birdArr = [];
    this.requiredCoinsForGiftDeliver = 20;
    this.coinCounter = 0;
    this.totalCoinsCollected = 0;
    this.mission = 0;
    this.displayCoinNum = 0;
    this.coinIntervalCanRun = true;

    this.restartBtnX = 400;
    this.restartBtnY = 280;
    this.restartBtnWidth = 200;
    this.restartBtnHeight = 70;
  }

  preload() {
    console.log("game is preloaded");
    this.EightBitFont = loadFont("assets/8_bit_madness/8-Bit Madness.ttf");
    this.sky.preload();
    this.buildings.preload();
    this.santaAndLeash.preload();
    this.deer.preload();
    this.scoreBox.preload();
    this.gift.preload();
  }

  drawBkgAndCharacter() {
    this.sky.draw();
    this.buildings.draw();
    this.deer.draw();
    this.santaAndLeash.draw();
  }

  drawStartPage() {
    this.drawBkgAndCharacter();

    // draw instruction
    push();
    fill(255, 255, 255, 200); //rect bkg-color : white with tranparency
    stroke(0, 0, 0, 200); //rect border-color: black
    strokeWeight(3);
    rect(150, 100, 700, 300, 20);
    pop();
    push();
    textFont(this.EightBitFont);
    textAlign(CENTER, CENTER);
    textSize(36);
    stroke(255, 255, 255); //font-border : white
    strokeWeight(3);
    let instruction =
      "Use the mouse to control the deer, avoid the birds and help Santa to collect coins. Whenever 20 coins are collected, press <SPACEBAR> to help Santa deliver gifts. Press <ENTER> to start.";
    text(instruction, 180, 100, 640, 300);
    pop();
  }

  /*****************************************************************************************/

  //check if there are more than this.requiredCoinsForGiftDeliver when spacebar is pressed && if the gifts are at original position
  //function called by keypress 32, keyPress function in main.js
  giftDeliverCheck() {
    console.log("giftDevliverCheck");
    if (
      this.coinCounter >= this.requiredCoinsForGiftDeliver &&
      this.gift.distanceGift === 0
    ) {
      this.gift.canDeliverGift = true;
      this.coinCounter -= this.requiredCoinsForGiftDeliver;
      this.mission += 1;
    }
  }

  //collision condition between coins & santa
  isCollision(coinInstance, santaInstance) {
    if (
      coinInstance.x < santaX + santaInstance.santaWidth &&
      coinInstance.x + coinInstance.width > santaX &&
      coinInstance.y < santaY + santaInstance.santaHeight &&
      coinInstance.y + coinInstance.height > santaY
    ) {
      return true;
    }
  }

  //collision condition between birds & deer
  isCollisionBird(birdsInstance, deerInstance) {
    if (
      birdsInstance.x < deerInstance.x - 7 + deerInstance.width &&
      birdsInstance.x + birdsInstance.width > deerInstance.x + 27 &&
      birdsInstance.y < deerInstance.y - 35 + deerInstance.height &&
      birdsInstance.y + birdsInstance.height > deerInstance.y + 15
    ) {
      return true;
    }
  }

  // draw game playing scene
  drawGamePlaying() {
    this.drawBkgAndCharacter();

    // generating coins
    if (frameCount >= 60 && frameCount % 30 === 0) {
      this.coinArr.push(new Coin());
    }
    // drawing coins and eliminating coins when it s outside the screen
    this.coinArr.forEach((currentCoin, index) => {
      currentCoin.draw();
      if (currentCoin.x + currentCoin.width < 0) {
        this.coinArr.splice(index, 1);
      }
      //when collision between coins & santa is detected
      if (this.isCollision(currentCoin, this.santaAndLeash)) {
        console.log("get one pt");
        this.coinCounter += 1;
        this.totalCoinsCollected += 1;
        this.coinArr.splice(index, 1);
      }
    });

    // generating birds
    if (frameCount >= 60 && frameCount % 150 === 0) {
      this.birdArr.push(new Bird());
    }

    // drawing birds and eliminating birds when it s outside the screen
    this.birdArr.forEach((currentBird, index) => {
      currentBird.draw();

      if (currentBird.x + currentBird.width < 0) {
        this.birdArr.splice(index, 1);
      }

      //when collision between coins & deer is detected --> Game Over
      if (this.isCollisionBird(currentBird, this.deer)) {
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
    stroke(255, 255, 255); //font-edge-color : white

    text(
      `Coins : ${this.coinCounter} / ${this.requiredCoinsForGiftDeliver}`,
      canvasWidth - 192,
      35
    );
    text(`Mission : ${this.mission}`, canvasWidth - 180, 60);
    pop();

    // if game.canDeliverGift is true, draw gifts
    if (this.gift.canDeliverGift === true) {
      this.gift.draw();
    }
  }

  /*************************************************************************************/

  //draw game over scene
  drawGameOver() {
    this.drawBkgAndCharacter();
    this.displayFinalResult();
  }

  displayIncrement() {
    if (this.totalCoinsCollected > 0) {
      this.displayCoinNum++;
    }

    if (this.displayCoinNum === this.totalCoinsCollected) {
      console.log("final Display Coin Num", this.displayCoinNum);
      clearInterval(this.coinsID);
      this.coinIntervalCanRun = false;
      this.coinsID = null;
    }
  }

  //inside game over scene - final result text & start again button
  displayFinalResult() {
    if (this.coinIntervalCanRun == true && !this.coinsID) {
      this.coinsID = setInterval(() => this.displayIncrement(), 100);
    }

    let result = `Wow!  You have collected  ${this.displayCoinNum}  coins.\nYou have completed  ${this.mission}  missions.`;

    push();
    textFont(this.EightBitFont);
    textAlign(CENTER, CENTER);

    fill(38, 43, 61); //font-color : navy-blue
    stroke(183, 183, 183); //font-edge-color : light-gray
    strokeWeight(3);
    textSize(33);
    text("Merry Christmas!!!", 350, 80, 300, 200);
    textSize(22);
    text(result, 300, 120, 400, 200);

    fill(153, 255, 51); //restart button bkg-color : green
    rect(
      this.restartBtnX,
      this.restartBtnY,
      this.restartBtnWidth,
      this.restartBtnHeight,
      20
    ); //restart button
    fill(0, 0, 0); //restart font-color : black
    textSize(33);
    text("Start Again", 350, 280, 300, 70);
    pop();
  }
}
