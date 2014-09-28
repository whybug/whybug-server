var React = require('react'),
    Router = require('react-router-component'),
    routes = require('../../../config/routes');

var {section, div, main, a, h1, h2, h3, form, label, input, p} = React.DOM;
var {Link} = Router;

import {SolutionStore} from './SolutionStore';
import {WhybugApi} from '../WhybugApi';


export var SearchForm = React.createClass({
  onChange(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.onSubmit, 500);
  },

  onSubmit(event) {
    if (event) event.preventDefault();
    clearTimeout(this.timeout);

    SolutionStore.searchSolutions(document.getElementById('query').value);
  },

  render() {
    return div({},
      h1({}, 'Find solutions for errors.'),
      form({onSubmit: this.onSubmit, name: 'search-form', method: 'get'},
        div({className: 'w-row'},
          div({className: 'w-col w-col-9'},
            input({
              placeholder: 'Enter error messsage...',
              onChange: this.onChange,
              value: this.props.query,
              className: 'w-input field',
              name: 'query',
              id: 'query',
              type: 'text'
            })
            //div({className: 'hint-text'}, 'Hint: You can use language:php or language:javascript, type:warning and platform:windows to narrow down your search.')
          ),
          div({className: 'w-col w-col-3'},
            input({ className: 'w-button button submit-button', type: 'submit', value: 'Search', dataWait: 'Searching...' })
          )
        )
      )
    );
  }
});

export var SearchResult = React.createClass({
  propTypes: {
    uuid: React.PropTypes.string,
    level: React.PropTypes.string,
    message: React.PropTypes.string,
    programminglangauge: React.PropTypes.string
  },

  render() {
    return Link({href: this.getSolutionLink(), className: 'content-block'},
      h3({className: 'latest-errors'}, this.props.level,  ': ', this.props.message)
    );
  },

  getSolutionLink() {
    return routes.web.solution.view.path
      .replace(':programmingLanguage', this.props.programminglanguage)
      .replace(':errorMessageSlug', this.props.uuid);
  }
});

