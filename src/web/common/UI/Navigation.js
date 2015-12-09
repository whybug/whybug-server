import React from 'react';

/**
 * Main navigation.
 */
export default React.createClass({
    propTypes: {
        //children: React.PropTypes.arrayOf(React.PropTypes.instanceOf(NavLink))
    },

    render() {
        return (
            <nav className="w-nav-menu"
                 role="navigation">{this.props.children}</nav>
        );
    }
});
