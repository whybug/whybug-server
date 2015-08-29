import {welcomeEmailSent} from '../Event/WelcomeEmailSent';
import {findUserById} from '../Store/UserProfile';

export async function sendWelcomeEmailHandler(store, action) {

  // send welcome email.
  try {
    var user = await findUserById(action.userId);

    await mailer.send({
      to: formatEmailAddress(user),
      subject: translate('user.welcomeEmail.subject', user.language),
      body: translate('user.welcomeEmail.body', user.language)
    });

    store.dispatch(welcomeEmailSent(action.user.email))
  } catch (e) {
    store.dispatch(welcomeEmailSent(action.user.email, {failed: true}))
  }
}

function formatEmailAddress(event) {
  return user.firstName + " " + user.lastName + " <" + user.email + ">";
}
