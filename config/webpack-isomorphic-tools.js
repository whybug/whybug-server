var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

// see this link for more info on what all of this means
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
module.exports = {
  webpack_assets_file_path: 'config/webpack-stats.json',
  debug: false,

  assets: {
    images: {
      extensions: [ 'jpeg', 'jpg', 'png', 'gif', 'svg' ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },

    styles: {
      extensions: ['css', 'sass', 'scss'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    }
  }
};
