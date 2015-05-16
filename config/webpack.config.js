var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    './src/web/assets/js/app.js',
    './src/web/assets/css/main.sass'
  ],
  output: {
    path: path.join(__dirname, '/../build/'),
    publicPath: process.env.WEB_URL,
    filename: '[name].js'
  },
  module: {
    loaders: [
      // Compile javascript ES6/ES7/JSX code.
      {
        test: /(src|config)\/.*\.js$/,
        loader: 'babel-loader?stage=0&optional=runtime&optional=utility.inlineEnvironmentVariables'
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
      __BROWSER__: true,
      "process.env": {
        "NODE_ENV": JSON.stringify("production") // This has effect on the react lib size
      }
    }),

    new ExtractTextPlugin("[name].css")
  ]
};
