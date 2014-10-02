var React = require('react'),
    Async = require('react-async');

import {Header} from '../common/ui/Header';
import {WhybugApi} from '../WhybugApi';
import {Section} from '../common/ui/Elements';

var {div, h1} = React.DOM;

export var SolutionViewPage = React.createClass({

  mixins: [ Async.Mixin ],

  propTypes: {
      errorMessageSlug: React.PropTypes.string.isRequired
  },

  /**
   * Select the solution given by the router.
   */
  getInitialStateAsync(callback) {
    WhybugApi.findSolutionByUuid(this.props.errorMessageSlug, (err, solution) => callback(err, {
      solution: solution
    }));
  },

  render() {
    console.log(this.state);
    var solution = this.state.solution || {};

    return div({},
      Header({user: this.props.user}),
      // SolutionHero({solution: this.state.solution))
      // SolutionDetail({solutoin: this.state.solution))
      !solution || Section({className: 'hero'},
        h1({}, solution.message)
      ),
      Section({className: 'grey'},
        div({}, solution.description)
      )
   )
  }

});

