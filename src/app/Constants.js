/**
 * Action
 *
 * Intend to change or do something within the domain. Also called "command".
 * An action is a simple object which is serializable.
 */

// Common
export const RAISE_EVENT = 'RAISE_EVENT';

// Solution
export const HIDE_SOLUTION = 'HIDE_SOLUTION';
export const SHOW_SOLUTION = 'SHOW_SOLUTION';
export const INDEX_SOLUTION = 'INDEX_SOLUTION';

// Error
export const RECORD_ERROR = 'RECORD_ERROR';

// User
export const SIGNUP_USER = 'SIGNUP_USER';
export const SEND_WELCOME_EMAIL = 'SEND_WELCOME_EMAIL';

/**
 * Event
 *
 * A fact that has happened in the past within the domain.
 * An event is a simple object which is serializable.
 */

// Solution
export const SOLUTION_WAS_HIDDEN = 'SOLUTION_WAS_HIDDEN';
export const SOLUTION_WAS_SHOWN = 'SOLUTION_WAS_SHOWN';
export const SOLUTION_WAS_INDEXED = 'SOLUTION_WAS_INDEXED';

// User
export const USER_SIGNED_UP = 'USER_SIGNED_UP';
