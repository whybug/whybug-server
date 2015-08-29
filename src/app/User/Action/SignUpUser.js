import {SIGNUP_USER} from '../../Constants';

export function signUpUser(user) {
  return { type: SIGNUP_USER, user };
}

export function signUpUserValidator() {
  return { type: SIGNUP_USER, user };
}
