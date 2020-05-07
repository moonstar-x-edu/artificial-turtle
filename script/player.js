const PLAYER_SIZE = 70;

function Player() {
  this.pos = createVector(random(0, width - PLAYER_SIZE), random(0, width - PLAYER_SIZE));
  this.shouldImageInvert = true;

  this.display = function() {
    const img = this.shouldImageInvert ? playerImageInverted : playerImage;

    return image(img, this.pos.x, this.pos.y, PLAYER_SIZE, PLAYER_SIZE);
  }

  this.update = function() {
    this.display();
  }

  this.getMovementDelta = function() {
    return keyIsDown(SHIFT) ? 2 : 1;
  }

  this.moveForward = function() {
    this.pos.y = constrain(this.pos.y - this.getMovementDelta(), 0, height - PLAYER_SIZE);
  }

  this.moveBackward = function() {
    this.pos.y = constrain(this.pos.y + this.getMovementDelta(), 0, height - PLAYER_SIZE);
  }

  this.moveRight = function() {
    this.pos.x = constrain(this.pos.x + this.getMovementDelta(), 0, width - PLAYER_SIZE);
    this.shouldImageInvert = true;
  }

  this.moveLeft = function() {
    this.pos.x = constrain(this.pos.x - this.getMovementDelta(), 0, width - PLAYER_SIZE);
    this.shouldImageInvert = false;
  }
}
