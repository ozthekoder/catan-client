"use strict";

const _ = require('lodash');
const Entity = require('./Entity');
class Store {

	constructor(entities) {
		this.entities = entities || {};
		this.count = 0;
	}

	get(id) {
		return this.entities[id];
	}

	set(entity) {
		entity.store = this;
		this.entities[entity._id] = entity;
	}

	add(entity) {
		this.count++;
		return this.entities[entity._id] = entity;

	}

	remove(id) {
		if(this.entities[id]) {
			this.count--;
			delete this.entities[id];
		}

	}

	getAll() {
		return this.entities;
	}

	size() {
		return this.count;
	}

	lookupBy(params) {
		return _.find(this.entities, params);
	}
}

module.exports = Store;