/* @flow */
var Joi = require('joi');

// Action validators

export var actions = {
  'CHANGE_SOLUTION': {
    type: Joi.string().allow('CHANGE_SOLUTION'),
    solutionId: Joi.string().guid(),
    attribute: Joi.string()
  },

  'HIDE_SOLUTION': {
    type: Joi.string().allow('HIDE_SOLUTION'),
    solutionId: Joi.string().guid()
  }
};


// Action creators

export function hideSolution(solutionId: string) :Object {
  return { type: 'HIDE_SOLUTION', solutionId };
}

export function addImageToSolution(solutionId: string, fileName: string, data: string) : Object {
  return { type: 'ADD_IMAGE_TO_SOLUTION', solutionId, fileName, data };
}




