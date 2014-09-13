import {bookshelf} from '../dependencies';
import {User} from './User';

export var UserProfile = bookshelf.model('UserProfile', {
  tableName: 'users_profiles',
  idAttribute: 'uuid',
  hasTimestamps: ['created_at', 'updated_at'],

  user() {
    return this.belongsTo('User', 'user_uuid');
  }

}, {
  // class properties

  /**
   * Returns a list of all supported providers.
   */
  providers() {
    return ['github'];
  }
});

