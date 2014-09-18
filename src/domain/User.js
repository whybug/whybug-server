import {UserProfile} from './UserProfile';

export class User {

  static bookshelf() {
    return {
      tableName: 'users',
      idAttribute: 'uuid',
      hasTimestamps: ['created_at', 'updated_at'],

      profiles() {
        return this.hasMany('UserProfile', 'user_uuid');
      }
    };
  }
}

//export var User = bookshelf.model('User', {
//  // class properties
//});
