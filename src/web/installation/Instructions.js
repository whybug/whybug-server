var React = require('react'),
  marked = require('marked');

var {div} = React.DOM;

export var PHPInstructions = React.createClass({
  render() {
    return div({dangerouslySetInnerHTML: {'__html': marked(`
### PHP Instructions

1. Download the [whybug.phar](https://github.com/whybug/whybug-php/raw/master/dist/whybug.phar) file
and put it somewhere on your system, for example \`/usr/local/lib/\`.

2. Add the phar file to the \`auto_prepend_file\` setting in your \`php.ini\`.

        # Add to php.ini
        auto_prepend_file = /usr/local/lib/whybug.phar

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
