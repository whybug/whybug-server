var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

//publicPath: process.env.WEB_URL,

var config =  {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://192.168.0.14:8001/',
    'webpack/hot/dev-server',
    './src/web/assets/js/app.js',
    './src/web/assets/css/main.sass'
  ],
  output: {
    path: path.join(__dirname, '/../build/'),
    publicPath: 'http://192.168.0.14:8001/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      // Compile javascript ES6/ES7/JSX code.
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader?stage=0&optional=runtime&optional=utility.inlineEnvironmentVariables'
        ]
      },

      // Compile assets.
      {
        test: /\.(sass|scss)$/,
        loaders: [
          "style",
          "css?sourceMap",
          "sass?indentedSyntax=sass&sourceMap=true&sourceMapContents=true"
        ]
      }
    ]
  },
  plugins: [
    // Set a global variable to indicate if the javascript
    // code is executed in the browser.
    new webpack.DefinePlugin({
      __BROWSER__: true
    }),

    new webpack.NoErrorsPlugin(),

    new ExtractTextPlugin("[name].css")
  ]
};

module.exports = config;

