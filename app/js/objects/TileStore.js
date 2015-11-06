"use strict";

const _ = require('lodash');
const Store = require('./Store');
const TileNode = require('./TileNode');
const Constants = require('../util/Constants.json');
const PIXI = require('pixi.js');
class TileStore extends Store {

	createNewNode(type, texture) {
		let sprite = new PIXI.Sprite(texture);

		let node = new TileNode({
			type: type,
			sprite: sprite
		});
		this.add(node);
		return node;
	}
}

module.exports = TileStore;