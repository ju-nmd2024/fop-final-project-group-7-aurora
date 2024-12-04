let player;
let platforms = [];
let gravity = 0.8;
let friction = 0.5;
let jumpStrength = -15;
let gameLevel;
let screenState = "Menu";
let levels = new Map();
let screens = new Map();
let win = {
    level: "Aurora",
    condition: () => player.x <= levels.get(win.level).gameField.width / 2 - player.width / 2

}
let aspectRatio = 16 / 9;
let baseSize = {};
baseSize.width = 1920;
baseSize.height = baseSize.width / aspectRatio;
console.log(baseSize);

function calculateCanvasSize() {
    return new Promise((setSize) => {
        if (windowWidth / windowHeight > aspectRatio) {
            setSize({width: windowHeight * aspectRatio, height: windowHeight});
        } else {
            setSize({width: windowWidth, height: windowWidth / aspectRatio});
        }
    });
}

function scaleCanvas(reverse = false) {
    let scaleValue = min(width / baseSize.width, height / baseSize.height);
    translate(width / 2, height / 2);
    scale(reverse ? 1 / scaleValue : scaleValue);
    translate(-width / 2, -height / 2);
}

function resetGameSettings() { // Reset game settings
    gameLevel = "Level 1";
    screenState = "Game";
    player.alive = true;
    levels.get(gameLevel).setup();
}

function windowResized() {
    calculateCanvasSize().then((size) => {
        resizeCanvas(size.width, size.height);
    });
}

function setup() {
    calculateCanvasSize().then((size) => {
        createCanvas(size.width, size.height);
    });

    player = new Player();

    levels.set("Level 1", new Level("Level 1",
        {
          width: 1879,
          height: 1200
      },
      (gameField) => { return {
        platforms: [
            new Platform(0, gameField.height - 250, 160, 350),
            new Platform(300, gameField.height - 400, 160, 400),
            new Platform(460, gameField.height - 475, 160, 475),
            new Platform(620, gameField.height - 550, 160, 550),
            new Platform(840, gameField.height - 700, 150, 50),
            new Platform(1040, gameField.height - 600, 150, 50),
            new Platform(1250, gameField.height - 600, 150, 50),
            new Platform(1450, gameField.height - 700, 150, 50),
            new Platform(1750, gameField.height - 750, 150, 50),
            new Platform(1040, gameField.height - 450, 360, 450),
            new Platform(1600, gameField.height - 450, 360, 450)
        ],
        spikes: [
          new Spike(430, gameField.height - 400, 30, 60),
          new Spike(590, gameField.height - 475, 30, 60),
          new Spike(750, gameField.height - 550, 30, 60),
          new Spike(1055, gameField.height - 450, 30, 60),

          new Spike(1085, gameField.height - 450, 30, 60),
          new Spike(1115, gameField.height - 450, 30, 60),
          new Spike(1145, gameField.height - 450, 30, 60),
          new Spike(1175, gameField.height - 450, 30, 60),
          new Spike(1205, gameField.height - 450, 30, 60),
          new Spike(1235, gameField.height - 450, 30, 60),

          new Spike(1265, gameField.height - 450, 30, 60),
          new Spike(1295, gameField.height - 450, 30, 60),
          new Spike(1325, gameField.height - 450, 30, 60),
          new Spike(1355, gameField.height - 450, 30, 60),
          new Spike(1385, gameField.height - 450, 30, 60),

          new Spike(1385, gameField.height - 600, 30, 60),
          new Spike(1355, gameField.height - 600, 30, 60),
          new Spike(1055, gameField.height - 600, 30, 60),
          new Spike(1085, gameField.height - 600, 30, 60),


          new Spike(1650, gameField.height - 450, 30, 60),
          new Spike(1620, gameField.height - 450, 30, 60),
          new Spike(1680, gameField.height - 450, 30, 60),
          new Spike(1710, gameField.height - 450, 30, 60),
          new Spike(1740, gameField.height - 450, 30, 60),


        ],
      }},
      (gameField) => { return {
        x: 50,
        y: gameField.height - 450
      }},
      (gameField) => { return {
        x: 0,
        y: -50,
        zoom: 1.3
      }},
      (gameField) => { return {
        name: "Level 2",
        condition: () => player.x >= 1800
      }}

    ))

  levels.set("Level 2", new Level("Level 2",
      {
          width: 1879,
          height: 1200
      },
      (gameField) => { return {
        platforms: [
          new Platform(0, gameField.height - 500, 150, 50),
          new Platform(0, gameField.height - 500, 150, 50),
          new Platform(200, gameField.height - 300, 400, 400),
          new Platform(750, gameField.height - 400, 200, 50),
          new Platform(1300, gameField.height - 400, 250, 500),
          new Platform(1730, gameField.height - 600, 150, 50),
          new Platform(1350, gameField.height - 800, 250, 50),
          new Platform(1250, gameField.height - 850, 250, 50),
          new Platform(900, gameField.height - 750, 200, 50),
          new Platform(500, gameField.height - 850, 150, 50),
          new Platform(0, gameField.height - 900, 250, 50)
        ],
        spikes: [
          new Spike(400, gameField.height - 300, 30, 60),
          new Spike(370, gameField.height - 300, 30, 60),
          new Spike(430, gameField.height - 300, 30, 60),
          new Spike(915, gameField.height - 750, 30, 60),
          new Spike(1085, gameField.height - 750, 30, 60),
        ],
        enemies: [
          new Enemy(1425, gameField.height - 400, 50, 2, 250),
        ]
      }},
      (gameField) => { return {
        x: 50,
        y: gameField.height - 600
      }},
      (gameField) => { return {
        x: 0,
        y: -50,
        zoom: 1.3
      }},
      (gameField) => { return {
        name: "Level 3",
        condition: () => player.x <= 50 && player.y <= gameField.height - 900
      }}

  ))

  levels.set("Level 3", new Level("Level 3",
      {
          width: 1879,
          height: 1200
      },
      (gameField) => { return {
        platforms: [
          new Platform(1690, gameField.height - 100, 250, 200),
          new Platform(1300, gameField.height - 30, 400, 30),
          new Platform(990, gameField.height - 950, 310, 950),
          new Platform(1370, gameField.height - 200, 150, 50),
          new Platform(1600, gameField.height - 850, 350, 500),
          new Platform(1500, gameField.height - 400, 150, 50),
          new Platform(1300, gameField.height - 550, 100, 50),
          new Platform(1500, gameField.height - 750, 100, 50),
          new Platform(850, gameField.height - 1000, 300, 50),
          new Platform(1150, gameField.height - 980, 50, 40),
          new Platform(930, gameField.height - 950, 80, 50),
          new Platform(500, gameField.height - 1100, 200, 50),
          new Platform(150, gameField.height - 850, 250, 50),
          new Platform(600, gameField.height - 650, 250, 50),
          new Platform(250, gameField.height - 350, 250, 50),
          new Platform(0, gameField.height - 100, 150, 1500),
          new Platform(150, gameField.height - 30, 850, 30)

        ],
        spikes: [
          new Spike(1315, gameField.height - 30, 30, 60),
          new Spike(1345, gameField.height - 30, 30, 60),
          new Spike(1375, gameField.height - 30, 30, 60),
          new Spike(1405, gameField.height - 30, 30, 60),
          new Spike(1435, gameField.height - 30, 30, 60),
          new Spike(1465, gameField.height - 30, 30, 60),
          new Spike(1495, gameField.height - 30, 30, 60),
          new Spike(1525, gameField.height - 30, 30, 60),
          new Spike(1555, gameField.height - 30, 30, 60),
          new Spike(1585, gameField.height - 30, 30, 60),
          new Spike(1615, gameField.height - 30, 30, 60),
          new Spike(1645, gameField.height - 30, 30, 60),
          new Spike(1675, gameField.height - 30, 30, 60),
          new Spike(865, gameField.height - 1000, 30, 60),
          new Spike(895, gameField.height - 1000, 30, 60),
          new Spike(925, gameField.height - 1000, 30, 60),
          new Spike(830, gameField.height - 650, 30, 60),
          new Spike(615, gameField.height - 650, 30, 60),
          new Spike(375, gameField.height - 350, 30, 60),
          new Spike(165, gameField.height - 30, 30, 60),
          new Spike(195, gameField.height - 30, 30, 60),
          new Spike(225, gameField.height - 30, 30, 60),
          new Spike(255, gameField.height - 30, 30, 60),
          new Spike(285, gameField.height - 30, 30, 60),
          new Spike(315, gameField.height - 30, 30, 60),
          new Spike(345, gameField.height - 30, 30, 60),
          new Spike(375, gameField.height - 30, 30, 60),
          new Spike(405, gameField.height - 30, 30, 60),
          new Spike(435, gameField.height - 30, 30, 60),
          new Spike(465, gameField.height - 30, 30, 60),
          new Spike(495, gameField.height - 30, 30, 60),
          new Spike(525, gameField.height - 30, 30, 60),
          new Spike(555, gameField.height - 30, 30, 60),
          new Spike(585, gameField.height - 30, 30, 60),
          new Spike(615, gameField.height - 30, 30, 60),
          new Spike(645, gameField.height - 30, 30, 60),
          new Spike(675, gameField.height - 30, 30, 60),
          new Spike(705, gameField.height - 30, 30, 60),
          new Spike(735, gameField.height - 30, 30, 60),
          new Spike(765, gameField.height - 30, 30, 60),
          new Spike(795, gameField.height - 30, 30, 60),
          new Spike(825, gameField.height - 30, 30, 60),
          new Spike(855, gameField.height - 30, 30, 60),
          new Spike(885, gameField.height - 30, 30, 60),
          new Spike(915, gameField.height - 30, 30, 60),
          new Spike(945, gameField.height - 30, 30, 60),
          new Spike(975, gameField.height - 30, 30, 60),

        ],
        enemies: [
          new Enemy(1750, gameField.height - 850, 50, 2, 250),
          new Enemy(275, gameField.height - 850, 50, 2, 250),
        ]
      }},
      (gameField) => { return {
        x: 1780,
        y: gameField.height - 250
      }},
      (gameField) => { return {
        x: 0,
        y: -30,
        zoom: 1.3
      }},
      (gameField) => { return {
        name: "Aurora",
        condition: () => player.x <= 20 && player.y <= gameField.height - 100
      }}

  ))

  levels.set("Aurora", new Level("Aurora",
      {
          width: baseSize.width,
          height: baseSize.height
      },
      (gameField) => { return {
        platforms: [
          new Platform(0, gameField.height - 300, gameField.width, 300)
        ],
      }},
      (gameField) => { return {
        x: gameField.width - 100,
        y: gameField.height - 380
      }},
      (gameField) => { return {
        x: 0,
        y: -70,
        zoom: 1
      }}

  ))
    screens.set("Menu", new Screen("Menu", () => {
        fill(0);
        textSize(50);
        textAlign("center", "center");
        text("Starlit Wanderer", width / 2, height / 2 - 500);
    }));

    screens.set("Game Over", new Screen("Game Over", () => {
        levels.get(gameLevel).draw(false);
        fill(0);
        textSize(50);
        textAlign("center", "center");
        text("Game Over", width / 2, height / 2 - 100);
    }));

    screens.set("Win", new Screen("Win", () => {
        levels.get(gameLevel).draw(false);
        fill(0);
        textSize(50);
        textAlign("center", "center");
        text("You Won!", width / 2, height / 2 - 100);
    }));

    screens.set("Game", new Screen("Game", () => {
        fill(0);
        textSize(50);
        text(levels.get(gameLevel).name, width / 2 - 900, height / 2 - 450);
        levels.get(gameLevel).draw();
    }));

}

function draw() {
  background(135, 206, 250); // Sky color
  push()
  scaleCanvas();
  screens.get(screenState).display();
  pop();

}

// Key press for jump
function keyPressed() {
    switch (keyCode) {
        case 32: //SPACE
            switch (screenState) {
                case "Game":
                    player.jump();
                    break;
                case "Menu":
                    resetGameSettings();
                    break;
            }
            break;
        case 82: //R
            switch (screenState) {
                case "Game":
                case "Game Over":
                case "Win":
                    resetGameSettings();
                    break;
            }
            break;
        case 27: //ESC
            switch (screenState) {
                case "Game":
                case "Game Over":
                case "Win":
                    screenState = "Menu";
                    break;
            }
            break;
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
    alive;

  constructor() {
    this.x = 50;
    this.y = height - 450;
    this.width = 50;
    this.height = 50;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.onGround = false;
    this.canDoubleJump = true; // Allow double jump
    this.alive = true;

  }
  kill() {
      screenState = "Game Over";
      this.alive = false;

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
      //this.xSpeed = 0;
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
        player.kill();
      }
    }
  }

  isOnGround(platforms) {
    for (let platform of platforms) {
      if (
          this.y + this.height === platform.y &&
          this.x + this.width > platform.x &&
          this.x < platform.x + platform.width
      ) return true;
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
   * @param gameField {{width: number, height: number}}
   */
  borderAdjust(gameField) {
     this.x = constrain(this.x, 0, gameField.width - this.width);
     this.y = constrain(this.y, 0, gameField.height);
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

    /**
     * Checks if the midpoint of the element is between the sides of the player
     * @param player {Player} the player object
     * @returns {boolean}
     */
  isBetweenSides(player) {
    return (
        player.y + player.height >= this.y - this.height &&
        player.y + player.height <= this.y &&
        player.x <= this.x &&
        player.x + player.width >= this.x
    );
  }
    /**
     * Check if two rectangles are overlapping
     * @param player {Player} the player object
     * @param platform {Platform} the platform object
     * @returns {boolean}
     */
    static isOverlapping(player, platform) {
        return (
            player.y <= platform.y + platform.height &&
            player.y + player.height >= platform.y &&
            player.x <= platform.x + platform.width &&
            player.x + player.width >= platform.x
        );
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
        if (dist(corner.x, corner.y, enemy.x, enemy.y) <= enemy.height && corner.y >= enemy.y) return true;
      }
      return enemy.isBetweenSides(player);
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
    let top = spike.y - spike.height;

    for (let corner in player.corners()) {
      corner = player.corners()[corner];

      let left = -slope * (corner.x - spike.x) + top; // Left slope equation
      let right = slope * (corner.x - spike.x) + top; // Right slope equation

      if (
        corner.y >= left &&
        corner.y >= right &&
        corner.y <= spike.y &&
        corner.y >= top
      ) {
        return true;
      }
    }
    return spike.isBetweenSides(player);
  }
}

/**
 * Level object
 * @property {string} name - The name of the level
 * @property {{platforms?: Platform[], spikes?: Spike[], enemies?: Enemy[]}} elements - The elements of the level
 * @property {{width: number, height: number}} gameField - The gameField of the level
 * @property {{name: string, condition: function: {name: string, condition: function}}} nextLevel - The next level
 * @property {{x: number, y: number}} playerPosition - The player position
 * @property {{x: number, y: number}} cameraPosition - The camera position
 */
class Level {
  name;
  elements;
  gameField;
  playerPosition;
  cameraPosition;
  nextLevel;

    /**
     *
     * @param name {string}
     * @param gameField {{width: number, height: number}}
     * @param elements {function(gameField): {platforms?: Platform[], spikes?: Spike[], enemies?: Enemy[]}}
     * @param playerPosition {function(gameField): {x: number, y: number}}
     * @param cameraPosition {function(gameField): {x: number, y: number}}
     * @param nextLevel {function(gameField): {name: string, condition: function}}
     */
  constructor(name, gameField, elements, playerPosition, cameraPosition, nextLevel = null) {
    this.name = name;
    this.gameField = gameField;
    this.elements = elements(this.gameField);
    this.playerPosition = playerPosition(this.gameField);
    this.cameraPosition = cameraPosition(this.gameField);
    this.nextLevel = nextLevel;
    if (this.nextLevel !== null) this.nextLevel = nextLevel(this.gameField);


  }

    setupCamera(player) {
        translate(width / 2 - this.cameraPosition.x, height / 2 - this.cameraPosition.y);
        scale(this.cameraPosition.zoom * (width / this.gameField.width));
        translate(
            - constrain(player.x, width / (2 * this.cameraPosition.zoom * (width / this.gameField.width)), this.gameField.width - width / (2 * this.cameraPosition.zoom * (width / this.gameField.width))),
            - constrain(player.y, height / (2 * this.cameraPosition.zoom * (width / this.gameField.width)), this.gameField.height - height / (2 * this.cameraPosition.zoom * (width / this.gameField.width))),
        );
    }

  draw(play = true){
      push();
      scaleCanvas(true);
      this.setupCamera(player);

    // Display the elements (platforms, enemies etc.)
    for (let elements in this.elements) {
      elements = this.elements[elements];
      if(elements instanceof Array) for (let element of elements) {
        element.display();
      }
    }

    if (play) {
        player.update();
        // Apply gravity to player
        player.applyGravity();

        player.borderAdjust(this.gameField);

        // Check for collision with platforms
        player.platformCollisionAdjustAll(this.elements.platforms);
        player.deadlyCollision(this.elements.enemies, "enemy");
        player.deadlyCollision(this.elements.spikes, "spike");

        if (player.y + player.height >= this.gameField.height) {
            player.kill();
        }

        if (gameLevel === win.level && win.condition()) {
            screenState = "Win";
        }

        if (this.nextLevel !== null && this.nextLevel.condition()) {
            gameLevel = this.nextLevel.name;
            levels.get(this.nextLevel.name).setup()
        }

        // Move player
    }

    // Display player
    player.display();
    pop();

  }

  setup(){
    player.x = this.playerPosition.x;
    player.y = this.playerPosition.y;

  }
}


/**
 * Screen object
 * @property {string} name - The name of the screen
 * @property {function} display - The function to display the screen
 */
class Screen {
    name;
    display;

    /**
     *
     * @param name {string} The name of the screen
     * @param run {function} The function being run when displaying the screen
     */
    constructor(name, run) {
        this.name = name;
        this.display = () => {
            run();
            return this;
        };
    }
}