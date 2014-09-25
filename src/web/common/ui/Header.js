var React = require('react'),
    Router = require('react-router-component'),
    config = require('../../../../config/config'),
    routes = require('../../../../config/routes');

import {NavLink} from './Elements';

var {Link} = Router;
var {div, a, span, img, nav} = React.DOM;

export var Header = React.createClass({
  render() {
    return div({className: 'navbar-section'},
      div({className: 'w-container'},
        div({className: 'w-nav w-row navbar'},
          div({className:"w-col w-col-1 w-col-small-1 w-clearfix"},
            Link({href: routes.web.startpage.path, className: 'w-nav-brand brand'}, 'whybug')
          ),

          div({className: "w-col w-col-11 w-col-small-11 w-clearfix"},
            nav({className: 'w-nav-menu', role: 'navigation'},
              NavLink({href: routes.web.solution.search.path}, 'Solutions'),
              NavLink({href: '/projects'}, 'Projects'),
              NavLink({href: '/installation'}, 'Installation'),
              this.props.user ? this.renderUserMenu() : this.renderLoginMenu()
            )
          )
        )
      )
    );
  },

  renderUserMenu() {
    return div({className: 'w-nav-link nav-link'},
      img({className: 'avatar', src: this.props.user.avatar_url, width: 25, height: 25}),
      div({className: 'subnav'},
        a({href: routes.web.logout.path}, span({}, 'Account')),
        a({href: routes.web.logout.path}, span({}, 'Logout'))
      )
    );
  },

  renderLoginMenu() {
    return div({className: 'w-nav-link nav-link'},
      'Login',
      div({className: 'subnav'},
        a({href: routes.web.login.github.path, className: 'icon-github'}, span({}, 'Github')),
        a({href: routes.web.login.twitter.path, className: 'icon-twitter-square'}, span({}, 'Twitter')),
        a({href: routes.web.login.google.path, className: 'icon-google-square'}, span({}, 'Google'))
      )
    );
  }

});
