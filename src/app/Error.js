/* @flow weak */
import {RECORD_ERROR} from './Constants';
import {recordError, recordErrorValidator} from './Error/Action/RecordError'
import {recordErrorHandler} from './Error/Action/RecordErrorHandler'

export var actionValidators = {
  // $FlowIssue: suppressing this error until it is fixed
  [RECORD_ERROR]: recordErrorValidator
};

export var actionHandlers = {
  // $FlowIssue: suppressing this error until it is fixed
  [RECORD_ERROR]: recordErrorHandler
};

export var eventHandlers = {


};