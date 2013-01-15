var Floor = require('../model/floor/Floor');
var InputHandler = require('./InputHandler');
var Entity = require('../model/entity/Entity');
var CommandMap = require('../model/CommandMap');

var TurnController = function(floor, player, inputHandler) {
    if (!(floor instanceof Floor) || floor === undefined
        || !(player instanceof Entity) || player === undefined
        || !(inputHandler instanceof InputHandler) || inputHandler === undefined
    ) {
        throw new Error(
            'TypeError: floor supplied must be a Floor model and inputHandler must be a InputHandler controller'
        );
    }

    this.init(floor, player, inputHandler);
};

TurnController.prototype.init = function(floor, player, inputHandler) {
    this.floor = floor;
    this.player = player;
    this.inputHandler = inputHandler;

    this.isEnabled = false;

    return this.setupHandlers().enable();
};

TurnController.prototype.setupHandlers = function() {
    this.onPlayerActionHandler = this.onPlayerAction.bind(this);

    return this;
};

TurnController.prototype.enable = function() {
    if (this.isEnabled) {
        return this;
    }

    this.isEnabled = true;
    this.inputHandler.on(InputHandler.KEY_COMMAND, this.onPlayerActionHandler);

    return this;
};

TurnController.prototype.disable = function() {
    if (!this.isEnabled) {
        return this;
    }

    this.isEnabled = false;
    this.inputHandler.removeListener(InputHandler.KEY_COMMAND, this.onPlayerActionHandler);

    return this;
};

TurnController.prototype.destroy = function() {
    this.disable();
    this.onPlayerActionHandler = null;

    return this;
};

TurnController.prototype.onPlayerAction = function(playerAction) {
    var player = this.player;
    var spatial = player.getComponent('spatial');
    var x = spatial.x;
    var y = spatial.y;
    var shouldMove = true;

    switch (playerAction) {
        case CommandMap.LEFT:
            x -= 1;
            break;
        case CommandMap.RIGHT:
            x += 1;
            break;
        case CommandMap.UP:
            y -= 1;
            break;
        case CommandMap.DOWN:
            y += 1;
            break;
        default:
            shouldMove = false;
            break;
    }

    if (!shouldMove) {
        console.log('Player Action!', playerAction);
    }

    if (this.floor.isPositionValid(x, y) && this.floor.isPositionVacant(x, y)) {
        this.floor.moveEntityToPosition(player, x, y);
    }
};

module.exports = TurnController;