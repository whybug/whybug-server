var React = require('react'),
    ReactMount  = require('react/lib/ReactMount'),
    Router = require('react-router-component');

ReactMount.allowFullPageRender = true;

var { html, head, meta, title, link } = React.DOM;
var { Page, Pages, NotFound } = Router;

import {StartPage} from './pages/StartPage';
import {NotFoundPage} from './pages/NotFoundPage';
import {HeaderComponent} from './components/HeaderComponent';

export class App {
  render() {
    return html({},
      head({},
        link({rel: 'stylesheet', href: 'css/main.css'}),
        title({}, "whybug"),
        meta({charSet: "UTF-8"}),
        meta({name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"})
      ),
      Pages({path: this.props.path},
        Page({path: "/", handler: StartPage}),
        NotFound({handler: NotFoundPage})
      )
    );
  }
}

export var WebApp = React.createClass(App.prototype);

