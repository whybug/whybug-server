require('traceur-runtime');
require('../../../../build/js/WebApp');

// Declare React as global to make use of it in the Google Chrome extension.
React = require('react');
var WebApp = System.get('../../src/web/WebApp').WebApp;

React.renderComponent(WebApp({path: location.pathname}), document.body);


