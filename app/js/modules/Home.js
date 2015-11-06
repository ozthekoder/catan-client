const React = require('react');
const $ = require('jquery');
const Editor = require('./Editor');

var Home = React.createClass({
    componentDidMount: function () {

    },
    render: function () {
        return ( < div className = "container page" >
                <Editor />
            </div>);
    }
})

module.exports = Home;
