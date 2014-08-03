var React = require('react'),
    Router = require('react-router-component');

var { Location, Locations, NotFound } = Router;

import {StartPage} from './pages/StartPage';
import {NotFoundPage} from './pages/NotFoundPage';

class App {
  render() {
    return Locations({path: this.props.path},
      Location({path: "/", handler: StartPage}),
      Location({path: null, handler: NotFoundPage})
    );
  }
}

export var WebApp = React.createClass(App.prototype);
