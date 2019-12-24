class Buildings {
  constructor() {
    this.x = 0; //x-position of the image (left-top-coner)
    this.y = 419; //y-position of the image (left-top-coner)
    this.height = 181;
  }

  preload() {
    console.log("Buildings are preloaded");
    this.buildings = loadImage("assets/building_1000_181.png");
  }

  draw() {
    image(this.buildings, this.x, this.y, canvasWidth, this.height);
    image(
      this.buildings,
      this.x + canvasWidth,
      this.y,
      canvasWidth,
      this.height
    );
    this.x -= 1.8;
    if (this.x <= -canvasWidth) {
      this.x = 0;
    }
  }
}
