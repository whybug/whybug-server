/* @flow weak */

/**
 * Endpoint for healthchecks.
 *
 * Returns 200 OK when all is good, 500 otherwise.
 */
module.exports = (express, db, search) => {
    var app = express.Router();

    app.get('/healthcheck', (req, res) => {
        res.status(200)
            .send('OK');
    });

    return app;
};
