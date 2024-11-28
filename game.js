let player;
let platforms = [];
let gravity = 0.4;
let friction = 0.95;
let jumpStrength = -10;
let gameState = "level1"

function setup() {
  createCanvas(1879 , 1009);

  player = new Player();
  setupLevel1();

  // Create platforms
  platforms.push(new Platform(0, height - 350, 250, 350));
  platforms.push(new Platform(250, height - 50, 150, 50));
  platforms.push(new Platform(400, height - 350, 150, 350));
  platforms.push(new Platform(550, height - 430, 150, 430));
  platforms.push(new Platform(700, height - 480, 150, 550));
  platforms.push(new Platform(850, height - 300, 150, 300));
  platforms.push(new Platform(1000, height - 400, 150, 400));
  platforms.push(new Platform(1150, height - 450, 150, 450));
  platforms.push(new Platform(1300, height - 350, 580, 350));
}

function draw() {
  background(135, 206, 250); // Sky color

  switch (gameState) {
    case "level1":
      drawLevel1();
      break;
    case "level2":
      drawLevel2();
      break;
  }

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


function setupLevel1() {
  platforms = [];
  platforms.push(new Platform(0, height - 350, 250, 350));
  platforms.push(new Platform(250, height - 50, 150, 50));
  platforms.push(new Platform(400, height - 350, 150, 350));
  platforms.push(new Platform(550, height - 430, 150, 430));
  platforms.push(new Platform(700, height - 480, 150, 550));
  platforms.push(new Platform(850, height - 300, 150, 300));
  platforms.push(new Platform(1000, height - 400, 150, 400));
  platforms.push(new Platform(1150, height - 450, 150, 450));
  platforms.push(new Platform(1300, height - 350, 580, 350));
}

function setupLevel2() {
  platforms = [];
  //ground platforms
  platforms.push(new Platform(0, height - 400, 250, 400));
  platforms.push(new Platform(250, height - 500, 150, 500));
  platforms.push(new Platform(400, height - 380, 130, 380));
  platforms.push(new Platform(530, height - 300, 110, 300));
  platforms.push(new Platform(640, height - 50, 220, 50));
  platforms.push(new Platform(860, height - 300, 100, 300));
  platforms.push(new Platform(960, height - 420, 130, 420));
  platforms.push(new Platform(1090, height - 460, 150, 460));
  platforms.push(new Platform(1240, height - 500, 110, 500));
  platforms.push(new Platform(1350, height - 50,  150, 50));
  platforms.push(new Platform(1500, height - 550,  150, 550));
  platforms.push(new Platform(1650, height - 600,  230, 600));

  //floating platforms
  platforms.push(new Platform(0, height - 850, 400, 100));
  platforms.push(new Platform(0, height - 750, 300, 50));
  platforms.push(new Platform(0, height - 700, 120, 70));

  platforms.push(new Platform(640, height - 800, 220, 80));
  platforms.push(new Platform(695, height - 720, 110, 50));

  platforms.push(new Platform(1300, height - 750, 300, 50));
  platforms.push(new Platform(1200, height - 800, 350, 50));

  // Reset player position
  player.x = 50;
  player.y = height - 450;
}

function drawLevel1() {
  player.applyGravity();
  player.update();
  player.display();
  for (let platform of platforms) {
    platform.display();
  }
  for (let platform of platforms) {
    player.checkCollision(platform);
  }
  if (player.x >= 1800) {
    gameState = "level2";
    setupLevel2();
  }
}

function drawLevel2() {
  player.applyGravity();
  player.update();
  player.display();
  for (let platform of platforms) {
    platform.display();
  }
  for (let platform of platforms) {
    player.checkCollision(platform);
  }

}


// Player class
class Player {
  constructor() {
    this.x = 50;
    this.y = height - 450;
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

    // Troubleshooting: rectangle floats, doesn't fall down
    // Make the player fall if it reaches x >= 250
    if (this.x >= 250) {
      this.onGround = false;
    }
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
