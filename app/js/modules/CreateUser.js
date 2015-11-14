const React = require('react');
const $ = require('jquery');

var CreateUser = React.createClass({
	getInitialState: function(){
		return {
			userNameValid: false,
			labelCls: "label error",
			labelText: "no good!"
		}
	},
	componentDidMount: function () {
		//let handler = this.props.sessionHandler;
		//handler.on("login", (payload)=>{
		//	handler.login(payload);
		//});
	},
	render: function () {
		return (
			<div className = "create-user container page" >
				<form>
					<input type="text" onKeyUp={this.onKeyUp} placeholder="Enter User Name Here.." />
					<label className={this.state.labelCls}>{this.state.labelText}</label>
				</form>
			</div>
		);
	},
	onKeyUp(e) {
		let value = e.target.value;
		console.log(value);
		if(e.keyCode === 13) {
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
