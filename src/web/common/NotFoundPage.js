var React = require('react');

import {Header} from './ui/Header';
var {div} = React.DOM;

class _NotFoundPage {
  render() {
    return div({},
      Header({user: this.props.user}),
      div({}, 'Not found :-(')
    )
  }
}

export var NotFoundPage = React.createClass(_NotFoundPage.prototype);
