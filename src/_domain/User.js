var Joi = require('joi'),
    uuidGenerator = require('node-uuid');

import {UserProfile} from './UserProfile';

export class User {

    /**
     * Creates a new user.
     *
     * @param data
     * @throws ValidationError if provided data is invalid.
     */
    constructor(data = {}) {
        // Assert valid data and initialize.
        Joi.validate(data, User.properties(), {
            skipFunctions: true,
            abortEarly: false
        }, (err, values) => {
            if (err) {
                throw err;
            }
            for (var value in values) {
                this[value] = values[value];
            }
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
            email: Joi.string().max(255).allow(['', null]),
            display_name: Joi.string().max(255).required(),
            avatar_url: Joi.string().max(255).required(),
            created_at: Joi.date().default(new Date),
            updated_at: Joi.date().default(new Date)
        };
    }

    /**
     * Creates a new user based on a external provider profile.
     *
     * @param provider
     * @param profile
     *
     * @return {User}
     */
    static fromProvider(provider, profile) {
        return new User({
            email: profile.email,
            display_name: profile.displayName,
            avatar_url: profile.raw.avatar_url || profile.raw.profile_image_url_https || profile.raw.picture || ''
        });
    }
}
