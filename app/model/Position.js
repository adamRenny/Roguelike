var Position = function(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('TypeError: Position expects an x and a y of type \'number\'');
    }

    this.init(x, y);
};

Position.prototype.init = function(x, y) {
    this.x = x;
    this.y = y;

    return this;
};

module.exports = Position;