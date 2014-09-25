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
    WhybugApi.findErrorByUuid(this.props.error_uuid, (error, result) => callback(error, {
      error: result
    }));
  },

  render() {
    var error = this.state.error || {};

    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, h1({}, error.message || 'Create a solution')),
      Section({className: 'grey'},

      form({},
        div({className: 'w-row'}),
          div({className: 'w-col w-col-10'},
            textarea({id: 'description', required: "required", className: "w-input field textarea", placeholder: 'How to solve this error?'})
          ),
          div({className: 'w-col w-col-2'},
            label({htmlFor: 'level'}, 'Level'),
            input({type: 'text', name: 'level', id: 'exception'}),

            label({htmlFor: 'programminglanguage'}, 'Language'),
            input({type: 'text', name: 'programminglanguage', id: 'programminglanguage'}),

            label({htmlFor: 'programminglanguage_version'}, 'Language version'),
            input({type: 'text', name: 'programminglanguage_version', id: 'programminglanguage_version'}),

            label({htmlFor: 'os'}, 'Operation system'),
            input({type: 'text', name: 'os', id: 'os'}),

            label({htmlFor: 'file_path'}, 'File path'),
            input({type: 'text', name: 'file_path', id: 'file_path'})
          )
        )
      )

      /*
      description
      For errors:
       programminglanguage
       programminglanguage_version
       os
       os_version // not matching
       message
       level
       code
       */
    )
  }
});

