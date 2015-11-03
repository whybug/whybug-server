/* @flow weak */
import {SEARCH_SOLUTIONS} from '../../Constants';

type SearchSolutions = {
  type: 'SEARCH_SOLUTIONS';
  query: string;
}

export function searchSolutions(query: string = "") : SearchSolutions {
  return { type: SEARCH_SOLUTIONS, query };
}
