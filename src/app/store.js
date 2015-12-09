import {validation, merge} from './validator';

export function createActionValidator(...actionValidations) {
    var validate = validation.bind(null, merge(actionValidations));

    return async (action) => {
        try {
            return await validate(action);
        } catch (e) {
            throw Error(e.name, e.details);
        }
    };
}

export function createActionHandler(...actionHandlers) {
    var handlers = Object.assign(...actionHandlers);

    return (store, action) => {
        if (!action.type) {
            throw Error(`No type given for action`);
        }
        if (!handlers[action.type]) {
            throw Error(`No handler for action "${action.type}".`);
        }

        return handlers[action.type](store, action);
    };
}

export function createEventHandler(...eventHandlers) {
    const subscribers = Object.assign(...eventHandlers);
    var handlers = {};

    subscribers.forEach(subscriber => {
        subscriber.events.forEach((event) => {
            handlers[event] = subscriber.handler;
        })
    });

    return async (store, event) => {
        if (!handlers[event.type]) {
            throw Error(`No handler for event "${event.type}".`);
        }

        return await handlers[event.type](store, event);
    };
}

export function createQueryHandler(...queryHandlers) {
    var handlers = Object.assign(...queryHandlers);

    return async (store, query) => {
        if (!handlers[query.type]) {
            throw Error(`No handler for query "${query.type}".`);
        }

        return await handlers[query.type](query);
    };
}

export function createStore(handleAction, handleEvent, handleQuery) {
    const store = {
        /**
         * Handles an action.
         *
         * @param action
         * @returns {Promise}
         */
        dispatch: (action) => {
            return handleAction(store, action);
        },

        query: (query) => {
            return handleQuery(store, query);
        },

        raise: (event) => {
            return handleEvent(store, event);
        }
    };

    return store;
}
