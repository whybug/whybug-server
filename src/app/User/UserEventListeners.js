
var handlers = {
  userSignedUp: (store, event) => {
    store.dispatch(sendWelcomeEmail(event.userId, event.email));
  }
};

