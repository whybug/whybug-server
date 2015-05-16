import React from 'react';

/**
 * Row which can have Column children.
 */
export default class Row {
  render() {
    return <div {...this.props} className="w-row" />;
  }
}


