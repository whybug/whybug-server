import {userSignedUp} from '../Event/UserSignedUp';
import {userRejectedSignup} from '../Event/UserRejectedSignup';
var uuid = require('node-uuid');

export function signUpUserHandler(store, action) {
  // do some checks here, duplicate email etc.
  var login = action.loginService;

  if (login) {
    store.raise(userSignedUp(uuid.v4(), 'test@example.com'));
  } else {
    store.raise(userRejectedSignup(reason));
  }
}
