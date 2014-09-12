var React = require('react'),
    Router = require('react-router-component');

var {Location, Locations} = Router;

import {config} from '../../config/config';
import {StartPage} from './pages/StartPage';
import {Header} from './components/Header';
import {SolutionPage} from './pages/SolutionPage';
import {SolutionSearchPage} from './pages/SolutionSearchPage';
import {NotFoundPage} from './pages/NotFoundPage';

class _WebApp {
  render() {
    var route = config.route.web;

    return Locations({path: this.props.path},
      Location({path: route.startpage.path, handler: StartPage}),
      Location({path: route.solution_search.path, handler: SolutionSearchPage}),
      Location({path: route.solution.path, handler: SolutionPage}),
      Location({path: null, handler: NotFoundPage})
    );
  }
}

export var WebApp = React.createClass(_WebApp.prototype);
