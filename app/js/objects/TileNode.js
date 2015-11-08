"use strict";

const _ = require('lodash');
const Entity = require('./Entity');
const Constants = require('../util/Constants.json');

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

	setNumberIcon(icon) {
		icon.scale.x = 0.5;
		icon.scale.y = 0.5;
		icon.anchor.x = 0.5;
		icon.anchor.y = 0.5;
		this.sprite.addChildAt(icon, 0);
	}

	addThief(thief) {
		thief.scale.x = 0.5;
		thief.scale.y = 0.5;
		thief.anchor.x = 0.5;
		thief.anchor.y = 0.5;
		this.sprite.addChild(thief)
	}

	addPort(port) {
		//port.scale.x = 0.5;
		//port.scale.y = 0.5;
		port.rotation = -0.57;
		port.anchor.x = 0.5;
		port.anchor.y = 0.5;
		port.x = -72;
		port.y = -122;
		this.sprite.addChild(port)
	}

	removeThief() {
		this.sprite.removeChildAt(this.sprite.children.length-1);
	}

	on(event, callback) {
		this.sprite.on(event, callback);
	}

	off(event) {
		this.sprite.off(event);
	}

	bindEvents() {
		this.on('mousedown', this.onMouseDown.bind(this));
		this.on('mousemove', this.onMouseMove.bind(this));
		this.on('mouseup', this.onMouseUp.bind(this));
		this.on('mouseupoutside', this.onMouseUp.bind(this));
	}

	unbindEvents() {
		this.off('mousedown');
		this.off('mousemove');
		this.off('mouseup');
		this.off('mouseupoutside');
	}

	onMouseDown(e) {
		if(this.draggable) {
			let parent = this.sprite.parent;
			this.dragging = true;
			this.originalCoordinates = {
				x: this.sprite.x,
				y: this.sprite.y,
				z: parent.getChildIndex(this.sprite)
			};
			parent.swapChildren(parent.getChildAt(parent.children.length-1), this.sprite);
		} else {

		}
	}

	onMouseMove(e) {
		if(this.draggable) {
			if(this.dragging)
			{
				this.updatePositionCoordinates(e.data.global.x, e.data.global.y);
			}

		} else {

		}
	}

	onMouseUp(e) {
		if(this.draggable) {
			let parent = this.sprite.parent;
			if(this.dragging) {
				let swapped = false;
				let tiles = parent.children;
				for(let i=0; i< tiles.length; i++) {
					if(Math.abs(tiles[i].x - this.sprite.x) < 30 &&
						Math.abs(tiles[i].y - this.sprite.y) < 30 &&
						this._id !== tiles[i].tileId) {
						let collided = tiles[i];
						parent.swapChildren(parent.getChildAt(this.originalCoordinates.z), this.sprite);
						parent.swapChildren(collided, this.sprite);
						this.updatePositionCoordinates(collided.x, collided.y);
						collided.x = this.originalCoordinates.x;
						collided.y = this.originalCoordinates.y;
						let icon1 = this.sprite.removeChildAt(0);
						let icon2 = collided.removeChildAt(0);
						this.setNumberIcon(icon2);
						this.store.get(collided.tileId).setNumberIcon(icon1);
						swapped = true;
					}
				}

				if(!swapped) {
					this.updatePositionCoordinates(this.originalCoordinates.x, this.originalCoordinates.y);
					parent.swapChildren(parent.getChildAt(this.originalCoordinates.z), this.sprite);
				}

				this.originalCoordinates = null;
				this.dragging = false;
			}
		} else {

		}
	}
}

module.exports = TileNode;