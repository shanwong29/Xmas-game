class Sky {
  constructor() {
    this.xBkg = 0;
  }

  preload() {
    console.log("Sky is preloaded");
    this.sky = loadImage("assets/bkg_no_buildings_1000_600.jpg");
  }

  draw() {
    clear();
    image(this.sky, this.xBkg, 0, width, height);
    image(this.sky, this.xBkg + width, 0, width, height);
    this.xBkg -= 1;
    if (this.xBkg <= -width) {
      this.xBkg = 0;
    }
  }
}
