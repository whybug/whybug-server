var React = require('react'),
    Router = require('react-router-component');

import {config} from '../../../config/config';
import {NavLink} from './Elements';

var {Link} = Router;
var {div, a, nav} = React.DOM;

class _Header {
  render() {
    var route = config.route.web;

    return div({className: 'navbar-section'},
      div({className: 'w-container'},
        div({className: 'w-nav navbar'},
          div({className: 'w-container'},
            Link({href: route.startpage.path, className: 'w-nav-brand brand'}, 'whybug'),

            nav({className: 'w-nav-menu', role: 'navigation'},
              NavLink({href: route.solution_search.path}, 'Solutions'),
              NavLink({href: 'projects'}, 'Projects'),
              NavLink({href: 'installation'}, 'Installation'),
              NavLink({href: 'about'}, 'About'),

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
