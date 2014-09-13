var React = require('react');

import {Header} from '../components/Header';
import {Search} from '../components/Search';
import {Section} from '../components/Elements';

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

Routes

*/

export var SolutionPage = React.createClass({

  get propTypes() {
    return {
      errorMessageSlug: React.PropTypes.string.isRequired
    }
  },

  /**
   * Select the solution given by the router.
   */
  getInitialStateAsync(callback) {
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
      !this.props.solution || Section({className: 'hero'},
        h1({}, this.props.solution.errorMessage)
      ),
      div({}, 'solution page')
   )
  }


});

