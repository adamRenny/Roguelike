var IComponent = require('../component/IComponent');

var Entity = function(symbol) {
    this.init(symbol);
};

Entity.prototype.init = function(symbol) {
    this.componentList = {};
    this.symbol = symbol;

    return this;
};

Entity.prototype.getComponent = function(typeName) {
    if (!this.hasComponentType(typeName)) {
        return null;
    }

    return this.componentList[typeName];
};

Entity.prototype.attachComponent = function(component) {
    if (!(component instanceof IComponent)) {
        throw new TypeError('component must be an IComponent');
    }

    var typeName = component.typeName;
    if (this.hasComponent(component)) {
        throw new Error('component with typeName ' +  typeName + ' already exists');
    }

    this.componentList[typeName] = component;

    return this;
};

Entity.prototype.detachComponent = function(component) {
    if (!(component instanceof IComponent)) {
        throw new TypeError('component must be an IComponent');
    }

    var typeName = component.typeName;
    if (!this.hasComponent(component)) {
        throw new Error('component with typeName ' + typeName + ' does not exist');
    }

    this.componentList[typeName] = undefined;
    
    return this;
};

Entity.prototype.hasComponentType = function(typeName) {
    return this.componentList.hasOwnProperty(typeName);
};

Entity.prototype.hasComponent = function(component) {
    return this.hasComponentType(component.typeName) && this.componentList[component.typeName] === component;
};

Entity.prototype.toString = function() {
    return this.symbol;
};

module.exports = Entity;