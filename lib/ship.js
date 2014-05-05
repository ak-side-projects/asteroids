(function (root) {

  var Asteroids = root.Asteroids = (root.Asteroids || {});



  var Ship = Asteroids.Ship = function(radius, color, pos, vel) {
    Asteroids.MovingObject.call(this, radius, color, pos, vel);
  }

  Ship.RADIUS = 15;
  Ship.COLOR = "green";

  Ship.inherits(Asteroids.MovingObject);

  Ship.prototype.power = function(impulse) {
    this.vel[0] = (this.vel[0] + impulse[0])
    this.vel[1] = (this.vel[1] + impulse[1])
  };

  Ship.prototype.fireBullet = function(game) {
    if (!(this.vel[0] === 0 && this.vel[1] === 0)) {
      var vel = this.vel.slice();
      var velX = vel[0];
      var velY = vel[1];
      var bulletPos = this.pos.slice();
      var bulletSpeed = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2));
      bulletSpeed = bulletSpeed / Asteroids.Bullet.VELOCITYFACTOR;
      var bulletVel = [velX/bulletSpeed, velY/bulletSpeed];
      return (new Asteroids.Bullet(Asteroids.Bullet.RADIUS, Asteroids.Bullet.COLOR, bulletPos, bulletVel, game));
    }
    else {
      return null;
    }
  }



})(this);