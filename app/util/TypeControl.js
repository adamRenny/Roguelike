var TypeControl = {
    toNumberFromString: function(stringVariable) {
        if (typeof stringVariable !== 'string') {
            return stringVariable;
        }

        return parseInt(stringVariable, 10);
    }
};

module.exports = TypeControl;