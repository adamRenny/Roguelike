var EventEmitter = require('events').EventEmitter;
var util = require('util');
var CommandMap = require('../model/CommandMap');

var STREAM_ENCODING = 'utf8';

var ENCODED_KEYS = {
    QUIT: '\u0003',
    UP: '\u001b[A',
    DOWN: '\u001b[B',
    LEFT: '\u001b[D',
    RIGHT: '\u001b[C',
    SPACE: ' '
};

var InputHandler = function(stream) {
    this.init(stream);
};

util.inherits(InputHandler, EventEmitter);

InputHandler.prototype.init = function(stream) {
    InputHandler.super_.call(this);
    this.prepareStream(stream);
    this.stream = stream;

    this.hasLinked = false;
    this.isEnabled = false;

    return this.setupHandlers().enable();
};

InputHandler.prototype.prepareStream = function(stream) {
    stream.setRawMode(true);
    stream.setEncoding(STREAM_ENCODING);
};

InputHandler.prototype.linkToStream = function() {
    if (this.hasLinked) {
        this.stream.resume();
        return this;
    }

    this.hasLinked = true;
    this.stream.on('data', this.onDataStreamHandler);
    this.stream.resume();

    return this;
};

InputHandler.prototype.unlinkFromStream = function() {

    this.stream.removeListener('data', this.onDataStreamHandler);
    this.stream.pause();

    return this;
};

InputHandler.prototype.setupHandlers = function() {
    this.onDataStreamHandler = this.onDataStream.bind(this);

    return this;
};

InputHandler.prototype.enable = function() {
    if (this.isEnabled) {
        return this;
    }

    this.isEnabled = true;
    this.linkToStream();

    return this;
};

InputHandler.prototype.disable = function() {
    if (!this.isEnabled) {
        return this;
    }

    this.isEnabled = false;
    this.unlinkFromStream();

    return this;
};

InputHandler.prototype.destroy = function() {
    this.disable();
    this.onDataStreamHandler = null;

    return this;
};

InputHandler.prototype.onDataStream = function(key) {
    // console.log('DATA!', arguments);
    switch (key) {

        case ENCODED_KEYS.QUIT:
            this.emit(InputHandler.QUIT_COMMAND);
            break;

        case ENCODED_KEYS.LEFT:
            this.emit(InputHandler.KEY_COMMAND, CommandMap.LEFT);
            break;

        case ENCODED_KEYS.RIGHT:
            this.emit(InputHandler.KEY_COMMAND, CommandMap.RIGHT);
            break;

        case ENCODED_KEYS.UP:
            this.emit(InputHandler.KEY_COMMAND, CommandMap.UP);
            break;

        case ENCODED_KEYS.DOWN:
            this.emit(InputHandler.KEY_COMMAND, CommandMap.DOWN);
            break;

        case ENCODED_KEYS.SPACE:
            this.emit(InputHandler.KEY_COMMAND, CommandMap.ACTION);
            break;
    }
};

InputHandler.QUIT_COMMAND = 'quit-command';
InputHandler.KEY_COMMAND = 'key-command';

module.exports = InputHandler;