var FloorPosition = require('./FloorPosition.js');

var Entity = function(symbol) {
    this.init(symbol);
};

var p = Entity.prototype;

p.init = function(symbol) {
    this.symbol = symbol;
    this.position = new FloorPosition(-1, -1);

    return this;
};

p.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;

    return this;
}

p.toString = function() {
    return this.symbol;
};

module.exports = Entity;