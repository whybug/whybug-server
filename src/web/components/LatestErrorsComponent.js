var React = require('react'),
    Async = require('react-async'),
    request = require('superagent');

var {div, p, h2, h3} = React.DOM;
//var {Link} = Router;
//import {ErrorElement} from '../elements/ErrorElement';

class LatestErrors {

  get mixins() {
    return [Async.Mixin];
  }

  getInitialStateAsync(cb) {
    request.get('http://whybug.lo/api/error_logs/latest').end((err, result) => {
      if (err) {
        cb(err, {error_logs: []});
      } else {
        cb(err, {error_logs: result.body});
      }
    });
  }

  componentWillMount() {
    if (this.state.error_logs) {
      return;
    }

    this.getInitialStateAsync((err, result) => {
      this.setState(result);
    });
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

export var LatestErrorsComponent = React.createClass(LatestErrors.prototype);
