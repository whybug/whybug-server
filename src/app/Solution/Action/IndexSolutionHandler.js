export function indexSolutionES(store, action) {
  const solution = store.solutions.get(action.solutionId);

  store.solutions.index({
    index: 'solutions',
    type: '.percolator',
    id: solution.solutionId,
    body: getQueryForSolution(solution)
  });

  store.dispatch(solutionWasIndexed(solution.solutionId));
}

function getQueryForSolution(solution) {
  var match = {};
  var terms = {};

  if (solution.message) { match.message = solution.message; }
  if (solution.code) { terms.code = solution.code; }
  if (solution.level) { terms.level = solution.level; }
  if (solution.os) { terms.os = solution.os }
  if (solution.os_version) { terms.os_version = solution.os_version }
  if (solution.programminglanguage) { terms.programminglanguage = solution.programminglanguage }
  if (solution.programminglanguage_version) { terms.programminglanguage_version = solution.programminglanguage_version }

  return {
    query: {
      filtered: {
        query: {match: match},
        filter: {term: terms}
      }
    }
  };
}

