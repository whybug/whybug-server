/* @flow weak */
import {sendWelcomeEmail} from '../Action/SendWelcomeEmail';

export async function whenUserSignedUpSendWelcomeEmail(store, event) {
    //SentEmails.assertNotSentBefore(event);

    store.dispatch(sendWelcomeEmail(event.userId, event.email));
}
