var React = require('react');

import {Header} from '../common/ui/Header';
import {Section} from '../common/ui/Elements';

var {h1, div} = React.DOM;

class Start{
  render() {
    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, h1({}, 'Solutions to errors, right where they happen.'))
   )
  }
}

export var StartPage = React.createClass(Start.prototype);
