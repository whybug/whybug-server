/**
 * Collection of common ui elements used on the page.
 *
 * @flow
 */
import React from 'react';
import cx from 'classnames';
import {Link} from '../Elements/Link';

export {Link} from '../Elements/Link';
export {Header} from './Header';

/**
 * Display content in a centered box.
 */
export class Container {
  render() {
    return <div className="w-container">{this.props.children}</div>;
  }
}


/**
 * Display content in a column of given span.
 */
export class Column {
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


/**
 * A section for the main focus of the page.
 */
export class HeroSection {
  render() {
    return <Section type="hero">{this.props.children}</Section>;
  }
}


/**
 * Section with container.
 */
export class Section {
  static propTypes = {
    type: React.PropTypes.string
  };

  render() {
    return (
      <section className={cx('section', this.props.type)}>
        <Container>{this.props.children}</Container>
      </section>
    );
  }
}

/**
 * Main navigation.
 */
export class Navigation {
  static propTypes = {
    //children: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NavLink))
  };

  render() {
    return (
      <nav className="w-nav-menu" role="navigation">{this.props.children}</nav>
    );
  }
}

/**
 * Link in main navigation.
 */
export class NavLink {
  render() {
    return <Link {...this.props} className="w-nav-link nav-link" />;
  }
}

/**
 * Link in main navigation.
 */
export class Row {
  render() {
    return <div {...this.props} className="w-row" />;
  }
}

// Ideas for more elements...
// Button
// Column
// Row
// Layout

