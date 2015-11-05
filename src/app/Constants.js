/* @flow weak */
/**
 * Action
 *
 * Intend to change or do something within the domain. Also called "command".
 * An action is a simple object which is serializable.
 */

// Common
export var RAISE_EVENT = 'RAISE_EVENT';

// Solution
export var ADD_IMAGE_TO_SOLUTION = 'ADD_IMAGE_TO_SOLUTION';
export var SEARCH_SOLUTIONS = 'SEARCH_SOLUTIONS';
export var INDEX_SOLUTION = 'INDEX_SOLUTION';
export var FIND_SOLUTIONS_FOR_ERROR  = 'FIND_SOLUTIONS_BY_ERROR';

// Error
export var RECORD_ERROR = 'RECORD_ERROR';

// User
export var SIGNUP_USER = 'SIGNUP_USER';
export var SEND_WELCOME_EMAIL = 'SEND_WELCOME_EMAIL';

/**
 * Event
 *
 * A fact that has happened in the past within the domain.
 * An event is a simple object which is serializable.
 */

// Common
export var VALIDATION_ERROR_OCCURED = 'VALIDATION_ERROR_OCCURED';

// Solution
export var SOLUTION_WAS_HIDDEN = 'SOLUTION_WAS_HIDDEN';
export var SOLUTION_WAS_SHOWN = 'SOLUTION_WAS_SHOWN';
export var SOLUTION_WAS_INDEXED = 'SOLUTION_WAS_INDEXED';

// User
export var USER_SIGNED_UP = 'USER_SIGNED_UP';
export var USER_REJECTED_SIGNUP = 'USER_REJECTED_SIGNUP';
export var WELCOME_EMAIL_SENT = 'WELCOME_EMAIL_SENT';
