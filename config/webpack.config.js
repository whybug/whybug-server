var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    bundle: './src/web/assets/js/app.js'
  },
  output: {
    path: 'build/',
    publicPath: process.env.WEB_URL,
    filename: '[name].js'
  },
  module: {
    loaders: [
      // Hand in environment variables.
      {
        test: /config\/.*\.js$/,
        loader: 'envify'
      },

      // Compile javascript ES6/ES7/JSX code.
      {
        test: /(src|config)\/.*\.js$/,
        loader: 'babel-loader?experimental=true&playground=true&optional=runtime'
      },

      // Compile assets.
      {
        test: /\.sass$/,
        loader: ExtractTextPlugin.extract(
          "style",
          "css?sourceMap!sass?indentedSyntax=sass&sourceMap=true&sourceMapContents=true"
        )
      }
    ]
  },
  plugins: [
    // Set a global variable to indicate if the javascript
    // code is executed in the browser.
    new webpack.DefinePlugin({
      __BROWSER__: true
    }),

    new ExtractTextPlugin("[name].css")
  ]
};
