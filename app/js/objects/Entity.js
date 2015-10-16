var _ = require('lodash');

class Entity {
    constructor(props) {
        _.assign(this, props);
    }
}

module.exports = Entity;