/* @flow weak */
import {INDEX_SOLUTION} from '../../Constants';
import {INTERNAL_SOURCES} from '../../Common/Domain/Sources';

export function indexSolution(solutionId) {
  return { type: INDEX_SOLUTION, source: 'internal', solutionId};
}

export function indexSolutionValidator(Joi) {
  return {
    type: Joi.string().valid('indexSolution'),
    source: Joi.string().valid(INTERNAL_SOURCES),
    solutionId: Joi.string().guid(),
    rev: Joi.string().required()
  };
}
