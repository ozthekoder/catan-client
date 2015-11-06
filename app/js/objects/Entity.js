const _ = require('lodash');
const ObjectID = require("bson-objectid");

class Entity {
    constructor(props) {
        _.assign(this, props);
        if(!this._id) {
            this._id = (new ObjectID()).toHexString();
        }
    }
}

module.exports = Entity;