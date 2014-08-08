System.register("../../src/web/components/Header", [], function() {
  "use strict";
  var __moduleName = "../../src/web/components/Header";
  var React = require('react'),
      Router = require('react-router-component'),
      ReactTopcoat = require('react-topcoat');
  var Link = $traceurRuntime.assertObject(Router).Link;
  var $__1 = $traceurRuntime.assertObject(ReactTopcoat),
      NavigationBar = $__1.NavigationBar,
      NavigationBarItem = $__1.NavigationBarItem;
  var _Header = function _Header() {};
  ($traceurRuntime.createClass)(_Header, {render: function() {
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
    }}, {});
  var Header = React.createClass(_Header.prototype);
  return {get Header() {
      return Header;
    }};
});
System.register("../../src/web/pages/NotFoundPage", [], function() {
  "use strict";
  var __moduleName = "../../src/web/pages/NotFoundPage";
  var React = require('react');
  var Header = System.get("../../src/web/components/Header").Header;
  var div = $traceurRuntime.assertObject(React.DOM).div;
  var NotFoundPage = React.createClass({render: function() {
      return div({}, Header({}), div({}, 'notfound'));
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
  config.web = {url: process.env.WEB_URL || 'http://whybug.com'};
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
System.register("../../src/web/WhybugApi", [], function() {
  "use strict";
  var __moduleName = "../../src/web/WhybugApi";
  var superagent = require('superagent');
  var config = System.get("../../config/config").config;
  var WhybugApi = function WhybugApi() {};
  var $WhybugApi = WhybugApi;
  ($traceurRuntime.createClass)(WhybugApi, {}, {
    searchErrors: function(callback) {
      return $WhybugApi.request(config.route.api.search_errors, callback);
    },
    request: function(route, callback) {
      return superagent(route.method, config.web.url + route.path).set('Accept', 'application/json').end((function(error, result) {
        return callback(error, result.body);
      }));
    }
  });
  return {get WhybugApi() {
      return WhybugApi;
    }};
});
System.register("../../src/web/components/Search", [], function() {
  "use strict";
  var __moduleName = "../../src/web/components/Search";
  var React = require('react'),
      Async = require('react-async');
  var $__8 = $traceurRuntime.assertObject(React.DOM),
      div = $__8.div,
      p = $__8.p,
      h2 = $__8.h2,
      h3 = $__8.h3;
  var WhybugApi = System.get("../../src/web/WhybugApi").WhybugApi;
  var _Search = function _Search() {};
  ($traceurRuntime.createClass)(_Search, {
    get mixins() {
      return [Async.Mixin];
    },
    getInitialStateAsync: function(callback) {
      WhybugApi.searchErrors((function(error, result) {
        return callback(error, {error_logs: result});
      }));
    },
    render: function() {
      var error_logs = this.state.error_logs || [];
      return div({}, h2({}, 'list of errors'), error_logs.map((function(error) {
        return div({}, h3({}, (error.errorLevel + ": " + error.errorMessage)), p({className: 'error-created'}, error.created), p({className: 'error-programming-language'}, (error.programmingLanguage + " " + error.programmingLanguageVersion)));
      })));
    }
  }, {});
  var Search = React.createClass(_Search.prototype);
  return {get Search() {
      return Search;
    }};
});
System.register("../../src/web/pages/StartPage", [], function() {
  "use strict";
  var __moduleName = "../../src/web/pages/StartPage";
  var React = require('react');
  var Header = System.get("../../src/web/components/Header").Header;
  var Search = System.get("../../src/web/components/Search").Search;
  var div = $traceurRuntime.assertObject(React.DOM).div;
  var Start = function Start() {};
  ($traceurRuntime.createClass)(Start, {render: function() {
      return div({}, Header({}), div({}, 'startpage'), Search({limit: 10}));
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
  var _WebApp = function _WebApp() {};
  ($traceurRuntime.createClass)(_WebApp, {render: function() {
      return Locations({path: this.props.path}, Location({
        path: "/",
        handler: StartPage
      }), Location({
        path: null,
        handler: NotFoundPage
      }));
    }}, {});
  var WebApp = React.createClass(_WebApp.prototype);
  return {get WebApp() {
      return WebApp;
    }};
});
System.get("../../src/web/WebApp" + '');
