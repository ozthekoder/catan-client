const _ = require('lodash');
const Promise = require('bluebird');
const LocalStorage = require('./LocalStorage');
const events = require('../../data/comm.json');
const util = require('./Util');

class SessionHandler {
	constructor() {
		this.socket = io();
		this.session = {
			token: null,
			user: null
		}
		this.callbacks = {};

		this.attachListeners();
	}

	getToken() {
		if(!this.session.token) {
			this.session.token = LocalStorage.get("token");
		}

		return this.session.token;
	}

	getUser() {
		if(!this.session.user) {
			this.session.user = LocalStorage.get("user");
		}

		return this.session.user;
	}

	setToken(token) {
		this.session.token = token;
		LocalStorage.set("token", token);
	}

	setUser(user) {
		this.session.user = user;
		LocalStorage.set("user", user);
	}

	getSession(){
		return this.session;
	}

	attachListeners() {
		_.each(events, (event)=>{
			this.callbacks[event] = [];
			this.socket.on(event, (payload)=>{ _.each(this.callbacks[event], (func)=>func()) })
		});
	}

	login(payload) {
		console.log(payload);
		this.setUser(payload.user);
		this.setToken(payload.token);
		window.location.href = "/#/home";
	}

	request(request, params) {
		let promise = new Promise((resolve, reject) => {
			this.socket.once(request, (payload)=>{
				resolve(payload);
			});
		});

		if(!params) {
			this.socket.send(request);
		} else {
			this.socket.emit(request, params);
		}

		return promise;
	}
	on(event, callback) {
		this.callbacks[event].push(callback);
	}

	off(event, callback) {
		_.each(this.callbacks[event], (func, index, list)=> {
			if(func === callback) {
				this.callbacks[event].splice(index, 1);
				return false;
			}
		})
	}
}

module.exports = SessionHandler;