import {WELCOME_EMAIL_SENT} from '../../Constants';

export function welcomeEmailSent(email, options) {
  return {
    type: WELCOME_EMAIL_SENT,
    email,
    options
  }
}
