var Joi = require('joi'),
    uuidGenerator = require('node-uuid');

/**
 * A user profile stores user information like username, avatar etc.
 *
 * The user information are mostly gathered from an external login provider.
 * The user profile is associated with a user.
 */
export class UserProfile {

  /**
   * Creates a new user profile.
   *
   * @param data
   * @throws ValidationError if provided data is invalid.
   */
  constructor(data = {}) {
    // Assert valid data and initialize.
    Joi.validate(data, UserProfile.properties(), {skipFunctions: true, abortEarly: false}, (err, values) => {
      if (err) { throw err; }
      for (var value in values) { this[value] = values[value]; }
    });
  }

  /**
   * Returns a hash of valid properties and their Joi validation.
   *
   * @returns {Object} Hash of valid properties and their Joi validation.
   */
  static properties() {
    return {
      uuid: Joi.string().guid().default(uuidGenerator.v4()),
      user_uuid: Joi.string().guid().required(),
      provider: Joi.string().valid(UserProfile.providers()).required(),
      external_id: Joi.string().required(),
      username: Joi.string().max(255).required(),
      display_name: Joi.string().max(255).required(),
      email: Joi.string().max(255).allow(['', null]),
      avatar_url: Joi.string().max(255).required(),
      profile_url: Joi.string().max(255).allow(['', null]),
      login_count: Joi.number().default(1),
      last_login_at: Joi.date().default(new Date),
      created_at: Joi.date().default(new Date),
      updated_at: Joi.date().default(new Date)
    };
  }

  /**
   * Returns a list of all supported providers.
   *
   * @returns {string} Supported providers.
   */
  static providers() {
    return ['github', 'twitter', 'google'];
  }

  /**
   * Returns a new UserProfile based on specified profile from the provider.
   *
   * @param {string} userUuid UUID of the user this user profile is attached to.
   * @param {string} provider Provider name, e.g. 'github'.
   * @param providerProfile Profile returned from the provider.
   *
   * @returns {UserProfile}
   */
  static fromProvider(userUuid, provider, providerProfile) {
    return new UserProfile({
      user_uuid: userUuid,
      provider: provider,
      external_id: providerProfile.id,
      username: providerProfile.username || providerProfile.displayName,
      display_name: providerProfile.displayName,
      email: providerProfile.email,
      avatar_url: providerProfile.raw.avatar_url || providerProfile.raw.profile_image_url_https || providerProfile.raw.picture || '',
      profile_url: providerProfile.raw.html_url
                || providerProfile.raw.url
                || providerProfile.raw.link
                || '',
      last_login_at: new Date(),
      login_count: 1
    });
  }

  /**
   * Updates the last login information on the user profile.
   */
  updateLastLogin() {
    this.login_count++;
    this.last_login_at = new Date();
  }
}

