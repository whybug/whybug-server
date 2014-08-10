
// Declare React as global to make use of it in the Google Chrome extension.
var React = require('react');
import {WebApp} from '../../WebApp';
//var WebApp = System.get('../../src/web/WebApp').WebApp;

React.renderComponent(WebApp({path: location.pathname}), document.getElementById('content-wrapper'));


