/**
 * Sources describe all origins of actions, events and queries.
 */

export const INTERNAL = 'INTERNAL';
export const REST = 'REST';
export const GRAPHQL = 'GRAPHQL';
export const CLI = 'CLI';

/**
 * Sources inside of the domain.
 */
export const INTERNAL_SOURCES = [
  INTERNAL
];

/**
 * Sources outside of the domain, usually endpoints.
 */
export const EXTERNAL_SOURCES = [
  REST,
  GRAPHQL,
  CLI
];

export const ALL_SOURCES = [
  ...EXTERNAL_SOURCES,
  ...INTERNAL_SOURCES
];
