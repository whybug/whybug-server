/**
 * Sources describe all origins of actions and queries.
 */

/**
 * Sources inside of the domain.
 */
export const InternalSources = [
  'internal'
];

/**
 * Sources outside of the domain, usually endpoints.
 */
export const ExternalSources = [
  'rest',
  'graphql',
  'cli'
];

export const AllSources = [
  ...ExternalSources,
  ...InternalSources
];
