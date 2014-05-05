(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(radius, color, pos, vel, game) {
    Asteroids.MovingObject.call(this, radius, color, pos, vel);
    this.game = game;
  }

  Bullet.RADIUS = 1.5;
  Bullet.COLOR = 'white';
  Bullet.VELOCITYFACTOR = 25;

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.move = function () {
    var posX = (this.pos[0] + this.vel[0]);
    var posY = (this.pos[1] + this.vel[1]);
    this.pos[0] = posX;
    this.pos[1] = posY;
  };

  Bullet.prototype.hitAsteroids = function () {
    var that = this;
    this.game.asteroids.forEach(function(asteroid) {
      if (that.isCollidedWith(asteroid)) {
        that.game.removeAsteroid(asteroid);
        that.game.removeBullet(this);
      }
    })
  }


})(this);
