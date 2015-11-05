/* @flow weak */

//class Domain {
//  events: Array;
//  actions: Array;
//
//  replay(event: Event) {}
//}
//
//export default ({bus, db, search, mailer, R}) => {
//
//  bus.subscribeAll((event: Event) => {
//    // todo: call async
//    domains.forEach((domain) => domain.replay(event));
//  });
//
//  return createStore(actionMiddleware, eventMiddleware, persistances);
//};

import {raiseEvent} from './Common/Action/RaiseEvent';
import {validationErrorOccured} from './Common/Event/ValidationErrorOccured';
import {
  createActionHandler,
  createActionValidator,
  createEventHandler,
  createQueryHandler,
  createStore}
from './store';

import {
  actionValidators as commonActionValidators,
  actionHandlers as commonActionHandlers
} from './Common/Common';

import {
  actionValidators as errorActionValidators,
  actionHandlers as errorActionHandlers
} from './Error/Error';

import {
  actionValidators as userActionValidators,
  actionHandlers as userActionHandlers,
  eventHandlers as userEventHandlers,
} from './User/User';

import {
  actionValidators as solutionActionValidators,
  actionHandlers as solutionActionHandlers,
  queryHandlers as solutionQueryHandlers,
} from './Solution/Solution';

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

var handleQuery = createQueryHandler(
  solutionQueryHandlers
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
    //console.log(JSON.stringify(action));
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
  // logging, auditlogging, monitoring, validation, storage?
  store.dispatch(raiseEvent(event));
  //console.log(JSON.stringify(event));
  return await handleEvent(store, event);
}

function queryMiddleware(store, query) {
  //console.log('handle query');
  return handleQuery(store, query);
}

export function getStore() {
  return createStore(actionMiddleware, eventMiddleware, queryMiddleware);
}
