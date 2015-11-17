const React = require('react');
const $ = require('jquery');

var Home = React.createClass({
    componentDidMount: function () {
        console.log(this.props.sessionHandler);
        let user = this.props.sessionHandler.getUser();
        if(user) {
            this.setState({
                user: user
            });
        } else {
            window.location.href = "/#/create-user";
        }
    },

    getInitialState() {
        return {
            user: null
        }
    },

    render: function () {
        if(this.state.user) {
            return (
                <div className = "container page home" >

                </div>
            );

        } else return (<div className = "container page home" ></div>);
    }
})

module.exports = Home;
