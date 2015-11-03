export default (elasticSearch) => {
  return {
    index: elasticSearch.index,
    search: elasticSearch.search
  }
}
