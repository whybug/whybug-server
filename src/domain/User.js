import {bookshelf} from '../dependencies';
import {UserProfile} from './UserProfile';

export var User = bookshelf.model('User', {
  tableName: 'users',
  idAttribute: 'uuid',
  hasTimestamps: ['created_at', 'updated_at'],

  // class properties
  profiles() {
    return this.hasMany('UserProfile', 'user_uuid');
  }
});
