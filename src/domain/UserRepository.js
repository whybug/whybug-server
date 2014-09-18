import {User} from './User';

var uuidGenerator = require('node-uuid');

export class UserRepository {

  constructor(bookshelf) {
    this.bookshelf = bookshelf;
    this.model = bookshelf.model('User', User.bookshelf());
  }

  create(data = {}) {
    data.uuid =  data.uuid || uuidGenerator.v4();

    return new (this.model)(data).save({}, {method: 'insert'});
  }
}
