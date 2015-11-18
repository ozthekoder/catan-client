"use strict";
const _ = require('lodash');
const ObjectID = require("bson-objectid");


let helpers = {
    "toJSON": function(obj){
        let json = {};
        if(Object.keys(obj).length > 0) {
            _.each(obj, (val, key, item)=>{
                let func = helpers[Util.toType(val)];
                if(func) {
                    val = func(val);
                    json[key] = val;
                }
            });
        }
        return json;
    },
    "object": function(val){
        if(Object.keys(val).length > 0) {
            return helpers.toJSON(val);
        } else {
            return {};
        }
    },
    "array": function(val){

        if(val.length > 0) {
            let arr = [];
            _.each(val, (item, index, list)=>{
                let func = helpers[Util.toType(item)];
                if(func) {
                    arr[index] = func(item);
                }
            });
            return arr;
        } else {
            return [];
        }
    },
    "number": function(val){
        return val;
    },
    "string": function(val){
        return val;
    }
};

class Entity {
    constructor(props) {
        _.assign(this, props);
        if(!this._id) {
            this._id = (new ObjectID()).toHexString();
        }
    }

    toJSON() {
        return helpers.toJSON(this);
    }
}

module.exports = Entity;