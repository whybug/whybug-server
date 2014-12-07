import {UserProfile} from '../../src/domain/UserProfile';

import {googleProfile} from './mocks-provider-profiles';

describe('UserProfile', () => {
  var dummy;

  beforeEach(() => {
    dummy = {
      user_uuid: '2330e6bb-2e57-4ea5-a397-852bd36ea6e2',
      provider: 'twitter',
      external_id: '2809493298',
      username: 'whybugApp',
      email: null,
      display_name: 'whybug',
      avatar_url: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_normal.png',
      profile_url: '',
      login_count: 3,
      last_login_at: new Date('Sun Dec 07 2014 17:37:45 GMT+0100 (CET)'),
      created_at: new Date('Fri Oct 17 2014 17:39:55 GMT+0200 (CEST)'),
      updated_at: new Date('Sun Sep 14 2014 22:14:05 GMT+0200 (CEST)')
    };
  });

  describe('#constructor', () => {

    it('should generate uuid', () => {
      new UserProfile(dummy).uuid.should.be.a('string');
    });

    it('should assign existing uuid', () => {
      dummy.uuid = "3b4d298e-5298-4aeb-8051-ba4b98b0aa17";
      new UserProfile(dummy).uuid.should.equal(dummy.uuid);
    });

    it('should assign passed data', () => {
      new UserProfile(dummy).should.contain(dummy);
    });

    it('should not assign invalid data', () => {
      dummy.invalid = 'data';
      (() => new UserProfile(dummy)).should.throw('invalid is not allowed');
    });

  });

  describe('#properties', () => {

    it('should return properties', () => {
      UserProfile.properties().should.include.keys('uuid', 'user_uuid', 'provider', 'external_id', 'username');
    });

  });

  describe('#fromProvider', () => {

    it('should return UserProfile for google provider', () => {
      UserProfile.fromProvider('2330e6bb-2e57-4ea5-a397-8522d36ea6e2', 'google', googleProfile)
        .should.be.instanceOf(UserProfile);
    });

    it('should transform google provider', () => {
      UserProfile.fromProvider('2330e6bb-2e57-4ea5-a397-8522d36ea6e2', 'google', googleProfile)
        .should.contain({
          user_uuid: '2330e6bb-2e57-4ea5-a397-8522d36ea6e2',
          provider: 'google',
          external_id: '103958218971419982951',
          username: 'Adrian Philipp',
          display_name: 'Adrian Philipp',
          email: 'adrian.philipp@liip.ch',
          avatar_url: 'https://lh4.googleusercontent.com/-Deeha223uts/AAAAAAAAAAI/AAAAAAAAADA/Y7ulfkG_dFY/photo.jpg',
          profile_url: 'https://plus.google.com/103958218971419982951',
          login_count: 1
        });
    });

  });

});
