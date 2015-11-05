/* @flow weak */


type Solution = { title: string; os: string; programminglanguage: string; }
type Aggregation = { id: string, name: string, count: number }
type SolutionSearchResult = {
  total :number;
  solutions :Array<Solution>;
  aggregations :Array<Aggregation>;
}

module.exports = (search) => {
  const index = 'solutions';
  const type = 'solution';
  const searchSolutionQuery = searchQueryWithAggregations.bind(null, index, type);

  return async function searchSolutionsHandler(query: SearchSolutions) {
    //const result = await search.search(
    //  searchSolutionQuery(query, aggregations)
    //);
    const result = {};

    return formatResult(result);
  };

  function formatResult(result) :SolutionSearchResult {
    return {
      total: 0,
      solutions: [],
      aggregations: []
    };
  }

  function searchQueryWithAggregations(index, type, query) {
    return {
      index: index,
      type: type,
      body: {
        size: 10,
        sort: {created_at: 'desc'},
        query: {
          filtered: {
            query: {
              match: {
                message: {
                  query: query,
                  operator: 'and',
                  minimum_should_match: '10%',
                  zero_terms_query: 'all'
                }
              }
            },
            filter: {
              exists: { field: 'created_at' }
            }
          }
        },
        aggregations: {
          programminglanguage: {terms: {field: "programminglanguage"}},
          level: {terms: {field: "level"}},
          os: {terms: {field: "os"}}
        }
      }
    };
  }
};


