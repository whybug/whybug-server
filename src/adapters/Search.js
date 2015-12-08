export default (elasticSearch) :Search => {
  return {
    index: elasticSearch.index,
    search: search
  };

  function search(query) {
    //console.log('Search.search', query);
    //return elasticSearch.search(query);
    return {};
  }
}
