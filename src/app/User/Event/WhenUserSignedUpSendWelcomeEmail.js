import {sendWelcomeEmail} from '../Action/SendWelcomeEmail';

export default function whenUserSignedUpSendWelcomeEmail(store, event) {
  store.dispatch(sendWelcomeEmail(event.userId, event.email));
}
