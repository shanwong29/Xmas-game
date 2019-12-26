class Messages {
  constructor() {
    this.instructionBoxX = 150;
    this.instructionBoxY = 100;
    this.instructionBoxWidth = 700;
    this.instructionBoxHeight = 300;

    this.instructionTextX = 180;
    this.instructionTextY = 100;
    this.instructionTextWidth = 640;
    this.instructionTextHeight = 300;

    this.scoreBoxX = 1000 - 270;
    this.scoreBoxY = 0;
    this.scoreBoxWidth = 270;
    this.scoreBoxHeight = 90;

    this.restartBtnX = 400;
    this.restartBtnY = 280;
    this.restartBtnWidth = 200;
    this.restartBtnHeight = 70;
  }

  preload() {
    this.font = loadFont("assets/8_bit_madness/8-Bit Madness.ttf");
    this.scoreBox = loadImage("assets/score_box.png");
  }

  drawInstruction() {
    let instruction =
      "Use the mouse to control the deer, avoid the birds and help Santa to collect coins. Whenever 20 coins are collected, press <SPACEBAR> to help Santa deliver gifts. Press <ENTER> to start.";
    push();
    fill(255, 255, 255, 200); //rect bkg-color : white with tranparency
    stroke(0, 0, 0, 200); //rect border-color: black
    strokeWeight(3);
    rect(
      this.instructionBoxX,
      this.instructionBoxY,
      this.instructionBoxWidth,
      this.instructionBoxHeight,
      20
    );

    textFont(this.font);
    textAlign(CENTER, CENTER);
    textSize(36);
    fill(0, 0, 0); //font-color : black
    stroke(255, 255, 255); //font-border : white
    strokeWeight(3);

    text(
      instruction,
      this.instructionTextX,
      this.instructionTextY,
      this.instructionTextWidth,
      this.instructionTextHeight
    );
    pop();
  }

  drawScoreBox(coinCounter, requiredCoinsForGiftDeliver, missionCounter) {
    image(
      this.scoreBox,
      this.scoreBoxX,
      this.scoreBoxY,
      this.scoreBoxWidth,
      this.scoreBoxHeight
    );

    push();
    textFont(this.font);
    textSize(26);
    stroke(255, 255, 255); //font-edge-color : white
    text(
      `Coins : ${coinCounter} / ${requiredCoinsForGiftDeliver}`,
      canvasWidth - 192,
      35
    );
    text(`Mission : ${missionCounter}`, canvasWidth - 180, 60);
    pop();
  }

  drawGameResultAndRestartBtn(displayCoinNum, displayMissionNum) {
    let result = `Wow!  You have collected  ${displayCoinNum}  coins.\nYou have completed  ${displayMissionNum}  missions.`;
    push();
    textFont(this.font);
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
