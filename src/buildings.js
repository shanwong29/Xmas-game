class Buildings {
  constructor() {
    this.xBkg = 0;
  }

  preload() {
    console.log("Buildings are preloaded");
    this.buildings = loadImage("assets/building_1000_181.png");
  }

  draw() {
    image(this.buildings, this.xBkg, 419, width);
    image(this.buildings, this.xBkg + width, 419, width);
    this.xBkg -= 1.8;
    if (this.xBkg <= -width) {
      this.xBkg = 0;
    }
  }
}
