var React = require('react');

import {Header} from '../common/ui/Header';
import {Search} from './Search';

var {div} = React.DOM;

class _SolutionSearchPage {
  render() {
    return div({},
      Header({user: this.props.user}),
      Search({limit: 10, query: this.getUserQuery()})
   )
  }

  getUserQuery() {
    return '';
  }
}

export var SolutionSearchPage = React.createClass(_SolutionSearchPage.prototype);
