const React = require('react');
const Router = require('react-router');
const Route = Router.Route;
const RouteHandler = Router.RouteHandler;
const Home = require('./modules/Home');
const CreateUser = require('./modules/CreateUser');
const Editor = require('./modules/Editor');
const SessionHandler = require('./util/SessionHandler');
var sessionHandler = new SessionHandler();


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
})();

var App = React.createClass({
  render: function(){
    return (
      <div className="container" id="app">
        <RouteHandler/>
      </div>
    );
  }
});

let HomeWrapper = React.createClass({
    render() {
        return (
            <Home sessionHandler={sessionHandler} />
        )
    }
});

let EditorWrapper = React.createClass({
    render() {
        return (
            <Editor sessionHandler={sessionHandler} />
        )
    }
});

let CreateUserWrapper = React.createClass({
    render() {
        return (
            <CreateUser sessionHandler={sessionHandler} />
        )
    }
});

var routes = (
  <Route handler={App} >
    <Route path="/" handler={HomeWrapper} />
      <Route path="/create-user" handler={CreateUserWrapper} />
      <Route path="/editor" handler={EditorWrapper} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});