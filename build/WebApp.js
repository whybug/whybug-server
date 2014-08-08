System.register("../src/web/components/HeaderComponent", [], function($__0) {
  "use strict";
  var __moduleName = "../src/web/components/HeaderComponent";
  var React,
      Router,
      ReactTopcoat,
      Link,
      NavigationBar,
      NavigationBarItem,
      HeaderComponent;
  return {
    exports: {
      get HeaderComponent() {
        return HeaderComponent;
      },
      set HeaderComponent(value) {
        HeaderComponent = value;
      }
    },
    execute: function() {
      var $__1,
          $__2;
      React = require('react'), Router = require('react-router-component'), ReactTopcoat = require('react-topcoat');
      (($__1 = $traceurRuntime.assertObject(Router), Link = $__1.Link, $__1));
      (($__2 = $traceurRuntime.assertObject(ReactTopcoat), NavigationBar = $__2.NavigationBar, NavigationBarItem = $__2.NavigationBarItem, $__2));
      HeaderComponent = React.createClass({render: function() {
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
    }
  };
});
System.register("../src/web/pages/NotFoundPage", ["../components/HeaderComponent"], function($__3) {
  "use strict";
  var __moduleName = "../src/web/pages/NotFoundPage";
  var React,
      div,
      NotFoundPage;
  return {
    exports: {
      get NotFoundPage() {
        return NotFoundPage;
      },
      set NotFoundPage(value) {
        NotFoundPage = value;
      }
    },
    execute: function() {
      var $__4;
      React = require('react');
      ;
      (($__4 = $traceurRuntime.assertObject(React.DOM), div = $__4.div, $__4));
      NotFoundPage = React.createClass({render: function() {
          return div({}, $__3[0][$traceurRuntime.toProperty("HeaderComponent")]({}), div({}, 'notfound'));
        }});
    }
  };
});
System.register("../config/config", [], function($__5) {
  "use strict";
  var __moduleName = "../config/config";
  var config,
      cache_2min;
  return {
    exports: {
      get config() {
        return config;
      },
      set config(value) {
        config = value;
      }
    },
    execute: function() {
      config = {debug: process.env.DEBUG || false};
      cache_2min = {
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
    }
  };
});
System.register("../src/web/WhybugApi", ["../../config/config"], function($__6) {
  "use strict";
  var __moduleName = "../src/web/WhybugApi";
  var superagent,
      Api;
  return {
    exports: {
      get Api() {
        return Api;
      },
      set Api(value) {
        Api = value;
      }
    },
    execute: function() {
      superagent = require('superagent');
      ;
      Api = (function() {
        var Api = function Api() {};
        return ($traceurRuntime.createClass)(Api, {}, {
          searchErrors: function(cb) {
            return Api.request($__6[0][$traceurRuntime.toProperty("config")].route.api.search_errors).end((function(err, result) {
              if (err) {
                cb(err, {error_logs: []});
                return;
              }
              cb(err, {error_logs: result.body});
            }));
          },
          request: function(route) {
            return superagent(route.method, $__6[0][$traceurRuntime.toProperty("config")].web.url + route.path).set('Accept', 'application/json');
          }
        });
      }());
    }
  };
});
System.register("../src/web/components/LatestErrors", ["../WhybugApi"], function($__8) {
  "use strict";
  var __moduleName = "../src/web/components/LatestErrors";
  var React,
      Async,
      div,
      p,
      h2,
      h3,
      LatestErrors,
      LatestErrorsComponent;
  return {
    exports: {
      get LatestErrorsComponent() {
        return LatestErrorsComponent;
      },
      set LatestErrorsComponent(value) {
        LatestErrorsComponent = value;
      }
    },
    execute: function() {
      var $__10;
      React = require('react'), Async = require('react-async');
      (($__10 = $traceurRuntime.assertObject(React.DOM), div = $__10.div, p = $__10.p, h2 = $__10.h2, h3 = $__10.h3, $__10));
      ;
      LatestErrors = (function() {
        var LatestErrors = function LatestErrors() {};
        return ($traceurRuntime.createClass)(LatestErrors, {
          get mixins() {
            return [Async.Mixin];
          },
          getInitialStateAsync: function(cb) {
            $__8[0][$traceurRuntime.toProperty("WhybugApi")].searchErrors(cb);
          },
          render: function() {
            var error_logs = this.state.error_logs || [];
            return div({}, h2({}, 'list of errors'), error_logs.map((function(error) {
              return div({}, h3({}, (error.errorLevel + ": " + error.errorMessage)), p({className: 'error-created'}, error.created), p({className: 'error-programming-language'}, (error.programmingLanguage + " " + error.programmingLanguageVersion)));
            })));
          }
        }, {});
      }());
      LatestErrorsComponent = React.createClass(LatestErrors.prototype);
    }
  };
});
System.register("../src/web/pages/StartPage", ["../components/HeaderComponent", "../components/LatestErrors"], function($__11) {
  "use strict";
  var __moduleName = "../src/web/pages/StartPage";
  var React,
      div,
      Start,
      StartPage;
  return {
    exports: {
      get StartPage() {
        return StartPage;
      },
      set StartPage(value) {
        StartPage = value;
      }
    },
    execute: function() {
      var $__13;
      React = require('react');
      ;
      ;
      (($__13 = $traceurRuntime.assertObject(React.DOM), div = $__13.div, $__13));
      Start = (function() {
        var Start = function Start() {};
        return ($traceurRuntime.createClass)(Start, {render: function() {
            return div({}, $__11[0][$traceurRuntime.toProperty("HeaderComponent")]({}), div({}, 'startpage'), $__11[1][$traceurRuntime.toProperty("LatestErrors")]({limit: 10}));
          }}, {});
      }());
      StartPage = React.createClass(Start.prototype);
    }
  };
});
System.register("../src/web/WebApp", ["./pages/StartPage", "./pages/NotFoundPage"], function($__14) {
  "use strict";
  var __moduleName = "../src/web/WebApp";
  var React,
      Router,
      Location,
      Locations,
      NotFound,
      App,
      WebApp;
  return {
    exports: {
      get WebApp() {
        return WebApp;
      },
      set WebApp(value) {
        WebApp = value;
      }
    },
    execute: function() {
      var $__16;
      React = require('react'), Router = require('react-router-component');
      (($__16 = $traceurRuntime.assertObject(Router), Location = $__16.Location, Locations = $__16.Locations, NotFound = $__16.NotFound, $__16));
      ;
      ;
      App = (function() {
        var App = function App() {};
        return ($traceurRuntime.createClass)(App, {render: function() {
            return Locations({path: this.props.path}, Location({
              path: "/",
              handler: $__14[0][$traceurRuntime.toProperty("StartPage")]
            }), Location({
              path: null,
              handler: $__14[1][$traceurRuntime.toProperty("NotFoundPage")]
            }));
          }}, {});
      }());
      WebApp = React.createClass(App.prototype);
    }
  };
});
