import {SIGNUP_USER} from '../../Constants';
import {LoginServices} from '../Domain/User';

export function signUpUser(user) {
  return { type: SIGNUP_USER, user };
}

export function signUpUserValidator(Joi) {
  return {
    type: Joi.string().valid(SIGNUP_USER).required(),
    source: Joi.string().required(),
    loginService: Joi.string().valid(LoginServices).required()
  };
}

