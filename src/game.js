class Game {
  constructor() {
    this.sky = new Sky();
    this.buildings = new Buildings();
    this.santaAndLeash = new SantaAndLeash();
    this.deer = new Deer();
    this.messages = new Messages();
    this.gift = new Gift();

    this.coinArr = [];
    this.birdArr = [];

    this.requiredCoinsForGiftDeliver = 20;
    this.coinCounter = 0;
    this.totalCoinsCollected = 0;
    this.displayCoinNum = 0;
    this.coinIntervalCanRun = true;

    this.totalMissionCompleted = 0;
    this.displayMissionNum = 0;
    this.missionIntervalCanRun = true;
  }

  preload() {
    console.log("game is preloaded");
    this.sky.preload();
    this.buildings.preload();
    this.santaAndLeash.preload();
    this.deer.preload();
    this.messages.preload();
    this.gift.preload();
  }

  drawBkg() {
    this.sky.draw();
    this.buildings.draw();
  }

  drawCharacter() {
    this.deer.draw();
    this.santaAndLeash.draw();
  }

  drawStartPage() {
    this.drawBkg();
    this.drawCharacter();
    this.messages.drawInstruction();
  }

  /*****************************************************************************************/

  //check if there are more than this.requiredCoinsForGiftDeliver when spacebar is pressed && if the gifts are at original position
  //function called by keypress 32, keyPress function in main.js
  giftDeliverCheck() {
    if (
      this.coinCounter >= this.requiredCoinsForGiftDeliver &&
      this.gift.giftDistance === 0
    ) {
      this.gift.canDeliverGift = true;
      this.coinCounter -= this.requiredCoinsForGiftDeliver;
      this.totalMissionCompleted += 1;
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
    this.drawBkg();

    // if game.canDeliverGift is true, draw gifts
    if (this.gift.canDeliverGift === true) {
      this.gift.draw();
    }

    this.drawCharacter();

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
    this.messages.drawScoreBox(
      this.coinCounter,
      this.requiredCoinsForGiftDeliver,
      this.totalMissionCompleted
    );
  }

  /*************************************************************************************/

  //draw game over scene
  drawGameOver() {
    this.drawBkg();
    this.drawCharacter();
    this.displayFinalResult();
  }

  coinNumIncrement() {
    if (this.totalCoinsCollected > 0) {
      this.displayCoinNum++;
    }

    if (this.displayCoinNum === this.totalCoinsCollected) {
      clearInterval(this.coinsID);
      this.coinIntervalCanRun = false;
      this.coinsID = null;
    }
  }

  missionNumIncrement() {
    if (this.totalMissionCompleted > 0) {
      this.displayMissionNum++;
    }
    if (this.displayMissionNum === this.totalMissionCompleted) {
      clearInterval(this.missionID);
      this.missionIntervalCanRun = false;
      this.missionID = null;
    }
  }

  //inside game over scene - final result text & start again button
  displayFinalResult() {
    if (this.coinIntervalCanRun == true && !this.coinsID) {
      this.coinsID = setInterval(() => this.coinNumIncrement(), 100);
    }

    if (this.missionIntervalCanRun == true && !this.missionID) {
      this.missionID = setInterval(() => this.missionNumIncrement(), 100);
    }

    this.messages.drawGameResultAndRestartBtn(
      this.displayCoinNum,
      this.displayMissionNum
    );
  }
}
