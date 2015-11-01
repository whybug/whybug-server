/* flow weak */
var uuid = require('node-uuid');

import {userSignedUp} from '../Event/UserSignedUp';
import {userRejectedSignup} from '../Event/UserRejectedSignup';
import {assertUserNotSignedUp} from '../Query/SignedUpUsers';

export function signUpUserHandler(store, action) {
  assertUserNotSignedUp(store, action.user);
  // do some more checks here, duplicate email etc.

  var login = action.loginService;

  if (login) {
    // new User?
    store.raise(userSignedUp(uuid.v4(), 'test@example.com'));
  } else {
    store.raise(userRejectedSignup(reason));
  }
}
