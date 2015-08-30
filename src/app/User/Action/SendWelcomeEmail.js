/* @flow weak */
import {SEND_WELCOME_EMAIL} from '../../Constants';
import {INTERNAL_SOURCES, INTERNAL} from '../../Common/Domain/Sources';

type SendWelcomeEmail = {
  type: 'SEND_WELCOME_EMAIL';
  userId: number;
  email: string;
};

export function sendWelcomeEmail(userId, email): SendWelcomeEmail {
  return { type: SEND_WELCOME_EMAIL, source: INTERNAL, userId, email };
}

export function sendWelcomeEmailValidator(Joi) {
  return {
    type: Joi.string().valid(SEND_WELCOME_EMAIL).required(),
    source: Joi.string().valid(INTERNAL_SOURCES).required(),
    userId: Joi.string().guid(),
    email: Joi.string().email().max(255)
  };
}
