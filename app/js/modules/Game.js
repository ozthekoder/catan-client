const React = require('react');
const $ = require('jquery');
const _ = require('lodash');
const PIXI = require('pixi');
const Constants = require('../util/Constants.json');
var stage = new PIXI.Stage("0x000000");
var renderer = PIXI.autoDetectRenderer(Constants.mapWidth, Constants.mapHeight);
var map = null;
var Game = React.createClass({
	componentDidMount: function () {
		var socket = io.connect();

		socket.on('ping', function(data){
			data = JSON.parse(data);
			console.log(data.message);
			socket.emit('ping', { message: 'ping!'});
		});
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
		let gameMap = new PIXI.DisplayObjectContainer();;
		gameMap.position.x = 0;
		gameMap.position.y = 0;

		for(let i=0; i< map.length; i++) {
			let row = map[i];
			for(let j=0; j< row.length; j++) {
				let type = row[j];
				let sprite = this.createMapTileSprite(type);
				sprite.position = this.getLocationPointForTile(i,j);
				gameMap.addChild(sprite);
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

		let l = temp.length
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

	createMapTileSprite: function(type){
		let sprite = this.createSprite(this.state.textures[type]);
		sprite.scale.x = 0.5;
		sprite.scale.y = 0.5;
		return sprite;
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

module.exports = Game;

