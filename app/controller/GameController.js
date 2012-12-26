var FloorBuilder = require('./FloorBuilder.js');
var TurnController = require('./TurnController.js');
var CLIView = require('../view/CLIView.js');
var InputHandler = require('./InputHandler.js');

var GameController = function() {
    this.init();
};

var p = GameController.prototype;
p.init = function() {
    var floorBuilder = new FloorBuilder();
    this.view = new CLIView(floorBuilder.floor);
    this.inputHandler = new InputHandler(process.stdin);

    this.turnController = new TurnController(floorBuilder.floor, floorBuilder.player, this.inputHandler);

    this.view.render();

    return this.setupHandlers().enable();
};

p.setupHandlers = function() {
    this.onPlayerActionHandler = this.onPlayerAction.bind(this);
    this.onGameQuitHandler = this.onGameQuit.bind(this);

    return this;
};

p.enable = function() {
    if (this.isEnabled) {
        return this;
    }

    this.isEnabled = true;
    this.inputHandler.on(InputHandler.QUIT_COMMAND, this.onGameQuitHandler);
    this.inputHandler.on(InputHandler.KEY_COMMAND, this.onPlayerActionHandler);

    return this;
};

p.disable = function() {
    if (!this.isEnabled) {
        return this;
    }

    this.isEnabled = false;
    this.inputHandler.removeListener(InputHandler.QUIT_COMMAND, this.onGameQuitHandler);
    this.inputHandler.removeListener(InputHandler.KEY_COMMAND, this.onPlayerActionHandler);

    return this;
};

p.destroy = function() {
    this.inputHandler.disable().destroy();
    this.turnController.disable().destroy();

    this.onPlayerActionHandler = null;
    this.onGameQuitHandler = null;
};

p.onPlayerAction = function(playerAction) {
    this.view.render();
};

p.onGameQuit = function() {
    this.destroy();
    process.exit();
};

module.exports = GameController;