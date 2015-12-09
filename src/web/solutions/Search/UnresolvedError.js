import React from 'react';

var UnsolvedError = React.createClass({
    render() {
        var error = this.props.error;
        var params = {
            error_uuid: this.props.error.uuid
        };
        return (
            <Link to="solution_create" params={params}
                  className='content-block'>
                <h3 className='latest-errors'>{error.level + ': ' + error.message}</h3>
                <span className='button' onClick={this.handleHide}>hide</span>
            </Link>
        );
    },

    handleHide(event) {
        event.preventDefault();
        this.props.onHide(this.props.error);
    }
});
