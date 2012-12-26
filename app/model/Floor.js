var FloorRow = require('./FloorRow.js');
var FloorPosition = require('./FloorPosition.js');
var Dictionary = require('../../lib/Dictionary.js');

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

var p = Floor.prototype;

p.init = function(width, height) {
    if (typeof width !== 'number' || typeof height !== 'number'
        || width === 0 || height === 0
    ) {
        throw new Error('TypeError: Valid floor sizes not supplied: ' + width + ', ' + height);
    }

    this.width = width;
    this.height = height;

    this.startPosition = null;

    this.tileRows = [];
    // console.log('init', this.tileRows);
    this.entities = new Dictionary();
    return this.populateFloor();
};

p.getStartPosition = function() {
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

p.populateFloor = function() {
    var i = 0;
    var length = this.height;
    var tilesPerRow = this.width;
    var rows = this.tileRows;
    var row;

    for (; i < length; i++) {
        row = new FloorRow(tilesPerRow, i);
        rows[i] = row;
    }

    return this;
};

p.getTileAtPosition = function(x, y) {
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

    var row = this.tileRows[y];
    return row.getTileFromIndex(x);
};

p.isOutOfBounds = function(x, y) {
    return x < 0 || x >= this.width || y < 0 || y >= this.height;
};

p.isPositionVacant = function(x, y) {
    if (this.isOutOfBounds(x, y)) {
        return false;
    }
    
    var key = _getKeyForPosition(x, y);

    return !this.entities.hasKey(key);
};

p.isPositionValid = function(x, y) {
    if (this.isOutOfBounds(x, y)) {
        return false;
    }

    var tile = this.getTileAtPosition(x, y);

    return tile.isValid;
};

p.placeEntity = function(entity, x, y) {
    var key = _getKeyForPosition(x, y);

    entity.setPosition(x, y);
    this.entities.addKeyValue(key, entity);
};

p.moveEntityToPosition = function(entity, x, y) {
    var oldKey = _getKeyForPosition(entity.position.x, entity.position.y);
    var key = _getKeyForPosition(x, y);
    entity.setPosition(x, y);
    this.entities.removeKeyValueByKey(oldKey);
    this.entities.addKeyValue(key, entity);
};

p.toString = function() {
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