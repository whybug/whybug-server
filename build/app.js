System.register("../config/config", [], function() {
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
System.register("../src/domain/ErrorLog", [], function() {
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
});
System.register("../src/domain/ErrorLogRepository", [], function() {
  "use strict";
  var __moduleName = "../src/domain/ErrorLogRepository";
  var ejs = require('elastic.js/dist/elastic.js');
  var ErrorLog = System.get("../src/domain/ErrorLog").ErrorLog;
  var ErrorLogRepository = function ErrorLogRepository(es) {
    this.es = es;
    this.index = 'whybug';
    this.type = 'error_log';
  };
  ($traceurRuntime.createClass)(ErrorLogRepository, {
    getLatest: function() {
      return this.search(ErrorLog, ejs.Request().sort(ejs.Sort('created').order('desc')).query(ejs.ConstantScoreQuery().filter(ejs.ExistsFilter('created'))).size(10));
    },
    search: function(entity, body) {
      var $__2 = this;
      return new Promise((function(resolve, reject) {
        $__2.es.search({
          index: $__2.index,
          type: $__2.type,
          body: body
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
});
System.register("../src/domain/Error", [], function() {
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
});
System.register("../src/domain/ErrorRepository", [], function() {
  "use strict";
  var __moduleName = "../src/domain/ErrorRepository";
  var ejs = require('elastic.js/dist/elastic.js');
  var Error = System.get("../src/domain/Error").Error;
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
});
System.register("../src/domain/ErrorService", [], function() {
  "use strict";
  var __moduleName = "../src/domain/ErrorService";
  var Error = System.get("../src/domain/Error").Error;
  var ErrorLog = System.get("../src/domain/ErrorLog").ErrorLog;
  var ErrorRepository = System.get("../src/domain/ErrorRepository").ErrorRepository;
  var ErrorLogRepository = System.get("../src/domain/ErrorLogRepository").ErrorLogRepository;
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
});
System.register("../src/web/components/Header", [], function() {
  "use strict";
  var __moduleName = "../src/web/components/Header";
  var React = require('react'),
      Router = require('react-router-component'),
      ReactTopcoat = require('react-topcoat');
  var Link = $traceurRuntime.assertObject(Router).Link;
  var $__14 = $traceurRuntime.assertObject(ReactTopcoat),
      NavigationBar = $__14.NavigationBar,
      NavigationBarItem = $__14.NavigationBarItem;
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
System.register("../src/web/pages/NotFoundPage", [], function() {
  "use strict";
  var __moduleName = "../src/web/pages/NotFoundPage";
  var React = require('react');
  var Header = System.get("../src/web/components/Header").Header;
  var div = $traceurRuntime.assertObject(React.DOM).div;
  var NotFoundPage = React.createClass({render: function() {
      return div({}, Header({}), div({}, 'notfound'));
    }});
  return {get NotFoundPage() {
      return NotFoundPage;
    }};
});
System.register("../src/web/WhybugApi", [], function() {
  "use strict";
  var __moduleName = "../src/web/WhybugApi";
  var superagent = require('superagent');
  var config = System.get("../config/config").config;
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
System.register("../src/web/components/Search", [], function() {
  "use strict";
  var __moduleName = "../src/web/components/Search";
  var React = require('react'),
      Async = require('react-async');
  var $__21 = $traceurRuntime.assertObject(React.DOM),
      div = $__21.div,
      p = $__21.p,
      h2 = $__21.h2,
      h3 = $__21.h3;
  var WhybugApi = System.get("../src/web/WhybugApi").WhybugApi;
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
System.register("../src/web/pages/StartPage", [], function() {
  "use strict";
  var __moduleName = "../src/web/pages/StartPage";
  var React = require('react');
  var Header = System.get("../src/web/components/Header").Header;
  var Search = System.get("../src/web/components/Search").Search;
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
System.register("../src/web/Webapp", [], function() {
  "use strict";
  var __moduleName = "../src/web/Webapp";
  var React = require('react'),
      Router = require('react-router-component');
  var $__29 = $traceurRuntime.assertObject(Router),
      Location = $__29.Location,
      Locations = $__29.Locations,
      NotFound = $__29.NotFound;
  var StartPage = System.get("../src/web/pages/StartPage").StartPage;
  var NotFoundPage = System.get("../src/web/pages/NotFoundPage").NotFoundPage;
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
System.register("../src/app", [], function() {
  "use strict";
  var __moduleName = "../src/app";
  var hapi = require('hapi'),
      elasticsearch = require('elasticsearch'),
      ReactAsync = require('react-async');
  var config = System.get("../config/config").config;
  var ErrorService = System.get("../src/domain/ErrorService").ErrorService;
  var ErrorRepository = System.get("../src/domain/ErrorRepository").ErrorRepository;
  var ErrorLogRepository = System.get("../src/domain/ErrorLogRepository").ErrorLogRepository;
  var ErrorLog = System.get("../src/domain/ErrorLog").ErrorLog;
  var WebApp = System.get("../src/web/Webapp").WebApp;
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
    errorLogRepository.getLatest().then(reply).catch((function(err) {
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
    path: '/font/{p*}',
    config: {
      cache: cache_unlimited,
      handler: {directory: {
          path: './src/web/static/font',
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
});
System.get("../src/app" + '');
