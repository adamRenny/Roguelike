var ContentLayer = function(width, height, type) {
    if (width !== undefined || height !== undefined || type !== undefined) {
        throw new Error('AbstractError: ContentLayer is an abstract object');
    }

    this.width = 0;
    this.height = 0;
    this.type = null;
};

ContentLayer.prototype.getEntity = function(x, y) {
    throw new Error('AbstractError: ContentLayer is an abstract object');
};

ContentLayer.prototype.setEntity = function(x, y, entity) {
    throw new Error('AbstractError: ContentLayer is an abstract object');
};

ContentLayer.prototype.isOutOfBounds = function(x, y) {
    return x < 0 || x >= this.width || y < 0 || y >= this.height;
};

ContentLayer.prototype.isValidType = function(entity) {
    if (this.type === null || entity === null) {
        return true;
    }

    return entity instanceof this.type;
};

module.exports = ContentLayer;
