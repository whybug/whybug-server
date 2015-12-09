/* @flow weak */

/**
 * React server rendering.
 *
 * Renders a page on the server.
 */
import { WebRoutes } from '../web/WebRoutes';

var favicon = require('serve-favicon');

// TODO: !!!!! Move somewhere else
var fs = require('fs');
var template = fs.readFileSync(__dirname + '/../web/common/index.html', 'utf8');

module.exports = (express) => {
    var app = express.Router();

    app.use(favicon(__dirname + '/../web/assets/favicon.ico'));

    app.use(express.static(__dirname + '/../../build/'));

    app.get('*', (req, res) => {
        let webRoutes = new WebRoutes(req.path);
        webRoutes.getMarkup((markup, data = {}) => {
            if (markup === 'NotFound') {
                return res.status(404).send();
            }
            //if (req.auth.isAuthenticated) {
            //  data.user = req.auth.credentials;
            //}
            var page = template
                .replace('{{{ content }}}', markup)
                .replace('{{{ data }}}', JSON.stringify(data));

            res.send(page);
        });
    });

    return app;
};
