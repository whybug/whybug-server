/* @flow weak */
import {SIGNUP_USER, SEND_WELCOME_EMAIL, USER_SIGNED_UP} from './Constants';
import {signUpUserValidator} from './User/Action/SignUpUser'
import {sendWelcomeEmailValidator} from './User/Action/SendWelcomeEmail'
import {signUpUserHandler} from './User/Action/SignUpUserHandler'
import {sendWelcomeEmailHandler} from './User/Action/SendWelcomeEmailHandler'
import {whenUserSignedUpSendWelcomeEmail} from './User/Event/WhenUserSignedUpSendWelcomeEmail'
var Joi = require('joi');

export var actionValidators = {
  // $FlowIssue: suppressing this error until it is fixed
  [SIGNUP_USER]: Joi.compile(signUpUserValidator(Joi)),
  // $FlowIssue: suppressing this error until it is fixed
  [SEND_WELCOME_EMAIL]: Joi.compile(sendWelcomeEmailValidator(Joi))
};

export var actionHandlers = {
  // $FlowIssue: suppressing this error until it is fixed
  [SIGNUP_USER]: signUpUserHandler,
  // $FlowIssue: suppressing this error until it is fixed
  [SEND_WELCOME_EMAIL]: sendWelcomeEmailHandler
};

export var eventHandlers = [
  {
    events: [USER_SIGNED_UP],
    handler: whenUserSignedUpSendWelcomeEmail
  }
];
