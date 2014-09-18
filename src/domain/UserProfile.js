

export class UserProfile {

  static bookshelf() {
    return {
      tableName: 'users_profiles',
      idAttribute: 'uuid',
      hasTimestamps: ['created_at', 'updated_at'],

      user() {
        return this.belongsTo('User', 'user_uuid');
      }
    }
  }

  /**
   * Returns a list of all supported providers.
   */
  static providers() {
    return ['github', 'twitter', 'google'];
  }
}

