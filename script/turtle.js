const TURTLE_SIZE = 70;

function Turtle() {
  this.pos = createVector(random(0, width - TURTLE_SIZE), random(0, height - TURTLE_SIZE));
  this.shouldImageInvert = false;

  this.display = function() {
    const img = this.shouldImageInvert ? turtleImage : turtleImageInverted;

    return image(img, this.pos.x, this.pos.y, TURTLE_SIZE, TURTLE_SIZE);
  }

  this.updatePosition = function() {
    this.pos.x += random(-1, 1);
    this.pos.y += random(-1, 1);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  this.update = function() {
    this.updatePosition();
    this.display();
  }
}
