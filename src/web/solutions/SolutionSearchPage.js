var React = require('react'),
    Async = require('react-async');

import {Header} from '../common/ui/Header';
import {SearchForm, SearchResultList, SearchResult} from './Search';
import {Section} from '../common/ui/Elements';
import {SolutionStore} from './SolutionStore';

var {div, main, label} = React.DOM;

export var SolutionSearchPage = React.createClass({

  get mixins() { return [Async.Mixin]; },

  render() {
    var solutions = this.state.solutions || [];

    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, SearchForm({query: this.state.params})),

      Section({className: 'grey'},
        div({className: 'w-row'},

          main({className: 'w-col w-col-9'}, this.renderSearchResults(solutions) ),

          div({className: 'w-col w-col-3'},
            label({htmlFor: 'programminglanguage'}, 'Language'),
            solutions.aggregations.programminglanguage.buckets.map((agg) => div({}, agg.key + "(" + agg.doc_count + ")")),

            label({htmlFor: 'level'}, 'Level'),
            solutions.aggregations.level.buckets.map((agg) => div({}, agg.key + "(" + agg.doc_count + ")")),

            label({htmlFor: 'os'}, 'Operating system'),
            solutions.aggregations.os.buckets.map((agg) => div({}, agg.key + "(" + agg.doc_count + ")"))

            //label({htmlFor: 'project'}, 'Project')
          )
        )
      )
   )
  },

  renderSearchResults(solutions) {
    if (solutions.total) {
      return solutions.solutions.map(solution => SearchResult(solution))
    }

    return div({}, 'No errors found');
  },

  getInitialStateAsync(callback) {
    // todo: add query from url.
    SolutionStore.searchSolutions('', (error, result) => callback(error, {
      solutions: result
    }));
  },

  componentDidMount() {
    SolutionStore.attachResultListener(this.onResult);
  },

  componentWillUnmount() {
    SolutionStore.removeResultListener(this.onResult)
  },

  onResult() {
    this.setState({
      solutions: SolutionStore.state
    });
  }
});

