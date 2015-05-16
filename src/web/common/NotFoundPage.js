import React from 'react';

import {Header} from './UI';
var {div} = React.DOM;

export var NotFoundPage = React.createClass({
  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <div>Not found :-(</div>
      </div>
    );
  }
});

