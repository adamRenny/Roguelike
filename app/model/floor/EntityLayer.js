var util = require('util');
var Dictionary = require('../../../lib/Dictionary');
var TypeControl = require('../../util/TypeControl');
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

EntityLayer.prototype.hasEntity = function(x, y) {
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

EntityLayer.prototype.getEntity = function(x, y) {
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

EntityLayer.prototype.setEntity = function(x, y, entity) {
    x = TypeControl.toNumberFromString(x);
    y = TypeControl.toNumberFromString(y);

    if (typeof x !== 'number' || typeof y !== 'number') {
        throw new Error('TypeError: x and y must be of type number, received ' + x + ', ' + y);
    }

    if (this.isOutOfBounds(x, y)) {
        throw new Error('BoundsError: x and y must be within the layer size');
    }

    if (!this.isValidType(entity)) {
        throw new Error('TypeError: entity must be of proper type');
    }

    var key = _getHashKey(x, y);

    if (this.content.hasKey(key)) {
        this.content.removeKeyValueByKey(key);
    }

    if (entity !== null) {
        this.content.addKeyValue(key, entity);
    }

    return this;
};

module.exports = EntityLayer;