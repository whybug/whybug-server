import React from 'react';

export var SolutionFilter = React.createClass({
    propTypes: {
        filters: React.PropTypes.object,
        title: React.PropTypes.string
    },

    render() {
        if (!this.props.filters) {
            return null;
        }

        return (
            <label>
                {this.props.title}
                <ul>{
                    this.props.filters.buckets.map(agg =>
                        <li key={agg.key}>{agg.key} ({agg.doc_count})</li>
                    )
                }</ul>
            </label>
        );
    }
});
