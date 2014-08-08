var React = require('react');

import {Header} from '../components/Header';
import {Search} from '../components/Search';
var {div} = React.DOM;

class Start {
  render() {
    return div({},
      Header({}),
      div({}, 'startpage'),
      Search({limit: 10})
   )
  }
}

export var StartPage = React.createClass(Start.prototype);
