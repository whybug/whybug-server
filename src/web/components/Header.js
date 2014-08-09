var React = require('react'),
    Router = require('react-router-component');

import {config} from '../../../config/config';

var {Link} = Router;
var {div, a, nav} = React.DOM;


class _Header {
  render() {
    var route = config.route.web;

    return div({className: 'navbar-section'},
      div({className: 'w-container'},
        div({className: 'w-nav navbar'},
          div({className: 'w-container'},
            a({href: route.startpage.path, className: 'w-nav-brand brand'}, 'whybug'),

            nav({className: 'w-nav-menu', role: 'navigation'},
              Link({href: route.search_errors.path, className: 'w-nav-link nav-link active'}, 'Solutions'),
              Link({href: 'projects', className: 'w-nav-link nav-link'}, 'Projects'),
              Link({href: 'installation', className: 'w-nav-link nav-link'}, 'Installation'),
              Link({href: 'about', className: 'w-nav-link nav-link'}, 'About'),

              div({className: 'login-text'}, 'Login with ...'),
              Link({href: route.login.path + '?github', className: 'social-btn icon-github'}),
              Link({href: route.login.path + '?facebook', className: 'social-btn icon-facebook-square'}),
              Link({href: route.login.path + '?google', className: 'social-btn icon-googleplus'}),
              Link({href: route.login.path + '?twitter', className: 'social-btn icon-twitter-square'})
            ),

            div({className: 'w-nav-button'},
              div({className: "w-icon-nav-menu"})
            )
          )
        )
      )
    );
  }
}

export var Header = React.createClass(_Header.prototype);
