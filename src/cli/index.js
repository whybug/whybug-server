var config = require('../../config/config');
var program = require('commander');

import {store} from '../app/index';
import {indexSolution} from '../app/Solution/SolutionActions';

program
  .version(config.version);

program
  .command('indexSolution [solutionId]')
  .action(function(solutionId) {
    console.log('indexing solution %s', solutionId);
    store.dispatch(indexSolution(solutionId));
  });


// Iojs unhandled rejections.
process.on('unhandledRejection', function (err, p) {
  console.error('Caught an unhandled rejection, make sure to always `catch`.');
  console.error(err.stack)
});
