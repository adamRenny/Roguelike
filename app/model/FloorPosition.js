var FloorPosition = function(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('TypeError: FloorPosition expects an x and a y of type \'number\'');
    }

    this.init(x, y);
};

FloorPosition.prototype.init = function(x, y) {
    this.x = x;
    this.y = y;

    return this;
};

module.exports = FloorPosition;