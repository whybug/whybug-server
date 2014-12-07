var Joi = require('joi');

import {User} from './User';

export class UserRepository {

  constructor(knex) {
    this.knex = knex;
  }

  /**
   * Returns the user for specified uuid or null if not found.
   *
   * @return {User} User matching UUID, or null if not found.
   */
  async findByUuid(uuid) {
    var user = await this.table()
      .where({uuid: uuid})
      .first()
      .then().catch(e => { throw e });


    return user ? new User(user) : null;
  }

  /**
   * Stores a user.
   *
   * @param user User object to store.
   * @param update Update user (not insert), default false.
   *
   * @returns {Promise}
   */
  async store(user, update = false) {
    Joi.assert(user, Joi.object().type(User));
    let query;

    if (update) {
      query = this.table().where({uuid: user.uuid}).update(user);
    } else {
      query = this.table().insert(user);
    }

    return query.then().catch(e => { throw e });
  }

  /**
   * Returns a knex table instance.
   *
   * @returns {Object} Knex table instance.
   */
  table() {
    return this.knex('users');
  }
}
