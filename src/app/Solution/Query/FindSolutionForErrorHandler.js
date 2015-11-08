/* @flow weak */

module.exports = (search) => {

  return async function findSolutionForError (error: Error) {
      return search.search(queryByError(error));
  };

  function queryByError(error) {
    return {
    }
  }



};


