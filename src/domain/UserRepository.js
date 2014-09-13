var uuidGenerator = require('node-uuid');
import {User} from './User';

export class UserRepository {

  create(data = {}) {
    data.uuid =  data.uuid || uuidGenerator.v4();

    return new User(data).save({}, {method: 'insert'});
  }
}
