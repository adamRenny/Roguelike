var FloorRow = require('./FloorRow.js');

var FloorSizes = {
    tiny: 40,
    small: 50,
    medium: 60,
    large: 70,
    huge: 80
};

var Floor = function(floorSizeType) {
    if (typeof floorSizeType !== 'string' || !FloorSizes.hasOwnProperty(floorSizeType)) {
        throw new Error('UndefinedError: Valid floor size type not supplied: ' + floorSizeType);
    }

    var floorSize = FloorSizes[floorSizeType];

    this.init(floorSize, floorSize);
};

var p = Floor.prototype;

p.width = 0;
p.height = 0;

p.init = function(width, height) {
    if (typeof width !== 'number' || typeof height !== 'number'
        || width === 0 || height === 0
    ) {
        throw new Error('TypeError: Valid floor sizes not supplied: ' + width + ', ' + height);
    }

    this.width = width;
    this.height = height;

    this.tileRows = [];
    return this.populateFloor();
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

p.toString = function() {
    var i = 0;
    var tileRows = this.tileRows;
    var length = tileRows.length;

    var string = 'Floor:\n';
    for (; i < length; i++) {
        string = string + ('\t' + tileRows[i].toString() + '\n');
    }

    return string;
};

Floor.FLOOR_SIZE_TINY = 'tiny';
Floor.FLOOR_SIZE_SMALL = 'small';
Floor.FLOOR_SIZE_MEDIUM = 'medium';
Floor.FLOOR_SIZE_LARGE = 'large';
Floor.FLOOR_SIZE_HUGE = 'huge';

module.exports = Floor;