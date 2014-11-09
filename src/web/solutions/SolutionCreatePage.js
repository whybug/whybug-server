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
            //saving: this.props.saving,
            //spinner: Spinner,
            rows: 6,
            required: "required",
            className: "w-input field textarea markdown-body",
            placeholder: 'How to solve this error?',
            autoFocus: true,
            buttonText: 'Create'
          })
        ),

        div({className: 'w-col w-col-3'},
          TextInput({text: 'Level', name: 'level', onChange: this.props.onChange('level'), values: solution}),
          TextInput({text: 'Language', name: 'programminglanguage', onChange: this.props.onChange('programminglanguage'), values: solution}),
          TextInput({text: 'Language version', name: 'programminglanguage_version', onChange: this.props.onChange('programminglanguage_version'), values: solution}),
          TextInput({text: 'Operating system', name: 'os', onChange: this.props.onChange('os'), values: solution})
          //TextInput({text: 'File path', name: 'file_path', onChange: this.props.onChange('file_path'), input: error})

          // Project?
          //TextInput({text: 'Operating system version', name: 'os_version', onChange: this.props.onChange('os_version'), input: error}),
        )
      )
    );
  }
});

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
    return (event) => {
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
    return div({},
      Header({user: this.props.user}),
        Section({className: 'hero'}, h1({}, this.state.solution.message || 'Create a solution')),
        Section({className: 'grey'},
          SolutionForm({
            solution: this.state.solution,
            onChange: this.onChange,
            onSave: this.onSubmit
          })
        )
    )
  }

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
