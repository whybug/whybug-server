/* @flow weak */
import {RECORD_ERROR} from './../Constants';
import {recordError, recordErrorValidator} from './Action/RecordError'
import {recordErrorHandler} from './Action/RecordErrorHandler'

module.exports = {
  actionValidators: {
    // $FlowIssue: suppressing this error until it is fixed
    [RECORD_ERROR]: recordErrorValidator
  },

  actionHandlers: {
    // $FlowIssue: suppressing this error until it is fixed
    [RECORD_ERROR]: recordErrorHandler
  },

  eventHandlers: [],
  queryHandlers: {}
};

