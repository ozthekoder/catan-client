var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Home = require('./modules/Home');
var CreateUser = require('./modules/CreateUser');
var Editor = require('./modules/Editor');

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
})();

window.socket = io();

var App = React.createClass({
  render: function(){
    return (
      <div className="container" id="app">
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App} >
    <Route path="/" handler={Home} />
      <Route path="/create-user" handler={CreateUser} />
      <Route path="/editor" handler={Editor} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
