/* @flow weak */
type ErrorStore = {
  logError: Function;
}

export function errorRecorded(errorStore: ErrorStore, error: Error) {
  errorStore.logError(error);
}
