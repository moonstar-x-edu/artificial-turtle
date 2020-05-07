const PLAYER_SIZE = 70;
const MAX_DISTANCE_PT = (TURTLE_SIZE + PLAYER_SIZE) / 2;

function Player() {
  this.pos = createVector(random(0, width - PLAYER_SIZE), random(0, width - PLAYER_SIZE));
  this.shouldImageInvert = true;

  this.display = function() {
    const img = this.shouldImageInvert ? playerImageInverted : playerImage;

    return image(img, this.pos.x, this.pos.y, PLAYER_SIZE, PLAYER_SIZE);
  }

  this.update = function() {
    this.display();
    rect(this.pos.x, this.pos.y, 2, 2);
    rect(this.pos.x, this.pos.y + PLAYER_SIZE, 2, 2);
    rect(this.pos.x + PLAYER_SIZE, this.pos.y, 2, 2);
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
}
