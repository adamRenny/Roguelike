var FloorLayer = require('./FloorLayer');
var RandomGenerator = require('../controller/floor-generator/RandomGenerator');
var FloorPosition = require('./FloorPosition');
var FloorTile = require('./FloorTile');
var Dictionary = require('../../lib/Dictionary');

var FloorSizes = {
    tiny: 40,
    small: 50,
    medium: 60,
    large: 70,
    huge: 80
};

var _getKeyForPosition = function(x, y) {
    return x + '-' + y;
};

var Floor = function(floorSizeType) {
    if (typeof floorSizeType !== 'string' || !FloorSizes.hasOwnProperty(floorSizeType)) {
        throw new Error('UndefinedError: Valid floor size type not supplied: ' + floorSizeType);
    }

    var floorSize = FloorSizes[floorSizeType];

    this.init(floorSize, floorSize);
};

Floor.prototype.init = function(width, height) {
    if (typeof width !== 'number' || typeof height !== 'number'
        || width === 0 || height === 0
    ) {
        throw new Error('TypeError: Valid floor sizes not supplied: ' + width + ', ' + height);
    }

    this.width = width;
    this.height = height;

    this.startPosition = null;

    this.tileLayer = new FloorLayer(width, height, FloorTile);
    this.entities = new Dictionary();
    
    return this.populateFloor();
};

Floor.prototype.getStartPosition = function() {
    if (this.startPosition === null) {
        var hasFoundStart = false;
        var x = -1;
        var y = -1;

        while (!hasFoundStart) {
            x = Math.floor(Math.random() * this.width);
            y = Math.floor(Math.random() * this.height);

            if (this.isPositionValid(x, y)) {
                this.startPosition = new FloorPosition(x, y);
                hasFoundStart = true;
            }
        }
    }

    return this.startPosition;
};

Floor.prototype.populateFloor = function() {
    var x = 0;
    var y = 0;
    var width = this.width;
    var height = this.height;
    var tileLayer = this.tileLayer;
    var tileType;

    for (; x < width; x++) {
        for (; y < height; y++) {
            tileType = RandomGenerator.getSymbolForPosition(x, y);
            tileLayer.setElement(new FloorTile(tileType, 0), x, y);
        }
        y = 0;
    }

    return this;
};

Floor.prototype.getTileAtPosition = function(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('TypeError: x and y must be of type number, received ' + x + ', ' + y);
    }

    if (x < 0 || x >= this.width) {
        throw new Error(
            'BoundsError: x must be within the floor\'s width: ' + x + ' / ' + this.width
        );
    }

    if (y < 0 || y >= this.height) {
        throw new Error(
            'BoundsError: y must be within the floor\'s height: ' + y + ' / ' + this.height
        );
    }

    return this.tileLayer.getElement(x, y);
};

Floor.prototype.isOutOfBounds = function(x, y) {
    return x < 0 || x >= this.width || y < 0 || y >= this.height;
};

Floor.prototype.isPositionVacant = function(x, y) {
    if (this.isOutOfBounds(x, y)) {
        return false;
    }
    
    var key = _getKeyForPosition(x, y);

    return !this.entities.hasKey(key);
};

Floor.prototype.isPositionValid = function(x, y) {
    if (this.isOutOfBounds(x, y)) {
        return false;
    }

    var tile = this.getTileAtPosition(x, y);

    return tile.isValid;
};

Floor.prototype.placeEntity = function(entity, x, y) {
    var key = _getKeyForPosition(x, y);

    entity.setPosition(x, y);
    this.entities.addKeyValue(key, entity);
};

Floor.prototype.moveEntityToPosition = function(entity, x, y) {
    var oldKey = _getKeyForPosition(entity.position.x, entity.position.y);
    var key = _getKeyForPosition(x, y);
    entity.setPosition(x, y);
    this.entities.removeKeyValueByKey(oldKey);
    this.entities.addKeyValue(key, entity);
};

Floor.prototype.toString = function() {
    var x = 0;
    var y = 0;
    var width = this.width;
    var height = this.height;

    var tile;
    var entity;

    var space;
    var symbol;

    var string = '';

    for (; y < height; y++) {
        space = ' ';

        for (; x < width; x++) {
            entity = null;
            tile = this.getTileAtPosition(x, y);

            if (this.isPositionValid(x, y) && !this.isPositionVacant(x, y)) {
                entity = this.entities.getValueForKey(_getKeyForPosition(x, y));
            }

            if (x === width - 1) {
                space = '\n';
            }

            if (entity !== null) {
                symbol = entity.symbol;
            } else {
                symbol = tile.symbol;
            }

            string = string + symbol + space;
        }

        x = 0;
    }

    return string;
};

Floor.FLOOR_SIZE_TINY = 'tiny';
Floor.FLOOR_SIZE_SMALL = 'small';
Floor.FLOOR_SIZE_MEDIUM = 'medium';
Floor.FLOOR_SIZE_LARGE = 'large';
Floor.FLOOR_SIZE_HUGE = 'huge';

module.exports = Floor;