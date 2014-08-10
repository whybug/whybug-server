require('../../WebApp');

// Declare React as global to make use of it in the Google Chrome extension.
React = require('react');
var WebApp = System.get('../../src/web/WebApp').WebApp;

React.renderComponent(WebApp({path: location.pathname}), document.getElementById('content-wrapper'));


