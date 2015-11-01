/* @flow weak */

/**
 * React server rendering.
 *
 * Renders a page on the server.
 */
import {WebRoutes} from '../web/WebRoutes';

// TODO: !!!!! Move somewhere else
var fs = require('fs');
var template = fs.readFileSync(__dirname + '/../web/common/index.html', 'utf8');

export default (express) => {
  var app = express.Router();

  app.get('*', (req, res, next) => {
    let webRoutes = new WebRoutes(req.path);
    webRoutes.getMarkup((markup, data = {}) => {
      //if (request.auth.isAuthenticated) {
      //  data.user = request.auth.credentials;
      //}
      var page = template
        .replace('{{{ content }}}', markup)
        .replace('{{{ data }}}', JSON.stringify(data));

      res.send(page);
    });
  });

  return app;
}
