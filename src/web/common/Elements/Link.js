/**
 * @flow
 */
var React = require('react');
var Router = require('react-router');

/**
 * Link which automatically sets an .active class
 * when path matches.
 */
export class Link {
  propTypes: { to: string };

  render() :ReactElement {
    return <Router.Link {...this.props} key={this.props.to} /> ;
  }
}

