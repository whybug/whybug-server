import React from 'react';

/**
 * Row which can have Column children.
 */
export default React.createClass({
    render() {
        return <div {...this.props} className="w-row"/>;
    }
});


