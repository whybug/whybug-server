/* @flow weak */

module.exports = (search:Search) => {

    return async function findSolutionForError(error:Error) {
        return search.search(queryByError(error));
    };

    function queryByError(error) {
        return {}
    }

};


