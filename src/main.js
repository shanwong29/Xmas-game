const game = new Game();

// global variables
let canvasWidth = 1000;
let canvasHeight = 600;
let mode;
let song;
let santaX = 0;
let santaY = 0;

function preload() {
  game.preload();
  song = loadSound("assets/Minecraft_Soundtrack_Calm3.mp3");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  mode = 0;
}

function reset() {
  game.coinArr = [];
  game.birdArr = [];

  game.gift.giftDistance = 0;
  game.gift.fallingSpeed = 0;
  game.gift.velocity = 0;
  game.gift.canDeliverGift = false;

  game.coinCounter = 0;
  game.totalCoinsCollected = 0;
  game.displayCoinNum = 0;
  game.coinIntervalCanRun = true;

  game.totalMissionCompleted = 0;
  game.displayMissionNum = 0;
  game.missionIntervalCanRun = true;
}

function draw() {
  if (mode === 0) {
    reset();
    game.drawStartPage();
  }
  if (mode === 1) {
    game.drawGamePlaying();
  }
  if (mode === 2) {
    game.drawGameOver();
  }
}

function startMusic() {
  song.loop();
}

function keyPressed() {
  if (keyCode === ENTER) {
    mode = 1;
    startMusic();
  }

  if (keyCode === 32) {
    game.giftDeliverCheck();
  }
}

function mouseClicked() {
  if (insideRestartButtonArea()) {
    mode = 0;
    song.stop();
  }
}

function insideRestartButtonArea() {
  if (
    mouseX > game.messages.restartBtnX &&
    mouseX < game.messages.restartBtnX + game.messages.restartBtnWidth &&
    mouseY > game.messages.restartBtnY &&
    mouseY < game.messages.restartBtnY + game.messages.restartBtnHeight &&
    mode == 2
  ) {
    console.log("Start again");
    return true;
  }
}
