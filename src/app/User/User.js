/* @flow weak */
import {SIGNUP_USER, SEND_WELCOME_EMAIL, USER_SIGNED_UP} from './../Constants';
import {signUpUserValidator} from './Action/SignUpUser'
import {sendWelcomeEmailValidator} from './Action/SendWelcomeEmail'
import {signUpUserHandler} from './Action/SignUpUserHandler'
import {sendWelcomeEmailHandler} from './Action/SendWelcomeEmailHandler'
import {whenUserSignedUpSendWelcomeEmail} from './Event/WhenUserSignedUpSendWelcomeEmail'

module.exports = {

  actionValidators: {
    // $FlowIssue: suppressing this error until it is fixed
    [SIGNUP_USER]: signUpUserValidator,
    // $FlowIssue: suppressing this error until it is fixed
    [SEND_WELCOME_EMAIL]: sendWelcomeEmailValidator
  },

  actionHandlers: {
    // $FlowIssue: suppressing this error until it is fixed
    [SIGNUP_USER]: signUpUserHandler,
    // $FlowIssue: suppressing this error until it is fixed
    [SEND_WELCOME_EMAIL]: sendWelcomeEmailHandler
  },

  eventHandlers: [
    {
      events: [USER_SIGNED_UP],
      handler: whenUserSignedUpSendWelcomeEmail
    }
  ],

  queryHandlers: {}
};

