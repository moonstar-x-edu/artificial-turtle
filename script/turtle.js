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
    if (this.playerIsTooClose()) {
      const { x, y } = this.getPlayerTurtleVectorUnitary();
      this.movementDelta[0] = -x;
      this.movementDelta[1] = -y;
      return;
    }

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
    
    if (debug) {
      this.displayCorners();
      this.displayTrustRange();
      this.displayLineToPlayer();
      this.displayTurtleID();
    }
  }

  this.getCenter = function() {
    return [
      (2 * this.pos.x + TURTLE_SIZE) / 2,
      (2 * this.pos.y + TURTLE_SIZE) / 2,
    ];
  }

  this.displayCorners = function() {
    fill('white');
    noStroke();
    rect(this.pos.x, this.pos.y, 2, 2);
    rect(this.pos.x, this.pos.y + TURTLE_SIZE, 2, 2);
    rect(this.pos.x + TURTLE_SIZE, this.pos.y, 2, 2);
    rect(this.pos.x + TURTLE_SIZE, this.pos.y + TURTLE_SIZE, 2, 2);
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

  this.clipsWithPlayer = function() {
    return (
      Math.abs(this.getCenter()[1] - getDefaultPlayerCenter()[1]) < MAX_DISTANCE_PT &&
      Math.abs(this.getCenter()[0] - getDefaultPlayerCenter()[0]) < MAX_DISTANCE_PT
    );
  }

  this.calculateTrustRadius = function() {
    return (TURTLE_SIZE / 0.2) * (1 - trust/100) / 2;
  }

  this.displayTrustRange = function() {
    noFill();
    stroke('black');
    strokeWeight(2);
    circle(this.getCenter()[0], this.getCenter()[1], 2 * this.calculateTrustRadius());
  }

  this.displayLineToPlayer = function() {
    noFill();
    stroke('black');
    strokeWeight(1);
    line(player.getCenter()[0], player.getCenter()[1], this.getCenter()[0], this.getCenter()[1]);
  }

  this.displayTurtleID = function() {
    fill('red');
    noStroke();
    textSize(18);
    text(this.id, this.getCenter()[0], this.getCenter()[1]);
  }

  this.getPlayerTurtleVector = function() {
    return createVector(player.getCenter()[0] - this.getCenter()[0], player.getCenter()[1] - this.getCenter()[1]);
  }

  this.getPlayerTurtleVectorModulus = function() {
    const { x, y } = this.getPlayerTurtleVector();
    return Math.sqrt(x * x + y * y);
  }

  this.getPlayerTurtleVectorUnitary = function() {
    const mod = this.getPlayerTurtleVectorModulus();
    const vec = this.getPlayerTurtleVector();
    return createVector(vec.x / mod, vec.y / mod);
  }

  this.playerIsTooClose = function() {
    return this.getPlayerTurtleVectorModulus() < this.calculateTrustRadius();
  }
}
