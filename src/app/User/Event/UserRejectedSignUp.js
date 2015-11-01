import {USER_REJECTED_SIGNUP} from '../../Constants';

/* @flow weak */
export function userRejectedSignup(reason) {
  return { type: USER_REJECTED_SIGNUP, reason };
}
