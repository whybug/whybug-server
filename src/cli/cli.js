var config = require('../../config/config');

import dependencies from '../dependencies';

const store = require('../app/index').getStore(dependencies);


//todo https://github.com/harthur/nomnom

//argv.usage('Usage: $0 <command> [options]')
//  .command('reindex', 'Reindex types and ids.', function (yargs) {
//    argv = yargs.option('f', {
//      alias: 'force',
//      description: 'yar, it usually be a bad idea'
//    })
//    .help('help')
//    .argv
//  })
//;


// See https://github.com/tj/commander.js
//program
//  .description('Whybug command line interface')
//  .version(config.version);
//
//program
//  .command('reindex [type] [id]', 'Import specific id')
//  .action((type, id) => {
//    switch (type) {
//      case 'solution':
//        dispatch(indexSolution(id));
//        console.log('Indexed solution %s', id);
//        break;
//    }
//  });

program.parse(process.argv);

/**
 * Wrapper for dispatching actions in the store.
 *
 * @param action
 */
export function dispatch(action) {
  return store.dispatch({
    ...action,
    source: 'cli'
  });
}

