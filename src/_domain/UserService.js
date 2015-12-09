import {UserProfile} from './UserProfile';
import {User} from './User';

var Joi = require('joi');

export class UserService {

    constructor(userRepository, userProfileRepository) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
    }

    /**
     * Tries to login a user with provided provider and profile.
     *
     * @param {string} provider Provider name, e.g. 'github', 'twitter'
     * @param {Object} profile Profile returned from the service.
     *
     * @returns {Promise} Resolves with logged in User.
     */
    async loginWithProvider(provider, profile) {
        Joi.assert(provider, Joi.string().valid(UserProfile.providers()), 'Invalid provider');

        let user;
        let userProfile = await this.userProfileRepository.findByProvider(provider, profile.id);

        if (!userProfile) {
            // If there is no UserProfile, this is a new user.
            user = User.fromProvider(provider, profile);
            userProfile = UserProfile.fromProvider(user.uuid, provider, profile);

            await Promise.all([
                this.userRepository.store(user),
                this.userProfileRepository.store(userProfile)
            ]);

        } else {
            // Otherwise we have an existing user.
            userProfile.updateLastLogin();

            [user] = await Promise.all([
                this.userRepository.findByUuid(userProfile.user_uuid),
                this.userProfileRepository.store(userProfile, true)
            ]);
        }

        return user;
    }
}


