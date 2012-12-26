var FloorTile = require('../../model/FloorTile.js');

var NUMBER_OF_TYPES = 2;

var RandomGenerator = {
    getSymbolForPosition: function(x, y) {
        var randomValue = Math.random() * 5;
        var tileType = FloorTile.TILE_BASIC;

        if (randomValue < 1) {
            tileType = FloorTile.TILE_EMPTY;
        }

        return tileType;
    }
};

module.exports = RandomGenerator;