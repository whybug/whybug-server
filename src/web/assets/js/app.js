import React from 'react';
import {WebRoutes} from '../../WebRoutes';

// Declare React as global to make use of it in the Google Chrome extension.
React.initializeTouchEvents(true);

var webRoutes = new WebRoutes();
webRoutes.renderOnElement(document.getElementById('content-wrapper'));


