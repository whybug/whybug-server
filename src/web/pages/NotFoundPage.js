var React = require('react');

import {Header} from '../components/Header';
var {div} = React.DOM;

class _NotFoundPage {
  render() {
    return div({},
      Header({}),
      div({}, 'Not found :-(')
    )
  }
}

export var NotFoundPage = React.createClass(_NotFoundPage.prototype);
