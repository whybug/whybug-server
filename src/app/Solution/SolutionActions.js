/* @flow */
var Joi = require('joi');

import {AllSources, InternalSources} from './../Sources';

// Action validators

export var actions = {
  changeSolution: {
    type: Joi.string().valid('changeSolution'),
    source: Joi.string().valid(AllSources),
    solutionId: Joi.string().guid().required(),
    rev: Joi.string().required(),
    attribute: Joi.string().required()
  },

  hideSolution: {
    type: Joi.string().valid('hideSolution'),
    source: Joi.string().valid(AllSources),
    solutionId: Joi.string().guid(),
    rev: Joi.string().required()
  },

  indexSolution: {
    type: Joi.string().valid('indexSolution'),
    source: Joi.string().valid(InternalSources),
    solutionId: Joi.string().guid(),
    rev: Joi.string().required()
  }
};

// Action creators

export function hideSolution(solutionId: string, rev: string) :Object {
  return { type: 'hideSolution', solutionId, rev};
}

export function addImageToSolution(solutionId: string, rev: string, fileName: string, data: string) : Object {
  return { type: 'addImageToSolution', solutionId, rev, fileName, data};
}

export function indexSolution(solutionId) {
  return { type: 'indexSolution', source: 'internal', solutionId};
}




