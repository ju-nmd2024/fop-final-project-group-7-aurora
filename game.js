let player;
let platforms = [];
let gravity = 0.8;
let friction = 0.2;
let jumpStrength = -15;
let gameState = "Level 1";
let levels = new Map();


function setup() {
  createCanvas(1879, 1200);

  player = new Player();

  levels.set("Level 1", new Level("Level 1",
      {
        platforms: [
            new Platform(0, height - 250, 160, 350),
            new Platform(300, height - 400, 160, 400),
            new Platform(460, height - 475, 160, 475),
            new Platform(620, height - 550, 160, 550),
            new Platform(840, height - 700, 150, 50),
            new Platform(1040, height - 600, 150, 50),
            new Platform(1250, height - 600, 150, 50),
            new Platform(1450, height - 700, 150, 50),
            new Platform(1750, height - 750, 150, 50),
            new Platform(1040, height - 450, 360, 450),
            new Platform(1600, height - 450, 360, 450)
        ],
        spikes: [
            //needs spike class
        ],
        enemies: [
          //needs enemy class
        ]
      }, {
        left: 0,
        right: width,
        top: 0,
        bottom: height
      },
      {
        x: 50,
        y: height - 450
      },
      {
        x: 0,
        y: 0
      }, {
        name: "Level 2",
        condition: () => player.x >= 1800
      }

    ))

  levels.set("Level 2", new Level("Level 2",
      {
        platforms: [
          new Platform(0, height - 500, 150, 50),
          new Platform(0, height - 500, 150, 50),
          new Platform(200, height - 300, 400, 400),
          new Platform(750, height - 400, 200, 50),
          new Platform(1300, height - 400, 250, 500),
          new Platform(1730, height - 600, 150, 50),
          new Platform(1350, height - 800, 250, 50),
          new Platform(1250, height - 850, 250, 50),
          new Platform(900, height - 750, 200, 50),
          new Platform(500, height - 850, 150, 50),
          new Platform(0, height - 900, 250, 50)
        ],
        spikes: [
          //needs spike class
        ],
        enemies: [
          //needs enemy class
        ]
      }, {
        left: 0,
        right: width,
        top: 0,
        bottom: height
      },
      {
        x: 50,
        y: height - 600
      },
      {
        x: 0,
        y: 0
      }, {
        name: "Level 3",
        condition: () => player.x <= 50 && player.y <= height - 900
      }

  ))

  levels.set("Level 3", new Level("Level 3",
      {
        platforms: [
          new Platform(1700, height - 100, 200, 200),
          new Platform(1300, height - 30, 400, 30),
          new Platform(1000, height - 950, 300, 950),
          new Platform(1370, height - 200, 150, 50),
          new Platform(1600, height - 850, 350, 500),
          new Platform(1500, height - 400, 150, 50),
          new Platform(1300, height - 550, 100, 50),
          new Platform(1500, height - 750, 100, 50),
          new Platform(850, height - 1000, 300, 50),
          new Platform(1150, height - 980, 50, 40),
          new Platform(930, height - 950, 80, 50),
          new Platform(500, height - 1100, 200, 50),
          new Platform(150, height - 850, 250, 50),
          new Platform(600, height - 650, 250, 50),
          new Platform(250, height - 350, 250, 50),
          new Platform(0, height - 100, 150, 1500),
          new Platform(150, height - 30, 850, 30)

        ],
        spikes: [
          //needs spike class
        ],
        enemies: [
          //needs enemy class
        ]
      }, {
        left: 0,
        right: width,
        top: 0,
        bottom: height
      },
      {
        x: 1780,
        y: height - 250
      },
      {
        x: 0,
        y: 0
      }, {
        name: "Aurora",
        condition: () => player.x <= 20 && player.y <= height - 100
      }

  ))

  levels.set("Aurora", new Level("Aurora",
      {
        platforms: [
          new Platform(0, height - 300, width, 300)
        ],
        spikes: [
          //needs spike class
        ],
        enemies: [
          //needs enemy class
        ]
      }, {
        left: 0,
        right: width,
        top: 0,
        bottom: height
      },
      {
        x: width - 100,
        y: height - 380
      },
      {
        x: 0,
        y: 0
      }

  ))
  levels.get(gameState).setup()

}

function draw() {
  background(135, 206, 250); // Sky color
  console.log(gameState);
  levels.get(gameState).draw();

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

    // position adjustment
    switch (Math.min(overlap.left, overlap.right, overlap.top, overlap.bottom)) { // the smallest overlap shows the most probable side
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

  /**
   *
   * @param borders {{left: number, right: number, top: number, bottom: number}}
   */
  borderAdjust(borders) {
    if (this.x < borders.left) this.x = borders.left;
    if (this.x + this.width > borders.right) this.x = borders.right - this.width;
    if (this.y < borders.top) this.y = borders.top;
    if (this.y + this.height > borders.bottom) this.y = borders.bottom - this.height;
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

/**
 * Level object
 * @property {string} name - The name of the level
 * @property {{platforms?: Platform[], spikes?: Spike[], enemies?: Enemy[]}} elements - The elements of the level
 * @property {{left?: number, right?: number, top?: number, bottom?: number}} borders - The borders of the level
 * @property {{name: string, condition: function}} nextLevel - The next level
 * @property {{x: number, y: number}} playerPosition - The player position
 * @property {{x: number, y: number}} cameraPosition - The camera position
 */
class Level {
  name;
  elements;
  borders;
  playerPosition;
  cameraPosition;
  nextLevel;

  constructor(name, elements, borders, playerPosition, cameraPosition, nextLevel = null) {
    this.name = name;
    this.elements = elements;
    this.borders = borders;
    this.playerPosition = playerPosition;
    this.cameraPosition = cameraPosition;
    this.nextLevel = nextLevel;


  }
  draw(){
// Apply gravity to player
    player.applyGravity();

    // Move player
    player.update();

    // Display player
    player.display();

    // Display the elements (platforms, enemies etc.)
    for (const elements in this.elements) {
      if(this.elements[elements] instanceof Array) for (let element of this.elements[elements]) {
        element.display();
      }
    }

    player.borderAdjust(this.borders);

    // Check for collision with platforms
    player.collisionAdjustAll(this.elements.platforms);

    if (this.nextLevel !== null && this.nextLevel.condition()) {
      gameState = this.nextLevel.name;
      levels.get(this.nextLevel.name).setup()
    }

  }

  setup(){
    player.x = this.playerPosition.x;
    player.y = this.playerPosition.y;

  }
}