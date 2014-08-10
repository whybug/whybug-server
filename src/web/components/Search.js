var React = require('react'),
    Async = require('react-async');

var {section, div, main, a, h1, h2, h3, form, input, p} = React.DOM;

import {SolutionStore} from '../stores/SolutionStore';
import {WhybugApi} from '../WhybugApi';

class _Search {

  get mixins() {
    return [Async.Mixin];
  }

  getInitialStateAsync(callback) {
    SolutionStore.searchSolutions('', callback);
  }

  render() {
    var errors = this.state.errors || [];
    var errorList = errors.map(this._getErrorComponent);

    return div({},
      section({className: 'section hero'},
        div({className: 'w-container'},
          h1({}, 'Find a solution to your error message'),
          form({
              name: 'search-form',
              method: 'get',
              onSubmit: this._onSubmit
            },
            div({className: 'w-row'},
              div({className: 'w-col w-col-9'},
                input({
                  placeholder: 'Enter error messsage...',
                  onChange: this._onChange,
                  value: this.state.query,
                  className: 'w-input field',
                  name: 'query',
                  type: 'text'
                }),
                div({className: 'hint-text'},
                  'Hint: You can use language:php or language:javascript, type:warning and platform:windows to narrow down your search.')
              ),
              div({className: 'w-col w-col-3'},
                input({
                  className: 'w-button button submit-button',
                  type: 'submit',
                  value: 'Search',
                  dataWait: 'Searching...'
                })
              )
            )
          )
        )),
      section({className: 'section grey error-section'},
        div({className: 'w-container'},
          div({className: 'w-row'},
            main({className: 'w-col w-col-9'},
              h2({}, 'All error messages'),
              errors.length ? errorList : div({}, 'No errors found')
            ),
            div({className: 'w-col w-col-3'})
          )
        )
      )
    );
  }

  _onChange(event) {
    this.setState({query: event.target.value});
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this._onSubmit, 500);
  }

  _onSubmit(event) {
    if (event) event.preventDefault();
    clearTimeout(this.timeout);
    SolutionStore.searchSolutions(this.state.query, (err, res) => {this.setState(res);});
  }

  _getErrorComponent(error) {
    return div({className: 'content-block'},
      h3({className: 'latest-errors'}, `${error.errorLevel}: ${error.errorMessage}`)
//      p({className: 'solution-text'}, error.created),
//      p({className: 'solution-text'}, `${error.programmingLanguage} ${error.programmingLanguageVersion}`)
    );
  }
}

export var Search = React.createClass(_Search.prototype);
