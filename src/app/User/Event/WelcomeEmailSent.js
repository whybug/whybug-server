
export default function userSignedUp(userId, email) {
  return {
    type: WECOME_EMAIL_SENT,
    userId,
    email
  }
}
