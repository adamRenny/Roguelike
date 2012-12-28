var FloorTile = require('../../model/FloorTile');

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