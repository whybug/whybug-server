var React = require('react'),
    Async = require('react-async');

import {Header} from '../common/ui/Header';
import {WhybugApi} from '../WhybugApi';
import {Section} from '../common/ui/Elements';
import {NotFoundPage} from '../common/NotFoundPage';

var {div, h1} = React.DOM;

export var SolutionViewPage = React.createClass({

  mixins: [ Async.Mixin ],

  propTypes: {
      slug: React.PropTypes.string.isRequired
  },

  /**
   * Select the solution given by the router.
   */
  getInitialStateAsync(callback) {
    WhybugApi.findSolutionByUuid(this.props.slug, (error, solution) => {
      if (error) {
        callback(null, {});
      } else {
        callback(null, { solution: solution });
      }
    });
  },

  render() {
    var solution = this.state.solution;

    if (!solution) {
      return NotFoundPage({});
    }
    debugger;

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

