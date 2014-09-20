import {Solution} from './Solution';
import {SolutionRepository} from './SolutionRepository';
import {Error} from './Error';
import {ErrorRepository} from './ErrorRepository';

export class SolutionService {

  /**
   * @param {SolutionRepository} solutionRepository
   * @param {ErrorRepository} errorRepository
   */
  constructor(solutionRepository, errorRepository) {
    this.solutionRepository = solutionRepository;
    this.errorRepository = errorRepository;
  }

  /**
   * An Solution is either added as a variation to a similar Error or is a new Error.
   *
   * @param {Error} Error
   * @return {Solution} Solution for the provided error. 
   */
  async solve(error) {
    var solution = await this.solutionRepository.findByError(error);

    if (!solution) {
      solution = Solution.forError(error);
    }

    this.solutionRepository.store(solution);
    this.errorRepository.store(error);

    return solution;
  }
}
