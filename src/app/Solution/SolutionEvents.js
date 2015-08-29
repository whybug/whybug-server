var Joi = require('joi');
import * from '../Constants';

var events = {
  SOLUTION_WAS_CHANGED: {
    type: Joi.string().valid(SOLUTION_WAS_CHANGED),
    solutionId: Joi.string().guid().required()
  },

  SOLUTION_WAS_HIDDEN: {
    type: Joi.string().valid(SOLUTION_WAS_HIDDEN),
    solutionId: Joi.string().guid().required()
  },

  SOLUTION_WAS_SHOWN: {
    type: Joi.string().valid(SOLUTION_WAS_SHOWN),
    solutionId: Joi.string().guid().required()
  }
};

export function solutionWasHidden(solutionId) {
  return {type: SOLUTION_WAS_HIDDEN, solutionId};
}

export function solutionWasShown(solutionId) {
  return {type: SOLUTION_WAS_SHOWN, solutionId};
}
