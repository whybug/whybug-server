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
      login: {
        method: 'GET',
        path: '/login'
      },
      search_errors: {
        method: 'GET',
        path: '/solutions'
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
  config.web = {url: process.env.WEB_URL || 'http://localhost:8000'};
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
System.register("../../src/web/components/Header", [], function() {
  "use strict";
  var __moduleName = "../../src/web/components/Header";
  var React = require('react'),
      Router = require('react-router-component');
  var config = System.get("../../config/config").config;
  var Link = $traceurRuntime.assertObject(Router).Link;
  var $__2 = $traceurRuntime.assertObject(React.DOM),
      div = $__2.div,
      a = $__2.a,
      nav = $__2.nav;
  var _Header = function _Header() {};
  ($traceurRuntime.createClass)(_Header, {render: function() {
      var route = config.route.web;
      return div({className: 'navbar-section'}, div({className: 'w-container'}, div({className: 'w-nav navbar'}, div({className: 'w-container'}, a({
        href: route.startpage.path,
        className: 'w-nav-brand brand'
      }, 'whybug'), nav({
        className: 'w-nav-menu',
        role: 'navigation'
      }, Link({
        href: route.search_errors.path,
        className: 'w-nav-link nav-link active'
      }, 'Solutions'), Link({
        href: 'projects',
        className: 'w-nav-link nav-link'
      }, 'Projects'), Link({
        href: 'installation',
        className: 'w-nav-link nav-link'
      }, 'Installation'), Link({
        href: 'about',
        className: 'w-nav-link nav-link'
      }, 'About'), div({className: 'login-text'}, 'Login with ...'), Link({
        href: route.login.path + '?github',
        className: 'social-btn icon-github'
      }), Link({
        href: route.login.path + '?facebook',
        className: 'social-btn icon-facebook-square'
      }), Link({
        href: route.login.path + '?google',
        className: 'social-btn icon-googleplus'
      }), Link({
        href: route.login.path + '?twitter',
        className: 'social-btn icon-twitter-square'
      })), div({className: 'w-nav-button'}, div({className: "w-icon-nav-menu"}))))));
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
  var _NotFoundPage = function _NotFoundPage() {};
  ($traceurRuntime.createClass)(_NotFoundPage, {render: function() {
      return div({}, Header({}), div({}, 'Not found :-('));
    }}, {});
  var NotFoundPage = React.createClass(_NotFoundPage.prototype);
  return {get NotFoundPage() {
      return NotFoundPage;
    }};
});
System.register("../../src/web/WhybugApi", [], function() {
  "use strict";
  var __moduleName = "../../src/web/WhybugApi";
  var superagent = require('superagent');
  var config = System.get("../../config/config").config;
  var WhybugApi = function WhybugApi() {};
  ($traceurRuntime.createClass)(WhybugApi, {}, {searchErrors: function(query, callback) {
      return request(config.route.api.search_errors).query({query: query}).end(notify(callback));
    }});
  var notify = (function(callback) {
    return (function(error, result) {
      return callback(error, result.body);
    });
  });
  var request = (function(route) {
    return superagent(route.method, config.web.url + route.path).set('Accept', 'application/json');
  });
  return {get WhybugApi() {
      return WhybugApi;
    }};
});
System.register("../../src/web/stores/SolutionStore", [], function() {
  "use strict";
  var __moduleName = "../../src/web/stores/SolutionStore";
  var EventEmitter = require('events').EventEmitter;
  var WhybugApi = System.get("../../src/web/WhybugApi").WhybugApi;
  var SolutionStore = function SolutionStore() {
    $traceurRuntime.defaultSuperCall(this, $SolutionStore.prototype, arguments);
  };
  var $SolutionStore = SolutionStore;
  ($traceurRuntime.createClass)(SolutionStore, {
    get CHANGE_EVENT() {
      return 'change';
    },
    emitChange: function() {
      this.emit(CHANGE_EVENT);
    }
  }, {searchSolutions: function(query, callback) {
      WhybugApi.searchErrors(query, (function(error, result) {
        return callback(error, {errors: result});
      }));
    }}, EventEmitter);
  return {get SolutionStore() {
      return SolutionStore;
    }};
});
System.register("../../src/web/components/Search", [], function() {
  "use strict";
  var __moduleName = "../../src/web/components/Search";
  var React = require('react'),
      Async = require('react-async');
  var $__14 = $traceurRuntime.assertObject(React.DOM),
      section = $__14.section,
      div = $__14.div,
      main = $__14.main,
      a = $__14.a,
      h1 = $__14.h1,
      h2 = $__14.h2,
      h3 = $__14.h3,
      form = $__14.form,
      input = $__14.input,
      p = $__14.p;
  var SolutionStore = System.get("../../src/web/stores/SolutionStore").SolutionStore;
  var WhybugApi = System.get("../../src/web/WhybugApi").WhybugApi;
  var _Search = function _Search() {};
  ($traceurRuntime.createClass)(_Search, {
    get mixins() {
      return [Async.Mixin];
    },
    getInitialStateAsync: function(callback) {
      SolutionStore.searchSolutions('', callback);
    },
    render: function() {
      var errors = this.state.errors || [];
      var errorList = errors.map(this._getErrorComponent);
      return div({}, section({className: 'section hero'}, div({className: 'w-container'}, h1({}, 'Find a solution to your error message.'), form({
        name: 'search-form',
        method: 'get',
        onSubmit: this._onSubmit
      }, div({className: 'w-row'}, div({className: 'w-col w-col-9'}, input({
        placeholder: 'Enter error messsage...',
        onChange: this._onChange,
        value: this.state.query,
        className: 'w-input field',
        name: 'query',
        type: 'text'
      }), div({className: 'hint-text'}, 'Hint: You can use language:php or language:javascript, type:warning and platform:windows to narrow down your search.')), div({className: 'w-col w-col-3'}, input({
        className: 'w-button button submit-button',
        type: 'submit',
        value: 'Search',
        dataWait: 'Searching...'
      })))))), section({className: 'section grey error-section'}, div({className: 'w-container'}, div({className: 'w-row'}, main({className: 'w-col w-col-9'}, h2({}, 'All error messages'), errorList), div({className: 'w-col w-col-3'})))));
    },
    _onChange: function(event) {
      this.setState({query: event.target.value});
    },
    _onSubmit: function(event) {
      var $__12 = this;
      event.preventDefault();
      SolutionStore.searchSolutions(this.state.query, (function(err, res) {
        $__12.setState(res);
      }));
    },
    _getErrorComponent: function(error) {
      return div({className: 'content-block'}, h3({className: 'latest-errors'}, (error.errorLevel + ": " + error.errorMessage)));
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
      return div({}, Header({}), Search({limit: 10}));
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
  var $__22 = $traceurRuntime.assertObject(Router),
      Location = $__22.Location,
      Locations = $__22.Locations;
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
