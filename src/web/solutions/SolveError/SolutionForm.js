import React from 'react';

export var SolutionForm = React.createClass({
    propTypes: {
        solution: React.PropTypes.object,
        onChange: React.PropTypes.func,
        onSave: React.PropTypes.func
    },

    render() {
        var solution = this.props.solution || {};

        return form({},
            div({className: 'w-row'},

                div({className: 'w-col w-col-9'},
                    MarkdownTextarea({
                        id: 'description',
                        onSave: this.props.onSave,
                        saving: this.props.saving,
                        //spinner: Spinner,
                        rows: 6,
                        required: "required",
                        className: "w-input field textarea markdown-body",
                        placeholder: 'How to solve this error?',
                        autoFocus: true,
                        buttonText: 'Create'
                    }),
                    this.props.error ? div({}, "Unable to save solution. ", this.props.error.message) : ""
                ),

                div({className: 'w-col w-col-3'},
                    TextInput({
                        text: 'Level',
                        name: 'level',
                        onChange: this.props.onChange('level'),
                        values: solution
                    }),
                    TextInput({
                        text: 'Language',
                        name: 'programminglanguage',
                        onChange: this.props.onChange('programminglanguage'),
                        values: solution
                    }),
                    TextInput({
                        text: 'Language version',
                        name: 'programminglanguage_version',
                        onChange: this.props.onChange('programminglanguage_version'),
                        values: solution
                    }),
                    TextInput({
                        text: 'Operating system',
                        name: 'os',
                        onChange: this.props.onChange('os'),
                        values: solution
                    })
                )
            )
        );
    }
});
