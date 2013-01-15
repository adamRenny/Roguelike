var Floor = require('../model/floor/Floor');

var CLIView = function(floor) {
    if (!(floor instanceof Floor) || floor === undefined) {
        throw new Error('TypeError: floor supplied must be a Floor model');
    }

    this.init(floor);
};

CLIView.prototype.init = function(floor) {
    this.floor = floor;

    return this;
};

CLIView.prototype.render = function() {
    console.log(this.floor.toString());

    return this;
};

module.exports = CLIView;