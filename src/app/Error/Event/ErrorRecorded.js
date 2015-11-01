/* @flow weak */

export function errorRecorded(errorStore: ErrorStore, error: Error) {
  errorStore.logError(error);
}
