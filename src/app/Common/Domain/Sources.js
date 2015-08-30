/* @flow */
/**
 * Sources describe all origins of actions, events and queries.
 */

export var INTERNAL = 'INTERNAL';
export var REST = 'REST';
export var GRAPHQL = 'GRAPHQL';
export var CLI = 'CLI';

/**
 * Sources inside of the domain.
 */
export var INTERNAL_SOURCES = [
  INTERNAL
];

/**
 * Sources outside of the domain, usually endpoints.
 */
export var EXTERNAL_SOURCES = [
  REST,
  GRAPHQL,
  CLI
];

export var ALL_SOURCES = [
  // $FlowIssue: suppressing this error until it is fixed
  ...EXTERNAL_SOURCES,
  // $FlowIssue: suppressing this error until it is fixed
  ...INTERNAL_SOURCES
];
