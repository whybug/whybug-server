var React = require('react'),
    marked = require('marked');

var {div} = React.DOM;

/**
 * Renders markdown.
 */
export var Markdown = React.createClass({
    render() {
        return (
            <div
                className='markdown-body'
                dangerouslySetInnerHTML={{'__html': marked(this.props.text)}}></div>
        );
    }
});
