const FRAMERATE = 30;

let bg;
let turtleImage;
let turtleImageInverted;
let playerImage;
let playerImageInverted;
let turtles = [];
let player;

function preload() {
  bg = loadImage('../assets/background.jpg');
  turtleImage = loadImage('../assets/turtle.png');
  turtleImageInverted = loadImage('../assets/turtle_inverted.png');
  playerImage = loadImage('../assets/player.png');
  playerImageInverted = loadImage('../assets/player_inverted.png');
}

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent("#app-holder");
  
  player = new Player();
  for (let i = 0; i < 3; i++) {
    turtles.push(new Turtle());
  }

  frameRate(FRAMERATE);
}

function draw() {
  background(bg);
  
  player.update();
  turtles.forEach((turtle) => {
    turtle.update();
  });

  if (keyIsDown(UP_ARROW)) {
    player.moveForward();
  } if (keyIsDown(DOWN_ARROW)) {
    player.moveBackward();
  } if (keyIsDown(LEFT_ARROW)) {
    player.moveLeft();
  } if (keyIsDown(RIGHT_ARROW)) {
    player.moveRight();
  }
}
