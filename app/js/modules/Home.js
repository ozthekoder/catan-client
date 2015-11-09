const React = require('react');
const $ = require('jquery');
const Editor = require('./Editor');

var Home = React.createClass({
    componentDidMount: function () {
        socket.emit('ping', { message: 'ping!' });
        socket.on("ping", function(payload){
            console.log(payload);
            console.log(socket.id);
        });
    },
    render: function () {
        return (
            <div className = "container page home" >
                <form>
                    <input type="text" placeholder="Enter User Name Here.." />
                </form>
            </div>
        );
    }
})

module.exports = Home;
