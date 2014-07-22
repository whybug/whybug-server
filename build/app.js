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
  var ErrorLog = System.get("../src/domain/ErrorLog").ErrorLog;
  var ejs = require('elastic.js');
  var ErrorLogRepository = function ErrorLogRepository(es) {
    this.es = es;
    this.index = 'wtf';
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
  var Error = System.get("../src/domain/Error").Error;
  var ejs = require('elastic.js');
  var ErrorRepository = function ErrorRepository(es) {
    this.es = es;
    this.index = 'wtf';
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
System.register("../src/web/components/HeaderComponent", [], function() {
  "use strict";
  var __moduleName = "../src/web/components/HeaderComponent";
  var React = require('react'),
      Router = require('react-router-component'),
      ReactTopcoat = require('react-topcoat');
  var Link = $traceurRuntime.assertObject(Router).Link;
  var $__13 = $traceurRuntime.assertObject(ReactTopcoat),
      NavigationBar = $__13.NavigationBar,
      NavigationBarItem = $__13.NavigationBarItem;
  var HeaderComponent = React.createClass({render: function() {
      return NavigationBar({onTop: true}, NavigationBarItem({
        position: 'left',
        width: 'quarter'
      }, Link({href: '/'}, 'whyfail')), NavigationBarItem({
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
System.register("../src/web/pages/NotFoundPage", [], function() {
  "use strict";
  var __moduleName = "../src/web/pages/NotFoundPage";
  var React = require('react');
  var HeaderComponent = System.get("../src/web/components/HeaderComponent").HeaderComponent;
  var div = $traceurRuntime.assertObject(React.DOM).div;
  var NotFoundPage = React.createClass({render: function() {
      return div({}, HeaderComponent({}), div({}, 'notfound'));
    }});
  return {get NotFoundPage() {
      return NotFoundPage;
    }};
});
System.register("../src/web/components/LatestErrorsComponent", [], function() {
  "use strict";
  var __moduleName = "../src/web/components/LatestErrorsComponent";
  var React = require('react'),
      Async = require('react-async'),
      request = require('superagent');
  var $__18 = $traceurRuntime.assertObject(React.DOM),
      div = $__18.div,
      p = $__18.p,
      h2 = $__18.h2,
      h3 = $__18.h3;
  var LatestErrors = function LatestErrors() {};
  ($traceurRuntime.createClass)(LatestErrors, {
    get mixins() {
      return [Async.Mixin];
    },
    getInitialStateAsync: function(cb) {
      request.get('http://whybug.lo/api/error_logs/latest').end((function(err, result) {
        if (err) {
          cb(err, {error_logs: []});
        } else {
          cb(err, {error_logs: result.body});
        }
      }));
    },
    componentWillMount: function() {
      var $__16 = this;
      if (this.state.error_logs) {
        return;
      }
      this.getInitialStateAsync((function(err, result) {
        $__16.setState(result);
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
System.register("../src/web/pages/StartPage", [], function() {
  "use strict";
  var __moduleName = "../src/web/pages/StartPage";
  var React = require('react');
  var HeaderComponent = System.get("../src/web/components/HeaderComponent").HeaderComponent;
  var LatestErrorsComponent = System.get("../src/web/components/LatestErrorsComponent").LatestErrorsComponent;
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
System.register("../src/web/Webapp", [], function() {
  "use strict";
  var __moduleName = "../src/web/Webapp";
  var React = require('react'),
      ReactMount = require('react/lib/ReactMount'),
      Router = require('react-router-component');
  ReactMount.allowFullPageRender = true;
  var $__27 = $traceurRuntime.assertObject(React.DOM),
      html = $__27.html,
      head = $__27.head,
      meta = $__27.meta,
      title = $__27.title,
      link = $__27.link;
  var $__27 = $traceurRuntime.assertObject(Router),
      Page = $__27.Page,
      Pages = $__27.Pages,
      NotFound = $__27.NotFound;
  var StartPage = System.get("../src/web/pages/StartPage").StartPage;
  var NotFoundPage = System.get("../src/web/pages/NotFoundPage").NotFoundPage;
  var HeaderComponent = System.get("../src/web/components/HeaderComponent").HeaderComponent;
  var App = function App() {};
  ($traceurRuntime.createClass)(App, {render: function() {
      return html({}, head({}, link({
        rel: 'stylesheet',
        href: 'css/main.css'
      }), title({}, "whyfail"), meta({charSet: "UTF-8"}), meta({
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      })), Pages({path: this.props.path}, Page({
        path: "/",
        handler: StartPage
      }), NotFound({handler: NotFoundPage})));
    }}, {});
  var WebApp = React.createClass(App.prototype);
  return {
    get App() {
      return App;
    },
    get WebApp() {
      return WebApp;
    }
  };
});
System.register("../src/app", [], function() {
  "use strict";
  var __moduleName = "../src/app";
  var hapi = require('hapi'),
      elasticsearch = require('elasticsearch'),
      ReactAsync = require('react-async');
  var server = new hapi.Server('localhost', 8080);
  var es = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });
  var ErrorService = System.get("../src/domain/ErrorService").ErrorService;
  var ErrorRepository = System.get("../src/domain/ErrorRepository").ErrorRepository;
  var ErrorLogRepository = System.get("../src/domain/ErrorLogRepository").ErrorLogRepository;
  var ErrorLog = System.get("../src/domain/ErrorLog").ErrorLog;
  var WebApp = System.get("../src/web/Webapp").WebApp;
  var errorLogRepository = new ErrorLogRepository(es);
  var errorRepository = new ErrorRepository(es);
  var errorService = new ErrorService(errorRepository, errorLogRepository);
  server.route({
    method: 'POST',
    path: '/error',
    handler: (function(request, reply) {
      errorService.handleNewErrorLog(new ErrorLog(null, request.payload)).then(reply).catch((function(validation) {
        reply({error: validation.errors}).code(400);
      }));
    })
  });
  var reactProxy = (function(callback) {
    return (function(request, reply) {
      if ("X-Requested-With" in request.headers) {
        callback(request, reply);
      } else {
        ReactAsync.renderComponentToStringWithAsyncState(WebApp({path: request.path}), (function(err, markup, data) {
          if (err) {
            console.log(err);
            reply(err).code(500);
          } else {
            markup = ReactAsync.injectIntoMarkup(markup, data);
            console.log('render', request.path);
            var deferScript = '<script type="text/javascript"> \
          function downloadJSAtOnload() { \
            var element = document.createElement("script"); \
            element.src = "js/bundle.js"; \
            document.body.appendChild(element); \
          } \
          if (window.addEventListener) \
            window.addEventListener("load", downloadJSAtOnload, false); \
          else if (window.attachEvent) \
            window.attachEvent("onload", downloadJSAtOnload); \
          else window.onload = downloadJSAtOnload; \
        </script>';
            reply("<!DOCTYPE html>" + markup.replace('</body>', deferScript + '$&'));
          }
        }));
      }
    });
  });
  server.route({
    method: 'GET',
    path: '/',
    handler: reactProxy((function(request, reply) {
      reply({});
    }))
  });
  server.route({
    method: 'GET',
    path: '/api/error_logs/latest',
    config: {
      handler: (function(request, reply) {
        errorLogRepository.getLatest().then(reply).catch((function(err) {
          reply(err).code(500);
        }));
      }),
      cache: {expiresIn: 60 * 60 * 1000}
    }
  });
  server.route({
    method: 'GET',
    path: '/css/{p*}',
    handler: {directory: {
        path: './src/web/static/css',
        listing: false,
        index: true
      }}
  });
  server.route({
    method: 'GET',
    path: '/js/{p*}',
    handler: {directory: {
        path: './src/web/static/js',
        listing: false,
        index: true
      }}
  });
  server.route({
    method: 'GET',
    path: '/font/{p*}',
    handler: {directory: {
        path: './src/web/static/font',
        listing: false,
        index: true
      }}
  });
  server.route({
    method: '*',
    path: '/{p*}',
    handler: reactProxy((function(request, reply) {
      reply('The page was not found').code(404);
    }))
  });
  server.start();
  return {};
});
System.get("../src/app" + '');
