import React from 'react';
import {Link} from '../UI';

/**
 * Link in main navigation.
 */
export default React.createClass({
  render() {
    return <Link {...this.props} className="w-nav-link nav-link" />;
  }
});

