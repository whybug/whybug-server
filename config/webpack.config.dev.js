var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

//publicPath: process.env.WEB_URL,

var config =  {
  devtool: '#eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/web/assets/js/app.js',
    './src/web/assets/css/main.sass'
  ],
  output: {
    path: path.join(__dirname, '/../build/'),
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      // Compile javascript ES6/ES7/JSX code.
      {
        test: /\.js?$/,
        //exclude: /node_modules/,
        loader: 'babel',
        include: path.join(__dirname, '../src'),
        query: {
          optional: ['runtime'],
          plugins: [
            'react-display-name',
            'react-transform'
          ],
          extra: {
            'react-transform': [{
              'target': 'react-transform-hmr',
              'imports': ['react'],
              'locals': ['module']
            }]
          }
        }
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    webpackIsomorphicToolsPlugin.development()
  ],
  resolve: {
    extensions: ['', '.js'],
    alias: {
      request: 'browser-request'
    }
  }
};

module.exports = config;

