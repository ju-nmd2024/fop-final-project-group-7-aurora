let character;

function setup() {
    createCanvas(800, 600);
background(255, 255, 255);
    character = new Character(20, 20, 20);
  }
  
  function draw() {
    background(255, 140, 0);
  }

  class Character {
    constructor (x, y , s){
        this.x = x;
        this.y = y;
        this.s = scale;
    }
    show(){
        push();
        fill(0, 0, 0);
        noStroke();
        scale(this.size);
        rect(this.x, this.y, 100, 100);
        pop();
    }

  }

  function draw(){
    character.show();
  }