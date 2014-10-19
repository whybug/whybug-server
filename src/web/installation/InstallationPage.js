var React = require('react'),
    Async = require('react-async'),
    routes = require('../../../config/routes');

import {Header} from '../common/ui/Header';
import {WhybugApi} from '../WhybugApi';
import {Section, NavLink} from '../common/ui/Elements';
import {PHPInstructions, RubyInstructions, JavascriptInstructions} from './Instructions';
import {NotFoundPage} from '../common/NotFoundPage';

var {div, span, h1} = React.DOM;

export var InstallationPage = React.createClass({

  /**
   * Returns a list of available languages.
   *
   * @returns {Array} List of available languages.
   */
  getAllLanguages() {
    return [
      {slug:'php', title: 'PHP', content: PHPInstructions},
      {slug:'javascript', title: 'Javascript', content: JavascriptInstructions},
      {slug:'ruby', title: 'Ruby', content: RubyInstructions}
    ];
  },

  /**
   * Returns a language link for the specified slug.
   *
   * @param slug
   * @returns {string} Link for the specified slug.
   */
  getLink(slug) {
    return routes.web.installation.language.path.replace(':language', slug);
  },

  render() {
    return div({},
      Header({user: this.props.user}),
      Section({className: 'hero'}, h1({}, 'Installation')),
      Section({className: 'grey'},
        this.renderLanguagePicker(),
        this.renderInstructions()
      )
    );
  },

  renderLanguagePicker() {
    return div({className: 'language-picker'},
      this.getAllLanguages().map((language) => NavLink(
        {
          key: language.slug,
          href: this.getLink(language.slug),
          className: 'language-picker__item'
        },
        language.title
      ))
    );
  },

  renderInstructions() {
    if (this.props.language) {
      var language = this.getAllLanguages()
        .filter((lang) => lang.slug === this.props.language)[0] || {};

      return language.content({}) || div({}, 'not found');
    }

    return div({}, 'Please choose a language.');
  }

});

