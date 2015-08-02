import {indexSolution} from './SolutionActions';

var listeners = [
  {
    events: [
      'solutionWasChanged',
      'solutionWasHidden',
      'solutionWasShown'
    ],
    listener: (store, event) => {
      store.dispatch(indexSolution(event.solutionId));
    }
  }
];
