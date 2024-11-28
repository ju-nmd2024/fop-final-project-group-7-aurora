let player;
let platforms = [];
let gravity = 0.8;
let friction = 0.9;
let jumpStrength = -12;

function setup() {
  createCanvas(1879 , 1009);

  player = new Player();

  // Create platforms
  platforms.push(new Platform(0, height - 350, 250, 350));
  platforms.push(new Platform(250, height - 50, 150, 50));
  platforms.push(new Platform(400, height - 350, 150, 350));
  platforms.push(new Platform(550, height - 430, 150, 430));
  platforms.push(new Platform(700, height - 550, 150, 550));
  platforms.push(new Platform(850, height - 300, 150, 300));
  platforms.push(new Platform(1000, height - 400, 150, 400));
  platforms.push(new Platform(1150, height - 450, 150, 450));
  platforms.push(new Platform(1300, height - 350, 580, 350));
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
// Player class
class Player {
  constructor() {
    this.x = 50;
    this.y = height - 550;
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
      this.xSpeed *= friction; // Slow down when no key is pressed
    }

    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Make sure the player stays within bounds horizontally
    this.x = constrain(this.x, 0, width - this.width);
  }

  applyGravity() {
    if (!this.onGround) {
      this.ySpeed += gravity; // Falling down
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

    // Check for horizontal collision
    if (
        this.x + this.width > platform.x &&
        this.x < platform.x + platform.width &&
        this.y + this.height > platform.y &&
        this.y < platform.y + platform.height
    ) {
      if (this.xSpeed > 0) {
        this.x = platform.x - this.width;
      } else if (this.xSpeed < 0) {
        this.x = platform.x + platform.width;
      }
      this.xSpeed = 0;
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
    noStroke();
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
