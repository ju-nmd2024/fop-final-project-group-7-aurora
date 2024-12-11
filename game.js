// Made by Adrienn Rátonyi Jönköping University, 2024
/**
 * the player object    //documentations: https://jsdoc.app
 * @type {Player}
 */
let player;

/**
 * the strength of the gravity
 * @type {number}
 */
let gravity = 0.8;  //Kajsa Granström helped me to start the project, some of the physics part was made by her - gravity, friction, jumpStrength

/**
 * the strength of the friction
 * @type {number}
 */
let friction = 0.5;

/**
 * the strength of the jump
 * @type {number}
 */
let jumpStrength = -15;

/**
 * the name of the current level
 * @type {string}
 */
let gameLevel;

/**
 * the name of the current screen
 * @type {string}
 */
let screenState = "Menu";

/**
 * the collection of the levels
 * @type {Map<string, Level>}
 */
let levels = new Map();   // map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
                                            //Bence Tuzson recommended it
/**
 * the collection of the screens
 * @type {Map<string, Screen>}
 */
let screens = new Map();

/**
 * the details of the win condition
 * @type {{condition: (function(): boolean), level: string}}
 */
let win = {
    level: "Aurora",
    condition: () => player.x <= levels.get(win.level).gameField.width / 2 - player.width / 2
};

/**
 * the aspect ratio of the canvas
 * @type {number}
 */
let aspectRatio = 16 / 9;

/**
 * the size to which the canvas is scaled
 * @type {{width: number, height: number}}
 */
let baseSize = {};
baseSize.width = 1920;
baseSize.height = baseSize.width / aspectRatio;

/**
 * The number of all and loaded assets
 * @type {{all: number, loaded: number}}
 */
let assets = {
    all: 0,
    loaded: 0
};

/**
 * Whether we are building the game (displays the otherwise transparent stuff, like the platforms, spikes and enemies)
 * @type {boolean}
 */
let building = false;

function setup() {
    calculateCanvasSize().then((size) => {
        createCanvas(size.width, size.height);
    });

    player = new Player(50, 90);

    // Levels setup
    levels.set("Level 1", new Level("Level 1",
        {
            width: 1879,
            height: 1200
        },
        (gameField) => {
            return {
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
            };
        },
        (gameField) => {
            return {
                x: 50,
                y: gameField.height - 450,
                orientation: "right"
            };
        },
        (gameField) => {
            return {
                x: 0,
                y: -50,
                zoom: 1.3
            };
        },
        {
            foreground: loadAsset("graphics/foregrounds/level1_foreground.png"),
            background: loadAsset("graphics/backgrounds/level1_background.png")
        },
        (gameField) => {
            return {
                name: "Level 2",
                condition: () => player.x >= 1800
            };
        }
    ));

    levels.set("Level 2", new Level("Level 2",  //GitHub Copilot autocompleted what I wanted to write based on level 1, then I pasted the elements
        {
            width: 1879,
            height: 1200
        },
        (gameField) => {
            return {
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
            };
        },
        (gameField) => {
            return {
                x: 50,
                y: gameField.height - 600,
                orientation: "right"
            };
        },
        (gameField) => {
            return {
                x: 0,
                y: -50,
                zoom: 1.3
            };
        },
        {
            foreground: loadAsset("graphics/foregrounds/level2_foreground.png"),
            background: loadAsset("graphics/backgrounds/level2_background.png")
        },
        (gameField) => {
            return {
                name: "Level 3",
                condition: () => player.x <= 50 && player.y <= gameField.height - 900
            };
        }
    ));

    levels.set("Level 3", new Level("Level 3",
        {
            width: 1879,
            height: 1200
        },
        (gameField) => {
            return {
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
            };
        },
        (gameField) => {
            return {
                x: 1780,
                y: gameField.height - 250,
                orientation: "left"
            };
        },
        (gameField) => {
            return {
                x: 0,
                y: -30,
                zoom: 1.3
            };
        },
        {
            foreground: loadAsset("graphics/foregrounds/level3_foreground.png"),
            background: loadAsset("graphics/backgrounds/level3_background.png")
        },
        (gameField) => {
            return {
                name: "Aurora",
                condition: () => player.x <= 20 && player.y <= gameField.height - 100
            };
        }
    ));

    levels.set("Aurora", new Level("Aurora",
        {
            width: baseSize.width,
            height: baseSize.height
        },
        (gameField) => {
            return {
                platforms: [
                    new Platform(0, gameField.height - 150, gameField.width, 300)
                ],
            };
        },
        (gameField) => {
            return {
                x: gameField.width - 100,
                y: gameField.height - 200,
                orientation: "left"
            };
        },
        (gameField) => {
            return {
                x: 0,
                y: 0,
                zoom: 1
            };
        },
        {
            foreground: loadAsset("graphics/foregrounds/aurora_foreground.png"),
            background: loadAsset("graphics/backgrounds/aurora_background.png")
        }
    ));

    // Screens setup
    screens.set("Game", new Screen("Game",{}, () => {
        levels.get(gameLevel).draw();
    }));

    screens.set("Game Over", new Screen("Game Over", {
        background: loadAsset("graphics/screens/game_over.png"),
    }));

    screens.set("Win", new Screen("Win", {
        foreground: loadAsset("graphics/screens/win.png"),
    }, () => {
        levels.get(gameLevel).draw(false);
    }));

    screens.set("Guide", new Screen("Guide", {
        background: loadAsset("graphics/screens/guide.png"),
    }));

    screens.set("Menu", new Screen("Menu", {
        background: loadAsset("graphics/screens/menu.png"),
    }));
}

/**
 * Loads an image and increases the number of loaded assets.
 * This is needed, since GitHub's page loads the images weirdly, so the images are not loaded when the game starts.
 * @param path {string} the path of the image
 * @returns {p5.Image | p5.Element | p5.Framebuffer}
 */
function loadAsset(path) {
    assets.all++;
    return loadImage(path, () => {    //loadImage:https://p5js.org/reference/p5/loadImage/
        assets.loaded++;
    });
}

/**
 * calculates and returns the supposed height and the width of the canvas
 * @returns {Promise<{width: number, height: number}>}
 */
function calculateCanvasSize() {
    return new Promise((setSize) => {    //promise: https://www.w3schools.com/js/js_promise.asp, Bence Tuzson recommended it
        if (windowWidth / windowHeight > aspectRatio) { // white on left-right
            setSize({width: windowHeight * aspectRatio, height: windowHeight});
        } else { // white on top-bottom
            setSize({width: windowWidth, height: windowWidth / aspectRatio});
        }
    });
}

/**
 * scales the contents to fit the canvas
 * @param reverse {boolean} whether the canvas should be scaled back to the original
 */
function scaleCanvas(reverse = false) { // scaling the canvas: https://chatgpt.com/share/6751bd73-509c-8000-9796-315ce017e062
    let scaleValue = min(width / baseSize.width, height / baseSize.height);
    translate(width / 2, height / 2); // bring to the middle
    scale(reverse ? 1 / scaleValue : scaleValue); // ternary operators: https://www.w3schools.com/js/js_comparisons.asp
    translate(-width / 2, -height / 2); // bring back
}

/**
 * resets the game settings for starting a new game
 */
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


function draw() {
    background("white");
    push();
    scaleCanvas();
    if (assets.loaded === assets.all) { // all assets are loaded
        screens.get(screenState).display();
    } else {
        textAlign("center", "center");
        textSize(100);
        text(`Loading${".".repeat(Math.floor(frameCount / 20) % 3 + 1)}`, width / 2, height / 2); // Loading animation (additional dots every 20 frames)
        textSize(30);
        text(`${Math.floor(assets.loaded/assets.all*100)}%`, width / 2, height / 2 + 75);
    }
    pop();

}

function keyPressed() {               // switch case: https://www.w3schools.com/js/js_switch.asp
    if (assets.loaded === assets.all) {     //autocompletion was used for obvious things because I was lazy to write
        switch (keyCode) {                  //not everything!! just some of the lines
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
                    case "Guide":
                        screenState = "Menu";
                        break;
                }
                break;
            case 71: //G
                switch (screenState) {
                    case "Menu":
                        screenState = "Guide";
                        break;
                }
                break;
        }
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
    state;
    orientation;
    skins = new Map([
        ["stand, left", loadAsset("graphics/character/character_stand_left.png")],
        ["stand, right", loadAsset("graphics/character/character_stand_right.png")],
        ["run 1, left", loadAsset("graphics/character/character_run_1_left.png")],
        ["run 1, right", loadAsset("graphics/character/character_run_1_right.png")],
        ["run 2, left", loadAsset("graphics/character/character_run_2_left.png")],
        ["run 2, right", loadAsset("graphics/character/character_run_2_right.png")],
        ["jump, left", loadAsset("graphics/character/character_jump_left.png")],
        ["jump, right", loadAsset("graphics/character/character_jump_right.png")],
    ]);

    /**
     * Creates a player object
     * @param width
     * @param height
     */
    constructor(width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.onGround = false;
        this.canDoubleJump = true; // Allow double jump
        this.alive = true;
        this.state = "stand";
        this.orientation = "right";
    }

    /**
     * Kills the player
     */
    kill() {
        screenState = "Game Over";
        this.alive = false;
    }

    /**
     * Returns the corners of the player
     * @returns {{bottomLeft: {x: number, y: number}, bottomRight: {x: number, y: number}, topLeft: {x: number, y: number}, topRight: {x: number, y: number}}}
     */
    getCorners() {
        return {
            topLeft: {x: this.x, y: this.y},
            topRight: {x: this.x + this.width, y: this.y},
            bottomLeft: {x: this.x, y: this.y + this.height},
            bottomRight: {x: this.x + this.width, y: this.y + this.height}
        };
    }

    /**
     * Updates the player's position and speed
     */
    update() {
        // Left and right movement
        if (keyIsDown(LEFT_ARROW)) {
            this.xSpeed = -5;
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.xSpeed = 5;
        } else {
            if (Math.abs(this.xSpeed) > friction) {
                if (this.xSpeed > 0) {
                    this.xSpeed -= friction;
                } else {
                    this.xSpeed += friction;
                }
            } else {
                this.xSpeed = 0;
            }
        }

        // updating the player's position
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    /**
     * Applies gravity to the player
     */
    applyGravity() {
        if (!this.onGround) {
            this.ySpeed += gravity; // Falling down
        }
    }

    /**
     * Makes the player jump
     */
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

    /**
     * Resets some of the player's settings when it is on the ground
     * @param platforms {Platform[]} the platforms in the level
     */
    groundReset(platforms) {
        if (this.isOnGround(platforms)) {
            this.onGround = true;
            this.ySpeed = 0;
            this.canDoubleJump = true; // Reset double jump when landing
        } else {
            this.onGround = false;
        }

    }

    /**
     * Adjusts the player's position when colliding with any platform.
     * This checks all the platforms whether the player is colliding with any of them,
     * and if so, it adjusts the player's position to be outside the platform.
     * @param platforms {Platform[]} the platforms in the level
     */
    //Bence Tuzson helped me with the collision detection. He helped me with the brainstorm/theory part, the spike & enemy was difficult

    platformCollisionAdjustAll(platforms) {
        for (let platform of platforms) {
            if (this.checkCollision(platform, "platform")) this.platformCollisionAdjust(platform);
        }
        this.groundReset(platforms);
    }

    /**
     * Checks if the player is colliding with any deadly element of a certain type
     * @param elements {Element[]} the elements to check collision with
     * @param type {"spike" | "enemy"} the type of the element
     */
    deadlyCollision(elements, type) {
        if (elements instanceof Array) for (let element of elements) {          //instanceof: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
            if (this.checkCollision(element, type)) {
                player.kill();
            }
        }
    }

    /**
     * Checks if the player is on the ground
     * @param platforms {Platform[]} the platforms in the level
     * @returns {boolean} whether the player is on the ground
     */
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

    /**
     * Adjusts the player's position when colliding with the specified platform.
     * This checks whether the player is colliding with the platform,
     * and if so, it adjusts the player's position to be outside the platform.
     * @param platform {Platform} the platform to adjust the player's position to
     */
    platformCollisionAdjust(platform) {
        let overlap = {
            left: this.x + this.width - platform.x,
            right: platform.x + platform.width - this.x,
            top: this.y + this.height - platform.y,
            bottom: platform.y + platform.height - this.y
        };

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

    /**
     * Checks if the player is colliding with an element of a certain type
     * @param element {Element} the element to check collision with
     * @param type {string} the type of the element
     * @returns {boolean} whether the player is colliding with the element
     */
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
     * Adjusts the player's position to be within the game field
     * @param gameField {{width: number, height: number}}
     */
    borderAdjust(gameField) {
        this.x = constrain(this.x, 0, gameField.width - this.width);  //constrain: https://p5js.org/reference/p5/constrain/
        this.y = constrain(this.y, 0, gameField.height);
    }

    /**
     * Displays the player
     */
    display() {                 //image: https://p5js.org/reference/p5/image/
        fill(255, 0, 0);
        image(this.skins.get(`${this.state}, ${this.orientation}`), this.x, this.y, this.width, this.height);
        if (building) rect(this.x, this.y, this.width, this.height);
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

    /**
     * Creates an element object
     * @param x {number} the x coordinate of the element
     * @param y {number} the y coordinate of the element
     * @param width {number} the width of the element
     * @param height {number} the height of the element
     */
    constructor(x, y, width, height) {  //autocompletion because I was lazy :')
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
     * @param element {Element} the element object
     * @returns {boolean}
     */
    static isOverlapping(player, element) {  //static: https://www.w3schools.com/js/js_class_static.asp
        return (
            player.y <= element.y + element.height &&
            player.y + player.height >= element.y &&
            player.x <= element.x + element.width &&
            player.x + player.width >= element.x
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

    /**
     * Creates a platform object
     * @param x {number} the x coordinate of the platform
     * @param y {number} the y coordinate of the platform
     * @param width {number} the width of the platform
     * @param height {number} the height of the platform
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    /**
     * Displays the platform
     */
    display() {
        noStroke();
        fill(48, 25, 52);
        if (building) rect(this.x, this.y, this.width, this.height);
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
 * @property {Map<string, p5.Image | p5.Element | p5.Framebuffer>} skins - The skins of the enemy
 */
class Enemy extends Element {
    speed;
    moveRange;
    baseX;
    skins = new Map([
        ["default", loadAsset("graphics/elements/enemy.png")]
    ]);

    /**
     * Creates an enemy object
     * @param x {number} the x coordinate of the enemy
     * @param y {number} the y coordinate of the enemy
     * @param radius {number} the radius of the enemy
     * @param speed {number} the speed factor of the enemy
     * @param moveRange {number} the range of the enemy's movement
     */
    constructor(x, y, radius, speed, moveRange) {
        super(x, y, 2 * radius, radius);
        this.speed = speed;
        this.moveRange = moveRange;
        this.baseX = x;
    }

    /**
     * Displays the enemy
     */
    display() {
        noStroke();
        fill(93, 63, 211);
        this.move();
        image(this.skins.get("default"), this.x - this.width / 2, this.y - this.height, this.width, this.height);
        if (building) arc(this.x, this.y, this.width, 2 * this.height, PI, 0);
    }

    /**
     * Moves the enemy
     */
    move() {
        this.x = this.baseX + (this.moveRange - this.width) / 2 * sin(frameCount / 100 * this.speed);
    }

    /**
     * Checks if the player is colliding with the enemy
     * @param player {Player} the player object
     * @param enemy {Enemy} the enemy object
     * @returns {boolean} whether the player is colliding with the enemy
     */
    static isOverlapping(player, enemy) {
        for (let corner in player.getCorners()) {
            corner = player.getCorners()[corner];
            if (dist(corner.x, corner.y, enemy.x, enemy.y) <= enemy.height && corner.y >= enemy.y) return true;
        }
        return enemy.isBetweenSides(player);
    }
}

/**
 * Spike object
 * @property {number} x - The x coordinate of the spike
 * @property {number} y - The y coordinate of the spike
 * @property {number} width - The width of the spike
 * @property {number} height - The height of the spike
 * @property {Map<string, p5.Image | p5.Element | p5.Framebuffer>} skins - The skins of the spike
 */
class Spike extends Element {
    skins = new Map([
        ["default", loadAsset("graphics/elements/spike.png")]
    ]);
    /**
     * Creates a spike object
     * @param x {number} the x coordinate of the spike
     * @param y {number} the y coordinate of the spike
     * @param width {number} the width of the spike
     * @param height {number} the height of the spike
     */
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    /**
     * Displays the spike
     */
    display() {
        noStroke();
        fill(255, 0, 0);
        image(this.skins.get("default"), this.x - this.width / 2, this.y - this.height, this.width, this.height);
        if (building) triangle(this.x - this.width / 2, this.y, this.x, this.y - this.height, this.x + this.width / 2, this.y);
    }

    /**
     * Checks if the player is colliding with the spike
     * @param player {Player} the player object
     * @param spike {Spike} the spike object
     * @returns {boolean} whether the player is colliding with the spike
     */

    //Theory part by Bence Tuzson
    static isOverlapping(player, spike) {
        let slope = spike.height / (spike.width / 2);
        let top = spike.y - spike.height; // the y coordinate of the top of the spike

        for (let corner in player.getCorners()) {
            corner = player.getCorners()[corner];

            // calculating the y position over which the player's corner is inside the spike
            let left = slope * (corner.x - spike.x) + top; // Left side equation => f(x) = slope * x + top_y_position => y (x is the x pos of the corner relative to the spike's x pos)
            let right = -slope * (corner.x - spike.x) + top; // Right side equation => f(x) = -slope * x + top_y_position => y (x is the x pos of the corner relative to the spike's x pos)

            if (
                // between left-right
                corner.y >= left &&
                corner.y >= right &&
                // between top-bottom
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
 * @property {{width: number, height: number}} gameField - The game field size of the level
 * @property {{x: number, y: number}} playerPosition - The player position
 * @property {{x: number, y: number, zoom: number}} cameraPosition - The camera position and zoom
 * @property {{background?: p5.Image | p5.Element | p5.Framebuffer, foreground?: p5.Image | p5.Element | p5.Framebuffer}} graphics - The graphics of the level
 * @property {{name: string, condition: function: {name: string, condition: function}}} nextLevel - The next level
 */


class Level {
    name;
    elements;
    gameField;
    playerPosition;
    cameraPosition;
    graphics;
    nextLevel;

    /**
     *
     * @param name {string} The name of the level
     * @param gameField {{width: number, height: number}} The game field size of the level
     * @param elements {function(gameField): {platforms?: Platform[], spikes?: Spike[], enemies?: Enemy[]}} The elements of the level
     * @param playerPosition {function(gameField): {x: number, y: number}} The player position
     * @param cameraPosition {function(gameField): {x: number, y: number, zoom: number}} The camera position and zoom
     * @param graphics {{background: p5.Image | p5.Element | p5.Framebuffer, foreground: p5.Image | p5.Element | p5.Framebuffer}} The background and foreground graphics of the level
     * @param nextLevel {function(gameField): {name: string, condition: function}} The next level
     */
    constructor(name, gameField, elements, playerPosition, cameraPosition, graphics, nextLevel = null) {
        this.name = name;
        this.gameField = gameField;
        this.elements = elements(this.gameField);
        this.playerPosition = playerPosition(this.gameField);
        this.cameraPosition = cameraPosition(this.gameField);
        this.graphics = graphics;
        this.nextLevel = nextLevel;
        if (this.nextLevel !== null) this.nextLevel = nextLevel(this.gameField);
    }

    /**
     * Sets up and applies the camera effect
     * @param player {Player} the player object
     */
    setupCamera(player) { //https://chatgpt.com/share/6751bc6e-16cc-8000-9eb3-b6eab3772748
        translate(width / 2, height / 2);
        scale(this.cameraPosition.zoom * (width / this.gameField.width));
        translate(
            -constrain(player.x + this.cameraPosition.x, width / (2 * this.cameraPosition.zoom * (width / this.gameField.width)), this.gameField.width - width / (2 * this.cameraPosition.zoom * (width / this.gameField.width))),
            -constrain(player.y + this.cameraPosition.y, height / (2 * this.cameraPosition.zoom * (width / this.gameField.width)), this.gameField.height - height / (2 * this.cameraPosition.zoom * (width / this.gameField.width))),
        );
    }

    /**
     * Draws the level
     * @param play {boolean} whether the player should move
     */
    draw(play = true) {
        push();
        scaleCanvas(true);
        this.setupCamera(player);
        if (this.graphics !== undefined && this.graphics.background !== undefined)
            image(this.graphics.background, 0, 0, this.gameField.width, this.gameField.height);

        // Display the elements (platforms, enemies etc.)
        for (let elements in this.elements) {
            elements = this.elements[elements];
            if (elements instanceof Array) for (let element of elements) {
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

            if (player.y >= this.gameField.height) {
                player.kill();
            }

            if (gameLevel === win.level && win.condition()) {
                screenState = "Win";
            }

            if (this.nextLevel !== null && this.nextLevel.condition()) {
                gameLevel = this.nextLevel.name;
                levels.get(this.nextLevel.name).setup();
            }

            if (!player.onGround) {
                player.state = "jump";
            } else if(player.xSpeed === 0) {
                player.state = "stand";
            } else {
                player.state = `run ${Math.floor(frameCount / 10) % 2 + 1}`;
            }

            if (player.xSpeed > 0) {
                player.orientation = "right";
            } else if (player.xSpeed < 0) {
                player.orientation = "left";
            }
        }

        // Display player
        player.display();
        if (this.graphics !== undefined && this.graphics.foreground !== undefined)
            image(this.graphics.foreground, 0, 0, this.gameField.width, this.gameField.height);
        pop();

    }

    /**
     * Sets up the level
     */
    setup() {
        player.x = this.playerPosition.x;
        player.y = this.playerPosition.y;
        player.orientation = this.playerPosition.orientation;
    }
}


/**
 * Screen object
 * @property {string} name - The name of the screen
 * @property {{background?: p5.Image | p5.Element | p5.Framebuffer, foreground?: p5.Image | p5.Element | p5.Framebuffer}} graphics - The graphics of the level
 * @property {function} run - The function to display the screen
 */
class Screen {
    name;
    graphics;
    run;

    /**
     *
     * @param name {string} The name of the screen
     * @param graphics {{background?: p5.Image | p5.Element | p5.Framebuffer, foreground?: p5.Image | p5.Element | p5.Framebuffer}} The graphics of the screen
     * @param run {function} The function being run when displaying the screen
     */
    constructor(name, graphics, run = null) {
        this.name = name;
        this.graphics = graphics;
        this.run = run;
    }

    display() {
        push();
        scaleCanvas(true);
        if (this.graphics !== undefined && this.graphics.background !== undefined)
            image(this.graphics.background, 0, 0, width, height);
        if (this.run !== null) {
            scaleCanvas();
            this.run();
            scaleCanvas(true);
        }
        if (this.graphics !== undefined && this.graphics.foreground !== undefined)
            image(this.graphics.foreground, 0, 0, width, height);
        pop();
        return this;
    }
}
