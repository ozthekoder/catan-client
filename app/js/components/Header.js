const React = require('react');
const $ = require('jquery');

var Header = React.createClass({
	componentDidMount: function () {

		let user = this.props.sessionHandler.getUser();
		if(user) {
			this.setState({
				user: user
			});
		} else {
			this.props.sessionHandler.on("create-user", (payload)=>{
				this.setState({user: payload.user});
			});
		}
	},

	getInitialState() {
		return {
			user: null
		}
	},

	renderMenu: function() {
		if(this.state.user) {
			return (
			<div className="menu">
				<a href="#/" className="pseudo button">Games</a>
				<a onClick={this.logout} className="button">{this.state.user.userName} (Logout)</a>
			</div>
			)
		} else {
			return null;
		}
	},

	logout: function() {
		this.props.sessionHandler.logout();
		this.setState({user: null});
	},

	render: function () {
		return (
			<nav className="header">
				<a href="#" className="brand">Catan For All</a>
				<input id="header" type="checkbox" className="show" />
				<label htmlFor="header" className="burger pseudo button">&#9776;</label>
				{this.renderMenu()}
			</nav>
		);
	}
})

module.exports = Header;
