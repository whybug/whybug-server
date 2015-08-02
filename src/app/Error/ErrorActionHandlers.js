export var handlers = {
  /**
   * @param store
   * @param action
   * @returns {{success: boolean}}
   */
  recordError: (store, action) => {
    console.log(store, action);
    return {success: true}
  }
};
