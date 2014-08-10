var EventEmitter = require('events').EventEmitter;

import {WhybugApi} from '../WhybugApi';

export class SolutionStore extends EventEmitter {

  get CHANGE_EVENT() {
    return 'change';
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  static searchSolutions(query, callback) {
    WhybugApi.searchErrors(query, (error, result) => callback(error, {
      errors: result
    }));
  }
}
