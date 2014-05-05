(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

Function.prototype.inherits = function(SuperClass) {
  var Surrogate = function () {};
  Surrogate.prototype = SuperClass.prototype;
  this.prototype = new Surrogate();
}

})(this);
