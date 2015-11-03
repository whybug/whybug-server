/* @flow weak */
import {RAISE_EVENT} from './Constants';
import {raiseEvent, raiseEventValidator} from './Common/Action/RaiseEvent'
import {raiseEventHandler} from './Common/Action/RaiseEventHandler'

export var actionValidators = {
  // $FlowIssue: suppressing this error until it is fixed
  [RAISE_EVENT]: raiseEventValidator
};

export var actionHandlers = {
  // $FlowIssue: suppressing this error until it is fixed
  [RAISE_EVENT]: raiseEventHandler
};

export var eventHandlers = {
};
