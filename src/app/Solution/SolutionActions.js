/* @flow */
var Joi = require('joi');

import {AllSources, InternalSources} from './../Sources';

// Action validators

export var actions = {
  [CHANGE_SOLUTION]: {
    type: Joi.string().valid('changeSolution'),
    source: Joi.string().valid(AllSources),
    solutionId: Joi.string().guid().required(),
    rev: Joi.string().required(),
    attribute: Joi.string().required()
  },

  [HIDE_SOLUTION]: {
    type: Joi.string().valid('hideSolution'),
    source: Joi.string().valid(AllSources),
    solutionId: Joi.string().guid(),
    rev: Joi.string().required()
  },

  [INDEX_SOLUTION]: {
    type: Joi.string().valid('indexSolution'),
    source: Joi.string().valid(InternalSources),
    solutionId: Joi.string().guid(),
    rev: Joi.string().required()
  }
};

// Action creators

export function hideSolution(solutionId: string, rev: string) :Object {
  return { type: HIDE_SOLUTION, solutionId, rev};
}

export function addImageToSolution(solutionId: string, rev: string, fileName: string, data: string) : Object {
  return { type: ADD_IMAGE_TO_SOLUTION, solutionId, rev, fileName, data};
}

export function indexSolution(solutionId) {
  return { type: INDEX_SOLUTION, source: 'internal', solutionId};
}




