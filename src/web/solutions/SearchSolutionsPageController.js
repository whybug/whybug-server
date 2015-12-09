var React = require('react'),
    Router = require('react-router');
//Spinner = require('react-spinkit');

import {WhybugApi} from '../WhybugApi';

import {SearchSolutionsPage} from './Search/SearchSolutionsPage';

export default React.createClass({

    mixins: [Router.State, Router.Navigation],

    statics: {
        fetchData(params, query) {
            return WhybugApi.searchSolutions(query.query);
        }
    },

    propTypes: {
        search: React.PropTypes.object
    },

    onSearch(query) {
        if (query) {
            this.transitionTo('search', {}, {query: query});
        } else {
            this.transitionTo('search');
        }
    },

    render() {
        var searchResult = this.props.search || {};
        let solutions = searchResult.solutions || [];
        let filters = searchResult.aggregations || {};

        return (
            <SearchSolutionsPage
                user={this.props.user}
                query={this.getQuery().query}
                filters={filters}
                solutions={solutions}
                searchCallback={this.onSearch}
            />
        );
    }

    //,
    //shouldComponentUpdate(nextProps, nextState) {
    //  var thisUUIDs = this.props.search.solutions.map(solution => solution.uuid);
    //  var nextUUIDs = nextProps.search.solutions.map(solution => solution.uuid);
    //
    //  return thisUUIDs !== nextUUIDs;
    //}
});

