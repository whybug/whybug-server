require('traceur-runtime');
require('../../../../build/WebApp');

var React = require('react'),
     WebApp = System.get('../../WebApp').WebApp;

React.renderComponent(WebApp({path: location.pathname}), document);


