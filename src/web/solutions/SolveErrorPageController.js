var React = require('react'),
    NavigatableMixin = require('react-router').NavigatableMixin,
    routes = require('../../../config/routes'),
    //Spinner = require('react-spinkit'),
    MarkdownTextarea = require('react-markdown-textarea');

import {WhybugApi} from '../WhybugApi';
import {Header, Section} from '../common/UI';

export var SolveErrorPageController = React.createClass({

  statics: {
    resolve: {
      solution() {
        return WhybugApi.findErrorByUuid(this.getParams().errorUuid);
      }
    }
  },

  getInitialStateAsync(callback) {
    WhybugApi.findErrorByUuid(this.props.error_uuid, (err, error) => callback(err, {
      solution: {
        message: error.message,
        level: error.level,
        programminglanguage: error.programminglanguage,
        programminglanguage_version: error.programminglanguage_version,
        os: error.os,
        os_version: error.os_version
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
    state.isSaving = true;
    state.solution.description = description;
    this.setState(state);

    WhybugApi.createSolution(this.state.solution, (error, solution) => {
      this.setState({isSaving: false});

      if (error) {
        return this.setState({error: error});
      }

      // Redirect to solution.
      var viewPage = routes.web.solution.view.path
        .replace(':language', solution.programminglanguage)
        .replace(':slug', solution.uuid);
      this.navigate(viewPage);
    });

    return false;
  },

  render() {
    return (
      <SolveErrorPage
        solution={this.state.solution}
        error={this.state.error}
        isSaving={this.state.isSaving}
        onChange={this.onChange}
        onSave={this.onSubmit} />
    );
  }

});

