var React = require('react'),
    Async = require('react-async');

var {div, a, h1, h2, h3, form, input, p} = React.DOM;

import {WhybugApi} from '../WhybugApi';

class _Search {

  get mixins() {
    return [Async.Mixin];
  }

  getInitialStateAsync(callback) {
    WhybugApi.searchErrors((error, result) => callback(error, {
      error_logs: result
    }));
  }

  render() {
    var error_logs = this.state.error_logs || [];

    return div({},
      div({className: 'section hero search-hero'},
        div({className: 'w-container container'},
          a({href: '#', className: 'button small'}, 'Back to search'),
          h1({className: 'error-headline'}, 'Find a solution to your error message.'),
          div({className: 'w-form sign-up-form'},
            form({className: 'w-clearfix', name: 'wf-form-signup-form'},
              input({className: 'w-input field', name: 'query', type: 'text', placeholder: 'Enter error messsage...'}),
              input({className: 'w-button button', type: 'submit', value: 'Search'})
            )
          )
        )
      ),

      h2({}, 'list of errors'),
      error_logs.map((error) => {
        return div({},
          h3({}, `${error.errorLevel}: ${error.errorMessage}`),
          p({className: 'error-created'}, error.created),
          p({className: 'error-programming-language'}, `${error.programmingLanguage} ${error.programmingLanguageVersion}`)
        );
      })
    );
  }
}

export var Search = React.createClass(_Search.prototype);
