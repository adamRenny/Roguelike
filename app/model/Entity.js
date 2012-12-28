var FloorPosition = require('./FloorPosition');

var Entity = function(symbol) {
    this.init(symbol);
};

Entity.prototype.init = function(symbol) {
    this.symbol = symbol;
    this.position = new FloorPosition(-1, -1);

    return this;
};

Entity.prototype.setPosition = function(x, y) {
    this.position.x = x;
    this.position.y = y;

    return this;
}

Entity.prototype.toString = function() {
    return this.symbol;
};

module.exports = Entity;