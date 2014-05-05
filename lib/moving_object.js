(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function(radius, color, pos, vel) {
    this.pos = pos
    this.radius = radius;
    this.vel = vel
    this.color = color;
  }

  MovingObject.prototype.move = function () {
    var posX = (this.pos[0] + this.vel[0]);
    var posY = (this.pos[1] + this.vel[1]);
    this.pos[0] = posX < 0 ? posX + DIM_X : posX % DIM_X;
    this.pos[1] = posY < 0 ? posY + DIM_Y : posY % DIM_Y;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isCollidedWith = function(otherObject) {
    var distance = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]), 2) +
      Math.pow((this.pos[1] - otherObject.pos[1]), 2) )

    var radiiSum = this.radius + otherObject.radius

    if (distance < radiiSum) {
      return true;
    }
    return false;
  }

})(this);