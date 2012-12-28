var TileTypes = {
    empty: ' ',
    basic: '-'
};

var INVALID_POSITION = -1;

var _getTileSymbol = function(tileType) {
    if (typeof tileType !== 'string' || !TileTypes.hasOwnProperty(tileType)) {
        throw new Error('UndefinedError: Valid tile type not supplied: ' + tileType);
    }

    return TileTypes[tileType];
};

var _getDepthValue = function(depth) {
    if (typeof depth === 'string') {
        depth = parseInt(depth, 10);
    }

    if (typeof depth !== 'number') {
        throw new Error('TypeError: depth must be of type number, ' + depth + ' supplied');
    }

    return depth;
};

var FloorTile = function(tileType, depth) {
    var symbol = _getTileSymbol(tileType);
    depth = _getDepthValue(depth);

    this.init(symbol, depth);
};

FloorTile.prototype.init = function(symbol, depth) {
    this.symbol = symbol;
    this.depth = depth;

    var isValid = false;
    switch (symbol) {
        case ' ':
            isValid = false;
            break;
        case '-':
            isValid = true;
            break;
    }

    this.isValid = isValid;

    this.x = INVALID_POSITION;
    this.y = INVALID_POSITION;

    return this;
};

FloorTile.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;

    return this;
};

FloorTile.prototype.updateTile = function(tileType, depth) {
    var symbol = _getTileSymbol(tileType);
    depth = _getDepthValue(depth);

    this.symbol = symbol;
    this.depth = depth;
};

FloorTile.prototype.toString = function() {
    return this.symbol;
};

FloorTile.TILE_EMPTY = 'empty';
FloorTile.TILE_BASIC = 'basic';

module.exports = FloorTile;