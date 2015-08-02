import {createHandler, createValidator, createStore} from './util';
import {raiseEvent} from './Event/EventActions';

import {actions as errorActions } from './Error/ErrorActions';
import {actions as eventActions } from './Event/EventActions';
import {actions as solutionActions } from './Solution/SolutionActions';

import {handlers as errorHandlers } from './Error/ErrorActionHandlers';
import {handlers as eventHandlers } from './Event/EventActionHandlers';
import {handlers as solutionHandlers } from './Solution/SolutionActionHandlers';

/**
 * Validator for actions.
 *
 * @throws An error in case an action doesn't validate.
 */
const valid = createValidator(
  eventActions,
  solutionActions,
  errorActions
);

/**
 * Handlers for actions which modify the store.
 */
const handle = createHandler(
  eventHandlers,
  solutionHandlers,
  errorHandlers
);

/**
 * Handles given action
 *
 * @param store
 * @param action
 * @returns {Promise}
 */
function handleAction(store, action) {
  try {
    console.log(JSON.stringify(action));
    handle(store, valid(action));
  } catch (error) {
    switch (error.message) {
      case 'ValidationError':
        store.dispatch(raiseEvent({type: "caughtValidationError", error}));
        break;
      default:
        console.error(error);
    }

    throw error;
  }
}

/**
 * Store to persist state.
 */
export const store = createStore(handleAction);
