var React = require('react'),
    Async = require('react-async'),
    NavigatableMixin = require('react-router-component').NavigatableMixin,
    routes = require('../../../config/routes'),
    Spinner = require('react-spinkit'),
    MarkdownTextarea = require('react-markdown-textarea');


import {Header} from '../common/ui/Header';
import {WhybugApi} from '../WhybugApi';
import {Section} from '../common/ui/Elements';

var {div, h1, h3, form, input, button, label, textarea} = React.DOM;

export var SolutionCreatePage = React.createClass({

  mixins: [ Async.Mixin, NavigatableMixin],

  getInitialStateAsync(callback) {
    WhybugApi.findErrorByUuid(this.props.error_uuid, (err, error) => callback(err, {
      solution: {
        message: error.message,
        level: error.level,
        programminglanguage: error.programminglanguage,
        programminglanguage_version: error.programminglanguage_version,
        os: error.os,
        os_version: error.os_version
        //file_path: error.file_path
      }
    }));
  },

  onChange(field) {
    debugger;
    return (event) => {
      console.log(event);
      var state = {solution: {}};
      state.solution[field] = event.target.value;
      this.setState(state);
    }
  },

  onSubmit(description) {
    var state = this.state;
    state.saving = true;
    state.solution.description = description;
    this.setState(state);

    WhybugApi.createSolution(this.state.solution, (error, solution) => {
      console.log('response', error, solution);

      this.setState({saving: false});

      if (error) { return; }

      var viewPage = routes.web.solution.view.path
        .replace(':language', solution.programminglanguage)
        .replace(':slug', solution.uuid);
      this.navigate(viewPage);
    });

    return false;
  },

  render() {
    var solution = this.state.solution || {};

    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, h1({}, solution.message || 'Create a solution')),
      Section({className: 'grey'},

      form({},
        div({className: 'w-row'},

          div({className: 'w-col w-col-9'},
            MarkdownTextarea({
              id: 'description',
              onSave: this.onSubmit,
              saving: this.state.saving,
              spinner: Spinner,
              rows: 6,
              required: "required",
              className: "w-input field textarea",
              placeholder: 'How to solve this error?',
              buttonText: 'Create'
            })
          ),

          div({className: 'w-col w-col-3'},
            TextInput({text: 'Level', name: 'level', onChange: this.onChange('level'), values: solution}),
            TextInput({text: 'Language', name: 'programminglanguage', onChange: this.onChange('programminglanguage'), values: solution}),
            TextInput({text: 'Language version', name: 'programminglanguage_version', onChange: this.onChange('programminglanguage_version'), values: solution}),
            TextInput({text: 'Operating system', name: 'os', onChange: this.onChange('os'), values: solution})
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
    values: React.PropTypes.object,
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
