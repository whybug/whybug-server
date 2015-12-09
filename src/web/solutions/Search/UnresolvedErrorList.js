import React from 'react';

/**
 * Displays a list of unresolved errors.
 */
var UnsolvedErrorList = React.createClass({
    getInitialStateAsync(callback) {
        WhybugApi.findUnsolvedErrors((error, result) => callback(error, {
            unsolved_errors: result
        }));
    },

    render() {
        if (this.state.unsolved_errors) {
            return (
                <div>
                    {this.state.unsolved_errors.map(error =>
                        <UnsolvedError
                            key={error.uuid}
                            error={error}
                            onHide={this.handleHideError}/>
                    )}
                </div>
            );
        }

        return <div>No unsolved errors found</div>
    },

    handleHideError(error) {
        WhybugApi.hideError(error, () => {
            this.setState({
                unsolved_errors: this.state.unsolved_errors.filter(unresolved_error => unresolved_error.uuid !== error.uuid)
            })
        });
    }
});
