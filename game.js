let player;
let platforms = [];
let gravity = 0.8;
let friction = 0.2;
let jumpStrength = -15;
let gameState = "level3";

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

  player.collisionAdjustAll(platforms);

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
  platforms.push(new Platform(1300, height - 30, 400, 30));
  platforms.push(new Platform(1000, height - 950, 300, 950));
  platforms.push(new Platform(1370, height - 200, 150, 50));
  platforms.push(new Platform(1600, height - 850, 350, 500));
  platforms.push(new Platform(1500, height - 400, 150, 50));
  platforms.push(new Platform(1300, height - 550, 100, 50));
  platforms.push(new Platform(1500, height - 750, 100, 50));
  platforms.push(new Platform(850, height - 1000, 300, 50));
  platforms.push(new Platform(1150, height - 980, 50, 40));
  platforms.push(new Platform(930, height - 950, 80, 50));
  platforms.push(new Platform(500, height - 1100, 200, 50));
  platforms.push(new Platform(150, height - 850, 250, 50));
  platforms.push(new Platform(600, height - 650, 250, 50));
  platforms.push(new Platform(250, height - 350, 250, 50));
  platforms.push(new Platform(0, height - 100, 150, 1500));
  platforms.push(new Platform(0, height - 100, 150, 1500));
  platforms.push(new Platform(150, height - 30, 850, 30));

  // Reset player position
  player.x = 1780;
  player.y = height - 250;
  player.onGround = false;
}

function setupAurora() {
  platforms = [];

  platforms.push(new Platform(0, height - 300, width, 300));

  // Reset player position
  player.x = 25;
  player.y = height - 150;
}

function drawLevel1() {
  /*player.applyGravity();
  player.update();
  player.display();
  for (let platform of platforms) {
    platform.display();
  }
  for (let platform of platforms) {
    player.checkCollision(platform);
  }*/
  if (player.x >= 1800) {
    gameState = "level2";
    setupLevel2();
  }
}

function drawLevel2() {
  /*player.applyGravity();
  player.update();
  player.display();
  for (let platform of platforms) {
    platform.display();
  }
  for (let platform of platforms) {
    player.checkCollision(platform);
  }*/
  if (player.x <= 50 && player.y <= height - 900) {
    gameState = "level3";
    setupLevel3();
  }
}

function drawLevel3() {
  /*player.applyGravity();
  player.update();
  player.display();
  for (let platform of platforms) {
    platform.display();
  }
  for (let platform of platforms) {
    player.checkCollision(platform);
  }*/
  if (player.x <= 50 && player.y <= height - 300) {
    gameState = "aurora";
    setupAurora();
  }
}

function drawAurora() {
  /*player.applyGravity();
  player.update();
  player.display();
  for (let platform of platforms) {
    platform.display();
  }
  for (let platform of platforms) {
    player.checkCollision(platform);
  }*/
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
    switch (true) {
      case keyIsDown(LEFT_ARROW):
        this.xSpeed = -5;
        break;
      case keyIsDown(RIGHT_ARROW):
        this.xSpeed = 5;
        break;
      default:
        switch (true) {
          case this.xSpeed > 0:
            if (this.xSpeed > friction) {
              this.xSpeed -= friction;
            } else {
              this.xSpeed = 0;
            }
            break;
          case this.xSpeed < 0:
            if (- this.xSpeed > friction) {
              this.xSpeed += friction;
            } else {
              this.xSpeed = 0;
            }
            break;
        }
    }



    this.x += this.xSpeed;
    this.y += this.ySpeed;

    // Make sure the player stays within bounds horizontally
    // this.x = constrain(this.x, 0, width);

    // Make the player fall based on the game state
    /*if (gameState === "level1" && this.x >= 100) {
      this.onGround = false;
    } else if (gameState === "level2" && this.x >= 100) {
      this.onGround = false;
    } else if (gameState === "level3" && this.x <= width) {
      this.onGround = false;
    }*/
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

  groundReset(platforms) {
    if (this.isOnGround(platforms)) {
      this.onGround = true;
      this.ySpeed = 0;
      this.xSpeed = 0;
      this.canDoubleJump = true; // Reset double jump when landing
    } else {
      this.onGround = false;
    }

  }

  collisionAdjustAll(platforms) {
    for (let platform of platforms) {
      if (this.checkCollision(platform)) this.collisionAdjust(platform);
    }
    this.groundReset(platforms);
  }

  isOnGround(platforms) {
    for (let platform of platforms) {
      if (this.y + this.height === platform.y && this.x + this.width > platform.x && this.x < platform.x + platform.width) return true;
    }
    return false;
  }

  collisionAdjust(platform) {
    let overlap = {
      left: this.x + this.width - platform.x,
      right: platform.x + platform.width - this.x,
      top: this.y + this.height - platform.y,
      bottom: platform.y + platform.height - this.y
    }

    let minOverlap = Math.min(overlap.left, overlap.right, overlap.top, overlap.bottom)

    // position adjustment
    switch (minOverlap) { // the smallest overlap shows the most probable side
      case overlap.left:
        this.x -= overlap.left;
        break;
      case overlap.right:
        this.x += overlap.right;
        break;
      case overlap.top:
        this.y -= overlap.top;
        break;
      case overlap.bottom:
        this.y += overlap.bottom;
        break;
    }
  }

  checkCollision(platform) {
    return isOverlapping(this.x, this.y, this.width, this.height, platform.x, platform.y, platform.width, platform.height);

    /**
     * Check if two rectangles are overlapping
     * @param x1 {number} the x position of the first rectangle
     * @param y1 {number} the y position of the first rectangle
     * @param w1 {number} the width of the first rectangle
     * @param h1 {number} the height of the first rectangle
     * @param x2 {number} the x position of the second rectangle
     * @param y2 {number} the y position of the second rectangle
     * @param w2 {number} the width of the second rectangle
     * @param h2 {number} the height of the second rectangle
     * @returns {boolean}
     */
    function isOverlapping(x1, y1, w1, h1, x2, y2, w2, h2) {
      return (
          x1 < x2 + w2 &&
          x1 + w1 > x2 &&
          y1 < y2 + h2 &&
          y1 + h1 > y2
      );
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