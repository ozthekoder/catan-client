const React = require('react');
const $ = require('jquery');
const _ = require('lodash');

var Home = React.createClass({
    componentDidMount: function () {
        let handler = this.props.sessionHandler;
        let user = handler.getUser();
        if(user) {
            this.setState({
                user: user
            });

            handler.request("current-games-info", (payload) => {
                console.log(payload);
                this.setState({
                    games: payload
                });
            });

            handler.on("current-games-info", (payload) => {
                console.log(payload);
                this.setState({
                    games: payload
                });
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
    renderRow(game) {
        let button = null;
        if(game.players.length < 4) {
            button = (<button>Join</button>);
        }
        return (
            <tr>
                <td>{game.name}</td>
                <td>{game.players.length}</td>
                <td>{button}</td>
            </tr>
        );
    },

    render: function () {
        if(this.state.user) {
            let rows = _.map(this.state.games, (game)=> this.renderRow(game));
            return (
                <div className = "container page home" >
                    <table className="primary">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th># of players</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
            );

        } else return (<div className = "container page home" ></div>);
    }
})

module.exports = Home;
