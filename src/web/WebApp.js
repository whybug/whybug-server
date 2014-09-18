var React = require('react'),
    Async = require('react-async'),
    Router = require('react-router-component'),
    config = require('../../config/config'),
    routes = require('../../config/routes');

var {Location, Locations} = Router;

import {StartPage} from './pages/StartPage';
import {SolutionPage} from './pages/SolutionPage';
import {SolutionSearchPage} from './pages/SolutionSearchPage';
import {NotFoundPage} from './pages/NotFoundPage';

class _WebApp {
  get mixins() { return [Async.Mixin]; }

  getInitialStateAsync(callback) {
    callback(null, {
      user: this.props.model
    });
  }

  render() {
    return Locations({path: this.props.path},
      Location({path: routes.web.startpage.path, handler: StartPage, user: this.state.model}),
      Location({path: routes.web.solution_search.path, handler: SolutionSearchPage, user: this.state.model}),
      Location({path: routes.web.solution.path, handler: SolutionPage, user: this.state.model}),
      Location({path: null, handler: NotFoundPage, user: this.state.model})
    );
  }
}

export var WebApp = React.createClass(_WebApp.prototype);
