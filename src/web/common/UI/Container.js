import React from 'react';

/**
 * Display content in a centered box.
 */
export default React.createClass({
    render() {
        return <div className="w-container">{this.props.children}</div>;
    }
});
