System.register("../../src/web/components/HeaderComponent", [], function() {
  "use strict";
  var __moduleName = "../../src/web/components/HeaderComponent";
  var React = require('react'),
      Router = require('react-router-component'),
      ReactTopcoat = require('react-topcoat');
  var Link = $traceurRuntime.assertObject(Router).Link;
  var $__0 = $traceurRuntime.assertObject(ReactTopcoat),
      NavigationBar = $__0.NavigationBar,
      NavigationBarItem = $__0.NavigationBarItem;
  var HeaderComponent = React.createClass({render: function() {
      return NavigationBar({onTop: true}, NavigationBarItem({
        position: 'left',
        width: 'quarter'
      }, Link({href: '/'}, 'whybug')), NavigationBarItem({
        position: 'right',
        width: 'quarter'
      }, Link({href: '/faq'}, 'FAQ')), NavigationBarItem({
        position: 'right',
        width: 'quarter'
      }, Link({href: '/about'}, 'About')));
    }});
  return {get HeaderComponent() {
      return HeaderComponent;
    }};
});
System.register("../../src/web/pages/NotFoundPage", [], function() {
  "use strict";
  var __moduleName = "../../src/web/pages/NotFoundPage";
  var React = require('react');
  var HeaderComponent = System.get("../../src/web/components/HeaderComponent").HeaderComponent;
  var div = $traceurRuntime.assertObject(React.DOM).div;
  var NotFoundPage = React.createClass({render: function() {
      return div({}, HeaderComponent({}), div({}, 'notfound'));
    }});
  return {get NotFoundPage() {
      return NotFoundPage;
    }};
});
System.register("../../config/config", [], function() {
  "use strict";
  var __moduleName = "../../config/config";
  var config = {debug: process.env.DEBUG || false};
  var cache_2min = {
    privacy: 'public',
    expiresIn: 2 * 60 * 1000
  };
  config.route = {
    web: {
      startpage: {
        method: 'GET',
        path: '/',
        config: {cache: cache_2min}
      },
      search_errors: {
        method: 'GET',
        path: '/search'
      },
      read_error: {
        method: 'GET',
        path: '/error/{programmingLanguage}/{errorMessageSlug}'
      },
      url_shortener: {
        method: 'GET',
        path: '/e/{p*}'
      }
    },
    api: {
      create_error: {
        method: 'POST',
        path: '/api/errors'
      },
      update_error: {
        method: 'PUT',
        path: '/api/errors/{error_uuid}'
      },
      search_errors: {
        method: 'GET',
        path: '/api/errors'
      },
      create_solution: {
        method: 'POST',
        path: '/api/errors/{error_uuid}/solutions'
      },
      update_solution: {
        method: 'PUT',
        path: '/api/errors/{error_uuid}/solutions/{solution_uuid}'
      },
      delete_solution: {
        method: 'DELETE',
        path: '/api/errors/{error_uuid}/solutions/{solution_uuid}'
      }
    }
  };
  config.web = {url: process.env.WEB_URL || 'http://127.0.0.1:8000'};
  config.node = {
    host: process.env.WEB_HOST || '127.0.0.1',
    port: process.env.WEB_PORT || 8000
  };
  config.mysql = {
    host: process.env.MYSQL_URL || 'localhost',
    port: process.env.MYSQL_URL || 3360,
    user: process.env.MYSQL_USER || '',
    pass: process.env.MYSQL_PASS || ''
  };
  config.elasticsearch = {
    host: process.env.ES_URL || 'localhost',
    port: process.env.ES_URL || 9200
  };
  return {get config() {
      return config;
    }};
});
System.register("../../src/web/Api", [], function() {
  "use strict";
  var __moduleName = "../../src/web/Api";
  var superagent = require('superagent');
  var config = System.get("../../config/config").config;
  var Api = function Api() {};
  var $Api = Api;
  ($traceurRuntime.createClass)(Api, {}, {
    searchErrors: function(cb) {
      return $Api.request(config.route.api.search_errors).end((function(err, result) {
        if (err) {
          cb(err, {error_logs: []});
          return;
        }
        cb(err, {error_logs: result.body});
      }));
    },
    request: function(route) {
      return superagent(route.method, config.web.url + route.path).set('Accept', 'application/json');
    }
  });
  return {get Api() {
      return Api;
    }};
});
System.register("../../src/web/components/LatestErrorsComponent", [], function() {
  "use strict";
  var __moduleName = "../../src/web/components/LatestErrorsComponent";
  var React = require('react'),
      Async = require('react-async');
  var $__8 = $traceurRuntime.assertObject(React.DOM),
      div = $__8.div,
      p = $__8.p,
      h2 = $__8.h2,
      h3 = $__8.h3;
  var Api = System.get("../../src/web/Api").Api;
  var LatestErrors = function LatestErrors() {};
  ($traceurRuntime.createClass)(LatestErrors, {
    get mixins() {
      return [Async.Mixin];
    },
    getInitialStateAsync: function(cb) {
      Api.searchErrors(cb);
    },
    componentWillMount: function() {
      var $__6 = this;
      if (this.state.error_logs) {
        return;
      }
      this.getInitialStateAsync((function(err, result) {
        $__6.setState(result);
      }));
    },
    render: function() {
      var error_logs = this.state.error_logs || [];
      return div({}, h2({}, 'list of errors'), error_logs.map((function(error) {
        return div({}, h3({}, (error.errorLevel + ": " + error.errorMessage)), p({className: 'error-created'}, error.created), p({className: 'error-programming-language'}, (error.programmingLanguage + " " + error.programmingLanguageVersion)));
      })));
    }
  }, {});
  var LatestErrorsComponent = React.createClass(LatestErrors.prototype);
  return {get LatestErrorsComponent() {
      return LatestErrorsComponent;
    }};
});
System.register("../../src/web/pages/StartPage", [], function() {
  "use strict";
  var __moduleName = "../../src/web/pages/StartPage";
  var React = require('react');
  var HeaderComponent = System.get("../../src/web/components/HeaderComponent").HeaderComponent;
  var LatestErrorsComponent = System.get("../../src/web/components/LatestErrorsComponent").LatestErrorsComponent;
  var div = $traceurRuntime.assertObject(React.DOM).div;
  var Start = function Start() {};
  ($traceurRuntime.createClass)(Start, {render: function() {
      return div({}, HeaderComponent({}), div({}, 'startpage'), LatestErrorsComponent({limit: 10}));
    }}, {});
  var StartPage = React.createClass(Start.prototype);
  return {get StartPage() {
      return StartPage;
    }};
});
System.register("../../src/web/WebApp", [], function() {
  "use strict";
  var __moduleName = "../../src/web/WebApp";
  var React = require('react'),
      Router = require('react-router-component');
  var $__16 = $traceurRuntime.assertObject(Router),
      Location = $__16.Location,
      Locations = $__16.Locations,
      NotFound = $__16.NotFound;
  var StartPage = System.get("../../src/web/pages/StartPage").StartPage;
  var NotFoundPage = System.get("../../src/web/pages/NotFoundPage").NotFoundPage;
  var App = function App() {};
  ($traceurRuntime.createClass)(App, {render: function() {
      return Locations({path: this.props.path}, Location({
        path: "/",
        handler: StartPage
      }), NotFound({handler: NotFoundPage}));
    }}, {});
  var WebApp = React.createClass(App.prototype);
  return {get WebApp() {
      return WebApp;
    }};
});
System.get("../../src/web/WebApp" + '');
