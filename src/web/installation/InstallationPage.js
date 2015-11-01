var React = require('react'),
    routes = require('../../../config/routes');

import {Section, Header, HeroSection, Link} from '../common/UI';
import {PHPInstructions, RubyInstructions, JavascriptInstructions} from './Instructions';
import {NotFoundPage} from '../common/NotFoundPage';

var {div, span, h1} = React.DOM;

export default React.createClass({
  /**
   * Returns a list of available languages.
   *
   * @returns {Array} List of available languages.
   */
  getAllLanguages() {
    return [
      {slug:'php', title: 'PHP', instructions: PHPInstructions},
      {slug:'javascript', title: 'Javascript', instructions: JavascriptInstructions},
      {slug:'ruby', title: 'Ruby', instructions: RubyInstructions}
    ];
  },

  render() {
    return (
      <div>
        <Header user={this.props.user} />

        <HeroSection>
          <h1>Installation</h1>
        </HeroSection>

        <Section className='grey'>
          <div className='w-row'>
            <div className='w-col'>
              <LanguagePicker languages={this.getAllLanguages()}/>
              <Instructions
                languages={this.getAllLanguages()}
                current={this.props.params.language} />
            </div>
          </div>
        </Section>
      </div>
    );
  }
});

var LanguagePicker = React.createClass({
  render() {
    return (
      <div className='language-picker'>
        {this.props.languages.map((language) => (
          <Link
            to="language"
            params={{language: language.slug}}
            href={this.getLink(language.slug)}
            className='language-picker__item'
          >{language.title}</Link>
        ))}
      </div>
    );
  },

  /**
   * Returns a language link for the specified slug.
   *
   * @param slug
   * @returns {string} Link for the specified slug.
   */
  getLink(slug) {
    return routes.web.installation.language.path.replace(':language', slug);
  }
});

var Instructions = React.createClass({
  render() {
    if (this.props.current) {
      var language = this.props.languages
          .filter((lang) => lang.slug === this.props.current)[0] || {};

      return <language.instructions /> || <div>not found</div>;
    }

    return <div>Please choose a language</div>;
  }
});
