System.register("../src/web/components/HeaderComponent", [], function($__0) {
  "use strict";
  var __moduleName = "../src/web/components/HeaderComponent";
  var React,
      Router,
      ReactTopcoat,
      div,
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
          $__2,
          $__3;
      React = require('react'), Router = require('react-router-component'), ReactTopcoat = require('react-topcoat');
      (($__1 = $traceurRuntime.assertObject(React.DOM), div = $__1.div, $__1));
      (($__2 = $traceurRuntime.assertObject(Router), Link = $__2.Link, $__2));
      (($__3 = $traceurRuntime.assertObject(ReactTopcoat), NavigationBar = $__3.NavigationBar, NavigationBarItem = $__3.NavigationBarItem, $__3));
      HeaderComponent = React.createClass({render: function() {
          return NavigationBar({onTop: true}, NavigationBarItem({
            position: 'left',
            width: 'quarter'
          }, 'whyfail'), NavigationBarItem({
            position: 'right',
            width: 'quarter'
          }, 'FAQ'), NavigationBarItem({
            position: 'right',
            width: 'quarter'
          }, 'About'));
        }});
    }
  };
});
System.register("../src/web/pages/StartPage", ["../components/HeaderComponent"], function($__4) {
  "use strict";
  var __moduleName = "../src/web/pages/StartPage";
  var React,
      div,
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
      var $__5;
      React = require('react');
      ;
      (($__5 = $traceurRuntime.assertObject(React.DOM), div = $__5.div, $__5));
      StartPage = React.createClass({render: function() {
          return div({}, $__4[0][$traceurRuntime.toProperty("HeaderComponent")]({}));
        }});
    }
  };
});
System.register("../src/web/WebApp", ["./pages/StartPage"], function($__6) {
  "use strict";
  var __moduleName = "../src/web/WebApp";
  var React,
      Router,
      html,
      head,
      meta,
      title,
      link,
      script,
      div,
      Page,
      Pages,
      Test,
      WebApp;
  return {
    exports: {
      get Test() {
        return Test;
      },
      get WebApp() {
        return WebApp;
      },
      set Test(value) {
        Test = value;
      },
      set WebApp(value) {
        WebApp = value;
      }
    },
    execute: function() {
      var $__8,
          $__9;
      React = require('react'), Router = require('react-router-component');
      (($__8 = $traceurRuntime.assertObject(React.DOM), html = $__8.html, head = $__8.head, meta = $__8.meta, title = $__8.title, link = $__8.link, script = $__8.script, div = $__8.div, $__8));
      (($__9 = $traceurRuntime.assertObject(Router), Page = $__9.Page, Pages = $__9.Pages, $__9));
      ;
      Test = (function() {
        var Test = function Test() {};
        return ($traceurRuntime.createClass)(Test, {render: function() {
            return html({}, head({}, title({}, "whyfail"), meta({charSet: "UTF-8"}), meta({
              name: "viewport",
              content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            }), link({
              rel: 'stylesheet',
              href: 'css/main.css'
            }), script({
              type: 'text/javascript',
              src: 'js/app.js'
            })), Pages({path: this.props.path}, Page({
              path: "/",
              handler: $__6[0][$traceurRuntime.toProperty("StartPage")]
            })));
          }}, {});
      }());
      WebApp = React.createClass(Test.prototype);
    }
  };
});
