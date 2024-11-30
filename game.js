let player;
let platforms = [];
let gravity = 0.4;
let friction = 0.8;
let jumpStrength = -10;
let gameState = "level1";

function setup() {
  createCanvas(1879, 1200);

  player = new Player();
  setupLevel3();
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
    case "level3":
      drawLevel3();
      break;
    case "aurora":
      drawAurora();
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
  platforms.push(new Platform(0, height - 250, 160, 350));
  platforms.push(new Platform(300, height - 400, 160, 400));
  platforms.push(new Platform(460, height - 475, 160, 475));
  platforms.push(new Platform(620, height - 550, 160, 550));
  platforms.push(new Platform(840, height - 700, 150, 50));
  platforms.push(new Platform(1040, height - 600, 150, 50));
  platforms.push(new Platform(1250, height - 600, 150, 50));
  platforms.push(new Platform(1450, height - 700, 150, 50));
  platforms.push(new Platform(1750, height - 750, 150, 50));
  platforms.push(new Platform(1040, height - 450, 360, 450));
  platforms.push(new Platform(1600, height - 450, 360, 450));
}

function setupLevel2() {
  platforms = [];
  //ground platforms
  platforms.push(new Platform(0, height - 500, 150, 50));
  platforms.push(new Platform(0, height - 500, 150, 50));
  platforms.push(new Platform(200, height - 300, 400, 400));
  platforms.push(new Platform(750, height - 400, 200, 50));
  platforms.push(new Platform(1300, height - 400, 250, 500));
  platforms.push(new Platform(1730, height - 600, 150, 50));
  platforms.push(new Platform(1350, height - 800, 250, 50));
  platforms.push(new Platform(1250, height - 850, 250, 50));
  platforms.push(new Platform(900, height - 750, 200, 50));
  platforms.push(new Platform(500, height - 850, 150, 50));
  platforms.push(new Platform(0, height - 900, 250, 50));

  // Reset player position
  player.x = 50;
  player.y = height - 600;
}

function setupLevel3() {
  platforms = [];

  platforms.push(new Platform(1700, height - 100, 200, 200));
  platforms.push(new Platform(1300, height - 30, 400, 200));
  platforms.push(new Platform(1000, height - 950, 300, 950));
  platforms.push(new Platform(1370, height - 200, 150, 50));
  platforms.push(new Platform(1600, height - 850, 350, 500));
  platforms.push(new Platform(1500, height - 400, 150, 50));
  platforms.push(new Platform(1300, height - 550, 100, 50));
  platforms.push(new Platform(1500, height - 750, 100, 50));
  platforms.push(new Platform(850, height - 1000, 300, 50));
  platforms.push(new Platform(500, height - 1100, 200, 50));
  platforms.push(new Platform(150, height - 850, 250, 50));
  platforms.push(new Platform(600, height - 650, 250, 50));
  platforms.push(new Platform(250, height - 350, 250, 50));
  platforms.push(new Platform(0, height - 100, 150, 1500));
  platforms.push(new Platform(0, height - 100, 150, 1500));
  platforms.push(new Platform(250, height - 50, 750, 1500));

  // Reset player position
  player.x = 1780;
  player.y = height - 250;
}

function setupAurora() {
  platforms = [];

  platforms.push(new Platform(0, height - 300, width, 300));

  // Reset player position
  player.x = 25;
  player.y = height - 150;
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
  if (player.x <= 50 && player.y <= height - 900) {
    gameState = "level3";
    setupLevel3();
  }
}

function drawLevel3() {
  player.applyGravity();
  player.update();
  player.display();
  for (let platform of platforms) {
    platform.display();
  }
  for (let platform of platforms) {
    player.checkCollision(platform);
  }
  if (player.x <= 50 && player.y <= height - 300) {
    gameState = "aurora";
    setupAurora();
  }
}

function drawAurora() {
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
    this.canDoubleJump = true; // Allow double jump
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
    // this.x = constrain(this.x, 0, width);

    // Make the player fall based on the game state
    if (gameState === "level1" && this.x >= 100) {
      this.onGround = false;
    } else if (gameState === "level2" && this.x >= 100) {
      this.onGround = false;
    } else if (gameState === "level3" && this.x <= width) {
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
      this.canDoubleJump = true; // Reset double jump
    } else if (this.canDoubleJump) {
      this.ySpeed = jumpStrength;
      this.canDoubleJump = false; // Disable double jump after use
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
      this.canDoubleJump = true; // Reset double jump when landing
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
    fill(48, 25, 52);
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
