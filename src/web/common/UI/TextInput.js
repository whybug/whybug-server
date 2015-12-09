var React = require('react');

export var TextInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        values: React.PropTypes.object,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            label: true
        };
    },

    render() {
        return div({},
            this.props.label ? label({htmlFor: this.props.name}, this.props.text) : null,
            this.props.values[this.props.name] || "Any"
            //input({
            //  type: 'text',
            //  className: 'field',
            //  id: this.props.name,
            //  name: this.props.name,
            //  value: this.props.input[this.props.name],
            //  onChange: this.props.onChange
            //})
        );
    }
});
