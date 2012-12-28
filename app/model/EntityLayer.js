var util = require('util');
var Dictionary = require('../../lib/Dictionary');
var TypeControl = require('../util/TypeControl');
var ContentLayer = require('./ContentLayer');

var _getHashKey = function(x, y) {
    return x + '-' + y;
};

var EntityLayer = function(width, height, type) {
    width = TypeControl.toNumberFromString(width);
    height = TypeControl.toNumberFromString(height);

    if (typeof width !== 'number' || typeof height !== 'number' || width === 0 || height === 0) {
        throw new Error('TypeError: width and height must be of type number, recieved ' + width + ', ' + height);
    }

    this.init(width, height, type);
};

util.inherits(EntityLayer, ContentLayer);

EntityLayer.prototype.init = function(width, height, type) {
    this.width = width;
    this.height = height;

    this.type = type || null;

    this.content = new Dictionary();

    return this;
};

EntityLayer.prototype.hasElement = function(x, y) {
    x = TypeControl.toNumberFromString(x);
    y = TypeControl.toNumberFromString(y);

    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('TypeError: x and y must be of type number, received ' + x + ', ' + y);
    }

    if (this.isOutOfBounds(x, y)) {
        throw new Error('BoundsError: x and y must be within the layer size');
    }

    var key = _getHashKey(x, y);

    return this.content.hasKey(key);
};

EntityLayer.prototype.getElement = function(x, y) {
    x = TypeControl.toNumberFromString(x);
    y = TypeControl.toNumberFromString(y);

    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('TypeError: x and y must be of type number, received ' + x + ', ' + y);
    }

    if (this.isOutOfBounds(x, y)) {
        throw new Error('BoundsError: x and y must be within the layer size');
    }

    var key = _getHashKey(x, y);

    return this.content.getValueForKey(key);
};

EntityLayer.prototype.setElement = function(x, y, element) {
    x = TypeControl.toNumberFromString(x);
    y = TypeControl.toNumberFromString(y);

    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('TypeError: x and y must be of type number, received ' + x + ', ' + y);
    }

    if (this.isOutOfBounds(x, y)) {
        throw new Error('BoundsError: x and y must be within the layer size');
    }

    if (!this.isValidType(element)) {
        throw new Error('TypeError: element must be of proper type');
    }

    var key = _getHashKey(x, y);

    if (this.content.hasKey(key)) {
        this.content.removeKeyValueByKey(key);
    }

    if (element !== null) {
        this.content.addKeyValue(key, element);
    }

    return this;
};

module.exports = EntityLayer;