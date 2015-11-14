"use strict";

class LocalStorage {
	static get(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	static set(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static clear() {
		localStorage.clear();
	}
}

module.exports = LocalStorage;