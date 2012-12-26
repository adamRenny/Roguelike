var Floor = require('../model/Floor.js');

var CLIView = function(floor) {
    if (!(floor instanceof Floor) || floor === undefined) {
        throw new Error('TypeError: floor supplied must be a Floor model');
    }

    this.init(floor);
};

var p = CLIView.prototype;
p.init = function(floor) {
    this.floor = floor;

    return this;
};

p.render = function() {
    console.log(this.floor.toString());

    return this;
}

module.exports = CLIView;