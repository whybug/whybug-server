var React = require('react'),
    Router = require('react-router-component'),
    config = require('../../../config/config'),
    routes = require('../../../config/routes');

import {NavLink} from './Elements';

var {Link} = Router;
var {div, a, span, img, nav} = React.DOM;



export var Header = React.createClass({

  render() {
    return div({className: 'navbar-section'},
      div({className: 'w-container'},
        div({className: 'w-nav navbar'},
          div({className: 'w-container'},
            Link({href: routes.web.startpage.path, className: 'w-nav-brand brand'}, 'whybug'),

            nav({className: 'w-nav-menu', role: 'navigation'},
              NavLink({href: routes.web.solution_search.path}, 'Solutions'),
              NavLink({href: 'projects'}, 'Projects'),
              NavLink({href: 'installation'}, 'Installation'),
              NavLink({href: 'about'}, 'About'),
              this.props.model ? this.renderUserMenu() : this.renderLoginButtons()
            ),

            div({className: 'w-nav-button'},
              div({className: "w-icon-nav-menu"})
            )
          )
        )
      )
    );
  },

  renderUserMenu() {
    return div({className: 'login-text'},
      'Welcome ',
      a({href: routes.web.logout.path}, img({src: this.props.model.avatar_url, width: 20, height: 20}))
    );
  },

  renderLoginButtons() {
    return div({className: 'login-text'},
      'Login with ...',
      a({href: routes.web.login.github.path, className: 'social-btn icon-github'}),
      a({href: routes.web.login.twitter.path, className: 'social-btn icon-twitter-square'}),
      a({href: routes.web.login.google.path, className: 'social-btn icon-googleplus'})
      //a({href: routes.web.login_facebook.path, className: 'social-btn icon-facebook-square'}),
    );
  }
});
