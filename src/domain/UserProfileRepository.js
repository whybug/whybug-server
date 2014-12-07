var Joi = require('joi');
import {UserProfile} from './UserProfile';

export class UserProfileRepository {

  constructor(knex) {
    this.knex = knex;
  }

  /**
   * Returns a user profile by specified
   * provider name and external provider id.
   *
   * @returns {Promise} Fulfilled with UserProfile or null.
   */
  async findByProvider(provider, externalId) {
    let userProfile = await this.table().where({
        provider: provider,
        external_id: externalId
      }).first().then();

    return userProfile ? new UserProfile(userProfile) : null;
  }

  /**
   * Stores a user profile.
   *
   * @returns {Promise}
   */
  async store(userProfile, update = false) {
    Joi.assert(userProfile, Joi.object().type(UserProfile));
    let query;

    console.log('hier');
    if (update) {
      query = this.table().where({uuid: userProfile.uuid}).update(userProfile);
    } else {
      query = this.table().insert(userProfile);
    }

    return query.catch(e => { console.log(e); throw e }).then();
  }

  /**
   * Returns a knex table instance.
   *
   * @returns {Object} Knex table instance.
   */
  table() {
    return this.knex('users_profiles');
  }
}
