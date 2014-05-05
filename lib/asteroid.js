(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, color, radius) {
    Asteroids.MovingObject.call(this, radius, color, pos, vel);
  };

  Asteroid.COLORS = ["gray", "ccc", "bbb"]
  Asteroid.RADIUS = 25;
  Asteroid.MAXVELOCITY = 4;

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.randomAsteroid = function () {
    var centerX = Math.random() * DIM_X;
    var centerY = Math.random() * DIM_Y;
    var pos = [centerX, centerY];
    var vel = this.randomVec();
    var astRadius = Asteroid.RADIUS*Math.random()+10;
		var random_index = Math.floor(Math.random()*Asteroid.COLORS.length);
		
    return (new Asteroid(pos, vel, Asteroid.COLORS[random_index], astRadius));
  };

  Asteroid.randomVec = function (dimX, dimY) {
    var velX = Math.random() * Asteroid.MAXVELOCITY * (Math.random() < 0.5 ? 1 : -1 );
    var velY = Math.random() * Asteroid.MAXVELOCITY * (Math.random() < 0.5 ? 1 : -1 );

    return [velX, velY];
   };

})(this);