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

var validAction = createActionValidator(get(contexts, 'actionValidators'));
var handleAction = createActionHandler(get(contexts, 'actionHandlers'));
var handleEvent = createEventHandler(get(contexts, 'eventHandlers'));
var handleQuery = createQueryHandler(get(contexts, 'queryHandlers'));

export function getStore() {
  return createStore(actionMiddleware, eventMiddleware, queryMiddleware);
}

// Todo: convert to R or lodash magic
function get(objects, prop) {
  return Object.assign(...objects.map(entry => entry[prop]));
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
