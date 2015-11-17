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
				<ul>
					<li>
						<a href="#/" className="button">Games</a>
					</li>
					<li>
						<a onClick={this.logout} className="button primary">{this.state.user.userName} (Logout)</a>
					</li>
				</ul>

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
			<div className = "header" >
				{this.renderMenu()}
			</div>
		);
	}
})

module.exports = Header;
