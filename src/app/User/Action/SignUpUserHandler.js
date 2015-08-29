import userSignedUp from '../Event/UserSignedUp';

export function signUpUserHandler(store, action) {
  // do some checks here, duplicate email etc.
  var user = event.user;

  store.dispatch(userSignedUp(user.id));
}
