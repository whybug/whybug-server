import {USER_SIGNED_UP} from '../../Constants';

export function userSignedUp(userId, email) {
  return {
    type: USER_SIGNED_UP,
    userId,
    email
  }
}
