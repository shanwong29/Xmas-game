class ScoreBox {
  constructor() {
    this.scoreBoxWidth = 270;
    this.scoreBoxHeight = 90;
  }

  preload() {
    this.scoreBox = loadImage("assets/score_box.png");
  }

  draw() {
    image(
      this.scoreBox,
      width - 270,
      0,
      this.scoreBoxWidth,
      this.scoreBoxHeight
    );
  }
}
