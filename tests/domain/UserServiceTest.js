//import {UserService} from '../../src/domain/UserService';
//import {User} from '../../src/domain/User';
//import {UserProfile} from '../../src/domain/UserProfile';
//
//import {googleProfile} from './mocks-provider-profiles';
//
//var sinon = require("sinon");
//
//describe('UserService', () => {
//  var userRepository = {
//    findByUuid: sinon.stub(),
//    store: sinon.stub()
//  };
//  var userProfileRepository = {
//    findByProvider: sinon.stub(),
//    store: sinon.stub()
//  };
//  var userService = new UserService(userRepository, userProfileRepository);
//
//  describe('#loginWithProvider()', () => {
//
//    it('should validate the provider', () => {
//      return userService
//        .loginWithProvider('wrong-provider', {})
//        .should.eventually.be.rejectedWith('Invalid provider');
//    });
//
//    it('should login with new google profile', () => {
//      userProfileRepository.findByProvider.returns(null);
//
//      return userService.loginWithProvider('github', googleProfile).should.be.fulfilled
//        .then(() => {
//          userRepository.store.should.have.been.calledWith(sinon.match.instanceOf(User));
//          userProfileRepository.store.should.have.been.calledWith(sinon.match.instanceOf(UserProfile));
//        });
//    });
//
//    it('should login with existing google profile', () => {
//      var userProfile = {
//        updateLastLogin: sinon.stub()
//      };
//      userProfileRepository.findByProvider.returns(userProfile);
//
//      return userService.loginWithProvider('github', googleProfile).should.be.fulfilled
//        .then(() => {
//          userProfile.updateLastLogin.should.have.been.calledWith();
//          userProfileRepository.store.should.have.been.calledWith(userProfile, true);
//        });
//    });
//
//    /*
//     should login with twitter
//     should login with github
//     */
//  });
//});
