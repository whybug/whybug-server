
export default function userSignedUp(userId, email) {
  return {
    type: USER_SIGNED_UP,
    userId,
    email
  }
}
