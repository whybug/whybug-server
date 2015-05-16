var React = require('react'),
    Router = require('react-router'),
    config = require('../../config/config'),
    routes = require('../../config/routes');

var {RouteHandler} = Router;

export var WebApp = React.createClass({
  render() {
    return <RouteHandler {...this.props} />;
  }
});
