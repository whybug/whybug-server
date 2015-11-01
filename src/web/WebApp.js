import React from 'react';
import Router from 'react-router';

var {RouteHandler} = Router;

export class WebApp {
  render() {
    return <RouteHandler {...this.props} />;
  }
}
