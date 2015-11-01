import React from 'react';
import Router from 'react-router';

var {RouteHandler} = Router;

export default React.createClass({
  render() {
    return <RouteHandler {...this.props} />;
  }
});

