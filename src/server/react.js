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

    // Todo: switch to react-router >=1.0
    //import { renderToString } from 'react-dom/server'
    //import { match, RouterContext } from 'react-router'
    //import routes from './routes'
    //
    //serve((req, res) => {
    //    // Note that req.url here should be the full URL path from
    //    // the original request, including the query string.
    //    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    //        if (error) {
    //            res.status(500).send(error.message)
    //        } else if (redirectLocation) {
    //            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    //        } else if (renderProps) {
    //            res.status(200).send(renderToString(<RouterContext {...renderProps} />))
    //        } else {
    //            res.status(404).send('Not found')
    //        }
    //    })
    //})
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
