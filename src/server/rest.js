/* @flow weak */

import {wrapDispatch, wrapQuery, wrapRoute} from './rest.utils';
import {searchSolutions} from '../app/Solution/Query/SearchSolutions';
import {recordError} from '../app/Error/Action/RecordError';
import {findSolutionsForError} from '../app/Solution/Query/FindSolutionForError';

/**
 * REST API for the domain.
 *
 * Takes actions, queries and passes them to the domain to be handled.
 */
module.exports = (express, store, routes) => {
    var app = express.Router();
    var route = wrapRoute.bind(null, app);
    var dispatch = wrapDispatch.bind(null, store);
    var query = wrapQuery.bind(null, store);

    // route definitions
    route(routes.api.create_query, (req) => query(req.body));
    route(routes.api.create_action, (req) => dispatch(req.body));

    // todo: frontend could also use the query endpoint
    // maybe remove this later
    route(routes.api.search_solutions, (req) => query(searchSolutions(req.params.q)));

    return app;
};
