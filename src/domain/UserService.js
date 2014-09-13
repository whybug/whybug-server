
export class UserService {

  constructor(userRepository, userProfileRepository) {
    this.userRepository = userRepository;
    this.userProfileRepository = userProfileRepository;
  }

  async loginWithProvider(provider, profile) {
    // todo: validate provider
    // todo: validate profile

    try {
      var user;
      var userProfile = await this.userProfileRepository.findByProvider(provider, profile.id);

      if (!userProfile) {
        user = (await user) || await this.userRepository.create({
          email: profile.email,
          display_name: profile.displayName,
          avatar_url: profile.raw.avatar_url || ''
        });

        userProfile = await this.userProfileRepository.create({
          user_uuid: user.get('uuid'),
          provider: provider,
          external_id: profile.id,
          username: profile.username,
          display_name: profile.displayName,
          email: profile.email,
          avatar_url: profile.raw.avatar_url || '',
          profile_url: profile.raw.html_url || '',
          last_login_at: new Date(),
          login_count: 1
        });
      }

      userProfile.save({login_count: userProfile.get('login_count') + 1}, {patch: true});

      return user || userProfile.related('user');
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}


