var uuidGenerator = require('node-uuid');

import {UserProfile} from './UserProfile';

export class UserProfileRepository {

  findByProvider(provider, externalId) {
    return new UserProfile({
      provider: provider,
      external_id: externalId
    }).fetch({withRelated: ['user']});
  }

  create(data = {}) {
    data.uuid =  data.uuid || uuidGenerator.v4();

    return new UserProfile(data).save({}, {method: 'insert'});
  }

}
