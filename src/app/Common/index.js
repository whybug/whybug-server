import {RAISE_EVENT} from '../Constants';
import {raiseEvent, raiseEventValidator} from './Action/RaiseEvent'
import {raiseEventHandler} from './Action/RaiseEventHandler'

export var actionValidators = {
  [RAISE_EVENT]: raiseEventValidator
};

export var actionHandlers = {
  [RAISE_EVENT]: raiseEventHandler
};

export var eventHandlers = {
};
