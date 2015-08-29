import {SIGNUP_USER, SEND_WELCOME_EMAIL, USER_SIGNED_UP} from '../Constants';
import {signUpUserValidator} from './Action/SignUpUser'
import {sendWelcomeEmailValidator} from './Action/SendWelcomeEmail'
import {signUpUserHandler} from './Action/SignUpUserHandler'
import {sendWelcomeEmailHandler} from './Action/SendWelcomeEmailHandler'
import {whenUserSignedUpSendWelcomeEmail} from './Event/WhenUserSignedUpSendWelcomeEmail'

export var actionValidators = {
  [SIGNUP_USER]: signUpUserValidator,
  [SEND_WELCOME_EMAIL]: sendWelcomeEmailValidator
};

export var actionHandlers = {
  [SIGNUP_USER]: signUpUserHandler,
  [SEND_WELCOME_EMAIL]: sendWelcomeEmailHandler
};

export var eventHandlers = [
  {
    events: [USER_SIGNED_UP],
    handler: whenUserSignedUpSendWelcomeEmail
  }
];
