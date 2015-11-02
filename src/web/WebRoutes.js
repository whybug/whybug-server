var React = require('react'),
    Router = require('react-router'),
    config = require('../../config/config'),
    routes = require('../../config/routes');
//var ReactDOM = require('react-dom');
//var ReactDOMServer = require('react-dom/server');

var {Route, NotFoundRoute} = Router;

import StartPage from './start/StartPage';
import SolveErrorPageController from './solutions/SolveErrorPageController';
import ViewSolutionPageController from './solutions/ViewSolutionPageController';
import SearchSolutionsPageController from './solutions/SearchSolutionsPageController';
import InstallationPage from './installation/InstallationPage';
import NotFoundPage from './common/NotFoundPage';
import WebApp from './WebApp';

export class WebRoutes {

  constructor(location) {
    this.location = location || Router.HistoryLocation;
  }

  getPages() {
    return [
      {name: 'startpage', path: routes.web.startpage.path, handler: StartPage},
      {name: 'search', path: routes.web.solution.search.path, handler: SearchSolutionsPageController},
      {name: 'solution_create', path: routes.web.solution.create.path, handler: SolveErrorPageController},
      {name: 'solution_view', path: routes.web.solution.view.path, handler: ViewSolutionPageController},
      {name: 'language_index', path: routes.web.installation.index.path, handler: InstallationPage},
      {name: 'language', path: routes.web.installation.language.path, handler: InstallationPage}
    ];
  }

  /**
   * Maps configured routes to react-router components.
   *
   * @returns {Object}
   */
  getRoutes() {
    return (
      <Route name="default" handler={WebApp}>
      {
          this.getPages().map((page) =>
            <Route
              name={page.name}
              path={page.path}
              handler={page.handler} />)
        }
        <NotFoundRoute handler={NotFoundPage} />
      </Route>
    );
  }

  renderOnElement(element) {
    let routes = this.getRoutes();

    Router.run(routes, this.location, (Handler, state) => {
      this.resolveData(state).then((data) => {
        React.render(<Handler {...data}/>, element);
      });
    });
  }

  resolveData(state) {
    let data = {};
    let rehydrated = {};

    if (typeof window !== 'undefined' && typeof window.__DATA__ == "object") {
      for (let key in window.__DATA__) {
        rehydrated[key] = window.__DATA__[key];
      }
    }

    var routes = state.routes
      .filter(route => route.handler.fetchData)
      //.filter(route => !data[route.name])
      .map(route =>
        route.handler
          .fetchData(state.params, state.query)
          .then(routeData => { data[route.name] = routeData })
          .catch(error => console.log(error))
      );

    return Promise.all(routes)
        .then(() => {
          return data;
        }).catch(error => console.log(error)
    );

  }

  getMarkup(callback) {
    let routes = this.getRoutes();

    Router.run(routes, this.location, (Handler, state) => {
      this.resolveData(state).then((data) => {
        callback(React.renderToString(<Handler {...data} />), data);
      }).catch(error => {
        console.log(error.stack);
        callback('An error occurred ' + '<pre>' + error.stack + '</pre>');
      });
    });
  }

}

