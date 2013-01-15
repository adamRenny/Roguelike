var IComponent = function() {};

Object.defineProperty(IComponent.prototype, 'typeName', {
    get: function() {
        if (this.name === '') {
            throw new Error('Requesting name from interface');
        }

        return this.name;
    }
});

module.exports = IComponent;