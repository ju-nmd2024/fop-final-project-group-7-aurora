# Levels
We define the levels in `Level` objects.

## Collection
All level objects are stored in the `levels` Map.

What is a Map? It is like an array-object hybrid. It stores key-value pairs, where the key can be any data type. In our case, the key is a string (the level name) and the value is a `Level` object.

## Set a new level
To set a new level, we create a new `Level` object and add it to the `levels` Map, like this:
```javascript
levels.set(/*Level Name*/, new Level(/*Level Name*/,
    {
        platforms: [
            //this is where you draw the platforms
            new Platform(/*x*/, /*y*/, /*width*/, /*height*/),
        ],
        spikes: [
            //this is where you draw the spikes
            new Spike(/*x*/, /*y*/, /*width*/, /*height*/),
        ],
        enemies: [
            //this is where you draw the enemies
            new Enemy(/*x*/, /*y*/, /*radius*/, /*speed*/, /*moveRange*/),
        ],
    }, {
        //this is where you define the level's borders
        left: /*some number*/,
        right: /*some number*/,
        top: /*some number*/,
        bottom: /*some number*/
    },
    {
        //this is where you define the player's starting position
        x: /*some number*/,
        y: /*some number*/
    },
    {
        //this is where you define the camera's (starting) position
        x: /*some number*/,
        y: /*some number*/
    }, {
        //this is where you define the name and the condition of the next level
        name: /*Next Level Name*/,
        condition: () => /*Next Level Condition*/ //if has to be in an arrow function: () => , it is checked every frame
    }
));
```

By the way, if we want to get a specific level, we can use `levels.get("Level Name")`.
## Setup
Then, we setup the first level in the `setup` function:
```javascript
  levels.get(gameState).setup() //gameState stores the name of the current level, which we set at the beginning
```
Really, here we set the player's (and soon the camera's) position up

## Draw
### On the canvas
To draw the level, we call the level's `draw` function in the `draw` function:
```javascript
  levels.get(gameState).draw() //gameState stores the name of the current level, which we set at the beginning
```

### Method
#### Displaying all the elements
Elements are the platforms, spikes and enemies. To show them all, we have to go through and display all of them:
```javascript
for (let elements in this.elements) { //going trough the elements object
  elements = this.elements[elements]; // by default, elements just stores the key, not the value itself, so we have to resolve that
  if(elements instanceof Array) for (let element of elements) { //going trought the elements of each type of elements
    element.display();
}
    }
```

## Next level
In Every frame, the system checks if the conditions are met for a level change. If we don't specify one, it won't check.

If the conditions are met, the game state will be changed to the next level, and the system sets everything up for the next level:
```javascript
if (this.nextLevel !== null && this.nextLevel.condition()) { //remember, the condition is really an (arrow) function, so we need to call it
  gameState = this.nextLevel.name;
  levels.get(this.nextLevel.name).setup()
}
```

# Collisions
## Check
This one is a bit tougher. We need to check multiple types of collisions: player-platform, player-spike, player-enemy, and player-border.

We check if the player is colliding with the specified element by checking if any of the player's corners are overlapping with the element.

For this, we use the `Player` object's `isOverlapping` function:
```javascript
  player.isOverlapping(this, platform) //returns true if the player is overlapping with the platform
```
Each type of the elements has its own `isOverlapping` function:

### Player-Platform
With the overlap of the player and the platform, we don't need to check all the corners. We can just check if the player's bounding box is overlapping with the platform's bounding box.
```javascript
static isOverlapping(player, platform) {
    return (
        player.x < platform.x + platform.width &&
        player.x + player.width > platform.x &&
        player.y < platform.y + platform.height &&
        player.y + player.height > platform.y
    );
}
```
### Player-Spike
With the overlap of the player and the spike, we need to check all the corners. We can just check if the player's bounding box is overlapping with the spike's bounding box.
```javascript
static isOverlapping(player, spike) {
    let slope = spike.height / (spike.width / 2); // the slope of the spike's sides

    for (let corner in player.corners()) { // check all the corners
        corner = player.corners()[corner];

        let top = spike.y - spike.height;
        //here, just imagine a linear function. Like f(x) = slope * x + top, 
        //where if the corner is below the function's line, it is not colliding
        let left = -slope * (corner.x - spike.x) + top; // Left slope equation
        let right = slope * (corner.x - spike.x) + top; // Right slope equation

        if (
            //remember the linear function thing
            corner.y <= left &&
            corner.y >= left &&
            corner.y >= right && 
            corner.y <= spike.y //if the player is above the spike, surely not colliding
        ) {
            return true; //if the corner is colliding
        }
    }
    return false; //if none of the corners are colliding
}
```

### Player-Enemy
With the overlap of the player and the enemy, we need to check all the corners. We can just check if the player's bounding box is overlapping with the enemy's bounding box.

Since the enemy is basically a semi-circle, we need to check if the distance between the player's corners are less than the enemy's radius. (Trigonometry, Pythagorean Theorem ⇒ $`sin^2(x)+cos^2(x)=1`$ always)
```javascript
static isOverlapping(player, enemy) {
    for (let corner in player.corners()) {
        corner = player.corners()[corner];
        if (dist(corner.x, corner.y, enemy.x, enemy.y) <= enemy.height && corner.y >= enemy.y) return true;
    }
    let border = Math.sqrt(enemy.height ** 2 - (enemy.height / (enemy.y - player.y)) ** 2) //see Illustration 1 (the vertical _ . _ . _ line)
    if (
        //if the player is inside the enemy (y axis)
        player.y <= enemy.y + enemy.height &&
        player.y + player.height >= enemy.y &&
        //if the player is inside the enemy (x axis)
        (
            (
                player.x <= enemy.x + border &&
                player.x >= enemy.x - border
            ) || (
                player.x + player.width >= enemy.x - border &&
                player.x + player.width <= enemy.x + border
            )
        )
    ) return true;
    return false;
}
```
### All
The `Player` object has a `checkCollision` method, that needs specification of which type of element collision we need to check
```javascript
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
```
### Ground
Since we treat collision on the ground differently, we need to check that also:
```javascript
isOnGround(platforms) {
    for (let platform of platforms) { //we go through every single platform
      if (
          this.y + this.height === platform.y && // if touches the ground
          // if isn't over the platform
          this.x + this.width > platform.x &&
          this.x < platform.x + platform.width
      ) return true;
    }
    return false;
}
```

## Adjustment
### Player-Platform
If the player is colliding with a platform, we need to adjust the player's position.
#### Single
To check the collision with all platforms, we need to know how to check one individual platform.
```javascript
//here, we calculate the overlaps of each side of the player and the platform
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
```
#### Ground
If the player touches the ground, we need to give it the double jumping ability, reset its speed and tell the game it is on the ground:
```javascript
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
```

#### Border
We need to make sure the player doesn't get out of the world:
```javascript
borderAdjust(borders) {
 this.x = constrain(this.x, borders.left, borders.right - this.width);
 this.y = constrain(this.y, borders.top, borders.bottom - this.height);
}
```

#### All
To check whether any of the platforms touches the player, and adjust the position if so:
```javascript
platformCollisionAdjustAll(platforms) {
    for (let platform of platforms) { //we go through every single platform
      if (this.checkCollision(platform, "platform")) this.platformCollisionAdjust(platform); //if there is a collision, then adjust
    }
    this.groundReset(platforms);
}
```

## Death
### Element
The player can die touching 2 kinds of elements: spikes and enemies.
We need to check if the player touches the specified type of elements, and if so, we need to "kill" it:
```javascript
deadlyCollision(elements, type) {
    if (elements instanceof Array) for (let element of elements) { //elements are only stored in arrays, and we go through all of them
      if (this.checkCollision(element, type)) {
        console.log("You died");
      }
    }
}
```
### Border
The player also dies if it falls below the bottom border (coming soon).


# Illustrations
Illustration 1