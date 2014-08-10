import {WebApp} from '../../WebApp';

// Declare React as global to make use of it in the Google Chrome extension.
React = require('react');
React.renderComponent(WebApp({path: location.pathname}), document.getElementById('content-wrapper'));


