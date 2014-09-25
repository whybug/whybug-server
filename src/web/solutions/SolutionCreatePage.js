var React = require('react'),
    Async = require('react-async');

import {Header} from '../common/ui/Header';
import {Search} from './Search';
import {WhybugApi} from '../WhybugApi';
import {Section} from '../common/ui/Elements';

var {div, h1, h3, form, input, label, textarea} = React.DOM;

export var SolutionCreatePage = React.createClass({

  mixins: [ Async.Mixin ],

  getInitialStateAsync(callback) {
    WhybugApi.findErrorByUuid(this.props.error_uuid, (err, error) => callback(err, {
      message: error.message,
      level: error.level,
      programminglanguage: error.programminglanguage,
      programminglanguage_version: error.programminglanguage_version,
      os: error.os,
      os_version: error.os_version
      //file_path: error.file_path
    }));
  },

  onChange(field) {
    return (event) => {
      var state = {};
      state[field] = event.target.value;
      this.setState(state);
    }
  },

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    WhybugApi.createSolution(this.state, (err, error) => {
      console.log('response', err, error);
    });
  },

  render() {
    var error = this.state || {};

    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, h1({}, error.message || 'Create a solution')),
      Section({className: 'grey'},

      form({onSubmit: this.onSubmit},
        div({className: 'w-row'},

          div({className: 'w-col w-col-9'},
            textarea({id: 'description', onChange: this.onChange('description'), required: "required", className: "w-input field textarea", placeholder: 'How to solve this error?'}),
            input({className: 'button', type: 'submit', value: 'Create'}),
            input({className: 'button', type: 'button', value: 'Preview'})
          ),

          div({className: 'w-col w-col-3'},
            TextInput({text: 'Level', name: 'level', onChange: this.onChange('level'), input: error}),
            TextInput({text: 'Language', name: 'programminglanguage', onChange: this.onChange('programminglanguage'), input: error}),
            TextInput({text: 'Language version', name: 'programminglanguage_version', onChange: this.onChange('programminglanguage_version'), input: error}),
            TextInput({text: 'Operating system', name: 'os', onChange: this.onChange('os'), input: error})
            //TextInput({text: 'File path', name: 'file_path', onChange: this.onChange('file_path'), input: error})

            // Project?
            //TextInput({text: 'Operating system version', name: 'os_version', onChange: this.onChange('os_version'), input: error}),
          )
        )
      )
    )
  )}
});


export var TextInput = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    input: React.PropTypes.object,
    onChange: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      label: true
    };
  },

  render() {
    return div({},
      this.props.label ? label({htmlFor: this.props.name}, this.props.text) : null,
      this.props.input[this.props.name] || "Any"
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
