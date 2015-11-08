/* @flow weak */
import {raiseEvent} from './Common/Action/RaiseEvent';
import {validationErrorOccured} from './Common/Event/ValidationErrorOccured';
import {
  createActionHandler,
  createActionValidator,
  createEventHandler,
  createQueryHandler,
  createStore}
from './store';

var contexts = [
   require('./Common/Common'),
   require('./Error/Error'),
   require('./User/User'),
   require('./Solution/Solution')
];

var domain = {
  actionHandlers: Object.assign(...contexts.map(context => context.actionHandlers)),
  actionValidators: Object.assign(...contexts.map(context => context.actionValidators)),
  eventHandlers: Object.assign(...contexts.map(context => context.eventHandlers)),
  queryHandlers: Object.assign(...contexts.map(context => context.queryHandlers))
};

var validAction = createActionValidator(domain.actionValidators || {});
var handleAction = createActionHandler(domain.actionHandlers || {});
var handleEvent = createEventHandler(domain.eventHandlers || []);
var handleQuery = createQueryHandler(domain.queryHandlers || {});

export function getStore() {
  return createStore(actionMiddleware, eventMiddleware, queryMiddleware);
}

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
