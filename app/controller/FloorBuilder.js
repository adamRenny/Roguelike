var Floor = require('../model/Floor.js');
var Entity = require('../model/Entity.js');

var FloorBuilder = function() {
    this.init();
};

var p = FloorBuilder.prototype;
p.init = function() {
    this.floor = null;
    this.player = null;

    return this.createChildren();
};

p.createChildren = function() {
    this.floor = new Floor(Floor.FLOOR_SIZE_TINY);

    return this.createPlayer()
               .createObstacles()
               .createSwag()
               .createEntities();
};

p.createPlayer = function() {
    var player = this.player = new Entity('@');
    var startPosition = this.floor.getStartPosition();
    this.floor.placeEntity(player, startPosition.x, startPosition.y);

    return this;
};

p.createObstacles = function() {
    return this;
};

p.createSwag = function() {
    return this;
};

p.createEntities = function() {
    return this;
};

module.exports = FloorBuilder;