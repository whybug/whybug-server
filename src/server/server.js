/* @flow weak */
//import {RestPlugin} from './rest/index';
//import {GraphQLPlugin} from './graphql/index';
//import {getStore} from '../app/index';

//export default (dependencies) => {
  //var {server} = dependencies;
  //
  //var options = {
  //  store: getStore(dependencies)
  //};
  //
  //server.register([
  //  { register: RestPlugin, options },
  //  { register: GraphQLPlugin, options }
  //], () => {
  //
  //  // Start the server.
  //  server.start(() => {
  //    console.log('Server started at: ' + server.info.uri);
  //  });
  //});
  //
  //// Iojs unhandled rejections.
  //process.on('unhandledRejection', function (err, p) {
  //  console.error('Caught an unhandled rejection, make sure to always `catch`.');
  //  console.error(err.stack)
  //});
  //
  //return server;
//}

export default (express) => {
  var app = express.Router();

  app.get('/whoami', (req, res) => {
    res.send("You are a winner");
  });

  return app;
}
