import {SEND_WELCOME_EMAIL} from '../../Constants';

//type SendWelcomeEmail = {
//  type: 'SEND_WELCOME_EMAIL';
//  userId: number;
//  firstName: string;
//  lastName: string;
//  email: string;
//};

export function sendWelcomeEmail(userId, email) {
  return { type: SEND_WELCOME_EMAIL, userId, email };
}

export function sendWelcomeEmailValidator() {
  return {
    type: Joi.string().valid(RECORD_ERROR).required(),
    userId: Joi.string().guid(),
    firstName: Joi.string().max(255),
    lastName: Joi.string().max(255),
    email: Joi.string().email().max(255)
  };
}
