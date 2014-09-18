import {UserProfile} from './UserProfile';

var assert = require('chai').assert;

export class UserService {

  constructor(userRepository, userProfileRepository) {
    this.userRepository = userRepository;
    this.userProfileRepository = userProfileRepository;
  }

  async loginWithProvider(provider, profile) {
    assert.include(UserProfile.providers(), provider, 'Invalid provider');

    // todo: validate provider
    // todo: validate profile

    // Move creation into repository?
    //var userProfile = this.userProfileRepository.findOrCreateByProfile(provider, profile);
    //
    //// Update login counter.
    //userProfile.save({login_count: userProfile.get('login_count') + 1}, {patch: true});
    //
    //var user = await userProfile.related('user');
    //return user;

    var user;
    var userProfile = await this.userProfileRepository.findByProvider(provider, profile.id);

    if (!userProfile) {
      user = (await user) || await this.userRepository.create({
        email: profile.email,
        display_name: profile.displayName,
        avatar_url: profile.raw.avatar_url || profile.raw.profile_image_url_https || profile.raw.picture || ''
      });

      userProfile = await this.userProfileRepository.create({
        user_uuid: user.get('uuid'),
        provider: provider,
        external_id: profile.id,
        username: profile.username || profile.displayName,
        display_name: profile.displayName,
        email: profile.email,
        avatar_url: profile.raw.avatar_url || profile.raw.profile_image_url_https || profile.raw.picture || '',
        profile_url: profile.raw.html_url || profile.raw.url || '',
        last_login_at: new Date(),
        login_count: 1
      });
    }

    userProfile.save({login_count: userProfile.get('login_count') + 1}, {patch: true});

    return user || userProfile.related('user');
  }
}


