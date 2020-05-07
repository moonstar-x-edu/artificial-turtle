const TURTLE_SIZE = 70;

function Turtle(id) {
  this.pos = createVector(random(0, width - TURTLE_SIZE), random(0, height - TURTLE_SIZE));
  this.movementThreshold = random(1, 2) * FRAMERATE;
  this.frameCounter = random(0, FRAMERATE);
  this.movementDelta = [0, 0];
  this.shouldMove = false;
  this.image = turtleImage;
  this.id = id;

  this.display = function() {
    if (this.movementDelta[0] < 0) {
      this.image = turtleImage;
    } else if (this.movementDelta[0] > 0) {
      this.image = turtleImageInverted;
    }

    return image(this.image, this.pos.x, this.pos.y, TURTLE_SIZE, TURTLE_SIZE);
  }

  this.updateThreshold = function() {
    this.movementThreshold = random(1, 2) * FRAMERATE;
  }

  this.updateMovementDelta = function() {
    this.frameCounter++;
    if (this.frameCounter >= this.movementThreshold) {
      if (this.shouldMove) {
        this.movementDelta[0] = random(-1, 1);
        this.movementDelta[1] = random(-1, 1);
      } else {
        this.movementDelta[0] = 0;
        this.movementDelta[1] = 0;
      }

      this.frameCounter = 0;
      this.updateThreshold();
      this.shouldMove = !this.shouldMove;
    }
  }

  this.updatePosition = function() {
    this.updateMovementDelta();
    const updated = [
      this.pos.x + this.movementDelta[0],
      this.pos.y + this.movementDelta[1]
    ];

    const newCenter = [
      (2 * updated[0] + TURTLE_SIZE) / 2,
      (2 * updated[1] + TURTLE_SIZE) / 2,
    ];

    if (Math.abs(player.getCenter()[1] - newCenter[1]) < MAX_DISTANCE_PT
      && Math.abs(player.getCenter()[0] - newCenter[0]) < MAX_DISTANCE_PT)
    {
      return;
    }
    for (const turtle of turtles) {
      if (turtle.id === this.id) {
        continue;
      }
      
      if (Math.abs(newCenter[1] - turtle.getCenter()[1]) < MAX_DISTANCE_PT
      && Math.abs(newCenter[0] - turtle.getCenter()[0]) < MAX_DISTANCE_PT) {
        return;
      }
    }

    this.pos.x = constrain(updated[0], 0, width - TURTLE_SIZE);
    this.pos.y = constrain(updated[1], 0, height - TURTLE_SIZE);
  }

  this.update = function() {
    this.updatePosition();
    this.display();
    this.displayCorners();
  }

  this.getCenter = function() {
    return [
      (2 * this.pos.x + TURTLE_SIZE) / 2,
      (2 * this.pos.y + TURTLE_SIZE) / 2,
    ];
  }

  this.displayCorners = function() {
    rect(this.pos.x, this.pos.y, 2, 2);
    rect(this.pos.x, this.pos.y + TURTLE_SIZE, 2, 2);
    rect(this.pos.x + TURTLE_SIZE, this.pos.y, 2, 2);
    rect(this.pos.x + TURTLE_SIZE, this.pos.y + TURTLE_SIZE, 2, 2);
  }
}
