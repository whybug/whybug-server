import {RECORD_ERROR} from '../Constants';
import {recordError, recordErrorValidator} from './Action/RecordError'
import {recordErrorHandler} from './Action/RecordErrorHandler'

export var actionValidators = {
  [RECORD_ERROR]: recordErrorValidator
};

export var actionHandlers = {
  [RECORD_ERROR]: recordErrorHandler
};

export var eventHandlers = {
};
