/* @flow weak */
module.exports = (db) => {
    var table = 'errors';

    function logError(error:Error) {
        return db.insert(error);
    }

    return {
        logError
    }
};

