var Floor = require('./app/model/Floor.js');
var Entity = require('./app/model/Entity.js');

var f = new Floor(Floor.FLOOR_SIZE_TINY);

var player = new Entity('@');

var wasFound = false;
while (!wasFound) {
    var x = Math.round(Math.random() * f.width);
    var y = Math.round(Math.random() * f.height);

    if (f.isPositionOpen(x, y)) {
        wasFound = true;
        console.log('Placing at ' + x + ', ' + y);
    }
}

console.log(f.toString());