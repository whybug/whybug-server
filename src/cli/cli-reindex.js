var program = require('commander');

program.parse(process.argv);

var listeners = [
    {
        events: [
            'solutionWasIndexed',
            'errorWasIndexed',
        ],
        listener: (store, event) => {
            console.log('.');
        }
    }
];

const type = program.args || 'all';

switch (type) {
    case 'all':
        dispatch(reindexSolutions());
        dispatch(reindexErrors());
        break;

    case 'solutions':
        dispatch(reindexSolutions());
        break;

    default:
        console.error('unknown entity');
        process.exit(1);
}

console.log('Indexed solution %s', solutionId);
