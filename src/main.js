const game = new Game();

let canvasWidth = 1000;
let canvasHeight = 600;
let mode;
let song;
let santaX = 0;
let santaY = 0;

function preload() {
  console.log("main preloaded");
  game.preload();
  song = loadSound("assets/Minecraft Soundtrack - Calm 3.webm");
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  mode = 0;
}

function reset() {
  game.giftArr = [];
  game.coinArr = [];
  game.birdArr = [];
  game.coinCounter = 0;
  game.totalCoinsCollected = 0;
  game.gift.distanceGift = 0;
  game.gift.fallingSpeed = 0;
  game.gift.velocity = 0;
  game.mission = 0;
  game.displayCoinNum = 0;
  game.coinIntervalCanRun = true;
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
    mouseX > game.restartBtnX &&
    mouseX < game.restartBtnX + game.restartBtnWidth &&
    mouseY > game.restartBtnY &&
    mouseY < game.restartBtnY + game.restartBtnHeight &&
    mode == 2
  ) {
    return true;
  }
}
