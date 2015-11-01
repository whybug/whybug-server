import {USER_SIGNED_UP} from '../../Constants';

export function getSignedUpUser(store, user) {
  //return store.redis.get(key(user));
}

export function assertUserNotSignedUp(store, user) {
  //if (store.redis.has(key(user))) {
  //  throw new Error('User signed up already.');
  //}
}

// on USER_SIGNED_UP
export function signedUpUsers(store, event) {
  if (sequenceNumber() >= event.number) {
    return;
  }

  //return store.redis.set(key(event.user), event.user);
}

function key(user) {
  return USER_SIGNED_UP + '-' + user.id;
}

function sequenceNumber() {
  return store.redis.get(key('sequence-number'));
}

