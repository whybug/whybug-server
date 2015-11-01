/* @flow weak */
import {ADD_IMAGE_TO_SOLUTION} from '../../Constants';

export function addImageToSolution(solutionId: string, rev: string, fileName: string, data: string) : Object {
  return { type: ADD_IMAGE_TO_SOLUTION, solutionId, rev, fileName, data};
}
