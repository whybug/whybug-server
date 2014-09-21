var React = require('react'),
    Async = require('react-async'),
    Router = require('react-router-component'),
    config = require('../../config/config'),
    routes = require('../../config/routes');

var {Location, Locations} = Router;

import {StartPage} from './start/StartPage';
import {SolutionPage} from './solutions/SolutionPage';
import {SolutionSearchPage} from './solutions/SolutionSearchPage';
import {NotFoundPage} from './common/NotFoundPage';

class _WebApp {
  get mixins() { return [Async.Mixin]; }

  getInitialStateAsync(callback) {
    callback(null, {
      user: this.props.user
    });
  }

  render() {
    return Locations({path: this.props.path},
      Location({path: routes.web.startpage.path, handler: StartPage, user: this.state.user}),
      Location({path: routes.web.solution_search.path, handler: SolutionSearchPage, user: this.state.user}),
      Location({path: routes.web.solution.path, handler: SolutionPage, user: this.state.user}),
      Location({path: null, handler: NotFoundPage, user: this.state.user})
    );
  }
}

export var WebApp = React.createClass(_WebApp.prototype);
