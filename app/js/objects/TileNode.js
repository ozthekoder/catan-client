"use strict";

const _ = require('lodash');
const Entity = require('./Entity');

class TileNode extends Entity {

	constructor(props){
		super(props);
		if(this.sprite) {
			this.sprite.scale.x = 0.5;
			this.sprite.scale.y = 0.5;
			this.sprite.anchor.x = 0.5;
			this.sprite.anchor.y = 0.5;
			this.sprite.interactive = true;
			this.sprite.tileId = this._id;
		}
	}

	updatePositionPoint(point) {
		this.sprite.position = point;
	}

	updatePositionCoordinates(x, y) {
		this.sprite.x = x;
		this.sprite.y = y;
	}

	on(event, callback) {
		this.sprite.on(event, callback);
	}

	off(event) {
		this.sprite.off(event);
	}
}

module.exports = TileNode;