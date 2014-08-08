var React = require('react'),
    Async = require('react-async');

var {div, p, h2, h3} = React.DOM;

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
