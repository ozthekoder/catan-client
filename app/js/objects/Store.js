"use strict";

const _ = require('lodash');
const Entity = require('./Entity');
class Store {

	constructor(entities) {
		this.entities = entities || {};
	}

	get(id) {
		return this.entities[id];
	}

	set(entity) {
		this.entities[entity._id] = entity;
	}

	add(entity) {
		return this.entities[entity._id] = entity;
	}

	remove(id) {
		delete this.entities[id];
	}

	getAll() {
		return this.entities;
	}
}

module.exports = Store;