import React from 'react';
import cx from 'classnames';

/**
 * Display content in a column of given span.
 */
export default class Column {
  static propTypes = {
    /** How many columns should this column span. */
    span: React.PropTypes.number.isRequired
  };

  render() {
    const classes = cx(
      'w-col',
      `w-col-${this.props.span}`,
      `w-col-small-${this.props.span}`,
      'w-clearfix'
    );

    return <div className={classes}>{this.props.children}</div>;
  }
}
