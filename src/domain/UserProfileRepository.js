var uuidGenerator = require('node-uuid');

import {UserProfile} from './UserProfile';

export class UserProfileRepository {

  constructor(bookshelf) {
    this.model = bookshelf.model('UserProfile', UserProfile.bookshelf());
  }

  findByProvider(provider, externalId) {
    return new (this.model)({
      provider: provider,
      external_id: externalId
    }).fetch({withRelated: ['user']});
  }

  create(data = {}) {
    data.uuid =  data.uuid || uuidGenerator.v4();

    return new (this.model)(data).save({}, {method: 'insert'});
  }

}
