var React = require('react'),
    Async = require('react-async');

import {Header} from '../common/ui/Header';
import {Search} from './Search';
import {Section} from '../common/ui/Elements';

var {div, h1} = React.DOM;

/*
common/
  ui/
    Header
    Footer
    Links
    Buttons
  Dispatcher
  NotFoundPage

solutions/
  SolutionStore (selected, searchResults)
  SolutionSearchPage
  SolutionPage
  SolutionActions (select, search)

*/

class SolutionActions {
  static select(solutionSlug, callback) {
    Dispatcher.updateStores({
      actionType: 'solution.search',
      solutionSlug: solutionSlug,
      callback: callback
    });
  }
  static search(query, callback) {}
}

export var SolutionViewPage = React.createClass({

  mixins: [ Async.Mixin ],

  propTypes: {
      errorMessageSlug: React.PropTypes.string.isRequired
  },

  /**
   * Select the solution given by the router.
   */
  getInitialStateAsync(callback) {
    callback(null, {solution: {}});
    //SolutionActions.select(this.props.errorMessageSlug, (error, result) => callback(error, {
    //  solution: result
    //}));
  },

  componentDidMount() {
    //SolutionStore.addSelectListener(this.onSelect);
  },

  componentWillUnmount() {
    //SolutionStore.removeSelectListener(this.onSelect);
  },

  onSelect() {
    this.setState({
      //solution: SolutionStore.selectedSolution
    });
  },

  render() {
    return div({},
      Header({user: this.props.user}),
      // SolutionHero({solution: this.state.solution))
      // SolutionDetail({solutoin: this.state.solution))
      !this.props.solution || Section({className: 'hero'},
        h1({}, this.props.solution.errorMessage)
      ),
      div({}, 'solution page')
   )
  }


});

