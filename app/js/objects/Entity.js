"use strict";
const _ = require('lodash');
const ObjectID = require("bson-objectid");

class Entity {
    constructor(props) {
        _.assign(this, props);
        if(!this._id) {
            this._id = (new ObjectID()).toHexString();
        }
    }

    toJSON(func) {
        let toJSON = func || this.toJSON;
        let json = {};
        _.each(this, (val, key, obj)=>{
            if(typeof val !== "function") {
                if(typeof val === "object") {
                    val = toJSON.call(val, toJSON);
                }

                json[key] = val;
            }
        });
        return json;
    }
}

module.exports = Entity;