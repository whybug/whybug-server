/* @flow weak */
module.exports = (postgres) => {
    var table = 'errors';

    function logError(error:Error) {
        return postgres.insert(error);
    }

    return {
        logError
    }
};

