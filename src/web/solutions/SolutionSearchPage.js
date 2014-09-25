var React = require('react'),
    Async = require('react-async');

import {Header} from '../common/ui/Header';
import {SearchForm, SearchResultList, SearchResult} from './Search';
import {Section} from '../common/ui/Elements';
import {SolutionStore} from './SolutionStore';

var {div} = React.DOM;

export var SolutionSearchPage = React.createClass({

  get mixins() { return [Async.Mixin]; },

  render() {
    var errors = this.state.errors || [];

    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, SearchForm({query: this.state.params})),

      Section({className: 'grey'}, SearchResultList({
        searchResults: errors.map(error => SearchResult({key: error.uuid, error: error}))
      }))
   )
  },

  getInitialStateAsync(callback) {
    // todo: add query from url.
    SolutionStore.searchSolutions('', (error, result) => callback(error, {
      errors: result
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
      errors: SolutionStore.state
    });
  }
});
