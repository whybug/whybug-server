/* @flow weak */
import {INDEX_SOLUTION, FIND_SOLUTIONS_FOR_ERROR,  SEARCH_SOLUTIONS} from './../Constants';
import {indexSolutionHandler} from './Action/IndexSolutionHandler';
import {searchSolutionsHandler} from './Query/SearchSolutionsHandler';

export var actionValidators = {
  //[INDEX_SOLUTION]: indexSolutionHandler
};

export var actionHandlers = {
};


export var queryHandlers = {
  [FIND_SOLUTIONS_FOR_ERROR]: require('./Query/FindSolutionForErrorHandler')({}),
  [SEARCH_SOLUTIONS]: require('./Query/SearchSolutionsHandler')({})
};
//export var eventHandlers = [
//];
