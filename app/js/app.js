var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Home = require('./modules/Home');

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

var routes = (
  <Route handler={App} >
    <Route path="/" handler={Home} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});
