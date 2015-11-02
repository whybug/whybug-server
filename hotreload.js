require("babel/register");

const dependencies = require('./src/dependencies');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var chokidar = require('chokidar');
var webpack = require('webpack');
var config = require('./config/webpack.config.dev');
var compiler = webpack(config);
var app = dependencies.expressApp;
var Mocha = require('mocha');
var testDependencies = require('./tests/dependencies');

// Serve hot-reloading bundle to client
app.use(require("webpack-dev-middleware")(compiler, {
  noInfo: true, publicPath: config.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));

//  Create hot-reloading bundle for server rendering
var basePath = require('path').resolve(__dirname, '.');
var webpackIsomorphicTools = new WebpackIsomorphicTools(require('./config/webpack-isomorphic-tools'))
  .development(true)
  .server(basePath, function() { });

// Include server routes as a middleware
app.use(function(req, res, next) {
  // Add rest endpoint
  require('./src/server/server')(dependencies)(req, res, next);
});

// Do "hot-reloading" of express stuff on the server
// Throw away cached modules and re-require next time
// Ensure there's no important state in there!
var watcher = chokidar.watch(['./src', './tests']);
watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log("Clearing test/ and src/server/ module cache from server");
    Object.keys(require.cache).forEach(function(id) {
      if (/whybug-server\/(src|tests)/.test(id)) {
        delete require.cache[id];
      }
    });

    runTest();
  });
});

// Do "hot-reloading" of react stuff on the server
// Throw away the cached client modules and let them be re-required next time
compiler.plugin('done', function() {
  console.log("Clearing src/web/ module cache from server");
  Object.keys(require.cache).forEach(function(id) {
    if (/\/src\/client\//.test(id)) delete require.cache[id];
  });
});


// Start tests
function runTest() {
  var mocha = new Mocha({
    ui: 'bdd',
    reporter: 'dot'
  });
  mocha.addFile('./tests/acceptance/rest.endpoint.js');
  console.log('Running tests...');

  mocha.run(function (success) {
    console.log('------------');
  });
}

var server = dependencies.server;
server.listenApp(function(err) {
  if (err) throw err;

  var s = server.address();
  console.log('Listening at http://%s:%d', s.address, s.port);
  //require('open')('http://'+ s.address + ':' + s.port )
});




