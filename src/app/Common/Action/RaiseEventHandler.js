export function raiseEventHandler(store, action) {
    return store.events.insert(action.event);
}
