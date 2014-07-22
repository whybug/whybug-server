var React = require('react');

import {HeaderComponent} from '../components/HeaderComponent';
var {div} = React.DOM;

export var NotFoundPage = React.createClass({
  render() {
    return div({},
      HeaderComponent({}),
      div({}, 'notfound')
    )
  }
});

