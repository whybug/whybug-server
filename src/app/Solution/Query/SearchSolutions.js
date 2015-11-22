/* @flow weak */
import {SEARCH_SOLUTIONS} from '../../Constants';

export function searchSolutions(query: string = "") {
  return { type: SEARCH_SOLUTIONS, query };
}
