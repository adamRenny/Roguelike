var FloorTile = require('./FloorTile.js');
var RandomGenerator = require('../controller/floor-generator/RandomGenerator.js');

var FloorRow = function(numberOfTiles, rowNumber) {
    if (typeof numberOfTiles === 'string') {
        numberOfTiles = parseInt(numberOfTiles, 10);
    }

    if (typeof numberOfTiles !== 'number' && numberOfTiles !== 0) {
        throw new Error('TypeError: numberOfTiles must be a number, but was ' + numberOfTiles);
    }

    if (typeof rowNumber !== 'number') {
        throw new Error('TypeError: rowNumber must be a number, but was ' + rowNumber);
    }

    this.init(numberOfTiles, rowNumber);
};

var p = FloorRow.prototype;

p.init = function(numberOfTiles, rowNumber) {
    this.numberOfTiles = numberOfTiles;

    this.rowNumber = rowNumber;
    this.tiles = [];

    return this.populateEmpty();
};

p.populateEmpty = function() {
    var i = 0;
    var length = this.numberOfTiles;

    var tileType;

    for (; i < length; i++) {
        tileType = RandomGenerator.getSymbolForPosition(i, this.rowNumber);
        this.insertTileIntoIndex(new FloorTile(tileType, 0), i);
    }

    return this;
};

p.insertTileIntoIndex = function(tile, index) {
    if (!tile instanceof FloorTile) {
        throw new Error('TypeError: tile must be of type FloorType');
    }

    if (typeof index !== 'number') {
        throw new Error('TypeError: index must be of type number');
    }

    if (index < 0 || index >= this.numberOfTiles) {
        throw new Error(
            'BoundsError: index must be within the size of the row: ' + index + ' of ' + this.numberOfTiles
        );
    }

    this.tiles[index] = tile;
    tile.setPosition(index, this.rowNumber);

    return this;
};

p.toString = function() {
    var i = 0;
    var length = this.numberOfTiles;
    var tiles = this.tiles;

    var string = '';
    for (; i < length; i++) {
        string = string + tiles[i].toString();
        if (i !== length - 1) {
            string = string + ' ';
        }
    }

    return string;
};

module.exports = FloorRow;