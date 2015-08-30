import {SEND_WELCOME_EMAIL} from '../../Constants';
import {INTERNAL_SOURCES, INTERNAL} from '../../Common/Domain/Sources';

//type SendWelcomeEmail = {
//  type: 'SEND_WELCOME_EMAIL';
//  userId: number;
//  firstName: string;
//  lastName: string;
//  email: string;
//};

export function sendWelcomeEmail(userId, email) {
  return { type: SEND_WELCOME_EMAIL, source: INTERNAL, userId, email };
}

export function sendWelcomeEmailValidator(Joi) {
  return {
    type: Joi.string().valid(SEND_WELCOME_EMAIL).required(),
    source: Joi.string().valid(INTERNAL_SOURCES).required(),
    userId: Joi.string().guid(),
    //firstName: Joi.string().max(255),
    //lastName: Joi.string().max(255),
    email: Joi.string().email().max(255)
  };
}
