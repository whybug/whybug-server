export default (elasticSearch) => {
  return {

    index: elasticSearch.index,

    search: (query) => {
      //console.log('Search.search', query);
      //return elasticSearch.search(query);
      return {};
    }
  };
}
