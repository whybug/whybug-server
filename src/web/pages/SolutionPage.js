var React = require('react');

import {Header} from '../components/Header';
import {Search} from '../components/Search';

var {div} = React.DOM;

class _SolutionPage {
  render() {
    return div({},
      Header({}),
      div({}, 'solution page')
   )
  }
}

export var SolutionPage = React.createClass(_SolutionPage.prototype);
