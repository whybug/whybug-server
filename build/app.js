var $___46__46__47_config_47_config__ = (function() {
  "use strict";
  var __moduleName = "../config/config";
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
})();
var $___46__46__47_src_47_domain_47_ErrorLog__ = (function() {
  "use strict";
  var __moduleName = "../src/domain/ErrorLog";
  var validator = require('revalidator'),
      uuidGenerator = require('node-uuid');
  var ErrorLog = function ErrorLog(uuid) {
    var data = arguments[1] !== (void 0) ? arguments[1] : {};
    this.uuid = uuid || uuidGenerator.v4();
    for (var name in $ErrorLog.properties()) {
      $traceurRuntime.setProperty(this, name, data[$traceurRuntime.toProperty(name)] || $ErrorLog.properties()[$traceurRuntime.toProperty(name)].default);
    }
  };
  var $ErrorLog = ErrorLog;
  ($traceurRuntime.createClass)(ErrorLog, {
    replaceDynamicMessageParts: function() {
      this.line;
      this.filePath;
      this.errorMessage;
    },
    validate: function() {
      return validator.validate(this, {properties: $ErrorLog.properties()});
    }
  }, {properties: function() {
      return {
        version: {
          required: true,
          type: 'string',
          minLength: 5
        },
        errorLevel: {
          required: true,
          type: 'string'
        },
        errorMessage: {
          required: true,
          type: 'string',
          minLength: 5
        },
        programmingLanguage: {
          required: true,
          type: 'string'
        },
        programmingLanguageVersion: {
          required: true,
          type: 'string'
        },
        errorCode: {type: 'string'},
        line: {type: 'number'},
        created: {
          type: 'string',
          default: (new Date()).toJSON()
        },
        filePath: {
          type: 'string',
          default: ''
        },
        framework: {
          type: 'string',
          default: ''
        }
      };
    }});
  return {get ErrorLog() {
      return ErrorLog;
    }};
})();
var $___46__46__47_src_47_domain_47_ErrorLogRepository__ = (function() {
  "use strict";
  var __moduleName = "../src/domain/ErrorLogRepository";
  var ejs = require('elastic.js');
  var ErrorLog = $___46__46__47_src_47_domain_47_ErrorLog__.ErrorLog;
  var ErrorLogRepository = function ErrorLogRepository(es) {
    this.es = es;
    this.index = 'whybug';
    this.type = 'error_log';
  };
  ($traceurRuntime.createClass)(ErrorLogRepository, {
    findByQuery: function() {
      var query = arguments[0] !== (void 0) ? arguments[0] : '*';
      return this.search(ErrorLog, ejs.Request().size(10).sort(ejs.Sort('created').order('desc')).query(ejs.FilteredQuery(ejs.MatchQuery('errorMessage', query).operator('and').minimumShouldMatch('70%').zeroTermsQuery('all'), ejs.ExistsFilter('created'))));
    },
    search: function(entity, request) {
      var $__2 = this;
      return new Promise((function(resolve, reject) {
        $__2.es.search({
          index: $__2.index,
          type: $__2.type,
          body: request.toString()
        }).then((function(result) {
          resolve(result.hits.hits.map((function(hit) {
            return new entity(hit._id, hit._source);
          })));
        })).catch((function(err) {
          console.log('fail', err);
          reject(err);
        }));
      }));
    },
    store: function(errorLog) {
      this.es.index({
        index: this.index,
        type: this.type,
        id: errorLog.uuid,
        body: errorLog
      }, function(error) {});
    }
  }, {});
  return {get ErrorLogRepository() {
      return ErrorLogRepository;
    }};
})();
var $___46__46__47_src_47_domain_47_Error__ = (function() {
  "use strict";
  var __moduleName = "../src/domain/Error";
  var validator = require('revalidator'),
      uuidGenerator = require('node-uuid');
  var Error = function Error(uuid) {
    var data = arguments[1] !== (void 0) ? arguments[1] : {};
    this.uuid = uuid || uuidGenerator.v4();
    for (var name in $Error.properties()) {
      $traceurRuntime.setProperty(this, name, data[$traceurRuntime.toProperty(name)] || $Error.properties()[$traceurRuntime.toProperty(name)].default);
    }
  };
  var $Error = Error;
  ($traceurRuntime.createClass)(Error, {
    validate: function() {
      return validator.validate(this, {properties: $Error.properties()});
    },
    addErrorLog: function(errorLog) {
      errorLog.errorUuid = this.uuid;
      if (!this.errorLogCount) {
        this.errorMessage = errorLog.errorMessage;
        this.errorCode = errorLog.errorCode;
        this.errorLevel = errorLog.errorLevel;
        this.programmingLanguage = errorLog.programmingLanguage;
      }
      this.errorLogCount = ++this.errorLogCount || 1;
    }
  }, {properties: function() {
      return {
        errorLogCount: {
          required: true,
          type: 'int',
          default: 0
        },
        errorMessage: {
          required: true,
          type: 'string',
          minLength: 10
        },
        errorLevel: {
          required: true,
          type: 'string',
          minLength: 3
        },
        programmingLanguage: {
          required: true,
          type: 'string',
          minLength: 5
        },
        framework: {
          type: 'string',
          minLength: 5,
          default: ''
        },
        errorCode: {
          type: 'string',
          minLength: 5,
          default: ''
        }
      };
    }});
  return {get Error() {
      return Error;
    }};
})();
var $___46__46__47_src_47_domain_47_ErrorRepository__ = (function() {
  "use strict";
  var __moduleName = "../src/domain/ErrorRepository";
  var ejs = require('elastic.js');
  var Error = $___46__46__47_src_47_domain_47_Error__.Error;
  var ErrorRepository = function ErrorRepository(es) {
    this.es = es;
    this.index = 'whybug';
    this.type = 'error';
  };
  ($traceurRuntime.createClass)(ErrorRepository, {
    findSimilarError: function(errorLog, callback) {
      this.es.search({
        index: this.index,
        type: this.type,
        body: ejs.Request().query(ejs.FilteredQuery(ejs.BoolQuery().must([ejs.MatchQuery('errorMessage', errorLog.errorMessage).minimumShouldMatch('75%')]).should([ejs.TermQuery('programmingLanguageVersion', errorLog.programmingLanguageVersion), ejs.TermQuery('framework', errorLog.framework)]), ejs.BoolFilter().must([ejs.TermFilter('programmingLanguage', errorLog.programmingLanguage), ejs.TermFilter('errorLevel', errorLog.errorLevel)])))
      }, (function(error, response) {
        var data,
            entity;
        if (response && response.hits.total > 0) {
          data = response.hits.hits[0];
          entity = new Error(data._id, data._source);
        }
        callback(error, entity);
      }));
    },
    findSimilarError2: function() {
      return this.search(Error, ejs.Request().size(1).query(ejs.FilteredQuery(ejs.BoolQuery().must([ejs.MatchQuery('errorMessage', errorLog.errorMessage).minimumShouldMatch('75%')]).should([ejs.TermQuery('programmingLanguageVersion', errorLog.programmingLanguageVersion), ejs.TermQuery('framework', errorLog.framework)]), ejs.BoolFilter().must([ejs.TermFilter('programmingLanguage', errorLog.programmingLanguage), ejs.TermFilter('errorLevel', errorLog.errorLevel)]))));
    },
    store: function(error) {
      this.es.index({
        index: this.index,
        type: this.type,
        id: error.uuid,
        body: error
      }, function(error) {});
    }
  }, {});
  return {get ErrorRepository() {
      return ErrorRepository;
    }};
})();
var $___46__46__47_src_47_domain_47_ErrorService__ = (function() {
  "use strict";
  var __moduleName = "../src/domain/ErrorService";
  var Error = $___46__46__47_src_47_domain_47_Error__.Error;
  var ErrorLog = $___46__46__47_src_47_domain_47_ErrorLog__.ErrorLog;
  var ErrorRepository = $___46__46__47_src_47_domain_47_ErrorRepository__.ErrorRepository;
  var ErrorLogRepository = $___46__46__47_src_47_domain_47_ErrorLogRepository__.ErrorLogRepository;
  var ErrorService = function ErrorService(errorRepository, errorLogRepository) {
    this.errorRepository = errorRepository;
    this.errorLogRepository = errorLogRepository;
  };
  ($traceurRuntime.createClass)(ErrorService, {handleNewErrorLog: function(errorLog) {
      var $__11 = this;
      return new Promise((function(resolve, reject) {
        var validation = errorLog.validate();
        if (!validation.valid) {
          return reject(validation);
        }
        $__11.errorRepository.findSimilarError(errorLog, (function(err, error) {
          if (!error) {
            error = new Error();
          }
          error.addErrorLog(errorLog);
          $__11.errorRepository.store(error);
          $__11.errorLogRepository.store(errorLog);
          resolve(error);
        }));
      }));
    }}, {});
  return {get ErrorService() {
      return ErrorService;
    }};
})();
var $___46__46__47_src_47_web_47_components_47_Header__ = (function() {
  "use strict";
  var __moduleName = "../src/web/components/Header";
  var React = require('react'),
      Router = require('react-router-component');
  var config = $___46__46__47_config_47_config__.config;
  var Link = $traceurRuntime.assertObject(Router).Link;
  var $__15 = $traceurRuntime.assertObject(React.DOM),
      div = $__15.div,
      a = $__15.a,
      nav = $__15.nav;
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
})();
var $___46__46__47_src_47_web_47_pages_47_NotFoundPage__ = (function() {
  "use strict";
  var __moduleName = "../src/web/pages/NotFoundPage";
  var React = require('react');
  var Header = $___46__46__47_src_47_web_47_components_47_Header__.Header;
  var div = $traceurRuntime.assertObject(React.DOM).div;
  var _NotFoundPage = function _NotFoundPage() {};
  ($traceurRuntime.createClass)(_NotFoundPage, {render: function() {
      return div({}, Header({}), div({}, 'Not found :-('));
    }}, {});
  var NotFoundPage = React.createClass(_NotFoundPage.prototype);
  return {get NotFoundPage() {
      return NotFoundPage;
    }};
})();
var $___46__46__47_src_47_web_47_WhybugApi__ = (function() {
  "use strict";
  var __moduleName = "../src/web/WhybugApi";
  var superagent = require('superagent');
  var config = $___46__46__47_config_47_config__.config;
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
})();
var $___46__46__47_src_47_web_47_stores_47_SolutionStore__ = (function() {
  "use strict";
  var __moduleName = "../src/web/stores/SolutionStore";
  var EventEmitter = require('events').EventEmitter;
  var WhybugApi = $___46__46__47_src_47_web_47_WhybugApi__.WhybugApi;
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
})();
var $___46__46__47_src_47_web_47_components_47_Search__ = (function() {
  "use strict";
  var __moduleName = "../src/web/components/Search";
  var React = require('react'),
      Async = require('react-async');
  var $__27 = $traceurRuntime.assertObject(React.DOM),
      section = $__27.section,
      div = $__27.div,
      main = $__27.main,
      a = $__27.a,
      h1 = $__27.h1,
      h2 = $__27.h2,
      h3 = $__27.h3,
      form = $__27.form,
      input = $__27.input,
      p = $__27.p;
  var SolutionStore = $___46__46__47_src_47_web_47_stores_47_SolutionStore__.SolutionStore;
  var WhybugApi = $___46__46__47_src_47_web_47_WhybugApi__.WhybugApi;
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
      var $__25 = this;
      event.preventDefault();
      SolutionStore.searchSolutions(this.state.query, (function(err, res) {
        $__25.setState(res);
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
})();
var $___46__46__47_src_47_web_47_pages_47_StartPage__ = (function() {
  "use strict";
  var __moduleName = "../src/web/pages/StartPage";
  var React = require('react');
  var Header = $___46__46__47_src_47_web_47_components_47_Header__.Header;
  var Search = $___46__46__47_src_47_web_47_components_47_Search__.Search;
  var div = $traceurRuntime.assertObject(React.DOM).div;
  var Start = function Start() {};
  ($traceurRuntime.createClass)(Start, {render: function() {
      return div({}, Header({}), Search({limit: 10}));
    }}, {});
  var StartPage = React.createClass(Start.prototype);
  return {get StartPage() {
      return StartPage;
    }};
})();
var $___46__46__47_src_47_web_47_Webapp__ = (function() {
  "use strict";
  var __moduleName = "../src/web/Webapp";
  var React = require('react'),
      Router = require('react-router-component');
  var $__35 = $traceurRuntime.assertObject(Router),
      Location = $__35.Location,
      Locations = $__35.Locations;
  var StartPage = $___46__46__47_src_47_web_47_pages_47_StartPage__.StartPage;
  var NotFoundPage = $___46__46__47_src_47_web_47_pages_47_NotFoundPage__.NotFoundPage;
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
})();
var $___46__46__47_src_47_app__ = (function() {
  "use strict";
  var __moduleName = "../src/app";
  var hapi = require('hapi'),
      elasticsearch = require('elasticsearch'),
      ReactAsync = require('react-async');
  var config = $___46__46__47_config_47_config__.config;
  var ErrorService = $___46__46__47_src_47_domain_47_ErrorService__.ErrorService;
  var ErrorRepository = $___46__46__47_src_47_domain_47_ErrorRepository__.ErrorRepository;
  var ErrorLogRepository = $___46__46__47_src_47_domain_47_ErrorLogRepository__.ErrorLogRepository;
  var ErrorLog = $___46__46__47_src_47_domain_47_ErrorLog__.ErrorLog;
  var WebApp = $___46__46__47_src_47_web_47_Webapp__.WebApp;
  var server = new hapi.Server(config.node.host, config.node.port, {views: {
      engines: {html: require('handlebars')},
      path: 'src/web/templates'
    }});
  var es = new elasticsearch.Client({
    host: config.elasticsearch.host + ':' + config.elasticsearch.port,
    log: config.debug ? 'trace' : 'warning'
  });
  var errorLogRepository = new ErrorLogRepository(es);
  var errorRepository = new ErrorRepository(es);
  var errorService = new ErrorService(errorRepository, errorLogRepository);
  var reactProxy = (function(callback) {
    return (function(request, reply) {
      if ("X-Requested-With" in request.headers) {
        callback(request, reply);
      } else {
        ReactAsync.renderComponentToStringWithAsyncState(new WebApp({path: request.path}), (function(err, markup) {
          if (err) {
            console.log('error', err);
            reply(err);
          } else {
            console.log('render', request.path);
            reply.view('index', {content: markup});
          }
        }));
      }
    });
  });
  var route = (function(route, handler) {
    route.config = route.config || {};
    route.config.handler = handler;
    server.route(route);
  });
  route(config.route.api.create_error, (function(request, reply) {
    errorService.handleNewErrorLog(new ErrorLog(null, request.payload)).then(reply).catch((function(validation) {
      reply({error: validation.errors});
    }));
  }));
  route(config.route.api.search_errors, (function(request, reply) {
    console.log(request.params);
    errorLogRepository.findByQuery(request.query.query).then(reply).catch((function(err) {
      reply(err);
    }));
  }));
  route(config.route.web.startpage, reactProxy((function(request, reply) {
    reply({});
  })));
  var cache_unlimited = {
    privacy: 'public',
    expiresIn: 24 * 60 * 60 * 1000
  };
  server.route({
    method: 'GET',
    path: '/css/{p*}',
    config: {
      cache: cache_unlimited,
      handler: {directory: {
          path: './build/css/',
          listing: false,
          index: true
        }}
    }
  });
  server.route({
    method: 'GET',
    path: '/js/{p*}',
    config: {
      cache: cache_unlimited,
      handler: {directory: {
          path: './build/js/',
          listing: false,
          index: true
        }}
    }
  });
  server.route({
    method: 'GET',
    path: '/fonts/{p*}',
    config: {
      cache: cache_unlimited,
      handler: {directory: {
          path: './src/web/static/fonts/',
          listing: false,
          index: true
        }}
    }
  });
  server.route({
    method: '*',
    path: '/{p*}',
    handler: reactProxy((function(request, reply) {
      reply('The page was not found');
    }))
  });
  server.start();
  return {};
})();

//# sourceMappingURL=app.map
