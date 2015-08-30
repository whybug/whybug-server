/* @flow */
import {SEND_WELCOME_EMAIL} from '../../Constants';
import {INTERNAL_SOURCES, INTERNAL} from '../../Common/Domain/Sources';

type SendWelcomeEmailAction = {
  type: string;
  source: string;
  userId: string;
  email: string;
};

export function sendWelcomeEmail(userId: string, email: string): SendWelcomeEmailAction {
  return {
    type: SEND_WELCOME_EMAIL,
    source: INTERNAL,
    userId,
    email
  };
}

export function sendWelcomeEmailValidator(Joi: any): SendWelcomeEmailAction {
  return {
    type: Joi.string().valid(SEND_WELCOME_EMAIL),
    source: Joi.string().valid(INTERNAL_SOURCES),
    userId: Joi.string().guid(),
    //firstName: Joi.string().max(255),
    //lastName: Joi.string().max(255),
    email: Joi.string().email().max(255)
  };
}
