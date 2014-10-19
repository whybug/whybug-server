var React = require('react'),
  marked = require('marked');

var {div} = React.DOM;

export var PHPInstructions = React.createClass({
  render() {
    return div({dangerouslySetInnerHTML: {'__html': marked(`
### PHP Instructions

Checkout the [whybug-php](https://github.com/whybug/whybug-php) repository.

Add to your \`php.ini\`:

    auto_prepend_file = [install-directory]/auto_pretend.php

    `)}});
  }
});

export var RubyInstructions = React.createClass({
  render() {
    return div({dangerouslySetInnerHTML: {'__html': marked(`
### Ruby Instructions

No ruby support yet.
    `)}});
  }
});

export var JavascriptInstructions = React.createClass({
  render() {
    return div({dangerouslySetInnerHTML: {'__html': marked(`
### Javascript Instructions

No javascript support yet.
    `)}});
  }
});
