const PLAYER_SIZE = 70;
const MAX_DISTANCE_PT = (TURTLE_SIZE + PLAYER_SIZE) / 2;
const DEFAULT_PLAYER_SPAWN = [100, 450];

function Player() {
  this.pos = createVector(DEFAULT_PLAYER_SPAWN[0], DEFAULT_PLAYER_SPAWN[1]);
  this.oldPos = [this.pos.x, this.pos.y];
  this.shouldImageInvert = true;

  this.display = function() {
    const img = this.shouldImageInvert ? playerImageInverted : playerImage;

    return image(img, this.pos.x, this.pos.y, PLAYER_SIZE, PLAYER_SIZE);
  }

  this.update = function() {
    this.display();
    this.oldPos = [this.pos.x, this.pos.y];

    if (debug) {
      this.displayCorners();
    }
  }

  this.getMovementDelta = function() {
    return keyIsDown(SHIFT) ? 2 : 1;
  }

  this.moveForward = function() {
    const updated = this.pos.y - this.getMovementDelta();
    const newCenter = [
      (2 * this.pos.x + PLAYER_SIZE) / 2,
      (2 * updated + PLAYER_SIZE) / 2,
    ];

    for (const turtle of turtles) {
      if (Math.abs(newCenter[1] - turtle.getCenter()[1]) < MAX_DISTANCE_PT
      && Math.abs(newCenter[0] - turtle.getCenter()[0]) < MAX_DISTANCE_PT) {
        return;
      }
    }

    this.pos.y = constrain(updated, 0, height - PLAYER_SIZE);
  }

  this.moveBackward = function() {
    const updated = this.pos.y + this.getMovementDelta();
    const newCenter = [
      (2 * this.pos.x + PLAYER_SIZE) / 2,
      (2 * updated + PLAYER_SIZE) / 2,
    ];

    for (const turtle of turtles) {
      if (Math.abs(newCenter[1] - turtle.getCenter()[1]) < MAX_DISTANCE_PT
      && Math.abs(newCenter[0] - turtle.getCenter()[0]) < MAX_DISTANCE_PT) {
        return;
      }
    }

    this.pos.y = constrain(updated, 0, height - PLAYER_SIZE);
  }

  this.moveRight = function() {
    const updated = this.pos.x + this.getMovementDelta();
    const newCenter = [
      (2 * updated + PLAYER_SIZE) / 2,
      (2 * this.pos.y + PLAYER_SIZE) / 2,
    ];

    for (const turtle of turtles) {
      if (Math.abs(newCenter[1] - turtle.getCenter()[1]) < MAX_DISTANCE_PT
      && Math.abs(newCenter[0] - turtle.getCenter()[0]) < MAX_DISTANCE_PT) {
        return;
      }
    }

    this.pos.x = constrain(updated, 0, width - PLAYER_SIZE);
    this.shouldImageInvert = true;
  }

  this.moveLeft = function() {
    const updated = this.pos.x - this.getMovementDelta();
    const newCenter = [
      (2 * updated + PLAYER_SIZE) / 2,
      (2 * this.pos.y + PLAYER_SIZE) / 2,
    ];

    for (const turtle of turtles) {
      if (Math.abs(newCenter[1] - turtle.getCenter()[1]) < MAX_DISTANCE_PT
      && Math.abs(newCenter[0] - turtle.getCenter()[0]) < MAX_DISTANCE_PT) {
        return;
      }
    }

    this.pos.x = constrain(updated, 0, width - PLAYER_SIZE);
    this.shouldImageInvert = false;
  }

  this.getCenter = function() {
    return [
      (2 * this.pos.x + PLAYER_SIZE) / 2,
      (2 * this.pos.y + PLAYER_SIZE) / 2,
    ];
  }

  this.displayCorners = function() {
    fill('white');
    noStroke();
    rect(this.pos.x, this.pos.y, 2, 2);
    rect(this.pos.x, this.pos.y + PLAYER_SIZE, 2, 2);
    rect(this.pos.x + PLAYER_SIZE, this.pos.y, 2, 2);
    rect(this.pos.x + PLAYER_SIZE, this.pos.y + PLAYER_SIZE, 2, 2);
  }

  this.clipsWithTurtles = function() {
    for (const turtle of turtles) {
      if (Math.abs(this.getCenter()[1] - turtle.getCenter()[1]) < MAX_DISTANCE_PT
      && Math.abs(this.getCenter()[0] - turtle.getCenter()[0]) < MAX_DISTANCE_PT) {
        return true;
      }
    }
    return false;
  }

  this.hasMoved = function() {
    return this.pos.x !== this.oldPos[0] || this.pos.y !== this.oldPos[1];
  }

  this.isCloseToAnyTurtle = function() {
    return turtles.some((turtle) => turtle.playerIsTooClose());
  }
}

function getDefaultPlayerCenter() {
  return [
    (2 * DEFAULT_PLAYER_SPAWN[0] + PLAYER_SIZE) / 2,
    (2 * DEFAULT_PLAYER_SPAWN[1] + PLAYER_SIZE) / 2,
  ];
}
