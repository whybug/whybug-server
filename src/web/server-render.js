import {WebRoutes} from './WebRoutes';
var fs = require('fs');

///* eslint-disable no-sync */
var template = fs.readFileSync(__dirname + '/common/index.html', 'utf8');
///* eslint-enable no-sync */

export default (path, callback) => {
  let webRoutes = new WebRoutes(path);
  webRoutes.getMarkup((markup, data = {}) => {
    //if (request.auth.isAuthenticated) {
    //  data.user = request.auth.credentials;
    //}
    var page = template
      .replace('{{{ content }}}', markup)
      .replace('{{{ data }}}', JSON.stringify(data));
    callback(null, page);
  });

}
