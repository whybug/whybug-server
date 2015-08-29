
export function recordErrorHandler(store, action) {
  console.log(store, action);

  return {success: true}
}
