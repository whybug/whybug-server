var React = require('react');

import {HeaderComponent} from '../components/HeaderComponent';
import {LatestErrorsComponent} from '../components/LatestErrorsComponent';
var {div} = React.DOM;

class Start {
  render() {
    return div({},
      HeaderComponent({}),
      div({}, 'startpage'),
      LatestErrorsComponent({limit: 10})
      //FooterComponent({}),
    )
  }
}

export var StartPage = React.createClass(Start.prototype);
