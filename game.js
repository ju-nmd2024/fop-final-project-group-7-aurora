let player;
let platforms = [];
let gravity = 0.8;
let friction = 0.9;
let jumpStrength = -12;

function setup() {
  createCanvas(800, 700);

  player = new Player();

  // Create platforms
  platforms.push(new Platform(0, height - 50, width, 50)); // Ground
}

function draw() {
  background(135, 206, 250); // Sky color

  // Apply gravity to player
  player.applyGravity();

  // Move player
  player.update();

  // Display player
  player.display();

  // Display platforms
  for (let platform of platforms) {
    platform.display();
  }

  // Check for collision with platforms
  for (let platform of platforms) {
    player.checkCollision(platform);
  }
}

// Player class
class Player {
  constructor() {
    this.x = 50;
    this.y = height - 150;
    this.width = 50;
    this.height = 50;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.onGround = false;
  }

  update() {
    // Left and right movement
    if (keyIsDown(LEFT_ARROW)) {
      this.xSpeed = -5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.xSpeed = 5;
    } else {
      this.xSpeed = this.xSpeed * friction; // Slow down when no key is pressed
    }

    this.x = this.x + this.xSpeed;
    this.y = this.y + this.ySpeed;

    // Make sure the player stays within bounds horizontally
    this.x = constrain(this.x, 0, width - this.width);
  }

  applyGravity() {
    if (!this.onGround) {
      this.ySpeed = this.ySpeed + gravity; // Falling down
    }
  }

  jump() {
    if (this.onGround) {
      this.ySpeed = jumpStrength;
      this.onGround = false;
    }
  }

  checkCollision(platform) {
    // Check if player is colliding with the platform
    if (
      this.x + this.width > platform.x &&
      this.x < platform.x + platform.width &&
      this.y + this.height <= platform.y &&
      this.y + this.height + this.ySpeed >= platform.y
    ) {
      this.ySpeed = 0;
      this.y = platform.y - this.height; // Position player on top of the platform
      this.onGround = true;
    }
  }

  display() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}

// Platform class
class Platform {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  display() {
    fill(0, 255, 0);
    rect(this.x, this.y, this.width, this.height);
  }
}

// Key press for jump
function keyPressed() {
  if (keyCode === 32) {
    // Space bar
    player.jump();
  }
}
