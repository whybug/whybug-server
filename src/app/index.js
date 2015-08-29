import {createHandler, createValidator, createStore} from './util';

import {
  actionValidators as commonActionValidators,
  actionHandlers as commonActionHandlers
} from './Common';

import {
  actionValidators as errorActionValidators,
  actionHandlers as errorActionHandlers
} from './Error';

import {
  actionValidators as userActionValidators,
  actionHandlers as userActionHandlers
} from './User';

//import {
//  actionValidators as solutionActionValidators,
//  actionHandlers as solutionActionHandlers
//} from './Solution';

/**
 * Validator for actions.
 *
 * @throws An error in case an action doesn't validate.
 */
const valid = createValidator(
  commonActionValidators,
  errorActionValidators
  //solutionActionValidators
);

/**
 * Handlers for actions which modify the store.
 */
const handle = createHandler(
  commonActionHandlers,
  errorActionHandlers,
  //solutionActionHandlers,
  userActionHandlers
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
