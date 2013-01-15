var Entity = require('./Entity');
var IComponent = require('../component/IComponent');
var SpatialComponent = require('../component/SpatialComponent');

var EntityBuilder = {
    createPlayer: function() {
        var playerEntity = new Entity('@');
        var spatial = new SpatialComponent(-1, -1);

        playerEntity.attachComponent(spatial);

        return playerEntity;
    }
};

module.exports = EntityBuilder;