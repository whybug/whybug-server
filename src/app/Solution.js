/* @flow weak */
import {INDEX_SOLUTION, FIND_SOLUTIONS_FOR_ERROR,  SEARCH_SOLUTIONS} from './Constants';
import {indexSolutionHandler} from './Solution/Action/IndexSolutionHandler';
import {searchSolutionsHandler} from './Solution/Query/SearchSolutionsHandler';

export var actionValidators = {
  //[INDEX_SOLUTION]: indexSolutionHandler
};

export var actionHandlers = {
};


export var queryHandlers = {
  [FIND_SOLUTIONS_FOR_ERROR]: require('./Solution/Query/FindSolutionForErrorHandler')({}),
  [SEARCH_SOLUTIONS]: require('./Solution/Query/SearchSolutionsHandler')({})
};
//export var eventHandlers = [
//];
