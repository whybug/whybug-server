var Joi = require('joi');

var events = {
  solutionWasChanged: {
    type: Joi.string().valid('solutionWasChanged'),
    solutionId: Joi.string().guid().required()
  },

  solutionWasHidden: {
    type: Joi.string().valid('solutionWasHidden'),
    solutionId: Joi.string().guid().required()
  },

  solutionWasShown: {
    type: Joi.string().valid('solutionWasShown'),
    solutionId: Joi.string().guid().required()
  }
};

export function solutionWasHidden(solutionId) {
  return {type: 'solutionWasHidden', solutionId};
}
