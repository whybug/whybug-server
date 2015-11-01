/**
 * @flow
 */
var React = require('react'),
  config = require('../../../../config/config'),
  routes = require('../../../../config/routes');

import {
  Container,
  Column,
  Link,
  Navigation,
  NavLink
  } from '../UI';

export default React.createClass({
  render()  {
    return (
      <header className="navbar-section">
        <Container>
          <div className="w-nav w-row navbar">
            <Column span={1}>
              <Link to="startpage" className="w-nav-brand brand">whybug</Link>
            </Column>

            <Column span={11}>
              <Navigation>
                <NavLink to="search">Solutions</NavLink>
                <NavLink to="language_index">Installation</NavLink>
                {this.props.user ? this.renderUserMenu() : this.renderLoginMenu()}
              </Navigation>
            </Column>
          </div>
        </Container>
      </header>
    );
  },

  renderUserMenu() {
    return (
      <div className="w-nav-link nav-link">
        <img className="avatar" src={this.props.user.avatar_url} width="25" height="25" />
        <div className="subnav">
          <a href={routes.web.logout.path}><span>Account</span></a>
          <a href={routes.web.logout.path}><span>Logout</span></a>
        </div>
      </div>
    );
  },

  renderLoginMenu() {
    return (
      <div className="w-nav-link nav-link">
        <span>Login</span>

        <div className="subnav">
          <a href={routes.web.login.github.path} className="icon-github-round"><span>Github</span></a>
          <a href={routes.web.login.twitter.path} className="icon-twitter-square"><span>Twitter</span></a>
          <a href={routes.web.login.google.path} className="icon-google-square"><span>Google</span></a>
        </div>
      </div>
    );
  }
});
