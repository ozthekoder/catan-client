const React = require('react');
const $ = require('jquery');

var CreateUser = React.createClass({
	getInitialState: function(){
		return {
			userNameValid: false,
			labelCls: "label error",
			labelText: "no good!",
			gameCount: null,
			userCount: null
		}
	},
	componentDidMount: function () {
		let handler = this.props.sessionHandler;

		handler.request("current-game-count").then((payload)=>{this.setState({ gameCount: payload });console.log(payload);});
		handler.request("current-user-count").then((payload)=>{this.setState({ userCount: payload });console.log(payload);});
		handler.on("current-user-count", (payload)=>{this.setState({ userCount: payload });console.log("broadcast yo");});
		handler.on("current-game-count", (payload)=>{this.setState({ gameCount: payload });console.log("broadcast yo");});

	},
	renderCounts(){
		if(this.state.gameCount || this.state.userCount) {
			return (
				<table>
					<tbody>
						<tr>
							<td>Current number of games being played</td>
							<td> {this.state.gameCount}</td>
						</tr>
						<tr>
							<td>Current number of players</td>
							<td> {this.state.userCount}</td>
						</tr>
					</tbody>

				</table>
			)
		}
	},
	render: function () {
		return (
			<div className = "create-user container page" >
				{this.renderCounts()}
				<form onSubmit={function(e){return false;}}>
					<input type="text" onKeyUp={this.onKeyUp} placeholder="Enter User Name Here.." />
					<label className={this.state.labelCls}>{this.state.labelText}</label>
				</form>
			</div>
		);
	},
	onKeyUp(e) {
		let value = e.target.value;
		if(e.keyCode === 13) {
			e.preventDefault();
			if(this.state.userNameValid) {
				let handler = this.props.sessionHandler;
				handler.request("create-user", { userName: value}).then((payload)=>{
					handler.login(payload);
				})
			}
		} else if(value.length > 1) {
			let i = 0;
			this.props.sessionHandler.request("check-user-name", value).then((alreadyExists)=>{
				if(alreadyExists) {
					this.setState({
						userNameValid: false,
						labelCls: "label error",
						labelText: "no good!"
					});
				} else {
					this.setState({
						userNameValid: true,
						labelCls: "label success",
						labelText: "good!"
					});
				}
			});
		} else {
			this.setState({
				userNameValid: false,
				labelCls: "label error",
				labelText: "no good!"
			});
		}



	}

})

module.exports = CreateUser;
