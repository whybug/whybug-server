var React = require('react'),
    Async = require('react-async');

var {section, div, main, a, h1, h2, h3, form, input, p} = React.DOM;

import {SolutionStore} from '../stores/SolutionStore';
import {WhybugApi} from '../WhybugApi';


class _SearchForm {
  onChange(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.onSubmit, 500);
  }

  onSubmit(event) {
    if (event) event.preventDefault();
    clearTimeout(this.timeout);

    SolutionStore.searchSolutions(document.getElementById('query').value);
  }

  render() {
    return section({className: 'section hero'},
      div({className: 'w-container'},
        h1({}, 'Find a solution to your error message'),
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
              }),
              div({className: 'hint-text'}, 'Hint: You can use language:php or language:javascript, type:warning and platform:windows to narrow down your search.')
            ),
            div({className: 'w-col w-col-3'},
              input({ className: 'w-button button submit-button', type: 'submit', value: 'Search', dataWait: 'Searching...' })
            )
          )
        )
      ));
  }
}
var SearchForm = React.createClass(_SearchForm.prototype);

class _SearchResultList {
  render() {
    return section({className: 'section grey error-section'},
      div({className: 'w-container'},
        div({className: 'w-row'},
          main({className: 'w-col w-col-9'},
            h2({}, 'All error messages'),
            this.props.searchResults.length ? this.props.searchResults : div({}, 'No errors found')
          ),
          div({className: 'w-col w-col-3'})
        )
      )
    );
  }
}

var SearchResultList = React.createClass(_SearchResultList.prototype);

class _SearchResult{
  render() {
    return div({className: 'content-block'},
      h3({className: 'latest-errors'}, this.props.error.errorLevel,  ': ', this.props.error.errorMessage)
//      p({className: 'solution-text'}, error.created),
//      p({className: 'solution-text'}, `${error.programmingLanguage} ${error.programmingLanguageVersion}`)
    );
  }
}

var SearchResult = React.createClass(_SearchResult.prototype);

class _Search {

  get mixins() { return [Async.Mixin]; }

  render() {
    var errors = this.state.errors || [];

    return div({},
      SearchForm({query: this.state.query}),
      SearchResultList({searchResults: errors.map(error => SearchResult({error: error}))})
    );
  }

  getInitialStateAsync(callback) {
    // todo: add query from url.
    SolutionStore.searchSolutions('', (error, result) => callback(error, {
      errors: result
    }));
  }

  componentDidMount() {
    SolutionStore.attachResultListener(this.onResult);
  }

  componentWillUnmount() {
    SolutionStore.removeResultListener(this.onResult)
  }

  onResult() {
    this.setState({
      errors: SolutionStore.searchResults
    });
  }
}

export var Search = React.createClass(_Search.prototype);
