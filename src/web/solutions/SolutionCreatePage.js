var React = require('react');

import {Header} from '../common/ui/Header';
import {Search} from './Search';
import {Section} from '../common/ui/Elements';

var {div, h1, h3, form, input, label, textarea} = React.DOM;

export var SolutionCreatePage = React.createClass({

  getInitialStateAsync(callback) {
    // todo: add query from url.
    ErrorStore.findById(this.props.error_id, (error, result) => callback(error, {
      errors: result
    }));
  },

  render() {
    var error = this.props.error_id;

    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, h1({}, 'Create a solution')),
      Section({className: 'grey'}, h3({}, 'Match error'),
        form({},
          label({htmlFor: 'description'}, 'Description'),
          textarea({name: 'description'}),

          label({htmlFor: 'exception'}, 'Level'),
          input({type: 'text', name: 'level', id: 'exception'}),

          label({htmlFor: 'php'}, 'Language'),
          input({type: 'text', name: 'programminglanguage', id: 'php'})
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

