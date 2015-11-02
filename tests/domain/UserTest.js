//import {User} from '../../src/domain/User';
//
//import {googleProfile} from './mocks-provider-profiles';
//
//describe('User', () => {
//  var dummy;
//
//  beforeEach(() => {
//    dummy = {
//      "uuid": "cc441294-034b-46cf-84b4-982f3bab06f4",
//      "email": "adrian.philipp@gmail.com",
//      "display_name": "adrian",
//      "avatar_url": "https://lh5.googleusercontent.com/-f-vJZN-0r1Q/AAAAAAAAAAI/AAAAAAAAAAA/CoEIZBEnDO4/photo.jpg"
//    };
//
//  });
//
//  describe('#constructor', () => {
//
//    it('should generate uuid', () => {
//      new User(dummy).uuid.should.be.a('string');
//    });
//
//    it('should assign existing uuid', () => {
//      dummy.uuid = "3b4d298e-5298-4aeb-8051-ba4b98b0aa17";
//      new User(dummy).uuid.should.equal(dummy.uuid);
//    });
//
//    it('should assign passed data', () => {
//      new User(dummy).should.contain(dummy);
//    });
//
//    it('should not assign invalid data', () => {
//      dummy.invalid = 'data';
//      (() => new User(dummy)).should.throw('invalid is not allowed');
//    });
//
//  });
//
//  describe('#properties', () => {
//
//    it('should return properties', () => {
//      User.properties().should.include.keys('uuid', 'email', 'display_name', 'avatar_url');
//    });
//
//  });
//
//  describe('#fromProvider', () => {
//
//    it('should return User for google provider', () => {
//      User.fromProvider('google', googleProfile).should.be.instanceOf(User);
//    });
//
//    it('should transform google provider', () => {
//      User.fromProvider('google', googleProfile)
//        .should.contain({
//          email: 'adrian.philipp@liip.ch',
//          display_name: 'Adrian Philipp',
//          avatar_url: 'https://lh4.googleusercontent.com/-Deeha223uts/AAAAAAAAAAI/AAAAAAAAADA/Y7ulfkG_dFY/photo.jpg'
//        });
//    });
//
//  });
//
//});
