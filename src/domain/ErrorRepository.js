import {Error} from './Error';

export class ErrorRepository {

  constructor(bookshelf) {
    this.model = bookshelf.model('Error', Error.bookshelf());
  }

  /**
   * Returns the Error for specified uuid or null if not found.
   *
   * @return {Error} Error matching UUID, or null if not found.
   */
  async findByUuid(uuid) {
    var error = await new (this.model)({uuid: uuid}).fetch();

    return error ? new Error(error.attributes) : null;
  }

  /**
   * Stores an error.
   *
   * @param {Error} error
   */
  store(error) {
    return new (this.model)(error).save({}, {method: 'insert'});
  }
}
