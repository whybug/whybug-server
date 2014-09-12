var React = require('react');

import {Header} from '../components/Header';

var {div} = React.DOM;

class Start{
  render() {
    return div({},
      Header({})
   )
  }
}

export var StartPage = React.createClass(Start.prototype);
