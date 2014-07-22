System.register("../../components/HeaderComponent", [], function() {
  "use strict";
  var __moduleName = "../../components/HeaderComponent";
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
System.register("../../pages/NotFoundPage", [], function() {
  "use strict";
  var __moduleName = "../../pages/NotFoundPage";
  var React = require('react');
  var HeaderComponent = System.get("../../components/HeaderComponent").HeaderComponent;
  var div = $traceurRuntime.assertObject(React.DOM).div;
  var NotFoundPage = React.createClass({render: function() {
      return div({}, HeaderComponent({}), div({}, 'notfound'));
    }});
  return {get NotFoundPage() {
      return NotFoundPage;
    }};
});
System.register("../../components/LatestErrorsComponent", [], function() {
  "use strict";
  var __moduleName = "../../components/LatestErrorsComponent";
  var React = require('react'),
      Async = require('react-async'),
      request = require('superagent');
  var $__5 = $traceurRuntime.assertObject(React.DOM),
      div = $__5.div,
      p = $__5.p,
      h2 = $__5.h2,
      h3 = $__5.h3;
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
      var $__3 = this;
      if (this.state.error_logs) {
        return;
      }
      this.getInitialStateAsync((function(err, result) {
        $__3.setState(result);
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
System.register("../../pages/StartPage", [], function() {
  "use strict";
  var __moduleName = "../../pages/StartPage";
  var React = require('react');
  var HeaderComponent = System.get("../../components/HeaderComponent").HeaderComponent;
  var LatestErrorsComponent = System.get("../../components/LatestErrorsComponent").LatestErrorsComponent;
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
System.register("../../WebApp", [], function() {
  "use strict";
  var __moduleName = "../../WebApp";
  var React = require('react'),
      ReactMount = require('react/lib/ReactMount'),
      Router = require('react-router-component');
  ReactMount.allowFullPageRender = true;
  var $__14 = $traceurRuntime.assertObject(React.DOM),
      html = $__14.html,
      head = $__14.head,
      meta = $__14.meta,
      title = $__14.title,
      link = $__14.link;
  var $__14 = $traceurRuntime.assertObject(Router),
      Page = $__14.Page,
      Pages = $__14.Pages,
      NotFound = $__14.NotFound;
  var StartPage = System.get("../../pages/StartPage").StartPage;
  var NotFoundPage = System.get("../../pages/NotFoundPage").NotFoundPage;
  var HeaderComponent = System.get("../../components/HeaderComponent").HeaderComponent;
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
System.get("../../WebApp" + '');
