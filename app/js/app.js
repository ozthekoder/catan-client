require("./util/Start");
const React = require('react');
const Router = require('react-router');
const $ = require('jquery');
const Route = Router.Route;
const RouteHandler = Router.RouteHandler;
var Home = wrap(require('./modules/Home'));
var Header = wrap(require('./components/Header'));
var CreateUser = wrap(require('./modules/CreateUser'));
var Editor = wrap(require('./modules/Editor'));
const SessionHandler = require('./util/SessionHandler');
var sessionHandler = new SessionHandler();


let App = React.createClass({
  render: function(){
    return (
      <div className="container" id="app">
        <Header />
        <RouteHandler/>
      </div>
    );
  }
});


let onEnter = function(){
    $("label.burger").click();
}
var routes = (
  <Route handler={App} >
    <Route onEnter={onEnter} path="/" handler={Home} />
      <Route onEnter={onEnter} path="/create-user" handler={CreateUser} />
      <Route onEnter={onEnter} path="/editor" handler={Editor} />
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});

function wrap(Component) {
    return React.createClass({
        render(){
            return (
                <Component sessionHandler={sessionHandler} />
            )
        }
    });
}