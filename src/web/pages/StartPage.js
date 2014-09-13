var React = require('react');

import {Header} from '../components/Header';
import {Section} from '../components/Elements';

var {h1, div} = React.DOM;

class Start{
  render() {
    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, h1({}, 'Solutions to your error messages.'))
   )
  }
}

export var StartPage = React.createClass(Start.prototype);
