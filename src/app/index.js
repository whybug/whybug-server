/* @flow weak */

class Domain {
  events: Array;
  actions: Array;

  replay(event: Event) {}
}

export default ({bus, db, search, mailer, R}) => {

  bus.subscribeAll((event: Event) => {
    // todo: call async
    domains.forEach((domain) => domain.replay(event));
  });

  return createStore(actionMiddleware, eventMiddleware, persistances);
};

import {raiseEvent} from './Common/Action/RaiseEvent';
import {validationErrorOccured} from './Common/Event/ValidationErrorOccured';
import {
  createActionHandler,
  createActionValidator,
  createEventHandler,
  createStore}
from './util';

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
  actionHandlers as userActionHandlers,
  eventHandlers as userEventHandlers,
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
var validAction = createActionValidator(
  commonActionValidators,
  errorActionValidators,
  userActionValidators
  //solutionActionValidators
);

/**
 * Handlers for actions which modify the store.
 */
var handleAction = createActionHandler(
  commonActionHandlers,
  errorActionHandlers,
  //solutionActionHandlers,
  userActionHandlers
);

/**
 * Handlers for events that happend in a store.
 */
var handleEvent = createEventHandler(
  userEventHandlers
);

/**
 * Handles specified action.
 *
 * @param store
 * @param action
 * @returns {Promise}
 */
async function actionMiddleware(store, action) {
  // todo: split up middlewares, use existing?
  // logging, validation
  try {
    console.log(JSON.stringify(action));
    await handleAction(store, await validAction(action));
  } catch (error) {
    switch (error.message) {
      case 'ValidationError':
        store.dispatch(raiseEvent(validationErrorOccured(error), action));
        break;
      default:
        console.error(error);
    }

    throw error;
  }
}

/**
 * Handles specified event.
 *
 * @param store
 * @param event
 * @returns {Promise}
 */
async function eventMiddleware(store, event) {
  // todo: split up middlewares, use existing?
  // logging, auditlogging, monitoring, validation, storage?
  store.dispatch(raiseEvent(event));
  console.log(JSON.stringify(event));
  await handleEvent(store, event);

  //store.eventStore.subscribeToStream(storedEvent => handleEvent(store, storedEvent));
}

export function getStore(persistances) {
  return createStore(actionMiddleware, eventMiddleware, persistances);
}
