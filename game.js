let player;
let platforms = [];
let gravity = 0.8;
let friction = 0.2;
let jumpStrength = -15;
let gameState = "Level 3";
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
          //this is where you draw the spikes
        ],
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
          //this is where you draw the spikes
        ],
        enemies: [
          new Enemy(1425, height - 400, 50, 2, 250),
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
            //testing
            new Spike(350, height - 350, 40, 40),
            //this is where you draw the spikes
        ],
        enemies: [
          new Enemy(275, height - 850, 50, 2, 250),
          new Enemy(1750, height - 850, 50, 2, 250),
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
  levels.get(gameState).draw();

}

// Key press for jump
function keyPressed() {
  if (keyCode === 32) {
    // Space bar
    player.jump();
  }
}

/**
 * Player object
 * @property {number} x - The x coordinate of the player
 * @property {number} y - The y coordinate of the player
 * @property {number} width - The width of the player
 * @property {number} height - The height of the player
 * @property {number} xSpeed - The speed of the player in the x direction
 * @property {number} ySpeed - The speed of the player in the y direction
 * @property {boolean} onGround - Whether the player is on the ground
 * @property {boolean} canDoubleJump - Whether the player can double jump
 *
 */
class Player {
    x;
    y;
    width;
    height;
    xSpeed;
    ySpeed;
    onGround;
    canDoubleJump;

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

  corners() {
    return {
      topLeft: {x: this.x, y: this.y},
      topRight: {x: this.x + this.width, y: this.y},
      bottomLeft: {x: this.x, y: this.y + this.height},
      bottomRight: {x: this.x + this.width, y: this.y + this.height}
    }
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

  platformCollisionAdjustAll(platforms) {
    for (let platform of platforms) {
      if (this.checkCollision(platform, "platform")) this.platformCollisionAdjust(platform);
    }
    this.groundReset(platforms);
  }

  deadlyCollision(elements, type) {

    if (elements instanceof Array) for (let element of elements) {
      if (this.checkCollision(element, type)) {
        console.log("You died");
      }
    }
  }

  isOnGround(platforms) {
    for (let platform of platforms) {
      if (this.y + this.height === platform.y && this.x + this.width > platform.x && this.x < platform.x + platform.width) return true;
    }
    return false;
  }

  platformCollisionAdjust(platform) {
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

  checkCollision(element, type) {
    switch (type) {
        case "platform":
            return Platform.isOverlapping(this, element);
        case "spike":
            return Spike.isOverlapping(this, element);
        case "enemy":
            return Enemy.isOverlapping(this, element);
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

/**
 * Element object
 * @property {number} x - The x coordinate of the element
 * @property {number} y - The y coordinate of the element
 * @property {number} width - The width of the element
 * @property {number} height - The height of the element
 */
class Element {
  x;
  y;
  width;
  height;

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

/**
 * Platform object
 * @property {number} x - The x coordinate of the platform
 * @property {number} y - The y coordinate of the platform
 * @property {number} width - The width of the platform
 * @property {number} height - The height of the platform
 */
class Platform extends Element {

  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  display() {
    noStroke();
    fill(48, 25, 52);
    rect(this.x, this.y, this.width, this.height);
  }

  /**
   * Check if two rectangles are overlapping
   * @param player {Player} the player object
   * @param platform {Platform} the platform object
   * @returns {boolean}
   */
  static isOverlapping(player, platform) {
    return (
        player.x < platform.x + platform.width &&
        player.x + player.width > platform.x &&
        player.y < platform.y + platform.height &&
        player.y + player.height > platform.y
    );
  }
}

/**
 * Enemy object
 * @property {number} x - The x coordinate of the enemy
 * @property {number} y - The y coordinate of the enemy
 * @property {number} width - The width of the enemy
 * @property {number} height - The height of the enemy
 * @property {number} speed - The speed of the enemy
 * @property {number} moveRange - The range of the enemy's movement
 * @property {number} baseX - The original x coordinate of the enemy
 */
class Enemy extends Element {
    speed;
    moveRange;
    baseX;

    constructor(x, y, radius, speed, moveRange) {
        super(x, y, 2 * radius, radius);
        this.speed = speed;
        this.moveRange = moveRange;
        this.baseX = x;
    }

    display() {
        noStroke();
        fill(93, 63, 211);
        this.move();
        arc(this.x, this.y, this.width, 2 * this.height, PI, 0);
    }

    move() {
        this.x = this.baseX + (this.moveRange - this.width) / 2 * sin(frameCount / 100 * this.speed);
    }

    static isOverlapping(player, enemy) {

      for (let corner in player.corners()) {
        corner = player.corners()[corner];
        if (dist(corner.x, corner.y, enemy.x, enemy.y) <= enemy.height  && corner.y >= enemy.y) return true;
      }
      if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x && player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) return true;
      return false;

    }
}

class Spike extends Element {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  display() {
    noStroke();
    fill(255, 0, 0);
    triangle(this.x - this.width / 2, this.y, this.x, this.y - this.height, this.x + this.width / 2, this.y);
  }

  static isOverlapping(player, spike) {
    let slope = spike.height / (spike.width / 2);

    for (let corner in player.corners()) {
      corner = player.corners()[corner];

      let top = spike.y - spike.height;
      let left = -slope * (corner.x - spike.x) + top; // Left slope equation
      let right = slope * (corner.x - spike.x) + top; // Right slope equation

      if (
          corner.y >= left &&
          corner.y >= right &&
          corner.y <= spike.y
      ) {
        return true;
      }
    }
    return false;
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
    for (let elements in this.elements) {
      elements = this.elements[elements];
      if(elements instanceof Array) for (let element of elements) {
        element.display();
      }
    }

    player.borderAdjust(this.borders);

    // Check for collision with platforms
    player.platformCollisionAdjustAll(this.elements.platforms);
    player.deadlyCollision(this.elements.enemies, "enemy");
    player.deadlyCollision(this.elements.spikes, "spike");

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