var React = require('react'),
    Async = require('react-async'),
    Router = require('react-router-component'),
    routes = require('../../../config/routes'),
    Spinner = require('react-spinkit');


import {Header} from '../common/ui/Header';
import {Section} from '../common/ui/Elements';
import {SolutionStore} from './SolutionStore';
import {WhybugApi} from '../WhybugApi';

var {Link} = Router;
var {section, div, main, a, h1, h2, h3, form, label, input, p} = React.DOM;

export var SolutionSearchPage = React.createClass({

  get mixins() { return [Async.Mixin]; },

  getInitialStateAsync(callback) {
    WhybugApi.searchErrors(this.props.query, (error, result) => callback(error, {
      solutions: result
    }));
  },

  onResult(error, result) {
    this.setState({
      loading: false,
      solutions: result
    });
  },

  onSearch(query, callback) {
    this.setState({loading: true});

    WhybugApi.searchErrors(query, this.onResult);
  },

  render() {
    var solutions = this.state.solutions || [];

    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, SearchForm({query: this.state.params, searchCallback: this.onSearch})),

      Section({className: 'grey'},
        div({className: 'w-row'},

          main({className: 'w-col w-col-9'}, this.renderSearchResults(solutions)),

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
  },

  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState;
  }

});


export var SearchForm = React.createClass({
  onChange(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.onSubmit, 500);
  },

  onSubmit(event) {
    if (event) event.preventDefault();
    clearTimeout(this.timeout);

    this.props.searchCallback(document.getElementById('query').value);
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
              value: this.props.query,
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
      .replace(':programmingLanguage', this.props.programminglanguage)
      .replace(':errorMessageSlug', this.props.uuid);
  }
});
