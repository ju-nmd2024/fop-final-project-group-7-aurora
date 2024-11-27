let character;
let platform;
let acceleration;
let velocityY;

function setup() {
  createCanvas(800, 600);
  background(255, 255, 255);
  character = new Character(20, 20, 20);
  platform = new Platform(20, 20, 20);
  acceleration = 1.5;
  velocityY = 10;
}

class Character {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
  }
  // falling() {
  //   this.y = this.y + this.velocityY;
  //   this.velocitY = this.velocityY + this.acceleration;
  // }
  show() {
    push();
    clear();
    fill(0, 0, 0);
    noStroke();
    scale(this.size);
    rect(this.x, this.y, 100, 100);
    pop();
  }
  move() {
    this.x = this.x;
    this.y = this.y + acceleration + velocityY;
  }
  update() {
    this.move();
  }
}

class Platform {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
  }
  show() {
    push();
    fill(0, 0, 0);
    noStroke();
    scale(this.size);
    rect(this.x, this.y + 500, 300, 40, 60);
    pop();
  }
}

function draw() {
  character.show();
  character.update();
  platform.show();
}
