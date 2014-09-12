var React = require('react');

import {Header} from '../components/Header';
import {Search} from '../components/Search';

var {div} = React.DOM;

class _SolutionSearchPage {
  render() {
    return div({},
      Header({}),
      Search({limit: 10})
   )
  }
}

export var SolutionSearchPage = React.createClass(_SolutionSearchPage.prototype);
