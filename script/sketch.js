const FRAMERATE = 30;
const KEY_W = 87;
const KEY_A = 65;
const KEY_D = 68;
const KEY_S = 83;

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
  const numOfTurtles = random(2, 4);
  for (let i = 0; i < numOfTurtles; i++) {
    turtles.push(new Turtle(i));
  }

  frameRate(FRAMERATE);
}

function draw() {
  background(bg);
  
  player.update();
  turtles.forEach((turtle) => {
    turtle.update();
  });

  if (keyIsDown(UP_ARROW) || keyIsDown(KEY_W)) {
    player.moveForward();
  } if (keyIsDown(DOWN_ARROW) || keyIsDown(KEY_S)) {
    player.moveBackward();
  } if (keyIsDown(LEFT_ARROW) || keyIsDown(KEY_A)) {
    player.moveLeft();
  } if (keyIsDown(RIGHT_ARROW) || keyIsDown(KEY_D)) {
    player.moveRight();
  }
}
