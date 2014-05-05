(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  DIM_X = 900;
  DIM_Y = 600;
  FPS = 30;
  NUM_ASTEROIDS = 10;

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = [];
    this.bullets = [];
    this.ship = new Asteroids.Ship(Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR, [DIM_X/2,DIM_Y/2],[0,0]);
    this.timerId = null;
  };

  Game.prototype.bindKeyHandlers = function () {
    var that = this;

    window.key('w', that.ship.power.bind(that.ship, [0, -1]));
    window.key('s', that.ship.power.bind(that.ship,[0, 1]));
    window.key('a', that.ship.power.bind(that.ship,[-1, 0]));
    window.key('d', that.ship.power.bind(that.ship,[1, 0]));
    window.key('space', that.fireBullet.bind(that));

  }

  Game.prototype.fireBullet = function () {
    var bullet = this.ship.fireBullet(this);

    if (!!bullet) {
      this.bullets.push(this.ship.fireBullet(this));
    }
  }

  Game.prototype.hitAsteroids = function() {
    this.bullets.forEach(function(bullet) {
      bullet.hitAsteroids();
    })
  }

  Game.prototype.addAsteroids = function(numAsteroids) {
    for (numAsteroids; numAsteroids > 0; numAsteroids--) {
      this.asteroids.push(Asteroids.Asteroid.randomAsteroid());
    }
  }

  Game.prototype.checkCollisions = function() {
    var that = this
    this.asteroids.forEach(function (asteroid) {
      if (asteroid.isCollidedWith(that.ship)) {
        // alert("Oh no! You crashed into an asteroid.");
        that.ship = new Asteroids.Ship(Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR, [DIM_X/2,DIM_Y/2],[0,0]);
        that.bindKeyHandlers();
        return true;
      };
    });
    return false;
  };

  Game.prototype.removeAsteroid = function(asteroid) {
    var idx = this.asteroids.indexOf(asteroid);
    delete this.asteroids[idx];
    this.addAsteroids(1);
  }

  Game.prototype.removeBullet = function(bullet) {
    var idx = this.bullets.indexOf(bullet);
    delete this.bullets[idx];
  }

  Game.prototype.stop = function() {
    var game = this;
    window.clearInterval(game.timerId);
  }

  Game.prototype.draw = function() {
    var ctx = this.ctx;
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    this.ship.draw(ctx);
    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
    this.bullets.forEach(function (bullet) {
      bullet.draw(ctx);
    });
  };

  Game.prototype.move = function() {
    this.asteroids.forEach(function (asteroid) {
      asteroid.move();
    });

    this.bullets.forEach(function (bullet) {
      bullet.move();
    });

    this.ship.move();
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
  };

  Game.prototype.start = function () {
    var game = this;
    game.bindKeyHandlers();
    game.addAsteroids(NUM_ASTEROIDS);
    this.timerId = window.setInterval(function () {
      if (!game.checkCollisions()) {
        game.move();
        game.draw();
        game.hitAsteroids();
      }
    }, FPS);
  };



})(this);
