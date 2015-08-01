import React from 'react';


export var SearchResult = React.createClass({
  propTypes: {
    uuid: React.PropTypes.string,
    level: React.PropTypes.string,
    message: React.PropTypes.string,
    programminglangauge: React.PropTypes.string
  },

  render() {
    const params = {
      language: this.props.programminglanguage,
      slug: this.props.uuid
    };

    return (
      <Link to="solution_view" params={params} className='content-block'>
        <h3 className='latest-errors'>{this.props.level +  ': ' + this.props.message}</h3>
      </Link>
    );
  }
});
