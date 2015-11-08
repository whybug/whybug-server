/* @flow weak */
import {RAISE_EVENT} from './../Constants';
import {raiseEvent, raiseEventValidator} from './Action/RaiseEvent'
import {raiseEventHandler} from './Action/RaiseEventHandler'

module.exports = () => {
  return {
    actionValidators: {
      // $FlowIssue: suppressing this error until it is fixed
      [RAISE_EVENT]: raiseEventValidator
    },

    actionHandlers: {
      // $FlowIssue: suppressing this error until it is fixed
      [RAISE_EVENT]: raiseEventHandler
    },

    eventHandlers: [],
      queryHandlers: {}

  }
};
