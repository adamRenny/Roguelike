var util = require('util');
var IComponent = require('./IComponent');
var Position = require('../Position');

var SpatialComponent = function(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new TypeError('SpatialComponent expects an x and a y of type \'number\'');
    }

    this.init(x, y);
};

util.inherits(SpatialComponent, IComponent);

SpatialComponent.prototype.init = function(x, y) {
    this.position = new Position(x, y);
};

SpatialComponent.prototype.name = 'spatial';

Object.defineProperty(SpatialComponent.prototype, 'x', {
    get: function() {
        return this.position.x;
    },

    set: function(x) {
        this.position.x = x;
    }
});

Object.defineProperty(SpatialComponent.prototype, 'y', {
    get: function() {
        return this.position.y;
    },

    set: function(y) {
        this.position.y = y;
    }
});

SpatialComponent.TYPE_NAME = SpatialComponent.prototype.typeName;

module.exports = SpatialComponent;