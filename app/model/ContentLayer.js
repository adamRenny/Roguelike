var ContentLayer = function(width, height, type) {
    if (width !== undefined || height !== undefined || type !== undefined) {
        throw new Error('AbstractError: ContentLayer is an abstract object');
    }

    this.width = 0;
    this.height = 0;
    this.type = null;
};

ContentLayer.prototype.getElement = function(x, y) {
    throw new Error('AbstractError: ContentLayer is an abstract object');
};

ContentLayer.prototype.setElement = function(x, y, element) {
    throw new Error('AbstractError: ContentLayer is an abstract object');
};

ContentLayer.prototype.isOutOfBounds = function(x, y) {
    return x < 0 || x >= this.width || y < 0 || y >= this.height;
};

ContentLayer.prototype.isValidType = function(element) {
    if (this.type === null || element === null) {
        return true;
    }

    return element instanceof this.type;
};

module.exports = ContentLayer;
