var React = require('react'),
    Async = require('react-async'),
    Router = require('react-router-component'),
    config = require('../../config/config'),
    routes = require('../../config/routes');

var {Location, Locations} = Router;

import {StartPage} from './start/StartPage';
import {SolutionCreatePage} from './solutions/SolutionCreatePage';
import {SolutionViewPage} from './solutions/SolutionViewPage';
import {SolutionSearchPage} from './solutions/SolutionSearchPage';
import {NotFoundPage} from './common/NotFoundPage';

class _WebApp {
  get mixins() { return [Async.Mixin]; }

  getInitialStateAsync(callback) {
    callback(null, {
      user: this.props.user,
      params: this.props.params
    });
  }

  getPages() {
    return [
      {path: routes.web.startpage.path, handler: StartPage},
      {path: routes.web.solution.search.path, handler: SolutionSearchPage},
      {path: routes.web.solution.create.path, handler: SolutionCreatePage},
      {path: routes.web.solution.view.path, handler: SolutionViewPage},
      {path: null, handler: NotFoundPage}
    ];
  }

  render() {
    return this.transferPropsTo(
      Locations({path: this.props.path},
        this.getPages().map((page) => Location({
          path: page.path,
          handler: page.handler,
          user: this.state.user,
          params: this.state.params
        }))
      )
    );
  }
}

export var WebApp = React.createClass(_WebApp.prototype);
