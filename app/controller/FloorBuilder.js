var Floor = require('../model/floor/Floor');
var EntityBuilder = require('../model/entity/EntityBuilder');

var FloorBuilder = function() {
    this.init();
};

FloorBuilder.prototype.init = function() {
    this.floor = null;
    this.player = null;

    return this.createChildren();
};

FloorBuilder.prototype.createChildren = function() {
    this.floor = new Floor(Floor.FLOOR_SIZE_TINY);

    return this.createPlayer()
               .createObstacles()
               .createSwag()
               .createEntities();
};

FloorBuilder.prototype.createPlayer = function() {
    var player = this.player = EntityBuilder.createPlayer();
    var startPosition = this.floor.getStartPosition();
    this.floor.placeEntity(player, startPosition.x, startPosition.y);

    return this;
};

FloorBuilder.prototype.createObstacles = function() {
    return this;
};

FloorBuilder.prototype.createSwag = function() {
    return this;
};

FloorBuilder.prototype.createEntities = function() {
    return this;
};

module.exports = FloorBuilder;