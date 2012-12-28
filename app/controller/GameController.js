var FloorBuilder = require('./FloorBuilder');
var TurnController = require('./TurnController');
var CLIView = require('../view/CLIView');
var InputHandler = require('./InputHandler');

var GameController = function() {
    this.init();
};

GameController.prototype.init = function() {
    var floorBuilder = new FloorBuilder();
    this.view = new CLIView(floorBuilder.floor);
    this.inputHandler = new InputHandler(process.stdin);

    this.turnController = new TurnController(floorBuilder.floor, floorBuilder.player, this.inputHandler);

    this.view.render();

    return this.setupHandlers().enable();
};

GameController.prototype.setupHandlers = function() {
    this.onPlayerActionHandler = this.onPlayerAction.bind(this);
    this.onGameQuitHandler = this.onGameQuit.bind(this);

    return this;
};

GameController.prototype.enable = function() {
    if (this.isEnabled) {
        return this;
    }

    this.isEnabled = true;
    this.inputHandler.on(InputHandler.QUIT_COMMAND, this.onGameQuitHandler);
    this.inputHandler.on(InputHandler.KEY_COMMAND, this.onPlayerActionHandler);

    return this;
};

GameController.prototype.disable = function() {
    if (!this.isEnabled) {
        return this;
    }

    this.isEnabled = false;
    this.inputHandler.removeListener(InputHandler.QUIT_COMMAND, this.onGameQuitHandler);
    this.inputHandler.removeListener(InputHandler.KEY_COMMAND, this.onPlayerActionHandler);

    return this;
};

GameController.prototype.destroy = function() {
    this.inputHandler.disable().destroy();
    this.turnController.disable().destroy();

    this.onPlayerActionHandler = null;
    this.onGameQuitHandler = null;
};

GameController.prototype.onPlayerAction = function(playerAction) {
    this.view.render();
};

GameController.prototype.onGameQuit = function() {
    this.destroy();
    process.exit();
};

module.exports = GameController;