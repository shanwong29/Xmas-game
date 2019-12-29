class Sky {
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  preload() {
    this.sky = loadImage("assets/bkg_no_buildings_1000_600.jpg");
  }

  draw() {
    clear();
    image(this.sky, this.x, this.y, canvasWidth, canvasHeight);
    image(this.sky, this.x + canvasWidth, this.y, canvasWidth, canvasHeight);
    this.x -= 1;
    if (this.x <= -canvasWidth) {
      this.x = 0;
    }
  }
}
