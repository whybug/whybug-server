/* @flow weak */
import {INDEX_SOLUTION} from './Constants';
import {SEARCH_SOLUTIONS} from './Constants';
import {indexSolutionHandler} from './Solution/Action/IndexSolutionHandler';
import {searchSolutionsHandler} from './Solution/Query/SearchSolutionsHandler';

export var actionValidators = {
  //[INDEX_SOLUTION]: indexSolutionHandler
};

export var actionHandlers = {
};

export var queryHandlers = {
  [SEARCH_SOLUTIONS]: searchSolutionsHandler
};
//export var eventHandlers = [
//];
