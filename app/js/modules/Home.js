const React = require('react');
const $ = require('jquery');
const Game = require('./Game');
const PIXI = require('pixi');

var Home = React.createClass({
    componentDidMount: function () {

    },
    render: function () {
        return ( < div className = "container page" >
                <Game />
            </div>);
    }
})

module.exports = Home;
