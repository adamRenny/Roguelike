var Entity = function(symbol) {
    this.init(symbol);
};

var p = Entity.prototype;

p.init = function(symbol) {
    this.symbol = symbol;

    return this;
};

p.toString = function() {
    return this.symbol;
};

module.exports = Entity;