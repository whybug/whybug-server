/* @flow weak */
import {INDEX_SOLUTION, FIND_SOLUTIONS_FOR_ERROR,  SEARCH_SOLUTIONS} from './../Constants';
import {indexSolutionHandler} from './Action/IndexSolutionHandler';
import {searchSolutionsHandler} from './Query/SearchSolutionsHandler';

module.exports = ({search}) => {

    return {
        actionValidators: {
            //[INDEX_SOLUTION]: indexSolutionHandler
        },

        actionHandlers: {},

        queryHandlers: {
            [FIND_SOLUTIONS_FOR_ERROR]: require('./Query/FindSolutionForErrorHandler')(search),
            [SEARCH_SOLUTIONS]: require('./Query/SearchSolutionsHandler')(search)
        },

        eventHandlers: []
    }
};
