const React = require('react');
const $ = require('jquery');
const _ = require('lodash');
const PIXI = require('pixi.js');
const TileNode = require('../objects/TileNode');
const TileStore = require('../objects/TileStore');
const Constants = require('../util/Constants.json');

var stage = new PIXI.Stage("0x000000");
var renderer = PIXI.autoDetectRenderer(Constants.mapWidth, Constants.mapHeight);
var tileStore = new TileStore();
var map = null;
var Editor = React.createClass({
	componentDidMount: function () {
		this.setState({
			width: $(window).width(),
			height: $(window).height()
		});

		this.loadTextures(Constants.tiles);
		this.generateNewMap(true)

		this.getDOMNode().appendChild(renderer.view);

		requestAnimFrame( this.animate );
	},

	renderGameMap: function(map){
		let gameMap = new PIXI.Container();;
		gameMap.position.x = 0;
		gameMap.position.y = 0;

		for(let i=0; i< map.length; i++) {
			let row = map[i];
			for(let j=0; j< row.length; j++) {
				let type = row[j];
				let tile =this.createTileNode(type)

				let onMouseDown = (function(e){
					this.dragging = true;
					this.originalCoordinates = {
						x: this.sprite.x,
						y: this.sprite.y,
						z: gameMap.getChildIndex(this.sprite)
					};
					gameMap.swapChildren(gameMap.getChildAt(gameMap.children.length-1), this.sprite);

				}).bind(tile);

				let onMouseMove = (function(e){
					if(this.dragging)
					{
						this.updatePositionCoordinates(e.data.global.x, e.data.global.y);
					}

				}).bind(tile);

				let onMouseUp = (function(e){
					if(this.dragging) {
						let swapped = false;
						let tiles = gameMap.children;
						for(let i=0; i< tiles.length; i++) {


							if(Math.abs(tiles[i].x - this.sprite.x) < 30 &&
								Math.abs(tiles[i].y - this.sprite.y) < 30 &&
							    this._id !== tiles[i].tileId) {
								let collided = tiles[i];
								console.log(`tile x, y: ${collided.x}, ${collided.y} id: ${collided.tileId}`);
								console.log(`this x, y: ${this.originalCoordinates.x}, ${this.originalCoordinates.y} id: ${this._id}`);
								gameMap.swapChildren(gameMap.getChildAt(this.originalCoordinates.z), this.sprite);
								gameMap.swapChildren(collided, this.sprite);
								this.updatePositionCoordinates(collided.x, collided.y);
								console.log(this);
								collided.x = this.originalCoordinates.x;
								collided.y = this.originalCoordinates.y;
								swapped = true;

								console.log(`tile x, y: ${collided.x}, ${collided.y} id: ${collided.tileId}`);
								console.log(`this x, y: ${this.sprite.x}, ${this.sprite.y} id: ${this._id}`);
							}

						}

						if(!swapped) {
							this.updatePositionCoordinates(this.originalCoordinates.x, this.originalCoordinates.y);
							gameMap.swapChildren(gameMap.getChildAt(this.originalCoordinates.z), this.sprite);
						}

						this.originalCoordinates = null;
						this.dragging = false;
					}

				}).bind(tile);

				tile.on('mousedown', onMouseDown);
				tile.on('mousemove', onMouseMove);
				tile.on('mouseup', onMouseUp);
				tile.on('mouseupoutside', onMouseUp);
				tile.updatePositionPoint(this.getLocationPointForTile(i,j));
				gameMap.addChild(tile.sprite);
			}
		}

		return gameMap;
	},

	generateNewMap: function(desertInTheMiddle){
		let types = Constants.tiles;
		let template = Constants.mapTemplate;
		let temp= [];
		let tiles = [];
		_.each(types, (tile, name, list)=>{
			if(name !== "water") {
				for(let i=0; i < tile.count; i++) {
					temp.push(name);
				}
			}

		});

		let l = temp.length;
		for(let i=0; i < l; i++) {
			let rand = Math.random() * temp.length;
			tiles.push(temp.splice(rand,1)[0]);
		}

		if(desertInTheMiddle) {
			for(let i=0; i < tiles.length; i++) {
				if(tiles[i] === "desert") {
					let tmp = tiles[9];
					tiles[9] = "desert";
					tiles[i] = tmp;
					break;
				}
			}
		}

		for(let i=0; i < template.length; i++) {
			let row = template[i];
			for(let j=0; j < row.length; j++) {
				if(row[j] !== "water") {
					row[j] = tiles.shift();
				}
			}
		}

		if(map) stage.removeChild(map);

		map = this.renderGameMap(template);

		stage.addChild(map);
		requestAnimFrame( this.animate );

	},

	getLocationPointForTile: function(row, col){
		let y = row * 95 + 31;
		let x = 55 + ( -(row % 2) * 55 ) + ( (col % 7) * 110 );

		return new PIXI.Point(x, y);
	},

	createTileNode: function(type){
		return tileStore.createNewNode(type, this.state.textures[type]);
	},

	createSprite: function(texture){
		let sprite = new PIXI.Sprite(texture);
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;
		return sprite;
	},

	loadTextures: function(textures){
		let texs = this.state.textures || {};
		_.each(textures, (tex, name, list)=>{
			texs[name] = new PIXI.Texture.fromImage(tex.url);
		});

		this.setState({
			textures: texs
		});
	},

	getInitialState() {
		return {
			width: 655,
			height: 625,
			renderer: {},
			textures: {}
		}
	},

	animate: function() {
		requestAnimFrame( this.animate );

		// render the stage
		renderer.render(stage);

	},

	render: function () {
		return (
			< div className="container">
				<div className="rightPanel">
					<a className="button" onClick={this.generateNewMap.bind(this, true)}>Generate New Map</a>
				</div>
			</div>
		);
	}
})

module.exports = Editor;

