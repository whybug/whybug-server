import React from 'react';

export var SolveErrorPage = React.createClass({

    render() {
        return div({},
            Header({user: this.props.user}),
            Section({className: 'hero'}, h1({}, this.props.solution.message || 'Create a solution')),
            Section({className: 'grey'},
                SolutionForm({
                    solution: this.props.solution,
                    isSaving: this.props.isSaving,
                    error: this.props.error,
                    onChange: this.props.onChange,
                    onSave: this.props.onSubmit
                })
            )
        )
    }

});
