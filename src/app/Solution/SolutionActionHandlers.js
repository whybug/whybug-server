import {raiseEvent} from './../Event/EventActions';
import {solutionWasHidden} from './SolutionEvents';
import {indexSolutionES} from './ActionHandlers/IndexSolutionES.js';

export var handlers = {

  [CHANGE_SOLUTION]: (store, action) => store('solution', action.solutionId).set(action.key, action.value),

  /**
   * Index a solution in search.
   */
  [INDEX_SOLUTION]: indexSolutionES,

  /**
   * @param store
   * @param action
   */
  [HIDE_SOLUTION]: (store, action) => {
    store.solutions.update(action.solutionId, action.rev, { hidden: true });

    store.dispatch(raiseEvent(solutionWasHidden(action.solutionId)));
  },

  /**
   * @param store
   * @param action
   */
  [SHOW_SOLUTION]: (store, action) => {
    store.solutions.update(action.solutionId, action.rev, { hidden: false });

    store.dispatch(raiseEvent(solutionWasShown(action.solutionId)));
  },

  /**
   * Adds an image to a solution.
   *
   * @param store
   * @param action
   * @returns {Promise}
   */
  [ADD_IMAGE_TO_SOLUTION]: (store, action) => {
    var url = upload(action.fileName, action.data);

    store.solution.update(action.solutionId, action.rev, {
      image: {
        url: url
      }
    });

    store.dispatch(raiseEvent(imageWasAddedToSolution(action.solutionId)))
  }
};
