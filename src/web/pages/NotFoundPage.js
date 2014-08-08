var React = require('react');

import {Header} from '../components/Header';
var {div} = React.DOM;

export var NotFoundPage = React.createClass({
  render() {
    return div({},
      Header({}),
      div({}, 'notfound')
    )
  }
});

