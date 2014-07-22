var React = require('react');
//    Router = require('react-router-component');

var {h3} = React.DOM;
//var {Link} = Router;

export var ErrorElement = React.createClass({
  render() {
    if (this.props.key) {
      return h3({}, `${this.props.errorLevel}: ${this.props.errorMessage}`);
    }
  }
});
