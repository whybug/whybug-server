var EventEmitter = require('events').EventEmitter;

import {WhybugApi} from '../WhybugApi';

var NEW_RESULTS_EVENT = 'new-results';

class _SearchResultStore extends EventEmitter {

  constructor() {
    this.searchResults = [];
  }

  /**
   * @param query
   * @param {function} callback
   */
    searchSolutions(query, callback) {
    var storeResult = (error, result) => {
      this.searchResult = result;
      this.emit(NEW_RESULTS_EVENT);
    };
    WhybugApi.searchErrors(query, callback || storeResult);
  }

  /**
   * @param {function} callback
   */
  attachResultListener(callback) {
    this.on(NEW_RESULTS_EVENT , callback);
  }

  /**
   * @param {function} callback
   */
  removeResultListener(callback) {
    this.removeListener(NEW_RESULTS_EVENT, callback);
  }
}

export var SolutionStore = new _SearchResultStore();
