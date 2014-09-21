module.exports = {
  entry: {
    bundle: './src/web/assets/js/app.js'
  },
  output: {
    path: 'build/js',
    publicPath: process.env.WEB_URL,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /config\/.*\.js$/, loader: 'envify'},
      {test: /(src|config)\/.*\.js$/, loader: 'traceur?experimental=true&runtime=true'}
    ]
  }
};
