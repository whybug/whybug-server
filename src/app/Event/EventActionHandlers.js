export var handlers = {
  raiseEvent: (store, action) => {
    return store.events.insert(action.event);
  }
};
