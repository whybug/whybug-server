var React = require('react');

import {Markdown} from '../common/ui/Markdown';

export var PHPInstructions = React.createClass({
  render() {
    return <Markdown text={`
### PHP Instructions

1. Download the [whybug.phar](https://github.com/whybug/whybug-php/raw/master/dist/whybug.phar) file
and put it somewhere on your system, for example \`/usr/local/lib/\`.

2. Add the phar file to the \`auto_prepend_file\` setting in your \`php.ini\`.

        # Add to php.ini
        auto_prepend_file = /usr/local/lib/whybug.phar

    `} />;
  }
});

export var RubyInstructions = React.createClass({
  render() {
    return <Markdown text={`
### Ruby Instructions

No ruby support yet.
    `} />;
  }
});

export var JavascriptInstructions = React.createClass({
  render() {
    return <Markdown text={`
### Javascript Instructions

No javascript support yet.
    `} />;
  }
});
