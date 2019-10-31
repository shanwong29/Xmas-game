const game = new Game();
let mode;
let song;
function preload() {
  console.log("main preloaded");
  game.preload();
  song = loadSound("assets/Minecraft Soundtrack - Calm 3.webm");
}

function setup() {
  createCanvas(1000, 600);

  mode = 0;
}

function reset() {
  game.giftArr = [];
  game.coinArr = [];
  game.birdArr = [];
  game.coinCounter = 0;
  game.totalCoinsCollected = 0;
  game.gift1.distanceGift = 0;
  game.gift1.fallingSpeed = 0;
  game.gift1.velocity = 0;
  game.mission = 0;
}

function draw() {
  if (mode == 0) {
    reset();
    game.startPage();
  }
  if (mode == 1) {
    game.draw();
  }
  if (mode == 2) {
    game.endGamedraw();
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

  console.log("KeyPressed function called");
  if (keyCode == 32) {
    game.giftDeliver();

    console.log("keyCode 32 is pressed");
  }
}

function mouseClicked() {
  if (clickOnButton()) {
    mode = 0;
    console.log("mode 0");
  }
}

function clickOnButton() {
  if (
    mouseX > 400 &&
    mouseX < 600 &&
    mouseY > 280 &&
    mouseY < 350 &&
    mode == 2
  ) {
    return true;
  }
}
