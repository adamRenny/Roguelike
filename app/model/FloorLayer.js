var TypeControl = require('../util/TypeControl');

var FloorLayer = function(width, height, type) {
    width = TypeControl.toNumberFromString(width);
    height = TypeControl.toNumberFromString(height);


    if (typeof width !== 'number' || typeof height !== 'number' || width === 0 || height === 0) {
        throw new Error('TypeError: width and height must be of type number, recieved ' + width + ', ' + height);
    }

    this.init(width, height, type);
};

FloorLayer.prototype.init = function(width, height, type) {
    this.width = width;
    this.height = height;

    this.type = type || null;

    this.content = [];

    return this.generateLayer();
};

FloorLayer.prototype.generateLayer = function() {
    var x = 0;
    var y = 0;
    var width = this.width;
    var height = this.height;
    var content = this.content;

    for (; x < width; x++) {
        content[x] = [];
        for (; y < height; y++) {
            content[x][y] = null;
        }
        y = 0;
    }

    return this;
};

FloorLayer.prototype.getElement = function(x, y) {
    x = TypeControl.toNumberFromString(x);
    y = TypeControl.toNumberFromString(y);

    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('TypeError: x and y must be of type number, received ' + x + ', ' + y);
    }

    return this.content[x][y];
};

FloorLayer.prototype.setElement = function(element, x, y) {
    x = TypeControl.toNumberFromString(x);
    y = TypeControl.toNumberFromString(y);

    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('TypeError: x and y must be of type number, received ' + x + ', ' + y);
    }

    if (!this.isValidType(element)) {
        throw new Error('TypeError: element must be of proper type');
    }

    this.content[x][y] = element;

    return this;
};

FloorLayer.prototype.isValidType = function(element) {
    if (this.type === null) {
        return true;
    }

    return element instanceof this.type;
};

FloorLayer.prototype.toString = function() {
    var content = this.content;
    var x = 0;
    var y = 0;
    var width = this.width;
    var height = this.height;

    var string = '';
    var space = ' ';

    for (; x < width; x++) {
        for (; y < height; y++) {
            if (y === height - 1) {
                space = '\n';
            }

            string = string + content[x][y].toString() + space;
        }
        space = ' ';
        y = 0;
    }
};

module.exports = FloorLayer;