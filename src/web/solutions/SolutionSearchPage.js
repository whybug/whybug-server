var React = require('react'),
    Async = require('react-async'),
    Router = require('react-router-component'),
    NavigatableMixin = require('react-router-component').NavigatableMixin,
    routes = require('../../../config/routes'),
    Spinner = require('react-spinkit');

import {Header} from '../common/ui/Header';
import {Section} from '../common/ui/Elements';
import {WhybugApi} from '../WhybugApi';

var {Link} = Router;
var {section, div, main, a, ul, li, h1, h2, h3, form, label, input, p, span} = React.DOM;


var UnsolvedError = React.createClass({

  render() {
    var error = this.props.error;
    return Link({href: this.getSolutionLinkForError(), className: 'content-block'},
      h3({className: 'latest-errors'}, error.level,  ': ', error.message),
      span({className: 'button', onClick: this.handleHide}, 'hide')
    );
  },

  /**
   * Returns a link to create a solution based on
   * the specified error.
   *
   * @returns {string}
   */
  getSolutionLinkForError() {
    return routes.web.solution.create.path.replace(':error_uuid', this.props.error.uuid);
  },

  handleHide(event) {
    event.preventDefault();
    this.props.onHide(this.props.error);
  }
});

/**
 * Displays a list of unresolved errors.
 */
var UnsolvedErrorList = React.createClass({
  get mixins() { return [Async.Mixin]; },

  getInitialStateAsync(callback) {
    WhybugApi.findUnsolvedErrors((error, result) => callback(error, {
      unsolved_errors: result
    }));
  },

  render() {
    if (this.state.unsolved_errors) {
      return div({}, this.state.unsolved_errors.map(error => UnsolvedError({
        key: error.uuid,
        error: error,
        onHide: this.handleHideError
      })));
    }

    return div({}, 'No unsolved errors found');
  },

  handleHideError(error) {
    WhybugApi.hideError(error, () => {
      this.setState({
        unsolved_errors: this.state.unsolved_errors.filter(unresolved_error => unresolved_error.uuid !== error.uuid)
      })
    });
  }
});

export var SolutionSearchPage = React.createClass({

  get mixins() { return [Async.Mixin, NavigatableMixin]; },

  getInitialStateAsync(callback) {
    var query = this.props.query.query;
    WhybugApi.searchSolutions(query, (error, result) => callback(error, {
      solutions: result,
      query: query
    }));
  },

  onResult(error, result) {
    this.setState({
      loading: false,
      solutions: result
    });
  },

  onSearch(query) {
    // todo: this.navigate(routes.web.solution.search.path + "?query=" + query);
    this.setState({
      loading: true,
      query: query
    });
    WhybugApi.searchSolutions(query, this.onResult);
  },

  render() {
    var solutions = this.state.solutions || [];

    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, SearchForm({query: this.state.query, searchCallback: this.onSearch})),

      Section({className: 'grey'},
        div({className: 'w-row'},

          main({className: 'w-col w-col-9'},
            this.renderSearchResults(solutions),
            this.props.user ?  h3({}, 'Unresolved errors', UnsolvedErrorList({})) : ''
          ),

          div({className: 'w-col w-col-3'},
            SearchResultAggregation({agg: 'programminglanguage', title: 'Language', solutions: solutions}),
            SearchResultAggregation({agg: 'level', title: 'Level', solutions: solutions}),
            SearchResultAggregation({agg: 'os', title: 'Operating system', solutions: solutions})
          )
        )
      )
   )
  },

  renderSearchResults(solutions) {
    if (this.state.loading) {
      return Spinner({
        spinnerName: 'three-bounce', fadeIn: true
      });
    }

    if (solutions.total) {
      return solutions.solutions.map(solution => {
        solution.key = solution.uuid;
        return SearchResult(solution);
      })
    }

    return div({}, 'No errors found');
  }


});

export var SearchResultAggregation = React.createClass({

  render() {
    var aggs = this.props.solutions.aggregations[this.props.agg];
    return div({},
      label({htmlFor: this.props.agg}, this.props.title),
      ul({},
        aggs.buckets.map(agg => li({key: agg.key}, agg.key + "(" + agg.doc_count + ")"))
      )
    )
  }
});


export var SearchForm = React.createClass({

  getInitialState() {
    return {
      query: this.props.query
    };
  },

  onChange(event) {
    clearTimeout(this.timeout);
    this.setState({query: event.target.value});
    this.timeout = setTimeout(this.onSubmit, 500);
  },

  onSubmit(event) {
    if (event) event.preventDefault();
    clearTimeout(this.timeout);

    this.props.searchCallback(this.state.query);
  },

  render() {
    return div({},
      h1({}, 'Find solutions.'),
      form({onSubmit: this.onSubmit, name: 'search-form', method: 'get'},
        div({className: 'w-row'},
          div({className: 'w-col w-col-9'},
            input({
              placeholder: 'Enter error messsage...',
              onChange: this.onChange,
              value: this.state.query,
              className: 'w-input field',
              name: 'query',
              id: 'query',
              type: 'text'
            })
            //div({className: 'hint-text'}, 'Hint: You can use language:php or language:javascript, type:warning and platform:windows to narrow down your search.')
          ),
          div({className: 'w-col w-col-3'},
            input({ className: 'w-button button submit-button', type: 'submit', value: 'Search', dataWait: 'Searching...' })
          )
        )
      )
    );
  }
});

export var SearchResult = React.createClass({
  propTypes: {
    uuid: React.PropTypes.string,
    level: React.PropTypes.string,
    message: React.PropTypes.string,
    programminglangauge: React.PropTypes.string
  },

  render() {
    return Link({href: this.getSolutionLink(), className: 'content-block'},
      h3({className: 'latest-errors'}, this.props.level,  ': ', this.props.message)
    );
  },

  getSolutionLink() {
    return routes.web.solution.view.path
      .replace(':language', this.props.programminglanguage)
      .replace(':slug', this.props.uuid);
  }
});
